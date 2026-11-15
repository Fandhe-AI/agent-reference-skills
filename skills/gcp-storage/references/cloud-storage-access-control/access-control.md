---
source: https://docs.cloud.google.com/storage/docs/access-control
---

# Overview of access control

Cloud Storage access control: choose uniform or fine-grained access, how IAM and ACLs interact, and the additional options (signed URLs, signed policy documents, Firebase Security Rules, public access prevention, private bucket access, Credential Access Boundaries, bucket IP filtering) plus best practices.

## Signature / Usage

### Uniform vs fine-grained

- Uniform (recommended): uniform bucket-level access uses IAM alone; permissions apply to all objects in a bucket or groups of objects with common prefixes. Enables managed folders, IAM Conditions, domain restricted sharing, and workforce identity federation.
- Fine-grained: IAM and ACLs together. ACLs are a legacy system designed for Amazon S3 interoperability, allow per-object access, and raise the chance of unintentional data exposure; auditing is harder. Store sensitive data (such as PII) in buckets with uniform bucket-level access enabled.
- After enabling uniform bucket-level access you have 90 days to switch back to fine-grained before it becomes permanent.

### IAM and ACLs act in parallel

Only one system needs to grant access. For example, a bucket IAM policy allowing few users to read, plus one object with an ACL that makes it publicly readable, exposes that object to the public. In general IAM cannot detect permissions granted by ACLs and ACLs cannot detect permissions granted by IAM. Use IAM for permissions covering multiple objects; use ACLs mainly to customize access to individual objects or when migrating from Amazon S3.

### IAM Condition example

Snippet taken from https://docs.cloud.google.com/storage/docs/access-control/iam (applies an IAM setting to all objects with the same prefix):

```text
resource.name.startsWith('projects/_/buckets/BUCKET_NAME/objects/OBJECT_PREFIX')
```

## Options / Props

| Option | Description |
|---|---|
| Signed URLs (query string authentication) | Time-limited read or write access to an object through a generated URL; anyone with the URL has access for the specified time, with or without a user account. Usable in addition to IAM and ACLs. |
| Signed policy documents | Specify what can be uploaded to a bucket (size, content type, other upload characteristics); lets website visitors upload files. |
| Firebase Security Rules | Granular, attribute-based control for mobile and web apps using Firebase SDKs for Cloud Storage. |
| Public access prevention | Disallows access via `allUsers` and `allAuthenticatedUsers`. |
| Private bucket access | Serve content only through Cloud Load Balancing and Cloud CDN without making the bucket public; combinable with public access prevention. |
| Credential Access Boundaries | Downscope an OAuth 2.0 access token to specific buckets and an upper bound of permissions. |
| Bucket IP filtering | Allow only listed source IP address ranges (public IPs, ranges, and VPC addresses); other requests are blocked. |

## Notes

- Best practices: use the principle of least privilege (for example Storage Object Viewer or `READER` instead of Storage Admin or `OWNER`); avoid granting roles with `setIamPolicy` or ACL `OWNER` to people you do not know; delegate administrative control (grant Storage Admin to a group or at least two individuals, or `OWNER` ACL to at least two individuals).
- Be careful with anonymous principals: `allUsers` and `allAuthenticatedUsers` should be used only when it is acceptable for anyone on the internet to read and analyze your data, and never with permissions like `setIamPolicy`, `update`, `create`, `delete`, or the ACL `OWNER` permission. Granting them makes data publicly accessible; use only for intentionally public content.
- Interoperability: with the XML API, the request's signature identifier determines the ACL syntax (for example an Amazon S3 signature identifier gets S3 ACL syntax).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). IAM concepts in general are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/access-control (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/access-control/iam

## Related

- [iam.md](./iam.md)
- [uniform-bucket-level-access.md](./uniform-bucket-level-access.md)
- [lists.md](./lists.md)
- [signed-urls.md](./signed-urls.md)
- [public-access-prevention.md](./public-access-prevention.md)
