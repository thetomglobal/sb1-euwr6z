import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Home className="w-8 h-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-900">
              House Fellowship Connect
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Dashboard</span>
            </Link>
            
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}