import os
import uuid
import shutil
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from services.detector import CivicDetector

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
    image: UploadFile = File(...),
    confidence: float = Form(0.15)
):
    print(f"\n==================== [AI-SERVICE /predict REQUEST] ====================")
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
    try:
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded image: {str(e)}")

    # Run detection
    try:
        success, detections, count, severity = detector.detect(
            upload_path, 
            result_path, 
            conf_threshold=confidence
        )
        
        if not success:
            raise HTTPException(status_code=500, detail="Object detection failed.")
            
        response_payload = {
            "success": True,
            "detections": detections,
            "count": count,
            "severity": severity,
            "originalImageUrl": f"/uploads/{filename}",
            "annotatedImageUrl": f"/results/{result_filename}"
        }
        
        print(f"[DIAGNOSTIC 5] Exact JSON response returned by /predict: {response_payload}")
        print(f"=======================================================================\n")
        return response_payload
    except Exception as e:
        # Clean up uploaded file in case of error
        if os.path.exists(upload_path):
            os.remove(upload_path)
        raise HTTPException(status_code=500, detail=f"Error running detection: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
