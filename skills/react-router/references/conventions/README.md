# Conventions

| Name | Description | Path |
|------|-------------|------|
| .client Modules | Files suffixed with `.client` (e.g., `utils.client.ts`) are excluded from the server bundle. All their exports are `undefined` on the server. | [client-modules.md](./client-modules.md) |
| entry.client.tsx | Optional browser entry point in Framework Mode. Hydrates server-rendered markup on the client. React Router provides a default implementation when this file is absent. Not available in Data Mode or Declarative Mode. | [entry-client-tsx.md](./entry-client-tsx.md) |
| entry.server.tsx | Optional server entry point in Framework Mode. Controls how the application generates HTTP responses on the server including streaming SSR. Required for non-Node runtimes (Cloudflare, Deno, etc.). | [entry-server-tsx.md](./entry-server-tsx.md) |
| react-router.config.ts | Optional project configuration file for React Router Framework Mode. Located at the project root. Export a value satisfying `Config` from `@react-router/dev/config`. Available in Framework mode only. | [react-router-config-ts.md](./react-router-config-ts.md) |
| root.tsx | The only required route in Framework Mode. Renders the root `<html>` document and acts as the parent to all other routes. Location: `app/root.tsx`. Not available in Data Mode or Declarative Mode. | [root-tsx.md](./root-tsx.md) |
| routes.ts | Required configuration file that maps URL patterns to route module files. The default export must satisfy `RouteConfig`. Not available in Data Mode or Declarative Mode. | [routes-ts.md](./routes-ts.md) |
| .server Modules | Files suffixed with `.server` (e.g., `db.server.ts`) are excluded from the client bundle entirely. The build will fail if `.server` code is accidentally imported by client code. | [server-modules.md](./server-modules.md) |
