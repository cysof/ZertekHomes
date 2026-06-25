// app/routes.ts
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
] satisfies RouteConfig;