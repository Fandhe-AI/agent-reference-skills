---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/source
---

# Cloud Source Repositories IAM roles and permissions

## Signature / Usage

Predefined roles of `source` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Source Repository Administrator (`roles/source.admin`)

- Provides permissions to create, update, delete, list, clone, fetch, and browse repositories. Also provides permissions to read and change IAM policies. Lowest-level resources where you can grant this role: - Repository
- Permissions (10): `source.repos.create`, `source.repos.delete`, `source.repos.get`, `source.repos.getIamPolicy`, `source.repos.getProjectConfig`, `source.repos.list`, `source.repos.setIamPolicy`, `source.repos.update`, `source.repos.updateProjectConfig`, `source.repos.updateRepoConfig`

#### Source Repository Editor (`roles/source.editor`)

- Editor role for Source Repository
- Permissions (6): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `source.repos.get`, `source.repos.getIamPolicy`, `source.repos.list`, `source.repos.update`

#### Source Repository Viewer (`roles/source.viewer`)

- Viewer role for Source Repository
- Permissions (5): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `source.repos.get`, `source.repos.getIamPolicy`, `source.repos.list`

#### Source Repository Reader (`roles/source.reader`)

- Provides permissions to list, clone, fetch, and browse repositories. Lowest-level resources where you can grant this role: - Repository
- Permissions (2): `source.repos.get`, `source.repos.list`

#### Source Repository Writer (`roles/source.writer`)

- Provides permissions to list, clone, fetch, browse, and update repositories. Lowest-level resources where you can grant this role: - Repository
- Permissions (3): `source.repos.get`, `source.repos.list`, `source.repos.update`

#### Cloud Source Repositories Service Agent (`roles/sourcerepo.serviceAgent`)

- Allow Cloud Source Repositories to integrate with other Cloud services. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `iam.serviceAccounts.getAccessToken`, `pubsub.topics.publish`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role's lowest-level resource is Repository; granting it there instead limits the scope, but this example does not show that command):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/source.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `source.repos.create` | `roles/admin`, `roles/owner`, `roles/source.admin`, `roles/iam.devOps` (+1 service agent role) |
| `source.repos.delete` | `roles/admin`, `roles/owner`, `roles/source.admin`, `roles/iam.devOps` |
| `source.repos.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.builds.builder`, `roles/run.builder`, `roles/source.admin`, `roles/source.editor`, `roles/source.viewer`, `roles/telcoautomation.admin`, `roles/composer.worker`, `roles/iam.devOps`, `roles/iam.supportUser`, `roles/source.reader`, `roles/source.writer` (+4 service agent roles) |
| `source.repos.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/source.admin`, `roles/source.editor`, `roles/source.viewer`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `source.repos.getProjectConfig` | `roles/admin`, `roles/owner`, `roles/source.admin`, `roles/iam.devOps` |
| `source.repos.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.builds.builder`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/source.admin`, `roles/source.editor`, `roles/source.viewer`, `roles/telcoautomation.admin`, `roles/composer.worker`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/source.reader`, `roles/source.writer` (+3 service agent roles) |
| `source.repos.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/source.admin`, `roles/iam.devOps` |
| `source.repos.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/source.admin`, `roles/source.editor`, `roles/iam.devOps`, `roles/source.writer` |
| `source.repos.updateProjectConfig` | `roles/admin`, `roles/owner`, `roles/source.admin`, `roles/iam.devOps` |
| `source.repos.updateRepoConfig` | `roles/admin`, `roles/owner`, `roles/source.admin`, `roles/iam.devOps` |

## Notes

- Roles and permissions of the `source` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Deprecated product (End of Sale): the Cloud Source Repositories documentation says "Effective June 17, 2024, Cloud Source Repositories isn't available to new customers. If your organization hasn't previously used Cloud Source Repositories, you can't enable the API or use Cloud Source Repositories." and "Cloud Source Repositories is End of Sale. In preparation for the deprecation of this service, this page outlines migration options for multiple use cases. A shutdown date will be communicated at least one year before the shutdown occurs to provide time for you to successfully migrate to an alternative product." (https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories, https://docs.cloud.google.com/source-repositories/docs/migration-guides, retrieved 2026-11-19). Migration to Secure Source Manager is covered in the `secure-source-manager` category.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/source (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
