---
source: https://docs.cloud.google.com/storage/docs/public-access-prevention
---

# Public access prevention

Public access prevention blocks `allUsers` and `allAuthenticatedUsers` from accessing buckets and objects, either per bucket or through the `storage.publicAccessPrevention` organization policy constraint.

## Signature / Usage

Organization policy constraint (verbatim from the source), settable at project, folder or organization level:

```text
storage.publicAccessPrevention
```

Bucket state can only be `enforced` or `inherited`:

- `enforced`: public access prevention applies to the bucket.
- `inherited`: determined by the constraint. `True` on the containing project: applies. `False`: does not apply. Not set on the project: the containing folder's value is used, then the organization's; if not set anywhere, it does not apply.

## Options / Props

### Behavior when enforced

| Case | Result |
|---|---|
| Requests authorized through `allUsers` / `allAuthenticatedUsers` | Fail with HTTP `401` or `403` |
| Existing IAM policies and ACLs granting them | Remain in place but are overridden |
| Creating buckets or objects with them in IAM policies or ACLs | Fail (exception: a bucket default object ACL containing `allUsers` still lets object creation succeed; the object ACL contains `allUsers` but it is overridden) |
| Adding them to an IAM policy or ACL | Fails with `412 Precondition Failed` |

### Behavior if disabled

- Existing IAM policies and ACLs granting `allUsers` / `allAuthenticatedUsers` take effect and make data public.
- Requests creating such policies or ACLs succeed.
- An object created under prevention without public ACLs may become public if it lives in a publicly accessible bucket.
- Buckets set to `enforced` keep enforcement even if you disable the constraint for the containing project, folder or organization.

## Notes

- Warning: enforcing it on existing resources blocks all existing authorization and new additions of `allUsers` / `allAuthenticatedUsers`, which can break applications that depend on public access. Inventory public resources first: set up usage logs; check bucket IAM policies (or use Cloud Asset Inventory across a project, folder or organization) and managed folder policies for `allUsers` / `allAuthenticatedUsers`; check object ACLs (skip if uniform bucket-level access is enabled).
- Cloud Audit Logs does not track access to public objects; with Data Access logs enabled, log volume (and charges) can increase after enforcement because formerly public access becomes authorized access.
- Signed URLs and private bucket access (Cloud Load Balancing / Cloud CDN backend) are not affected.
- Do not use it for buckets intentionally kept public (such as static website hosting). To make exceptions in an organization that enforces it, disable it on the specific project containing the bucket.
- Enforce at the highest possible level of the organization for most protection. Projects without an organization cannot use organization policies; use the bucket-level setting.
- Strongly consistent for read-after-update, but enforcement can take up to 10 minutes. Cached copies may stay publicly reachable for the object's `Cache-Control` max-age (default 3600 seconds).
- Makes no bucket publicly accessible; it removes that ability. Public access via `allUsers` is only appropriate for intentionally public content.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Organization policy basics are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/public-access-prevention (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [uniform-bucket-level-access.md](./uniform-bucket-level-access.md)
- [signed-urls.md](./signed-urls.md)
