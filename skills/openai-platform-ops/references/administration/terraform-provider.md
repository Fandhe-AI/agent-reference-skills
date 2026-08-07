# Terraform Provider

The official [OpenAI Terraform provider](https://github.com/openai/terraform-provider-openai) manages OpenAI organization resources (projects, users, groups, roles, service accounts, certificates, rate limits, spend alerts, project settings) as infrastructure as code, using the Administration API.

## Signature / Usage

```terraform
terraform {
  required_version = ">= 1.0"

  required_providers {
    openai = {
      source  = "openai/openai"
      version = ">= 1.0.0"
    }
  }
}

provider "openai" {}

resource "openai_project" "example" {
  name = "terraform-managed"
}

output "project_id" {
  value = openai_project.example.project_id
}
```

```bash
export OPENAI_ADMIN_KEY="<your-admin-api-key>"
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| OPENAI_ADMIN_KEY | env var | Admin API key the provider reads by default |
| OPENAI_ORG_ID | env var | Optional; sets the `OpenAI-Organization` header |
| OPENAI_PROJECT_ID | env var | Optional; sets the `OpenAI-Project` header |

## Notes

- Requires Terraform 1.0+ (import blocks require 1.5+) and an Admin API key.
- Don't commit the Admin API key to configuration or source control; use an environment variable or secrets manager.
- Commit `.terraform.lock.hcl` so future runs select the same provider version.
- Full argument/import-format reference: [provider registry docs](https://registry.terraform.io/providers/openai/openai/latest/docs).

## Related

- [Terraform: Projects and Access](./terraform-projects-and-access.md)
- [Terraform: Service Accounts](./terraform-service-accounts.md)
- [Terraform: Rate Limits and Spend](./terraform-rate-limits-and-spend.md)
- [Terraform: Project Controls](./terraform-project-controls.md)
- [Terraform: Import and Reconcile](./terraform-import-and-reconcile.md)
