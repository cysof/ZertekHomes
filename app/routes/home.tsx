import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, MapPin, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { properties } from '../data/properties';
import { agents } from '../data/agents';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import FeaturedCarousel from '../components/FeaturedCarousel';

const heroSlides = [
  {
    id: 1,
    title: 'Find Your Perfect Home in Abuja',
    subtitle: "Luxury living in the heart of Nigeria's capital city",
    location: 'Maitama, Abuja',
    bg: 'from-gray-900 via-green-950 to-gray-900',
    emoji: '🏛',
  },
  {
    id: 2,
    title: 'Premium Properties in Asokoro',
    subtitle: 'Diplomatic zone living with world-class amenities',
    location: 'Asokoro, Abuja',
    bg: 'from-gray-900 via-blue-950 to-gray-900',
    emoji: '🏰',
  },
  {
    id: 3,
    title: 'Modern Homes in Guzape District',
    subtitle: 'Contemporary architecture meets Abuja comfort',
    location: 'Guzape, Abuja',
    bg: 'from-gray-900 via-emerald-950 to-gray-900',
    emoji: '🏠',
  },
  {
    id: 4,
    title: 'Luxury Apartments in Wuse 2',
    subtitle: 'City centre living with panoramic views',
    location: 'Wuse 2, Abuja',
    bg: 'from-gray-900 via-teal-950 to-gray-900',
    emoji: '🏢',
  },
  {
    id: 5,
    title: 'Family Homes in Jabi & Life Camp',
    subtitle: 'Safe, serene estates perfect for families',
    location: 'Jabi, Abuja',
    bg: 'from-gray-900 via-slate-900 to-gray-900',
    emoji: '🏡',
  },
];

export default function Home() {
  const forSale = properties.filter((p) => p.type === 'For Sale');
  const forRent = properties.filter((p) => p.type === 'For Rent');
  const featuredProperties = properties.filter((p) => p.isFeatured);
  const topAgents = agents.slice(0, 4);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Slideshow */}
      <section
        className={`relative bg-gradient-to-r ${slide.bg} text-white py-24 px-4 transition-all duration-1000 min-h-[600px] flex items-center`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        {/* Big background emoji */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[220px] opacity-5 select-none transition-all duration-1000 hidden lg:block">
          {slide.emoji}
        </div>

        <div className="relative max-w-4xl mx-auto text-center w-full">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-6 transition-all duration-700">
            <MapPin size={14} className="text-green-400" />
            <span className="text-green-400 text-sm font-medium">
              {slide.location}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={currentSlide}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          >
            {slide.title.split('Abuja')[0]}
            <span className="text-green-400">
              {slide.title.includes('Abuja') ? 'Abuja' : ''}
            </span>
            {slide.title.split('Abuja')[1] || ''}
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto transition-all duration-700">
            {slide.subtitle}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
            <select className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 rounded-xl text-sm outline-none">
              <option value="">All Locations</option>
              <option>Maitama</option>
              <option>Asokoro</option>
              <option>Guzape</option>
              <option>Wuse 2</option>
              <option>Jabi</option>
              <option>Life Camp</option>
              <option>Gwarinpa</option>
              <option>Katampe</option>
            </select>
            <select className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 rounded-xl text-sm outline-none">
              <option value="">Property Type</option>
              <option>Detached Duplex</option>
              <option>Semi-Detached</option>
              <option>Flat / Apartment</option>
              <option>Bungalow</option>
              <option>Terrace</option>
              <option>Penthouse</option>
              <option>Land</option>
              <option>Commercial</option>
            </select>
            <select className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 rounded-xl text-sm outline-none">
              <option value="">Buy or Rent</option>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <Link
              to="/properties"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              <Search size={18} />
              Search
            </Link>
          </div>

          {/* Slide Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'bg-green-400 w-6 h-2'
                    : 'bg-white/30 hover:bg-white/50 w-2 h-2'
                }`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { num: '2,400+', label: 'Properties' },
              { num: '850+', label: 'Happy Clients' },
              { num: '48', label: 'Expert Agents' },
              { num: '10yr', label: 'Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.num}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Carousel */}
      <FeaturedCarousel properties={featuredProperties} />

      {/* For Sale Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Buy a Home
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                Properties For Sale
              </h2>
              <p className="text-gray-500 mt-2">
                Premium homes available for purchase across Abuja
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden md:flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm border-b border-green-600 pb-0.5 transition-colors"
            >
              View All Properties →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forSale.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* For Rent Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Rent a Home
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                Properties For Rent
              </h2>
              <p className="text-gray-500 mt-2">
                Monthly and yearly lease options available
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden md:flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm border-b border-green-600 pb-0.5 transition-colors"
            >
              View All Rentals →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forRent.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold">
              Abuja's Most Trusted Property Marketplace
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              From luxury villas in Maitama to affordable homes in Gwarinpa — we
              connect buyers, sellers and tenants with verified properties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield size={28} className="text-green-400" />,
                title: '100% Verified',
                desc: 'Every property is physically inspected and verified by our team before listing.',
              },
              {
                icon: <Users size={28} className="text-green-400" />,
                title: 'Expert Agents',
                desc: '48 licensed agents with deep knowledge of every Abuja district.',
              },
              {
                icon: <TrendingUp size={28} className="text-green-400" />,
                title: 'Best Prices',
                desc: 'We negotiate the best deals and ensure fair market pricing for all transactions.',
              },
              {
                icon: <Clock size={28} className="text-green-400" />,
                title: '24/7 Support',
                desc: 'Our team is available around the clock to assist you with any property needs.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
              >
                <div className="bg-green-600/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Our Team
              </p>
              <h2 className="text-3xl font-bold text-gray-900">Top Agents</h2>
              <p className="text-gray-500 mt-2">
                Licensed professionals with deep Abuja market knowledge
              </p>
            </div>
            <Link
              to="/agents"
              className="hidden md:flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm border-b border-green-600 pb-0.5 transition-colors"
            >
              Meet All Agents →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join over 850 happy clients who found their perfect home through
            Zertek Realty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-xl transition-colors border border-green-500"
            >
              Talk to an Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
