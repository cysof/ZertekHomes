// app/components/AgentCard.tsx
import { Link } from 'react-router';
import { Phone, Mail } from 'lucide-react';
import type { Agent } from '../data/agents';

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  return (
    <div className="bg-[#1B2A4A] rounded-xl shadow-lg border border-[#4A5A4A]/20 overflow-hidden hover:shadow-2xl hover:shadow-[#F57C00]/10 hover:-translate-y-1 transition-all duration-300 group">
      {/* Image - Full width top section with better positioning */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] overflow-hidden">
        {agent.image ? (
          <img
            src={agent.image}
            alt={agent.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            style={{ objectPosition: '50% 15%' }}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className =
                  'w-full h-full bg-[#F57C00] flex items-center justify-center';
                fallback.innerHTML = `<span class="text-white text-6xl font-bold">${agent.initials}</span>`;
                parent.appendChild(fallback);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-[#F57C00] flex items-center justify-center">
            <span className="text-white text-6xl font-bold">{agent.initials}</span>
          </div>
        )}
        
        {/* Verified Badge - Overlay on image */}
        <div className="absolute top-3 right-3 bg-[#F57C00] text-white text-[10px] font-bold px-3 py-1.5 rounded-full border-2 border-[#1B2A4A] shadow-lg">
          Verified
        </div>
        
        {/* Gradient overlay at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1B2A4A] to-transparent"></div>
      </div>

      {/* Info - Bottom section */}
      <div className="p-5 pt-4 relative">
        <h3 className="font-bold text-white text-lg text-center">{agent.name}</h3>
        <p className="text-[#F57C00] text-sm font-medium text-center mb-0.5">{agent.title}</p>
        <p className="text-[#8A9A8A] text-xs text-center mb-4">
          Specialises in {agent.specialization}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#4A5A4A]/30 mb-4">
          <div className="text-center">
            <p className="font-bold text-white text-lg">{agent.listings}</p>
            <p className="text-[#8A9A8A] text-[10px] uppercase tracking-wider">Listings</p>
          </div>
          <div className="text-center border-x border-[#4A5A4A]/30">
            <p className="font-bold text-white text-lg">{agent.deals}</p>
            <p className="text-[#8A9A8A] text-[10px] uppercase tracking-wider">Deals</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-white text-lg">{agent.years}yr</p>
            <p className="text-[#8A9A8A] text-[10px] uppercase tracking-wider">Exp.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-2">
          <a
            href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#F57C00] hover:bg-[#E06B00] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
          >
            <Phone size={13} />
            Call
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#2A3D5A] hover:bg-[#3A4D6A] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
          >
            <Mail size={13} />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}