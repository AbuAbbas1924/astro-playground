// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import db from '@astrojs/db';

import qwikdev from '@qwikdev/astro';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs(), db(), qwikdev(), solidJs()]
});