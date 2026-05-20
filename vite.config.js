import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages project site base path for https://sunnylincc.github.io/FrameToMotion/
  base: '/FrameToMotion/',
  plugins: [react()],
});
