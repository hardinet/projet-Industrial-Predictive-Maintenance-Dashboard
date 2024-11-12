from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import joblib
import numpy as np
from typing import List
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and scaler
model = IsolationForest(contamination=0.1, random_state=42)
scaler = StandardScaler()

class SensorData(BaseModel):
    machineId: str
    temperature: float
    vibration: float
    pressure: float
    timestamp: datetime

class PredictionResponse(BaseModel):
    machineId: str
    prediction: str
    anomaly_score: float
    timestamp: str

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: SensorData):
    try:
        # Prepare the features
        features = np.array([[
            data.temperature,
            data.vibration,
            data.pressure
        ]])
        
        # Scale the features
        scaled_features = scaler.fit_transform(features)
        
        # Make prediction
        anomaly_score = model.score_samples(scaled_features)[0]
        prediction = "normal" if anomaly_score > -0.5 else "warning"
        
        return {
            "machineId": data.machineId,
            "prediction": prediction,
            "anomaly_score": float(anomaly_score),
            "timestamp": data.timestamp.isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}