---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/add-iam-policy-binding
---

# Cloud Storage IAM, Managed Folders and HMAC Keys

Copy-paste gcloud commands to grant and revoke bucket access, work with managed folders, and manage HMAC keys for service accounts.

## Signature / Usage

### Read a bucket IAM policy

```bash
gcloud storage buckets get-iam-policy gs://BUCKET_NAME
```

```bash
gcloud storage buckets get-iam-policy gs://BUCKET_NAME > policy.txt
```

### Grant a role on a bucket

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
    --member=user:USER_EMAIL \
    --role=roles/storage.objectCreator
```

Adapted (not in the official docs): the gcloud help example uses `--role=roles/customRoleName`; a custom role must be given by its full name, so this uses `projects/PROJECT_ID/roles/CUSTOM_ROLE_ID`.

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
    --member=user:USER_EMAIL --role=projects/PROJECT_ID/roles/CUSTOM_ROLE_ID
```

### Revoke a role on a bucket

```bash
gcloud storage buckets remove-iam-policy-binding gs://BUCKET_NAME \
    --member=user:USER_EMAIL \
    --role=roles/storage.objectCreator
```

### Make objects publicly readable (intentionally public content only)

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME --member=allUsers --role=roles/storage.objectViewer
```

Remove the public access again:

```bash
gcloud storage buckets remove-iam-policy-binding gs://BUCKET_NAME --member=allUsers --role=roles/storage.objectViewer
```

### Replace a bucket IAM policy

> **Warning**: `set-iam-policy` overwrites the whole policy; a wrong file can lock you out. Export the current policy first, edit it, and try it on a disposable bucket.

```bash
gcloud storage buckets set-iam-policy gs://BUCKET_NAME POLICY_FILE
```

### Managed folders

```bash
gcloud storage managed-folders create gs://BUCKET_NAME/MANAGED_FOLDER/
```

```bash
gcloud storage managed-folders describe gs://BUCKET_NAME/MANAGED_FOLDER/
```

```bash
gcloud storage managed-folders list gs://BUCKET_NAME/
```

```bash
gcloud storage managed-folders add-iam-policy-binding \
    gs://BUCKET_NAME/MANAGED_FOLDER --member=user:USER_EMAIL \
    --role=roles/storage.objectCreator
```

```bash
gcloud storage managed-folders remove-iam-policy-binding \
    gs://BUCKET_NAME/MANAGED_FOLDER --member=user:USER_EMAIL \
    --role=roles/storage.objectCreator
```

```bash
gcloud storage managed-folders get-iam-policy \
    gs://BUCKET_NAME/MANAGED_FOLDER/
```

> **Warning**: deleting a managed folder is destructive. Try it on a disposable bucket first.

```bash
gcloud storage managed-folders delete gs://BUCKET_NAME/MANAGED_FOLDER/
```

Managed folders require a bucket with uniform bucket-level access:

```bash
gcloud storage buckets create gs://BUCKET_NAME/ --uniform-bucket-level-access
```

### HMAC keys for a service account

```bash
gcloud storage hmac create \
    SERVICE_ACCOUNT_EMAIL
```

```bash
gcloud storage hmac list --all --long
```

```bash
gcloud storage hmac list \
    --service-account=SERVICE_ACCOUNT_EMAIL
```

```bash
gcloud storage hmac describe ACCESS_ID
```

```bash
gcloud storage hmac update ACCESS_ID --activate
```

```bash
gcloud storage hmac update ACCESS_ID --deactivate \
    --etag=ETAG
```

> **Warning**: deleting an HMAC key is irreversible and breaks clients that still use it. Try it on a disposable key first.

```bash
gcloud storage hmac delete ACCESS_ID
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--member` | `add-iam-policy-binding`, `remove-iam-policy-binding` | Principal, for example `user:EMAIL`, `serviceAccount:EMAIL`, `allUsers` |
| `--role` | `add-iam-policy-binding`, `remove-iam-policy-binding` | Role, for example `roles/storage.objectViewer` |
| `--service-account` | `hmac list` | Only keys of this service account |
| `--all`, `--long` | `hmac list` | Include recently deleted keys; show metadata |
| `--activate`, `--deactivate` | `hmac update` | Set the key state to ACTIVE or INACTIVE |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Help-example values (`gs://BUCKET`, `gs://bucket/managed-folder`, `user:john.doe@example.com`, `POLICY-FILE`, `gs://my-bucket/folder/`, `test.service.account@...`, `GOOG56JBMFZX6PMPTQ62VD2`, `M42da=`) are replaced with UPPER_CASE placeholders such as `BUCKET_NAME`, `USER_EMAIL`, `POLICY_FILE`, `MANAGED_FOLDER`, `SERVICE_ACCOUNT_EMAIL`, `ACCESS_ID` and `ETAG`; the commands are otherwise verbatim.
- Public access: the `allUsers` + `roles/storage.objectViewer` binding makes every object in the bucket publicly readable on the internet. Use it only for intentionally public content, and remove it when done. Enforcing public access prevention blocks it.
- Destructive: `set-iam-policy`, `remove-iam-policy-binding`, `managed-folders delete` and `hmac delete` change or remove access. Try them on a disposable resource first and always name the exact bucket.
- The HMAC secret is shown only at creation; store it in a secret manager, not in shell history or source control. Prefer short-lived credentials (impersonation or Workload Identity Federation, see the `gcp-foundation` skill) where possible.
- Wildcard URLs (`*`, `**`) must be quoted in zsh and similar shells; none are used here.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Corrected from the official docs: the `gcloud storage buckets add-iam-policy-binding` help example passes `--role=roles/customRoleName`, but `roles/` names are predefined roles only; custom roles are named `projects/PROJECT_ID/roles/CUSTOM_ROLE_ID` (or `organizations/ORGANIZATION_ID/roles/CUSTOM_ROLE_ID`), so the example uses the project-level full name.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/add-iam-policy-binding (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/remove-iam-policy-binding (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/get-iam-policy (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/set-iam-policy (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/managed-folders (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/hmac (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/managed-folders (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [buckets.md](./buckets.md)
- [objects.md](./objects.md)
- Bucket IAM roles: https://docs.cloud.google.com/storage/docs/access-control/iam
