import { MaintenanceData } from '../types';
import { generateUUID } from './uuid';

export const generateHistoricalData = (days = 7): MaintenanceData[] => {
  const data: MaintenanceData[] = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = new Date(now.getTime() - (i * 3600000));
    data.unshift({
      id: generateUUID(),
      timestamp: timestamp.toISOString(),
      machineId: 'MACH-001',
      temperature: 70 + Math.random() * 20,
      vibration: 0.5 + Math.random() * 0.5,
      pressure: 100 + Math.random() * 30,
      status: Math.random() > 0.9 ? 'warning' : 'normal'
    });
  }
  
  return data;
};