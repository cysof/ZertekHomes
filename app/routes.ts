import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('properties', 'routes/listings.tsx'),
  route('properties/:id', 'routes/property-detail.tsx'),
  route('agents', 'routes/agents.tsx'),
  route('agent/:id', 'routes/agent.$id.tsx'),
  route('contact', 'routes/contact.tsx'),

  // Auth routes
  route('auth/login', 'routes/auth.login.tsx'),
  route('auth/register', 'routes/auth.register.tsx'),
  route('auth/logout', 'routes/auth.logout.tsx'),

  // Dashboard
  route('dashboard', 'routes/dashboard.tsx'),
  route('dashboard/client', 'routes/dashboard.buyer.tsx'),
  route('dashboard/agent', 'routes/dashboard.agent.tsx'),
  route('dashboard/affiliate', 'routes/dashboard.affiliate.tsx'),
] satisfies RouteConfig;

// just making no changes