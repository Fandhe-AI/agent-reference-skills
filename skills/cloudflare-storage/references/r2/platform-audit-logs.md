---
source: https://developers.cloudflare.com/r2/platform/audit-logs/
---

# Audit Logs

Audit logs summarize configuration changes made to R2 buckets. Available on all plans, free, and always enabled.

## Signature / Usage

```json
{
	"action": { "info": "CreateBucket", "result": true, "type": "create" },
	"actor": {
		"email": "<ACTOR_EMAIL>",
		"id": "3f7b730e625b975bc1231234cfbec091",
		"ip": "fe32:43ed:12b5:526::1d2:13",
		"type": "user"
	},
	"id": "5eaeb6be-1234-406a-87ab-1971adc1234c",
	"interface": "API",
	"metadata": { "zone_name": "r2.cloudflarestorage.com" },
	"newValue": "",
	"newValueJson": {},
	"oldValue": "",
	"oldValueJson": {},
	"owner": { "id": "1234d848c0b9e484dfc37ec392b5fa8a" },
	"resource": { "id": "my-bucket", "type": "r2.bucket" },
	"when": "2024-07-15T16:32:52.412Z"
}
```

## Options / Props

| Operation | Description |
| --- | --- |
| CreateBucket | Creation of a new bucket. |
| DeleteBucket | Deletion of an existing bucket. |
| AddCustomDomain | Addition of a custom domain to a bucket. |
| RemoveCustomDomain | Removal of a custom domain from a bucket. |
| ChangeBucketVisibility | Change to the managed public access (`r2.dev`) settings of a bucket. |
| PutBucketStorageClass | Change to the default storage class of a bucket. |
| PutBucketLifecycleConfiguration | Change to the object lifecycle configuration of a bucket. |
| DeleteBucketLifecycleConfiguration | Deletion of the object lifecycle configuration for a bucket. |
| PutBucketCors | Change to the CORS configuration for a bucket. |
| DeleteBucketCors | Deletion of the CORS configuration for a bucket. |

## Notes

- View under the dashboard **Audit logs** page.
- Data access operations such as `GetObject` and `PutObject` are not included; use R2 Data Access Logs for those.

## Related

- [Data Access Logs](./buckets-data-access-logs.md)
- [Metrics and analytics](./platform-metrics-analytics.md)
