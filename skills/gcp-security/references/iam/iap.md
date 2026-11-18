---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/iap
---

# Identity-Aware Proxy IAM roles and permissions

## Signature / Usage

Predefined roles of `iap` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### IAP Policy Admin (`roles/iap.admin`)

- Provides full access to Identity-Aware Proxy resources.
- Permissions (36): `iap.projects.getSettings`, `iap.projects.updateSettings`, `iap.tunnel.getIamPolicy`, `iap.tunnel.setIamPolicy`, `iap.tunnelDestGroups.create`, `iap.tunnelDestGroups.delete`, `iap.tunnelDestGroups.get`, `iap.tunnelDestGroups.getIamPolicy`, `iap.tunnelDestGroups.list`, `iap.tunnelDestGroups.remediate`, `iap.tunnelDestGroups.setIamPolicy`, `iap.tunnelDestGroups.update`, `iap.tunnelInstances.getIamPolicy`, `iap.tunnelInstances.setIamPolicy`, `iap.tunnelLocations.getIamPolicy`, `iap.tunnelLocations.setIamPolicy`, `iap.tunnelZones.getIamPolicy`, `iap.tunnelZones.setIamPolicy`, `iap.tunnelinstances.remediate`, `iap.web.getIamPolicy`, `iap.web.getSettings`, `iap.web.setIamPolicy`, `iap.web.updateSettings`, `iap.webServiceVersions.getIamPolicy`, `iap.webServiceVersions.getSettings`, `iap.webServiceVersions.remediate`, `iap.webServiceVersions.setIamPolicy`, `iap.webServiceVersions.updateSettings`, `iap.webServices.getIamPolicy`, `iap.webServices.getSettings`, `iap.webServices.setIamPolicy`, `iap.webServices.updateSettings`, `iap.webTypes.getIamPolicy`, `iap.webTypes.getSettings`, `iap.webTypes.setIamPolicy`, `iap.webTypes.updateSettings`

#### IAP Policy Editor (`roles/iap.editor`)

- Editor role for IAP
- Permissions (18): `iap.projects.getSettings`, `iap.projects.updateSettings`, `iap.resources.egressViaIAP`, `iap.tunnelDestGroups.create`, `iap.tunnelDestGroups.delete`, `iap.tunnelDestGroups.get`, `iap.tunnelDestGroups.list`, `iap.tunnelDestGroups.update`, `iap.web.getSettings`, `iap.web.updateSettings`, `iap.webServiceVersions.getSettings`, `iap.webServiceVersions.updateSettings`, `iap.webServices.getSettings`, `iap.webServices.updateSettings`, `iap.webTypes.getSettings`, `iap.webTypes.updateSettings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### IAP-secured Egressor (`roles/iap.egressor`)

- Launch stage: Beta
- Egress to resources via Identity-Aware Proxy
- Permissions (1): `iap.webServiceVersions.egressViaIAP`

#### IAP-secured Web App User (`roles/iap.httpsResourceAccessor`)

- Provides permission to access HTTPS resources which use Identity-Aware Proxy.
- Permissions (1): `iap.webServiceVersions.accessViaIAP`

#### IAP-secured Tunnel User (`roles/iap.tunnelResourceAccessor`)

- Access Tunnel resources which use Identity-Aware Proxy
- Permissions (2): `iap.tunnelDestGroups.accessViaIAP`, `iap.tunnelInstances.accessViaIAP`

#### IAP Policy Viewer (`roles/iap.viewer`)

- Viewer role for IAP
- Permissions (10): `iap.projects.getSettings`, `iap.resources.egressViaIAP`, `iap.tunnelDestGroups.get`, `iap.tunnelDestGroups.list`, `iap.web.getSettings`, `iap.webServiceVersions.getSettings`, `iap.webServices.getSettings`, `iap.webTypes.getSettings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### IAP-secured Resource Remediator User (`roles/iap.remediatorUser`)

- Launch stage: Beta
- Remediate IAP resource
- Permissions (3): `iap.tunnelDestGroups.remediate`, `iap.tunnelinstances.remediate`, `iap.webServiceVersions.remediate`

#### IAP Settings Admin (`roles/iap.settingsAdmin`)

