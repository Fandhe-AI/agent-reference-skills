---
source: https://docs.cloud.google.com/docs/terraform/resource-management/store-state
---

# Store Terraform state in a Cloud Storage bucket

By default Terraform stores state locally in `terraform.tfstate`, which is hard for teams. This tutorial provisions a Cloud Storage bucket with Terraform and migrates state from the local backend to a remote `gcs` backend.

## Signature / Usage

### Prerequisites

```bash
gcloud auth application-default login
```

```bash
gcloud services enable storage.googleapis.com
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="user:USER_IDENTIFIER" --role=ROLE
```

Run the last command for `roles/storage.admin`.

### Review the Terraform files

```bash
git clone https://github.com/terraform-google-modules/terraform-docs-samples.git --single-branch
```

```bash
cd terraform-docs-samples/storage/remote_terraform_backend_template
```

```bash
cat main.tf
```

```hcl
resource "random_id" "default" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name     = "${random_id.default.hex}-terraform-remote-backend"
  location = "US"

  force_destroy               = false
  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

resource "local_file" "default" {
  file_permission = "0644"
  filename        = "${path.module}/backend.tf"

  # You can store the template in a file and use the templatefile function for
  # more modularity, if you prefer, instead of storing the template inline as
  # we do here.
  content = <<-EOT
  terraform {
    backend "gcs" {
      bucket = "${google_storage_bucket.default.name}"
    }
  }
  EOT
}
```

### Provision the bucket, then migrate state

```bash
terraform init
```

```bash
terraform apply
```

The first `terraform init` uses a local backend because the bucket does not exist yet. `terraform apply` creates the bucket and the local `backend.tf`.

```bash
terraform init -migrate-state
```

Enter `yes` when prompted. Terraform then pulls the latest state from the bucket before each command and pushes it afterwards.

### Clean up

Set `force_destroy` to `true` in `google_storage_bucket.default`, then:

```bash
terraform apply
```

```bash
rm backend.tf
```

```bash
terraform init -migrate-state
```

```bash
terraform destroy
```

Enter `yes` at each prompt.

## Options / Props

### Bucket properties

| Property | Value | Purpose |
|----------|-------|---------|
| `force_destroy` | `false` | Bucket is not deleted while it holds objects, so state is not deleted by accident |
| `public_access_prevention` | `enforced` | Contents are not exposed to the public |
| `uniform_bucket_level_access` | `true` | Access is controlled with IAM instead of ACLs |
| `versioning.enabled` | `true` | Earlier state versions are preserved |

### Permissions for a custom IAM role (alternative to `roles/storage.admin`)

| Permission |
|------------|
| `storage.buckets.create` |
| `storage.buckets.list` |
| `storage.objects.get` |
| `storage.objects.create` |
| `storage.objects.delete` |
| `storage.objects.update` |
| `storage.buckets.get` (added; see Notes) |
| `storage.buckets.update` (added; see Notes) |
| `storage.buckets.delete` (added; see Notes) |

## Notes

- Control access to the bucket and state files: only a small set of users (for example the main cloud administrator and a backup administrator) should have admin permissions on the bucket; other developers should only read and write objects. `roles/storage.admin` is broad; the source offers the custom role above as an alternative.
- Object Versioning is enabled to keep deployment history and increases storage costs; mitigate by configuring Object Lifecycle Management to delete old state versions.
- The clean-up sequence is destructive (it sets `force_destroy = true`, removes the backend, and runs `terraform destroy`); try it on a disposable project first.
- Corrected from the official docs: the source's custom role lists `storage.buckets.create` and `storage.buckets.list` but no other bucket permission. This page manages the bucket itself with Terraform: reading it back, changing it (`force_destroy = true` in the clean-up) and `terraform destroy` call the JSON API methods `buckets.get`, `buckets.update` / `buckets.patch` and `buckets.delete`, which need `storage.buckets.get`, `storage.buckets.update` and `storage.buckets.delete` (https://docs.cloud.google.com/storage/docs/access-control/iam-json, retrieved 2026-11-19). The three rows are added for that reason.
- Source inconsistency: the source labels `rm backend.tf` as "Delete the state file"; the `local_file` resource above writes `backend.tf` with the `backend "gcs"` block.
- Cloud Storage incurs costs for storage, read and write operations, network egress, and replication; see the Cloud Storage pricing page. The source also shows Cloud Shell activation and project-creation commands (omitted).
- Cloud Storage itself is in `gcp-storage`.
- Source: https://docs.cloud.google.com/docs/terraform/resource-management/store-state (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [basic-commands.md](./basic-commands.md)
- [import.md](./import.md)
