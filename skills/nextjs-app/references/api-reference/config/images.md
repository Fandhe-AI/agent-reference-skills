# images

Custom configuration for the `next/image` loader, primarily for using an external image optimization provider instead of the built-in Image Optimization API.

## Signature / Usage

```js filename="next.config.js"
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my/image/loader.js',
  },
}
```

```js filename="my/image/loader.js"
'use client'

export default function myImageLoader({ src, width, quality }) {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}
```

## Notes

- `loaderFile` must point to a file (relative to the project root) that default-exports a function `({ src, width, quality }) => string`.
- Customizing the loader file requires Client Components to serialize the provided function.
- Alternatively, pass a loader function via the [`loader` prop](/docs/app/api-reference/components/image#loader) on individual `next/image` instances instead of globally.
- The full set of built-in Image Optimization config options (`remotePatterns`, `deviceSizes`, `imageSizes`, `formats`, `minimumCacheTTL`, `dangerouslyAllowSVG`, etc.) is documented under [Image Configuration Options](/docs/app/api-reference/components/image#configuration-options) (component reference, not this config page).
- Official example loaders are provided for: Akamai, AWS CloudFront, Cloudinary, Cloudflare, Contentful, Fastly, Gumlet, ImageEngine, Imgix, PixelBin, Sanity, Sirv, Supabase, Thumbor, ImageKit.io, Nitrogen AIO — see the official page for each snippet.

## Related

- [Image component reference](/docs/app/api-reference/components/image)
- [routing.md](./routing.md)
