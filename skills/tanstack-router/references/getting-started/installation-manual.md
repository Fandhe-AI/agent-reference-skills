---
source: https://tanstack.com/router/latest/docs/framework/react/installation/manual
---

# Manual Setup

Two approaches to configuring TanStack Router without the CLI scaffolder: file-based route generation, or code-based route configuration.

## Signature / Usage

```tsx
// File-based approach
// src/routes/__root.tsx, src/routes/index.tsx, src/routes/about.tsx, src/main.tsx
// A bundler plugin (Vite/Rspack/Webpack/Esbuild) auto-generates src/routeTree.gen.ts

// Code-based approach
import { createRoute, createRootRoute } from '@tanstack/react-router'
```

## Notes

- File-based route generation: install `@tanstack/react-router` (or `@tanstack/solid-router`) plus devtools and the router bundler plugin as a dev dependency; the plugin auto-generates `src/routeTree.gen.ts`
- Vite ordering matters: `@tanstack/router-plugin` must be passed **before** `@vitejs/plugin-react` in the `plugins` array
- Code-based approach defines routes programmatically via `createRoute()` / `createRootRoute()`; recommended to split routes across multiple files as the app grows

## Related

- [Vite Installation](./installation-with-vite.md)
- [Router CLI Installation](./installation-with-router-cli.md)
