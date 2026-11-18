---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/ondemandscanning
---

# On-Demand Scanning API IAM roles and permissions

## Signature / Usage

Predefined roles of `ondemandscanning` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### On-Demand Scanning Admin (`roles/ondemandscanning.admin`)

- Launch stage: Beta
- All permissions for On-Demand Scanning
- Permissions (8): `ondemandscanning.operations.cancel`, `ondemandscanning.operations.delete`, `ondemandscanning.operations.get`, `ondemandscanning.operations.list`, `ondemandscanning.operations.wait`, `ondemandscanning.scans.analyzePackages`, `ondemandscanning.scans.listVulnerabilities`, `ondemandscanning.scans.scan`

#### On-Demand Scanning Viewer (`roles/ondemandscanning.viewer`)

- Launch stage: Beta
- Viewer role for On-Demand Scanning
- Permissions (6): `ondemandscanning.operations.get`, `ondemandscanning.operations.list`, `ondemandscanning.operations.wait`, `ondemandscanning.scans.listVulnerabilities`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/ondemandscanning.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `ondemandscanning.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ondemandscanning.admin` |
| `ondemandscanning.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ondemandscanning.admin` |
| `ondemandscanning.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/ondemandscanning.admin`, `roles/ondemandscanning.viewer`, `roles/iam.supportUser` |
| `ondemandscanning.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/ondemandscanning.admin`, `roles/ondemandscanning.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `ondemandscanning.operations.wait` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/ondemandscanning.admin`, `roles/ondemandscanning.viewer`, `roles/iam.supportUser` |
| `ondemandscanning.scans.analyzePackages` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ondemandscanning.admin` |
| `ondemandscanning.scans.listVulnerabilities` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/ondemandscanning.admin`, `roles/ondemandscanning.viewer`, `roles/iam.supportUser` |
| `ondemandscanning.scans.scan` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ondemandscanning.admin` |

## Notes

- Roles and permissions of the `ondemandscanning` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/ondemandscanning (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
