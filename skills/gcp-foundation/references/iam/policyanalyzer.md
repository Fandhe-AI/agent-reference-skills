---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer
---

# Policy Analyzer IAM roles and permissions

## Signature / Usage

Predefined roles of `policyanalyzer` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Policyanalyzer Admin (`roles/policyanalyzer.admin`)

- Launch stage: Beta
- Admin role for policyanalyzer
- Permissions (5): `policyanalyzer.resourceAuthorizationActivities.query`, `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query`, `policyanalyzer.serviceAccountLastAuthenticationActivities.query`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Policyanalyzer Viewer (`roles/policyanalyzer.viewer`)

- Launch stage: Beta
- Viewer role for policyanalyzer
- Permissions (5): `policyanalyzer.resourceAuthorizationActivities.query`, `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query`, `policyanalyzer.serviceAccountLastAuthenticationActivities.query`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Activity Analysis Viewer (`roles/policyanalyzer.activityAnalysisViewer`)

- Launch stage: Beta
- Viewer user that can read all activity analysis.
- Permissions (3): `policyanalyzer.resourceAuthorizationActivities.query`, `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query`, `policyanalyzer.serviceAccountLastAuthenticationActivities.query`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/policyanalyzer.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `policyanalyzer.resourceAuthorizationActivities.query` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policyanalyzer.admin`, `roles/policyanalyzer.viewer`, `roles/iam.denyAdmin`, `roles/iam.supportUser`, `roles/policyanalyzer.activityAnalysisViewer` |
| `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policyanalyzer.admin`, `roles/policyanalyzer.viewer`, `roles/iam.supportUser`, `roles/policyanalyzer.activityAnalysisViewer`, `roles/wiz.cloudInventoryViewer` |
| `policyanalyzer.serviceAccountLastAuthenticationActivities.query` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policyanalyzer.admin`, `roles/policyanalyzer.viewer`, `roles/iam.supportUser`, `roles/policyanalyzer.activityAnalysisViewer`, `roles/wiz.cloudInventoryViewer` |

## Notes

- Roles and permissions of the `policyanalyzer` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
