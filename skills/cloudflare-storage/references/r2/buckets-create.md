---
source: https://developers.cloudflare.com/r2/buckets/create-buckets/
---

# Create new buckets

Create buckets from the Cloudflare dashboard or with Wrangler. Buckets have a flat structure (no folders).

## Signature / Usage

```sh
wrangler r2 bucket create your-bucket-name
```

```sh
wrangler r2 bucket list
```

## Options / Props

| Rule | Constraint |
| --- | --- |
| Characters | Lowercase letters (a-z), numbers (0-9), and hyphens (-) |
| Hyphens | Cannot begin or end with a hyphen |
| Length | 3-63 characters |

## Notes

- Wrangler R2 support manages buckets and basic object operations. For bulk uploads or mirroring from legacy object storage use rclone or an S3-compatible tool.
- To delete a bucket you must first empty it.
- Bucket names and buckets are not public by default.
- Unauthorized access attempts to private buckets do not incur R2 operations charges against that bucket.
- Bucket-level overview: objects live in buckets that do not contain folders; a flat structure simplifies access and retrieval.

## Related

- [Delete buckets](./buckets-delete.md)
- [Public buckets](./buckets-public-buckets.md)
- [Storage classes](./buckets-storage-classes.md)
- [Data location](./reference-data-location.md)
- [Wrangler commands](./wrangler-commands.md)
