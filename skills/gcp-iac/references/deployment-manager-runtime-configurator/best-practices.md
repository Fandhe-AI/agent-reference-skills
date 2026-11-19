---
source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert/best-practices
---

# Best Practices for Converting to Terraform

After DM Convert produces Terraform, move state to Cloud Storage, group resources into modules (custom or published), automate actuation in CI, and keep each root configuration small.

## Signature / Usage

### Create a custom module

Move the resources into a module directory and turn required values into variables.

```hcl
# bq-module/main.tf
resource "google_bigquery_dataset" "bigquerydataset" {
  provider = google-beta

  default_table_expiration_ms = 36000000
  location = "us-west1"
  dataset_id = var.dataset_id
  project = var.project_id
}

resource "google_bigquery_table" "bigquerytable" {
  provider = google-beta

  labels = {
    data-source = "external"
    schema-type = "auto-junk"
  }
  dataset_id = var.dataset_id
  project = var.project_id
  table_id = var.table_id

  depends_on = [
    google_bigquery_dataset.bigquerydataset
  ]
}
```

```hcl
# bq-module/variables.tf
variable "project_id" {
  description = "Project ID"
  type = string
}

variable "dataset_id" {
  description = "Dataset ID"
  type = string
}

variable "table_id" {
  description = "Table ID"
  type = string
}
```

Replace the original configuration in the exported `main.tf`:

```hcl
# main.tf
module "bq" {
  source = "./bq-module"

  project_id = "PROJECT_ID"
  dataset_id = "bigquerydataset"
  table_id   = "bigquerytable"
}
```

Initialize, move the state into the module instance, and check for changes:

```bash
terraform init
```

```bash
terraform state mv google_bigquery_dataset.bigquerydataset module.bq.google_bigquery_dataset.bigquerydataset
terraform state mv google_bigquery_table.bigquerytable module.bq.google_bigquery_table.bigquerytable
```

```text
Move "google_bigquery_dataset.bigquerydataset" to "module.bq.google_bigquery_dataset.bigquerydataset"
Successfully moved 1 object(s).
Move "google_bigquery_table.bigquerytable" to "module.bq.google_bigquery_table.bigquerytable"
Successfully moved 1 object(s).
```

```bash
terraform plan
```

```text
No changes. Your infrastructure matches the configuration.
```

### Use a published module

Official BigQuery module (`terraform-google-modules/terraform-google-bigquery`):

```hcl
module "bq" {
  source  = "terraform-google-modules/bigquery/google"
  version = "~> 5.0"

  project_id          = "PROJECT_ID"
  dataset_id          = "bigquerydataset"
  location            = "us-west1"
  deletion_protection = true

  tables = [
    {
      table_id           = "bigquerytable",
      friendly_name      = "bigquerytable"
      time_partitioning  = null,
      range_partitioning = null,
      expiration_time    = null,
      clustering         = [],
      schema             = null,
      labels = {
        data-source = "external"
        schema-type = "auto-junk"
      },
    }
  ]
}
```

Run `terraform init`, read the module source (v5.4.1 `main.tf`) to find resource addresses, move state, then run `terraform plan`:

```bash
terraform state mv google_bigquery_dataset.bigquerydataset  module.bq.google_bigquery_dataset.main
terraform state mv google_bigquery_table.bigquerytable 'module.bq.google_bigquery_table.main["bigquerytable"]'
```

## Options / Props

| Area | Recommendation |
|------|----------------|
| State | Store remotely in Cloud Storage (distributed collaboration, protect sensitive information, run Terraform in CI); local disk is the Terraform default |
| Modules | Custom module gives most flexibility; for most use cases use a published module from Google Cloud's official modules or the Terraform registry |
| Actuation | Use CI such as Cloud Build, Jenkins or GitHub Actions to run Terraform at scale; the Cloud Build Workspace blueprint (`terraform-google-modules/terraform-google-bootstrap`, module `tf_cloudbuild_workspace`) bootstraps triggers and authentication |
| Structure | Each converted configuration is a single root configuration mapped to one state file; do not keep a large number of resources in one state file; follow the best practices for root modules |

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down."; use Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Preview: subject to the "Pre-GA Offerings Terms".
- The source recommends storing state remotely in Cloud Storage after converting and optionally importing resources (https://docs.cloud.google.com/docs/terraform/resource-management/store-state#change_the_backend_configuration). If the published module has different default settings or is configured differently than your configuration, `terraform plan` might show differences.
- Provider (`provider = google-beta`), module source and `version = "~> 5.0"` are copied as written. `deletion_protection = true` is set in the published-module example.
- Terraform CLI and HCL behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert/best-practices (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [convert.md](./convert.md)
- [dm-convert.md](./dm-convert.md)
