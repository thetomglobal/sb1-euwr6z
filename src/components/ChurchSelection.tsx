import React from 'react';
import { Link } from 'react-router-dom';
import { Church, MapPin, Users } from 'lucide-react';
import { useStore } from '../store';

export default function ChurchSelection() {
  const churches = useStore((state) => state.churches);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-white">
          House Fellowship Connect
        </h1>
        <p className="text-xl text-gray-300">
          Join a community of believers near you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {churches.map((church) => (
          <Link
            key={church.id}
            to={`/register/${church.id}`}
            className="netflix-card p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#E50914] rounded-lg p-3">
                <Church className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {church.name}
                </h3>
                <div className="mt-3 flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{church.mainAddress}</span>
                </div>
                <div className="mt-2 flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{church.fellowshipCenters.length} Fellowship Centers</span>
                </div>
                <button className="netflix-button mt-4">
                  Join Fellowship
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Can't find your church? Contact us to add your church to our network.
        </p>
      </div>
    </div>
  );
}