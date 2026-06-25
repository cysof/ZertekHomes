// app/routes/property-detail.tsx
import { useLoaderData, Link, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  Calendar,
} from 'lucide-react';
import { api, type ApiProperty } from '../lib/api';

// ── Loader ──────────────────────────────────────────────────────────────────
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    throw new Response('Property ID is required', { status: 400 });
  }

  const property = await api.getProperty(Number(id));

  if (!property) {
    throw new Response('Property not found', { status: 404 });
  }

  return { property };
}

// ── Component ───────────────────────────────────────────────────────────────
export default function PropertyDetail() {
  const { property } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const agent = property.agent;

  const getInitials = (name: string) =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-[#4A5A4A]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#8A9A8A] hover:text-[#F57C00] font-medium text-sm transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Properties
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors border border-[#4A5A4A]/10 px-3 py-1.5 rounded-lg hover:border-[#F57C00]">
              <Heart size={15} /> Save
            </button>
            <button className="flex items-center gap-1.5 text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors border border-[#4A5A4A]/10 px-3 py-1.5 rounded-lg hover:border-[#F57C00]">
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image */}
            <div className="relative bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] rounded-2xl overflow-hidden h-80 md:h-96 flex items-center justify-center">
              {property.image_url ? (
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-8xl mb-3">🏠</div>
                  <p className="text-[#8A9A8A] text-sm">{property.location}, Abuja</p>
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1B2A4A] text-white">
                  For Sale
                </span>
                {property.is_new && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F57C00] text-white">
                    New
                  </span>
                )}
              </div>
            </div>

            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#4B5320] mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-[#8A9A8A]">
                    <MapPin size={15} className="text-[#F57C00]" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-[#4B5320]">
                    {property.price_label}
                  </p>
                  <p className="text-[#8A9A8A] text-sm mt-1">asking price</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 pt-4 border-t border-[#4A5A4A]/10">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  property.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : property.status === 'reserved'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
              <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">
                About This Property
              </h2>
              <p className="text-[#8A9A8A] leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">
                  Amenities & Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 bg-[#F57C00]/5 rounded-xl px-3 py-2.5 border border-[#F57C00]/10"
                    >
                      <CheckCircle2 size={15} className="text-[#F57C00] shrink-0" />
                      <span className="text-sm text-[#1B2A4A] font-medium">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
              <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">Location</h2>
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={16} className="text-[#F57C00] mt-0.5 shrink-0" />
                <p className="text-[#8A9A8A] text-sm">{property.address}</p>
              </div>
              <div className="bg-[#F8FAFA] rounded-xl h-48 flex items-center justify-center border border-[#4A5A4A]/10">
                <div className="text-center">
                  <MapPin size={32} className="text-[#F57C00] mx-auto mb-2" />
                  <p className="text-[#1B2A4A] text-sm font-medium">
                    {property.location}, Abuja FCT
                  </p>
                  <p className="text-[#8A9A8A] text-xs mt-1">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10 sticky top-24">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">Listed By</h3>

              {agent ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#F57C00] flex items-center justify-center shrink-0 overflow-hidden">
                    {agent.image_url ? (
                      <img
                        src={agent.image_url}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {agent.initials || getInitials(agent.name)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#1B2A4A]">{agent.name}</p>
                    <p className="text-[#F57C00] text-sm">Agent</p>
                    <span className="text-xs bg-[#F57C00]/10 text-[#F57C00] px-2 py-0.5 rounded-full font-medium border border-[#F57C00]/20">
                      Verified Agent
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 mb-4">
                  <p className="text-[#8A9A8A] text-sm">No agent assigned</p>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <a
                  href={`tel:${agent?.phone ?? ''}`}
                  className={`flex items-center justify-center gap-2 w-full ${
                    agent?.phone
                      ? 'bg-[#F57C00] hover:bg-[#E06B00]'
                      : 'bg-[#8A9A8A] cursor-not-allowed pointer-events-none'
                  } text-white font-semibold py-3 rounded-xl transition-colors`}
                >
                  <Phone size={16} /> Call Agent
                </a>
                <a
                  href={`mailto:${agent?.email ?? ''}`}
                  className={`flex items-center justify-center gap-2 w-full ${
                    agent?.email
                      ? 'bg-[#1B2A4A] hover:bg-[#2A3D5A]'
                      : 'bg-[#8A9A8A] cursor-not-allowed pointer-events-none'
                  } text-white font-semibold py-3 rounded-xl transition-colors`}
                >
                  <Mail size={16} /> Send Email
                </a>
              </div>

              <div className="border-t border-[#4A5A4A]/10 pt-4">
                <h4 className="font-bold text-[#1B2A4A] mb-3">Request a Viewing</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl text-sm outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00] transition text-[#1B2A4A]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl text-sm outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00] transition text-[#1B2A4A]"
                  />
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9A8A]" />
                    <input
                      type="date"
                      className="w-full pl-9 pr-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl text-sm outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00] transition text-[#1B2A4A]"
                    />
                  </div>
                  <textarea
                    placeholder="Any questions about this property?"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl text-sm outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00] transition resize-none text-[#1B2A4A]"
                  />
                  <button className="w-full bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold py-3 rounded-xl transition-colors shadow-lg hover:shadow-[#F57C00]/30">
                    Book Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
