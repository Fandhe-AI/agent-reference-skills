# conventions

| Name | Description | Path |
|------|-------------|------|
| .client Modules | Files suffixed with `.client` are excluded from the server bundle. All… | [client-modules.md](./client-modules.md) |
| entry.client.tsx | Optional browser entry point in Framework Mode. Hydrates server-rendered… | [entry-client-tsx.md](./entry-client-tsx.md) |
| entry.server.tsx | Optional server entry point in Framework Mode. Controls how the application… | [entry-server-tsx.md](./entry-server-tsx.md) |
| react-router.config.ts | Optional project configuration file for React Router Framework Mode.… | [react-router-config-ts.md](./react-router-config-ts.md) |
| root.tsx | The only required route in Framework Mode. Renders the root `<html>`… | [root-tsx.md](./root-tsx.md) |
| routes.ts | Required configuration file that maps URL patterns to route module files.… | [routes-ts.md](./routes-ts.md) |
| .server Modules | Files suffixed with `.server` are excluded from the client bundle entirely.… | [server-modules.md](./server-modules.md) |
