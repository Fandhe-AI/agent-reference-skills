# @upstash/search TypeScript SDK

Serverless client for Upstash Search. Provides typed `search`, `upsert`, `fetch`, `delete`, `range`, `info`, and `reset` operations against a Search index.

## Signature / Usage

```ts
import { Search } from "@upstash/search"

// From environment variables (UPSTASH_SEARCH_REST_URL, UPSTASH_SEARCH_REST_TOKEN)
const client = Search.fromEnv()

// Explicit credentials
const client = new Search({
  url: "<SEARCH_INDEX_REST_URL>",
  token: "<SEARCH_INDEX_REST_TOKEN>",
})

// Type-safe content/metadata
type Content = { title: string; genre: string }
type Metadata = { year: number }
const index = client.index<Content, Metadata>("movies")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | REST URL from the Upstash console. Falls back to `UPSTASH_SEARCH_REST_URL` env var |
| `token` | `string` | REST token from the Upstash console. Falls back to `UPSTASH_SEARCH_REST_TOKEN` env var |
| `enableTelemetry` | `boolean` | Anonymous SDK usage telemetry (version, platform, runtime). Default: `true` |

## Notes

- Install: `npm install @upstash/search` (also available via yarn, pnpm, bun)
- Telemetry can also be disabled via the `UPSTASH_DISABLE_TELEMETRY=1` env var
- This is the Upstash **Search** SDK (`@upstash/search`), distinct from `vector/ts-sdk-overview.md` (`@upstash/vector`) in this skill

## Related

- [python-sdk.md](./python-sdk.md)
- [getting-started.md](./getting-started.md)
- [upsert.md](./upsert.md)
- [search.md](./search.md)
