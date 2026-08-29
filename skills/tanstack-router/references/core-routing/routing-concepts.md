---
source: https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts
---

# Routing Concepts

Core route types and file-organization primitives used by both file-based and code-based routing.

## Signature / Usage

```tsx
// Root route
import { createRootRoute } from '@tanstack/react-router'
export const Route = createRootRoute()

// Basic route
export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

// Index route (matches `/posts` exactly)
export const Route = createFileRoute('/posts/')({
  component: PostsIndexComponent,
})

// Dynamic segment
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

// Splat / catch-all (captures under `params._splat`)
export const Route = createFileRoute('/files/$')({ ... })

// Optional path parameter
export const Route = createFileRoute('/posts/{-$category}')({
  component: PostsComponent,
})
```

## Options / Props

| Concept | Marker | Description |
|---------|--------|-------------|
| Root route | (single, top of tree) | Always matched/rendered; no `path`; wraps all child routes |
| Basic route | exact path string | Matches an exact path segment (e.g. `/about`) |
| Index route | trailing `/` in `createFileRoute` | Matches parent path exactly when no child route matches |
| Dynamic segment | `$paramName` | Captures a URL segment into `params.paramName` |
| Optional parameter | `{-$paramName}` | Matches with or without the segment present; ranks lower than exact matches |
| Splat / catch-all | `$` alone | Captures the rest of the URL under `params._splat`. `*` still works in v1 for backward compat, removed in v2 |
| Layout route | plain filename wrapping children (e.g. `app.tsx`) | Wraps children with a component/loader/context; matched by URL |
| Pathless layout route | `_` prefix (e.g. `_pathlessLayout.tsx`) | Wraps children without matching any URL segment; cannot use dynamic segments |
| Non-nested route | `_` suffix on parent segment (e.g. `posts_.$postId.edit.tsx`) | Un-nests from the parent, rendering as a top-level route |
| Excluded file/folder | `-` prefix | Excluded from route generation but importable locally; absent from `routeTree.gen.ts` |
| Pathless group directory | `(groupName)` | Organizational folder only; no effect on URL or component tree |

## Notes

- Dynamic segments compose at each path level (e.g. `/posts/$postId/$revisionId`).
- Pathless layout routes cannot support dynamic route segments in their own path.

## Related

- [Route Trees](./route-trees.md)
- [Route Matching](./route-matching.md)
- [File Naming Conventions](./file-naming-conventions.md)
