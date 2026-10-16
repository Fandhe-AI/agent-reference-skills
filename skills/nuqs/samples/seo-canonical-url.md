# SEO Canonical URL

Tell crawlers which URL to index when the page uses query strings: omit them for local-only state, include them when they define the content.

Local-only state (Next.js app router):

```ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/url/path/without/querystring'
  }
}
```

Query string defines the content (YouTube-style `?v=` URL):

```ts
// /app/watch/page.tsx
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";
import {
  createParser,
  parseAsString,
  createLoader,
  createSerializer,
  type SearchParams,
  type UrlKeys
} from 'nuqs/server'

const youTubeVideoIdRegex = /^[^"&?\/\s]{11}$/i
const youTubeSearchParams = {
  videoId: createParser({
    parse(query) {
      if (!youTubeVideoIdRegex.test(query)) {
        return null
      }
      return query
    },
    serialize(videoId) {
      return videoId
    }
  })
}
const youTubeUrlKeys: UrlKeys<typeof youTubeSearchParams> = {
  videoId: 'v'
}
const loadYouTubeSearchParams = createLoader(
  youTubeSearchParams,
  {
    urlKeys: youTubeUrlKeys
  }
)
const serializeYouTubeSearchParams = createSerializer(
  youTubeSearchParams,
  {
    urlKeys: youTubeUrlKeys
  }
)

// --

type Props = {
  searchParams: Promise<SearchParams>
}

export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  const { videoId } = await loadYouTubeSearchParams(searchParams)
  if (!videoId) {
    notFound()
  }
  return {
    alternates: {
      canonical: serializeYouTubeSearchParams('/watch', { videoId })
      // /watch?v=dQw4w9WgXcQ
    }
  }
}
```

## Notes

- Use a static `alternates.canonical` without the query string when the query string only holds local UI state.
- When the query string defines the content, reuse the same parsers to read it (`createLoader`) and to build the canonical URL (`createSerializer`).
- `createLoader`, `createSerializer`, `SearchParams` and `UrlKeys` are imported from `nuqs/server` so they work in server code such as `generateMetadata`.
- Source: https://nuqs.dev/docs/seo (nuqs v2.10.2).
