# @react-router/serve

Production-ready but basic Node.js server built with Express, for apps that don't want to own their server. React Router App Server.

By design, it provides no customization options. If you need to customize the underlying Express server, migrate to the [`@react-router/express` adapter](./adapter.md).

Default Express middlewares used: `compression`, `express.static` (via `serve-static`), `morgan`.

## Signature / Usage

```sh
npm install @react-router/serve

react-router-serve <server-build-path>
# e.g.
react-router-serve build/index.js
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `HOST` (env var) | `string` | Hostname passed to the internal `app.listen()` |
| `PORT` (env var) | `number` | Server port |
| `<server-build-path>` (arg) | `string` | Must point to `serverBuildPath` from `react-router.config.ts` |

## Notes

- `server-build-path` must match `serverBuildPath` in [`react-router.config.ts`](../conventions/react-router-config-ts.md); since only `build/` and `public/build/` are deployed to production, `react-router.config.ts` may not be available there
- In development (`NODE_ENV=development`), the `require` cache is purged on every request to run the latest code: module-scope values (e.g. an in-memory `Map` cache) are reset per request, but module side effects (e.g. `setInterval`) persist and are not cleaned up — set up a singleton or migrate to `@react-router/express` + `nodemon`/`pm2-dev` to avoid this
- In production, the server boots once; no cache purging occurs
- v8: unchanged from v7 — same package, same CLI, same env vars

## Related

- [Server Adapters](./adapter.md)
- [@react-router/dev (CLI)](./dev.md)
- [react-router.config.ts](../conventions/react-router-config-ts.md)
