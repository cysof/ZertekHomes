// app/lib/auth.types.ts
// Plain type definitions only — no server imports, safe on client and server.

export type UserRole = 'client' | 'agent' | 'affiliate';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  role: UserRole;
  is_verified: boolean;
  is_affiliate: boolean;
  profile_image: string | null;
  date_joined: string;
};

export type AuthSession = {
  access: string;
  refresh: string;
  user: User;
};