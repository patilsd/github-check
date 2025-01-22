import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: process.env.VITE_API_BASE_URL, 
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: process.env.VITE_API_BASE_URL, 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});