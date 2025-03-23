import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: process.env.NODE_ENV === 'development', // Solo generar source maps en desarrollo
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar las dependencias grandes en chunks separados
          'react-vendor': ['react', 'react-dom', 'react-router', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    // Aumentar el tiempo de espera para las solicitudes
    hmr: {
      timeout: 60000, // 60 segundos
    },
  },
});