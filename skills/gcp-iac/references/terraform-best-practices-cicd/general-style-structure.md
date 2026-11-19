---
source: https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure
---

# Terraform on Google Cloud: General Style and Structure

Basic style and structure recommendations for Terraform configurations on Google Cloud. They apply to reusable Terraform modules and to root configurations. The guide is not an introduction to Terraform.

## Signature / Usage

### Standard module structure

- Follow the standard module structure. Start every module with a `main.tf` file, where resources are located by default.
- Include a `README.md` in every module. Put examples in an `examples/` folder, one subdirectory per example, each with a detailed `README.md`.
- Group resources into logically named files such as `network.tf`, `instances.tf` or `loadbalancer.tf`. Do not give every resource its own file (for example, combine `google_dns_managed_zone` and `google_dns_record_set` in `dns.tf`).
- In the module root directory include only `*.tf` and repository metadata files (such as `README.md` and `CHANGELOG.md`). Put other documentation in `docs/`.

### Naming

Recommended:

```hcl
resource "google_compute_instance" "web_server" {
  name = "web-server"
}
```

Not recommended:

```hcl
resource "google_compute_instance" "web-server" {
  name = "web-server"
}
```

Recommended:

```text
resource "google_compute_global_address" "main" { ... }
```

Not recommended:

```text
resource "google_compute_global_address" "main_global_address" { … }
```

### Outputs

Recommended (the output references a resource attribute, which creates an implicit dependency):

```hcl
output "name" {
  description = "Name of instance"
  value       = google_compute_instance.main.name
}
```

Not recommended:

```hcl
output "name" {
  description = "Name of instance"
  value       = var.name
}
```

### Protect stateful resources

For stateful resources such as databases, ensure that deletion protection is enabled:

```hcl
resource "google_sql_database_instance" "main" {
  name = "primary-instance"
  settings {
    tier = "D0"
  }

  lifecycle {
    prevent_destroy = true
  }
}
```

### Conditional resources with `count`

```text
variable "readers" {
  description = "..."
  type        = list
  default     = []
}

resource "resource_type" "reference_name" {
  // Do not create this resource if the list of readers is empty.
  count = length(var.readers) == 0 ? 0 : 1
  ...
}
```

## Options / Props

| Topic | Rule |
|-------|------|
| Object names | Use underscores to delimit words; does not apply to `name` arguments |
| Single resource of its type | Name it `main` |
| Several resources of one type | Give meaningful names (for example `primary`, `secondary`); names are singular and do not repeat the resource type |
| Variables | Declare all in `variables.tf`; descriptive names; must have descriptions and defined types |
| Numeric variables, inputs, locals, outputs | Must be named with units (for example `ram_size_gb`) |
| Storage units | Binary prefixes (powers of 1024): `kibi`, `mebi`, `gibi` |
| Other units | Decimal prefixes (powers of 1000): `kilo`, `mega`, `giga` |
| Boolean variables | Positive names (for example `enable_external_access`) |
| Environment-independent values (for example disk size) | Provide defaults |
| Environment-specific values (for example `project_id`) | No defaults |
| Empty defaults (empty string or list) | Only when empty is a valid preference the underlying APIs do not reject |
| Outputs | Put in `outputs.tf`; meaningful descriptions; document them in `README.md` (auto-generate with terraform-docs) |
| Data sources | Place next to the resources that reference them; move to `data.tf` if there are many |
| Custom scripts | Only when Terraform resources do not support the behavior; document the reason and ideally a deprecation plan; put in `scripts/` |
| Helper scripts not called by Terraform | Put in `helpers/`; document in `README.md`; scripts with arguments need argument checking and `--help` |
| Static files Terraform references but does not execute | Put in `files/`; long HereDocs go in external files loaded with `file()` |
| Files read with `templatefile` | Extension `.tftpl`, placed in `templates/` |
| Formatting | All files must conform to `terraform fmt` |
| Expressions | Never more than one ternary operation on a single line; split with local values |
| Iterated resources | Use `for_each` |
| Publishing | Reusable modules to a module registry; open source modules to the Terraform Registry; private modules to a private registry |

## Notes

- Adding a variable with a default value is backwards-compatible; removing a variable is backwards-incompatible. Expose a variable only with a concrete use case; a literal reused in several places can be a local value.
- Be sparing when using user-specified variables to set `count`. If a resource attribute such as `project_id` feeds `count` and the resource does not yet exist, Terraform cannot generate a plan and reports `value of count cannot be computed`; use a separate `enable_x` variable for the conditional logic.
- Resources created through scripts are not accounted for or managed by Terraform.
- Terraform CLI and HCL themselves behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/general-style-structure (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [reusable-modules.md](./reusable-modules.md)
- [root-modules.md](./root-modules.md)
- [dependency-management.md](./dependency-management.md)
