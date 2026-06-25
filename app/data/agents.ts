// app/data/agents.ts

export type AgentUser = {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  profile_image?: string | null;
  image_url?: string | null;
};

export type Agent = {
  id: number;
  user: AgentUser;
  profile_picture?: string | null;  // ← AgentProfile.profile_picture from Django
  initials?: string;
  bio?: string;
  years_experience?: number;
  specialization?: string;
  is_approved?: boolean;
  commission_rate?: string;
  facebook_url?: string | null;
  instagram_url?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
  whatsapp_url?: string | null;
  created_at?: string;
  updated_at?: string;

  // Flattened convenience fields (populated by flattenAgent in api.ts)
  name?: string;
  position?: string;
  phone?: string;
  email?: string;
  image_url?: string | null;
};

export const agents: Agent[] = [];