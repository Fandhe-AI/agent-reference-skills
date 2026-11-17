---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights
---

# Storage Insights IAM roles and permissions

## Signature / Usage

Predefined roles of `storageinsights` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Storage Insights Admin (`roles/storageinsights.admin`)

- Full access to Storage Insights resources.
- Permissions (22): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storageinsights.datasetConfigs.create`, `storageinsights.datasetConfigs.delete`, `storageinsights.datasetConfigs.get`, `storageinsights.datasetConfigs.linkDataset`, `storageinsights.datasetConfigs.list`, `storageinsights.datasetConfigs.unlinkDataset`, `storageinsights.datasetConfigs.update`, `storageinsights.locations.get`, `storageinsights.locations.list`, `storageinsights.operations.cancel`, `storageinsights.operations.delete`, `storageinsights.operations.get`, `storageinsights.operations.list`, `storageinsights.reportConfigs.create`, `storageinsights.reportConfigs.delete`, `storageinsights.reportConfigs.get`, `storageinsights.reportConfigs.list`, `storageinsights.reportConfigs.update`, `storageinsights.reportDetails.get`, `storageinsights.reportDetails.list`

#### Storage Insights Viewer (`roles/storageinsights.viewer`)

- Read-only access to Storage Insights resources.
- Permissions (12): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storageinsights.datasetConfigs.get`, `storageinsights.datasetConfigs.list`, `storageinsights.locations.get`, `storageinsights.locations.list`, `storageinsights.operations.get`, `storageinsights.operations.list`, `storageinsights.reportConfigs.get`, `storageinsights.reportConfigs.list`, `storageinsights.reportDetails.get`, `storageinsights.reportDetails.list`

#### Storage Insights Analyst (`roles/storageinsights.analyst`)

- Data access to Storage Insights.
- Permissions (14): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storageinsights.datasetConfigs.get`, `storageinsights.datasetConfigs.linkDataset`, `storageinsights.datasetConfigs.list`, `storageinsights.datasetConfigs.unlinkDataset`, `storageinsights.locations.get`, `storageinsights.locations.list`, `storageinsights.operations.get`, `storageinsights.operations.list`, `storageinsights.reportConfigs.get`, `storageinsights.reportConfigs.list`, `storageinsights.reportDetails.get`, `storageinsights.reportDetails.list`

#### StorageInsights Service Agent (`roles/storageinsights.serviceAgent`)

- Permissions for Insights to write reports into customer project > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `bigquery.datasets.create`, `serviceusage.services.use`, `storageinsights.reportDetails.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/storageinsights.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `storageinsights.datasetConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.datasetConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.datasetConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.datasetConfigs.linkDataset` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin`, `roles/storageinsights.analyst` |
| `storageinsights.datasetConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storageinsights.analyst`, `roles/wiz.cloudInventoryViewer` |
| `storageinsights.datasetConfigs.unlinkDataset` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin`, `roles/storageinsights.analyst` |
| `storageinsights.datasetConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storageinsights.analyst`, `roles/wiz.cloudInventoryViewer` |
| `storageinsights.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.reportConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.reportConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin` |
| `storageinsights.reportConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.reportConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.reportConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storageinsights.admin`, `roles/wiz.dataSecurityScanner` |
| `storageinsights.reportDetails.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.supportUser`, `roles/storageinsights.analyst` |
| `storageinsights.reportDetails.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storageinsights.admin`, `roles/storageinsights.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storageinsights.analyst` (+1 service agent role) |

## Notes

- Roles and permissions of the `storageinsights` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
