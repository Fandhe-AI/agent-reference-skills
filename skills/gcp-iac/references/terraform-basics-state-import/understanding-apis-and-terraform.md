---
source: https://docs.cloud.google.com/docs/terraform/understanding-apis-and-terraform
---

# Understanding Google Cloud APIs and Terraform

Explains how Terraform interacts with public versus private Google Cloud APIs, and the difference between enabling an API and importing a resource.

## Signature / Usage

### Enable a public API

`google_project_service` verifies that a public API is enabled for the project. Enabling is a prerequisite for creating resources of that service (for example `compute.googleapis.com` before `google_compute_instance`).

```hcl
resource "google_project_service" "compute_api" {
  project            = "your-gcp-project-id"
  service            = "compute.googleapis.com"
  disable_on_destroy = false
}
```

### Import an existing resource

```bash
terraform import google_compute_instance.my_instance projects/your-gcp-project-id/zones/us-central1-a/instances/my-vm
```

## Options / Props

| | Public APIs | Private (internal) APIs |
|---|-------------|-------------------------|
| Purpose | Create, configure and manage resources | Internal operation, orchestration and provisioning by Google |
| Exposure | Documented, defined REST endpoints; what the `google` provider targets | Generally undocumented, no stable external endpoints |
| Examples | `compute.googleapis.com`, `storage.googleapis.com`, `bigquery.googleapis.com` | `dataproc-control.googleapis.com` |

## Notes

- `google_project_service` is only for the enablement state of publicly accessible APIs; using it for private APIs results in errors. Private APIs need no customer action: do not enable or import them, and this does not affect using the service.
- You import resources (such as `google_compute_instance`, `google_storage_bucket`, `google_sql_database_instance`), not APIs. The enablement of a public API can be brought into state by importing `google_project_service` (for example `terraform import google_project_service.my_api projects/your-gcp-project-id/services/compute.googleapis.com`).
- Import uses the `terraform import` command or `import` blocks (Terraform 1.5+).
- Source: https://docs.cloud.google.com/docs/terraform/understanding-apis-and-terraform (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [import.md](./import.md)
- [basic-commands.md](./basic-commands.md)
