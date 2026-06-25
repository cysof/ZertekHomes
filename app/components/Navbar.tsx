// app/components/Navbar.tsx
import { Link, useLocation, useRouteLoaderData, Form } from 'react-router';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logo from '../static/logo.png';
import type { User as UserType } from '../lib/auth.types';

type RootLoaderData = { user: UserType | null };

export default function Navbar() {
  const location = useLocation();
  const data = useRouteLoaderData('root') as RootLoaderData | undefined;
  const user = data?.user ?? null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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

          {/* Desktop nav links */}
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

          {/* Desktop right side — auth state */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              // ── Logged in ─────────────────────────────────────────────────
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                             text-[#1B2A4A] hover:bg-[#F57C00]/5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#F57C00]/10 flex items-center justify-center">
                    <User size={15} className="text-[#F57C00]" />
                  </div>
                  <span>{user.first_name}</span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    {/* User info */}
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#1B2A4A]">{user.full_name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide
                                       bg-[#F57C00]/10 text-[#F57C00] px-2 py-0.5 rounded-full">
                        {user.role}
                      </span>
                    </div>

                    {/* Profile link */}
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1B2A4A]
                                 hover:bg-gray-50 transition-colors"
                    >
                      <User size={14} />
                      My Profile
                    </Link>

                    {/* Logout */}
                    <Form method="post" action="/auth/logout">
                      <button
                        type="submit"
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600
                                   hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </Form>
                  </div>
                )}
              </div>
            ) : (
              // ── Logged out ─────────────────────────────────────────────────
              <>
                <Link
                  to="/auth/login"
                  className="text-sm font-medium text-[#1B2A4A] hover:text-[#F57C00] transition-colors px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-[#F57C00] hover:bg-[#E06B00] text-white text-sm font-semibold
                             px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg
                             hover:shadow-[#F57C00]/30 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#1B2A4A] hover:text-[#F57C00] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-1 border-t border-[#4A5A4A]/10 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
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

          {/* Mobile auth */}
          <div className="pt-2 border-t border-gray-100 mt-2">
            {user ? (
              <>
                {/* User info */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#F57C00]/10 flex items-center justify-center shrink-0">
                    <User size={16} className="text-[#F57C00]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1B2A4A] truncate">{user.full_name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-[#1B2A4A]
                             hover:bg-gray-50 transition-colors"
                >
                  <User size={14} />
                  My Profile
                </Link>

                <Form method="post" action="/auth/logout">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm
                               text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </Form>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="block w-full text-center border border-[#F57C00] text-[#F57C00] text-sm
                             font-semibold px-5 py-3 rounded-lg mb-2 transition-colors hover:bg-[#F57C00]/5"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/register"
                  className="block w-full text-center bg-[#F57C00] hover:bg-[#E06B00] text-white
                             text-sm font-semibold px-5 py-3 rounded-lg transition-colors shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
