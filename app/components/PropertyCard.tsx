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
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2">🏠</div>
            <p className="text-gray-400 text-xs">{property.location}, Abuja</p>
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              property.type === 'For Sale'
                ? 'bg-gray-900 text-white'
                : 'bg-green-600 text-white'
            }`}
          >
            {property.type}
          </span>
          {property.isNew && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500 text-white">
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xl font-bold text-gray-900 mb-1">
          {property.priceLabel}
        </p>
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={13} className="text-green-500 shrink-0" />
          <span>{property.location}, Abuja</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Bed size={14} className="text-gray-400" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} className="text-gray-400" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 size={14} className="text-gray-400" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
