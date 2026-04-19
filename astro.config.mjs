// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// import qwikdev from '@qwikdev/astro';

import solidJs from '@astrojs/solid-js';
import node from '@astrojs/node';
import chatA1Ws from './src/integrations/chat-a1-ws.js';
import chatB1Ws from './src/integrations/chat-b1-ws.js';
import chatC1Ws from './src/integrations/chat-c1-ws.js';

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
    chatA1Ws(),
    chatB1Ws(),
    chatC1Ws(),
  ]
});