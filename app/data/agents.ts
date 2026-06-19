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
  position: string;
  phone: string;
  email: string;
  image?: string;
};

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Dr. Ebenezer Ogbu',
    position: 'Managing Director (MD)',
    phone: '+234 7068022889',
    email: 'drebiogbu@zertekrealty.ng',
    image: zertekEbenezer,
  },
  {
    id: 2,
    name: 'Eng. Clinton Ebisike',
    position: 'General Manager (GM)',
    phone: '+234 7060609650',
    email: 'clinton@zertekrealty.ng',
    image: agentClintin,
  },
  {
    id: 3,
    name: 'Mrs. Temitope Ogunshola',
    position: 'Sales Manager',
    phone: '+234 7037649777',
    email: 'temitope@zertekrealty.ng',
    image: agenttemmi,
  },
  {
    id: 4,
    name: 'Mercy Dogara',
    position: 'Senior Sales Agent',
    phone: '+234 7034233560',
    email: 'mercy@zertekrealty.ng',
    image: agentMercy,
  },
  {
    id: 5,
    name: 'Engr. Joseph Emmanuel J',
    position: 'Property Consultant',
    phone: '+234 8143963693',
    email: 'joseph@zertekrealty.ng',
    image: agentEmma,
  },
  {
    id: 6,
    name: 'Ngozi Okere',
    position: 'Marketing Executive',
    phone: '+234 8055551212',
    email: 'ngozi@zertekrealty.ng',
    image: agentNogozi,
  },
];