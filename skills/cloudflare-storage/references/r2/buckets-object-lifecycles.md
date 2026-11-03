---
source: https://developers.cloudflare.com/r2/buckets/object-lifecycles/
---

# Object lifecycles

Lifecycle rules set the retention period of objects and when objects transition from Standard to Infrequent Access storage. A lifecycle configuration is a collection of rules.

## Signature / Usage

```sh
npx wrangler r2 bucket lifecycle add <BUCKET_NAME> [OPTIONS]
npx wrangler r2 bucket lifecycle set <BUCKET_NAME> --file <FILE_PATH>
npx wrangler r2 bucket lifecycle list <BUCKET_NAME>
npx wrangler r2 bucket lifecycle remove <BUCKET_NAME> --id <RULE_ID>
```

```js
import {
	S3Client,
	PutBucketLifecycleConfigurationCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
	endpoint: "https://<account_id>.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: "<access_key_id>",
		secretAccessKey: "<access_key_secret>",
	},
	region: "auto",
});
```

```javascript
await client.send(
	new PutBucketLifecycleConfigurationCommand({
		Bucket: "testBucket",
		LifecycleConfiguration: {
			Rules: [
				// Example: deleting objects on a specific date
				// Delete 2019 documents in 2024
				{
					ID: "Delete 2019 Documents",
					Status: "Enabled",
					Filter: {
						Prefix: "2019/",
					},
					Expiration: {
						Date: new Date("2024-01-01"),
					},
				},
				// Example: transitioning objects to Infrequent Access storage by age
				// Transition objects older than 30 days to Infrequent Access storage
				{
					ID: "Transition Objects To Infrequent Access",
					Status: "Enabled",
					Transitions: [
						{
							Days: 30,
							StorageClass: "STANDARD_IA",
						},
					],
				},
				// Example: deleting objects by age
				// Delete logs older than 90 days
				{
					ID: "Delete Old Logs",
					Status: "Enabled",
					Filter: {
						Prefix: "logs/",
					},
					Expiration: {
						Days: 90,
					},
				},
				// Example: abort all incomplete multipart uploads after a week
				{
					ID: "Abort Incomplete Multipart Uploads",
					Status: "Enabled",
					AbortIncompleteMultipartUpload: {
						DaysAfterInitiation: 7,
					},
				},
				// Example: abort user multipart uploads after a day
				{
					ID: "Abort User Incomplete Multipart Uploads",
					Status: "Enabled",
					Filter: {
						Prefix: "useruploads/",
					},
					AbortIncompleteMultipartUpload: {
						// For uploads matching the prefix, this rule will take precedence
						// over the one above due to its earlier expiration.
						DaysAfterInitiation: 1,
					},
				},
			],
		},
	}),
);
```

```js
import {
	S3Client,
	GetBucketLifecycleConfigurationCommand,
	DeleteBucketLifecycleCommand,
} from "@aws-sdk/client-s3";

// Get lifecycle configuration for bucket
await client.send(new GetBucketLifecycleConfigurationCommand({ Bucket: "bucketName" }));

// Delete lifecycle configuration for bucket
await client.send(new DeleteBucketLifecycleCommand({ Bucket: "bucketName" }));
```

## Notes

- Objects are typically removed within 24 hours of the `x-amz-expiration` value. Newly uploaded objects reflect new rules immediately; existing objects may be delayed (typically within 24 hours, longer for large buckets).
- A deleted object is no longer billable. Buckets have a default rule that expires multipart uploads seven days after initiation.
- Transitioning from Standard to Infrequent Access incurs a Class A operation. If rules conflict within a 24-hour period, expiration takes precedence over storage class transition.
- Maximum 1000 rules. Managing lifecycles requires an API token with the `Workers R2 Storage Write` permission group.
- `lifecycle set --file` JSON follows the request body of the put object lifecycle configuration API.
- Dashboard: bucket **Settings** > **Object Lifecycle Rules** > **Add rule**.
- Bucket lock rules take precedence over lifecycle rules.

## Related

- [Storage classes](./buckets-storage-classes.md)
- [Bucket locks](./buckets-bucket-locks.md)
- [Authentication](./api-tokens.md)
- [Pricing](./pricing.md)
