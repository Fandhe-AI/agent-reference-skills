---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/securedlandingzone
---

# Secured Landing Zone IAM roles and permissions

## Signature / Usage

Predefined roles of `securedlandingzone` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Secured Landing Zone Admin (`roles/securedlandingzone.admin`)

- Launch stage: Beta
- Admin role for Secured Landing Zone
- Permissions (10): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securedlandingzone.operations.get`, `securedlandingzone.overwatches.activate`, `securedlandingzone.overwatches.create`, `securedlandingzone.overwatches.delete`, `securedlandingzone.overwatches.get`, `securedlandingzone.overwatches.list`, `securedlandingzone.overwatches.suspend`, `securedlandingzone.overwatches.update`

#### Secured Landing Zone Viewer (`roles/securedlandingzone.viewer`)

- Launch stage: Beta
- Viewer role for Secured Landing Zone
- Permissions (5): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securedlandingzone.operations.get`, `securedlandingzone.overwatches.get`, `securedlandingzone.overwatches.list`

#### SLZ BQDW Blueprint Organization Level Remediator (`roles/securedlandingzone.bqdwOrgRemediator`)

- Launch stage: Beta
- Access to modify (remediate) resources in SLZ BQDW Blueprint at Organization.
- Permissions (3): `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `accesscontextmanager.servicePerimeters.update`

#### SLZ BQDW Blueprint Project Level Remediator (`roles/securedlandingzone.bqdwProjectRemediator`)

- Launch stage: Beta
- Access to modify (remediate) resources in SLZ BQDW Blueprint at Project.
- Permissions (23): `bigquery.datasets.get`, `bigquery.datasets.getIamPolicy`, `bigquery.datasets.setIamPolicy`, `bigquery.datasets.update`, `cloudkms.cryptoKeys.get`, `cloudkms.cryptoKeys.getIamPolicy`, `cloudkms.cryptoKeys.list`, `cloudkms.cryptoKeys.setIamPolicy`, `cloudkms.cryptoKeys.update`, `cloudkms.keyRings.getIamPolicy`, `cloudkms.keyRings.setIamPolicy`, `pubsub.topics.get`, `pubsub.topics.getIamPolicy`, `pubsub.topics.list`, `pubsub.topics.setIamPolicy`, `pubsub.topics.update`, `resourcemanager.projects.update`, `serviceusage.services.use`, `storage.buckets.get`, `storage.buckets.getIamPolicy`, `storage.buckets.list`, `storage.buckets.setIamPolicy`, `storage.buckets.update`

#### Overwatch Activator (`roles/securedlandingzone.overwatchActivator`)

- Launch stage: Beta
- This role can activate or suspend Overwatches
- Permissions (4): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securedlandingzone.overwatches.activate`, `securedlandingzone.overwatches.suspend`

#### Overwatch Admin (`roles/securedlandingzone.overwatchAdmin`)

- Launch stage: Beta
- Full access to Overwatches
- Permissions (10): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securedlandingzone.operations.get`, `securedlandingzone.overwatches.activate`, `securedlandingzone.overwatches.create`, `securedlandingzone.overwatches.delete`, `securedlandingzone.overwatches.get`, `securedlandingzone.overwatches.list`, `securedlandingzone.overwatches.suspend`, `securedlandingzone.overwatches.update`

#### Overwatch Viewer (`roles/securedlandingzone.overwatchViewer`)

- Launch stage: Beta
- This role can view all properties of Overwatches
- Permissions (5): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securedlandingzone.operations.get`, `securedlandingzone.overwatches.get`, `securedlandingzone.overwatches.list`

#### Secured Landing Zone Service Agent (`roles/securedlandingzone.serviceAgent`)

- Grants Secured Landing Zone service account permissions to manage resources in the customer project > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (22): `cloudasset.assets.exportOrgPolicy`, `cloudasset.assets.exportResource`, `cloudasset.feeds.create`, `cloudasset.feeds.delete`, `cloudasset.feeds.update`, `logging.logEntries.list`, `pubsub.subscriptions.consume`, `pubsub.subscriptions.create`, `pubsub.subscriptions.delete`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.delete`, `pubsub.topics.detachSubscription`, `pubsub.topics.getIamPolicy`, `pubsub.topics.setIamPolicy`, `resourcemanager.projects.get`, `securitycenter.assetsecuritymarks.update`, `securitycenter.findings.list`, `securitycenter.findings.update`, `securitycenter.sources.list`, `securitycenter.sources.update`, `serviceusage.services.use`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/securedlandingzone.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `securedlandingzone.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.viewer`, `roles/iam.supportUser`, `roles/securedlandingzone.overwatchAdmin`, `roles/securedlandingzone.overwatchViewer` |
| `securedlandingzone.overwatches.activate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.overwatchActivator`, `roles/securedlandingzone.overwatchAdmin` |
| `securedlandingzone.overwatches.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.overwatchAdmin` |
| `securedlandingzone.overwatches.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.overwatchAdmin` |
| `securedlandingzone.overwatches.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.viewer`, `roles/iam.supportUser`, `roles/securedlandingzone.overwatchAdmin`, `roles/securedlandingzone.overwatchViewer` |
| `securedlandingzone.overwatches.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securedlandingzone.overwatchAdmin`, `roles/securedlandingzone.overwatchViewer` |
| `securedlandingzone.overwatches.suspend` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.overwatchActivator`, `roles/securedlandingzone.overwatchAdmin` |
| `securedlandingzone.overwatches.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securedlandingzone.admin`, `roles/securedlandingzone.overwatchAdmin` |

## Notes

- Roles and permissions of the `securedlandingzone` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/securedlandingzone (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
