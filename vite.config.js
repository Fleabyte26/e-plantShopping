import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/e-plantShopping/', // GitHub repository name, used for GitHub Pages
  plugins: [react()],
  server: {
    port: 5173, // optional: default Vite port
  },
});