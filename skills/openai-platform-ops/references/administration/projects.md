# Projects

Projects are workspaces that scope API keys, files, service accounts, rate limits, spend alerts, and model/tool/data-retention controls. Model access and data retention are configured per project through the Administration API.

## Signature / Usage

Restrict model access for a project (allowlist/denylist):

```python
model_permissions = client.admin.organization.projects.model_permissions.update(
    "proj_abc",
    mode="allow_list",
    model_ids=["gpt-4.1", "o3"],
)

print(model_permissions.mode)
```

Set project data retention:

```python
data_retention = client.admin.organization.projects.data_retention.update(
    "proj_abc",
    retention_type="organization_default",
)

print(data_retention.type)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| mode | `allow_list` \| `deny_list` | Whether `model_ids` allows only listed models or blocks them |
| model_ids | string[] | Model IDs, must be visible to the organization (including fine-tuned snapshots) |
| retention_type | string | `organization_default` inherits the org policy; other values set a project-specific override |

## Notes

- Requires an Admin API key.
- Service tier restrictions (changelog 2026-10-21): project settings in Platform settings choose which service tiers a project can use, and organization settings can restrict service tiers for all projects (projects cannot enable tiers blocked by the organization). A request that selects or resolves to a disallowed tier fails with `400 invalid_request_error`, `error.param` = `service_tier`, message "Invalid `service_tier` argument: The requested service tier is not allowed for this project." Restrictions apply to the `default`, `flex` and `priority` tiers; the `fast` tier is evaluated as `priority`; requests that omit `service_tier` or set `auto` can also fail if they resolve to a disallowed tier; Scale Tier is outside this policy. No Administration API endpoint for these settings is documented in the sources above.
- Source: https://developers.openai.com/api/docs/guides/error-codes and https://developers.openai.com/api/docs/changelog (fetched 2026-11-14).
- Full endpoint reference (Projects subresource): [Administration API reference](https://developers.openai.com/api/reference/administration/overview).
- Related project-level controls (rate limits, spend alerts, hosted tools) are more fully documented via the Terraform guides, which expose the same Administration API through `openai_project_*` resources.

## Related

- [Spend Limits and Alerts](./spend-limits-and-alerts.md)
- [Terraform: Project Controls](./terraform-project-controls.md)
- [RBAC](./rbac.md)
