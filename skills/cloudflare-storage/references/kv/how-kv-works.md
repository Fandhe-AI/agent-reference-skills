---
source: https://developers.cloudflare.com/kv/concepts/how-kv-works/
---

# How KV works

KV stores data in a small number of centralized data centers, then caches that data in Cloudflare's data centers after access. It is optimized for high-read, low-latency workloads and is eventually consistent.

## Signature / Usage

Raise `cacheTtl` above its 60 second default to improve read performance:

```js
const value = await env.NAMESPACE.get("first-key", { cacheTtl: 300 });
```

## Notes

- Writes go to central data stores; data is not automatically sent to every location's cache.
- Initial reads from a location have no cached value: data is read from the nearest regional tier, then a central tier, and finally the central stores for a truly cold global read. Subsequent requests are faster, especially if concentrated in one region. KV uses hybrid push/pull-based replication and refreshes cached values in the background before cache expiry.
- Hot read: data cached on Cloudflare's edge network (local or regional cache). Cold read: data fetched from the central stores.
- Changes are usually immediately visible at the location where they are made, but this is not guaranteed and should not be relied on. In other locations changes may take up to 60 seconds or more. Negative lookups (key does not exist) are also cached, so creating a key has the same visibility delay as changing one. Visibility is slower in locations that recently read a previous version of the key.
- KV is not ideal for atomic operations or values that must be read and written in a single transaction; consider Durable Objects for stronger consistency. Write-after-write consistency can be achieved by sending all writes for a key through a corresponding Durable Object instance and reading from KV in other Workers.
- Well suited to read-heavy, highly cacheable workloads: serving static assets, application configuration, user preferences, allow-lists/deny-lists, caching.
- Write-heavy Redis-type workloads (updating the same key tens or hundreds of times per second) are not a good fit. Spread writes across several discrete keys, or use Durable Objects, which provide a key-value API with higher writes-per-key rate limits.

## Related

- [api-read.md](./api-read.md)
- [api-write.md](./api-write.md)
- [data-security.md](./data-security.md)
- [faq.md](./faq.md)
