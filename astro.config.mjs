// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// import qwikdev from '@qwikdev/astro';

import solidJs from '@astrojs/solid-js';
import node from '@astrojs/node';
import chatWs from './src/integrations/chat-ws.js';
import chatB1Ws from './src/integrations/chat-b1-ws.js';

import qwikDev from '@qwik.dev/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['astro:db']
      }
    }
  },

  integrations: [
    alpinejs(),
    solidJs({ include: ['**/solid/**'] }),
    qwikDev({ include: ['**/qwik/**'] }),
    chatWs(),
    chatB1Ws(),
  ]
});