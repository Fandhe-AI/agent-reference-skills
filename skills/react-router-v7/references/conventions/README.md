# React Router v7 — Framework Mode Conventions

File and module conventions used in React Router Framework Mode projects.

| Name | Description | Path |
|------|-------------|------|
| root.tsx | Required root route. Renders the `<html>` document shell, `<Outlet>`, `<Scripts>`, and optional `Layout` / `ErrorBoundary` exports | [./root-tsx.md](./root-tsx.md) |
| routes.ts | Required route config. Maps URL patterns to route modules using `route`, `index`, `layout`, and `prefix` helpers | [./routes-ts.md](./routes-ts.md) |
| react-router.config.ts | Optional project config. Controls SSR, prerendering, basenames, build output, server bundles, and future flags | [./react-router-config-ts.md](./react-router-config-ts.md) |
| entry.client.tsx | Optional browser entry point. Hydrates server-rendered HTML using `HydratedRouter` and `hydrateRoot` | [./entry-client-tsx.md](./entry-client-tsx.md) |
| entry.server.tsx | Optional server entry point. Implements `handleRequest` with `ServerRouter` for streaming SSR responses | [./entry-server-tsx.md](./entry-server-tsx.md) |
| .client modules | Files/directories suffixed `.client` — excluded from the server bundle; all exports are `undefined` on the server | [./client-modules.md](./client-modules.md) |
| .server modules | Files/directories suffixed `.server` — excluded from the client bundle; build fails if accidentally imported by client code | [./server-modules.md](./server-modules.md) |
