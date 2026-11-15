---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceagreementpublishing
---

# Commerce Agreement Publishing IAM roles and permissions

## Signature / Usage

Predefined roles of `commerceagreementpublishing` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Commerce Agreement Publishing Admin (`roles/commerceagreementpublishing.admin`)

- Launch stage: Beta
- Admin of Commerce Agreement Publishing service
- Permissions (12): `commerceagreementpublishing.agreements.create`, `commerceagreementpublishing.agreements.delete`, `commerceagreementpublishing.agreements.get`, `commerceagreementpublishing.agreements.list`, `commerceagreementpublishing.agreements.update`, `commerceagreementpublishing.documents.create`, `commerceagreementpublishing.documents.delete`, `commerceagreementpublishing.documents.get`, `commerceagreementpublishing.documents.list`, `commerceagreementpublishing.documents.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Commerce Agreement Publishing Viewer (`roles/commerceagreementpublishing.viewer`)

- Launch stage: Beta
- Viewer of Commerce Agreement Publishing service
- Permissions (6): `commerceagreementpublishing.agreements.get`, `commerceagreementpublishing.agreements.list`, `commerceagreementpublishing.documents.get`, `commerceagreementpublishing.documents.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/commerceagreementpublishing.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `commerceagreementpublishing.agreements.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceagreementpublishing.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceagreementpublishing.agreements.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceagreementpublishing.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceagreementpublishing.agreements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceagreementpublishing.admin`, `roles/commerceagreementpublishing.viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceagreementpublishing.agreements.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceagreementpublishing.admin`, `roles/commerceagreementpublishing.viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceagreementpublishing.agreements.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceagreementpublishing.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceagreementpublishing.documents.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceagreementpublishing.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceagreementpublishing.documents.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceagreementpublishing.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceagreementpublishing.documents.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceagreementpublishing.admin`, `roles/commerceagreementpublishing.viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceagreementpublishing.documents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceagreementpublishing.admin`, `roles/commerceagreementpublishing.viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceagreementpublishing.documents.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceagreementpublishing.admin`, `roles/commercepricemanagement.privateOffersAdmin` |

## Notes

- Roles and permissions of the `commerceagreementpublishing` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceagreementpublishing (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
