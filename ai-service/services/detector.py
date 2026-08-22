import os
import cv2
import numpy as np

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
                    self.model = YOLO(model_path)
                    print(f"YOLO11n model loaded successfully from {model_path}")
                except Exception as e:
                    print(f"Error loading YOLO model from {model_path}: {e}")
            else:
                print(f"ERROR: YOLO model not found at {model_path}")

    def detect(self, image_path, output_path, conf_threshold=0.15):
        """
        Detects garbage in the image using the real CivicWatch_FINAL_best.pt model,
        draws bounding boxes, and saves the annotated image to output_path.
        Returns: (success, detections, count, severity)
        """
        image = cv2.imread(image_path)
        if image is None:
            print(f"Failed to read image at {image_path}")
            return False, [], 0, "LOW"

        height, width = image.shape[:2]
        detections = []

        # If real YOLO model is available
        if ULTRALYTICS_AVAILABLE and self.model is not None:
            try:
                # Run real YOLO inference
                results = self.model(image_path, conf=conf_threshold)
                annotated_img = image.copy()
                
                # Process results
                for result in results:
                    boxes = result.boxes
                    for box in boxes:
                        # Get box coordinates
                        x1, y1, x2, y2 = box.xyxy[0].tolist()
                        conf = float(box.conf[0])
                        cls = int(box.cls[0])
                        
                        # Only detect Class 0 (Garbage) as specified
                        if cls == 0:
                            class_name = "Garbage"
                            
                            detections.append({
                                "class": class_name,
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
                
                cv2.imwrite(output_path, annotated_img)
                count = len(detections)
                
                # Determine severity based on count
                if count >= 3:
                    severity = "HIGH"
                elif count >= 1:
                    severity = "MEDIUM"
                else:
                    severity = "LOW"
                    
                return True, detections, count, severity
                
            except Exception as e:
                print(f"Real YOLO detection failed: {e}")
                return False, [], 0, "LOW"
        else:
            print("YOLO Model or Ultralytics library is not available. Real detection failed.")
            return False, [], 0, "LOW"
