'use client';
import { useCallback } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Property } from '../types';
import PropertyCard from './PropertyCard';

type Props = {
  properties: Property[];
};

export default function FeaturedCarousel({ properties }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Top Picks
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Properties
            </h2>
            <p className="text-gray-500 mt-2">
              Handpicked premium listings across Abuja
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 flex items-center justify-center transition-all duration-200 group"
            >
              <ChevronLeft
                size={18}
                className="text-gray-400 group-hover:text-green-600"
              />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 flex items-center justify-center transition-all duration-200 group"
            >
              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:text-green-600"
              />
            </button>
            <Link
              to="/properties"
              className="hidden md:flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm border-b border-green-600 pb-0.5 ml-2"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex-none w-full md:w-[calc(33.333%-16px)]"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
