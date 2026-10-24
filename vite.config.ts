import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Matches the currently shared GitHub Pages project URL:
// https://tanishk-mehta.github.io/tanishkmehta.github.io/
export default defineConfig({
  plugins: [react()],
  base: '/tanishkmehta.github.io/',
});
