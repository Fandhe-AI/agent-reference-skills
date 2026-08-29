---
source: https://tanstack.com/start/latest/docs/framework/react/guide/seo
---

# SEO

Technical SEO building blocks in TanStack Start: SSR, static prerendering, document head management (meta/Open Graph/canonical/JSON-LD), sitemaps, and robots.txt.

## Signature / Usage

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => ({ post: await fetchPost(params.postId) }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'description', content: loaderData.post.excerpt },
      { property: 'og:title', content: loaderData.post.title },
      { property: 'og:image', content: loaderData.post.coverImage },
    ],
    links: [{ rel: 'canonical', href: `https://myapp.com/posts/${params.postId}` }],
  }),
  component: PostPage,
})
```

## Structured Data (JSON-LD)

```tsx
head: () => ({
  scripts: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Title',
      }),
    },
  ],
})
```

## Sitemaps and robots.txt

Static: place `public/sitemap.xml` and `public/robots.txt`. Dynamic: a server route (`src/routes/sitemap[.]xml.ts`, `src/routes/robots[.]txt.ts`) returning a `Response` with `Content-Type: application/xml` / `text/plain`. Built-in generation is available via `sitemap: { enabled: true, host }` combined with `prerender: { enabled: true, crawlLinks: true }`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `head().meta` | array | Title, description, Open Graph, Twitter Card tags |
| `head().links` | array | `rel: 'canonical'`, `?url` stylesheet links |
| `head().scripts` | array | `application/ld+json` structured-data scripts |
| `ssr` | `boolean` | Per-route SSR toggle (disabling impacts SEO) |
| `prerender.crawlLinks` | `boolean` | Discovers linkable pages for prerendering/sitemap |

## Notes

- SSR is enabled by default and is what allows crawlers to receive fully rendered HTML; disabling `ssr` per route trades SEO for other concerns.
- For AI-assistant/LLM-oriented optimization rather than traditional search engines, see the GEO guide.

## Related

- [Generative Engine Optimization (GEO)](./geo.md)
- [Rendering Markdown](./rendering-markdown.md)
