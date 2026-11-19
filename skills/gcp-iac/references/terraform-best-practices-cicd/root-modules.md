---
source: https://docs.cloud.google.com/docs/terraform/best-practices/root-modules
---

# Terraform on Google Cloud: Root Modules Best Practices

Guidelines for root configurations (root modules): the working directories from which you run the Terraform CLI. Explicit root module recommendations supersede the general guidelines.

## Signature / Usage

### Environment directory layout

Split a service into a `modules` directory (the actual configuration) and an `environments` directory (one root configuration per environment).

```text
-- SERVICE-DIRECTORY/
   -- OWNERS
   -- modules/
      -- <service-name>/
         -- main.tf
         -- variables.tf
         -- outputs.tf
         -- provider.tf
         -- README
      -- ...other...
   -- environments/
      -- dev/
         -- backend.tf
         -- main.tf

      -- qa/
         -- backend.tf
         -- main.tf

      -- prod/
         -- backend.tf
         -- main.tf
```

### Re-export a child module

```hcl
output "service" {
  value       = module.service
  description = "The service module outputs"
}
```

### Expose outputs through remote state

Project root module (fragment; the source elides the module arguments):

```text
# Project root module
terraform {
  backend "gcs" {
    bucket  = "BUCKET"
  }
}

module "project" {
  source  = "terraform-google-modules/project-factory/google"
  ...
}

output "project_id" {
  value       = module.project.project_id
  description = "The ID of the created project"
}
```

Networks root module reading that output (fragment):

```text
# Networks root module
data "terraform_remote_state" "network_project" {
  backend = "gcs"

  config = {
    bucket = "BUCKET"
  }
}

module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "~> 9.0"

  project_id   = data.terraform_remote_state.network_project.outputs.project_id
  network_name = "vpc-1"
  ...
}
```

### Pin to minor provider versions

```hcl
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0.0"
    }
  }
}
```

## Options / Props

| Topic | Rule |
|-------|------|
| Resources per root module | Do not include more than 100 resources (ideally only a few dozen) in a single state; all resources in a root configuration are refreshed on every run |
| Applications | One Terraform directory per application or project (a service may be a common service such as shared networking); nest all code for a service under one directory |
| Environment directory files | `backend.tf` (declares the state backend, typically Cloud Storage) and `main.tf` (instantiates the service module) |
| Service modules | Hard-code common inputs; require only environment-specific inputs as variables |
| Workspaces | Each environment directory (`dev`, `qa`, `prod`) corresponds to a default Terraform workspace; use only the default workspace |
| Versions file | Name it `versions.tf`; pin each provider to a minor version |
| Variables file | Provide variables in `terraform.tfvars`; do not use alternative `var-files` or `var='key=val'` command-line options |
| Dependency lock file | Check `.terraform.lock.hcl` into source control |

## Notes

- Multiple CLI workspaces within an environment are not recommended: each workspace's configuration is hard to inspect; a single shared backend for multiple workspaces becomes a single point of failure if used for environment separation; code becomes harder to read when it switches on `terraform.workspace == "foo" ? this : that`.
- Command-line variable options are ephemeral and easy to forget; a default variables file is more predictable.
- Other Terraform environments and applications can reference root module-level outputs only.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/root-modules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-style-structure.md](./general-style-structure.md)
- [reusable-modules.md](./reusable-modules.md)
- [cross-config-communication.md](./cross-config-communication.md)
