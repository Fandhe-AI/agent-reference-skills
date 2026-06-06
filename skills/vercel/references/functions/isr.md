# Incremental Static Regeneration (ISR)

A caching strategy combining static content speed with server-side rendering flexibility. Serves cached responses while regenerating content in the background on a schedule or via API trigger (stale-while-revalidate).

## How to Enable by Framework

| Framework | Method |
|-----------|--------|
| Next.js App Router | `export const revalidate = N` (seconds) in route segment |
| Next.js Pages Router | Return `revalidate: N` from `getStaticProps` |
| SvelteKit | `export const config = { isr: { expiration: N } }` |
| Nuxt | `routeRules: { '/path': { isr: N } }` in config |
| Astro | Configure server output with ISR adapter option |
| Gatsby | Deferred Static Generation (DSG) |
| Build Output API | Define Prerender Functions |

## ISR Lifecycle

| Stage | Behavior |
|-------|---------|
| Build time | Vercel analyzes routes; distributes cacheability metadata to all CDN regions |
| Cache hit | CDN serves cached response immediately; function not invoked |
| Cache miss | Request forwarded to function region; checked in durable ISR cache; function invoked if needed |
| Revalidation | Background regeneration; visitors get stale content until new version ready |
| Failure | Stale content preserved; 30-second TTL retry |

## Vercel CDN Benefits

| Feature | Description |
|---------|-------------|
| Durable storage | ISR cache persists for 31 days (or until revalidated) per deployment |
| Cache shielding | CDN miss reads from ISR cache before invoking function |
| Request collapsing | Multiple concurrent requests to same uncached path collapsed into one invocation |
| Global purging | Revalidation propagates to all regions within 300ms |
| Selective pre-rendering | Pre-render popular paths at build time; generate others on demand |
| Instant rollbacks | Previous deployment caches preserved; new deployments use own cache |

## Revalidation Triggers

1. **Time-based**: automatic after set interval (e.g., `revalidate = 60` = revalidate every 60 seconds)
2. **On-demand**: call the revalidation API programmatically

### On-Demand Revalidation Scope

- Applies to the specific domain and deployment only
- Does **not** affect subdomains or other deployments
- Example: revalidating `example.com/page` does not revalidate `sub.example.com/page`

## Pricing Components

| Cost Item | Trigger |
|-----------|---------|
| Function invocations | Background revalidation or on-demand revalidation calls |
| ISR writes | Fresh content persisted to durable storage |
| ISR reads | CDN miss reads from ISR cache |
| Fast Origin Transfer | Data transferred from function region |

## Notes

- ISR cache is scoped per deployment; each new deployment gets its own cache
- ISR cache region follows the project's default function region (`iad1` by default)
- `Cache-Control` headers alone do not enable request collapsing, durable storage, or 300ms global purges
- Data caching inside functions (per-fetch, per-query) uses Runtime Cache separately from ISR

## Related

- [regions.md](./regions.md)
- [overview.md](./overview.md)
