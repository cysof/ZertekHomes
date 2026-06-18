// app/data/agents.ts
import agentClintin from '../static/topagents/Clinton.jpeg';
import agentEmma from '../static/topagents/Emma.jpeg';
import agentMercy from '../static/topagents/mercy.jpeg';
import zertekEbenezer from '../static/topagents/MD.jpeg';
import agenttemmi from '../static/topagents/temi.jpeg';
import agentNogozi from '../static/topagents/Nogozi.jpeg';

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
  image?: string; // Optional image path for agent photo
};

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Dr. Ebenezer Ogbu',
    title: 'MD',
    initials: 'EO',
    listings: 47,
    deals: 38,
    years: 10,
    specialization: 'Guzape, Asokoro & Maitama...',
    phone: '+234 7068022889',
    email: 'drebiogbu@zertekrealty.ng',
    image: zertekEbenezer,
  },
  {
    id: 2,
    name: 'Eng. Clinton Ebisike',
    title: 'Senior Sales Agent',
    initials: 'CE',
    listings: 47,
    deals: 38,
    years: 5,
    specialization: 'Guzape, Asokoro & Maitama...',
    phone: '+234 7060609650',
    email: 'clinton@zertekrealty.ng',
    image: agentClintin,
  },
  {
    id: 3,
    name: 'Mrs. Temitope Ogunshola',
    title: 'Property Consultant',
    initials: 'TO',
    listings: 31,
    deals: 25,
    years: 5,
    specialization: 'Guzape, Lugbe, Apo Hilltop',
    phone: '+234 7037649777',
    email: 'temitope@zertekrealty.ng',
    image: agenttemmi,
  },

    {
    id: 4,
    name: 'Mercy Dogara',
    title: 'Luxury Specialist',
    initials: 'MD',
    listings: 58,
    deals: 44,
    years: 11,
    specialization: 'Pyakasa & Kuje',
    phone: '+234 7034233560',
    email: 'mercy@zertekrealty.ng',
    image: agentMercy,
  },
  
  {
    id: 5,
    name: 'Engr. Joseph Emmanuel J',
    title: 'Property Consultant',
    initials: 'JE',
    listings: 31,
    deals: 25,
    years: 5,
    specialization: 'Guzape, Lugbe, Apo Hilltop',
    phone: '+234 8143963693',
    email: 'joseph@zertekrealty.ng',
    image: agentEmma,
  },

  {
    id: 6,
    name: 'Ngozi Okere',
    title: 'Rental Manager',
    initials: 'NO',
    listings: 29,
    deals: 22,
    years: 4,
    specialization: 'Jabi & Life Camp',
    phone: '+234 ',
    email: 'ngozi@zertekrealty.ng',
    image: agentNogozi,
    // No image — will show initials
  },
];