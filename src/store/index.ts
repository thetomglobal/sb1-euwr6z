import { create } from 'zustand';
import { Member, FellowshipCenter, Church } from '../types';
import { samplePastors, sampleFellowshipCenters } from './sampleData';

interface AppState {
  members: Member[];
  fellowshipCenters: FellowshipCenter[];
  churches: Church[];
  addMember: (member: Member) => void;
  assignFellowshipCenter: (memberId: string, centerId: string) => void;
}

const sampleChurches: Church[] = [
  {
    id: '1',
    name: 'Living Faith Church',
    mainAddress: 'Plot 23, Ojodu Berger, Lagos',
    location: { lat: 6.6018, lng: 3.3515 },
    fellowshipCenters: sampleFellowshipCenters.slice(0, 2),
    pastors: samplePastors.slice(0, 2),
  },
  {
    id: '2',
    name: 'Redeemed Christian Church',
    mainAddress: '1-9 Redemption Way, Lagos',
    location: { lat: 6.4698, lng: 3.3882 },
    fellowshipCenters: sampleFellowshipCenters.slice(2),
    pastors: samplePastors.slice(2),
  },
];

// Update fellowship centers with their church reference
sampleFellowshipCenters.forEach((center, index) => {
  center.church = index < 2 ? sampleChurches[0] : sampleChurches[1];
});

export const useStore = create<AppState>((set) => ({
  members: [],
  fellowshipCenters: sampleFellowshipCenters,
  churches: sampleChurches,
  
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),
    
  assignFellowshipCenter: (memberId, centerId) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              fellowshipCenter: state.fellowshipCenters.find((c) => c.id === centerId),
            }
          : member
      ),
    })),
}));