import { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

const locations = [
  'All Locations',
  'Maitama',
  'Asokoro',
  'Guzape',
  'Wuse 2',
  'Jabi',
  'Life Camp',
  'Gwarinpa',
  'Katampe',
];

const propertyTypes = [
  'Any Type',
  'Detached Duplex',
  'Semi-Detached',
  'Flat / Apartment',
  'Bungalow',
  'Terrace',
  'Penthouse',
  'Land',
  'Commercial',
];

const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Below ₦20M', min: 0, max: 20000000 },
  { label: '₦20M – ₦50M', min: 20000000, max: 50000000 },
  { label: '₦50M – ₦150M', min: 50000000, max: 150000000 },
  { label: '₦150M – ₦300M', min: 150000000, max: 300000000 },
  { label: 'Above ₦300M', min: 300000000, max: Infinity },
];

export default function Listings() {
  const [search, setSearch] = useState('');
  const [listingType, setListingType] = useState('All');
  const [location, setLocation] = useState('All Locations');
  const [propertyType, setPropertyType] = useState('Any Type');
  const [priceRange, setPriceRange] = useState(0);
  const [beds, setBeds] = useState('Any');
  const [sortBy, setSortBy] = useState('Latest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (listingType !== 'All') {
      result = result.filter((p) =>
        listingType === 'For Sale'
          ? p.type === 'For Sale'
          : p.type === 'For Rent'
      );
    }

    if (location !== 'All Locations') {
      result = result.filter((p) => p.location === location);
    }

    if (beds !== 'Any') {
      const bedNum = parseInt(beds);
      result = result.filter((p) =>
        beds === '5+' ? p.beds >= 5 : p.beds === bedNum
      );
    }

    const range = priceRanges[priceRange];
    result = result.filter((p) => p.price >= range.min && p.price <= range.max);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [search, listingType, location, propertyType, priceRange, beds, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setListingType('All');
    setLocation('All Locations');
    setPropertyType('Any Type');
    setPriceRange(0);
    setBeds('Any');
    setSortBy('Latest');
  };

  const hasActiveFilters =
    listingType !== 'All' ||
    location !== 'All Locations' ||
    propertyType !== 'Any Type' ||
    priceRange !== 0 ||
    beds !== 'Any' ||
    search !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Browse Properties
          </p>
          <h1 className="text-4xl font-bold mb-3">All Properties in Abuja</h1>
          <p className="text-gray-400">
            Find your perfect home across all FCT districts
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by title, location or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Listing Type Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['All', 'For Sale', 'For Rent'].map((type) => (
                <button
                  key={type}
                  onClick={() => setListingType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    listingType === type
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-500'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="bg-white text-green-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 bg-white text-gray-600"
            >
              <option>Latest</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 bg-white"
                >
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 bg-white"
                >
                  {propertyTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 bg-white"
                >
                  {priceRanges.map((r, i) => (
                    <option key={r.label} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Bedrooms
                </label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 bg-white"
                >
                  {['Any', '1', '2', '3', '4', '5+'].map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Count + Clear */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            Showing{' '}
            <span className="font-bold text-gray-900">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'property' : 'properties'}
            {listingType !== 'All' && (
              <span className="text-green-600"> · {listingType}</span>
            )}
            {location !== 'All Locations' && (
              <span className="text-green-600"> · {location}</span>
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium"
            >
              <X size={14} />
              Clear all filters
            </button>
          )}
        </div>

        {/* Properties Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
