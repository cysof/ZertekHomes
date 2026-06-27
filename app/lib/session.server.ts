// app/lib/session.server.ts
import { createCookieSessionStorage, redirect } from 'react-router';
import type { AuthSession, User } from './auth.types';

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

const API_BASE_URL = process.env.API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error('API_BASE_URL environment variable is required');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__zertek_session',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secrets: [process.env.SESSION_SECRET],
  },
});

export type { AuthSession, User } from './auth.types';

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export async function createAuthSession(
  authData: AuthSession,
  redirectTo: string
) {
  const session = await sessionStorage.getSession();
  session.set('access', authData.access);
  session.set('refresh', authData.refresh);
  // user object intentionally not stored — always fetched live from Django

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function destroyAuthSession(request: Request, redirectTo = '/') {
  const session = await getSession(request);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

/** Fetch fresh user data from Django on every request */
export async function getUser(request: Request): Promise<User | null> {
  const session = await getSession(request);
  const access = session.get('access');
  const refresh = session.get('refresh');

  if (!access) return null;

  // 1. Try with current access token
  let res = await fetch(`${API_BASE_URL}/api/account/profile/`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  // 2. If expired, attempt refresh
  if (res.status === 401 && refresh) {
    const refreshRes = await fetch(`${API_BASE_URL}/api/account/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshRes.ok) return null; // refresh token also expired → force login

    const { access: newAccess } = await refreshRes.json();
    session.set('access', newAccess);

    // Retry profile fetch with new access token
    res = await fetch(`${API_BASE_URL}/api/account/profile/`, {
      headers: { Authorization: `Bearer ${newAccess}` },
    });
  }

  if (!res.ok) return null;

  return (await res.json()) as User;
}

/** Read access token out of session */
export async function getAccessToken(request: Request): Promise<string | null> {
  const session = await getSession(request);
  return session.get('access') ?? null;
}

/** Read refresh token out of session */
export async function getRefreshToken(request: Request): Promise<string | null> {
  const session = await getSession(request);
  return session.get('refresh') ?? null;
}

/**
 * Require auth — redirects to /auth/login if not logged in.
 * Returns fresh user data from Django.
 */
export async function requireUser(request: Request): Promise<User> {
  const user = await getUser(request);
  if (!user) {
    const url = new URL(request.url);
    throw redirect(`/auth/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  return user;
}

export { sessionStorage };