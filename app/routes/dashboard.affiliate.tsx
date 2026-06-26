import { useLoaderData, Link, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { requireUser, getAccessToken } from '../lib/session.server';
import { redirect } from 'react-router';
import { useState, useRef } from 'react';
import {
  LogOut, Users, DollarSign, Clock, Copy, CheckCheck,
  TrendingUp, User, Gift, Edit, X, Save, Camera, Phone, MapPinned,
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

  if (user.role !== 'affiliate') throw redirect(`/dashboard/${user.role}`);

  const profile = await fetchWithAuth(`/api/account/affiliates/${user.id}/`, token!);

  return {
    user,
    token,
    profile: profile ?? null,
  };
}

type Tab = 'overview' | 'referrals' | 'profile';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'referrals', label: 'Referrals', icon: Users },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function AffiliateDashboard() {
  const { user, token, profile } = useLoaderData<typeof loader>();
  const [tab, setTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const referralLink = profile?.referral_link
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}${profile.referral_link}`
    : null;

  function copyReferralLink() {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFA]">

      {/* Header */}
      <div className="bg-[#1B2A4A] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
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
                <p className="text-white/60 text-sm">Affiliate Dashboard</p>
                <h1 className="text-xl font-bold">{user.full_name}</h1>
                <span className="text-xs bg-[#F57C00]/20 text-[#F57C00] px-2 py-0.5 rounded-full">
                  {profile?.is_approved ? 'Approved Affiliate' : 'Pending Approval'}
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

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Not approved yet */}
        {!profile?.is_approved && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-start gap-3">
            <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800">Approval Pending</p>
              <p className="text-sm text-amber-700 mt-0.5">
                Your affiliate account is awaiting admin approval. You'll be able to share your referral link once approved.
              </p>
            </div>
          </div>
        )}

        {/* ── Overview ── */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Referrals', value: profile?.total_referrals ?? 0, icon: Users, color: 'text-[#1B2A4A]' },
                { label: 'Commission Earned', value: `₦${Number(profile?.total_commission_earned ?? 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
                { label: 'Pending Commission', value: `₦${Number(profile?.pending_commission ?? 0).toLocaleString()}`, icon: Clock, color: 'text-amber-500' },
                { label: 'Commission Rate', value: `${profile?.commission_rate ?? 0}%`, icon: Gift, color: 'text-[#F57C00]' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A5A4A]/10">
                  <s.icon size={20} className={`${s.color} mb-2`} />
                  <p className="text-2xl font-bold text-[#1B2A4A]">{s.value}</p>
                  <p className="text-xs text-[#8A9A8A] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Referral Link */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A5A4A]/10">
              <h2 className="font-bold text-[#1B2A4A] mb-1">Your Referral Link</h2>
              <p className="text-xs text-[#8A9A8A] mb-4">
                Share this link to earn commission when someone signs up and makes a purchase.
              </p>
              {profile?.is_approved && referralLink ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#F8FAFA] border border-[#4A5A4A]/10 rounded-xl px-4 py-3 text-sm text-[#1B2A4A] font-mono truncate">
                    {referralLink}
                  </div>
                  <button
                    onClick={copyReferralLink}
                    className="flex items-center gap-2 bg-[#F57C00] hover:bg-[#E06B00] text-white text-sm font-semibold px-4 py-3 rounded-xl transition shrink-0"
                  >
                    {copied ? <CheckCheck size={15} /> : <Copy size={15} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ) : (
                <div className="bg-[#F8FAFA] border border-[#4A5A4A]/10 rounded-xl px-4 py-3 text-sm text-[#8A9A8A]">
                  Available after approval
                </div>
              )}
              {profile?.referral_code && (
                <p className="text-xs text-[#8A9A8A] mt-3">
                  Referral code: <span className="font-mono text-[#1B2A4A] font-medium">{profile.referral_code}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Referrals ── */}
        {tab === 'referrals' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1B2A4A]">
              Referrals ({profile?.total_referrals ?? 0})
            </h2>
            <div className="bg-white rounded-2xl p-10 text-center border border-[#4A5A4A]/10 shadow-sm">
              <Users size={40} className="text-[#8A9A8A] mx-auto mb-3" />
              <p className="text-[#1B2A4A] font-medium">
                {profile?.total_referrals > 0
                  ? `You have ${profile.total_referrals} referral(s)`
                  : 'No referrals yet'}
              </p>
              <p className="text-[#8A9A8A] text-sm mt-1">
                {profile?.total_referrals > 0
                  ? 'Detailed referral history coming soon.'
                  : 'Share your referral link to start earning commission.'}
              </p>
            </div>
          </div>
        )}

        {/* ── Profile ── */}
        {tab === 'profile' && (
          <EditProfileForm
            user={user}
            token={token!}
            isApproved={profile?.is_approved ?? false}
            onSaved={() => navigate('.', { replace: true })}
          />
        )}

      </div>
    </div>
  );
}

// ── Edit Profile Form ────────────────────────────────────────────────────────

function EditProfileForm({
  user,
  token,
  isApproved,
  onSaved,
}: {
  user: any;
  token: string;
  isApproved: boolean;
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
    <div className="max-w-2xl">
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

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
            Profile updated successfully.
          </div>
        )}

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
              {isApproved ? 'Approved Affiliate' : 'Pending Approval'}
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

          <div>
            <label className={labelCls}>Full Name</label>
            <div className={readonlyCls}>{user.full_name}</div>
            <p className="text-[10px] text-[#8A9A8A] mt-1">Contact support to change your name</p>
          </div>

          <div>
            <label className={labelCls}>Email Address</label>
            <div className={readonlyCls}>{user.email}</div>
            <p className="text-[10px] text-[#8A9A8A] mt-1">Contact support to change your email</p>
          </div>

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

          <div>
            <label className={labelCls}>Member Since</label>
            <div className={readonlyCls}>{new Date(user.date_joined).toLocaleDateString()}</div>
          </div>

          <div>
            <label className={labelCls}>Status</label>
            <div className={readonlyCls}>{isApproved ? 'Approved' : 'Pending Approval'}</div>
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
