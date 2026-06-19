// app/components/PropertyCard.tsx
import { Link } from 'react-router';
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import type { Property } from '../types';

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="group bg-white rounded-xl shadow-sm border border-[#4A5A4A]/10 overflow-hidden hover:shadow-xl hover:shadow-[#F57C00]/5 hover:-translate-y-1 transition-all duration-300 block"
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">🏠</div>
              <p className="text-[#8A9A8A] text-xs">{property.location}, Abuja</p>
            </div>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              property.type === 'For Sale'
                ? 'bg-[#1B2A4A] text-white'
                : 'bg-[#F57C00] text-white'
            }`}
          >
            {property.type}
          </span>
          {property.isNew && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F57C00] text-white">
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xl font-bold text-[#4B5320] mb-1">
          {property.priceLabel}
        </p>
        <h3 className="font-semibold text-[#4B5320] mb-2 group-hover:text-[#F57C00] transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-[#4B5320] text-sm mb-3">
          <MapPin size={13} className="text-[#F57C00] shrink-0" />
          <span>{property.location}, Abuja</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 pt-3 border-t border-[#4A5A4A]/10 text-sm text-[#4B5320]">
          <div className="flex items-center gap-1">
            <Bed size={14} className="text-[#4B5320]" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} className="text-[#4B5320]" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 size={14} className="text-[#4B5320]" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}