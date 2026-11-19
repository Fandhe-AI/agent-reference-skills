---
source: https://docs.cloud.google.com/docs/terraform/best-practices/dependency-management
---

# Terraform on Google Cloud: Dependency Management

Recommendations for expressing dependencies between resources: prefer implicit dependencies (expression references) over explicit `depends_on`, and reference output attributes (values not yet known) so Terraform waits for the upstream resource.

## Signature / Usage

### Favor implicit over explicit dependencies

Not recommended (explicit dependency):

```hcl
module "project_services" {
  source  = "terraform-google-modules/project-factory/google//modules/project_services"
  version = "~> 14.4"

  project_id = var.project_id
  activate_apis = [
    "bigquery.googleapis.com",
    "bigquerystorage.googleapis.com",
  ]
}

module "bigquery" {
  source       = "terraform-google-modules/bigquery/google"
  version      = "~> 5.4"

  dataset_id   = "demo_dataset"
  dataset_name = "demo_dataset"
  project_id   = var.project_id
  depends_on = [module.project_services] # <- explicit dependency
}
```

Recommended (implicit dependency):

```hcl
module "bigquery" {
  source       = "terraform-google-modules/bigquery/google"
  version      = "~> 5.4"

  dataset_id   = "demo_dataset"
  dataset_name = "demo_dataset"
  project_id   = module.project_services.project_id # <- implicit dependency
}
```

### Reference output attributes

Not recommended (`name` is an input argument with a known value at plan time, so no wait is created):

```hcl
# Cloud Storage bucket
resource "google_storage_bucket" "bucket" {
  name = "demo-bucket"
  location = "US"
}

resource "google_storage_bucket_object" "bucket_object" {
  name   = "demo-object"
  source = "./test.txt"
  bucket = google_storage_bucket.bucket.name # name is an input argument
}
```

Recommended (`id` is an output attribute, set only after the bucket is created):

```hcl
resource "google_storage_bucket_object" "bucket_object" {
  name   = "demo-object"
  source = "./test.txt"
  bucket = google_storage_bucket.bucket.id # id is an output attribute
}
```

### When no output attribute fits

Not recommended (Terraform reads the file during planning, before it exists, and fails with `no such file or directory`):

```hcl
resource "local_file" "generated_file" {
 filename = "./generated_file.text"
 content = templatefile("./template.tftpl", {
   project_id = var.project_id
 })
}

module "module_a" {
 source = "./modules/module-a"
 root_config_file_path = local_file.generated_file.filename
}
```

Recommended (explicit dependency, with a comment saying why):

```hcl
module "module_a" {
 source = "./modules/module-a"
 root_config_file_path = local_file.generated_file.filename
 depends_on = [local_file.generated_file] # waiting for generated_file to be created
}
```

## Notes

- Implicit dependencies let Terraform track the specific fields involved, which often gives more efficient plans for updates and replacements. Explicit dependencies carry less information, so Terraform plans more conservatively.
- Use `depends_on` only as a last resort when a dependency is hidden and cannot be expressed implicitly; add a comment on why it is needed.
- Source inconsistency: the prose before the recommended sample says the object "must reference the `id` output attribute of the `google_storage_bucket_object` resource", while the sample references `google_storage_bucket.bucket.id`.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/dependency-management (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-style-structure.md](./general-style-structure.md)
- [cross-config-communication.md](./cross-config-communication.md)
- [working-with-resources.md](./working-with-resources.md)
