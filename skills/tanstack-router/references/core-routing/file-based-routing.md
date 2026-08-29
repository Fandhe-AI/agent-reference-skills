---
source: https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing
---

# File-Based Routing

Configuring routes through the filesystem instead of code, generated automatically by a bundler plugin or the Router CLI.

## Signature / Usage

```
posts/$postId.tsx        # directory-based: -> /posts/$postId
posts.$postId.edit.tsx   # flat (dot notation): -> /posts/$postId/edit
```

Both directory-based and flat (dot-notation) styles can be mixed within the same project.

## Options / Props

| Approach | Description |
|----------|-------------|
| Directory-Based Routing | Filesystem directories represent route nesting (`posts/$postId.tsx` → `/posts/$postId`) |
| Flat Routing | Dot notation (`.`) in filenames denotes nesting without directory proliferation (`posts.$postId.edit.tsx` → `/posts/$postId/edit`) |
| Mixed Approach | Directory and flat styles combined in one project |

## Notes

- Benefits: routes mirror URL structure, easy to scale, automatic code-splitting, generated type-safety, enforced consistency across a project.
- Requires a supported bundler (Vite, Rspack/Rsbuild, Webpack, or Esbuild) with the TanStack Router Plugin or CLI configured; the plugin generates route configuration during dev/build.
- Detailed plugin configuration options (`routesDirectory`, `generatedRouteTree`, etc.) live in the bundler-specific installation guides, not on this page.

## Related

- [Route Trees](./route-trees.md)
- [Virtual File Routes](./virtual-file-routes.md)
- [Code-Based Routing](./code-based-routing.md)
- [File Naming Conventions](./file-naming-conventions.md)
