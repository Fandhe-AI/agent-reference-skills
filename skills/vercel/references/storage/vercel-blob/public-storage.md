# Public Storage

Vercel Blob public stores make files accessible to anyone with the URL.

## Creating a Public Blob Store

```bash
# Dashboard: Storage > Create Database > Blob > Public
# CLI:
vercel blob create-store my-store --access public
```

## Uploading Files

```ts
import { put } from '@vercel/blob';

const blob = await put('images/hero.png', file, { access: 'public' });
console.log(blob.url); // https://<store-id>.public.blob.vercel-storage.com/images/hero.png
```

## Delivering Public Blobs

Use the blob URL directly in HTML:

```html
<img src="https://<store-id>.public.blob.vercel-storage.com/avatar.png" alt="Avatar" />
```

For Next.js `next/image`, add the hostname to `next.config.js`:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://<store-id>.public.blob.vercel-storage.com/**'),
    ],
  },
};
```

### Forcing Download

Append `?download=1` to any blob URL to force a file download instead of inline display. The SDK also exposes this as `blob.downloadUrl`.

## Caching

Public blobs are cached in:

1. **Vercel CDN cache** — up to 1 month by default
2. **Browser cache** — up to 1 month by default

Cache limit: 512 MB per blob. Blobs larger than 512 MB are never cached (every access is a cache MISS).

Customize duration with `cacheControlMaxAge` in `put()` or `handleUpload()`. Minimum: 60 seconds.

### Conditional Requests (ETag)

ETags are handled automatically for direct blob URL access. The CDN includes an `ETag` header; browsers send `If-None-Match` on subsequent requests. The CDN returns `304 Not Modified` when unchanged — no code required.

For server-side processing with `get()`:

```js
const result = await get('images/hero.png', {
  access: 'public',
  ifNoneMatch: previousEtag,
});

if (result.statusCode === 304) {
  // Use cached version
}
```

## SEO and Indexing

Public blob URLs can be indexed by search engines. To prevent indexing, upload a `robots.txt` to the root of your blob store:

```
User-agent: *
Disallow: /
```

## Download Charges

Per browser download: Blob Data Transfer + Fast Origin Transfer (on cache miss only). Blob Data Transfer is **3x more cost-efficient** than Fast Data Transfer on average — ideal for large media.

## Upload Charges

- Client uploads: no data transfer charges
- Server uploads: Fast Data Transfer charges apply when your Vercel app receives the file

## Notes

- Access mode cannot be changed after store creation
- HTML files are blocked from being hosted (content-disposition prevents it)
- `addRandomSuffix: true` makes URLs unguessable but does not prevent indexing if linked publicly

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Private Storage](./private-storage.md)
- [Pricing](./pricing.md)
