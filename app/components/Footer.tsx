// components/Footer.tsx
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../static/logo.jpeg';

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-white mt-auto border-t border-[#4A5A4A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Zertek Realty"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#8A9A8A] leading-relaxed mb-4">
              Abuja's trusted real estate marketplace. Buying, selling and
              renting properties across all FCT districts since 2014.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-[#2A3D5A] hover:bg-[#F57C00] p-2 rounded-lg transition-all duration-200 hover:scale-105 transform"
                aria-label="Facebook"
              >
                <FaFacebook
                  size={16}
                  className="text-[#8A9A8A] hover:text-white transition-colors"
                />
              </a>
              <a
                href="#"
                className="bg-[#2A3D5A] hover:bg-[#F57C00] p-2 rounded-lg transition-all duration-200 hover:scale-105 transform"
                aria-label="Twitter"
              >
                <FaTwitter
                  size={16}
                  className="text-[#8A9A8A] hover:text-white transition-colors"
                />
              </a>
              <a
                href="#"
                className="bg-[#2A3D5A] hover:bg-[#F57C00] p-2 rounded-lg transition-all duration-200 hover:scale-105 transform"
                aria-label="Instagram"
              >
                <FaInstagram
                  size={16}
                  className="text-[#8A9A8A] hover:text-white transition-colors"
                />
              </a>
              <a
                href="#"
                className="bg-[#2A3D5A] hover:bg-[#F57C00] p-2 rounded-lg transition-all duration-200 hover:scale-105 transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin
                  size={16}
                  className="text-[#8A9A8A] hover:text-white transition-colors"
                />
              </a>
            </div>
          </div>

          {/* Properties Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Properties
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Buy Property
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Rent Property
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Sell Property
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Shortlet
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Locations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Maitama
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Asokoro
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Guzape
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Wuse 2
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Jabi
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Life Camp
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-[#8A9A8A] hover:text-[#F57C00] transition-colors"
                >
                  Gwarinpa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[#8A9A8A]">
                <MapPin size={16} className="text-[#F57C00] mt-0.5 shrink-0" />
                <span>Plot 1234, Aminu Kano Crescent, Wuse 2, Abuja FCT</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#8A9A8A]">
                <Phone size={16} className="text-[#F57C00] shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-[#F57C00] transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#8A9A8A]">
                <Mail size={16} className="text-[#F57C00] shrink-0" />
                <a href="mailto:info@zertekrealty.ng" className="hover:text-[#F57C00] transition-colors">
                  info@zertekrealty.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4A5A4A]/30 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#8A9A8A]">
            © {new Date().getFullYear()} Zertek Realty Ltd. All rights reserved.
            RC: 1234567
          </p>
          <p className="text-xs text-[#8A9A8A]">
            Licensed by REDAN · FETBB Registered
          </p>
        </div>
      </div>
    </footer>
  );
}