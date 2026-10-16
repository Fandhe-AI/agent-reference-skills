# Remote Cache API

The HTTP interface that any remote cache server must implement to be compatible with Turborepo. Spec: OpenAPI 3.0.3, API version 1.0.0 (MIT).

## Signature / Usage

All endpoints require Bearer token authentication:

```bash
Authorization: Bearer <token>
```

The remote cache stores build artifacts identified by content-addressable hashes. When Turborepo encounters a task that matches a previously cached result, it can download the artifact instead of re-executing the task.

## Options / Props

Endpoints:

| Method | Path | Description | Page |
| --- | --- | --- | --- |
| `GET` | `/artifacts/status` | Check remote caching status | [artifacts.md](./artifacts.md) |
| `HEAD` | `/artifacts/{hash}` | Check if artifact exists | [artifacts.md](./artifacts.md) |
| `GET` | `/artifacts/{hash}` | Download a cache artifact | [artifacts.md](./artifacts.md) |
| `PUT` | `/artifacts/{hash}` | Upload a cache artifact | [artifacts.md](./artifacts.md) |
| `POST` | `/artifacts` | Query information about multiple artifacts | [artifacts.md](./artifacts.md) |
| `POST` | `/artifacts/events` | Record cache usage events (Analytics) | [events.md](./events.md) |

Servers declared in the spec:

| URL | Description |
| --- | --- |
| `{protocol}://{host}` | Self-hosted Remote Cache Server (`protocol`: `http` / `https`, default `https`; `host` default `localhost:3000`) |
| `https://api.vercel.com` | Vercel Remote Cache (reference implementation) |

## Notes

- For self-hosted implementations, the token format and validation logic is up to the implementer (static tokens, JWT, OAuth2 are named as common approaches).
- Optional endpoints per the spec: `POST /artifacts` and `POST /artifacts/events`.
- The full OpenAPI specification is served at `/api/remote-cache-spec` on the Turborepo docs site.
- Source: https://turborepo.dev/docs/openapi (vercel/turborepo tag v2.11.8, `apps/docs/content/openapi/index.mdx`).

## Related

- [artifacts](./artifacts.md)
- [events](./events.md)
- [Remote Caching](../core-concepts/remote-caching.md)
