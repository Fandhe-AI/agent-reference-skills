# SEO

Pitfalls and best practices for SEO with query strings.

## Signature / Usage

If the query string holds local-only state, add a canonical URL without it so crawlers ignore the query string. In the Next.js app router, use the metadata object:

```ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/url/path/without/querystring'
  }
}
```

If the query string defines the content displayed (e.g. YouTube watch URLs like `https://www.youtube.com/watch?v=dQw4w9WgXcQ`), the canonical URL should contain the relevant query strings. Parsers can still be used to read it and to serialize the canonical URL:

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

- Canonical URLs tell SEO crawlers which URL to index; omit the query string for local-only state, include it when it determines page content.
- Source: https://nuqs.dev/docs/seo (nuqs v2.10.2).

## Related

- [Server-side Usage](../server/server-side.md)
- [createSerializer](../utilities/createSerializer.md)
- [Custom parsers](../parsers/custom.md)
