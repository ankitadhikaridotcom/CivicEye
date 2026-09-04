import os
import uuid
import shutil
import time
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from services.detector import CivicDetector, get_process_memory_mb

# Initialize FastAPI App
app = FastAPI(
    title="CivicWatch AI Service",
    description="FastAPI service for YOLO garbage detection using CivicWatch_FINAL_best.pt",
    version="1.1.0"
)

# Enable CORS for frontend and Node backend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure directories exist
UPLOAD_DIR = "uploads"
RESULT_DIR = "results"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)
os.makedirs("model", exist_ok=True)

# Mount static directories to serve files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/results", StaticFiles(directory=RESULT_DIR), name="results")

# Initialize Detector pointing to real model CivicWatch_FINAL_best.pt
detector = CivicDetector(model_path="model/CivicWatch_FINAL_best.pt")

def cleanup_file_pair(upload_path: str, result_path: str, delay_seconds: int = 120):
    """
    Deletes the temporary upload file and annotated result file after a safety delay 
    (default 120 seconds) to ensure the frontend/backend has finished downloading 
    and displaying the image assets.
    """
    if delay_seconds > 0:
        time.sleep(delay_seconds)
    try:
        if os.path.exists(upload_path):
            os.remove(upload_path)
            print(f"[POST-REQUEST CLEANUP] Deleted upload image: {upload_path}")
    except Exception as err:
        print(f"[POST-REQUEST CLEANUP ERROR] Could not delete {upload_path}: {err}")

    try:
        if os.path.exists(result_path):
            os.remove(result_path)
            print(f"[POST-REQUEST CLEANUP] Deleted result image: {result_path}")
    except Exception as err:
        print(f"[POST-REQUEST CLEANUP ERROR] Could not delete {result_path}: {err}")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "CivicWatch AI Service",
        "detector_info": {
            "model_path": detector.model_path,
            "using_fallback": detector.model is None
        }
    }

@app.post("/predict")
async def predict(
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...),
    confidence: float = Form(0.10)
):
    req_start_time = time.time()
    mem_start = get_process_memory_mb()
    print(f"\n==================== [AI-SERVICE /predict REQUEST] ====================")
    print(f"[MEMORY] request start: {mem_start:.2f} MB")
    print(f"[DIAGNOSTIC 1] Confidence threshold received by FastAPI: {confidence} (type: {type(confidence).__name__})")
    print(f"[DIAGNOSTIC 1] Uploaded image filename: {image.filename}, Content-Type: {image.content_type}")

    # Validate file type
    content_type = image.content_type
    if content_type not in ["image/jpeg", "image/png", "image/webp", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid image type. Only JPG, PNG, and WEBP are supported.")

    # Generate unique filename
    file_id = str(uuid.uuid4())
    ext = os.path.splitext(image.filename)[1]
    if not ext:
        ext = ".jpg"
    
    filename = f"{file_id}{ext}"
    upload_path = os.path.join(UPLOAD_DIR, filename)
    result_filename = f"result_{filename}"
    result_path = os.path.join(RESULT_DIR, result_filename)

    # Save uploaded file
    t_save_start = time.time()
    try:
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded image: {str(e)}")
    t_save_sec = time.time() - t_save_start

    # Run detection
    try:
        success, detections, count, severity = detector.detect(
            upload_path, 
            result_path, 
            conf_threshold=confidence,
            imgsz=416,
            t_save_sec=t_save_sec,
            req_start_time=req_start_time
        )
        
        if not success:
            # Cleanup immediately if detection failed
            if os.path.exists(upload_path):
                os.remove(upload_path)
            if os.path.exists(result_path):
                os.remove(result_path)
            raise HTTPException(status_code=500, detail="Object detection failed.")
            
        response_payload = {
            "success": True,
            "detections": detections,
            "count": count,
            "severity": severity,
            "originalImageUrl": f"/uploads/{filename}",
            "annotatedImageUrl": f"/results/{result_filename}"
        }
        
        # Schedule post-response cleanup in background after safety delay (120s)
        background_tasks.add_task(cleanup_file_pair, upload_path, result_path, delay_seconds=120)

        print(f"[DIAGNOSTIC 5] Exact JSON response returned by /predict: {response_payload}")
        print(f"=======================================================================\n")
        return response_payload
    except Exception as e:
        # Clean up files in case of error
        if os.path.exists(upload_path):
            os.remove(upload_path)
        if os.path.exists(result_path):
            os.remove(result_path)
        raise HTTPException(status_code=500, detail=f"Error running detection: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
