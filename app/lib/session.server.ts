// app/lib/session.server.ts
import { createCookieSessionStorage, redirect } from 'react-router';
import type { AuthSession, User } from './auth.types';

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__zertek_session',
    httpOnly: true,   // JS can't read this — immune to XSS token theft
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,  // 7 days — matches your REFRESH_TOKEN_LIFETIME
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
  session.set('user', authData.user);

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

/** Read user out of session — null if not logged in */
export async function getUser(request: Request): Promise<User | null> {
  const session = await getSession(request);
  return session.get('user') ?? null;
}

/** Read access token out of session — null if not logged in */
export async function getAccessToken(request: Request): Promise<string | null> {
  const session = await getSession(request);
  return session.get('access') ?? null;
}

/** Read refresh token out of session — null if not logged in */
export async function getRefreshToken(request: Request): Promise<string | null> {
  const session = await getSession(request);
  return session.get('refresh') ?? null;
}

/**
 * Require auth — call at the top of any protected loader/action.
 * Redirects to /auth/login with a `?redirectTo` param so the user
 * lands back on the page they were trying to visit after logging in.
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