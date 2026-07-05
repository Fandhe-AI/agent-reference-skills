# favicon, icon, and apple-icon

Sets app icons (browser tabs, phone home screens, search results) via static image files or code-generated icons.

## Signature / Usage

```tsx filename="app/icon.tsx"
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        A
      </div>
    ),
    { ...size }
  )
}
```

## Options / Props

| Convention | Supported file types | Location |
|------|------|-------------|
| `favicon` | `.ico` | `app/` (top level only) |
| `icon` | `.ico`, `.jpg`, `.jpeg`, `.png`, `.svg` (static) or `.js`, `.ts`, `.tsx` (dynamic) | `app/**/*` |
| `apple-icon` | `.jpg`, `.jpeg`, `.png` (static) or `.js`, `.ts`, `.tsx` (dynamic) | `app/**/*` |

Dynamic `icon`/`apple-icon` config exports:

| Name | Type | Description |
|------|------|-------------|
| `size` | `{ width: number; height: number }` | Sets icon dimensions. |
| `contentType` | `string` | Image MIME type. |
| `params` (function arg, optional) | `Promise<object>` | Dynamic route params for the segment the icon is colocated in. |

## Notes

- Multiple icons can be set with numeric suffixes (`icon1.png`, `icon2.png`, ...), sorted lexically.
- `favicon` can only be set at the root `app` segment; use `icon` for per-segment granularity. You cannot generate a `favicon` with code — use a static `favicon.ico` or `icon` instead.
- The default export must return `Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response` (`ImageResponse` satisfies this).
- Dynamic icons are specialized cached Route Handlers, statically optimized by default unless they use Request-time APIs or uncached data; use `generateImageMetadata` to emit multiple icons from one file.
- Uses the same [Route Segment Config](../route-segment-config.md) options as pages/layouts.
- `v16.0.0`: `params` became a promise. Introduced in `v13.3.0`.

## Related

- [opengraph-image and twitter-image](./opengraph-image.md)
- [generateImageMetadata](../../functions/generate-image-metadata.md)
- [Route Segment Config](../route-segment-config.md)
