/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan dicaching
const assetsToCache = [
  './icons/72x72.png',
  './icons/96x96.png',
  './icons/128x128.png',
  './icons/144x144.png',
  './icons/152x152.png',
  './icons/384x384.png',
  './icons/512x512.png',
  './index.html',
  './favicon.ico',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));

  // TODO: Caching App Shell Resource
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());

  // TODO: Delete old caches
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));

  // TODO: Add/get fetch request to/from caches
});
