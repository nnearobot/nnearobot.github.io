import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Base URL for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});