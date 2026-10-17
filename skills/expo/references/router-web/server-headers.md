---
source: https://docs.expo.dev/router/web/server-headers/
---

# Server headers

Set custom HTTP headers (security, caching, cookies, metadata) on route responses through the `expo-router` config plugin.

## Signature / Usage

```json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "headers": {
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff",
            "Set-Cookie": ["session=abc123; HttpOnly", "preference=dark; Path=/"]
          }
        }
      ]
    ]
  }
}
```

Path-specific headers for HTML pages (SDK 58 and later):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "headers": { "X-Frame-Options": "DENY" },
          "pageHeaders": [
            { "source": "/blog/[slug]", "headers": { "Cache-Control": "public, max-age=60" } },
            { "source": "/account/[...path]", "headers": { "Cache-Control": "no-store" } }
          ]
        }
      ]
    ]
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `headers` | object (name to string or string[]) | Global headers applied to HTML, API route and data loader responses. Array values are appended (for example multiple `Set-Cookie`). |
| `pageHeaders` | array of `{ source, headers }` | SDK 58 and later. Headers for matching HTML pages. `source` uses Expo Router path syntax: `/blog/[slug]` one segment, `/account/[...path]` nested paths, `/about` exact. Does not apply to API routes. |

Header precedence for string values (highest to lowest): headers set by the route response, matching `pageHeaders` rules (later rules override earlier), global `headers`. Header names are case-insensitive.

## Notes

- Distinct from Next.js `headers()` in **next.config.js** and from hono / fastify header handling (see nextjs-app, hono, fastify skills); applied by `expo-server`.
- Available in SDK 54 and later; requires `expo-server` to serve the exported app. With `static` output, `expo-server` applies headers to pre-rendered HTML and loader data files; with `server`, to dynamically rendered HTML, API route and loader responses. Dev server and `npx expo serve` support global and path-specific headers. Other static hosts need their own header configuration.
- Does not apply to static assets (images, fonts, JavaScript bundles) or redirect responses.
- `Cross-Origin-Embedder-Policy: credentialless` with `Cross-Origin-Opener-Policy: same-origin` enables `SharedArrayBuffer` (needed for `expo-sqlite` on web).
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [API Routes](./api-routes.md)
- [Server middleware](./middleware.md)
- [Data loaders](./data-loaders.md)
