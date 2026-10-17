# @upstash/vector TypeScript SDK

Serverless vector database client for TypeScript/JavaScript. Provides full type safety for upsert, query, fetch, delete, range, and namespace operations against an Upstash Vector index.

## Signature / Usage

```ts
import { Index } from "@upstash/vector";

// From environment variables (UPSTASH_VECTOR_REST_URL, UPSTASH_VECTOR_REST_TOKEN)
const index = new Index();

// Explicit credentials
const index = new Index({
  url: "<UPSTASH_VECTOR_REST_URL>",
  token: "<UPSTASH_VECTOR_REST_TOKEN>",
});

// With metadata type parameter for full type safety
type Metadata = { genre: string; year: number };
const index = new Index<Metadata>();

// Request timeout: throws if the request takes longer than 1 second
const timed = new Index({
  url: "<UPSTASH_VECTOR_REST_URL>",
  token: "<UPSTASH_VECTOR_REST_TOKEN>",
  signal: () => AbortSignal.timeout(1000),
});
try {
  await timed.query({ /* ... */ });
} catch (error) {
  if (error.name === "TimeoutError") console.error("Request timed out");
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | REST URL from Upstash console. Falls back to `UPSTASH_VECTOR_REST_URL` env var |
| `token` | `string` | REST token from Upstash console. Falls back to `UPSTASH_VECTOR_REST_TOKEN` env var |
| `signal` | `() => AbortSignal` | Advanced. Request timeout, e.g. `() => AbortSignal.timeout(1000)`; the SDK throws an error with `name === "TimeoutError"` when exceeded |

## Notes

- Telemetry (advanced): the SDK sends anonymous telemetry (SDK version, platform such as Cloudflare / AWS / Vercel, runtime version). Opt out by setting the `UPSTASH_DISABLE_TELEMETRY` environment variable to any truthy value, e.g. `UPSTASH_DISABLE_TELEMETRY=1`
- Redis `VECTOR.*` commands (redis/commands-vector) are a separate product from Upstash Vector; this SDK targets the Upstash Vector index only
- Install: `npm install @upstash/vector` or `pnpm add @upstash/vector`
- Metadata type can be set at the index level (`new Index<Metadata>()`) or per-command (`index.upsert<Metadata>(...)`)
- Index-level type applies to all operations: query, upsert, fetch, range
- The index is eventually consistent — newly upserted vectors may not be immediately queryable

## Related

- [upsert.md](./upsert.md)
- [query.md](./query.md)
- [fetch.md](./fetch.md)
- [delete.md](./delete.md)
- [range.md](./range.md)
- [namespace.md](./namespace.md)
