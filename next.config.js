/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = withPWA({
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
});

/*
 Global Headers:
  X-Content-Type-Options: nosniff: Prevents MIME type sniffing, reducing the risk of malicious file uploads.
  X-Frame-Options: DENY: Protects against clickjacking attacks by preventing your site from being embedded in iframes.
  Referrer-Policy: strict-origin-when-cross-origin: Controls how much referrer information is included with requests, balancing security and functionality.

 Service Worker Specific Headers:
  Content-Type: application/javascript; charset=utf-8: Ensures the service worker is interpreted correctly as JavaScript.
  Cache-Control: no-cache, no-store, must-revalidate: Prevents caching of the service worker, ensuring users always get the latest version.
  Content-Security-Policy: default-src 'self'; script-src 'self': Implements a strict Content Security Policy for the service worker, only allowing scripts from the same origin.
*/

module.exports = nextConfig;
