// app/data/properties.ts
// This file will be replaced by API calls. Keeping for now with updated type.

export type Property = {
  id: number;
  title: string;
  location: string;
  address: string;
  price: number;
  price_label: string;
  is_new: boolean;
  sqft: string;
  is_featured: boolean;
  image_url: string | null;
  description: string;
  amenities: string[];
  image?: string;
  status: string;
  agent: {
    id: number;
    name: string;
    email: string;
    phone: string;
    image_url: string | null;
    initials: string;
  } | null;
  created_at: string;
  updated_at: string;
};

// Temporary mock data matching API shape
// Will be replaced with actual API calls
export const properties: Property[] = [];