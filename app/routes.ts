import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('properties', 'routes/listings.tsx'),
  route('properties/:id', 'routes/property-detail.tsx'),
  route('agents', 'routes/agents.tsx'),
  route('contact', 'routes/contact.tsx'),
] satisfies RouteConfig;
