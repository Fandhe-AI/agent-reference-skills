---
source: https://tanstack.com/router/latest/docs/framework/react/guide/automatic-code-splitting
---

# Automatic Code Splitting

Configurable, static-analysis-driven code splitting performed by the TanStack Router bundler plugin: it rewrites route files into a lightweight "reference file" plus lazily-resolved "virtual files" per split property.

## Signature / Usage

```ts
// vite.config.ts
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      codeSplittingOptions: {
        defaultBehavior: [
          ['component', 'pendingComponent', 'errorComponent', 'notFoundComponent'],
        ],
        splitBehavior: ({ routeId }) => {
          if (routeId.startsWith('/posts')) return [['loader', 'component']]
        },
      },
    }),
  ],
})
```

Per-route override:

```tsx
// src/routes/posts.route.tsx
export const Route = createFileRoute('/posts')({
  codeSplitGroupings: [['loader', 'component']],
  loader: () => loadPostsData(),
  component: PostsComponent,
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `autoCodeSplitting` | Enable the feature in the bundler plugin |
| `codeSplittingOptions.defaultBehavior` | Array of "split groupings" (arrays of property names bundled together); default `[['component'], ['errorComponent'], ['notFoundComponent']]` |
| `codeSplittingOptions.splitBehavior` | `({ routeId }) => Grouping[] \| undefined` — programmatic per-route override |
| `routeOptions.codeSplitGroupings` | Highest-precedence per-route override in the route file itself |

Splittable properties: `component`, `errorComponent`, `pendingComponent`, `notFoundComponent`, `loader`.

## Notes

- Precedence: `codeSplitGroupings` (route file) > `splitBehavior` (bundler config) > `defaultBehavior` (bundler config).
- Do not export route properties (e.g. `notFoundComponent`) from a route file — exporting forces them into the main bundle, defeating the split.
- Splitting the `loader` into its own chunk is a **performance trade-off**: it adds a network round trip before the loader can run, since the loader must be fetched and executed before the component renders. Recommended only for specific optimization needs.
- Only available for file-based routing with a supported bundler plugin — not with the standalone CLI (`@tanstack/router-cli`).

## Related

- [Code Splitting](./code-splitting.md)
