// app/routes/home.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MapPin, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { properties } from '../data/properties';
import { agents } from '../data/agents';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import FeaturedCarousel from '../components/FeaturedCarousel';
import heroImage from '../static/hero/idu faiheaven.jpeg';

const heroSlides = [
  {
    id: 1,
    title: 'Find Your Perfect Home in Abuja',
    subtitle: "Luxury living in the heart of Nigeria's capital city",
    location: 'Maitama, Abuja',
    image: heroImage,
  },
  {
    id: 2,
    title: 'Premium Properties in Asokoro',
    subtitle: 'Diplomatic zone living with world-class amenities',
    location: 'Asokoro, Abuja',
    image: heroImage,
  },
  {
    id: 3,
    title: 'Modern Homes in Guzape District',
    subtitle: 'Contemporary architecture meets Abuja comfort',
    location: 'Guzape, Abuja',
    image: heroImage,
  },
  {
    id: 4,
    title: 'Luxury Apartments in Wuse 2',
    subtitle: 'City centre living with panoramic views',
    location: 'Wuse 2, Abuja',
    image: heroImage,
  },
  {
    id: 5,
    title: 'Family Homes in Jabi & Life Camp',
    subtitle: 'Safe, serene estates perfect for families',
    location: 'Jabi, Abuja',
    image: heroImage,
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
      {/* Hero Section with Image Slideshow */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          {/* Dark Overlay - Reduced opacity */}
          <div className="absolute inset-0 bg-[#1B2A4A]/40"></div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center w-full px-4 py-16">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-[#1B2A4A]/80 backdrop-blur-sm border border-[#F57C00]/40 rounded-full px-4 py-1.5 mb-6 transition-all duration-700">
            <MapPin size={14} className="text-[#F57C00]" />
            <span className="text-[#F57C00] text-sm font-medium">
              {slide.location}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={currentSlide}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-lg"
          >
            {slide.title.split('Abuja')[0]}
            <span className="text-[#F57C00]">
              {slide.title.includes('Abuja') ? 'Abuja' : ''}
            </span>
            {slide.title.split('Abuja')[1] || ''}
          </h1>

          <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto transition-all duration-700 drop-shadow-md">
            {slide.subtitle}
          </p>

          {/* Slide Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'bg-[#F57C00] w-6 h-2'
                    : 'bg-white/40 hover:bg-white/60 w-2 h-2'
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
                <p className="text-3xl font-bold text-white drop-shadow-lg">{stat.num}</p>
                <p className="text-[#D4D4D4] text-sm mt-1 drop-shadow-md">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Carousel */}
      <FeaturedCarousel properties={featuredProperties} />

      {/* For Sale Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#F57C00] font-semibold text-sm uppercase tracking-wider mb-2">
                Buy a Home
              </p>
              <h2 className="text-3xl font-bold text-[#1B2A4A]">
                Properties For Sale
              </h2>
              <p className="text-[#8A9A8A] mt-2">
                Premium homes available for purchase across Abuja
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden md:flex items-center gap-1 text-[#F57C00] hover:text-[#E06B00] font-semibold text-sm border-b border-[#F57C00] pb-0.5 transition-colors"
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

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-[#1B2A4A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#F57C00] font-semibold text-sm uppercase tracking-wider mb-2">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold text-white">
              Abuja's Most Trusted Property Marketplace
            </h2>
            <p className="text-[#8A9A8A] mt-3 max-w-2xl mx-auto">
              From luxury villas in Maitama to affordable homes in Gwarinpa — we
              connect buyers, sellers and tenants with verified properties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield size={28} className="text-[#F57C00]" />,
                title: '100% Verified',
                desc: 'Every property is physically inspected and verified by our team before listing.',
              },
              {
                icon: <Users size={28} className="text-[#F57C00]" />,
                title: 'Expert Agents',
                desc: '48 licensed agents with deep knowledge of every Abuja district.',
              },
              {
                icon: <TrendingUp size={28} className="text-[#F57C00]" />,
                title: 'Best Prices',
                desc: 'We negotiate the best deals and ensure fair market pricing for all transactions.',
              },
              {
                icon: <Clock size={28} className="text-[#F57C00]" />,
                title: '24/7 Support',
                desc: 'Our team is available around the clock to assist you with any property needs.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#2A3D5A] rounded-xl p-6 hover:bg-[#3A4D6A] transition-colors border border-[#4A5A4A]/20"
              >
                <div className="bg-[#F57C00]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-[#8A9A8A] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#F57C00] font-semibold text-sm uppercase tracking-wider mb-2">
                Our Team
              </p>
              <h2 className="text-3xl font-bold text-[#1B2A4A]">Top Agents</h2>
              <p className="text-[#8A9A8A] mt-2">
                Licensed professionals with deep Abuja market knowledge
              </p>
            </div>
            <Link
              to="/agents"
              className="hidden md:flex items-center gap-1 text-[#F57C00] hover:text-[#E06B00] font-semibold text-sm border-b border-[#F57C00] pb-0.5 transition-colors"
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
      <section className="py-16 px-4 bg-[#F57C00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join over 850 happy clients who found their perfect home through
            Zertek Realty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-white text-[#1B2A4A] hover:bg-gray-100 font-bold px-8 py-3 rounded-xl transition-colors shadow-lg"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="bg-[#1B2A4A] hover:bg-[#2A3D5A] text-white font-bold px-8 py-3 rounded-xl transition-colors border border-white/20 shadow-lg"
            >
              Talk to an Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}