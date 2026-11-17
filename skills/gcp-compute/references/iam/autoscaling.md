---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/autoscaling
---

# Cloud Autoscaling IAM roles and permissions

## Signature / Usage

Predefined roles of `autoscaling` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Autoscaling Admin (`roles/autoscaling.admin`)

- Launch stage: Beta
- Admin role for autoscaling
- Permissions (7): `autoscaling.sites.getIamPolicy`, `autoscaling.sites.readRecommendations`, `autoscaling.sites.setIamPolicy`, `autoscaling.sites.writeMetrics`, `autoscaling.sites.writeState`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Autoscaling Editor (`roles/autoscaling.editor`)

- Launch stage: Beta
- Editor role for autoscaling
- Permissions (6): `autoscaling.sites.getIamPolicy`, `autoscaling.sites.readRecommendations`, `autoscaling.sites.writeMetrics`, `autoscaling.sites.writeState`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Autoscaling Viewer (`roles/autoscaling.viewer`)

- Launch stage: Beta
- Viewer role for autoscaling
- Permissions (4): `autoscaling.sites.getIamPolicy`, `autoscaling.sites.readRecommendations`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Autoscaling Metrics Writer (`roles/autoscaling.metricsWriter`)

- Launch stage: Beta
- Access to write metrics for autoscaling site
- Permissions (1): `autoscaling.sites.writeMetrics`

#### Autoscaling Recommendations Reader (`roles/autoscaling.recommendationsReader`)

- Launch stage: Beta
- Access to read recommendations from autoscaling site
- Permissions (1): `autoscaling.sites.readRecommendations`

#### Autoscaling Site Admin (`roles/autoscaling.sitesAdmin`)

- Launch stage: Beta
- Full access to all autoscaling site features
- Permissions (7): `autoscaling.sites.getIamPolicy`, `autoscaling.sites.readRecommendations`, `autoscaling.sites.setIamPolicy`, `autoscaling.sites.writeMetrics`, `autoscaling.sites.writeState`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Autoscaling State Writer (`roles/autoscaling.stateWriter`)

- Launch stage: Beta
- Access to write state for autoscaling site
- Permissions (1): `autoscaling.sites.writeState`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/autoscaling.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `autoscaling.sites.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/autoscaling.admin`, `roles/autoscaling.editor`, `roles/autoscaling.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/autoscaling.sitesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `autoscaling.sites.readRecommendations` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/autoscaling.admin`, `roles/autoscaling.editor`, `roles/autoscaling.viewer`, `roles/autoscaling.recommendationsReader`, `roles/autoscaling.sitesAdmin`, `roles/dataflow.worker`, `roles/iam.supportUser` (+1 service agent role) |
| `autoscaling.sites.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/autoscaling.admin`, `roles/iam.securityAdmin`, `roles/autoscaling.sitesAdmin` |
| `autoscaling.sites.writeMetrics` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/autoscaling.admin`, `roles/autoscaling.editor`, `roles/autoscaling.metricsWriter`, `roles/autoscaling.sitesAdmin`, `roles/container.defaultNodeServiceAccount`, `roles/dataflow.worker` (+4 service agent roles) |
| `autoscaling.sites.writeState` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/autoscaling.admin`, `roles/autoscaling.editor`, `roles/autoscaling.sitesAdmin`, `roles/autoscaling.stateWriter`, `roles/dataflow.worker` (+1 service agent role) |

## Notes

- Roles and permissions of the `autoscaling` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/autoscaling (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
