---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/workloadcertificate
---

# Workload Certificate IAM roles and permissions

## Signature / Usage

Predefined roles of `workloadcertificate` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Workload Certificate Admin (`roles/workloadcertificate.admin`)

- Launch stage: Beta
- Full access to all Workload Certificate API resources.
- Permissions (15): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadcertificate.locations.get`, `workloadcertificate.locations.list`, `workloadcertificate.operations.cancel`, `workloadcertificate.operations.delete`, `workloadcertificate.operations.get`, `workloadcertificate.operations.list`, `workloadcertificate.workloadCertificateFeature.get`, `workloadcertificate.workloadCertificateFeature.update`, `workloadcertificate.workloadRegistrations.create`, `workloadcertificate.workloadRegistrations.delete`, `workloadcertificate.workloadRegistrations.get`, `workloadcertificate.workloadRegistrations.list`, `workloadcertificate.workloadRegistrations.update`

### Workload Certificate Viewer (`roles/workloadcertificate.viewer`)

- Launch stage: Beta
- Read-only access to Workload Certificate all resources.
- Permissions (9): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadcertificate.locations.get`, `workloadcertificate.locations.list`, `workloadcertificate.operations.get`, `workloadcertificate.operations.list`, `workloadcertificate.workloadCertificateFeature.get`, `workloadcertificate.workloadRegistrations.get`, `workloadcertificate.workloadRegistrations.list`

### Workload Certificate Registration Admin (`roles/workloadcertificate.registrationAdmin`)

- Launch stage: Beta
- Full access to WorkloadRegistration resources.
- Permissions (13): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadcertificate.locations.get`, `workloadcertificate.locations.list`, `workloadcertificate.operations.cancel`, `workloadcertificate.operations.delete`, `workloadcertificate.operations.get`, `workloadcertificate.operations.list`, `workloadcertificate.workloadRegistrations.create`, `workloadcertificate.workloadRegistrations.delete`, `workloadcertificate.workloadRegistrations.get`, `workloadcertificate.workloadRegistrations.list`, `workloadcertificate.workloadRegistrations.update`

### Workload Certificate Registration Viewer (`roles/workloadcertificate.registrationViewer`)

- Launch stage: Beta
- Read-only access to WorkloadRegistration resources.
- Permissions (8): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadcertificate.locations.get`, `workloadcertificate.locations.list`, `workloadcertificate.operations.get`, `workloadcertificate.operations.list`, `workloadcertificate.workloadRegistrations.get`, `workloadcertificate.workloadRegistrations.list`

### Workload Certificate Service Agent (`roles/workloadcertificate.serviceAgent`)

- Gives the Workload Certificate service agent access to Cloud Platform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (24): `container.clusterRoleBindings.get`, `container.clusterRoleBindings.list`, `container.clusters.get`, `container.clusters.update`, `container.customResourceDefinitions.create`, `container.customResourceDefinitions.get`, `container.customResourceDefinitions.list`, `container.operations.get`, `container.thirdPartyObjects.update`, `gkehub.features.get`, `gkehub.fleet.create`, `gkehub.fleet.get`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.get`, `gkehub.memberships.list`, `gkehub.operations.get`, `serviceconsumermanagement.tenancyu.addResource`, `serviceconsumermanagement.tenancyu.create`, `serviceconsumermanagement.tenancyu.delete`, `serviceconsumermanagement.tenancyu.removeResource`, `serviceusage.services.use`, `workloadcertificate.workloadCertificateFeature.get`, `workloadcertificate.workloadRegistrations.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/workloadcertificate.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `workloadcertificate.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.supportUser`, `roles/workloadcertificate.registrationAdmin`, `roles/workloadcertificate.registrationViewer` (+1 service agent role) |
| `workloadcertificate.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadcertificate.registrationAdmin`, `roles/workloadcertificate.registrationViewer` (+1 service agent role) |
| `workloadcertificate.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.registrationAdmin` |
| `workloadcertificate.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.registrationAdmin` |
| `workloadcertificate.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.supportUser`, `roles/workloadcertificate.registrationAdmin`, `roles/workloadcertificate.registrationViewer` (+1 service agent role) |
| `workloadcertificate.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadcertificate.registrationAdmin`, `roles/workloadcertificate.registrationViewer` |
| `workloadcertificate.workloadCertificateFeature.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `workloadcertificate.workloadCertificateFeature.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadcertificate.admin` |
| `workloadcertificate.workloadRegistrations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.registrationAdmin` (+1 service agent role) |
| `workloadcertificate.workloadRegistrations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.registrationAdmin` |
| `workloadcertificate.workloadRegistrations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.supportUser`, `roles/workloadcertificate.registrationAdmin`, `roles/workloadcertificate.registrationViewer` (+1 service agent role) |
| `workloadcertificate.workloadRegistrations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadcertificate.registrationAdmin`, `roles/workloadcertificate.registrationViewer` (+2 service agent roles) |
| `workloadcertificate.workloadRegistrations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadcertificate.admin`, `roles/workloadcertificate.registrationAdmin` |

## Notes

- Roles and permissions of the `workloadcertificate` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/workloadcertificate (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
