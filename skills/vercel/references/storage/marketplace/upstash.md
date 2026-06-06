# Upstash

Serverless database platform on the Vercel Marketplace. Offers Redis-compatible KV, vector storage, messaging, and AI search.

## Products

| Product | Description | Use Cases |
|---------|-------------|-----------|
| **Upstash Redis** | Redis-compatible serverless KV store | Caching, sessions, rate limiting, leaderboards |
| **Upstash Vector** | Serverless vector database | AI embeddings, semantic search, recommendations |
| **Upstash QStash / Workflow** | Serverless messaging and task scheduling | Background jobs, delayed tasks, webhooks |
| **Upstash Search** | AI-powered search at scale | Full-text and semantic search |

## Provision

```bash
vercel install upstash
```

Or via Dashboard: Marketplace > Upstash > select product > Install.

## Environment Variables (Redis, auto-injected)

| Variable | Description |
|----------|-------------|
| `KV_URL` | Redis connection URL (REST) |
| `KV_REST_API_URL` | REST API base URL |
| `KV_REST_API_TOKEN` | REST API token |
| `KV_REST_API_READ_ONLY_TOKEN` | Read-only token |

## Connecting (Redis)

```ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

await redis.set('key', 'value');
const value = await redis.get('key');
```

Or use the `kv` shorthand (when `KV_URL` is set):

```ts
import { kv } from '@vercel/kv';

await kv.set('key', 'value');
const value = await kv.get('key');
```

## Connecting (Vector)

```ts
import { Index } from '@upstash/vector';

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

await index.upsert({ id: '1', vector: [0.1, 0.2, ...], metadata: { text: 'hello' } });
const results = await index.query({ vector: [0.1, 0.2, ...], topK: 5 });
```

## Plans

- Free tier available for Redis and Vector
- Pay-as-you-go pricing
- Billing managed through Vercel

## Notes

- Upstash Redis uses HTTP/REST transport — works in Edge Functions without TCP connection limits
- Use `@vercel/kv` for a higher-level API on top of Upstash Redis
- 1000+ installations on Vercel Marketplace

## Related

- [Marketplace Overview](./overview.md)
- [Neon Postgres](./neon.md)
- [Supabase](./supabase.md)
