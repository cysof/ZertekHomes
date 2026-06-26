import { useLoaderData, Link, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { requireUser, getAccessToken } from '../lib/session.server';
import { useState, useRef } from 'react';
import {
  User, LogOut, FileText, CreditCard, Bell, ChevronRight,
  AlertCircle, Edit, X, Save, Camera, Phone, MapPinned,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function fetchWithAuth(endpoint: string, token: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const token = await getAccessToken(request);

  if (user.role !== 'client') {
    const { redirect } = await import('react-router');
    throw redirect(`/dashboard/${user.role}`);
  }

  const [agreements, reminders] = await Promise.all([
    fetchWithAuth('/api/agent/land-banking-agreements/', token!),
    fetchWithAuth('/api/agent/payment-reminders/', token!),
  ]);

  return {
    user,
    token,
    agreements: agreements?.results ?? agreements ?? [],
    reminders: reminders?.results ?? reminders ?? [],
  };
}

export default function ClientDashboard() {
  const { user, token, agreements, reminders } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const unreadReminders = reminders.filter((r: any) => !r.is_read);
  const activeAgreements = agreements.filter((a: any) => a.status === 'active');
  const completedAgreements = agreements.filter((a: any) => a.status === 'completed');

  return (
    <div className="min-h-screen bg-[#F8FAFA]">
      {/* Header */}
      <div className="bg-[#1B2A4A] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F57C00] flex items-center justify-center shrink-0 overflow-hidden">
                {user.image_url ? (
                  <img src={user.image_url} alt={user.full_name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-xl font-bold">
                    {user.first_name[0]}{user.last_name[0]}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white/60 text-sm">Welcome back</p>
                <h1 className="text-xl font-bold">{user.full_name}</h1>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                  Client
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
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Agreements', value: agreements.length, icon: FileText, color: 'text-[#1B2A4A]' },
            { label: 'Active', value: activeAgreements.length, icon: CreditCard, color: 'text-green-600' },
            { label: 'Completed', value: completedAgreements.length, icon: CreditCard, color: 'text-[#F57C00]' },
            { label: 'Unread Alerts', value: unreadReminders.length, icon: Bell, color: 'text-red-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A5A4A]/10">
              <stat.icon size={20} className={`${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-[#1B2A4A]">{stat.value}</p>
              <p className="text-xs text-[#8A9A8A] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reminders */}
        {unreadReminders.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-amber-600" />
              <h2 className="font-bold text-amber-800">Payment Reminders</h2>
            </div>
            <div className="space-y-2">
              {unreadReminders.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-amber-100">
                  <div>
                    <p className="text-sm font-medium text-[#1B2A4A]">{r.reminder_type}</p>
                    <p className="text-xs text-[#8A9A8A]">Due: {new Date(r.due_date).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Unread</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agreements */}
        <div>
          <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">My Land Banking Agreements</h2>

          {agreements.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#4A5A4A]/10 shadow-sm">
              <FileText size={40} className="text-[#8A9A8A] mx-auto mb-3" />
              <p className="text-[#1B2A4A] font-medium">No agreements yet</p>
              <p className="text-[#8A9A8A] text-sm mt-1">Browse properties to get started</p>
              <Link
                to="/properties"
                className="mt-4 inline-block bg-[#F57C00] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#E06B00] transition"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {agreements.map((agreement: any) => (
                <div key={agreement.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A5A4A]/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-[#1B2A4A]">{agreement.property_title ?? `Agreement #${agreement.id}`}</h3>
                      <p className="text-sm text-[#8A9A8A] mt-0.5">Plan: {agreement.plan_name ?? agreement.plan}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                      agreement.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : agreement.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {agreement.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Total Amount', value: `₦${Number(agreement.total_amount).toLocaleString()}` },
                      { label: 'Balance', value: `₦${Number(agreement.balance_remaining).toLocaleString()}` },
                      { label: 'Monthly Payment', value: `₦${Number(agreement.monthly_payment).toLocaleString()}` },
                      { label: 'Next Due', value: agreement.next_payment_date ? new Date(agreement.next_payment_date).toLocaleDateString() : '—' },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#F8FAFA] rounded-xl p-3">
                        <p className="text-xs text-[#8A9A8A]">{item.label}</p>
                        <p className="text-sm font-bold text-[#1B2A4A] mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {agreement.payments?.length > 0 && (
                    <div className="mt-4 border-t border-[#4A5A4A]/10 pt-4">
                      <p className="text-xs font-semibold text-[#8A9A8A] uppercase tracking-wide mb-2">Payment History</p>
                      <div className="space-y-2">
                        {agreement.payments.map((payment: any) => (
                          <div key={payment.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <CreditCard size={14} className="text-[#F57C00]" />
                              <span className="text-[#1B2A4A]">₦{Number(payment.amount).toLocaleString()}</span>
                              <span className="text-[#8A9A8A] text-xs">via {payment.payment_method}</span>
                            </div>
                            <span className="text-[#8A9A8A] text-xs">
                              {new Date(payment.payment_date).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <EditProfileForm
          user={user}
          token={token!}
          onSaved={() => navigate('.', { replace: true })}
        />

      </div>
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
      const res = await fetch(`${API_BASE_URL}/api/account/profile/`, {
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
          <span className="text-xs bg-white/10 border border-[#4A5A4A]/20 text-[#8A9A8A] px-2 py-0.5 rounded-full mt-1 inline-block">
            Client
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
          <label className={labelCls}>Verification Status</label>
          <div className={readonlyCls}>{user.is_verified ? 'Verified' : 'Pending'}</div>
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
  );
}
