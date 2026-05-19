import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Update this for GitHub Pages project site deployment.
// Example: '/FrameToMotion/'
const repoBasePath = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base: repoBasePath,
  plugins: [react()],
});
