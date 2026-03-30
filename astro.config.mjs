// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// import qwikdev from '@qwikdev/astro';

import solidJs from '@astrojs/solid-js';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    alpinejs({ entrypoint: 'src/utils/chat/a1/entry.ts' }),
    solidJs({ include: ['**/solid/**'] }),
    // qwikdev({ include: ['**/qwik/**'] })
  ]
});
