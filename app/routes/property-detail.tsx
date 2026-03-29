import { useParams, Link, useNavigate } from 'react-router';
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  Calendar,
} from 'lucide-react';
import { properties } from '../data/properties';
import { agents } from '../data/agents';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === Number(id));
  const agent = agents[Number(id) % agents.length];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🏚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Property Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            This property may have been sold or removed.
          </p>
          <Link
            to="/properties"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.location === property.location)
    .slice(0, 3);

  const allSimilar =
    similarProperties.length === 0
      ? properties.filter((p) => p.id !== property.id).slice(0, 3)
      : similarProperties;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium text-sm transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Properties
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-red-300">
              <Heart size={15} />
              Save
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-green-300">
              <Share2 size={15} />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden h-80 md:h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-3">🏠</div>
                <p className="text-gray-400 text-sm">
                  {property.location}, Abuja
                </p>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    property.type === 'For Sale'
                      ? 'bg-gray-900 text-white'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {property.type}
                </span>
                {property.isNew && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-white">
                    New
                  </span>
                )}
              </div>
            </div>

            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={15} className="text-green-500" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-green-600">
                    {property.priceLabel}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {property.type === 'For Rent' ? 'per year' : 'asking price'}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Bed size={18} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.beds}
                  </p>
                  <p className="text-gray-500 text-xs">Bedrooms</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Bath size={18} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.baths}
                  </p>
                  <p className="text-gray-500 text-xs">Bathrooms</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Maximize2 size={18} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.sqft}
                  </p>
                  <p className="text-gray-500 text-xs">Sqft</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2.5"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-green-600 shrink-0"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="flex items-start gap-2 mb-4">
                <MapPin size={16} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-gray-600 text-sm">{property.address}</p>
              </div>
              <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-green-500 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm font-medium">
                    {property.location}, Abuja FCT
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            {allSimilar.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Similar Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {allSimilar.map((p) => (
                    <Link
                      key={p.id}
                      to={`/properties/${p.id}`}
                      className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-32 flex items-center justify-center">
                        <span className="text-4xl">🏠</span>
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-green-600 font-bold text-sm mt-1">
                          {p.priceLabel}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {p.location}, Abuja
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                Listed By
              </h3>

              {/* Agent Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xl font-bold">
                    {agent.initials}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{agent.name}</p>
                  <p className="text-green-600 text-sm">{agent.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Verified Agent
                    </span>
                  </div>
                </div>
              </div>

              {/* Agent Stats */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 mb-4">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{agent.listings}</p>
                  <p className="text-gray-400 text-xs">Listings</p>
                </div>
                <div className="text-center border-x border-gray-100">
                  <p className="font-bold text-gray-900">{agent.deals}</p>
                  <p className="text-gray-400 text-xs">Deals</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{agent.years}yr</p>
                  <p className="text-gray-400 text-xs">Exp.</p>
                </div>
              </div>

              {/* Contact Buttons - FIXED */}
              <div className="space-y-2 mb-6">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <Phone size={16} />
                  Call Agent
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  <Mail size={16} />
                  Send Email
                </a>
              </div>

              {/* Inquiry Form */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-900 mb-3">
                  Request a Viewing
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                  />
                  <div className="relative">
                    <Calendar
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="date"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                    />
                  </div>
                  <textarea
                    placeholder="Any questions about this property?"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition resize-none"
                  />
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors">
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
