# Image Optimization

Dynamically transforms and caches images on the Vercel CDN to reduce file size while maintaining quality. Works with Next.js `Image` component, Nuxt, Astro, and other frameworks.

## Image Transformation URL Format

```
# Next.js
/_next/image?url={source-url}&w=3840&q=75

# Nuxt, Astro, etc.
/_vercel/image?url={source-url}&w=3840&q=75
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `url` | Source image URL (relative for local, absolute for remote) |
| `w` | Width in pixels; aspect ratio preserved |
| `q` | Quality 1–100 (lowest–highest) |

## Configuration (Next.js)

### Local Patterns

```ts
// next.config.ts
const nextConfig = {
  images: {
    localPatterns: [
      { pathname: '/assets/images/**', search: '' },
    ],
  },
};
```

### Remote Patterns

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
    ],
  },
};
```

## Cache Behavior

| Status | Behavior | Billing |
|--------|----------|---------|
| HIT | Served from CDN cache (regional or global) | Image cache read |
| MISS | Fetched, transformed, cached, served | Image transformation + cache write |
| STALE | Served from cache while revalidating in background | Image transformation + cache write |

### Local Image Cache

| Property | Value |
|----------|-------|
| Cache key | Project ID + query params (`q`, `w`, content hash) + normalized `Accept` header |
| Cache expiration | Up to 31 days on Vercel CDN |
| Cache invalidation | Replace image content and redeploy; or manually/programmatically purge |

### Remote Image Cache

| Property | Value |
|----------|-------|
| Cache key | Project ID + query params (`q`, `w`, absolute URL) + normalized `Accept` header |
| Cache expiration | Larger of upstream `Cache-Control: max-age` or `minimumCacheTTL` (default: 3600s) |
| Cache invalidation | Manual/programmatic purge; or wait for TTL expiry |

## When to Use

**Ideal for:**
- Responsive layouts (different device sizes)
- Large, high-quality images (product photos, hero images)
- User-uploaded images

**Not recommended for:**
- Small icons/thumbnails under 10 KB
- Animated GIFs
- SVG vectors
- Frequently changing images (caching may serve outdated content)

## Modern Format Support

Vercel optimizes images to modern formats including **WebP** and **AVIF** based on browser `Accept` headers.

## Notes

- Redeploying does **not** invalidate the image cache; replace image content or purge manually
- Each request counts towards Fast Data Transfer and Edge Request usage
- Use `unoptimized` prop on Next.js `Image` component to bypass optimization per image
- Remote image `hostname` should include account-specific path segment to prevent abuse
- Opt into transformation-based pricing: **Team Settings → Billing → Image Optimization**

## Related

- [overview.md](./overview.md)
- [regions.md](./regions.md)
