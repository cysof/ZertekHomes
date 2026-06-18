// app/routes/agents.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Award,
  Briefcase,
  Home,
} from 'lucide-react';
import { agents } from '../data/agents';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 6;

  // Get unique locations and specialties from agents
  const locations = ['All', ...new Set(agents.map((agent) => agent.specialization))];
  const specialties = [
    'All',
    ...new Set(agents.map((agent) => agent.specialization)),
  ];

  // Filter agents based on search and filters
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === 'All' || agent.specialization === selectedLocation;
    const matchesSpecialty =
      selectedSpecialty === 'All' || agent.specialization === selectedSpecialty;
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  // Pagination
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = filteredAgents.slice(
    indexOfFirstAgent,
    indexOfLastAgent
  );
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset filters
  const resetFilters = () => {
    setSelectedLocation('All');
    setSelectedSpecialty('All');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1B2A4A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Expert Agents
            </h1>
            <p className="text-[#8A9A8A] text-lg mb-8">
              Professional real estate agents dedicated to helping you find your
              dream property in Abuja. With years of experience and local
              expertise, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-[#4A5A4A]/20">
                <Award size={16} className="text-[#F57C00]" />
                <span>50+ Expert Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-[#4A5A4A]/20">
                <Home size={16} className="text-[#F57C00]" />
                <span>1000+ Properties Sold</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-[#4A5A4A]/20">
                <Award size={16} className="text-[#F57C00]" />
                <span>4.9 Rating Average</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-40 bg-white border-b border-[#4A5A4A]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A9A8A]"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by agent name or title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent bg-white text-[#1B2A4A]"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl bg-white text-[#1B2A4A]"
            >
              <Filter size={18} />
              Filters
              {(selectedLocation !== 'All' || selectedSpecialty !== 'All') && (
                <span className="w-2 h-2 bg-[#F57C00] rounded-full"></span>
              )}
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-3">
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C00] bg-white text-[#1B2A4A]"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C00] bg-white text-[#1B2A4A]"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === 'All' ? 'All Specialties' : spec}
                  </option>
                ))}
              </select>
              {(selectedLocation !== 'All' ||
                selectedSpecialty !== 'All' ||
                searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2.5 text-[#1B2A4A] hover:text-[#F57C00] border border-[#4A5A4A]/20 rounded-xl hover:bg-[#F57C00]/5 transition"
                >
                  <X size={16} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-white rounded-xl space-y-3 border border-[#4A5A4A]/20">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C00] bg-white text-[#1B2A4A]"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C00] bg-white text-[#1B2A4A]"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === 'All' ? 'All Specialties' : spec}
                  </option>
                ))}
              </select>
              {(selectedLocation !== 'All' || selectedSpecialty !== 'All') && (
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[#1B2A4A] border border-[#4A5A4A]/20 rounded-xl hover:bg-[#F57C00]/5 transition"
                >
                  <X size={16} />
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-[#8A9A8A] text-sm">
          Found{' '}
          <span className="font-semibold text-[#F57C00]">
            {filteredAgents.length}
          </span>{' '}
          agents
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedLocation !== 'All' && ` in ${selectedLocation}`}
          {selectedSpecialty !== 'All' &&
            ` specializing in ${selectedSpecialty}`}
        </p>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {filteredAgents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-[#4A5A4A]/20">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-2">
              No agents found
            </h3>
            <p className="text-[#8A9A8A] mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold px-6 py-2 rounded-xl transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-[#1B2A4A] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#F57C00]/10 transition-all duration-300 overflow-hidden group border border-[#4A5A4A]/20 flex flex-col"
                >
                  {/* Agent Image - Full width top section */}
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] overflow-hidden">
                    {agent.image ? (
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                  {/* Agent Details - Bottom section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                    <p className="text-[#F57C00] text-sm font-medium">{agent.title}</p>
                    
                    <div className="flex items-center gap-1 mt-2 mb-4">
                      <span className="text-xs bg-[#F57C00]/20 text-[#F57C00] px-2.5 py-0.5 rounded-full font-medium border border-[#F57C00]/20">
                        {agent.specialization}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-[#8A9A8A]">
                        <MapPin size={15} className="text-[#F57C00] shrink-0" />
                        <span className="text-sm">{agent.specialization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#8A9A8A]">
                        <Briefcase size={15} className="text-[#F57C00] shrink-0" />
                        <span className="text-sm">{agent.years} years experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#8A9A8A]">
                        <Home size={15} className="text-[#F57C00] shrink-0" />
                        <span className="text-sm">{agent.listings} properties listed</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-[#4A5A4A]/20">
                      <div className="text-center bg-[#2A3D5A] rounded-xl p-2">
                        <p className="text-lg font-bold text-white">{agent.deals}</p>
                        <p className="text-[10px] text-[#8A9A8A] uppercase tracking-wider">Closed Deals</p>
                      </div>
                      <div className="text-center bg-[#2A3D5A] rounded-xl p-2">
                        <p className="text-lg font-bold text-white">{agent.listings}</p>
                        <p className="text-[10px] text-[#8A9A8A] uppercase tracking-wider">Active Listings</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 mt-auto">
                      <Link
                        to={`/agents/${agent.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        View Profile
                      </Link>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${agent.phone}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#2A3D5A] hover:bg-[#3A4D6A] text-white font-medium py-2.5 rounded-xl transition-colors"
                        >
                          <Phone size={14} />
                          Call
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#2A3D5A] hover:bg-[#3A4D6A] text-white font-medium py-2.5 rounded-xl transition-colors"
                        >
                          <Mail size={14} />
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#4A5A4A]/20 rounded-lg hover:bg-[#F57C00]/5 disabled:opacity-50 disabled:cursor-not-allowed transition text-[#1B2A4A]"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 rounded-lg font-medium transition ${
                          currentPage === number
                            ? 'bg-[#F57C00] text-white'
                            : 'border border-[#4A5A4A]/20 hover:bg-[#F57C00]/5 text-[#1B2A4A]'
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#4A5A4A]/20 rounded-lg hover:bg-[#F57C00]/5 disabled:opacity-50 disabled:cursor-not-allowed transition text-[#1B2A4A]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-[#1B2A4A] mt-12 border-t border-[#4A5A4A]/20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-[#8A9A8A] mb-6 max-w-2xl mx-auto">
            Are you a licensed real estate professional looking to grow your
            career? Join our network of expert agents and access exclusive
            listings.
          </p>
          <button className="bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg hover:shadow-[#F57C00]/30">
            Become an Agent
          </button>
        </div>
      </div>
    </div>
  );
}