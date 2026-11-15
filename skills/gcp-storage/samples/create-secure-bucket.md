---
source: https://docs.cloud.google.com/storage/docs/creating-buckets
---

# Create a Bucket with Uniform Access and Grant a Principal a Role

Create a bucket with uniform bucket-level access, understand public access prevention, then grant a principal an upload-only role on that bucket.

## Signature / Usage

### Create the bucket

Uniform bucket-level access disables ACLs so only IAM grants access.

```bash
gcloud storage buckets create gs://BUCKET_NAME/ --uniform-bucket-level-access
```

Alternative: set the location and default storage class at creation (official `gcloud help` example). This command does not enable uniform bucket-level access, so it is not a second step after the command above; use one or the other. `my-bucket`, `BUCKET_NAME` and `BUCKET` on this page all stand for the same bucket name, and `my-bucket` is the help example value (bucket names are global, so use your own).

```bash
gcloud storage buckets create gs://my-bucket \
    --default-storage-class=nearline --location=asia
```

### Public access prevention

The `gcloud storage buckets create` and `buckets update` help list the `--public-access-prevention` flag, but their EXAMPLES sections have no command that enables it. To enforce it organization-wide use the `storage.publicAccessPrevention` organization policy constraint (set at project, folder or organization level).

### Grant a role on the bucket

Official `gcloud help` example, granting Storage Object Creator (`roles/storage.objectCreator`, upload only):

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET \
    --member=user:john.doe@example.com \
    --role=roles/storage.objectCreator
```

For a service account, use `--member=serviceAccount:SERVICE_ACCOUNT_EMAIL`. To allow reading and listing objects, grant Storage Object Viewer (`roles/storage.objectViewer`) the same way.

## Options / Props

| Item | Value |
|---|---|
| Required role to create | Storage Admin (`roles/storage.admin`) on the project; permission `storage.buckets.create` |
| Default bucket settings | `US` multi-region, Standard class, seven-day soft delete retention |
| Bucket name | 3-63 characters (dotted names up to 222), lowercase letters, digits, `-`, `_`, `.`; cannot start with `goog` or contain `google` |
| `roles/storage.objectCreator` | Contains `storage.objects.create` |
| `roles/storage.objectViewer` | Contains `storage.objects.get` and `storage.objects.list` |

## Notes

- Uniform bucket-level access can be disabled only within 90 consecutive days of enabling it.
- With public access prevention enforced, adding `allUsers` or `allAuthenticatedUsers` to an IAM policy fails with `412 Precondition Failed`. Signed URLs are not affected.
- Bucket names are public and cannot be renamed; do not put PII or project names in them.
- The two `gcloud storage buckets` commands marked "official `gcloud help` example" are copied verbatim from the EXAMPLES section of the gcloud reference, with only the `$ ` prompt dropped.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Service accounts and IAM basics are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/uniform-bucket-level-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/public-access-prevention (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/access-control/iam (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/add-iam-policy-binding (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [upload-download-with-preconditions.md](./upload-download-with-preconditions.md)
- [v4-signed-urls.md](./v4-signed-urls.md)
- https://docs.cloud.google.com/storage/docs/creating-buckets
