import os
import cv2
import numpy as np
import gc
import time
import psutil

def get_process_memory_mb():
    try:
        process = psutil.Process(os.getpid())
        return round(process.memory_info().rss / (1024 * 1024), 2)
    except Exception:
        return 0.0

try:
    import torch
    # Restrict PyTorch CPU thread count to 1 to avoid thread pool over-allocation and RAM spikes on Render
    torch.set_num_threads(1)
    try:
        torch.set_num_interop_threads(1)
    except Exception:
        pass
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False

# Try to import ultralytics for real YOLO detection
try:
    from ultralytics import YOLO
    ULTRALYTICS_AVAILABLE = True
except ImportError:
    ULTRALYTICS_AVAILABLE = False
    print("WARNING: ultralytics (YOLO) not installed.")

class CivicDetector:
    def __init__(self, model_path="model/CivicWatch_FINAL_best.pt"):
        self.model_path = model_path
        self.model = None
        
        if ULTRALYTICS_AVAILABLE:
            if os.path.exists(model_path):
                try:
                    start_load = time.time()
                    mem_before = get_process_memory_mb()
                    print(f"[MODEL] Loading YOLO model from {model_path}... (Memory before: {mem_before} MB)")
                    
                    self.model = YOLO(model_path)
                    load_duration = round(time.time() - start_load, 3)
                    mem_after = get_process_memory_mb()
                    print(f"[MODEL] Model loaded successfully in {load_duration} sec. (Memory after: {mem_after} MB)")

                    # Warm-up pass to initialize PyTorch CPU engine and JIT graph ahead of first HTTP request
                    try:
                        print("[MODEL] Executing 1x dummy warm-up pass (imgsz=416, device='cpu')...")
                        warmup_start = time.time()
                        dummy_img = np.zeros((416, 416, 3), dtype=np.uint8)
                        if TORCH_AVAILABLE:
                            with getattr(torch, 'inference_mode', torch.no_grad)():
                                _ = self.model(dummy_img, conf=0.01, imgsz=416, device='cpu', verbose=False)
                        else:
                            _ = self.model(dummy_img, conf=0.01, imgsz=416, device='cpu', verbose=False)
                        warmup_duration = round(time.time() - warmup_start, 3)
                        print(f"[MODEL] Warm-up pass complete in {warmup_duration} sec. System ready for requests!")
                    except Exception as warmup_err:
                        print(f"[MODEL WARNING] Warm-up pass encountered non-fatal error: {warmup_err}")

                except Exception as e:
                    print(f"Error loading YOLO model from {model_path}: {e}")
            else:
                print(f"ERROR: YOLO model not found at {model_path}")

    def detect(self, image_path, output_path, conf_threshold=0.15, imgsz=416):
        """
        Detects garbage in the image using the real CivicWatch_FINAL_best.pt model,
        draws bounding boxes, and saves the annotated image to output_path.
        Returns: (success, detections, count, severity)
        """
        t_req_start = time.time()
        mem_before = get_process_memory_mb()
        print(f"\n[TIMING] request received at {time.strftime('%H:%M:%S')}")
        print(f"[MEMORY] before inference: {mem_before} MB")

        # Step 1: Read/Decode Image
        t_decode_start = time.time()
        image = cv2.imread(image_path)
        if image is None:
            print(f"Failed to read image at {image_path}")
            return False, [], 0, "LOW"

        height, width = image.shape[:2]
        t_decode_end = time.time()
        t_decode_sec = round(t_decode_end - t_decode_start, 4)
        print(f"[TIMING] image decode: {t_decode_sec} sec (Original resolution: {width}x{height}, Target imgsz: {imgsz})")

        detections = []

        if ULTRALYTICS_AVAILABLE and self.model is not None:
            try:
                # Step 2: YOLO Single Inference Pass
                print(f"[DIAGNOSTIC] Running SINGLE YOLO inference pass on {image_path} with conf=0.01, imgsz={imgsz}, device='cpu'...")
                t_infer_start = time.time()

                if TORCH_AVAILABLE:
                    context_mgr = getattr(torch, 'inference_mode', torch.no_grad)()
                else:
                    class DummyContextManager:
                        def __enter__(self): pass
                        def __exit__(self, *args): pass
                    context_mgr = DummyContextManager()

                with context_mgr:
                    results = self.model(image_path, conf=0.01, imgsz=imgsz, device='cpu', verbose=False)

                t_infer_end = time.time()
                t_infer_sec = round(t_infer_end - t_infer_start, 4)
                print(f"[TIMING] YOLO inference: {t_infer_sec} sec")

                # Step 3: Annotation & Filtering
                t_annot_start = time.time()
                annotated_img = image.copy()
                raw_detections_count = 0
                raw_list = []

                for result in results:
                    boxes = result.boxes
                    for box in boxes:
                        raw_detections_count += 1
                        x1, y1, x2, y2 = box.xyxy[0].tolist()
                        conf = float(box.conf[0])
                        cls = int(box.cls[0])
                        class_name = self.model.names.get(cls, f"Class_{cls}") if hasattr(self.model, 'names') else f"Class_{cls}"

                        raw_list.append({
                            "cls_id": cls,
                            "class_name": class_name,
                            "confidence": round(conf, 4)
                        })

                        # Filter by Class 0 (Garbage) and conf >= conf_threshold
                        if cls == 0 and conf >= conf_threshold:
                            detections.append({
                                "class": "Garbage",
                                "confidence": round(conf, 3),
                                "bbox": {
                                    "x1": int(x1),
                                    "y1": int(y1),
                                    "x2": int(x2),
                                    "y2": int(y2)
                                }
                            })

                            # Draw bounding box (Red)
                            cv2.rectangle(annotated_img, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 3)
                            label = f"Garbage: {conf:.1%}"
                            cv2.putText(annotated_img, label, (int(x1), int(y1) - 10), 
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

                print(f"[DIAGNOSTIC 2] Number of raw YOLO detections BEFORE filtering: {raw_detections_count}")
                for idx, item in enumerate(raw_list):
                    print(f"[DIAGNOSTIC 3] Raw Detection #{idx+1} -> Class ID: {item['cls_id']}, Class Name: '{item['class_name']}', Confidence: {item['confidence']}")

                # Save annotated image with JPEG quality 85 for speed
                cv2.imwrite(output_path, annotated_img, [cv2.IMWRITE_JPEG_QUALITY, 85])
                t_annot_end = time.time()
                t_annot_sec = round(t_annot_end - t_annot_start, 4)
                print(f"[TIMING] annotation: {t_annot_sec} sec")

                count = len(detections)
                print(f"[DIAGNOSTIC 4] Number of detections AFTER confidence filtering (threshold={conf_threshold}): {count}")

                # Determine severity based on count
                if count >= 3:
                    severity = "HIGH"
                elif count >= 1:
                    severity = "MEDIUM"
                else:
                    severity = "LOW"

                # Step 4: Cleanup & Memory Benchmarks
                del results
                del annotated_img
                del image
                gc.collect()

                mem_after = get_process_memory_mb()
                t_req_total = round(time.time() - t_req_start, 4)
                print(f"[MEMORY] after inference: {mem_after} MB")
                print(f"[TIMING] total request: {t_req_total} sec")

                return True, detections, count, severity

            except Exception as e:
                print(f"Real YOLO detection failed: {e}")
                return False, [], 0, "LOW"
        else:
            print("YOLO Model or Ultralytics library is not available. Real detection failed.")
            return False, [], 0, "LOW"
