// app/routes/agents.tsx (or pages/Agents.tsx depending on your setup)
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Award,
  CheckCircle2,
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
  const locations = ['All', ...new Set(agents.map((agent) => agent.location))];
  const specialties = [
    'All',
    ...new Set(agents.map((agent) => agent.specialty)),
  ];

  // Filter agents based on search and filters
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === 'All' || agent.location === selectedLocation;
    const matchesSpecialty =
      selectedSpecialty === 'All' || agent.specialty === selectedSpecialty;
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Expert Agents
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Professional real estate agents dedicated to helping you find your
              dream property in Abuja. With years of experience and local
              expertise, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Award size={16} className="text-green-400" />
                <span>50+ Expert Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Home size={16} className="text-green-400" />
                <span>1000+ Properties Sold</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Star size={16} className="text-green-400" />
                <span>4.9 Rating Average</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white"
            >
              <Filter size={18} />
              Filters
              {(selectedLocation !== 'All' || selectedSpecialty !== 'All') && (
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  <X size={16} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
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
        <p className="text-gray-600 text-sm">
          Found{' '}
          <span className="font-semibold text-green-600">
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
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No agents found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={resetFilters}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition"
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
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  {/* Agent Header with Gradient */}
                  <div className="relative bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-green-600">
                          {agent.initials}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                        <p className="text-green-100 text-sm">{agent.title}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="text-sm font-medium">
                            {agent.rating}
                          </span>
                          <span className="text-xs text-green-100">
                            ({agent.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 backdrop-blur rounded-full px-2 py-1 text-xs font-medium">
                        {agent.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Agent Details */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-green-600 shrink-0" />
                        <span className="text-sm">{agent.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase
                          size={16}
                          className="text-green-600 shrink-0"
                        />
                        <span className="text-sm">
                          {agent.experience} years experience
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Home size={16} className="text-green-600 shrink-0" />
                        <span className="text-sm">
                          {agent.propertiesSold} properties sold
                        </span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-gray-100">
                      <div className="text-center bg-gray-50 rounded-xl p-2">
                        <p className="text-lg font-bold text-gray-900">
                          {agent.deals}
                        </p>
                        <p className="text-xs text-gray-500">Closed Deals</p>
                      </div>
                      <div className="text-center bg-gray-50 rounded-xl p-2">
                        <p className="text-lg font-bold text-gray-900">
                          {agent.listings}
                        </p>
                        <p className="text-xs text-gray-500">Active Listings</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Link
                        to={`/agents/${agent.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        View Profile
                      </Link>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${agent.phone}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors"
                        >
                          <Phone size={14} />
                          Call
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors"
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
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                            ? 'bg-green-600 text-white'
                            : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
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
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Are you a licensed real estate professional looking to grow your
            career? Join our network of expert agents and access exclusive
            listings.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg">
            Become an Agent
          </button>
        </div>
      </div>
    </div>
  );
}
