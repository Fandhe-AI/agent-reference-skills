---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/artifactregistry
---

# Artifact Registry IAM roles and permissions (part 2/2)

## Signature / Usage

Predefined roles of `artifactregistry` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/appengine.appAdmin
```

### Permissions and the roles that contain them (continued)

| Permission | Roles |
|---|---|
| `artifactregistry.tags.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.appAdmin`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/artifactregistry.viewer`, `roles/assuredoss.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/firebase.admin`, `roles/securitycenter.admin`, `roles/appengine.deployer`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/artifactregistry.createOnPushWriter`, `roles/artifactregistry.reader`, `roles/artifactregistry.writer`, `roles/assuredoss.projectAdmin`, `roles/assuredoss.reader`, `roles/assuredoss.user`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/firebase.developAdmin`, `roles/firebaseapphosting.computeRunner`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+14 service agent roles) |
| `artifactregistry.tags.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/artifactregistry.viewer`, `roles/assuredoss.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/artifactregistry.createOnPushWriter`, `roles/artifactregistry.reader`, `roles/artifactregistry.writer`, `roles/assuredoss.projectAdmin`, `roles/assuredoss.reader`, `roles/assuredoss.user`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/firebase.developAdmin`, `roles/firebaseapphosting.computeRunner`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+11 service agent roles) |
| `artifactregistry.tags.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/cloudbuild.builds.builder`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/artifactregistry.createOnPushWriter`, `roles/artifactregistry.writer`, `roles/composer.worker`, `roles/firebaseapphosting.computeRunner`, `roles/iam.devOps` (+6 service agent roles) |
| `artifactregistry.versions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/composer.worker` (+6 service agent roles) |
| `artifactregistry.versions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/artifactregistry.viewer`, `roles/assuredoss.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/firebase.admin`, `roles/securitycenter.admin`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/artifactregistry.createOnPushWriter`, `roles/artifactregistry.reader`, `roles/artifactregistry.writer`, `roles/assuredoss.projectAdmin`, `roles/assuredoss.reader`, `roles/assuredoss.user`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/firebase.developAdmin`, `roles/firebaseapphosting.computeRunner`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/wiz.cloudInventoryViewer` (+13 service agent roles) |
| `artifactregistry.versions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/artifactregistry.viewer`, `roles/assuredoss.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/artifactregistry.createOnPushWriter`, `roles/artifactregistry.reader`, `roles/artifactregistry.writer`, `roles/assuredoss.projectAdmin`, `roles/assuredoss.reader`, `roles/assuredoss.user`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/firebase.developAdmin`, `roles/firebaseapphosting.computeRunner`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/networkservices.serviceExtensionsAdmin`, `roles/run.sourceDeveloper`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/wiz.cloudInventoryViewer` (+11 service agent roles) |
| `artifactregistry.versions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/composer.worker` (+2 service agent roles) |
| `artifactregistry.yumartifacts.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/artifactregistry.admin`, `roles/artifactregistry.editor`, `roles/artifactregistry.repoAdmin`, `roles/cloudbuild.builds.builder`, `roles/artifactregistry.createOnPushRepoAdmin`, `roles/artifactregistry.createOnPushWriter`, `roles/artifactregistry.writer`, `roles/composer.worker`, `roles/firebaseapphosting.computeRunner`, `roles/iam.devOps` (+5 service agent roles) |

## Notes

- Roles and permissions of the `artifactregistry` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/artifactregistry (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
