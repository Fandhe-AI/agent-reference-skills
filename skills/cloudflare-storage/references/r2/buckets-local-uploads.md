---
source: https://developers.cloudflare.com/r2/buckets/local-uploads/
---

# Local uploads

Improve upload performance when clients upload from a different region than the bucket. Data is written near the client, then asynchronously copied to the bucket; it is available immediately and remains strongly consistent.

## Signature / Usage

```sh
npx wrangler r2 bucket local-uploads enable <BUCKET_NAME>
npx wrangler r2 bucket local-uploads disable <BUCKET_NAME>
```

## Notes

- Applies to `PutObject` and `UploadPart`. If client and bucket are in the same region, the normal upload flow is used; if in different regions, data is written near the client then asynchronously replicated, remaining durable and immediately accessible.
- Best for globally distributed users, critical upload performance/reliability, and optimizing writes without changing the bucket's primary location. Check the bucket **Metrics** > **Request Distribution** chart to see where requests originate.
- Read latency: uploaded data may temporarily reside near the client before replication completes. Reads from the uploader's region are fast; reads near the bucket's region may see cross-region latency until replication completes.
- Not supported for buckets with jurisdictional restrictions.
- Dashboard: bucket **Settings** > **Local Uploads** > **Enable** / **Disable**. Enabling or disabling does not interrupt existing uploads.
- No additional cost; standard Class A operation costs apply.

## Related

- [How R2 works](./how-r2-works.md)
- [Data location](./reference-data-location.md)
- [Pricing](./pricing.md)
