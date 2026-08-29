---
source: https://tanstack.com/start/latest/docs/framework/react/overview
---

# Overview

TanStack Start is a full-stack React framework built on TanStack Router, providing SSR, streaming, server functions, and dual client/server builds. Supports Vite and Rsbuild.

## Signature / Usage

```bash
npx @tanstack/cli@latest create
```

## Core Technologies

- **TanStack Router**: type-safe router with nested routing, search params, data loading
- **Vite or Rsbuild**: build tools for fast dev cycles and optimized production builds

## TanStack Start vs. TanStack Router

TanStack Router alone covers ~90% of framework functionality (routing). TanStack Start extends it with:

- Full-document SSR
- Progressive streaming
- Server and API route building
- Type-safe server function RPCs
- Middleware and context support
- Optimized full-stack builds
- Universal deployment compatibility
- End-to-end TypeScript type safety

Use TanStack Router alone only for projects that definitively require no additional features.

## Notes

- Status: Release Candidate — feature-complete with stable APIs, not guaranteed bug-free.
- React Server Components are experimentally available.
- TanStack remains perpetually open source and free, maintained by the bootstrapped, self-funded TanStack LLC.
- Not related to Next.js (`nextjs-app` skill) — a different full-stack framework. See `comparison.md` and `start-vs-nextjs.md` for the distinction. Routing/loader internals are covered in the TanStack Router skill, not here.

## Related

- [Getting Started](./getting-started.md)
- [Comparison](./comparison.md)
- [Start vs Next.js](./start-vs-nextjs.md)