- Administrator of IAP Settings.
- Permissions (10): `iap.projects.getSettings`, `iap.projects.updateSettings`, `iap.web.getSettings`, `iap.web.updateSettings`, `iap.webServiceVersions.getSettings`, `iap.webServiceVersions.updateSettings`, `iap.webServices.getSettings`, `iap.webServices.updateSettings`, `iap.webTypes.getSettings`, `iap.webTypes.updateSettings`

#### IAP-secured Tunnel Destination Group Editor (`roles/iap.tunnelDestGroupEditor`)

- Edit Tunnel Destination Group resources which use Identity-Aware Proxy
- Permissions (5): `iap.tunnelDestGroups.create`, `iap.tunnelDestGroups.delete`, `iap.tunnelDestGroups.get`, `iap.tunnelDestGroups.list`, `iap.tunnelDestGroups.update`

#### IAP-secured Tunnel Destination Group Viewer (`roles/iap.tunnelDestGroupViewer`)

- View Tunnel Destination Group resources which use Identity-Aware Proxy
- Permissions (2): `iap.tunnelDestGroups.get`, `iap.tunnelDestGroups.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/iap.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `iap.projects.getSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser`, `roles/iap.settingsAdmin` |
| `iap.projects.updateSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.settingsAdmin` |
| `iap.resources.egressViaIAP` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser` |
| `iap.tunnel.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.tunnel.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.tunnelDestGroups.accessViaIAP` | `roles/admin`, `roles/owner`, `roles/iap.tunnelResourceAccessor` |
| `iap.tunnelDestGroups.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.tunnelDestGroupEditor` |
| `iap.tunnelDestGroups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.tunnelDestGroupEditor` |
| `iap.tunnelDestGroups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser`, `roles/iap.tunnelDestGroupEditor`, `roles/iap.tunnelDestGroupViewer` |
| `iap.tunnelDestGroups.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.tunnelDestGroups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iap.tunnelDestGroupEditor`, `roles/iap.tunnelDestGroupViewer`, `roles/wiz.cloudInventoryViewer` |
| `iap.tunnelDestGroups.remediate` | `roles/admin`, `roles/owner`, `roles/iap.admin`, `roles/iap.remediatorUser` |
| `iap.tunnelDestGroups.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.tunnelDestGroups.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.tunnelDestGroupEditor` |
| `iap.tunnelInstances.accessViaIAP` | `roles/admin`, `roles/owner`, `roles/iap.tunnelResourceAccessor` |
| `iap.tunnelInstances.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.tunnelInstances.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.tunnelLocations.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.tunnelLocations.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.tunnelZones.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.tunnelZones.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.tunnelinstances.remediate` | `roles/admin`, `roles/owner`, `roles/iap.admin`, `roles/iap.remediatorUser` |
| `iap.web.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor`, `roles/wiz.cloudInventoryViewer` |
| `iap.web.getSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser`, `roles/iap.settingsAdmin` |
| `iap.web.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.web.updateSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.settingsAdmin` |
| `iap.webServiceVersions.accessViaIAP` | `roles/iap.httpsResourceAccessor` |
| `iap.webServiceVersions.egressViaIAP` | `roles/iap.egressor` |
| `iap.webServiceVersions.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.webServiceVersions.getSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser`, `roles/iap.settingsAdmin` |
| `iap.webServiceVersions.remediate` | `roles/admin`, `roles/owner`, `roles/iap.admin`, `roles/iap.remediatorUser` |
| `iap.webServiceVersions.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.webServiceVersions.updateSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.settingsAdmin` |
| `iap.webServices.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.webServices.getSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser`, `roles/iap.settingsAdmin` |
| `iap.webServices.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.webServices.updateSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.settingsAdmin` |
| `iap.webTypes.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iap.admin`, `roles/iam.securityAuditor` |
| `iap.webTypes.getSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.viewer`, `roles/iam.supportUser`, `roles/iap.settingsAdmin` |
| `iap.webTypes.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iap.admin` |
| `iap.webTypes.updateSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iap.admin`, `roles/iap.editor`, `roles/iap.settingsAdmin` |

## Notes

- Roles and permissions of the `iap` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/iap (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
