import React from 'react';
import { Brain } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  status?: string;
  prediction?: any;
}

export const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  status = 'normal', 
  prediction = null 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <span className={`${getStatusColor(status)} text-2xl font-bold`}>
          {value}
        </span>
      </div>
      {prediction && (
        <div className="mt-2 flex items-center space-x-2">
          <Brain className="w-4 h-4 text-purple-500" />
          <span className={`text-sm ${getStatusColor(prediction.prediction)}`}>
            AI Prediction: {prediction.prediction}
          </span>
        </div>
      )}
    </div>
  );
};