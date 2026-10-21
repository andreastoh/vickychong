import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  // Site is served from the domain root (vickychong.sg), so absolute paths
  // work on nested pages like /books/.
  base: '/',
  plugins: [tailwindcss()],
});
