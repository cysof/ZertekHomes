// components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../static/logo.png';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/agents', label: 'Consultants' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#4A5A4A]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Zertek Realty"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative
                  ${
                    isActive(link.to)
                      ? 'text-[#F57C00] bg-[#F57C00]/10'
                      : 'text-[#1B2A4A] hover:text-[#F57C00] hover:bg-[#F57C00]/5'
                  }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[#F57C00] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="bg-[#F57C00] hover:bg-[#E06B00] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#F57C00]/30 hover:scale-105"
            >
              List Property
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#1B2A4A] hover:text-[#F57C00] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-1 border-t border-[#4A5A4A]/10 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive(link.to)
                    ? 'text-[#F57C00] bg-[#F57C00]/10'
                    : 'text-[#1B2A4A] hover:text-[#F57C00] hover:bg-[#F57C00]/5'
                }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]" />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-[#F57C00] hover:bg-[#E06B00] text-white text-sm font-semibold px-5 py-3 rounded-lg mt-3 transition-colors shadow-lg"
          >
            List Property
          </Link>
        </div>
      )}
    </nav>
  );
}