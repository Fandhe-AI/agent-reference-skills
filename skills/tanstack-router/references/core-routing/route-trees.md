---
source: https://tanstack.com/router/latest/docs/framework/react/routing/route-trees
---

# Route Trees

TanStack Router's mechanism for mapping URLs to nested component hierarchies.

## Signature / Usage

```
/routes
├── __root.tsx
├── index.tsx
├── about.tsx
├── posts/
│   ├── index.tsx
│   ├── $postId.tsx
├── posts.$postId.edit.tsx
├── settings/
│   ├── profile.tsx
│   ├── notifications.tsx
├── _pathlessLayout/
│   ├── route-a.tsx
│   ├── route-b.tsx
├── files/
│   ├── $.tsx
```

A URL like `/blog/posts/123` resolves through the tree as `blog → posts → $postId`, rendering the component tree `<Blog> → <Posts> → <Post postId="123" />`.

## Notes

- Two ways to build a route tree: file-based routing (recommended, less code) or code-based routing (identical capabilities, manual construction).
- File-based routing supports Flat Routes, Directory Routes, Mixed Flat and Directory Routes, and Virtual File Routes as organization strategies.

## Related

- [Routing Concepts](./routing-concepts.md)
- [File-Based Routing](./file-based-routing.md)
- [Code-Based Routing](./code-based-routing.md)
- [Virtual File Routes](./virtual-file-routes.md)
