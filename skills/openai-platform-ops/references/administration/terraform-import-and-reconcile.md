# Terraform: Import and Reconcile

Adopt existing OpenAI resources into Terraform state instead of recreating them, read resources owned by other systems via data sources, and detect/reconcile drift.

## Signature / Usage

```terraform
resource "openai_project" "existing" {
  name = "existing-project"
}

import {
  to = openai_project.existing
  id = "proj_123"
}
```

```bash
terraform plan -out=tfplan
terraform show tfplan
terraform apply tfplan
terraform plan   # should report no changes
```

## Options / Props

Common import ID formats:

| Resource | Import ID format |
|----------|-------------------|
| Project | `<project_id>` |
| Organization group | `<group_id>` |
| Project role | `<project_id>/<role_id>` |
| Project service account | `<project_id>/<service_account_id>` |
| Project group role | `<project_id>/<group_id>/<role_id>` |
| Project user role | `<project_id>/<user_id>/<role_id>` |
| Project rate limit | `<project_id>/<rate_limit_id>` |

## Notes

- Requires Terraform 1.5+ for import blocks. Declare the resource with settings matching the remote object *before* importing; the first plan should show no proposed updates.
- The provider can import an existing project service account by ID but has no service-account data source — track project/service-account IDs in your own inventory.
- Removal behavior varies by resource type: `openai_project` archives (irreversible, no restore); `openai_project_service_account` deletes; role/group/membership/assignment resources delete the remote object; `openai_project_model_permissions` deletes the config; rate-limit, hosted-tool-permissions, and data-retention resources are removed from state only, leaving remote settings untouched.
- Use `terraform plan -detailed-exitcode` to detect drift; investigate before overwriting an emergency administrative change.

## Related

- [Terraform Provider](./terraform-provider.md)
- [Terraform: Projects and Access](./terraform-projects-and-access.md)
- [Terraform: Project Controls](./terraform-project-controls.md)
