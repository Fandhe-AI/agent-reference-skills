---
source: https://tanstack.com/router/latest/docs/framework/react/routing/route-matching
---

# Route Matching

How TanStack Router sorts and resolves routes against an incoming URL, regardless of definition order.

## Signature / Usage

```
/routes
├── index.tsx          # /
├── blog/
│   ├── index.tsx      # /blog
│   ├── new.tsx        # /blog/new
│   ├── $postId.tsx    # /blog/$postId
```

For a route tree with `/blog`, `/blog/new`, `/blog/$postId`, and `/`:

- URL `/blog` matches the index route under blog
- URL `/blog/my-post` matches the dynamic `$postId` parameter
- URL `/` matches the root index route
- URL `/not-a-route` matches the wildcard splat route

## Options / Props

| Priority | Route type | Notes |
|----------|-----------|-------|
| 1 (highest) | Index Route | Matches parent exactly |
| 2 | Static Routes | Most specific to least specific |
| 3 | Dynamic Routes | Longest to shortest parameter chains |
| 4 (lowest) | Splat / Wildcard Routes | Catches any URL not resolved by more specific routes |

## Notes

- Routes are always sorted into this order internally; sorting is not affected by how routes are declared.
- The router traverses the sorted tree sequentially per segment; when a segment fails to match, it advances to the next candidate at the same level.
- No manual tie-breaking is needed — the fixed sort order eliminates routing conflicts.

## Related

- [Routing Concepts](./routing-concepts.md)
- [Route Trees](./route-trees.md)
