---
source: https://developers.cloudflare.com/r2/api/tokens/
---

# Authentication (R2 API tokens)

Generate an R2 API token to use as the Access Key for S3-compatible SDKs and XML APIs. R2 must be purchased before a token can be generated.

## Signature / Usage

```txt
Endpoint:  https://<ACCOUNT_ID>.r2.cloudflarestorage.com
EU:        https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com
FedRAMP:   https://<ACCOUNT_ID>.fedramp.r2.cloudflarestorage.com
US:        https://<ACCOUNT_ID>.us.r2.cloudflarestorage.com
```

Bucket resource in an Access Policy:

```json
"com.cloudflare.edge.r2.bucket.<ACCOUNT_ID>_<JURISDICTION>_<BUCKET_NAME>": "*"
```

All buckets in an account:

```json
"com.cloudflare.api.account.<ACCOUNT_ID>": {
  "com.cloudflare.edge.r2.bucket.*": "*"
}
```

Example Access Policy:

```json
[
	{
		"id": "f267e341f3dd4697bd3b9f71dd96247f",
		"effect": "allow",
		"resources": {
			"com.cloudflare.edge.r2.bucket.4793d734c0b8e484dfc37ec392b5fa8a_default_my-bucket": "*",
			"com.cloudflare.edge.r2.bucket.4793d734c0b8e484dfc37ec392b5fa8a_eu_my-eu-bucket": "*"
		},
		"permission_groups": [
			{
				"id": "6a018a9f2fc74eb6b293b0c548f38b39",
				"name": "Workers R2 Storage Bucket Item Read"
			}
		]
	}
]
```

## Options / Props

Permissions:

| Permission | Description |
| --- | --- |
| Admin Read & Write | Allows the ability to create, list, and delete buckets, edit bucket configuration, read, write, and list objects, and read and write to data catalog tables and associated metadata. |
| Admin Read only | Allows the ability to list buckets and view bucket configuration, read and list objects, and read from the data catalog tables and associated metadata. |
| Object Read & Write | Allows the ability to read, write, and list objects in specific buckets. |
| Object Read only | Allows the ability to read and list objects in specific buckets. |

Permission groups (API):

| Permission group | Resource | Description |
| --- | --- | --- |
| `Workers R2 Storage Write` | Account | Can create, delete, and list buckets, edit bucket configuration, and read, write, and list objects. |
| `Workers R2 Storage Read` | Account | Can list buckets and view bucket configuration, and read and list objects. |
| `Workers R2 Storage Bucket Item Write` | Bucket | Can read, write, and list objects in buckets. |
| `Workers R2 Storage Bucket Item Read` | Bucket | Can read and list objects in buckets. |
| `Workers R2 Data Catalog Write` | Account | Can read from and write to data catalogs. This permission allows access to the Iceberg REST catalog interface. |
| `Workers R2 Data Catalog Read` | Account | Can read from data catalogs. This permission allows read-only access to the Iceberg REST catalog interface. |

## Notes

- Dashboard: R2 page, **Account Details** > **API Tokens** > **Manage**, then **Create Account API token** (tied to the account; valid until revoked or expiry) or **Create User API token** (tied to your user; inactive if the user is removed). Object permissions can be scoped to a set of buckets.
- The Secret Access Key is shown only once. Client Secret / Client ID are other names for Secret Access Key / Access Key ID.
- Jurisdictional buckets are accessible only via the matching jurisdictional endpoint; most S3 clients need one client per jurisdiction.
- **Object Read & Write** and **Object Read only** are supported only by the S3-compatible API, not the Cloudflare REST API. Basin Catalog requires an Admin permission (read-only catalog operations work with Admin Read only; writes need Admin Read & Write).
- S3 credentials from the Create Token API: Access Key ID is the token `id`; Secret Access Key is the SHA-256 hash of the token `value`.
- This differs from generating API tokens for other Cloudflare services. For short-lived scoped credentials see temporary credentials.

## Related

- [Temporary credentials](./s3-temporary-credentials.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [Data location](./reference-data-location.md)
- [Error codes](./api-error-codes.md)
