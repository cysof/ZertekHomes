// components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../static/logo.jpeg';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/agents', label: 'Agents' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 bg-[#1B2A4A] border-b border-[#4A5A4A]/20">
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(link.to)
                      ? 'text-[#F57C00] bg-[#F57C00]/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="bg-[#F57C00] hover:bg-[#E06B00] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#F57C00]/25"
            >
              List Property
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1B2A4A] px-4 py-4 space-y-1 border-t border-[#4A5A4A]/20">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive(link.to)
                    ? 'text-[#F57C00] bg-[#F57C00]/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-[#F57C00] hover:bg-[#E06B00] text-white text-sm font-semibold px-5 py-3 rounded-lg mt-3 transition-colors"
          >
            List Property
          </Link>
        </div>
      )}
    </nav>
  );
}