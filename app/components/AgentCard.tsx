// app/components/AgentCard.tsx
import { Link } from 'react-router';
import { Phone } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import type { Agent } from '../data/agents';

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link
      to={`/agents/${agent.id}`}
      className="bg-[#1B2A4A] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#F57C00]/10 transition-all duration-300 overflow-hidden group border border-[#4A5A4A]/20 flex flex-col cursor-pointer"
    >
      {/* Agent Image - Full width top with circular crop */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] overflow-hidden flex items-center justify-center">
        {agent.image ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] aspect-square rounded-full overflow-hidden border-4 border-[#F57C00]/30 group-hover:border-[#F57C00] transition-all duration-300 shadow-lg">
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
                    fallback.innerHTML = `<span class="text-white text-5xl font-bold">${getInitials(agent.name)}</span>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="w-[70%] aspect-square rounded-full bg-[#F57C00] flex items-center justify-center border-4 border-[#F57C00]/30 group-hover:border-[#F57C00] transition-all duration-300">
            <span className="text-white text-5xl font-bold">{getInitials(agent.name)}</span>
          </div>
        )}
        
        {/* Verified Badge */}
        <div className="absolute top-3 right-3 bg-[#F57C00] text-white text-[10px] font-bold px-3 py-1.5 rounded-full border-2 border-[#1B2A4A] shadow-lg z-10">
          Verified
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1B2A4A] to-transparent"></div>
      </div>

      {/* Agent Details - Compact Bottom section */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white text-center">{agent.name}</h3>
        <p className="text-[#F57C00] text-sm font-medium text-center">{agent.position}</p>
        
        {/* Contact Buttons - Compact with Social Icons */}
        <div className="flex items-center gap-1.5 mt-3 justify-center">
          {/* Call Button */}
          <a
            href={`tel:${agent.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 bg-[#F57C00] hover:bg-[#E06B00] text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors flex-1"
          >
            <Phone size={12} />
            Call
          </a>
          
          {/* Social Icons - Small */}
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-[#2A3D5A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group/social"
            aria-label="Facebook"
          >
            <FaFacebook size={12} className="text-[#8A9A8A] group-hover/social:text-white transition-colors" />
          </a>
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-[#2A3D5A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group/social"
            aria-label="Twitter"
          >
            <FaTwitter size={12} className="text-[#8A9A8A] group-hover/social:text-white transition-colors" />
          </a>
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-[#2A3D5A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group/social"
            aria-label="Instagram"
          >
            <FaInstagram size={12} className="text-[#8A9A8A] group-hover/social:text-white transition-colors" />
          </a>
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-[#2A3D5A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group/social"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={12} className="text-[#8A9A8A] group-hover/social:text-white transition-colors" />
          </a>
        </div>
      </div>
    </Link>
  );
}