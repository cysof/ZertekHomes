// app/components/AgentCard.tsx
import { useNavigate } from 'react-router';
import { Phone } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import type { Agent } from '../data/agents';

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  const navigate = useNavigate();

  const getInitials = (name?: string | null) => {
    if (!name) return '??';
    return name.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const imageUrl = agent.image_url;
  const displayName = agent.name ?? 'Unknown Agent';

  const whatsappHref = agent.whatsapp_url
    ? agent.whatsapp_url.startsWith('http')
      ? agent.whatsapp_url
      : `https://wa.me/${agent.whatsapp_url.replace(/\D/g, '')}`
    : null;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/agent/${agent.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/agent/${agent.id}`)}
      className="bg-[#1B2A4A] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#F57C00]/10 transition-all duration-300 overflow-hidden group border border-[#4A5A4A]/20 flex flex-col cursor-pointer"
    >
      {/* Agent Image */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] aspect-square rounded-full overflow-hidden border-4 border-[#F57C00]/30 group-hover:border-[#F57C00] transition-all duration-300 shadow-lg">
              <img
                src={imageUrl}
                alt={displayName}
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
                    fallback.innerHTML = `<span class="text-white text-5xl font-bold">${agent.initials ?? getInitials(displayName)}</span>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="w-[70%] aspect-square rounded-full bg-[#F57C00] flex items-center justify-center border-4 border-[#F57C00]/30 group-hover:border-[#F57C00] transition-all duration-300">
            <span className="text-white text-5xl font-bold">
              {agent.initials ?? getInitials(displayName)}
            </span>
          </div>
        )}

        {/* Verified Badge */}
        <div className="absolute top-3 right-3 bg-[#F57C00] text-white text-[10px] font-bold px-3 py-1.5 rounded-full border-2 border-[#1B2A4A] shadow-lg z-10">
          Verified
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1B2A4A] to-transparent" />
      </div>

      {/* Agent Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white text-center">{displayName}</h3>
        <p className="text-[#F57C00] text-sm font-medium text-center">{agent.position ?? 'Agent'}</p>

        {/* Contact Buttons */}
        <div className="flex items-center gap-1.5 mt-3 justify-center">
          <a
            href={agent.phone ? `tel:${agent.phone}` : undefined}
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center justify-center gap-1.5 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors flex-1 ${
              agent.phone
                ? 'bg-[#F57C00] hover:bg-[#E06B00]'
                : 'bg-[#8A9A8A] cursor-not-allowed pointer-events-none'
            }`}
          >
            <Phone size={12} />
            Call
          </a>

          {/* Social Icons */}
          {[
            { Icon: FaFacebook,  url: agent.facebook_url,  label: 'Facebook' },
            { Icon: FaTwitter,   url: agent.twitter_url,   label: 'Twitter' },
            { Icon: FaInstagram, url: agent.instagram_url, label: 'Instagram' },
            { Icon: FaLinkedin,  url: agent.linkedin_url,  label: 'LinkedIn' },
            { Icon: FaWhatsapp,  url: whatsappHref,        label: 'WhatsApp' },
          ].map(({ Icon, url, label }) => (
            <a
              key={label}
              href={url ?? '#'}
              onClick={(e) => e.stopPropagation()}
              target={url ? '_blank' : undefined}
              rel={url ? 'noopener noreferrer' : undefined}
              className="w-8 h-8 bg-[#2A3D5A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group/social"
              aria-label={label}
            >
              <Icon size={12} className="text-[#8A9A8A] group-hover/social:text-white transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}