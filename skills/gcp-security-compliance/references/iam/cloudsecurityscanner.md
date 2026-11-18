---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecurityscanner
---

# Web Security Scanner IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudsecurityscanner` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Web Security Scanner Admin (`roles/cloudsecurityscanner.admin`)

- Full access to all Web Security Scanner resources
- Permissions (30): `appengine.applications.get`, `cloudsecurityscanner.crawledurls.list`, `cloudsecurityscanner.results.get`, `cloudsecurityscanner.results.list`, `cloudsecurityscanner.scanruns.get`, `cloudsecurityscanner.scanruns.getSummary`, `cloudsecurityscanner.scanruns.list`, `cloudsecurityscanner.scanruns.stop`, `cloudsecurityscanner.scans.create`, `cloudsecurityscanner.scans.delete`, `cloudsecurityscanner.scans.get`, `cloudsecurityscanner.scans.list`, `cloudsecurityscanner.scans.run`, `cloudsecurityscanner.scans.update`, `compute.addresses.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Web Security Scanner Editor (`roles/cloudsecurityscanner.editor`)

- Full access to all Web Security Scanner resources Lowest-level resources where you can grant this role: - Project
- Permissions (30): `appengine.applications.get`, `cloudsecurityscanner.crawledurls.list`, `cloudsecurityscanner.results.get`, `cloudsecurityscanner.results.list`, `cloudsecurityscanner.scanruns.get`, `cloudsecurityscanner.scanruns.getSummary`, `cloudsecurityscanner.scanruns.list`, `cloudsecurityscanner.scanruns.stop`, `cloudsecurityscanner.scans.create`, `cloudsecurityscanner.scans.delete`, `cloudsecurityscanner.scans.get`, `cloudsecurityscanner.scans.list`, `cloudsecurityscanner.scans.run`, `cloudsecurityscanner.scans.update`, `compute.addresses.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Web Security Scanner Viewer (`roles/cloudsecurityscanner.viewer`)

- Read access to all Web Security Scanner resources Lowest-level resources where you can grant this role: - Project
- Permissions (21): `cloudsecurityscanner.crawledurls.list`, `cloudsecurityscanner.results.get`, `cloudsecurityscanner.results.list`, `cloudsecurityscanner.scanruns.get`, `cloudsecurityscanner.scanruns.getSummary`, `cloudsecurityscanner.scanruns.list`, `cloudsecurityscanner.scans.get`, `cloudsecurityscanner.scans.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Web Security Scanner Runner (`roles/cloudsecurityscanner.runner`)

- Read access to Scan and ScanRun, plus the ability to start scans Lowest-level resources where you can grant this role: - Project
- Permissions (7): `cloudsecurityscanner.crawledurls.list`, `cloudsecurityscanner.scanruns.get`, `cloudsecurityscanner.scanruns.list`, `cloudsecurityscanner.scanruns.stop`, `cloudsecurityscanner.scans.get`, `cloudsecurityscanner.scans.list`, `cloudsecurityscanner.scans.run`

#### Cloud Web Security Scanner Service Agent (`roles/websecurityscanner.serviceAgent`)

- Gives the Cloud Web Security Scanner service account access to compute engine details and app engine details. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (10): `appengine.applications.get`, `cloudasset.assets.listResource`, `compute.addresses.list`, `compute.backendServices.get`, `compute.forwardingRules.get`, `compute.globalForwardingRules.get`, `compute.sslCertificates.list`, `compute.targetHttpProxies.get`, `compute.targetHttpsProxies.get`, `compute.urlMaps.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudsecurityscanner.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudsecurityscanner.crawledurls.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecurityscanner.results.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecurityscanner.results.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecurityscanner.scanruns.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecurityscanner.scanruns.getSummary` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecurityscanner.scanruns.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecurityscanner.scanruns.stop` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/securitycenter.adminEditor` |
| `cloudsecurityscanner.scans.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/securitycenter.admin`, `roles/securitycenter.adminEditor` |
| `cloudsecurityscanner.scans.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/securitycenter.admin`, `roles/securitycenter.adminEditor` |
| `cloudsecurityscanner.scans.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+2 service agent roles) |
| `cloudsecurityscanner.scans.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/cloudsecurityscanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/iam.securityAuditor`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `cloudsecurityscanner.scans.run` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/securitycenter.admin`, `roles/cloudsecurityscanner.runner`, `roles/securitycenter.adminEditor` |
| `cloudsecurityscanner.scans.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/securitycenter.admin`, `roles/securitycenter.adminEditor` |

## Notes

- Roles and permissions of the `cloudsecurityscanner` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecurityscanner (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
