// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * IMPORTANT — update these before the first GitHub Pages deploy:
 *
 * 1. `site` must be your Pages origin.
 *    - User site: https://<username>.github.io
 *    - Project site: https://<username>.github.io
 *
 * 2. `base` is only needed for a PROJECT repo (not <username>.github.io).
 *    - User site: leave as '/'
 *    - Project site: '/<repo-name>/'
 *
 * These can also be supplied via env vars SITE_URL and BASE_PATH
 * so the same repo works locally, in CI, and on Pages without edits.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://example.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
