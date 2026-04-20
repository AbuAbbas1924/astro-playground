// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// import qwikdev from '@qwikdev/astro';

import solidJs from '@astrojs/solid-js';
import cloudflare from '@astrojs/cloudflare';
import chatA1Ws from './src/integrations/chat-a1-ws.js';
import chatB1Ws from './src/integrations/chat-b1-ws.js';
import chatC1Ws from './src/integrations/chat-c1-ws.js';

import qwikDev from '@qwik.dev/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({ prerenderEnvironment: 'node' }),
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'cf-ssr-externals',
        enforce: 'post',
        configEnvironment(name) {
          if (name === 'ssr' || name === 'prerender') {
            return {
              optimizeDeps: {
                exclude: [
                  'lightningcss',
                  'blake3-wasm',
                  '@qwik.dev/astro',
                  '@qwik.dev/core',
                  '@babel/core',
                  '@babel/preset-typescript',
                ],
              },
            };
          }
        },
        resolveId(id) {
          if (
            id === 'virtual:qwik-astro' ||
            id === '@qwik-client-manifest' ||
            id === 'astro:db'
          ) {
            return { id, external: true };
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        external: (id) =>
          id === 'astro:db' ||
          id === 'virtual:qwik-astro' ||
          id === '@qwik-client-manifest' ||
          id.startsWith('@qwik.dev/') ||
          id.startsWith('@babel/'),
      },
    },
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