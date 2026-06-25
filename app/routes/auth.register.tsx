// app/routes/auth.register.tsx
import { data, redirect, Form, Link, useActionData, useNavigation } from 'react-router';
import type { Route } from '../+types/root';
import { auth } from '../lib/api';
import { createAuthSession, getUser } from '../lib/session.server';

type Fields = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  requested_role: string;
  referral_code: string | undefined;
};

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (user) throw redirect('/');
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  const email = form.get('email') as string;
  const first_name = form.get('first_name') as string;
  const last_name = form.get('last_name') as string;
  const phone = form.get('phone') as string;
  const password = form.get('password') as string;
  const password2 = form.get('password2') as string;
  const requested_role = (form.get('requested_role') as string) || 'client';
  const referral_code = (form.get('referral_code') as string) || undefined;

  const fields: Fields = { email, first_name, last_name, phone, requested_role, referral_code };

  if (password !== password2) {
    return data(
      { error: { password: ["Passwords don't match"] } as Record<string, string[]>, fields },
      { status: 400 }
    );
  }

  const result = await auth.register({
    email,
    first_name,
    last_name,
    phone,
    password,
    password2,
    requested_role: requested_role as 'client' | 'agent' | 'affiliate',
    referral_code: referral_code || undefined,
  });

  if (!result.ok) {
    return data(
      { error: result.error as Record<string, string[]>, fields },
      { status: result.status }
    );
  }

  return createAuthSession(
    {
      access: result.data.access,
      refresh: result.data.refresh,
      user: result.data.user,
    },
    '/'
  );
}

function FieldError({
  errors,
  field,
}: {
  errors: Record<string, string[]>;
  field: string;
}) {
  const msg = errors[field];
  if (!msg) return null;

  const text = Array.isArray(msg) ? String(msg[0]) : String(msg);

  return <p className="mt-1 text-xs text-red-600">{text}</p>;
}

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const errors = (actionData?.error ?? {}) as Record<string, string[]>;
  const fields = actionData?.fields as Fields | undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1 text-sm">Join Zertek Realty today</p>
        </div>

        {errors?.non_field_errors && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {String(errors.non_field_errors)}
          </div>
        )}

        <Form method="post" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                defaultValue={fields?.first_name ?? ''}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <FieldError errors={errors} field="first_name" />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                defaultValue={fields?.last_name ?? ''}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <FieldError errors={errors} field="last_name" />
            </div>
          </div>

          <div className="mt-4 space-y-4">
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
                defaultValue={fields?.email ?? ''}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="you@example.com"
              />
              <FieldError errors={errors} field="email" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                defaultValue={fields?.phone ?? ''}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="+234 801 234 5678"
              />
              <FieldError errors={errors} field="phone" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Min 8 characters"
              />
              <FieldError errors={errors} field="password" />
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to sign up as
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['client', 'agent', 'affiliate'] as const).map((role) => (
                  <label
                    key={role}
                    className="relative flex cursor-pointer rounded-lg border p-3 text-center
                               has-[:checked]:border-green-600 has-[:checked]:bg-green-50 border-gray-200"
                  >
                    <input
                      type="radio"
                      name="requested_role"
                      value={role}
                      defaultChecked={fields?.requested_role === role || (!fields && role === 'client')}
                      className="sr-only"
                    />
                    <span className="w-full text-sm font-medium capitalize text-gray-700">
                      {role}
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Agent/affiliate accounts require admin approval before activation.
              </p>
            </div>

            <div>
              <label htmlFor="referral_code" className="block text-sm font-medium text-gray-700 mb-1">
                Referral code <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="referral_code"
                name="referral_code"
                type="text"
                defaultValue={fields?.referral_code ?? ''}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-green-700 hover:bg-green-800 disabled:opacity-60
                       text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-green-700 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}