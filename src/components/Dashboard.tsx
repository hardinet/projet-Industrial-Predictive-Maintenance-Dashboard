import React, { useState, useEffect } from 'react';
import { Brain, Thermometer, Gauge, Vibrate } from 'lucide-react';
import { MaintenanceData, Alert } from '../types';
import { predictMaintenance } from '../api/maintenance';
import { generateUUID } from '../utils/uuid';
import { useData } from '../context/DataContext';
import { StatusCard } from './StatusCard';
import { ParameterChart } from './ParameterChart';
import { AlertList } from './AlertList';

const generateMockData = (): MaintenanceData => ({
  id: generateUUID(),
  timestamp: new Date().toISOString(),
  machineId: 'MACH-001',
  temperature: 70 + Math.random() * 20,
  vibration: 0.5 + Math.random() * 0.5,
  pressure: 100 + Math.random() * 30,
  status: 'normal'
});

export default function Dashboard() {
  const { error: contextError } = useData();
  const [data, setData] = useState<MaintenanceData[]>([]);
  const [prediction, setPrediction] = useState(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with one data point
    setData([generateMockData()]);

    const interval = setInterval(async () => {
      const newData = generateMockData();
      
      try {
        const predictionResult = await predictMaintenance(newData);
        setPrediction(predictionResult);
        setError(null);
        
        if (predictionResult.prediction === 'warning') {
          const newAlert: Alert = {
            id: generateUUID(),
            machineId: newData.machineId,
            type: 'warning',
            message: `Anomaly detected (score: ${predictionResult.anomaly_score.toFixed(3)})`,
            timestamp: new Date().toISOString(),
            acknowledged: false
          };
          setAlerts(prev => [newAlert, ...prev]);
        }
        
        newData.status = predictionResult.prediction;
      } catch (err) {
        console.warn('Using mock prediction due to API error:', err);
        newData.status = Math.random() > 0.9 ? 'warning' : 'normal';
        setError('Using mock data - Backend API unavailable');
      } finally {
        setData(prev => [...prev, newData].slice(-24));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentData = data[data.length - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-purple-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AI Predictive Maintenance</h1>
            </div>
            <div className="flex items-center space-x-4">
              {(error || contextError) && (
                <span className="text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
                  {error || contextError}
                </span>
              )}
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Temperature"
            value={`${currentData?.temperature.toFixed(1)}°C`}
            icon={Thermometer}
            status={currentData?.status}
            prediction={prediction}
          />
          <StatusCard
            title="Vibration"
            value={`${currentData?.vibration.toFixed(2)} g`}
            icon={Vibrate}
            status={currentData?.status}
            prediction={prediction}
          />
          <StatusCard
            title="Pressure"
            value={`${currentData?.pressure.toFixed(0)} PSI`}
            icon={Gauge}
            status={currentData?.status}
            prediction={prediction}
          />
        </div>

        <ParameterChart data={data} />
        <AlertList alerts={alerts} />
      </main>
    </div>
  );
}