---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/mandiant
---

# Mandiant IAM roles and permissions

## Signature / Usage

Predefined roles of `mandiant` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Mandiant Admin (`roles/mandiant.admin`)

- Launch stage: Beta
- Admin role for mandiant
- Permissions (25): `mandiant.genericAttackSurfaceManagements.create`, `mandiant.genericAttackSurfaceManagements.delete`, `mandiant.genericAttackSurfaceManagements.get`, `mandiant.genericAttackSurfaceManagements.update`, `mandiant.genericDigitalThreatMonitorings.create`, `mandiant.genericDigitalThreatMonitorings.get`, `mandiant.genericDigitalThreatMonitorings.update`, `mandiant.genericExpertiseOnDemands.create`, `mandiant.genericExpertiseOnDemands.delete`, `mandiant.genericExpertiseOnDemands.get`, `mandiant.genericExpertiseOnDemands.update`, `mandiant.genericPlatforms.create`, `mandiant.genericPlatforms.delete`, `mandiant.genericPlatforms.get`, `mandiant.genericPlatforms.update`, `mandiant.genericThreatIntels.create`, `mandiant.genericThreatIntels.delete`, `mandiant.genericThreatIntels.get`, `mandiant.genericThreatIntels.update`, `mandiant.genericValidations.create`, `mandiant.genericValidations.delete`, `mandiant.genericValidations.get`, `mandiant.genericValidations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Viewer (`roles/mandiant.viewer`)

- Launch stage: Beta
- Viewer role for mandiant
- Permissions (8): `mandiant.genericAttackSurfaceManagements.get`, `mandiant.genericDigitalThreatMonitorings.get`, `mandiant.genericExpertiseOnDemands.get`, `mandiant.genericPlatforms.get`, `mandiant.genericThreatIntels.get`, `mandiant.genericValidations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Attack Surface Management Editor (`roles/mandiant.attackSurfaceManagementEditor`)

- Launch stage: Beta
- Access to write Attack Surface Management
- Permissions (8): `mandiant.genericAttackSurfaceManagements.create`, `mandiant.genericAttackSurfaceManagements.delete`, `mandiant.genericAttackSurfaceManagements.update`, `mandiant.genericPlatforms.create`, `mandiant.genericPlatforms.delete`, `mandiant.genericPlatforms.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Attack Surface Management Viewer (`roles/mandiant.attackSurfaceManagementViewer`)

- Launch stage: Beta
- Access to read Attack Surface Management
- Permissions (4): `mandiant.genericAttackSurfaceManagements.get`, `mandiant.genericPlatforms.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Digital Threat Monitoring Editor (`roles/mandiant.digitalThreatMonitoringEditor`)

- Launch stage: Beta
- Access to write Digital Threat Monitoring
- Permissions (6): `mandiant.genericDigitalThreatMonitorings.create`, `mandiant.genericDigitalThreatMonitorings.update`, `mandiant.genericPlatforms.create`, `mandiant.genericPlatforms.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Digital Threat Monitoring Viewer (`roles/mandiant.digitalThreatMonitoringViewer`)

- Launch stage: Beta
- Access to read Digital Threat Monitoring
- Permissions (4): `mandiant.genericDigitalThreatMonitorings.get`, `mandiant.genericPlatforms.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Expertise On Demand Editor (`roles/mandiant.expertiseOnDemandEditor`)

- Launch stage: Beta
- Access to write Expertise On Demand
- Permissions (8): `mandiant.genericExpertiseOnDemands.create`, `mandiant.genericExpertiseOnDemands.delete`, `mandiant.genericExpertiseOnDemands.update`, `mandiant.genericPlatforms.create`, `mandiant.genericPlatforms.delete`, `mandiant.genericPlatforms.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Expertise On Demand Viewer (`roles/mandiant.expertiseOnDemandViewer`)

- Launch stage: Beta
- Access to read Expertise On Demand
- Permissions (4): `mandiant.genericExpertiseOnDemands.get`, `mandiant.genericPlatforms.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Threat Intel Editor (`roles/mandiant.threatIntelEditor`)

