import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wissahickondatacollective.com',
  outDir: './dist',
  srcDir: './src',
  publicDir: './public',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
