# Developing or Testing with Serverless Redis HTTP (SRH)

Run a local Redis behind an Upstash-compatible HTTP proxy so `@upstash/redis` works in CI, Kubernetes, or offline development. SRH is a community project (hiett/serverless-redis-http), kept up to date with Upstash features.

## Signature / Usage

Adapted (not in the official docs): the `docker run` port mapping is bound to `127.0.0.1`.

```bash
docker run \
    -it -d -p 127.0.0.1:8080:80 --name srh \
    -e SRH_MODE=env \
    -e SRH_TOKEN=your_token_here \
    -e SRH_CONNECTION_STRING="redis://your_server_here:6379" \
    hiett/serverless-redis-http:latest
```

Adapted (not in the official docs): the Redis and SRH ports (`docker run -p` and the Compose `ports`) are published on `127.0.0.1` only, so neither the unauthenticated Redis nor the example-token proxy is exposed on every host interface.

```yml
version: "3"
services:
  redis:
    image: redis
    ports:
      - "127.0.0.1:6379:6379"
  serverless-redis-http:
    ports:
      - "127.0.0.1:8079:80"
    image: hiett/serverless-redis-http:latest
    environment:
      SRH_MODE: env
      SRH_TOKEN: example_token
      SRH_CONNECTION_STRING: "redis://redis:6379" # Using `redis` hostname since they're in the same Docker network.
```

## Options / Props

| Env var | Description |
|---------|-------------|
| `SRH_MODE` | `env` when connecting to a single Redis server |
| `SRH_TOKEN` | Token clients send as `UPSTASH_REDIS_REST_TOKEN` |
| `SRH_CONNECTION_STRING` | Redis connection URL, e.g. `redis://redis:6379` |

## Notes

- Adapted from the official docs: the official Compose file publishes Redis as `"6379:6379"` (all interfaces, no password); the Redis and SRH ports are bound to `127.0.0.1` here (the official `docker run` also uses `-p 8080:80`)
- SRH is a Redis proxy and connection pooler that speaks HTTP instead of the Redis binary protocol, aiming to be fully compatible with Upstash
- Use cases: CI pipelines with many parallel runs, Kubernetes or networks where Redis is not internet-exposed, local development or offline work
- Point the SDK at it with `UPSTASH_REDIS_REST_URL=http://srh:80` (CI service) and `UPSTASH_REDIS_REST_TOKEN` equal to `SRH_TOKEN`
- In GitHub Actions run SRH as a job service next to Redis; SRH opens no Redis connection until the first command, so there is no readiness race. The docs' example uses `redis/redis-stack-server:6.2.6-v6` ("6.2 is the Upstash compatible Redis version") and runs the `upstash/upstash-redis` test suite with `deno test -A ./pkg`
- The example `SRH_TOKEN` values are placeholders; use your own secret in real setups
- Source: https://upstash.com/docs/redis/sdks/ts/developing (fetched 2026-11-14; no version pin on the site)

## Related

- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Connection & Authentication](./connection-auth.md)
