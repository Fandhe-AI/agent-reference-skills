---
source: https://developers.cloudflare.com/r2/data-migration/super-slurper/
---

# Super Slurper

Copy objects from other cloud providers to an R2 bucket in a one-off bulk migration job.

## Signature / Usage

Minimal read policy for Amazon S3 source credentials:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": ["s3:Get*", "s3:List*"],
			"Resource": ["arn:aws:s3:::<BUCKET_NAME>", "arn:aws:s3:::<BUCKET_NAME>/*"]
		}
	]
}
```

## Options / Props

| Option | Description |
| --- | --- |
| Bucket sub path (optional) | Prefix within the source bucket to copy objects from. |
| Overwrite files? | What happens when a source object matches an existing R2 path: Overwrite (default) or Skip. |

## Notes

- Dashboard: **R2 data migration** > **Migrate files** > choose provider, enter source bucket and credentials, enter R2 bucket and credentials, review, **Migrate files**.
- Jobs preserve custom object metadata, do not delete anything from the source, and use TLS over HTTPS.
- Best for sources made of objects under 1 TB; larger objects are skipped and must be copied separately (e.g. with rclone).
- Supported sources: Amazon S3, Cloudflare R2, Google Cloud Storage, all S3-compatible providers. Tested: Backblaze B2, DigitalOcean Spaces, Scaleway Object Storage, Wasabi Cloud Object Storage.
- GCS credentials: custom role created from `Storage Object Viewer` plus the `storage.buckets.get` permission (predefined `Storage Admin` also works); service account with the role; download the JSON key.
- ETags may differ after migration; do not rely on them.
- Objects in S3 archival classes are skipped and logged: S3 Glacier tiers (excluding Glacier Instant Retrieval) and S3 Intelligent Tiering objects in the Deep Archive tier.

## Related

- [Sippy](./data-migration-sippy.md)
- [Migration strategies](./data-migration-strategies.md)
- [Data migration](./data-migration-overview.md)
