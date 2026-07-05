# Content Security Policy

Set a Content Security Policy (CSP) to guard a Next.js app against XSS, clickjacking, and other code injection attacks.

## Signature / Usage

```ts filename="proxy.ts"
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'nonce-${nonce}';
    object-src 'none';
    base-uri 'self';
  `.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', cspHeader)
  return response
}
```

## Key topics

- **Nonces**: a unique, unpredictable per-request string allowed in `script-src`/`style-src`. Generated in `proxy.js`, read on the server via `headers().get('x-nonce')`, and Next.js automatically applies it to framework scripts, page JS, and inline styles/scripts it generates.
- **Dynamic rendering requirement**: nonces require dynamic rendering (`await connection()`) since they're generated per request; static optimization, ISR, and PPR are incompatible with nonce-based CSP.
- **Without nonces**: set the CSP header directly via `headers()` in `next.config.js` — compatible with static generation and CDN caching, but requires `'unsafe-inline'`.
- **Subresource Integrity (SRI, experimental)**: alternative to nonces using build-time cryptographic hashes (`integrity` attributes); allows static generation. Enable via `experimental.sri.algorithm` (`sha256`/`sha384`/`sha512`) in `next.config.js`. App Router only.
- Filter which requests get the CSP header/nonce with a Proxy `matcher`, ignoring prefetches and static assets.

## Notes

- In development, `script-src` needs `'unsafe-eval'` because React uses `eval` for enhanced debugging; not required in production.
- SRI is experimental, App Router only, and only covers build-time (not dynamically generated) scripts.

## Related

- [Self-Hosting](./self-hosting.md)
