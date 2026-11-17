---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/commercepricemanagement
---

# Commerce Price Management IAM roles and permissions

## Signature / Usage

Predefined roles of `commercepricemanagement` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Commercepricemanagement Editor (`roles/commercepricemanagement.editor`)

- Launch stage: Beta
- Editor role for commercepricemanagement
- Permissions (36): `commerceagreementpublishing.agreements.get`, `commerceagreementpublishing.agreements.list`, `commerceagreementpublishing.documents.get`, `commerceagreementpublishing.documents.list`, `commerceprice.privateoffers.cancel`, `commerceprice.privateoffers.create`, `commerceprice.privateoffers.delete`, `commerceprice.privateoffers.get`, `commerceprice.privateoffers.list`, `commerceprice.privateoffers.publish`, `commerceprice.privateoffers.sendEmail`, `commerceprice.privateoffers.update`, `commerceproducer.privateOfferDocuments.get`, `commerceproducer.privateOfferDocuments.list`, `commerceproducer.privateOffers.get`, `commerceproducer.privateOffers.list`, `commerceproducer.skuGroups.get`, `commerceproducer.skuGroups.list`, `commerceproducer.skus.get`, `commerceproducer.skus.list`, `commerceproducer.standardOffers.get`, `commerceproducer.standardOffers.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Commerce Price Management Viewer (`roles/commercepricemanagement.viewer`)

- Launch stage: Beta
- Allows viewing offers, free trials, skus
- Permissions (30): `commerceagreementpublishing.agreements.get`, `commerceagreementpublishing.agreements.list`, `commerceagreementpublishing.documents.get`, `commerceagreementpublishing.documents.list`, `commerceprice.privateoffers.get`, `commerceprice.privateoffers.list`, `commerceproducer.privateOfferDocuments.get`, `commerceproducer.privateOfferDocuments.list`, `commerceproducer.privateOffers.get`, `commerceproducer.privateOffers.list`, `commerceproducer.skuGroups.get`, `commerceproducer.skuGroups.list`, `commerceproducer.skus.get`, `commerceproducer.skus.list`, `commerceproducer.standardOffers.get`, `commerceproducer.standardOffers.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Commerce Price Management Events Viewer (`roles/commercepricemanagement.eventsViewer`)

- Launch stage: Beta
- Allows viewing key events for an offer
- Permissions (4): `commerceprice.events.get`, `commerceprice.events.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Commerce Price Management Private Offers Admin (`roles/commercepricemanagement.privateOffersAdmin`)

- Launch stage: Beta
- Allows managing private offers
- Permissions (52): `commerceagreementpublishing.agreements.create`, `commerceagreementpublishing.agreements.delete`, `commerceagreementpublishing.agreements.get`, `commerceagreementpublishing.agreements.list`, `commerceagreementpublishing.agreements.update`, `commerceagreementpublishing.documents.create`, `commerceagreementpublishing.documents.delete`, `commerceagreementpublishing.documents.get`, `commerceagreementpublishing.documents.list`, `commerceagreementpublishing.documents.update`, `commerceprice.events.get`, `commerceprice.events.list`, `commerceprice.privateoffers.cancel`, `commerceprice.privateoffers.create`, `commerceprice.privateoffers.delete`, `commerceprice.privateoffers.get`, `commerceprice.privateoffers.list`, `commerceprice.privateoffers.publish`, `commerceprice.privateoffers.sendEmail`, `commerceprice.privateoffers.update`, `commerceproducer.privateOfferDocuments.create`, `commerceproducer.privateOfferDocuments.delete`, `commerceproducer.privateOfferDocuments.get`, `commerceproducer.privateOfferDocuments.list`, `commerceproducer.privateOfferDocuments.update`, `commerceproducer.privateOffers.cancel`, `commerceproducer.privateOffers.create`, `commerceproducer.privateOffers.delete`, `commerceproducer.privateOffers.get`, `commerceproducer.privateOffers.list`, `commerceproducer.privateOffers.publish`, `commerceproducer.privateOffers.update`, `commerceproducer.skuGroups.get`, `commerceproducer.skuGroups.list`, `commerceproducer.skus.get`, `commerceproducer.skus.list`, `commerceproducer.standardOffers.get`, `commerceproducer.standardOffers.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/commercepricemanagement.editor"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `commerceprice.events.get` | `roles/admin`, `roles/owner`, `roles/commercepricemanagement.eventsViewer`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceprice.events.list` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.eventsViewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor` |
| `commerceprice.privateoffers.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceprice.privateoffers.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceprice.privateoffers.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceprice.privateoffers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.supportUser` |
| `commerceprice.privateoffers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercepricemanagement.privateOffersAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commerceprice.privateoffers.publish` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceprice.privateoffers.sendEmail` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.privateOffersAdmin` |
| `commerceprice.privateoffers.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercepricemanagement.editor`, `roles/commercepricemanagement.privateOffersAdmin` |

## Notes

- Roles and permissions of the `commercepricemanagement` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/commercepricemanagement (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
