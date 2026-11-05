import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://thelifelink.org',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  // /clientpaperwork is a hidden page (reached only by QR code); keep it out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/clientpaperwork') })],
});
