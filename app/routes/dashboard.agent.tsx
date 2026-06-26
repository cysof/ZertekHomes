import { useLoaderData, Link, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { requireUser, getAccessToken } from '../lib/session.server';
import { redirect } from 'react-router';
import { useState, useRef } from 'react';
import {
  LogOut, Home, Plus, List, MessageSquare, User,
  TrendingUp, Eye, CheckCircle2, XCircle, Star,
  Edit, Trash2, MapPin, DollarSign, ChevronRight,
  Camera, Save, X, Phone, MapPinned,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function fetchWithAuth(endpoint: string, token: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const token = await getAccessToken(request);

  if (user.role !== 'agent') throw redirect(`/dashboard/${user.role}`);

  const [stats, propertiesRes, inquiriesRes] = await Promise.all([
    fetchWithAuth('/api/agent/agent/stats/', token!),
    fetchWithAuth('/api/agent/properties/', token!),
    fetchWithAuth('/api/agent/inquiries/', token!),
  ]);

  return {
    user,
    token,
    stats: stats ?? {},
    properties: propertiesRes?.results ?? propertiesRes ?? [],
    inquiries: inquiriesRes?.results ?? inquiriesRes ?? [],
  };
}

type Tab = 'overview' | 'listings' | 'create' | 'inquiries' | 'profile';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'listings', label: 'My Listings', icon: List },
  { id: 'create', label: 'Create Listing', icon: Plus },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function AgentDashboard() {
  const { user, token, stats, properties, inquiries } = useLoaderData<typeof loader>();
  const [tab, setTab] = useState<Tab>('overview');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  async function handleDelete(id: number) {
    await fetch(`${API_BASE}/api/agent/properties/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteId(null);
    navigate('.', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFA]">

      {/* Header */}
      <div className="bg-[#1B2A4A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F57C00] flex items-center justify-center shrink-0 overflow-hidden">
                {user.image_url ? (
                  <img src={user.image_url} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xl font-bold">
                    {user.first_name[0]}{user.last_name[0]}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white/60 text-sm">Agent Dashboard</p>
                <h1 className="text-xl font-bold">{user.full_name}</h1>
                <span className="text-xs bg-[#F57C00]/20 text-[#F57C00] px-2 py-0.5 rounded-full">
                  {user.is_verified ? 'Verified Agent' : 'Pending Approval'}
                </span>
              </div>
            </div>
            <Link
              to="/auth/logout"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <LogOut size={16} /> Logout
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? 'bg-[#F57C00] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <t.icon size={15} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Overview ── */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total Listings', value: stats.total_listings ?? 0, icon: Home, color: 'text-[#1B2A4A]' },
                { label: 'Available', value: stats.available ?? 0, icon: CheckCircle2, color: 'text-green-600' },
                { label: 'Reserved', value: stats.reserved ?? 0, icon: Eye, color: 'text-amber-500' },
                { label: 'Sold', value: stats.sold ?? 0, icon: XCircle, color: 'text-red-500' },
                { label: 'Featured', value: stats.featured ?? 0, icon: Star, color: 'text-[#F57C00]' },
                { label: 'Total Value', value: `₦${(Number(stats.total_value ?? 0) / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-[#1B2A4A]' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A5A4A]/10">
                  <s.icon size={20} className={`${s.color} mb-2`} />
                  <p className="text-2xl font-bold text-[#1B2A4A]">{s.value}</p>
                  <p className="text-xs text-[#8A9A8A] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#1B2A4A]">Recent Inquiries</h2>
                <button onClick={() => setTab('inquiries')} className="text-sm text-[#F57C00] hover:underline flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </button>
              </div>
              {inquiries.length === 0 ? (
                <p className="text-[#8A9A8A] text-sm">No inquiries yet.</p>
              ) : (
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq: any) => (
                    <div key={inq.id} className="flex items-center justify-between py-2 border-b border-[#4A5A4A]/10 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-[#1B2A4A]">{inq.name}</p>
                        <p className="text-xs text-[#8A9A8A]">{inq.email} · {inq.phone}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        inq.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        inq.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── My Listings ── */}
        {tab === 'listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1B2A4A]">My Listings ({properties.length})</h2>
              <button
                onClick={() => setTab('create')}
                className="flex items-center gap-2 bg-[#F57C00] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#E06B00] transition"
              >
                <Plus size={15} /> New Listing
              </button>
            </div>

            {properties.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#4A5A4A]/10 shadow-sm">
                <Home size={40} className="text-[#8A9A8A] mx-auto mb-3" />
                <p className="text-[#1B2A4A] font-medium">No listings yet</p>
                <p className="text-[#8A9A8A] text-sm mt-1">Create your first property listing</p>
                <button
                  onClick={() => setTab('create')}
                  className="mt-4 inline-block bg-[#F57C00] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#E06B00] transition"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((p: any) => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-[#4A5A4A]/10 overflow-hidden">
                    <div className="relative h-40 bg-gradient-to-br from-[#1B2A4A] to-[#2A3D5A]">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🏠</div>
                      )}
                      <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
                        p.status === 'available' ? 'bg-green-100 text-green-700' :
                        p.status === 'reserved' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#1B2A4A] truncate">{p.title}</h3>
                      <div className="flex items-center gap-1 text-[#8A9A8A] text-xs mt-1">
                        <MapPin size={11} /> {p.location}
                      </div>
                      <p className="text-[#F57C00] font-bold mt-2">{p.price_label}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setTab('create')}
                          className="flex-1 flex items-center justify-center gap-1 text-xs font-medium border border-[#4A5A4A]/20 rounded-lg py-2 hover:border-[#F57C00] hover:text-[#F57C00] transition"
                        >
                          <Edit size={13} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="flex-1 flex items-center justify-center gap-1 text-xs font-medium border border-red-200 text-red-500 rounded-lg py-2 hover:bg-red-50 transition"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                        <Link
                          to={`/properties/${p.id}`}
                          className="flex-1 flex items-center justify-center gap-1 text-xs font-medium border border-[#4A5A4A]/20 rounded-lg py-2 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition"
                        >
                          <Eye size={13} /> View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Create Listing ── */}
        {tab === 'create' && (
          <CreateListingForm
            token={token!}
            onSuccess={() => {
              setTab('listings');
              navigate('.', { replace: true });
            }}
          />
        )}

        {/* ── Inquiries ── */}
        {tab === 'inquiries' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1B2A4A]">Inquiries ({inquiries.length})</h2>
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#4A5A4A]/10 shadow-sm">
                <MessageSquare size={40} className="text-[#8A9A8A] mx-auto mb-3" />
                <p className="text-[#1B2A4A] font-medium">No inquiries yet</p>
                <p className="text-[#8A9A8A] text-sm mt-1">Inquiries on your listings will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq: any) => (
                  <div key={inq.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A5A4A]/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-[#1B2A4A]">{inq.name}</p>
                        <p className="text-xs text-[#8A9A8A] mt-0.5">{inq.email} · {inq.phone}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                        inq.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        inq.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#8A9A8A] mt-3 leading-relaxed">{inq.message}</p>
                    {inq.inspection_date && (
                      <p className="text-xs text-[#F57C00] mt-2 font-medium">
                        Inspection: {new Date(inq.inspection_date).toLocaleDateString()}
                      </p>
                    )}
                    <div className="mt-3 pt-3 border-t border-[#4A5A4A]/10 flex items-center justify-between">
                      <p className="text-xs text-[#8A9A8A]">
                        Property: <span className="text-[#1B2A4A] font-medium">{inq.property_listing_title ?? `#${inq.property_listing}`}</span>
                      </p>
                      <p className="text-xs text-[#8A9A8A]">{new Date(inq.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile ── */}
        {tab === 'profile' && (
          <EditProfileForm
            user={user}
            token={token!}
            onSaved={() => navigate('.', { replace: true })}
          />
        )}

      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">Delete Listing?</h3>
            <p className="text-[#8A9A8A] text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-[#4A5A4A]/20 rounded-xl py-2.5 text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ── Edit Profile Form ────────────────────────────────────────────────────────

function EditProfileForm({
  user,
  token,
  onSaved,
}: {
  user: any;
  token: string;
  onSaved: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState(user.phone ?? '');
  const [address, setAddress] = useState(user.address ?? '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function cancelEdit() {
    setEditing(false);
    setPhone(user.phone ?? '');
    setAddress(user.address ?? '');
    setAvatarFile(null);
    setAvatarPreview(null);
    setError(null);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const fd = new FormData();
    fd.append('phone', phone);
    fd.append('address', address);
    if (avatarFile) fd.append('profile_picture', avatarFile);

    try {
      const res = await fetch(`${API_BASE}/api/account/profile/`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.detail ?? JSON.stringify(err));
      } else {
        setSuccess(true);
        setEditing(false);
        setAvatarFile(null);
        // Reload so header avatar + user data refresh
        onSaved();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    'w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl text-sm text-[#1B2A4A] outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00]/20 transition bg-white';
  const readonlyCls =
    'w-full px-4 py-2.5 border border-[#4A5A4A]/10 rounded-xl text-sm text-[#8A9A8A] bg-[#F8FAFA] cursor-not-allowed select-none';
  const labelCls = 'block text-xs font-medium text-[#8A9A8A] mb-1';

  const currentAvatar = avatarPreview ?? user.image_url ?? null;
  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`;

  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#1B2A4A]">My Profile</h2>
          {!editing ? (
            <button
              onClick={() => { setEditing(true); setSuccess(false); }}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#F57C00] hover:text-[#E06B00] transition"
            >
              <Edit size={14} /> Edit Profile
            </button>
          ) : (
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1.5 text-sm font-medium text-[#8A9A8A] hover:text-[#1B2A4A] transition"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>

        {/* Success banner */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
            Profile updated successfully.
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#F57C00] flex items-center justify-center overflow-hidden ring-4 ring-[#F57C00]/20">
              {currentAvatar ? (
                <img src={currentAvatar} alt={user.full_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-2xl font-bold">{initials}</span>
              )}
            </div>
            {editing && (
              <>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#F57C00] hover:bg-[#E06B00] text-white rounded-full flex items-center justify-center shadow-md transition"
                  title="Change photo"
                >
                  <Camera size={13} />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </>
            )}
          </div>
          <div>
            <p className="font-bold text-[#1B2A4A]">{user.full_name}</p>
            <p className="text-xs text-[#8A9A8A] mt-0.5">{user.email}</p>
            <span className="text-xs bg-[#F57C00]/10 text-[#F57C00] px-2 py-0.5 rounded-full mt-1 inline-block">
              {user.is_verified ? 'Verified Agent' : 'Pending Approval'}
            </span>
            {editing && (
              <p className="text-xs text-[#8A9A8A] mt-1.5">
                Click the <Camera size={10} className="inline" /> icon to change your photo
              </p>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Read-only: Full Name */}
          <div>
            <label className={labelCls}>Full Name</label>
            <div className={readonlyCls}>{user.full_name}</div>
            <p className="text-[10px] text-[#8A9A8A] mt-1">Contact support to change your name</p>
          </div>

          {/* Read-only: Email */}
          <div>
            <label className={labelCls}>Email Address</label>
            <div className={readonlyCls}>{user.email}</div>
            <p className="text-[10px] text-[#8A9A8A] mt-1">Contact support to change your email</p>
          </div>

          {/* Editable: Phone */}
          <div>
            <label className={labelCls}>
              <span className="flex items-center gap-1"><Phone size={11} /> Phone Number</span>
            </label>
            {editing ? (
              <input
                className={inputCls}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +234 800 000 0000"
              />
            ) : (
              <div className={readonlyCls}>{user.phone || '—'}</div>
            )}
          </div>

          {/* Editable: Address */}
          <div>
            <label className={labelCls}>
              <span className="flex items-center gap-1"><MapPinned size={11} /> Address</span>
            </label>
            {editing ? (
              <input
                className={inputCls}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 12 Herbert Macaulay Way, Abuja"
              />
            ) : (
              <div className={readonlyCls}>{user.address || '—'}</div>
            )}
          </div>

          {/* Read-only: Member Since */}
          <div>
            <label className={labelCls}>Member Since</label>
            <div className={readonlyCls}>{new Date(user.date_joined).toLocaleDateString()}</div>
          </div>

          {/* Read-only: Verified */}
          <div>
            <label className={labelCls}>Verification Status</label>
            <div className={readonlyCls}>{user.is_verified ? 'Verified' : 'Pending Approval'}</div>
          </div>

        </div>

        {/* Save button */}
        {editing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-[#F57C00] hover:bg-[#E06B00] disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition"
            >
              <Save size={15} />
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Create Listing Form ──────────────────────────────────────────────────────
const DOCUMENT_TYPES = [
  'C of O', 'R of O', 'Deed of Assignment', 'Survey Plan',
  'Governor Consent', 'Gazette', 'Excision', 'Freehold',
];

function CreateListingForm({ token, onSuccess }: { token: string; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amenityInput, setAmenityInput] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: '', location: '', address: '', price: '',
    sqft: '', description: '', status: 'available',
    title_document: 'C of O', is_new: false, is_featured: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  function set(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addAmenity() {
    const val = amenityInput.trim();
    if (val && !amenities.includes(val)) {
      setAmenities((prev) => [...prev, val]);
      setAmenityInput('');
    }
  }

  function removeAmenity(a: string) {
    setAmenities((prev) => prev.filter((x) => x !== a));
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    fd.append('amenities', JSON.stringify(amenities));
    if (image) fd.append('image', image);
    if (video) fd.append('video', video);

    try {
      const res = await fetch(`${API_BASE}/api/agent/properties/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.detail ?? JSON.stringify(err));
      } else {
        onSuccess();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputCls = 'w-full px-4 py-2.5 border border-[#4A5A4A]/20 rounded-xl text-sm text-[#1B2A4A] outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00]/20 transition';
  const labelCls = 'block text-xs font-medium text-[#8A9A8A] mb-1';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10 max-w-3xl space-y-6">
      <h2 className="text-lg font-bold text-[#1B2A4A]">Create New Listing</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. 3 Bedroom Duplex" />
        </div>
        <div>
          <label className={labelCls}>Location *</label>
          <input className={inputCls} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. Gwarinpa" />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Address *</label>
          <input className={inputCls} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Full address" />
        </div>
        <div>
          <label className={labelCls}>Price (₦) *</label>
          <input className={inputCls} type="number" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="e.g. 25000000" />
        </div>
        <div>
          <label className={labelCls}>Size (sqft) *</label>
          <input className={inputCls} type="number" value={form.sqft} onChange={(e) => set('sqft', e.target.value)} placeholder="e.g. 2000" />
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select className={inputCls} value={form.status} onChange={(e) => set('status', e.target.value)}>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Title Document</label>
          <select className={inputCls} value={form.title_document} onChange={(e) => set('title_document', e.target.value)}>
            {DOCUMENT_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Description *</label>
          <textarea className={inputCls} rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the property..." />
        </div>
      </div>

      <div className="flex gap-6">
        {[
          { field: 'is_new', label: 'Mark as New' },
          { field: 'is_featured', label: 'Mark as Featured' },
        ].map(({ field, label }) => (
          <label key={field} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(form as any)[field]}
              onChange={(e) => set(field, e.target.checked)}
              className="w-4 h-4 accent-[#F57C00]"
            />
            <span className="text-sm text-[#1B2A4A]">{label}</span>
          </label>
        ))}
      </div>

      <div>
        <label className={labelCls}>Amenities</label>
        <div className="flex gap-2 mb-2">
          <input
            className={inputCls}
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
            placeholder="e.g. Swimming Pool"
          />
          <button
            onClick={addAmenity}
            className="px-4 py-2.5 bg-[#F57C00] text-white text-sm font-semibold rounded-xl hover:bg-[#E06B00] transition shrink-0"
          >
            Add
          </button>
        </div>
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {amenities.map((a) => (
              <span key={a} className="flex items-center gap-1 bg-[#F57C00]/10 text-[#F57C00] text-xs font-medium px-3 py-1 rounded-full border border-[#F57C00]/20">
                {a}
                <button onClick={() => removeAmenity(a)} className="ml-1 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Property Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="w-full text-sm text-[#8A9A8A] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#F57C00]/10 file:text-[#F57C00] file:font-medium hover:file:bg-[#F57C00]/20"
          />
        </div>
        <div>
          <label className={labelCls}>Property Video (max 10MB)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              if (file && file.size > 10 * 1024 * 1024) {
                setError('Video must be under 10MB.');
                e.target.value = '';
              } else {
                setVideo(file);
              }
            }}
            className="w-full text-sm text-[#8A9A8A] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#F57C00]/10 file:text-[#F57C00] file:font-medium hover:file:bg-[#F57C00]/20"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#F57C00] hover:bg-[#E06B00] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
      >
        {loading ? 'Creating Listing…' : 'Create Listing'}
      </button>
    </div>
  );
}
