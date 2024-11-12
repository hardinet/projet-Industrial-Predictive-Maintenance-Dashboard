import React from 'react';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Alert } from '../types';

interface AlertListProps {
  alerts: Alert[];
}

export const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI Alerts</h2>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.filter(alert => !alert.acknowledged).length} new
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`flex items-start space-x-4 p-4 rounded-lg ${
              alert.type === 'critical' ? 'bg-red-50' : 'bg-yellow-50'
            }`}
          >
            <AlertCircle className={`w-6 h-6 ${
              alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">Machine {alert.machineId}</p>
                <span className="text-sm text-gray-500">
                  {format(new Date(alert.timestamp), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};