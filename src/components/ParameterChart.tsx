import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';
import { format } from 'date-fns';
import { MaintenanceData } from '../types';

interface ParameterChartProps {
  data: MaintenanceData[];
}

export const ParameterChart: React.FC<ParameterChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Parameter Trends</h2>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <span className="text-sm text-gray-600">Real-time Analysis</span>
        </div>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(new Date(timestamp), 'HH:mm')}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              labelFormatter={(timestamp) => format(new Date(timestamp), 'dd/MM/yyyy HH:mm')}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#2563eb"
              name="Temperature (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="vibration"
              stroke="#16a34a"
              name="Vibration (g)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="pressure"
              stroke="#dc2626"
              name="Pressure (PSI)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};