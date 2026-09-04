# CivicEye 🏙️

### AI-Powered Civic Issue Detection & Reporting Platform

CivicEye is a full-stack AI-powered platform designed to detect and report civic issues such as garbage and waste using computer vision.

Users can upload an image of a public area, and the AI service analyzes the image using a custom-trained YOLO model to identify civic issues, return bounding boxes and confidence scores, and classify the severity of the detected issue.

---

## 🚀 Live Demo

**Frontend:**  
https://civic-eye-eosin.vercel.app/

**AI Analysis:**  
https://civic-eye-eosin.vercel.app/ai-analysis

---

## ✨ Features

- 📸 Upload images for AI-powered analysis
- 🤖 Custom YOLO-based garbage detection
- 🎯 Bounding box localization
- 📊 Confidence score for each detection
- 🚨 Automatic severity classification
- 🗄️ MongoDB-based issue storage
- 🌐 Full-stack REST API architecture
- ☁️ Cloud deployment
- ⚡ Real-time AI analysis workflow

---

## 🧠 How It Works

```text
User
  │
  │ Upload Image
  ▼
┌──────────────────────┐
│   React Frontend     │
│      Vercel          │
└──────────┬───────────┘
           │
           │ POST /api/detect
           ▼
┌──────────────────────┐
│  Node.js + Express   │
│       Backend        │
│       Render         │
└──────────┬───────────┘
           │
           │ POST /predict
           ▼
┌──────────────────────┐
│   FastAPI AI Service │
│       Render         │
│                      │
│      YOLO11n         │
└──────────┬───────────┘
           │
           ▼
      Detection
           │
           ▼
┌──────────────────────┐
│ Detection Results    │
│ • Class              │
│ • Confidence         │
│ • Bounding Box       │
│ • Count              │
│ • Severity           │
└──────────────────────┘
