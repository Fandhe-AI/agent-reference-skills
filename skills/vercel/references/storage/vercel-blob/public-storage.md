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

```html
<a href="https://my-store-id.public.blob.vercel-storage.com/report.pdf?download=1">
  Download report
</a>
```

Append `?download=1` to any blob URL to force a file download instead of inline display, regardless of file type. The SDK also exposes this as `blob.downloadUrl`. Without it, the URL displays the file inline when the MIME type supports it (images, videos, audio, PDFs, plain text, JSON, and `text/xml`); all other MIME types trigger a download (including `application/xml`, the default content type for a pathname ending in `.xml`).

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

Public blob URLs can be indexed by search engines (for example when linked or embedded in public pages, or shared publicly). Vercel Blob provides no `robots.txt` by default. To prevent indexing, upload a `robots.txt` to the root of your blob store from the dashboard or the CLI:

```bash
vercel blob put ./robots.txt --pathname robots.txt --access public
```

```
User-agent: *
Disallow: /
```

To remove already indexed content: verify site ownership in Google Search Console, upload the `robots.txt` above, then use the "Remove URLs" tool to request removal.

## Download Charges

Per browser download: Blob Data Transfer + Fast Origin Transfer (on cache miss only). Blob Data Transfer is **3x more cost-efficient** than Fast Data Transfer on average — ideal for large media.

## Upload Charges

- Client uploads: no data transfer charges
- Server uploads: Fast Data Transfer charges apply when your Vercel app receives the file

## Notes

- Access mode cannot be changed after store creation
- HTML files are blocked from being hosted: Vercel Blob sets the `content-disposition` header to `inline` for displayable types and `attachment` for everything else (so HTML pages can't be hosted)
- On Vercel the SDK authenticates with OIDC by default: connect the store to a project and Vercel adds `BLOB_STORE_ID` and the OIDC token automatically (see blob-sdk.md Authentication)
- Server-side conditional reads use `ifNoneMatch` with `get()` as shown above; checked against the current public-storage docs
- Cache duration: both CDN and browser caches hold blobs for up to 1 month by default, but blobs may occasionally expire earlier. The 60-second minimum is the maximum time the cache needs to update content behind a blob URL; for faster updates use a Function
- Source: https://vercel.com/docs/vercel-blob/public-storage (fetched 2026-11-14)
- `addRandomSuffix: true` makes URLs unguessable but does not prevent indexing if linked publicly

### Protecting Public Blobs with the Firewall

Anyone with the URL can request a public blob and each download counts toward Blob Data Transfer. Vercel WAF rules (rate limiting, IP blocking) can stop hotlinking, scraping and abusive download patterns. To enable: open the store in the dashboard, select **Settings**, then in the **Firewall** section select **Protect your store** and **Enable firewall**. This connects the store to `vercel-blob-default-project`, a Vercel-managed team-wide project holding the firewall rules for all protected Blob stores (see security.md).

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Private Storage](./private-storage.md)
- [Pricing](./pricing.md)
