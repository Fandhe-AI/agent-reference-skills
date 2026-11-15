---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudprivatecatalog
---

# Service Catalog IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudprivatecatalog` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Catalog Admin (`roles/cloudprivatecatalog.admin`)

- Launch stage: Beta
- Admin role for Cloud Private Catalog
- Permissions (3): `cloudprivatecatalog.targets.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Viewer (`roles/cloudprivatecatalog.viewer`)

- Launch stage: Beta
- Viewer role for Cloud Private Catalog
- Permissions (3): `cloudprivatecatalog.targets.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Admin (`roles/cloudprivatecatalogproducer.admin`)

- Launch stage: Beta
- Can manage catalog and view its associations.
- Permissions (40): `cloudprivatecatalog.targets.get`, `cloudprivatecatalogproducer.associations.create`, `cloudprivatecatalogproducer.associations.delete`, `cloudprivatecatalogproducer.associations.get`, `cloudprivatecatalogproducer.associations.list`, `cloudprivatecatalogproducer.catalogAssociations.create`, `cloudprivatecatalogproducer.catalogAssociations.delete`, `cloudprivatecatalogproducer.catalogAssociations.get`, `cloudprivatecatalogproducer.catalogAssociations.list`, `cloudprivatecatalogproducer.catalogs.create`, `cloudprivatecatalogproducer.catalogs.delete`, `cloudprivatecatalogproducer.catalogs.get`, `cloudprivatecatalogproducer.catalogs.getIamPolicy`, `cloudprivatecatalogproducer.catalogs.list`, `cloudprivatecatalogproducer.catalogs.setIamPolicy`, `cloudprivatecatalogproducer.catalogs.undelete`, `cloudprivatecatalogproducer.catalogs.update`, `cloudprivatecatalogproducer.producerCatalogs.attachProduct`, `cloudprivatecatalogproducer.producerCatalogs.create`, `cloudprivatecatalogproducer.producerCatalogs.delete`, `cloudprivatecatalogproducer.producerCatalogs.detachProduct`, `cloudprivatecatalogproducer.producerCatalogs.get`, `cloudprivatecatalogproducer.producerCatalogs.getIamPolicy`, `cloudprivatecatalogproducer.producerCatalogs.list`, `cloudprivatecatalogproducer.producerCatalogs.setIamPolicy`, `cloudprivatecatalogproducer.producerCatalogs.update`, `cloudprivatecatalogproducer.products.create`, `cloudprivatecatalogproducer.products.delete`, `cloudprivatecatalogproducer.products.get`, `cloudprivatecatalogproducer.products.getIamPolicy`, `cloudprivatecatalogproducer.products.list`, `cloudprivatecatalogproducer.products.setIamPolicy`, `cloudprivatecatalogproducer.products.update`, `cloudprivatecatalogproducer.targets.associate`, `cloudprivatecatalogproducer.targets.unassociate`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Editor (`roles/cloudprivatecatalogproducer.editor`)

- Launch stage: Beta
- Editor role for Cloud Private Catalog
- Permissions (35): `cloudprivatecatalogproducer.associations.create`, `cloudprivatecatalogproducer.associations.delete`, `cloudprivatecatalogproducer.associations.get`, `cloudprivatecatalogproducer.associations.list`, `cloudprivatecatalogproducer.catalogAssociations.create`, `cloudprivatecatalogproducer.catalogAssociations.delete`, `cloudprivatecatalogproducer.catalogAssociations.get`, `cloudprivatecatalogproducer.catalogAssociations.list`, `cloudprivatecatalogproducer.catalogs.create`, `cloudprivatecatalogproducer.catalogs.delete`, `cloudprivatecatalogproducer.catalogs.get`, `cloudprivatecatalogproducer.catalogs.getIamPolicy`, `cloudprivatecatalogproducer.catalogs.list`, `cloudprivatecatalogproducer.catalogs.undelete`, `cloudprivatecatalogproducer.catalogs.update`, `cloudprivatecatalogproducer.producerCatalogs.attachProduct`, `cloudprivatecatalogproducer.producerCatalogs.create`, `cloudprivatecatalogproducer.producerCatalogs.delete`, `cloudprivatecatalogproducer.producerCatalogs.detachProduct`, `cloudprivatecatalogproducer.producerCatalogs.get`, `cloudprivatecatalogproducer.producerCatalogs.getIamPolicy`, `cloudprivatecatalogproducer.producerCatalogs.list`, `cloudprivatecatalogproducer.producerCatalogs.update`, `cloudprivatecatalogproducer.products.create`, `cloudprivatecatalogproducer.products.delete`, `cloudprivatecatalogproducer.products.get`, `cloudprivatecatalogproducer.products.getIamPolicy`, `cloudprivatecatalogproducer.products.list`, `cloudprivatecatalogproducer.products.update`, `cloudprivatecatalogproducer.settings.get`, `cloudprivatecatalogproducer.settings.update`, `cloudprivatecatalogproducer.targets.associate`, `cloudprivatecatalogproducer.targets.unassociate`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Viewer (`roles/cloudprivatecatalogproducer.viewer`)

