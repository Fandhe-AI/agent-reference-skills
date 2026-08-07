# Terraform: Projects and Access

Create an OpenAI project and establish reusable, least-privilege access controls: a project role, an organization group, and the group-to-role assignment that grants access.

## Signature / Usage

```terraform
resource "openai_project" "application" {
  name = "example-application-development"
}

resource "openai_project_role" "application" {
  project_id  = openai_project.application.project_id
  role_name   = "Application API access"
  description = "Permissions approved for this application"
  permissions = ["api.webhooks.read"]
}

resource "openai_group" "application_access" {
  name = "example-application-development-access"
}

resource "openai_project_group_role" "application_access" {
  project_id = openai_project.application.project_id
  group_id   = openai_group.application_access.group_id
  role_id    = openai_project_role.application.role_id
}

resource "openai_group_user" "application_developer" {
  group_id = openai_group.application_access.group_id
  user_id  = "user_123"
}
```

## Options / Props

| Resource | Description |
|----------|-------------|
| `openai_project` | Creates the project boundary; destroying it archives (does not delete) the project |
| `openai_project_role` | Defines a least-privilege permission bundle scoped to a project |
| `openai_group` | Organization-level collection of identities, reusable across projects |
| `data.openai_group` | Reads (without owning) an existing/SCIM-managed group |
| `openai_project_group_role` | Assigns a project role to a group |
| `openai_group_user` | Adds a user or service account to a group |
| `openai_project_user_role` | Direct role assignment when group-based access isn't appropriate |
| `openai_role` / `openai_user_role` | Organization-level role and its direct user assignment |

## Notes

- Data sources `openai_user_roles` / `openai_project_user_roles` let you inspect current assignments before changing access.
- Removing an assignment resource proposes deleting the remote assignment on the next plan; for pre-existing (non-Terraform-created) assignments, import first, confirm a no-op plan, then remove.
- To remove an existing default assignment not yet in Terraform state, import it first, then remove and apply the destroy plan.

## Related

- [Terraform Provider](./terraform-provider.md)
- [Terraform: Service Accounts](./terraform-service-accounts.md)
- [Terraform: Import and Reconcile](./terraform-import-and-reconcile.md)
- [RBAC](./rbac.md)
