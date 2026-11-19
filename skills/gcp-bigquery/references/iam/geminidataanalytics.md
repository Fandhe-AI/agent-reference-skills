---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/geminidataanalytics
---

# Gemini Data Analytics IAM roles and permissions

## Signature / Usage

Predefined roles of `geminidataanalytics` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Gemini Data Analytics Admin (`roles/geminidataanalytics.admin`)

- Admin role for Gemini Data Analytics
- Permissions (18): `geminidataanalytics.dataAgents.chat`, `geminidataanalytics.dataAgents.create`, `geminidataanalytics.dataAgents.delete`, `geminidataanalytics.dataAgents.get`, `geminidataanalytics.dataAgents.getIamPolicy`, `geminidataanalytics.dataAgents.list`, `geminidataanalytics.dataAgents.setIamPolicy`, `geminidataanalytics.dataAgents.update`, `geminidataanalytics.locations.chat`, `geminidataanalytics.locations.get`, `geminidataanalytics.locations.list`, `geminidataanalytics.locations.useDataEngineeringAgent`, `geminidataanalytics.operations.cancel`, `geminidataanalytics.operations.delete`, `geminidataanalytics.operations.get`, `geminidataanalytics.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Gemini Data Analytics Viewer (`roles/geminidataanalytics.viewer`)

- Viewer role for Gemini Data Analytics
- Permissions (12): `geminidataanalytics.dataAgents.chat`, `geminidataanalytics.dataAgents.get`, `geminidataanalytics.dataAgents.getIamPolicy`, `geminidataanalytics.dataAgents.list`, `geminidataanalytics.locations.chat`, `geminidataanalytics.locations.get`, `geminidataanalytics.locations.list`, `geminidataanalytics.locations.useDataEngineeringAgent`, `geminidataanalytics.operations.get`, `geminidataanalytics.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Gemini Data Analytics Data Agent Creator (`roles/geminidataanalytics.dataAgentCreator`)

- Create access to Gemini Data Analytics resources.
- Permissions (3): `geminidataanalytics.dataAgents.create`, `geminidataanalytics.locations.chat`, `geminidataanalytics.operations.get`

#### Gemini Data Analytics Data Agent Editor (`roles/geminidataanalytics.dataAgentEditor`)

- Chat and Edit access to Gemini Data Analytics resources.
- Permissions (5): `geminidataanalytics.dataAgents.chat`, `geminidataanalytics.dataAgents.get`, `geminidataanalytics.dataAgents.list`, `geminidataanalytics.dataAgents.update`, `geminidataanalytics.operations.get`

#### Gemini Data Analytics Data Agent Owner (`roles/geminidataanalytics.dataAgentOwner`)

- Full access to existing Gemini Data Analytics resources.
- Permissions (13): `geminidataanalytics.dataAgents.chat`, `geminidataanalytics.dataAgents.delete`, `geminidataanalytics.dataAgents.get`, `geminidataanalytics.dataAgents.getIamPolicy`, `geminidataanalytics.dataAgents.list`, `geminidataanalytics.dataAgents.setIamPolicy`, `geminidataanalytics.dataAgents.update`, `geminidataanalytics.locations.get`, `geminidataanalytics.locations.list`, `geminidataanalytics.operations.cancel`, `geminidataanalytics.operations.delete`, `geminidataanalytics.operations.get`, `geminidataanalytics.operations.list`

#### Gemini Data Analytics Stateless Chat User (`roles/geminidataanalytics.dataAgentStatelessUser`)

- Stateless access to Gemini Data Analytics chat.
- Permissions (2): `geminidataanalytics.locations.chat`, `geminidataanalytics.locations.useDataEngineeringAgent`

#### Gemini Data Analytics Data Agent User (`roles/geminidataanalytics.dataAgentUser`)

- Chat and View access to Gemini Data Analytics resources.
- Permissions (3): `geminidataanalytics.dataAgents.chat`, `geminidataanalytics.dataAgents.get`, `geminidataanalytics.dataAgents.list`

#### Gemini Data Analytics Data Agent Viewer (`roles/geminidataanalytics.dataAgentViewer`)

- Readonly access to Gemini Data Analytics resources.
- Permissions (2): `geminidataanalytics.dataAgents.get`, `geminidataanalytics.dataAgents.list`

#### Gemini Data Analytics Query Data User (`roles/geminidataanalytics.queryDataUser`)

- Launch stage: Beta
- Access to use Gemini Data Analytics query data.
- Permissions: none listed on the source page.

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/geminidataanalytics.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `geminidataanalytics.dataAgents.chat` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/geminidataanalytics.dataAgentEditor`, `roles/geminidataanalytics.dataAgentOwner`, `roles/geminidataanalytics.dataAgentUser`, `roles/iam.supportUser` |
| `geminidataanalytics.dataAgents.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.dataAgentCreator` |
| `geminidataanalytics.dataAgents.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.dataAgentOwner` |
| `geminidataanalytics.dataAgents.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/geminidataanalytics.dataAgentEditor`, `roles/geminidataanalytics.dataAgentOwner`, `roles/geminidataanalytics.dataAgentUser`, `roles/geminidataanalytics.dataAgentViewer`, `roles/iam.dataScientist`, `roles/iam.supportUser` |
| `geminidataanalytics.dataAgents.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/geminidataanalytics.dataAgentOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `geminidataanalytics.dataAgents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/geminidataanalytics.dataAgentEditor`, `roles/geminidataanalytics.dataAgentOwner`, `roles/geminidataanalytics.dataAgentUser`, `roles/geminidataanalytics.dataAgentViewer`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `geminidataanalytics.dataAgents.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/iam.securityAdmin`, `roles/geminidataanalytics.dataAgentOwner` |
| `geminidataanalytics.dataAgents.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.dataAgentEditor`, `roles/geminidataanalytics.dataAgentOwner` |
| `geminidataanalytics.locations.chat` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.jobUser`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/bigquery.user`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/geminidataanalytics.dataAgentCreator`, `roles/geminidataanalytics.dataAgentStatelessUser`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+6 service agent roles) |
| `geminidataanalytics.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/geminidataanalytics.dataAgentOwner`, `roles/iam.supportUser` |
| `geminidataanalytics.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/geminidataanalytics.dataAgentOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `geminidataanalytics.locations.useDataEngineeringAgent` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/geminidataanalytics.dataAgentStatelessUser`, `roles/iam.dataScientist`, `roles/iam.supportUser` |
| `geminidataanalytics.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.dataAgentOwner` |
| `geminidataanalytics.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.dataAgentOwner` |
| `geminidataanalytics.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/geminidataanalytics.dataAgentCreator`, `roles/geminidataanalytics.dataAgentEditor`, `roles/geminidataanalytics.dataAgentOwner`, `roles/iam.supportUser` |
| `geminidataanalytics.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.studioAdmin`, `roles/geminidataanalytics.admin`, `roles/geminidataanalytics.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/geminidataanalytics.dataAgentOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `geminidataanalytics` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/geminidataanalytics (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
