// app/routes/agents.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Award,
  Home,
} from 'lucide-react';
import { agents } from '../data/agents';
import AgentCard from '../components/AgentCard';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 6;

  // Filter agents based on search
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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

      {/* Search Bar */}
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
                placeholder="Search by agent name or position..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent bg-white text-[#1B2A4A]"
              />
            </div>

            {/* Clear Search Button */}
            {searchTerm && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-[#1B2A4A] hover:text-[#F57C00] border border-[#4A5A4A]/20 rounded-xl hover:bg-[#F57C00]/5 transition"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
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
              Try adjusting your search
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold px-6 py-2 rounded-xl transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
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