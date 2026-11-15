---
source: https://docs.cloud.google.com/storage/docs/uniform-bucket-level-access
---

# Uniform bucket-level access

Enabling uniform bucket-level access disables ACLs for a bucket's resources; only IAM grants access. It revokes access granted solely by object ACLs and the ability to administer permissions through bucket ACLs.

## Signature / Usage

Cloud Monitoring metric to check ACL usage before migrating (verbatim from the source):

```text
storage.googleapis.com/authz/acl_operations_count
```

Examine the ACL operation `OBJECT_ACCESS_REQUIRED_OBJECT_ACL`: zero means no object-level ACLs were needed in the past 24 months (IAM covers access); greater than zero means assign equivalent IAM roles before enabling. The metric covers the past 24 months only.

### Migration checklist

1. Consider whether a bucket-level IAM permission over-exposes data: it applies to all objects while object ACLs vary per object; group objects with the same permissions into separate buckets.
2. Check object ACL usage with the metric above.
3. Check the bucket's default object ACL (for example `projectPrivate` grants `READER` to project viewers and `OWNER` to project editors and owners) and assign IAM equivalents if you want to keep those permissions.
4. Assign IAM equivalents to object ACLs.

## Options / Props

| Object ACL permission | Equivalent IAM role |
|---|---|
| `READER` | Storage Legacy Object Reader (`roles/storage.legacyObjectReader`) |
| `OWNER` | Storage Legacy Object Owner (`roles/storage.legacyObjectOwner`) |

### Behavior when enabled

- Requests to set, read or modify bucket and object ACLs fail with `400 Bad Request` (including JSON API `BucketAccessControls`, `DefaultObjectAccessControls`, `ObjectAccessControls` methods).
- Full-projection metadata requests return an empty ACL list.
- Individual object ownership ceases to exist; access from ownership is revoked and `owner` fields disappear from metadata.
- A bucket created with uniform bucket-level access gets additional IAM roles preserving what the standard default object ACL would provide; on an existing bucket you must apply such roles manually.

### Requirements for disabling

- Enabled for less than 90 consecutive days (it cannot be disabled after 90 consecutive days).
- Any IAM conditions removed from the bucket's IAM policy.
- Bucket not subject to the Require uniform bucket-level access organization policy constraint.
- Any managed folders deleted from the bucket.

If reverted, objects regain their saved ACLs, and objects added meanwhile get the bucket's default object ACLs.

## Notes

- Caution: enabling it revokes access from users who gain access solely through object ACLs. Read the migration considerations first.
- Required for hierarchical namespace, managed folders, IAM conditions set directly on the bucket, and for granting Workforce Identity Federation or Workload Identity Federation entities access (they can be added to ACLs and IAM policies without it, but gain no access until it is enabled).
- Do not use it if you want to use the ACL system for the bucket.
- ACLs and IAM are synchronized for bucket permissions, so migration considerations focus on object access.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Org policy basics are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/uniform-bucket-level-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [iam.md](./iam.md)
- [lists.md](./lists.md)
