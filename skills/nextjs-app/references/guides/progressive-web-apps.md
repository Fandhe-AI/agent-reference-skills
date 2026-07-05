# Progressive Web Apps (PWAs)

Build installable, native-app-like experiences with Next.js: a web app manifest, Web Push notifications via a service worker, and home-screen install prompts.

## Signature / Usage

```tsx filename="app/manifest.ts"
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `app/manifest.ts\|json` | file convention | Generates the web app manifest (name, icons, display mode) |
| `navigator.serviceWorker.register('/sw.js')` | browser API | Registers the service worker for push notifications |
| `pushManager.subscribe({ userVisibleOnly, applicationServerKey })` | browser API | Subscribes to Web Push using a VAPID public key |
| `web-push generate-vapid-keys` | CLI | Generates `NEXT_PUBLIC_VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` |

## Notes

- Web Push is supported on iOS 16.4+ (home-screen installed apps), Safari 16 (macOS 13+), Chromium browsers, and Firefox.
- Subscription/unsubscription and sending notifications are implemented as Server Actions (`'use server'`) that call the `web-push` package server-side; store subscriptions in a database in production (the docs example uses an in-memory variable).
- Service worker (`public/sw.js`) listens for `push` and `notificationclick` events and calls `self.registration.showNotification`.
- Requires a valid manifest + HTTPS for install prompts; test locally with `next dev --experimental-https`.
- Set security headers (`X-Content-Type-Options`, `X-Frame-Options`, CSP for `/sw.js`) via `next.config.js` `headers()`.
- With `output: 'export'`, Server Actions aren't available — move subscription/notification logic to an external API and headers to your CDN/proxy config.
- Offline support: consider the community Serwist plugin (requires webpack config).

## Related

- [Environment Variables](./environment-variables.md)
- [Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy)
