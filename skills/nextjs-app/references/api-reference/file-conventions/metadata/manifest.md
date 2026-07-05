# manifest.json

Adds or generates a `manifest.(json|webmanifest)` file matching the Web Manifest Specification, at the root of `app`.

## Signature / Usage

```ts filename="app/manifest.ts"
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }
}
```

## Notes

- Can be static (`app/manifest.json`/`.webmanifest`) or generated dynamically via `manifest.js`/`.ts` default-exporting a `MetadataRoute.Manifest` object.
- `manifest.js` is a specialized Route Handler, cached by default unless it uses a Request-time API or dynamic config.
- The manifest object has an extensive, evolving option set — refer to the `MetadataRoute.Manifest` TypeScript type or MDN's Web Manifest docs for the full current list.

## Related

- [Metadata Files overview](./README.md)
