import axios from 'axios';
import { MaintenanceData } from '../types';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const predictMaintenance = async (data: MaintenanceData) => {
  try {
    const response = await api.post('/predict', {
      machineId: data.machineId,
      temperature: data.temperature,
      vibration: data.vibration,
      pressure: data.pressure,
      timestamp: data.timestamp
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to predict maintenance');
    }
    throw error;
  }
};

export const fetchHistoricalData = async () => {
  try {
    const response = await api.get('/historical-data');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch historical data');
    }
    throw error;
  }
};

export const saveTrainingData = async (data: MaintenanceData) => {
  try {
    const response = await api.post('/training-data', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to save training data');
    }
    throw error;
  }
};