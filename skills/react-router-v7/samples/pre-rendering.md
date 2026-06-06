# Pre-Rendering

Generate static HTML at build time for performance-critical pages using the `prerender` config option.

```typescript
// react-router.config.ts
import type { Config } from "@react-router/dev/config";

// Pre-render a fixed set of paths
export default {
  prerender: ["/", "/about", "/contact"],
} satisfies Config;
```

```typescript
// Pre-render dynamic routes from a CMS
export default {
  async prerender({ getStaticPaths }) {
    const slugs = await fetchBlogSlugsFromCMS();
    return [
      ...getStaticPaths(),                          // statically-known routes
      ...slugs.map((slug) => `/blog/${slug}`),      // dynamic routes
    ];
  },
} satisfies Config;
```

```tsx
// app/routes/blog.$slug.tsx — loader runs at build time
import type { Route } from "./+types/blog.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await fetchPost(params.slug);
  if (!post) throw data("Not Found", { status: 404 });
  return post;
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  return <article><h1>{loaderData.title}</h1></article>;
}
```

## Notes

- Build output: `[url].html` for document requests, `[url].data` for client-side navigations
- Set `ssr: false` for a fully static site with no runtime server
- With `ssr: false`, `headers` and `action` exports are not allowed
- Pre-rendered files are only generated during `react-router build`, not in development
