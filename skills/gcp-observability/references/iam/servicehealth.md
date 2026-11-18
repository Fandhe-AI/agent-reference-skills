---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicehealth
---

# Personalized Service Health IAM roles and permissions

## Signature / Usage

Predefined roles of `servicehealth` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Servicehealth Admin (`roles/servicehealth.admin`)

- Admin role for servicehealth
- Permissions (13): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicehealth.artifacts.get`, `servicehealth.artifacts.list`, `servicehealth.events.get`, `servicehealth.events.list`, `servicehealth.locations.get`, `servicehealth.locations.list`, `servicehealth.organizationEvents.get`, `servicehealth.organizationEvents.list`, `servicehealth.organizationImpacts.get`, `servicehealth.organizationImpacts.list`, `servicehealth.statuses.get`

#### Personalized Service Health Viewer (`roles/servicehealth.viewer`)

- Readonly access to Personalized Service Health resources.
- Permissions (13): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicehealth.artifacts.get`, `servicehealth.artifacts.list`, `servicehealth.events.get`, `servicehealth.events.list`, `servicehealth.locations.get`, `servicehealth.locations.list`, `servicehealth.organizationEvents.get`, `servicehealth.organizationEvents.list`, `servicehealth.organizationImpacts.get`, `servicehealth.organizationImpacts.list`, `servicehealth.statuses.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/servicehealth.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `servicehealth.artifacts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `servicehealth.artifacts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `servicehealth.events.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `servicehealth.events.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `servicehealth.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `servicehealth.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `servicehealth.organizationEvents.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `servicehealth.organizationEvents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `servicehealth.organizationImpacts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `servicehealth.organizationImpacts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `servicehealth.statuses.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicehealth.admin`, `roles/servicehealth.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `servicehealth` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicehealth (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