- Launch stage: Beta
- Viewer role for Cloud Private Catalog
- Permissions (16): `cloudprivatecatalogproducer.associations.get`, `cloudprivatecatalogproducer.associations.list`, `cloudprivatecatalogproducer.catalogAssociations.get`, `cloudprivatecatalogproducer.catalogAssociations.list`, `cloudprivatecatalogproducer.catalogs.get`, `cloudprivatecatalogproducer.catalogs.getIamPolicy`, `cloudprivatecatalogproducer.catalogs.list`, `cloudprivatecatalogproducer.producerCatalogs.get`, `cloudprivatecatalogproducer.producerCatalogs.getIamPolicy`, `cloudprivatecatalogproducer.producerCatalogs.list`, `cloudprivatecatalogproducer.products.get`, `cloudprivatecatalogproducer.products.getIamPolicy`, `cloudprivatecatalogproducer.products.list`, `cloudprivatecatalogproducer.settings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Consumer (`roles/cloudprivatecatalog.consumer`)

- Launch stage: Beta
- Can browse catalogs in the target resource context.
- Permissions (3): `cloudprivatecatalog.targets.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Manager (`roles/cloudprivatecatalogproducer.manager`)

- Launch stage: Beta
- Can manage associations between a catalog and a target resource.
- Permissions (20): `cloudprivatecatalog.targets.get`, `cloudprivatecatalogproducer.associations.create`, `cloudprivatecatalogproducer.associations.delete`, `cloudprivatecatalogproducer.associations.get`, `cloudprivatecatalogproducer.associations.list`, `cloudprivatecatalogproducer.catalogAssociations.create`, `cloudprivatecatalogproducer.catalogAssociations.delete`, `cloudprivatecatalogproducer.catalogAssociations.get`, `cloudprivatecatalogproducer.catalogAssociations.list`, `cloudprivatecatalogproducer.catalogs.get`, `cloudprivatecatalogproducer.catalogs.list`, `cloudprivatecatalogproducer.producerCatalogs.get`, `cloudprivatecatalogproducer.producerCatalogs.list`, `cloudprivatecatalogproducer.targets.associate`, `cloudprivatecatalogproducer.targets.unassociate`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Catalog Org Admin (`roles/cloudprivatecatalogproducer.orgAdmin`)

- Launch stage: Beta
- Can manage catalog org settings.
- Permissions (44): `cloudprivatecatalog.targets.get`, `cloudprivatecatalogproducer.associations.create`, `cloudprivatecatalogproducer.associations.delete`, `cloudprivatecatalogproducer.associations.get`, `cloudprivatecatalogproducer.associations.list`, `cloudprivatecatalogproducer.catalogAssociations.create`, `cloudprivatecatalogproducer.catalogAssociations.delete`, `cloudprivatecatalogproducer.catalogAssociations.get`, `cloudprivatecatalogproducer.catalogAssociations.list`, `cloudprivatecatalogproducer.catalogs.create`, `cloudprivatecatalogproducer.catalogs.delete`, `cloudprivatecatalogproducer.catalogs.get`, `cloudprivatecatalogproducer.catalogs.getIamPolicy`, `cloudprivatecatalogproducer.catalogs.list`, `cloudprivatecatalogproducer.catalogs.setIamPolicy`, `cloudprivatecatalogproducer.catalogs.undelete`, `cloudprivatecatalogproducer.catalogs.update`, `cloudprivatecatalogproducer.producerCatalogs.attachProduct`, `cloudprivatecatalogproducer.producerCatalogs.create`, `cloudprivatecatalogproducer.producerCatalogs.delete`, `cloudprivatecatalogproducer.producerCatalogs.detachProduct`, `cloudprivatecatalogproducer.producerCatalogs.get`, `cloudprivatecatalogproducer.producerCatalogs.getIamPolicy`, `cloudprivatecatalogproducer.producerCatalogs.list`, `cloudprivatecatalogproducer.producerCatalogs.setIamPolicy`, `cloudprivatecatalogproducer.producerCatalogs.update`, `cloudprivatecatalogproducer.products.create`, `cloudprivatecatalogproducer.products.delete`, `cloudprivatecatalogproducer.products.get`, `cloudprivatecatalogproducer.products.getIamPolicy`, `cloudprivatecatalogproducer.products.list`, `cloudprivatecatalogproducer.products.setIamPolicy`, `cloudprivatecatalogproducer.products.update`, `cloudprivatecatalogproducer.settings.get`, `cloudprivatecatalogproducer.settings.update`, `cloudprivatecatalogproducer.targets.associate`, `cloudprivatecatalogproducer.targets.unassociate`, `commerceorggovernance.organizationSettings.get`, `commerceorggovernance.organizationSettings.update`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudprivatecatalog.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudprivatecatalog.targets.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalog.admin`, `roles/cloudprivatecatalog.viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalog.consumer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudprivatecatalogproducer.associations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.associations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.associations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.associations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.catalogAssociations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.catalogAssociations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.catalogAssociations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.catalogAssociations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.catalogs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.catalogs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.catalogs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.catalogs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.catalogs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.catalogs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudprivatecatalogproducer.admin`, `roles/iam.securityAdmin`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.catalogs.undelete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.catalogs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.producerCatalogs.attachProduct` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.producerCatalogs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.producerCatalogs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.producerCatalogs.detachProduct` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.producerCatalogs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.producerCatalogs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.producerCatalogs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.producerCatalogs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudprivatecatalogproducer.admin`, `roles/iam.securityAdmin`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.producerCatalogs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.products.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.products.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.products.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.products.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.products.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.products.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudprivatecatalogproducer.admin`, `roles/iam.securityAdmin`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.products.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.settings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.viewer`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/iam.supportUser` |
| `cloudprivatecatalogproducer.settings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.targets.associate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin` |
| `cloudprivatecatalogproducer.targets.unassociate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudprivatecatalogproducer.editor`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin` |

## Notes

- Roles and permissions of the `cloudprivatecatalog` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudprivatecatalog (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
