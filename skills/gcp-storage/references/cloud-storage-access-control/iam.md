---
source: https://docs.cloud.google.com/storage/docs/access-control/iam
---

# IAM for Cloud Storage

How IAM controls access to buckets, managed folders and objects: permissions, roles, policy levels, relation to ACLs, custom roles, convenience values and IAM Conditions.

## Signature / Usage

### IAM Conditions

Cloud Storage supports `resource.name` (and mostly redundant `resource.type`) and date/time attributes. Conditions use a subset of CEL and are specified in the role bindings of a bucket's IAM policy.

Apply a setting to all objects with the same prefix:

```text
resource.name.startsWith('projects/_/buckets/BUCKET_NAME/objects/OBJECT_PREFIX')
```

Set an expiration date for the permission:

```text
request.time < timestamp('2019-01-01T00:00:00Z')
```

Double quotes are also allowed but must be escaped in Google Cloud CLI commands and HTTP/REST requests, for example `request.time < timestamp(\"2019-01-01T00:00:00Z\")`.

### Convenience values

Two-part identifiers of a legacy basic role and a project ID; granting a role to one grants it to all principals with that basic role on the project:

```text
projectOwner:PROJECT_ID
projectEditor:PROJECT_ID
projectViewer:PROJECT_ID
```

Example: granting Storage Object Creator (`roles/storage.objectCreator`) on `my-bucket` to `projectViewer:my-example-project` gives everyone with the Viewer (`roles/viewer`) basic role on that project the object creator permissions for `my-bucket`.

## Options / Props

### Legacy Bucket roles and ACLs

| Legacy Bucket role | Equivalent ACL |
|---|---|
| Storage Legacy Bucket Reader (`roles/storage.legacyBucketReader`) | Bucket Reader |
| Storage Legacy Bucket Writer (`roles/storage.legacyBucketWriter`) | Bucket Writer |
| Storage Legacy Bucket Owner (`roles/storage.legacyBucketOwner`) | Bucket Owner |

All other bucket-level roles (including Legacy Object roles) and all project-level roles work independently from ACLs.

### Role levels

- Roles can be granted at project, bucket, or managed folder level; permissions apply additively down the hierarchy.
- Usable at all levels: Storage Admin (`roles/storage.admin`), Storage Object Viewer (`roles/storage.objectViewer`; contains `storage.objects.get` and `storage.objects.list`), Storage Object Creator (`roles/storage.objectCreator`; contains `storage.objects.create`), Storage Object Admin (`roles/storage.objectAdmin`).
- Single-level: Storage Legacy Object Owner (`roles/storage.legacyObjectOwner`) only at bucket or managed folder level; IAM deny-policy roles only at organization level.
- Example: Object Viewer at project level plus Object Creator on bucket A lets a user read any object but create only in bucket A.

### Permissions needed to change ACLs

- Bucket ACLs and default object ACLs: `storage.buckets.get`, `.getIamPolicy`, `.setIamPolicy`, `.update` together.
- Object ACLs: `storage.objects.get`, `.getIamPolicy`, `.setIamPolicy`, `.update` together.

### Condition restrictions

| Restriction | Detail |
|---|---|
| Uniform bucket-level access | Must be enabled on a bucket before adding bucket-level conditions; migrate all buckets in a project to avoid ACLs overriding project-level conditions |
| Managed folders | Allowed as resource in allow policy conditions; not in deny policy conditions (deny conditions only via tags, which do not support managed folders) |
| Deny policies | Only on project, folder and organization resources; not buckets or managed folders; override allow policies |
| JSON API | `getIamPolicy` / `setIamPolicy` on buckets with conditions require IAM policy version 3 |
| Listing | `storage.objects.list` is granted at bucket level, so `resource.name` cannot restrict listing to a subset of objects |
| Expiry | Expired conditions remain in the policy until removed |

## Notes

- IAM policies can be set on buckets, managed folders and projects, but not directly on individual objects; IAM deny policies cannot be set on buckets, managed folders or objects.
- Caution: setting IAM policies at project, bucket, and managed folder levels can give users access to objects they did not have before; evaluate carefully.
- Viewing a project's IAM policy does not show bucket policies. The console shows inherited project-level permissions for a bucket, but `gcloud storage` and client libraries return only the bucket's own policy; check both.
- Object ACLs do not appear in the IAM hierarchy; when evaluating access, check object ACLs too. IAM deny policies do apply to access granted by ACLs.
- Avoid convenience values in production because they require legacy basic roles. Cloud Storage may apply them automatically in certain circumstances.
- IAM permissions cannot be set through the XML API, but IAM-granted users can still use it.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). General IAM concepts are in `gcp-foundation`.
- Source inconsistency: the Cloud Storage FUSE mount page says Storage Object Viewer has only `storage.objects.list` and does not allow reads; this page lists `storage.objects.get` and `storage.objects.list`, so the role can read object data.
- Source: https://docs.cloud.google.com/storage/docs/access-control/iam (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [uniform-bucket-level-access.md](./uniform-bucket-level-access.md)
- [lists.md](./lists.md)
