import { Serwist, NetworkFirst, CacheFirst, ExpirationPlugin } from 'serwist';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';

const enableServiceWorker = true
// Declaração do tipo para o worker global
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;
if (enableServiceWorker) {
  const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true, // Ativa o SW imediatamente
    clientsClaim: true, // Controla as páginas imediatamente
    navigationPreload: false,

    runtimeCaching: [
      {
        matcher: ({ url }) => url.pathname.endsWith('.css') || url.pathname.endsWith('.js'),
        handler: new CacheFirst({
          cacheName: 'static-assets',
          plugins: [
            new ExpirationPlugin({
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // Cache por 24 horas
            }),
          ],
        }),
      },
      // Cache para a página principal "/"
      {
        matcher: ({ url }) => {
          // Lista de URLs que devem ser cacheadas
          const cacheableUrls = ['/', '/silos'];
          return cacheableUrls.includes(url.pathname);
        },
        handler: new CacheFirst({
          cacheName: 'page-cache',
          plugins: [
            new ExpirationPlugin({
              maxEntries: 2,
              maxAgeSeconds: 60 * 60 * 24, // Cache por 24 horas
            }),
          ],
        }),
      },


      // Cache para APIs
      {
        matcher: ({ url }) => url.pathname.startsWith('/api'),
        handler: new NetworkFirst({
          networkTimeoutSeconds: 10, // Timeout rápido para APIs
          cacheName: 'api-cache',
          plugins: [
            new ExpirationPlugin({
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // Cache por 24 horas
            }),
          ],
        }),
      },

    ],
  });

  // Adicionando os listeners para eventos do Service Worker
  serwist.addEventListeners();
}
else {
  console.log('Service Worker Desabilitado')
}