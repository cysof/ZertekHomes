// app/routes/home.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { TrendingUp, Shield, Clock, Users, Phone } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { api, type ApiProperty, type ApiAgent } from '../lib/api';

export default function Home() {
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<ApiProperty[]>([]);
  const [agents, setAgents] = useState<ApiAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const topAgents = agents.slice(0, 4);
  const heroSlides = featuredProperties.slice(0, 5); // ← first 5 featured from backend

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        heroSlides.length > 0 ? (prev + 1) % heroSlides.length : 0
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allProps, featured, agentsData] = await Promise.all([
          api.getProperties({ status: 'available' }),
          api.getFeaturedProperties(),
          api.getAgents(),
        ]);
        setProperties(allProps.results || []);
        setFeaturedProperties(featured || []);
        setAgents(agentsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F57C00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8A9A8A]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold px-6 py-2 rounded-xl transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {slide?.image_url ? (
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover transition-all duration-1000"
            />
          ) : (
            <div className="w-full h-full bg-[#1B2A4A]" />
          )}
          <div className="absolute inset-0 bg-[#1B2A4A]/40"></div>
        </div>

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/properties"
              className="bg-[#F57C00] hover:bg-[#E06B00] text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#F57C00]/30 hover:scale-105 text-lg"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 text-lg flex items-center gap-2"
            >
              <Phone size={20} />
              Talk to a Consultant
            </Link>
          </div>

          {/* Slide dots */}
          {heroSlides.length > 0 && (
            <div className="flex justify-center gap-2 mt-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'bg-[#F57C00] w-8 h-2'
                      : 'bg-white/30 hover:bg-white/50 w-2 h-2'
                  }`}
                />
              ))}
            </div>
          )}
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
              <h2 className="text-3xl font-bold text-[#4B5320]">
                Properties For Sale
              </h2>
              <p className="text-[#8A9A8A] mt-2">
                Verified Lands available for purchase across Abuja
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
            {properties.slice(0, 6).map((property) => (
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
                title: 'Expert Consultant',
                desc: '48 well experienced Consultants with deep knowledge of every Abuja district.',
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
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-[#8A9A8A] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#F57C00] font-semibold text-sm uppercase tracking-wider mb-2">
                Our Team
              </p>
            </div>
            <Link
              to="/agents"
              className="flex items-center gap-1 text-[#F57C00] hover:text-[#E06B00] font-semibold text-sm border-b border-[#F57C00] pb-0.5 transition-colors whitespace-nowrap"
            >
              Meet All Agents →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/agents"
              className="inline-flex items-center gap-2 bg-[#F57C00] hover:bg-[#E06B00] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              All Consultants
            </Link>
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
              Talk to a Consultant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}