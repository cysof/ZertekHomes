// app/routes/auth.logout.tsx
// Resource route — no default export (no UI). POST-only.
import { redirect } from 'react-router';
import type { Route } from '../+types/root';
import { auth } from '../lib/api';
import { destroyAuthSession, getRefreshToken } from '../lib/session.server';

// Safety net: someone navigated to /auth/logout directly via GET
export async function loader() {
  throw redirect('/');
}

export async function action({ request }: Route.ActionArgs) {
  const refreshToken = await getRefreshToken(request);

  // Best-effort: blacklist the refresh token on Django so it can't be reused.
  // We don't block logout on this failing (network error, already-expired token
  // etc.) — the cookie is destroyed regardless.
  if (refreshToken) {
    await auth.logout(refreshToken).catch(() => null);
  }

  return destroyAuthSession(request, '/auth/login');
}
