import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://thelifelink.org',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
