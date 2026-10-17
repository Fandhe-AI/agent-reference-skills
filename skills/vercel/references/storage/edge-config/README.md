# edge-config

| Name | Description | Path |
|------|-------------|------|
| @vercel/edge-config (renamed to @vercel/global-config) | Read-only SDK for Global Config (formerly Edge Config). Install: `npm i @vercel/global-config`. | [edge-config-sdk.md](./edge-config-sdk.md) |
| Global Config (formerly Edge Config) Limits and Pricing | Pricing table (reads and writes, Hobby included quota and on-demand rate) and limits by plan. | [limits.md](./limits.md) |
| Migrating from Edge Config to Global Config | Edge Config is now Global Config, a globally replicated data store for configuration that applications read at runtime (feature flags, redirects, experimentation settings). The store itself is unchanged. | [migration-guide.md](./migration-guide.md) |
| Vercel Edge Config (renamed to Global Config) | Global key-value data store for ultra-low latency reads. Most reads complete in <1ms; P99 reads under 15ms. | [overview.md](./overview.md) |
| Using Global Config (formerly Edge Config) | Practical guide to connection strings, read access tokens, and backups. | [using-edge-config.md](./using-edge-config.md) |
| Vercel REST API for Global Config (formerly Edge Config) | Use the Vercel REST API to create and write to Global Configs. For reads, use the SDK or the `global-config.vercel.com` endpoint. | [vercel-api.md](./vercel-api.md) |
