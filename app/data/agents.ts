export type Agent = {
  id: number;
  name: string;
  title: string;
  initials: string;
  listings: number;
  deals: number;
  years: number;
  specialization: string;
  phone: string;
  email: string;
};

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Fatima Al-Hassan',
    title: 'Senior Sales Agent',
    initials: 'FA',
    listings: 47,
    deals: 38,
    years: 8,
    specialization: 'Maitama & Asokoro',
    phone: '+234 801 234 5678',
    email: 'fatima@zertekrealty.ng',
  },
  {
    id: 2,
    name: 'Emeka Okonkwo',
    title: 'Property Consultant',
    initials: 'EO',
    listings: 31,
    deals: 25,
    years: 5,
    specialization: 'Guzape & Wuse 2',
    phone: '+234 802 345 6789',
    email: 'emeka@zertekrealty.ng',
  },
  {
    id: 3,
    name: 'Amina Bello',
    title: 'Luxury Specialist',
    initials: 'AB',
    listings: 58,
    deals: 44,
    years: 11,
    specialization: 'Asokoro & Maitama',
    phone: '+234 803 456 7890',
    email: 'amina@zertekrealty.ng',
  },
  {
    id: 4,
    name: 'Chukwudi Eze',
    title: 'Rental Manager',
    initials: 'CE',
    listings: 29,
    deals: 22,
    years: 4,
    specialization: 'Jabi & Life Camp',
    phone: '+234 804 567 8901',
    email: 'chukwudi@zertekrealty.ng',
  },
];
