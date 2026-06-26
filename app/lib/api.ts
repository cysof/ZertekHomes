// app/lib/api.ts
import type { User } from './auth.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export interface ApiProperty {
  id: number;
  title: string;
  location: string;
  address: string;
  price: number;
  price_label: string;
  is_new: boolean;
  is_featured: boolean;
  status: string;
  image_url: string | null;
  video_url: string | null;  // add this
  description: string;
  amenities: string[];
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
}

export interface ApiAgent {
  id: number;
  user: {
    id: number;
    email: string;
    full_name: string;
    phone: string;
    profile_image?: string | null;
    image_url?: string | null;
  };
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
  name?: string;
  position?: string;
  phone?: string;
  email?: string;
  image_url?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  password2: string;
  requested_role: 'client' | 'agent' | 'affiliate';
  referral_code?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  user: User;
  message?: string;
}

export interface ApiResult<T> {
  ok: boolean;
  data: T;
  error?: unknown;
  status: number;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('access_token')
        : null;

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || error.error || `HTTP error ${response.status}`);
    }

    return response.json();
  }

  private flattenAgent(a: any): ApiAgent {
    const image_url =
      a.profile_picture_url ||
      a.user?.image_url ||
      null;

    return {
      ...a,
      name: a.user?.full_name ?? 'Unknown Agent',
      position: a.specialization || 'Agent',
      phone: a.user?.phone ?? '',
      email: a.user?.email ?? '',
      image_url,
    };
  }

  // ─── Auth ─────────────────────────────────────────────────────────────────

  async login(payload: LoginPayload): Promise<ApiResult<AuthTokens>> {
    const url = `${this.baseUrl}/api/account/login/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, data: data as AuthTokens, error: data, status: response.status };
      return { ok: true, data: data as AuthTokens, status: response.status };
    } catch (err) {
      return { ok: false, data: {} as AuthTokens, error: err, status: 500 };
    }
  }

  async register(payload: RegisterPayload): Promise<ApiResult<AuthTokens>> {
    const url = `${this.baseUrl}/api/account/register/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, data: data as AuthTokens, error: data, status: response.status };
      return { ok: true, data: data as AuthTokens, status: response.status };
    } catch (err) {
      return { ok: false, data: {} as AuthTokens, error: err, status: 500 };
    }
  }

  async refreshToken(refresh: string): Promise<ApiResult<{ access: string }>> {
    const url = `${this.baseUrl}/api/account/refresh/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, data, error: data, status: response.status };
      return { ok: true, data, status: response.status };
    } catch (err) {
      return { ok: false, data: { access: '' }, error: err, status: 500 };
    }
  }

  async logout(refresh: string): Promise<void> {
    await fetch(`${this.baseUrl}/api/account/logout/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
  }

  // ─── Properties ───────────────────────────────────────────────────────────

  async getProperties(params?: {
    location?: string;
    status?: string;
    is_featured?: boolean;
    is_new?: boolean;
    search?: string;
    ordering?: string;
    agent?: number;
  }): Promise<{ results: ApiProperty[]; count: number }> {
    const queryParams = new URLSearchParams();
    if (params?.location) queryParams.append('location', params.location);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.is_featured !== undefined) queryParams.append('is_featured', String(params.is_featured));
    if (params?.is_new !== undefined) queryParams.append('is_new', String(params.is_new));
    if (params?.search) queryParams.append('search', params.search);
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    if (params?.agent !== undefined) queryParams.append('agent', String(params.agent));

    const query = queryParams.toString();
    const endpoint = query ? `/api/agent/properties/?${query}` : '/api/agent/properties/';
    return this.request(endpoint);
  }

  async getProperty(id: number): Promise<ApiProperty> {
    return this.request(`/api/agent/properties/${id}/`);
  }

  async getFeaturedProperties(): Promise<ApiProperty[]> {
    return this.request('/api/agent/properties/?is_featured=true')
      .then((res: any) => res.results ?? res);
  }

  async getNewProperties(): Promise<ApiProperty[]> {
    return this.request('/api/agent/properties/?is_new=true')
      .then((res: any) => res.results ?? res);
  }

  async getAvailableProperties(): Promise<ApiProperty[]> {
    return this.request('/api/agent/properties/?status=available')
      .then((res: any) => res.results ?? res);
  }

  // ─── Agents ───────────────────────────────────────────────────────────────

  async getAgents(params?: { search?: string; ordering?: string }): Promise<ApiAgent[]> {
    const query = new URLSearchParams(params as any).toString();
    const endpoint = query ? `/api/account/agents/?${query}` : '/api/account/agents/';
    const raw: any = await this.request(endpoint);
    const list = Array.isArray(raw) ? raw : raw.results ?? [];
    
    return list.map((a: any) => this.flattenAgent(a));
  }

  async getAgent(id: number): Promise<ApiAgent> {
    const raw: any = await this.request(`/api/account/agents/${id}/`);
    return this.flattenAgent(raw);
  }

  // ─── Inquiries ────────────────────────────────────────────────────────────

  async createInquiry(data: {
    property_listing: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    inspection_date?: string;
  }): Promise<{ message: string }> {
    return this.request('/api/agent/inquiries/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ─── Land Banking ─────────────────────────────────────────────────────────

  async getPlans(): Promise<any[]> {
    return this.request('/api/agent/land-banking-plans/');
  }

  async createAgreement(data: {
    property: number;
    plan: number;
    buyer_name: string;
    buyer_email: string;
    buyer_phone: string;
  }): Promise<any> {
    return this.request('/api/agent/land-banking-agreements/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAgreements(): Promise<any[]> {
    return this.request('/api/agent/land-banking-agreements/');
  }

  async getAgreement(id: string): Promise<any> {
    return this.request(`/api/agent/land-banking-agreements/${id}/`);
  }

  async makePayment(agreementId: string, data: {
    amount: number;
    payment_method: string;
    reference: string;
    notes?: string;
  }): Promise<any> {
    return this.request(`/api/agent/land-banking-agreements/${agreementId}/make_payment/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ─── Client-side helpers ────────────────────────────────────────────────

  setAuthToken(token: string): void { localStorage.setItem('access_token', token); }
  setRefreshToken(token: string): void { localStorage.setItem('refresh_token', token); }
  clearAuthTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  getAuthToken(): string | null { return localStorage.getItem('access_token'); }
  isAuthenticated(): boolean { return !!this.getAuthToken(); }
}

export const api = new ApiService(API_BASE_URL);
export const auth = api;