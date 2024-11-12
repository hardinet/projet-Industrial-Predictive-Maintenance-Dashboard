import React, { createContext, useContext, useState, useEffect } from 'react';
import { MaintenanceData, Alert } from '../types';
import { fetchHistoricalData } from '../api/maintenance';
import { generateHistoricalData } from '../utils/mockData';

interface DataContextType {
  historicalData: MaintenanceData[];
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [historicalData, setHistoricalData] = useState<MaintenanceData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const data = await fetchHistoricalData();
        setHistoricalData(data);
        setError(null);
      } catch (err) {
        console.warn('Using mock data due to API error:', err);
        setHistoricalData(generateHistoricalData());
        setError('Using mock data - Backend API unavailable');
      } finally {
        setLoading(false);
      }
    };

    loadHistoricalData();
  }, []);

  const contextValue = {
    historicalData,
    alerts,
    setAlerts,
    loading,
    error
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}