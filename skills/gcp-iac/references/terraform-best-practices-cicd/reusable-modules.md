---
source: https://docs.cloud.google.com/docs/terraform/best-practices/reusable-modules
---

# Terraform on Google Cloud: Reusable Modules Best Practices

Guidelines for authoring and consuming reusable (shared) Terraform modules on Google Cloud.

## Signature / Usage

### Activate required APIs

Modules can activate required services with the `google_project_service` resource or the `project_services` module.

```hcl
module "project-services" {
  source  = "terraform-google-modules/project-factory/google//modules/project_services"
  version = "~> 12.0"

  project_id  = var.project_id
  enable_apis = var.enable_apis

  activate_apis = [
    "compute.googleapis.com",
    "pubsub.googleapis.com",
  ]
  disable_services_on_destroy = false
}
```

### Pin a module to the major version

```hcl
module "gke" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  version = "~> 20.0"
}
```

### Declare minimum provider versions (no provider or backend configuration)

```hcl
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0.0"
    }
  }
}
```

### Expose labels as a variable

Adapted (not in the official docs): `type        = "map"` is written as `type        = map(string)`.

```hcl
variable "labels" {
  description = "A map of labels to apply to contained resources."
  default     = {}
  type        = map(string)
}
```

## Options / Props

| Topic | Rule |
|-------|------|
| API activation in a module | Must be disableable through an `enable_apis` variable that defaults to `true` |
| `disable_services_on_destroy` | Must be `false` when a module activates APIs (it can cause issues with multiple instances of the module) |
| Ownership | Shared modules include an `OWNERS` file (or `CODEOWNERS` on GitHub); an owner approves each pull request before merge |
| Versioning | Follow SemVer v2.0.0 when tagging or releasing; consumers pin to the major version with a version constraint |
| Providers and backends | Shared modules must not configure providers or backends; root modules do; modules set minimum versions in `required_providers` |
| Outputs | For every resource in a shared module, include at least one output that references it |
| Inline submodules | Place in `modules/$modulename`; treat as private unless the module documentation says otherwise |

## Notes

- Including API activation makes demonstrations easier.
- Corrected from the official docs: the `labels` sample has `type        = "map"`, a quoted type constraint. Terraform's v0.15 upgrade guide: "In variable declaration blocks, the type argument previously accepted v0.11-style type constraints given as quoted strings. This legacy syntax is removed in Terraform v0.15." It also says to give `list` and `map` an element type, usually `string` (`type = map(string)`) (https://developer.hashicorp.com/terraform/language/v1.1.x/upgrade-guides/0-15, retrieved 2026-11-19). The general style and structure page writes unquoted types (`type        = list`).
- Unless proven otherwise, assume that new provider versions will work.
- Without any outputs, users cannot properly order your module in relation to their Terraform configurations.
- Terraform does not track refactored resources: moving resources from the top-level module into submodules makes Terraform try to recreate them. Use `moved` blocks when refactoring.
- Outputs defined by internal modules are not automatically exposed; re-export them.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/reusable-modules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-style-structure.md](./general-style-structure.md)
- [root-modules.md](./root-modules.md)
- [dependency-management.md](./dependency-management.md)
