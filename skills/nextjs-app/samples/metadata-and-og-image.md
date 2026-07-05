# generateMetadata and Dynamic OG Image

Generate per-route `<head>` metadata from fetched data, and a matching dynamic Open Graph image with `ImageResponse`.

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) =>
    res.json()
  )

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>{slug}</div>
}
```

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) =>
    res.json()
  )

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
        {post.title}
      </div>
    )
  )
}
```

## Notes

- `metadata` and `generateMetadata` exports are only supported in Server Components (page/layout).
- If the same data is needed by both `generateMetadata` and the page body, wrap the fetcher with React's `cache()` so it only executes once per request.
- `opengraph-image.tsx` (or `.jpg`/`.png`) placed next to a `page.tsx` overrides any OG image defined higher in the folder tree.
- `ImageResponse` only supports flexbox and a subset of CSS (no `display: grid`).
