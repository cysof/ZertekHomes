// app/routes/auth.login.tsx
import { data, redirect, Form, Link, useActionData, useNavigation } from 'react-router';
import type { Route } from './+types/auth.login';
import { auth } from '../lib/api';
import { createAuthSession, getUser } from '../lib/session.server';

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (user) throw redirect('/');
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const redirectTo = (form.get('redirectTo') as string) || '/';

  if (!email || !password) {
    return data(
      { error: 'Email and password are required', fields: { email } },
      { status: 400 }
    );
  }

  const result = await auth.login({ email, password });

  if (!result.ok) {
    const message =
      (result.error as { error?: string })?.error ?? 'Invalid credentials';
    return data({ error: message, fields: { email } }, { status: result.status });
  }

  return createAuthSession(
    {
      access: result.data.access,
      refresh: result.data.refresh,
      user: result.data.user,
    },
    redirectTo
  );
}

export default function LoginPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your Zertek account</p>
        </div>

        {actionData?.error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {actionData.error}
          </div>
        )}

        <Form method="post" noValidate>
          <input type="hidden" name="redirectTo" value={
            typeof window !== 'undefined'
              ? new URL(window.location.href).searchParams.get('redirectTo') ?? '/'
              : '/'
          } />

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={actionData?.fields?.email ?? ''}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <span className="text-xs text-green-700 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-green-700 hover:bg-green-800 disabled:opacity-60
                       text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-green-700 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}