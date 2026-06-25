// app/components/PropertyCard.tsx
import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import type { ApiProperty } from '../lib/api';

type Props = {
  property: ApiProperty;
};

export default function PropertyCard({ property }: Props) {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="group bg-white rounded-xl shadow-sm border border-[#4A5A4A]/10 overflow-hidden hover:shadow-xl hover:shadow-[#F57C00]/5 hover:-translate-y-1 transition-all duration-300 block"
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A] overflow-hidden">
        {property.image_url ? (
          <img
            src={property.image_url}
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
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1B2A4A] text-white">
            For Sale
          </span>
          {property.is_new && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F57C00] text-white">
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xl font-bold text-[#4B5320] mb-1">
          {property.price_label}
        </p>
        <h3 className="font-semibold text-[#4B5320] mb-2 group-hover:text-[#F57C00] transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-[#4B5320] text-sm">
          <MapPin size={13} className="text-[#F57C00] shrink-0" />
          <span>{property.location}, Abuja</span>
        </div>
      </div>
    </Link>
  );
}