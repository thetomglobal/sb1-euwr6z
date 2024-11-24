import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MapPin, Users, Church, Home } from 'lucide-react';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import ChurchSelection from './components/ChurchSelection';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ChurchSelection />} />
            <Route path="/register/:churchId" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;