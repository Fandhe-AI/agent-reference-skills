# Image Component (`next/image`)

The Next.js `<Image>` component extends the HTML `<img>` element for automatic image optimization (resizing, format conversion, lazy loading, layout-shift prevention).

## Signature / Usage

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `src` | String (path, absolute URL, or static import) | Yes | Image source. External URLs must be allowed via `remotePatterns` |
| `alt` | String | Yes | Accessible description; empty string `""` for purely decorative images |
| `width` / `height` | Integer (px) | Yes unless `fill` or static import | Intrinsic size used to infer aspect ratio; does not control rendered size (use CSS) |
| `fill` | Boolean | - | Expands image to fill the parent (which must be `position: relative/fixed/absolute`) |
| `loader` | Function | - | Custom function `({src, width, quality}) => url` to generate the image URL |
| `sizes` | String | - | Breakpoint sizes used to pick the best `srcset` entry; recommended when using `fill` or responsive CSS |
| `quality` | Integer (1-100) | - | Optimized image quality. Default `75`; must match an allowed `qualities` entry if configured |
| `preload` | Boolean | - | Preloads the image via `<link>` in `<head>`. Default `false`. Replaces deprecated `priority` (since v16) |
| `placeholder` | String | - | `'empty'` (default), `'blur'` (needs `blurDataURL`), or a `data:image/...` URL |
| `style` | Object | - | Inline CSS styles for the underlying image element |
| `onLoad` | Function | - | Callback invoked once the image finishes loading (Client Component required) |
| `onError` | Function | - | Callback invoked if the image fails to load (Client Component required) |
| `loading` | String | - | `'lazy'` (default) or `'eager'` |
| `blurDataURL` | String | - | Data URL used as blur placeholder; auto-set for static imports of jpg/png/webp/avif |
| `unoptimized` | Boolean | - | Serves the source as-is without optimization. Default `false` |
| `overrideSrc` | String | - | Overrides the generated `src` attribute while keeping the generated `srcset` |
| `decoding` | String | - | `'async'` (default), `'sync'`, or `'auto'` |
| `onLoadingComplete` | Function | Deprecated (use `onLoad`) | Callback with a reference to the `<img>` element |

Other props are passed through to the underlying `<img>` element except `srcSet` (use `deviceSizes` config instead).

## `next.config.js` image options

| Name | Description |
|------|-------------|
| `localPatterns` | Allowlist of local `pathname`/`search` patterns permitted for optimization |
| `remotePatterns` | Allowlist of `protocol`/`hostname`/`port`/`pathname`/`search` for external images (supports `*`/`**` wildcards); recommended over `domains` |
| `loaderFile` | Path to a custom loader module exporting a default `({src,width,quality}) => url` function |
| `path` | Prefix path for the Image Optimization API. Default `/_next/image` |
| `deviceSizes` | Device width breakpoints used with `sizes`. Default `[640,750,828,1080,1200,1920,2048,3840]` |
| `imageSizes` | Additional image widths for `srcset` generation. Default `[32,48,64,96,128,256,384]` |
| `qualities` | Allowlist of quality values. Default `[75]`; required explicitly since v16 |
| `formats` | Output formats in priority order, e.g. `['image/avif','image/webp']`. Default `['image/webp']` |
| `minimumCacheTTL` | Cache TTL (seconds) for optimized images. Default `14400` (4 hours) |
| `disableStaticImages` | Disables static image imports (`import img from './x.png'`) |
| `maximumRedirects` | Max HTTP redirects followed when fetching remote images. Default `3` |
| `maximumDiskCacheSize` | Max bytes for the on-disk optimized-image cache; `0` disables disk caching |
| `maximumResponseBody` | Max source image size fetched (bytes). Default `50_000_000` |
| `dangerouslyAllowLocalIP` | Allow optimizing images from local network IPs. Default `false` |
| `dangerouslyAllowSVG` | Allow serving/optimizing SVG images (recommend pairing with `contentSecurityPolicy`) |
| `contentDispositionType` | `Content-Disposition` header value, `'attachment'` (default) or `'inline'` |
| `contentSecurityPolicy` | CSP header value applied to optimized images |
| `domains` | Deprecated in favor of `remotePatterns` |

## Notes

- Must set both `width` and `height` unless the image is statically imported or uses `fill`.
- `getImageProps()` (stable since v14.1.0) returns the props that would go on `<img>`, useful for `<picture>`/art-direction or CSS `image-set()` backgrounds; incompatible with `placeholder`.
- SVGs are not optimized by default; use `unoptimized` (automatic when `src` ends in `.svg`) or enable `dangerouslyAllowSVG` with `contentSecurityPolicy`.
- Known browser quirks: Safari 15–16.3 shows a gray border while lazy-loading; Firefox 67+ shows a white background while loading (mitigate with `placeholder` or AVIF `formats`).
- `priority` prop is deprecated since v16 in favor of `preload`.

## Related

- [Font Module](./font.md)
