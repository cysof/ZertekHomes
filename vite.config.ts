
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';  // ✅ add this
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),      // ✅ must be before reactRouter
    reactRouter(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});