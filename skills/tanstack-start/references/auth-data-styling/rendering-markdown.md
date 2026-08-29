---
source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown
---

# Rendering Markdown

Two methods for importing and rendering markdown in TanStack Start: static markdown via `content-collections` (build-time, e.g. blog posts) and dynamic markdown fetched at runtime (e.g. from GitHub). Both share a `unified`-based rendering pipeline.

## Signature / Usage

```tsx
// src/utils/markdown.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export async function renderMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)
    .process(content)
  return String(result)
}
```

## Method 1: Static Markdown with content-collections

```tsx
// content-collections.ts
import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
  name: 'posts',
  directory: './src/blog',
  include: '*.md',
  schema: (z) => ({ title: z.string(), published: z.string().date() }),
})

export default defineConfig({ collections: [posts] })
```

Register the Vite plugin in `app.config.ts` (`@content-collections/vite`) and consume via `import { allPosts } from 'content-collections'`.

## Method 2: Dynamic Markdown from Remote Sources

```tsx
// src/utils/docs.server.ts
import { createServerFn } from '@tanstack/react-start'
import matter from 'gray-matter'

export const fetchDocs = createServerFn({ method: 'GET' })
  .validator((params: { repo: string; branch: string; filePath: string }) => params)
  .handler(async ({ data: { repo, branch, filePath } }) => {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
    const { data: frontmatter, content } = matter(await response.text())
    return { frontmatter, content, filePath }
  })
```

## Summary

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| content-collections | Blog posts, static docs bundled with app | Type-safe, build-time processing, fast runtime | Requires rebuild for content updates |
| Dynamic fetching | External docs, frequently updated content | Always fresh, no rebuild needed | Runtime overhead, requires error handling |

## Notes

- Syntax highlighting for code blocks can be added with Shiki (`codeToHtml`) inside the rendering pipeline.

## Related

- [SEO](./seo.md)
