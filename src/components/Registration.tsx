import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, User, Mail, Phone, Calendar, Church as ChurchIcon } from 'lucide-react';
import { Member } from '../types';
import { useStore } from '../store';

export default function Registration() {
  const { churchId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignedCenter, setAssignedCenter] = useState<any>(null);

  const addMember = useStore((state) => state.addMember);
  const fellowshipCenters = useStore((state) => state.fellowshipCenters);

  const findNearestCenter = (userLat: number, userLng: number) => {
    return fellowshipCenters.reduce((nearest, center) => {
      const distance = Math.sqrt(
        Math.pow(center.location.lat - userLat, 2) + 
        Math.pow(center.location.lng - userLng, 2)
      );
      return !nearest || distance < nearest.distance 
        ? { center, distance }
        : nearest;
    }, null as { center: any; distance: number } | null);
  };

  const onSubmit = async (data: any) => {
    if (!location) return;
    setIsSubmitting(true);

    const nearest = findNearestCenter(location.lat, location.lng);
    if (!nearest) return;

    const member: Member = {
      id: crypto.randomUUID(),
      ...data,
      location,
      church: churchId!,
      createdAt: new Date().toISOString(),
      fellowshipCenter: nearest.center,
    };

    addMember(member);
    setAssignedCenter(nearest.center);
    setIsSubmitting(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!assignedCenter ? (
        <div className="netflix-card p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Fellowship
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('fullName', { required: true })}
                    className="netflix-input pl-10 w-full"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    className="netflix-input pl-10 w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Phone (WhatsApp)
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('phone', { required: true })}
                    type="tel"
                    className="netflix-input pl-10 w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Birthday
                </label>
                <div className="mt-1 relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('birthday', { required: true })}
                    type="date"
                    className="netflix-input pl-10 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Membership Level
                </label>
                <select
                  {...register('membershipLevel', { required: true })}
                  className="netflix-input w-full"
                >
                  <option value="">Select membership level</option>
                  <option value="New">New Member</option>
                  <option value="Existing">Existing Member</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Group
                </label>
                <select
                  {...register('group', { required: true })}
                  className="netflix-input w-full"
                >
                  <option value="">Select your group</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Youth">Youth</option>
                  <option value="Teens">Teens</option>
                  <option value="Children">Children</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Marital Status
                </label>
                <select
                  {...register('maritalStatus', { required: true })}
                  className="netflix-input w-full"
                >
                  <option value="">Select marital status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Address
                </label>
                <textarea
                  {...register('address', { required: true })}
                  className="netflix-input w-full"
                  rows={3}
                  placeholder="Enter your address"
                />
              </div>

              <button
                type="button"
                onClick={getCurrentLocation}
                className="netflix-button w-full flex items-center justify-center"
                disabled={isSubmitting}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Current Location
              </button>

              <button
                type="submit"
                className="netflix-button w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="netflix-card p-8 text-center">
          <div className="bg-[#E50914] inline-block rounded-full p-4 mb-6">
            <ChurchIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to the Family!
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            You've been assigned to {assignedCenter.name}
          </p>
          <div className="bg-[#2F2F2F] rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Your Fellowship Pastor
            </h3>
            <p className="text-gray-300">{assignedCenter.pastor.name}</p>
            <p className="text-gray-300">{assignedCenter.pastor.phone}</p>
          </div>
          <a
            href={assignedCenter.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="netflix-button inline-flex items-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            Join WhatsApp Group
          </a>
        </div>
      )}
    </div>
  );
}