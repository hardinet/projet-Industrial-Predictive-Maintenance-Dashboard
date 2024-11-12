import React from 'react';
import Dashboard from './components/Dashboard';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
}

export default App;