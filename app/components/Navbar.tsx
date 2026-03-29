// components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Users, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <Home size={16} /> },
    { to: '/properties', label: 'Properties', icon: <Building2 size={16} /> },
    { to: '/agents', label: 'Agents', icon: <Users size={16} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={16} /> },
  ];

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none">
                Zertek
              </span>
              <span className="text-green-400 font-light text-lg leading-none">
                {' '}
                Realty
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(link.to)
                      ? 'bg-green-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200"
            >
              List Property
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  isActive(link.to)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg mt-2 transition"
          >
            List Property
          </Link>
        </div>
      )}
    </nav>
  );
}
