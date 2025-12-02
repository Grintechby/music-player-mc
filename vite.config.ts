import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/music-player-mc/',
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
