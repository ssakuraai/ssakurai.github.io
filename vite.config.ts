import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ssakuraai",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