- Launch stage: Beta
- Access to write Threat Intel
- Permissions (8): `mandiant.genericPlatforms.create`, `mandiant.genericPlatforms.delete`, `mandiant.genericPlatforms.update`, `mandiant.genericThreatIntels.create`, `mandiant.genericThreatIntels.delete`, `mandiant.genericThreatIntels.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Threat Intel Viewer (`roles/mandiant.threatIntelViewer`)

- Launch stage: Beta
- Access to read Threat Intel
- Permissions (4): `mandiant.genericPlatforms.get`, `mandiant.genericThreatIntels.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Validation Editor (`roles/mandiant.validationEditor`)

- Launch stage: Beta
- Access to write Validation
- Permissions (8): `mandiant.genericPlatforms.create`, `mandiant.genericPlatforms.delete`, `mandiant.genericPlatforms.update`, `mandiant.genericValidations.create`, `mandiant.genericValidations.delete`, `mandiant.genericValidations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Mandiant Validation Viewer (`roles/mandiant.validationViewer`)

- Launch stage: Beta
- Access to read Validation
- Permissions (4): `mandiant.genericPlatforms.get`, `mandiant.genericValidations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/mandiant.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `mandiant.genericAttackSurfaceManagements.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.attackSurfaceManagementEditor` |
| `mandiant.genericAttackSurfaceManagements.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.attackSurfaceManagementEditor` |
| `mandiant.genericAttackSurfaceManagements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/mandiant.admin`, `roles/mandiant.viewer`, `roles/iam.supportUser`, `roles/mandiant.attackSurfaceManagementViewer` |
| `mandiant.genericAttackSurfaceManagements.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.attackSurfaceManagementEditor` |
| `mandiant.genericDigitalThreatMonitorings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.digitalThreatMonitoringEditor` |
| `mandiant.genericDigitalThreatMonitorings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/mandiant.admin`, `roles/mandiant.viewer`, `roles/iam.supportUser`, `roles/mandiant.digitalThreatMonitoringViewer` |
| `mandiant.genericDigitalThreatMonitorings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.digitalThreatMonitoringEditor` |
| `mandiant.genericExpertiseOnDemands.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.expertiseOnDemandEditor` |
| `mandiant.genericExpertiseOnDemands.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.expertiseOnDemandEditor` |
| `mandiant.genericExpertiseOnDemands.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/mandiant.admin`, `roles/mandiant.viewer`, `roles/iam.supportUser`, `roles/mandiant.expertiseOnDemandViewer` |
| `mandiant.genericExpertiseOnDemands.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.expertiseOnDemandEditor` |
| `mandiant.genericPlatforms.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.attackSurfaceManagementEditor`, `roles/mandiant.digitalThreatMonitoringEditor`, `roles/mandiant.expertiseOnDemandEditor`, `roles/mandiant.threatIntelEditor`, `roles/mandiant.validationEditor` |
| `mandiant.genericPlatforms.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.attackSurfaceManagementEditor`, `roles/mandiant.expertiseOnDemandEditor`, `roles/mandiant.threatIntelEditor`, `roles/mandiant.validationEditor` |
| `mandiant.genericPlatforms.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/mandiant.admin`, `roles/mandiant.viewer`, `roles/iam.supportUser`, `roles/mandiant.attackSurfaceManagementViewer`, `roles/mandiant.digitalThreatMonitoringViewer`, `roles/mandiant.expertiseOnDemandViewer`, `roles/mandiant.threatIntelViewer`, `roles/mandiant.validationViewer` |
| `mandiant.genericPlatforms.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.attackSurfaceManagementEditor`, `roles/mandiant.digitalThreatMonitoringEditor`, `roles/mandiant.expertiseOnDemandEditor`, `roles/mandiant.threatIntelEditor`, `roles/mandiant.validationEditor` |
| `mandiant.genericThreatIntels.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.threatIntelEditor` |
| `mandiant.genericThreatIntels.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.threatIntelEditor` |
| `mandiant.genericThreatIntels.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/mandiant.admin`, `roles/mandiant.viewer`, `roles/iam.supportUser`, `roles/mandiant.threatIntelViewer` |
| `mandiant.genericThreatIntels.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.threatIntelEditor` |
| `mandiant.genericValidations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.validationEditor` |
| `mandiant.genericValidations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.validationEditor` |
| `mandiant.genericValidations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/mandiant.admin`, `roles/mandiant.viewer`, `roles/iam.supportUser`, `roles/mandiant.validationViewer` |
| `mandiant.genericValidations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/mandiant.admin`, `roles/mandiant.validationEditor` |

## Notes

- Roles and permissions of the `mandiant` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/mandiant (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
