export type Property = {
  id: number;
  title: string;
  type: 'For Sale' | 'For Rent';
  location: string;
  address: string;
  price: number;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: number;
  isNew: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
  amenities: string[];
};

export const properties: Property[] = [
  {
    id: 1,
    title: 'Luxury 5-Bed Detached Duplex',
    type: 'For Sale',
    location: 'Maitama',
    address: 'Plot 234, Cadastral Zone A00, Maitama, Abuja',
    price: 350000000,
    priceLabel: '₦350,000,000',
    beds: 5,
    baths: 5,
    sqft: 620,
    isNew: true,
    isFeatured: true,
    image: '',
    description:
      "A magnificent 5-bedroom detached duplex nestled in the heart of Maitama, Abuja's most prestigious district. Features world-class finishes, spacious rooms, and a landscaped garden.",
    amenities: [
      'Swimming Pool',
      '2 Car Garage',
      '24/7 Security',
      'Generator',
      'CCTV',
      'BQ Staff Quarters',
      'Air Conditioning',
      'Smart Home System',
    ],
  },
  {
    id: 2,
    title: 'Modern 4-Bed Semi-Detached',
    type: 'For Sale',
    location: 'Guzape',
    address: 'Plot 45, Guzape District, Abuja',
    price: 180000000,
    priceLabel: '₦180,000,000',
    beds: 4,
    baths: 4,
    sqft: 430,
    isNew: false,
    isFeatured: true,
    image: '',
    description:
      'Contemporary semi-detached home in the rapidly growing Guzape district. Excellent road network, proximity to Asokoro and city centre.',
    amenities: [
      'Parking Space',
      'Generator',
      'CCTV',
      'Air Conditioning',
      'Wardrobe',
      'Tiled Floors',
      'Modern Kitchen',
      'Estate Security',
    ],
  },
  {
    id: 3,
    title: 'Exquisite 6-Bed Mansion',
    type: 'For Sale',
    location: 'Asokoro',
    address: 'Plot 12, Diplomatic Zone, Asokoro, Abuja',
    price: 750000000,
    priceLabel: '₦750,000,000',
    beds: 6,
    baths: 7,
    sqft: 1100,
    isNew: true,
    isFeatured: true,
    image: '',
    description:
      "An exceptional mansion in Asokoro, Abuja's diplomatic zone. Perfect for executives and diplomats seeking the finest in Nigerian luxury real estate.",
    amenities: [
      'Olympic Pool',
      'Home Cinema',
      '4 Car Garage',
      'Smart Home',
      'Wine Cellar',
      'Staff Quarters',
      'Elevator',
      'Landscaped Garden',
    ],
  },
  {
    id: 4,
    title: '3-Bed Luxury Apartment',
    type: 'For Rent',
    location: 'Wuse 2',
    address: 'Block 7, Aminu Kano Crescent, Wuse 2, Abuja',
    price: 5500000,
    priceLabel: '₦5,500,000/yr',
    beds: 3,
    baths: 3,
    sqft: 280,
    isNew: false,
    isFeatured: true,
    image: '',
    description:
      'Stunning 3-bedroom apartment on the 8th floor of an iconic high-rise in Wuse 2. Panoramic city views, gym, rooftop terrace and concierge service.',
    amenities: [
      'Gym',
      'Rooftop Terrace',
      'Concierge',
      'Generator',
      'Swimming Pool',
      'Security',
      'Parking',
      'City Views',
    ],
  },
  {
    id: 5,
    title: '4-Bed Terrace Duplex',
    type: 'For Rent',
    location: 'Jabi',
    address: 'Estate Road 3, Jabi, Abuja',
    price: 3800000,
    priceLabel: '₦3,800,000/yr',
    beds: 4,
    baths: 3,
    sqft: 360,
    isNew: true,
    isFeatured: false,
    image: '',
    description:
      'Tastefully finished 4-bedroom terrace duplex in a serene Jabi estate. Minutes from Jabi Lake Mall, airport road and major business districts.',
    amenities: [
      'Generator',
      'CCTV',
      'Parking',
      'Tiled Floors',
      'Wardrobe',
      'Estate Gate',
      '24hr Security',
      'Air Conditioning',
    ],
  },
  {
    id: 6,
    title: '2-Bed Executive Flat',
    type: 'For Rent',
    location: 'Life Camp',
    address: 'Close 5, Life Camp Estate, Abuja',
    price: 2200000,
    priceLabel: '₦2,200,000/yr',
    beds: 2,
    baths: 2,
    sqft: 175,
    isNew: false,
    isFeatured: false,
    image: '',
    description:
      'Well-maintained 2-bedroom flat in a quiet estate in Life Camp. Ideal for young professionals and small families. Close to Nizamiye Hospital.',
    amenities: [
      'Generator',
      'Security',
      'Parking',
      'Tiled Floors',
      'Wardrobe',
      'Painted Walls',
      'Water Supply',
      'Kitchen Cabinets',
    ],
  },
];
