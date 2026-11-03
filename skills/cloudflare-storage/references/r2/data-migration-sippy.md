---
source: https://developers.cloudflare.com/r2/data-migration/sippy/
---

# Sippy

Sippy copies data from other cloud providers to R2 as data is requested, avoiding unnecessary upfront egress fees.

## Signature / Usage

```sh
npx wrangler r2 bucket sippy enable "<BUCKET_NAME>"
npx wrangler r2 bucket sippy disable "<BUCKET_NAME>"
```

Minimal read policy for Amazon S3 source credentials:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": ["s3:ListBucket*", "s3:GetObject*"],
			"Resource": [
				"arn:aws:s3:::<BUCKET_NAME>",
				"arn:aws:s3:::<BUCKET_NAME>/*"
			]
		}
	]
}
```

## Options / Props

Action behavior when Sippy is enabled:

| Action | New behavior |
| --- | --- |
| GetObject | First tries R2. If the object is absent it is served from the source bucket and simultaneously uploaded to R2. |
| HeadObject | Like GetObject but metadata only; does not copy objects to R2. |
| PutObject | No change; adds objects to R2. |
| DeleteObject | No change; deletes in R2. If not also deleted in the source, a later GetObject copies it back from the source. |

Metrics:

| Metric | Description |
| --- | --- |
| Requests served by Sippy | The percentage of overall requests served by R2 over a period of time. A higher percentage indicates that fewer requests need to be made to the source bucket. |
| Data migrated by Sippy | The amount of data that has been copied from the source bucket to R2 over a period of time. Reported in bytes. |

## Notes

- Applies across Workers, S3 API, and public buckets. Other operations behave as usual.
- Enable via dashboard (bucket **Settings** > **On Demand Migration** > **Enable**), Wrangler, or API. For jurisdictional buckets pass `cf-r2-jurisdiction` (e.g. `eu`). Wrangler needs R2 Access Key ID and Secret Access Key with read and write permissions.
- Supported sources: Amazon S3, Google Cloud Storage, Azure Blob Storage, S3-compatible providers.
- Source credentials: S3 needs an IAM user with the policy above. GCS: service account with predefined `Storage Object Viewer` role and a JSON key file. Azure: storage account name, container, and exactly one of account key or SAS token (Read and List permissions on the container). S3-compatible: endpoint URL, Access Key ID, Secret Access Key. Scope credentials to read-only on the bucket.
- Modifications to source objects are not reflected after the first copy. Only user metadata prefixed `x-amz-meta-` is migrated. Objects larger than 199 MiB may need multiple GET requests to copy fully; simultaneous GETs may fetch from the source several times.
- ETags are not guaranteed equal after migration (Sippy may use multipart); do not rely on matching ETags.
- View metrics under bucket **Metrics** tab. Disable via **On Demand Migration** > **Disable**.

## Related

- [Super Slurper](./data-migration-super-slurper.md)
- [Migration strategies](./data-migration-strategies.md)
- [Upload objects](./objects-upload.md)
