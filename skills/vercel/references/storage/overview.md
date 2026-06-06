# Vercel Storage Overview

Vercel offers a suite of managed, serverless storage products that integrate with frontend frameworks.

## Products

| Product | Reads | Writes | Use Case | Plans |
|---------|-------|--------|----------|-------|
| [Blob](./vercel-blob/overview.md) | Fast | Milliseconds | Large, content-addressable files | Hobby, Pro |
| [Edge Config](./edge-config/overview.md) | Ultra-fast (<1ms P99) | Seconds | Runtime configuration, feature flags | Hobby, Pro, Enterprise |
| [Marketplace](./marketplace/overview.md) | Varies by provider | Varies | Postgres, KV, NoSQL, Vector databases | Varies |

## Best Practices

- Locate databases in [regions](https://vercel.com/docs/regions) closest to your Functions
- Use Vercel CDN cache headers to maximize cache hit rates
- Use Edge Config for data that is read often but rarely changes
- Use Blob for large files; use Marketplace for relational or specialized databases

## Transferring Stores

Blob and Edge Config stores can be transferred between accounts (e.g., Hobby → Pro) from the store's **Settings > Transfer Store** page. Marketplace resources can be transferred from the resource's **Settings** page.

## Related

- [Vercel Blob](./vercel-blob/overview.md)
- [Edge Config](./edge-config/overview.md)
- [Marketplace Storage](./marketplace/overview.md)
