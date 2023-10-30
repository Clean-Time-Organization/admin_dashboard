import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      awaitWriteFinish: true
    },
    host: 'localhost',
    //port: 3000,
  },

  build: {
    emptyOutDir: true,
  }
});
