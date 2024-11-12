import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

# Generate synthetic training data
np.random.seed(42)
n_samples = 1000

# Normal operating conditions
temperatures = np.random.normal(75, 5, n_samples)
vibrations = np.random.normal(0.5, 0.1, n_samples)
pressures = np.random.normal(100, 10, n_samples)

# Add some anomalies
anomaly_indices = np.random.choice(n_samples, size=int(n_samples * 0.1), replace=False)
temperatures[anomaly_indices] = np.random.normal(95, 10, len(anomaly_indices))
vibrations[anomaly_indices] = np.random.normal(1.0, 0.2, len(anomaly_indices))
pressures[anomaly_indices] = np.random.normal(150, 20, len(anomaly_indices))

# Create training dataset
X = np.column_stack([temperatures, vibrations, pressures])

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the model
model = IsolationForest(contamination=0.1, random_state=42)
model.fit(X_scaled)

# Save the model and scaler
joblib.dump(model, 'model.joblib')
joblib.dump(scaler, 'scaler.joblib')

print("Model training completed and saved successfully!")