// @ts-check
import { defineConfig } from 'astro/config';

// Set SITE_URL (e.g. https://www.example.com) at build time to emit absolute
// canonical / Open Graph URLs. Without it, those tags are simply omitted.
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
