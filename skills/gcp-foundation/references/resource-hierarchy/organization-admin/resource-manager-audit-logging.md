---
source: https://docs.cloud.google.com/resource-manager/docs/audit-logging
---

# Resource Manager Audit Logging

Cloud Audit Logs for Resource Manager (`cloudresourcemanager.googleapis.com`): which operations write Admin Activity vs Data Access logs, log names, and sample queries.

## Signature / Usage

Audit log names (the part after `/logs/` must be URL-encoded; `/` is `%2F`):

```text
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fpolicy

folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Factivity
folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Fdata_access
folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
folders/FOLDER_ID/logs/cloudaudit.googleapis.com%2Fpolicy

billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Factivity
billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Fdata_access
billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
billingAccounts/BILLING_ACCOUNT_ID/logs/cloudaudit.googleapis.com%2Fpolicy

organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Factivity
organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Fdata_access
organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
organizations/ORGANIZATION_ID/logs/cloudaudit.googleapis.com%2Fpolicy
```

Logs Explorer sample queries:

```sql
log_id("cloudaudit.googleapis.com/activity")
protoPayload.methodName="CreateProject"
resource.labels.project_id="PROJECT_ID"
```

```sql
log_id("cloudaudit.googleapis.com/activity")
protoPayload.methodName:"DeleteProject"
resource.labels.project_id="PROJECT_ID"
```

## Options / Props

| Category | Resource Manager operations (v3 unless noted) |
|----------|-----------------------------------------------|
| Admin Activity (ADMIN_WRITE; cannot be disabled) | `UpdateContactInfo`; `organizations.setIamPolicy`; `folders.create` / `delete` / `move` / `patch` / `setIamPolicy` / `undelete`; `projects.create` / `delete` / `move` / `patch` / `setIamPolicy` / `undelete`; `tagBindings.create` / `delete`; `tagKeys.create` / `delete` / `patch` / `setIamPermissions`; `tagValues.create` / `delete` / `patch` / `setIamPermissions`; plus v2 / v2beta1 / v1beta1 equivalents and v1 `setOrgPolicy` / `clearOrgPolicy` on folders, organizations, projects |
| Data Access (ADMIN_READ; must be explicitly enabled) | `GetContactInfo`; `organizations.get` / `getIamPolicy` / `search`; `folders.get` / `getIamPolicy` / `list` / `search`; `projects.get` / `getIamPolicy` / `list` / `search`; `tagKeys.get` / `getIamPolicy` / `list`; `tagValues.get` / `getIamPolicy` / `list`; v1 `getOrgPolicy` / `getEffectiveOrgPolicy` / `listOrgPolicies` / `listAvailableOrgPolicyConstraints` |
| Data Access under the integrating service | `tagBindings.list`, `effectiveTags.list` (enable ADMIN_READ for the service owning the tagged resource) |
| Data Access under Organization Policy Service | `orgpolicy.policies.getEffectivePolicy` (enable ADMIN_READ for the Organization Policy API) |

Service name: `cloudresourcemanager.googleapis.com`; resource type: `project` for all logs.

## Notes

- `projects.delete` audit logs are written to the project's parent resource, which might not be the organization.
- Tag operations in other services (for example `cloudsql.instances.listEffectiveTags`) are written to the resource's parent and included in Resource Manager audit logs, not in the service's own logs.
- `GetContactInfo` / `UpdateContactInfo` support the GDPR ContactInfo service (EU Representative and Data Protection Officer, edited on the Privacy & Security page).
- The Organization Policy v2 API has its own audit log description (see `orgpolicy.googleapis.com`).
- Source: https://docs.cloud.google.com/resource-manager/docs/audit-logging
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [../organization-policy/audit-logging.md](../organization-policy/audit-logging.md)
- [organization-resource.md](./organization-resource.md)
