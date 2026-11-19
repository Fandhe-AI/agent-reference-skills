---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/analyticshub
---

# BigQuery sharing IAM roles and permissions

## Signature / Usage

Predefined roles of `analyticshub` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Analytics Hub Admin (`roles/analyticshub.admin`)

- Administer Data Exchanges and Listings
- Permissions (29): `analyticshub.dataExchanges.create`, `analyticshub.dataExchanges.delete`, `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.dataExchanges.setIamPolicy`, `analyticshub.dataExchanges.update`, `analyticshub.dataExchanges.viewSubscriptions`, `analyticshub.listings.create`, `analyticshub.listings.delete`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.listings.setIamPolicy`, `analyticshub.listings.update`, `analyticshub.listings.viewSubscriptions`, `analyticshub.queryTemplates.approve`, `analyticshub.queryTemplates.create`, `analyticshub.queryTemplates.delete`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `analyticshub.queryTemplates.update`, `analyticshub.subscriptions.create`, `analyticshub.subscriptions.delete`, `analyticshub.subscriptions.get`, `analyticshub.subscriptions.list`, `analyticshub.subscriptions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Editor (`roles/analyticshub.editor`)

- Editor role for Analytics Hub
- Permissions (25): `analyticshub.dataExchanges.create`, `analyticshub.dataExchanges.delete`, `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.dataExchanges.update`, `analyticshub.listings.create`, `analyticshub.listings.delete`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.listings.update`, `analyticshub.queryTemplates.approve`, `analyticshub.queryTemplates.create`, `analyticshub.queryTemplates.delete`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `analyticshub.queryTemplates.update`, `analyticshub.subscriptions.create`, `analyticshub.subscriptions.delete`, `analyticshub.subscriptions.get`, `analyticshub.subscriptions.list`, `analyticshub.subscriptions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Viewer (`roles/analyticshub.viewer`)

- Can browse Data Exchanges and Listings
- Permissions (10): `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Listing Admin (`roles/analyticshub.listingAdmin`)

- Grants full control over the Listing, including updating, deleting and setting ACLs
- Permissions (14): `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.listings.delete`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.listings.setIamPolicy`, `analyticshub.listings.update`, `analyticshub.listings.viewSubscriptions`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Publisher (`roles/analyticshub.publisher`)

- Can publish to Data Exchanges thus creating Listings
- Permissions (15): `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.listings.create`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.queryTemplates.approve`, `analyticshub.queryTemplates.create`, `analyticshub.queryTemplates.delete`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `analyticshub.queryTemplates.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Subscriber (`roles/analyticshub.subscriber`)

- Can browse Data Exchanges and subscribe to Listings
- Permissions (12): `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.dataExchanges.subscribe`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.listings.subscribe`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Subscription Owner (`roles/analyticshub.subscriptionOwner`)

- Grants full control over the Subscription, including updating and deleting
- Permissions (15): `analyticshub.dataExchanges.get`, `analyticshub.dataExchanges.getIamPolicy`, `analyticshub.dataExchanges.list`, `analyticshub.listings.get`, `analyticshub.listings.getIamPolicy`, `analyticshub.listings.list`, `analyticshub.queryTemplates.get`, `analyticshub.queryTemplates.list`, `analyticshub.subscriptions.create`, `analyticshub.subscriptions.delete`, `analyticshub.subscriptions.get`, `analyticshub.subscriptions.list`, `analyticshub.subscriptions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Analytics Hub Service Agent (`roles/analyticshub.serviceAgent`)

- Grants Analytics Hub Service Agent permissions required to manage resources in the consumer project. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `analyticshub.dataExchanges.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/analyticshub.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `analyticshub.dataExchanges.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor` |
| `analyticshub.dataExchanges.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor` |
| `analyticshub.dataExchanges.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.supportUser` |
| `analyticshub.dataExchanges.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `analyticshub.dataExchanges.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `analyticshub.dataExchanges.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/analyticshub.admin`, `roles/iam.securityAdmin` |
| `analyticshub.dataExchanges.subscribe` | `roles/admin`, `roles/owner`, `roles/analyticshub.subscriber` |
| `analyticshub.dataExchanges.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor` |
| `analyticshub.dataExchanges.viewSubscriptions` | `roles/admin`, `roles/owner`, `roles/analyticshub.admin` |
| `analyticshub.listings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.publisher` |
| `analyticshub.listings.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.listingAdmin` |
| `analyticshub.listings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.supportUser` |
| `analyticshub.listings.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `analyticshub.listings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `analyticshub.listings.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/analyticshub.admin`, `roles/iam.securityAdmin`, `roles/analyticshub.listingAdmin` |
| `analyticshub.listings.subscribe` | `roles/admin`, `roles/owner`, `roles/analyticshub.subscriber` |
| `analyticshub.listings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.listingAdmin` |
| `analyticshub.listings.viewSubscriptions` | `roles/admin`, `roles/owner`, `roles/analyticshub.admin`, `roles/analyticshub.listingAdmin` |
| `analyticshub.queryTemplates.approve` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.publisher` |
| `analyticshub.queryTemplates.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.publisher` |
| `analyticshub.queryTemplates.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.publisher` |
| `analyticshub.queryTemplates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.supportUser` |
| `analyticshub.queryTemplates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/analyticshub.listingAdmin`, `roles/analyticshub.publisher`, `roles/analyticshub.subscriber`, `roles/analyticshub.subscriptionOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `analyticshub.queryTemplates.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.publisher` |
| `analyticshub.subscriptions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.subscriptionOwner` |
| `analyticshub.subscriptions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.subscriptionOwner` |
| `analyticshub.subscriptions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.subscriptionOwner`, `roles/iam.supportUser` |
| `analyticshub.subscriptions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/analyticshub.subscriptionOwner`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `analyticshub.subscriptions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/analyticshub.admin`, `roles/analyticshub.editor`, `roles/analyticshub.subscriptionOwner` |

## Notes

- Roles and permissions of the `analyticshub` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/analyticshub (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
