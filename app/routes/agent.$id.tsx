// app/routes/agent.$id.tsx
import { useLoaderData, Link, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import {
  ArrowLeft,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Home,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { api, type ApiAgent, type ApiProperty } from '../lib/api';
import PropertyCard from '../components/PropertyCard';

// ── Loader ──────────────────────────────────────────────────────────────────
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response('Agent ID is required', { status: 400 });
  }

  try {
    const agent = await api.getAgent(Number(id));
    
    // Fetch properties listed by this agent
    const propertiesResponse = await api.getProperties({ 
      agent: Number(id),
      status: 'available'
    });
    const properties = propertiesResponse.results || [];

    return { agent, properties };
  } catch (error) {
    console.error('Error fetching agent:', error);
    throw new Response('Agent not found', { status: 404 });
  }
}

// ── Component ───────────────────────────────────────────────────────────────
export default function AgentDetail() {
  const { agent, properties } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const getInitials = (name: string) =>
    name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || 'A';

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">Agent Not Found</h1>
          <p className="text-[#8A9A8A] mb-6">The agent you're looking for doesn't exist.</p>
          <Link
            to="/agents"
            className="bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            View All Agents
          </Link>
        </div>
      </div>
    );
  }

  const profileImage = agent.image_url || agent.user?.image_url || null;
  const fullName = agent.name || agent.user?.full_name || 'Unknown Agent';
  const position = agent.position || agent.specialization || 'Real Estate Agent';
  const phone = agent.phone || agent.user?.phone || 'N/A';
  const email = agent.email || agent.user?.email || 'N/A';

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-[#4A5A4A]/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#8A9A8A] hover:text-[#F57C00] font-medium text-sm transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Agents
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Picture */}
                <div className="w-32 h-32 rounded-full bg-[#F57C00] flex items-center justify-center shrink-0 overflow-hidden border-4 border-[#F57C00]/30">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {getInitials(fullName)}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">
                      {fullName}
                    </h1>
                    <span className="text-xs bg-[#F57C00]/10 text-[#F57C00] px-3 py-1 rounded-full font-medium border border-[#F57C00]/20 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Verified Agent
                    </span>
                  </div>
                  <p className="text-[#F57C00] font-medium mt-1">{position}</p>
                  <p className="text-[#8A9A8A] text-sm mt-1">
                    {agent.specialization && `Specializes in ${agent.specialization}`}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-[#4A5A4A]/10">
                    {agent.years_experience !== undefined && agent.years_experience > 0 && (
                      <div className="flex items-center gap-2 text-sm text-[#8A9A8A]">
                        <Award size={16} className="text-[#F57C00]" />
                        <span>{agent.years_experience} years experience</span>
                      </div>
                    )}
                    {properties.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-[#8A9A8A]">
                        <Home size={16} className="text-[#F57C00]" />
                        <span>{properties.length} properties listed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {agent.bio && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">About</h2>
                <p className="text-[#8A9A8A] leading-relaxed">{agent.bio}</p>
              </div>
            )}

            {/* Properties Listed */}
            {properties.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-6">
                  Properties Listed by {fullName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.map((property: ApiProperty) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10 sticky top-24">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">Contact Information</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#8A9A8A]">
                  <Phone size={16} className="text-[#F57C00] shrink-0" />
                  <a href={`tel:${phone}`} className="text-sm hover:text-[#F57C00] transition-colors">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#8A9A8A]">
                  <Mail size={16} className="text-[#F57C00] shrink-0" />
                  <a href={`mailto:${email}`} className="text-sm hover:text-[#F57C00] transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#4A5A4A]/10">
                <h4 className="font-medium text-[#1B2A4A] text-sm mb-3">Connect on Social Media</h4>
                <div className="flex gap-2 flex-wrap">
                  {agent.facebook_url && (
                    <a
                      href={agent.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#1B2A4A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <FaFacebook size={16} className="text-[#8A9A8A] group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {agent.instagram_url && (
                    <a
                      href={agent.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#1B2A4A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <FaInstagram size={16} className="text-[#8A9A8A] group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {agent.twitter_url && (
                    <a
                      href={agent.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#1B2A4A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <FaTwitter size={16} className="text-[#8A9A8A] group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {agent.linkedin_url && (
                    <a
                      href={agent.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#1B2A4A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <FaLinkedin size={16} className="text-[#8A9A8A] group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {agent.whatsapp_url && (
                    <a
                      href={agent.whatsapp_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#1B2A4A] hover:bg-[#F57C00] rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <FaWhatsapp size={16} className="text-[#8A9A8A] group-hover:text-white transition-colors" />
                    </a>
                  )}
                </div>
                {!agent.facebook_url && !agent.instagram_url && !agent.twitter_url && !agent.linkedin_url && !agent.whatsapp_url && (
                  <p className="text-[#8A9A8A] text-xs">No social links available</p>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="mt-6 pt-6 border-t border-[#4A5A4A]/10 space-y-2">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <Phone size={16} /> Call Agent
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#1B2A4A] hover:bg-[#2A3D5A] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <Mail size={16} /> Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}