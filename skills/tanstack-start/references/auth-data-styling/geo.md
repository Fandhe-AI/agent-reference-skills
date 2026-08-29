---
source: https://tanstack.com/start/latest/docs/framework/react/guide/geo
---

# Generative Engine Optimization (GEO)

Structuring content and data so AI systems (ChatGPT, Claude, Perplexity, etc.) can accurately understand, cite, and recommend it — the AI-response counterpart to traditional SEO.

## SEO vs GEO

| Aspect | SEO | GEO |
|--------|-----|-----|
| Goal | Rank in search results | Be cited/recommended by AI |
| Audience | Search engine crawlers | LLM training & retrieval systems |
| Key signals | Links, keywords, page speed | Structured data, clarity, authority |
| Content format | Optimized for snippets | Optimized for extraction & synthesis |

## Signature / Usage

```tsx
// src/routes/__root.tsx
export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'My App',
          url: 'https://myapp.com',
          publisher: {
            '@type': 'Organization',
            name: 'My Company',
            url: 'https://myapp.com',
          },
        }),
      },
    ],
  }),
  component: RootComponent,
})
```

## llms.txt

```ts
// src/routes/llms[.]txt.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () =>
        new Response('# My App\n\n> Description...\n', {
          headers: { 'Content-Type': 'text/plain' },
        }),
    },
  },
})
```

## Notes

- Schema.org types used for GEO include Article, Product, Organization/WebSite, and FAQPage — the same JSON-LD mechanism used for SEO structured data.
- GEO monitoring is informal: test by asking AI assistants about the product/content directly, and validate structured data with Google's Rich Results Test or the Schema.org Validator.

## Related

- [SEO](./seo.md)
