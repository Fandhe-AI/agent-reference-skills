# opengraph-image and twitter-image

Sets Open Graph and Twitter share images for a route segment via static image files or code-generated images.

## Signature / Usage

```tsx filename="app/about/opengraph-image.tsx"
import { ImageResponse } from 'next/og'

export const alt = 'About Acme'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        About Acme
      </div>
    ),
    { ...size }
  )
}
```

## Options / Props

| Convention | Supported file types |
|------|------|
| `opengraph-image` | `.jpg`, `.jpeg`, `.png`, `.gif` (static, max 8MB) or `.js`, `.ts`, `.tsx` (dynamic) |
| `twitter-image` | `.jpg`, `.jpeg`, `.png`, `.gif` (static, max 5MB) or `.js`, `.ts`, `.tsx` (dynamic) |
| `opengraph-image.alt.txt` / `twitter-image.alt.txt` | `.txt` — alt text accompanying the static image |

Dynamic config exports:

| Name | Type | Description |
|------|------|-------------|
| `alt` | `string` | Image alt text. |
| `size` | `{ width: number; height: number }` | Image dimensions. |
| `contentType` | `string` | Image MIME type. |
| `params` (function arg, optional) | `Promise<object>` | Dynamic route params for the segment the image is colocated in. |

## Notes

- If the static image file exceeds the size limit (8MB for `opengraph-image`, 5MB for `twitter-image`), the build fails.
- Default export must return `Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response` (`ImageResponse` satisfies this).
- Dynamic images are specialized cached Route Handlers, statically optimized by default unless using Request-time APIs or uncached data; use `generateImageMetadata` to emit multiple images per file.
- Uses the same [Route Segment Config](../route-segment-config.md) options as pages/layouts.
- Passing a raw `ArrayBuffer` to `<img src>` in `next/og` JSX works at runtime (via Satori) but is outside the HTML spec — requires a `@ts-expect-error` in TypeScript.
- `v16.0.0`: `params` became a promise. Introduced in `v13.3.0`.

## Related

- [favicon, icon, and apple-icon](./app-icons.md)
- [ImageResponse](../../functions/image-response.md)
- [generateImageMetadata](../../functions/generate-image-metadata.md)
