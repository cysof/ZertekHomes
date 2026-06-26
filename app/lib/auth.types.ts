// Plain type definitions only — no server imports, safe on client and server.

export type Role = 'client' | 'agent' | 'affiliate';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  address: string;
  bvn: string | null;
  nin: string | null;
  role: Role;
  is_verified: boolean;
  is_affiliate: boolean;
  profile_image: string | null;
  image_url: string | null;
  date_joined: string;
};

export type AuthSession = {
  access: string;
  refresh: string;
  user: User;
};