# Global Config (formerly Edge Config) Limits and Pricing

## Pricing

| Resource | Hobby included | On-demand rate |
|----------|----------------|----------------|
| Global Config Reads | First 100,000 | $3 per 1,000,000 reads |
| Global Config Writes | First 100 | $1 per 100 writes |

One read = one SDK/API call, regardless of how many items are returned. Use `getAll()` instead of multiple `get()` calls to minimize read counts. Pricing is unchanged by the rename (migration guide).

## Limits by Plan

| Limit | Hobby | Pro | Enterprise |
|-------|-------|-----|------------|
| **Max store size** | 1 MB | 1 MB | 1 MB |
| **Max stores (total)** | 1 | Unlimited | Unlimited |
| **Max stores per project** | 1 | 3 | 3 |
| **Max key name length** | 256 chars | 256 chars | 256 chars |
| **Write propagation** | Up to 10s | Up to 10s | Up to 10s |
| **Backup retention** | 7 days | 90 days | 365 days |
| **Writes** (migration guide) | 250 per month | 100 per hour | 100 per hour |

Key naming pattern: `^[A-Za-z0-9_-]+$` (alphanumeric, `_`, `-` only).

## Operation Definitions

- **Read**: One read is counted per SDK call or REST API call, regardless of items returned
- **Write**: One write per `PATCH` request to update items (SDK or REST API)

## Common Errors

### Global Config Limit Reached

```
Error: Tried to attach 4 Global Configs. Only 3 can be attached to one Deployment at a time.
```

Fix: Disconnect one store from the project (Storage > select store > disconnect) and redeploy.

### Global Config Update Rejected

Occurs when the resulting store size would exceed your plan's limit. All team members receive a notification.

Fix:
- Delete unused entries to free space
- Split data across multiple stores

## Best Practices

- **Fewer large stores > many small stores**: Fewer requests to different stores lowers overall latency
- Use `getAll()` instead of multiple `get()` calls — counts as one read
- Avoid using Global Config for data that changes frequently or needs immediate consistency

## Notes

- Limits changed with the Edge Config to Global Config rename (docs last_updated 2026-07-29): store size is now 1 MB on all plans (was 8 KB / 64 KB / 512 KB); total stores are 1 on Hobby and unlimited on Pro and Enterprise (was 3 / 10); writes are 100 per hour on Pro and Enterprise (was 480 per day, up to 2,400 per day now); Hobby stays at 250 per month. The per-project connection limit is unchanged (1 / 3 / 3)
- Previously this page listed pricing as "$3.00 per unit" for reads and "$5.00 per unit" for writes; the current Global Config limits page lists $3 per 1,000,000 reads and $1 per 100 writes (first 100,000 reads and 100 writes included on Hobby)

## Troubleshooting Slow Reads

Ensure all of the following:

1. Connection string stored as an environment variable (not hardcoded)
2. Using the SDK (`@vercel/global-config`, or the legacy `@vercel/edge-config`) for reads
3. The environment variable row shows the Global Config icon in project Settings
4. Testing on a Vercel deployment (not localhost)

## Related

- [Overview](./overview.md)
- [Using Edge Config](./using-edge-config.md)
- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Migration Guide](./migration-guide.md)
