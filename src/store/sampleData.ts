import { Church, FellowshipCenter, Pastor } from '../types';

export const samplePastors: Pastor[] = [
  {
    id: '1',
    name: 'Pastor Bunmi Adams',
    phone: '+234 806 659 8474',
    email: 'bunmi.adams@example.com',
    fellowshipCenters: [],
  },
  {
    id: '2',
    name: 'Pastor John Okafor',
    phone: '+234 803 123 4567',
    email: 'john.okafor@example.com',
    fellowshipCenters: [],
  },
  {
    id: '3',
    name: 'Pastor Sarah Emmanuel',
    phone: '+234 805 987 6543',
    email: 'sarah.emmanuel@example.com',
    fellowshipCenters: [],
  },
];

export const sampleFellowshipCenters: FellowshipCenter[] = [
  {
    id: '1',
    name: 'Faith House Centre',
    pastor: samplePastors[0],
    location: {
      lat: 6.6273,
      lng: 3.3414,
      address: '23 Berger Street, Ojodu, Lagos',
    },
    whatsappGroup: 'https://wa.me/+2348148753908',
    church: {} as Church,
    members: [],
  },
  {
    id: '2',
    name: 'Grace Assembly',
    pastor: samplePastors[1],
    location: {
      lat: 6.6018,
      lng: 3.3515,
      address: '45 Unity Road, Ikeja, Lagos',
    },
    whatsappGroup: 'https://wa.me/+2348123456789',
    church: {} as Church,
    members: [],
  },
  {
    id: '3',
    name: 'Love Chapel',
    pastor: samplePastors[2],
    location: {
      lat: 6.4698,
      lng: 3.3882,
      address: '12 Peace Avenue, Yaba, Lagos',
    },
    whatsappGroup: 'https://wa.me/+2348198765432',
    church: {} as Church,
    members: [],
  },
];