// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Deployment target: GitHub Pages personal site (root domain, no base path)
  site: 'https://albertogalvez-dev.github.io',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [react()],
});
