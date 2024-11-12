export interface MaintenanceData {
  id: string;
  timestamp: string;
  machineId: string;
  temperature: number;
  vibration: number;
  pressure: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface Alert {
  id: string;
  machineId: string;
  type: 'warning' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}