---
source: https://developers.cloudflare.com/workers/cache/debugging/
---

# Debugging Workers Cache

Diagnose unexpected Workers Cache behavior starting from the `Cf-Cache-Status` response header.

## Signature / Usage

Send two requests to the same URL and compare headers:

```sh
curl -I https://my-worker.example.workers.dev/api/users/42
curl -I https://my-worker.example.workers.dev/api/users/42
```

## Notes

- Worker runs on every request: no `Cf-Cache-Status` means check Wrangler is 4.69.0+ and `cache.enabled = true` for that Worker. `MISS` / `DYNAMIC` / `BYPASS` every time means check `Cache-Control` (`private` / `no-store` give `BYPASS`; use `public, max-age=N`), request method (only `GET` / `HEAD`), `Set-Cookie` on responses, `Authorization` on requests (unless `public`, `must-revalidate`, or `s-maxage`), and status code (non-default-cacheable such as 401 / 403 / 500 are not stored; 520-526 and Worker-generated 206 never stored).
- `no-cache` is stored but always revalidated: `REVALIDATED` (304) or `EXPIRED` (fresh 200); with `stale-while-revalidate=N` it shows `UPDATING`. Use `max-age` for long-lived hits.
- No `Cache-Control` at all still caches by heuristic (200 for 2 hours, 404 for 3 minutes).
- `MISS` repeatedly after the first request: the key is partitioned. Compare path/query (trailing slash), `ctx.props` (for example different user IDs), and target named entrypoints.
- Hit rate drops after deploy: expected, the Worker version is part of the key. Enable `cache.cross_version_cache` to keep the cache across deploys.
- Old content after deploy: `cross_version_cache` is on. Purge everything after deploy or purge a version tag.
- Content never updates: TTL not yet elapsed, or responses lack `Cache-Tag` so tag purge is impossible; add tags and wait for new entries.
- Callers receive each other's responses: authorization input is not in the key. Move it into `ctx.props`; also ensure per-caller query strings differ.
- `UPDATING` constantly: `max-age` shorter than request interval, or `max-age=0, stale-while-revalidate=<large>`. `UPDATING` never appears when no stale entry exists, no `stale-while-revalidate`, `s-maxage` / `must-revalidate` / `proxy-revalidate` present, or the SWR window elapsed.
- `STALE` unexpectedly: the Worker is erroring during refresh (`stale-if-error` behavior, default indefinite without `s-maxage` / `must-revalidate` / `proxy-revalidate`). Set `stale-if-error=0` to surface errors, check observability, and purge entries written by a broken version.
- Too-large responses are not stored (`MISS` every time). At launch, all Workers Cache responses are subject to the Free plan size limit.
- Debug surfaces at launch: `Cf-Cache-Status` and per-invocation cache-hit data in Workers observability. Zone dashboards do not apply to this cache.

## Related

- [workers-cache.md](./workers-cache.md)
- [workers-cache-configuration.md](./workers-cache-configuration.md)
- [workers-cache-keys.md](./workers-cache-keys.md)
- [workers-cache-limitations.md](./workers-cache-limitations.md)
