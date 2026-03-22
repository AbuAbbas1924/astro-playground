// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import db from '@astrojs/db';

import qwikdev from '@qwikdev/astro';

import solidJs from '@astrojs/solid-js';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    alpinejs({ entrypoint: 'src/pages/chat/a1/entry.ts' }),
    db(),
    solidJs({ include: ['**/solid/**'] }),
    qwikdev({ include: ['**/qwik/**'] })
  ]
});