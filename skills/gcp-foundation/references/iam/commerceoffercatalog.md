---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceoffercatalog
---

# Commerce Offer Catalog IAM roles and permissions

## Signature / Usage

Predefined roles of `commerceoffercatalog` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Commerce Offer Catalog Admin (`roles/commerceoffercatalog.admin`)

- Launch stage: Beta
- Admin role for Commerce Offer Catalog
- Permissions (7): `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Commerce Offer Catalog Offers Viewer (`roles/commerceoffercatalog.offersViewer`)

- Launch stage: Beta
- Allows viewing offers
- Permissions (5): `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/commerceoffercatalog.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `commerceoffercatalog.agreements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/commerceoffercatalog.admin`, `roles/billing.linkAdmin`, `roles/commerceoffercatalog.offersViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `commerceoffercatalog.agreements.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/commerceoffercatalog.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/commerceoffercatalog.offersViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceoffercatalog.documents.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/commerceoffercatalog.admin`, `roles/billing.linkAdmin`, `roles/commerceoffercatalog.offersViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `commerceoffercatalog.documents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/commerceoffercatalog.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/commerceoffercatalog.offersViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceoffercatalog.offers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/commerceoffercatalog.admin`, `roles/billing.linkAdmin`, `roles/commerceoffercatalog.offersViewer`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `commerceoffercatalog` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceoffercatalog (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
