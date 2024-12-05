// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This base URL must match your GitHub repository name
  base: '/org-utm-builder-v5/',
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensures assets are handled correctly
    assetsDir: 'assets',
    // Helpful for debugging
    minify: true,
  },
  
  server: {
    // Development server configuration
    port: 3000,
    open: true, // Automatically open browser
  },
  
  // Environment variables configuration
  define: {
    'process.env': process.env,
  },
});
