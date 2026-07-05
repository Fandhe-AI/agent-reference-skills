# Metadata and OG images

Add metadata to pages for SEO and web shareability, and generate dynamic OG images.

## Signature / Usage

```tsx
// app/blog/layout.tsx — static metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}

export default function Layout() {}
```

```tsx
// app/blog/[slug]/page.tsx — dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) => res.json())
  return { title: post.title, description: post.description }
}
```

```tsx
// app/blog/[slug]/opengraph-image.tsx — generated OG image
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return new ImageResponse(<div style={{ fontSize: 128 }}>{post.title}</div>)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `metadata` | `Metadata` export | Static metadata object exported from `layout.js`/`page.js` (Server Components only) |
| `generateMetadata` | async function export | Fetches data-dependent metadata; supports `cache`-memoized shared fetches with the page |
| `ImageResponse` | `next/og` | Generates images from JSX/CSS (flexbox subset) for OG/Twitter images |
| `opengraph-image` / `twitter-image` | file convention | Static (`.jpg`/`.png`/`.gif`) or generated (`.tsx`) social share images |
| `favicon` / `icon` / `apple-icon` | file convention | Static or generated app icons |
| `htmlLimitedBots` | `next.config.js` | Disables/customizes streaming metadata for specific bot user agents |

## Notes

- `metadata`/`generateMetadata` exports are only supported in Server Components
- Metadata streams separately for dynamically rendered pages, injected into `<head>` once resolved, except for bots expecting metadata upfront (e.g. Twitterbot, Slackbot, Bingbot)
- More specific `opengraph-image` files (deeper in the folder tree) take precedence over ones above them
- `ImageResponse` only supports a subset of CSS (flexbox-based); `display: grid` is not supported

## Related

- [images](./images.md)
- [fetching-data](./fetching-data.md)
