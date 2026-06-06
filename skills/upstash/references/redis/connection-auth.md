# Connection & Authentication

How to obtain credentials and connect to an Upstash Redis database from various clients and environments.

## Signature / Usage

```ts
// TypeScript — from environment variables
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

// TypeScript — explicit credentials
const redis = new Redis({
  url: "https://<db>.upstash.io",
  token: "<token>",
})
```

```bash
# redis-cli (TLS required)
redis-cli --tls -a PASSWORD -h ENDPOINT -p PORT
```

```python
# Python — ioredis-compatible URL
from upstash_redis import Redis
redis = Redis.from_env()
```

## Options / Props

| Name | Description |
|------|-------------|
| `UPSTASH_REDIS_REST_URL` | REST endpoint URL; found in Upstash Console → Database → Details tab |
| `UPSTASH_REDIS_REST_TOKEN` | Full-access auth token |
| Read-Only Token | Restricted token; only allows read commands; available in Console |

## Notes

- **TLS is always enabled** — all connections use TLS/SSL; it cannot be disabled
- Two token types are available per database: **standard** (full privileges) and **read-only**
- Credentials can also be passed as a query parameter: `?_token=TOKEN`
- For ioredis / redis-py / Jedis / Go: use `rediss://:<PASSWORD>@<ENDPOINT>:<PORT>` format with `ssl=True`
- IP allowlisting is available but has limitations in serverless environments where IPs are dynamic
- Store credentials via environment variables or a secret management system — never hardcode them
- ACL users can restrict access to specific commands and key patterns; available on paid plans

## Related

- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Python SDK Overview](./py-sdk-overview.md)
- [REST API](./rest-api.md)
- [Security](./security.md)
