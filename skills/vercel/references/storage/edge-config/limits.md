# Edge Config Limits and Pricing

## Pricing (Pro Plan)

| Resource | Price |
|----------|-------|
| Edge Config Reads | $3.00 per unit |
| Edge Config Writes | $5.00 per unit |

One read = one SDK/API call, regardless of how many items are returned. Use `getAll()` instead of multiple `get()` calls to minimize read counts.

## Limits by Plan

| Limit | Hobby | Pro | Enterprise |
|-------|-------|-----|------------|
| **Max store size** | 8 KB | 64 KB | 512 KB (can request higher) |
| **Max stores (total)** | 1 | 3 | 10 (can request higher) |
| **Max stores per project** | 1 | 3 | 3 |
| **Max key name length** | 256 chars | 256 chars | 256 chars |
| **Write propagation** | Up to 10s | Up to 10s | Up to 10s |
| **Backup retention** | 7 days | 90 days | 365 days |

Key naming pattern: `^[A-Za-z0-9_-]+$` (alphanumeric, `_`, `-` only).

## Operation Definitions

- **Read**: One read is counted per SDK call or REST API call, regardless of items returned
- **Write**: One write per `PATCH` request to update items

## Common Errors

### Edge Config Limit Reached

```
Error: Tried to attach 4 Edge Configs. Only 3 can be attached to one Deployment at a time.
```

Fix: Disconnect one store from the project (Storage > select store > disconnect) and redeploy.

### Edge Config Update Rejected

Occurs when the resulting store size would exceed your plan's limit. All team members receive a notification.

Fix:
- Delete unused entries to free space
- Upgrade your plan
- Contact Vercel Sales for larger store sizes

## Best Practices

- **Fewer large stores > many small stores**: Fewer requests to different stores lowers overall latency
- Use `getAll()` instead of multiple `get()` calls — counts as one read
- Avoid using Edge Config for data that changes frequently or needs immediate consistency

## Troubleshooting Slow Reads

Ensure all of the following:

1. Connection string stored as an environment variable (not hardcoded)
2. Using the SDK (`@vercel/edge-config`) for reads
3. The environment variable row shows the Edge Config icon in project Settings
4. Testing on a Vercel deployment (not localhost)

## Related

- [Overview](./overview.md)
- [Using Edge Config](./using-edge-config.md)
- [@vercel/edge-config SDK](./edge-config-sdk.md)
