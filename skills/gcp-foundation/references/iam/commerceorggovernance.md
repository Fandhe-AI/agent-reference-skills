---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceorggovernance
---

# Commerce Org Governance IAM roles and permissions

## Signature / Usage

Predefined roles of `commerceorggovernance` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Commerce Organization Governance Admin (`roles/commerceorggovernance.admin`)

- Launch stage: Beta
- Full access to Organization Governance APIs
- Permissions (22): `commerceorggovernance.collectionRequestApprovals.list`, `commerceorggovernance.collectionRequestApprovals.review`, `commerceorggovernance.collections.create`, `commerceorggovernance.collections.delete`, `commerceorggovernance.collections.get`, `commerceorggovernance.collections.list`, `commerceorggovernance.collections.update`, `commerceorggovernance.consumerSharingPolicies.get`, `commerceorggovernance.consumerSharingPolicies.update`, `commerceorggovernance.organizationSettings.get`, `commerceorggovernance.organizationSettings.update`, `commerceorggovernance.populateCollectionJobs.create`, `commerceorggovernance.populateCollectionJobs.list`, `commerceorggovernance.populateCollectionJobs.run`, `commerceorggovernance.populateCollectionJobs.update`, `commerceorggovernance.services.get`, `commerceorggovernance.services.list`, `commerceorggovernance.services.request`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Commerce Organization Governance Viewer (`roles/commerceorggovernance.viewer`)

- Launch stage: Beta
- Full access to Organization Governance read-only APIs.
- Permissions (11): `commerceorggovernance.collections.get`, `commerceorggovernance.collections.list`, `commerceorggovernance.consumerSharingPolicies.get`, `commerceorggovernance.organizationSettings.get`, `commerceorggovernance.populateCollectionJobs.list`, `commerceorggovernance.services.get`, `commerceorggovernance.services.list`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Governed Marketplace User (`roles/commerceorggovernance.user`)

- Launch stage: Beta
- Full access to Governed Marketplace features.
- Permissions (7): `commerceorggovernance.services.get`, `commerceorggovernance.services.list`, `commerceorggovernance.services.request`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/commerceorggovernance.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `commerceorggovernance.collectionRequestApprovals.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor` |
| `commerceorggovernance.collectionRequestApprovals.review` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.collections.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.collections.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.collections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/iam.supportUser` |
| `commerceorggovernance.collections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceorggovernance.collections.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.consumerSharingPolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/iam.supportUser` |
| `commerceorggovernance.consumerSharingPolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.organizationSettings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `commerceorggovernance.organizationSettings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `commerceorggovernance.populateCollectionJobs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.populateCollectionJobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceorggovernance.populateCollectionJobs.run` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.populateCollectionJobs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin` |
| `commerceorggovernance.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/commerceorggovernance.user`, `roles/iam.supportUser` |
| `commerceorggovernance.services.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commerceorggovernance.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceorggovernance.services.request` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.user` |

## Notes

- Roles and permissions of the `commerceorggovernance` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceorggovernance (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
