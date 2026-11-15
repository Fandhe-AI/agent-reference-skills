---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceproducer
---

# Commerce Producer IAM roles and permissions

## Signature / Usage

Predefined roles of `commerceproducer` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Commerce Producer Admin (`roles/commerceproducer.admin`)

- Launch stage: Beta
- Grants full access to all resources in Cloud Commerce Producer API.
- Permissions (47): `commercebusinessenablement.partnerInfo.get`, `commerceproducer.analyticsHubListingProductConfigs.create`, `commerceproducer.analyticsHubListingProductConfigs.delete`, `commerceproducer.analyticsHubListingProductConfigs.get`, `commerceproducer.analyticsHubListingProductConfigs.list`, `commerceproducer.analyticsHubListingProductConfigs.update`, `commerceproducer.consumerEnforcementActions.create`, `commerceproducer.consumerEnforcementActions.delete`, `commerceproducer.consumerEnforcementActions.get`, `commerceproducer.consumerEnforcementActions.list`, `commerceproducer.consumerEnforcementActions.update`, `commerceproducer.locations.get`, `commerceproducer.locations.list`, `commerceproducer.privateOfferDocuments.create`, `commerceproducer.privateOfferDocuments.delete`, `commerceproducer.privateOfferDocuments.get`, `commerceproducer.privateOfferDocuments.list`, `commerceproducer.privateOfferDocuments.update`, `commerceproducer.privateOffers.cancel`, `commerceproducer.privateOffers.create`, `commerceproducer.privateOffers.delete`, `commerceproducer.privateOffers.get`, `commerceproducer.privateOffers.list`, `commerceproducer.privateOffers.publish`, `commerceproducer.privateOffers.update`, `commerceproducer.products.create`, `commerceproducer.products.delete`, `commerceproducer.products.get`, `commerceproducer.products.list`, `commerceproducer.products.update`, `commerceproducer.releases.create`, `commerceproducer.releases.delete`, `commerceproducer.releases.get`, `commerceproducer.releases.list`, `commerceproducer.releases.publish`, `commerceproducer.releases.update`, `commerceproducer.releases.verify`, `commerceproducer.services.get`, `commerceproducer.services.list`, `commerceproducer.skuGroups.get`, `commerceproducer.skuGroups.list`, `commerceproducer.skus.get`, `commerceproducer.skus.list`, `commerceproducer.standardOffers.get`, `commerceproducer.standardOffers.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Commerce Producer Viewer (`roles/commerceproducer.viewer`)

- Launch stage: Beta
- Grants read access to all resources in Cloud Commerce Producer API.
- Permissions (25): `commercebusinessenablement.partnerInfo.get`, `commerceproducer.analyticsHubListingProductConfigs.get`, `commerceproducer.analyticsHubListingProductConfigs.list`, `commerceproducer.consumerEnforcementActions.get`, `commerceproducer.consumerEnforcementActions.list`, `commerceproducer.locations.get`, `commerceproducer.locations.list`, `commerceproducer.privateOfferDocuments.get`, `commerceproducer.privateOfferDocuments.list`, `commerceproducer.privateOffers.get`, `commerceproducer.privateOffers.list`, `commerceproducer.products.get`, `commerceproducer.products.list`, `commerceproducer.releases.get`, `commerceproducer.releases.list`, `commerceproducer.services.get`, `commerceproducer.services.list`, `commerceproducer.skuGroups.get`, `commerceproducer.skuGroups.list`, `commerceproducer.skus.get`, `commerceproducer.skus.list`, `commerceproducer.standardOffers.get`, `commerceproducer.standardOffers.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/commerceproducer.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `commerceproducer.analyticsHubListingProductConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.analyticsHubListingProductConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.analyticsHubListingProductConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.supportUser` |
| `commerceproducer.analyticsHubListingProductConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.analyticsHubListingProductConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.consumerEnforcementActions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.consumerEnforcementActions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.consumerEnforcementActions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.supportUser` |
| `commerceproducer.consumerEnforcementActions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.consumerEnforcementActions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.supportUser` |
| `commerceproducer.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.privateOfferDocuments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOfferDocuments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOfferDocuments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceproducer.privateOfferDocuments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.privateOfferDocuments.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOffers.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOffers.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOffers.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOffers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceproducer.privateOffers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.privateOffers.publish` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.privateOffers.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceproducer.products.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.products.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.products.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.supportUser` |
| `commerceproducer.products.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.products.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.releases.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.releases.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.releases.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.supportUser` |
| `commerceproducer.releases.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.releases.publish` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.releases.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.releases.verify` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commerceproducer.admin` |
| `commerceproducer.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.supportUser` |
| `commerceproducer.services.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.skuGroups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceproducer.skuGroups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.skus.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceproducer.skus.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceproducer.standardOffers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceproducer.standardOffers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `commerceproducer` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/commerceproducer (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
