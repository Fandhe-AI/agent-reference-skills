---
source: https://docs.cloud.google.com/docs/terraform/best-practices/dependency-management
---

# Terraform on Google Cloud: Dependency Management

Recommendations for expressing dependencies between resources: prefer implicit dependencies (expression references) over explicit `depends_on`, and reference output attributes (values not yet known) of the upstream resource.

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

Not recommended by the source. The source says that referencing `name`, an argument whose value is known at plan time, does not create an implicit dependency; Terraform does create one, because the expression refers to the bucket resource (see Notes):

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

Recommended by the source (`id` is an output attribute, set only after the bucket is created):

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
- Corrected from the official docs: the source says that referencing the known `name` argument "doesn't create an implicit dependency", so Terraform "doesn't wait for the `google_storage_bucket` resource to be created". Terraform's documentation says otherwise: "Terraform analyzes these expressions to automatically infer dependencies between objects. For example, an expression in a resource argument that refers to another managed resource creates an implicit dependency between the two resources." (https://developer.hashicorp.com/terraform/language/expressions/references, retrieved 2026-11-19). Both bucket examples therefore make `bucket_object` wait for `bucket`; whether the referenced value is known at plan time does not decide the dependency.
- Caution: the `depends_on` fix covers only what takes part in the dependency graph. If `module_a` reads the path with a function such as `file()` or `templatefile()`, the error remains: "This function can be used only with files that already exist on disk at the beginning of a Terraform run. Functions do not participate in the dependency graph, so this function cannot be used with files that are generated dynamically during a Terraform operation. We do not recommend using dynamic local files in Terraform configurations, but in rare situations where this is necessary you can use the local_file data source to read files while respecting resource dependencies." (https://developer.hashicorp.com/terraform/language/functions/file, retrieved 2026-11-19). Prefer passing the generated value itself to the module instead of a file name.
- Use `depends_on` only as a last resort when a dependency is hidden and cannot be expressed implicitly; add a comment on why it is needed.
- Source inconsistency: the prose before the recommended sample says the object "must reference the `id` output attribute of the `google_storage_bucket_object` resource", while the sample references `google_storage_bucket.bucket.id`.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/dependency-management (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-style-structure.md](./general-style-structure.md)
- [cross-config-communication.md](./cross-config-communication.md)
- [working-with-resources.md](./working-with-resources.md)
