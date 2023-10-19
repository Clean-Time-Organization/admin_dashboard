import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      awaitWriteFinish: true
    },
    host: 'localhost',
    port: 3000,
  },
  plugins: [react()],
});
