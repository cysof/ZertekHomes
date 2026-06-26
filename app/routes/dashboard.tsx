import { redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { requireUser } from '../lib/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);

  switch (user.role) {
    case 'agent':
      throw redirect('/dashboard/agent');
    case 'affiliate':
      throw redirect('/dashboard/affiliate');
    case 'client':
    default:
      throw redirect('/dashboard/client');
  }
}

// This route only redirects — no component needed
export default function Dashboard() {
  return null;
}