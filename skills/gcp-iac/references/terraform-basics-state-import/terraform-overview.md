---
source: https://docs.cloud.google.com/docs/terraform/terraform-overview
---

# Overview of Terraform on Google Cloud

HashiCorp Terraform is an IaC tool that provisions and manages cloud infrastructure through plugins called providers. The Terraform provider for Google Cloud provisions and manages Google Cloud infrastructure.

## Signature / Usage

### Workflow

1. Describe the infrastructure in a Terraform configuration file.
2. Run `terraform plan` to evaluate the configuration and generate an execution plan.
3. Run `terraform apply` to provision through Google Cloud APIs and create the state file.

```bash
terraform plan
```

On later `terraform apply` runs, Terraform compares the state file with the configuration: a resource missing from state is created; a resource whose configuration differs is updated; a matching resource is left unchanged.

## Options / Props

### Google Cloud providers

| Provider | Use |
|----------|-----|
| `google` | Provision and manage Google Cloud APIs. |
| `google-beta` | Provision and manage Google Cloud beta APIs. |

## Notes

- The Terraform state file is a JSON-formatted mapping of resources in the configuration file to real-world resources.
- `google` and `google-beta` are developed with Magic Modules, a single codebase that generates both providers.
- Modules are reusable; Google Cloud publishes opinionated deployable modules as blueprints and getting-started examples as Jump Start Solutions.
- Terraform CLI and HCL themselves behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Snippet taken from https://docs.cloud.google.com/docs/terraform/basic-commands (the source page itself has no code block).
- Source: https://docs.cloud.google.com/docs/terraform/terraform-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [iac-overview.md](./iac-overview.md)
- [basic-commands.md](./basic-commands.md)
- [terraform-blueprints.md](./terraform-blueprints.md)
- [store-state.md](./store-state.md)
