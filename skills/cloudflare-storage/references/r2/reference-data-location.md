---
source: https://developers.cloudflare.com/r2/reference/data-location/
---

# Data location

Control where R2 stores data using automatic placement, location hints, or jurisdictional restrictions.

## Signature / Usage

Location hint via the S3 API:

```js
await S3.send(
	new CreateBucketCommand({
		Bucket: "YOUR_BUCKET_NAME",
		CreateBucketConfiguration: {
			LocationConstraint: "WNAM",
		},
	}),
);
```

Jurisdiction via the S3 API (jurisdiction-specific endpoint):

```js
import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
const S3 = new S3Client({
	endpoint: "https://<account_id>.eu.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: "<access_key_id>",
		secretAccessKey: "<access_key_secret>",
	},
	region: "auto",
});
await S3.send(
	new CreateBucketCommand({
		Bucket: "YOUR_BUCKET_NAME",
	}),
);
```

Jurisdiction in a Worker binding:

```jsonc
{
	"r2_buckets": [
		{
			"binding": "MY_BUCKET",
			"bucket_name": "<YOUR_BUCKET_NAME>",
			"jurisdiction": "<JURISDICTION>"
		}
	]
}
```

## Options / Props

Location hints:

| Hint | Hint description |
| --- | --- |
| wnam | Western North America |
| enam | Eastern North America |
| weur | Western Europe |
| eeur | Eastern Europe |
| apac | Asia-Pacific |
| oc | Oceania |

Jurisdictions:

| Jurisdiction | Jurisdiction description |
| --- | --- |
| eu | European Union |
| fedramp | FedRAMP |
| us | United States |

## Notes

- Automatic (default, recommended): picks the closest available region to the create-bucket request based on the caller's location.
- Location hints are best effort, not a guarantee, and only honored the first time a bucket with a given name is created; deleting and recreating a bucket with the same name reuses the original location.
- Jurisdictional restrictions guarantee objects are stored and processed within the jurisdiction (data residency, e.g. GDPR, FedRAMP). The jurisdiction cannot be changed after creation. Dashboard: **Create bucket** > **Location** > **Specify jurisdiction**.
- S3 endpoint for jurisdictions: `https://<ACCOUNT_ID>.<JURISDICTION>.r2.cloudflarestorage.com`; resources outside that jurisdiction are not reachable through it.
- FedRAMP access for Enterprise customers is arranged via the account team or Cloudflare Support.
- Logpush does not interact with jurisdictional R2 buckets; workaround is a Logpush job using an S3-compatible endpoint.

## Related

- [Create new buckets](./buckets-create.md)
- [Authentication](./api-tokens.md)
- [Snowflake](./reference-snowflake-regions.md)
- [Local uploads](./buckets-local-uploads.md)
