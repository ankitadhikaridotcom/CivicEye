# 🚀 Complete Full-Stack Deployment Guide for CivicEye AI

This guide covers deploying the entire **CivicEye AI Command Center** (Python AI Service + Node Express Backend + React Vite Frontend + MongoDB Atlas + Cloudinary).

---

## 📋 System Architecture Overview

| Component | Technology | Recommended Hosting | Cost |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | **Vercel** / Netlify | FREE |
| **Express Backend** | Node.js + Express | **Render** / Railway | FREE |
| **AI Service** | Python + FastAPI + YOLOv8 | **Render** / Railway | FREE |
| **Database** | MongoDB Atlas | **MongoDB Atlas Cloud** | FREE |
| **Media Storage** | Cloudinary CDN | **Cloudinary** | FREE |

---

## ── STEP 1: Push Code to GitHub ──

1. Open your terminal in the project root folder `civicEye`.
2. Initialize git and commit your code:
   ```bash
   git add .
   git commit -m "Deployable CivicEye full stack"
   ```
3. Push to your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/civicEye.git
   git branch -M main
   git push -u origin main
   ```

---

## ── STEP 2: Deploy Python AI Service (Render) ──

1. Log in to [Render.com](https://render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository `civicEye`.
4. Fill in the deployment details:
   - **Name**: `civiceye-ai-service`
   - **Root Directory**: `ai-service`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**.
6. Copy your deployed AI Service URL once live (e.g., `https://civiceye-ai-service.onrender.com`).

---

## ── STEP 3: Deploy Express Backend (Render) ──

1. On [Render.com](https://render.com/), click **New +** -> **Web Service**.
2. Connect the same `civicEye` GitHub repository.
3. Fill in the deployment details:
   - **Name**: `civiceye-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Under **Environment Variables**, add the following keys:
   - `PORT` = `5000`
   - `MONGODB_URI` = `mongodb+srv://ankit:ankit@cluster0.gastdvy.mongodb.net/?appName=Cluster0`
   - `AI_SERVICE_URL` = `https://civiceye-ai-service.onrender.com` *(Use URL from Step 2)*
   - `CLOUDINARY_CLOUD_NAME` = `your_actual_cloud_name`
   - `CLOUDINARY_API_KEY` = `173988344655914`
   - `CLOUDINARY_API_SECRET` = `_qhpmYjmwqzdXNjBEIKXsBb49PM`
5. Click **Create Web Service**.
6. Copy your deployed Backend URL once live (e.g., `https://civiceye-backend.onrender.com`).

---

## ── STEP 4: Update Frontend API URL & Deploy (Vercel) ──

1. In your code, update `frontend/src/utils/api.js`:
   - Change `BASE_URL` from `http://localhost:5000/api` to `https://civiceye-backend.onrender.com/api`
2. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update frontend API URL for production"
   git push origin main
   ```
3. Log in to [Vercel](https://vercel.com/).
4. Click **Add New...** -> **Project**.
5. Import your `civicEye` repository.
6. Configure the Vercel project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
7. Click **Deploy**.

---

## 🎉 YOUR FULL STACK LIVE SYSTEM IS NOW ONLINE!

- **Frontend App**: `https://civiceye.vercel.app`
- **Backend API**: `https://civiceye-backend.onrender.com/api/issues`
- **AI YOLO Detection**: `https://civiceye-ai-service.onrender.com/predict`
- **Database**: MongoDB Atlas Cloud
- **Media CDN**: Cloudinary Cloud Storage
