import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// CV Builder — Astro static site, deployed on Cloudflare Pages
// Each CV is a JSON file in src/cvs/, rendered as a static page
export default defineConfig({
  site: 'https://cv.nexio.work',
  output: 'static',
  integrations: [],
  build: {
    format: 'directory',
  },
});
