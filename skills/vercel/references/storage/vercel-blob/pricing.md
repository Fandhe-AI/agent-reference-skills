# Vercel Blob Pricing

## Billing Dimensions

| Metric | Description |
|--------|-------------|
| **Storage** | Monthly average store size (GB-month) |
| **Simple Operations** | `head()` calls + cache MISS blob URL accesses |
| **Advanced Operations** | `put()`, `copy()`, `list()`, `upload()` calls; multipart parts count separately |
| **Blob Data Transfer** | Outbound data for public blob downloads and Function-to-store private fetches |
| **Edge Requests** | Each blob URL access (HIT or MISS) |
| **Fast Origin Transfer** | Cache MISS scenarios only |

## Pricing (Pro Plan, iad1 example)

| Resource | Price |
|----------|-------|
| Storage | ~$0.023/GB-month (regional) |
| Simple Operations | ~$0.40/1M (regional) |
| Advanced Operations | ~$5.00/1M (regional) |
| Blob Data Transfer | ~$0.05/GB (regional) |
| `del()` operations | **Free** |

> Pricing is regionalized. Check the dashboard for your store's region pricing.

## Operation Rate Limits

| Plan | Simple Ops | Advanced Ops |
|------|-----------|--------------|
| Hobby | 1,200/min (20/s) | 900/min (15/s) |
| Pro | 7,200/min (120/s) | 4,500/min (75/s) |
| Enterprise | 9,000/min (150/s) | 7,500/min (125/s) |

Batch deletes count one operation per blob deleted.

## Size Limits

| Limit | Value |
|-------|-------|
| Max file size | 5 TB |
| Max cached blob size | 512 MB |
| Server upload body | 4.5 MB |

Blobs > 512 MB are never cached: every access is a cache MISS (Simple Operation + Fast Origin Transfer charged every time).

## Hobby Plan

Free within included limits. Exceeding limits blocks access until the next 30-day cycle. No overage charges.

## Pro Plan

Monthly credit allocation; on-demand billing after credits are consumed. Supports Spend Management and spend webhooks.

## Pricing Example

120,000 blobs uploaded (30% multipart with 5 parts), 50 GB avg storage, 2.5M downloads (70% cache hit rate, 350 GB transfer):

- Storage: 50 GB − 5 GB included = 45 GB × $0.023 = $1.04
- Simple Ops (cache MISS): 750K − 100K = 650K × $0.40/1M = $0.26
- Advanced Ops: 336K − 10K = 326K × $5.00/1M = $1.63
- Blob Data Transfer: 350 GB − 100 GB = 250 GB × $0.05 = $12.50
- Edge Requests: 2.5M (within 10M included) = $0.00
- Fast Origin Transfer: 105 GB − 100 GB = 5 GB × $0.06 = $0.30
- **Total: ~$15.73/month**

## Notes

- Dashboard interactions count as operations (list, upload, view)
- Multipart uploads: 1 op to start + 1 op per part + 1 op to complete
- Client uploads: no data transfer charges for the upload itself

## Related

- [Overview](./overview.md)
- [@vercel/blob SDK](./blob-sdk.md)
