---
source: https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions
---

# File Naming Conventions

The full set of filename tokens recognized by file-based routing.

## Signature / Usage

```
__root.tsx                  # root route, at the routesDirectory root
posts.$postId.tsx           # dynamic segment -> /posts/$postId
_app.tsx + _app.a.tsx       # pathless layout -> /a
script[.]js.tsx             # escaped char -> /script.js
blog/post/route.tsx         # directory route file -> /blog/post
```

## Options / Props

| Convention | Purpose | Behavior |
|-----------|---------|----------|
| `__root.tsx` | Root route file | Must be named `__root.tsx` and placed at the root of the configured `routesDirectory` |
| `.` separator | Nested routes | Denotes a nested route; e.g. `blog.post` generates as a child of `blog` |
| `$` token | Dynamic parameter | Extracts the value from the URL pathname as a route `param` |
| `_` prefix | Pathless layout | Route is not used when matching its child routes against the URL pathname |
| `_` suffix | Exclude from nesting | Excludes the route from being nested under any parent routes |
| `-` prefix | Exclude from tree | Files/folders with this prefix are excluded from the route tree |
| `(folder)` | Route group | Folder is treated as an organizational route group, not included in the URL path |
| `[x]` escaping | Character escaping | Brackets escape special routing characters (e.g. `script[.]js.tsx` → `/script.js`) |
| `index` token | Parent matching | A segment ending in `index` matches the parent route when the URL matches the parent exactly |
| `route.tsx` | Directory route file | Defines the route for a directory itself (e.g. `blog/post/route.tsx` → `/blog/post`) |

## Notes

- Dynamic parameter example: `posts.$postId.tsx` → `/posts/$postId`.
- Pathless example: `_app.tsx` (no path) wrapping `_app.a.tsx` yields `/a`.

## Related

- [Routing Concepts](./routing-concepts.md)
- [File-Based Routing](./file-based-routing.md)
