# Vercel Storage Overview

Vercel offers a suite of managed, serverless storage products that integrate with frontend frameworks.

## Products

| Product | Reads | Writes | Use Case | Plans |
|---------|-------|--------|----------|-------|
| [Blob](./vercel-blob/overview.md) | Fast | Milliseconds | Large, content-addressable files | Hobby, Pro |
| [Global Config (formerly Edge Config)](./edge-config/overview.md) | Ultra-fast (most lookups <1ms; 99% of reads under 10ms) | Seconds | Runtime configuration, feature flags | Hobby, Pro, Enterprise |
| [Marketplace](./marketplace/overview.md) | Varies by provider | Varies | Postgres, KV, NoSQL, Vector databases | Varies |

## Best Practices

- Locate databases in [regions](https://vercel.com/docs/regions) closest to your Functions
- Use Vercel CDN cache headers to maximize cache hit rates
- Use Global Config (formerly Edge Config) for data that is read often but rarely changes
- Use Blob for large files; use Marketplace for relational or specialized databases

## Transferring Stores

Blob and Global Config stores can be transferred between accounts (e.g., Hobby → Pro) from the store's **Settings > Transfer Store** page. Marketplace resources can be transferred from the resource's **Settings** page.

## Related

- [Vercel Blob](./vercel-blob/overview.md)
- [Global Config (formerly Edge Config)](./edge-config/overview.md)
- [Marketplace Storage](./marketplace/overview.md)
