# ImageResponse

`ImageResponse` generates dynamic images using JSX and CSS, useful for Open Graph images, Twitter cards, etc.

## Signature / Usage

```jsx
import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 60, display: 'flex' }}>Welcome to My Site</div>
    ),
    { width: 1200, height: 630 }
  )
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | `ReactElement` | — | JSX element to render into the image. |
| `width` | `number` | `1200` | Image width. |
| `height` | `number` | `630` | Image height. |
| `emoji` | `'twemoji' \| 'blobmoji' \| 'noto' \| 'openmoji'` | `'twemoji'` | Emoji rendering set. |
| `fonts` | `{ name, data: ArrayBuffer, weight, style }[]` | — | Custom fonts (`ttf`/`otf` preferred over `woff`). |
| `debug` | `boolean` | `false` | Enables debug mode. |
| `status` | `number` | `200` | HTTP response status. |
| `statusText` | `string` | — | HTTP response status text. |
| `headers` | `Record<string, string>` | — | Additional HTTP response headers. |

## Notes

- Built on `@vercel/og`, Satori, and Resvg to convert HTML/CSS to PNG.
- Only flexbox and a subset of CSS properties are supported (e.g. no `display: grid`).
- Maximum bundle size 500KB, including JSX, CSS, fonts, and images.
- Only `ttf`, `otf`, `woff` font formats are supported.
- Usable in Route Handlers or file-based Metadata (`opengraph-image.tsx`, etc.) for build-time or request-time image generation.
- Moved from `next/server` to `next/og` in `v14.0.0`; importable from `next/server` since `v13.3.0`; introduced in `v13.0.0` via `@vercel/og`.

## Related

- [generateImageMetadata](./generateImageMetadata.md)
- [Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
