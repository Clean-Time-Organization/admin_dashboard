import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import preserveDirectives from "rollup-plugin-preserve-directives";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    preserveDirectives(),
  ],

  server: {
    watch: {
      awaitWriteFinish: true
    },
    host: 'localhost',
    port: 3000,
  },

  build: {
    emptyOutDir: true,
  },
});
