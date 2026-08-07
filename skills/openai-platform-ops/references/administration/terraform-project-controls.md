# Terraform: Project Controls

Apply model access, hosted-tool, and data-retention controls to an existing project. These controls limit what a project's workloads can use; they don't grant access to the project itself.

## Signature / Usage

```terraform
resource "openai_project_model_permissions" "application" {
  project_id = "proj_123"
  mode       = "allow_list"
  model_ids  = ["gpt-5.4-mini"]
}

resource "openai_project_hosted_tool_permissions" "application" {
  project_id               = "proj_123"
  file_search_enabled      = true
  web_search_enabled       = false
  image_generation_enabled = false
  mcp_enabled              = false
  code_interpreter_enabled = true
}

resource "openai_project_data_retention" "application" {
  project_id = "proj_123"
  type       = "organization_default"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| mode | `allow_list` \| `deny_list` | Model permission mode |
| file_search_enabled / web_search_enabled / image_generation_enabled / mcp_enabled / code_interpreter_enabled | boolean | Five project-level hosted-tool toggles; all five must be set |
| type (data retention) | string | `organization_default`, `none`, `zero_data_retention`, `modified_abuse_monitoring`, `enhanced_zero_data_retention`, `enhanced_modified_abuse_monitoring` |

## Notes

- A project can disable a hosted tool only if the organization-level policy for that tool is already "allow selected projects" — a project can't disable a tool the org has enabled for every project.
- Available data-retention modes and permitted transitions depend on the organization's configuration and the project's data-residency region.
- `openai_organization_data_retention` changes an existing org-level setting; it does not enroll the org in a retention program.
- Removal behavior differs by resource: removing `openai_project_model_permissions` deletes the project's model-permission configuration; removing hosted-tool-permissions or data-retention resources drops them from state but leaves remote settings unchanged.
- Use `terraform plan -detailed-exitcode` to detect drift (`0` = no changes, `2` = changes, `1` = error).

## Related

- [Projects](./projects.md)
- [Terraform: Rate Limits and Spend](./terraform-rate-limits-and-spend.md)
