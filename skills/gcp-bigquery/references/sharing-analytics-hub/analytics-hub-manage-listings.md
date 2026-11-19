---
source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-manage-listings
---

# Manage listings

As a data publisher in BigQuery sharing (formerly Analytics Hub) you create, update, share, and delete listings in any data exchange where you have publishing access, manage access with BigQuery sharing roles, view and remove subscribers, and monitor usage metrics. A listing is a reference to a shared dataset (or Pub/Sub topic) that a publisher lists in a data exchange.

## Signature / Usage

### Enable the Analytics Hub API

Needs `serviceUsage.services.get`, `serviceUsage.services.list`, `serviceUsage.services.enable` (Service Usage Admin, `roles/serviceusage.serviceUsageAdmin`).

```bash
gcloud services enable analyticshub.googleapis.com
```

### Create a listing

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings?listingId=LISTING_ID
```

The request body is a `Listing` resource. For a listing across multiple regions, specify the regions in `bigqueryDataset.replicaLocations`; omit it to use the primary region of the shared dataset. With `logLinkedDatasetQueryUserEmail` set to `true` the response returns `logLinkedDatasetQueryUserEmail: true`.

### Give users access to a listing

Read the policy:

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings/LISTING_ID:getIamPolicy
```

Member formats: `user:test-user@gmail.com`, `group:admins@example.com`, `serviceAccount:test123@example.domain.com`, `domain:example.domain.com`. Binding that grants `roles/analyticshub.subscriber` to a group:

```json
{
"members": [
 "group:subscribers@example.com"
],
"role":"roles/analyticshub.subscriber"
}
```

Set the updated policy:

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings/LISTING_ID:setIamPolicy
```

### View all subscriptions

SQL (linked datasets of a shared dataset in `myproject`, region `us`; for a multi-region listing replace the region, for example `region-eu`):

```sql
SELECT * FROM `myproject`.`region-us`.INFORMATION_SCHEMA.SCHEMATA_LINKS;
```

```sql
SELECT * FROM `myproject`.`region-eu`.INFORMATION_SCHEMA.SCHEMATA_LINKS;
```

API:

```text
GET https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings/LISTING_ID:listSubscriptions
```

### Remove a subscription (created after July 25, 2023)

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/subscriptions/SUBSCRIPTION_ID:revoke
```

### Update a listing

```text
PATCH https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings/LISTING_ID?updateMask=UPDATEMASK
```

### Delete a listing

```text
DELETE https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings/LISTING_ID
```

## Options / Props

### Required roles

| Role | Capability |
|------|------------|
| Analytics Hub Publisher (`roles/analyticshub.publisher`) | Create, update, delete, and set IAM policies on your listings |
| Analytics Hub Listing Admin (`roles/analyticshub.listingAdmin`) | Update, delete, and set IAM policies on your listings |
| Analytics Hub Admin (`roles/analyticshub.admin`) | Create, update, delete, and set IAM policies on all listings in your data exchange |
| `bigquery.datasets.get` + `bigquery.datasets.update` on the source datasets | Needed to create listings or update replica regions; `bigquery.datasets.update` is in BigQuery Data Owner (`roles/bigquery.dataOwner`) and BigQuery Admin (`roles/bigquery.admin`) |
| `resourcemanager.organizations.get` | View all data exchanges across projects in an organization; no BigQuery predefined role has it, so use a custom role |

### Updatable `Listing` fields (`updateMask`)

| Field |
|-------|
| `displayName` |
| `description` |
| `primaryContact` |
| `documentation` |
| `icon` |
| `categories[]` |
| `discoveryType` |
| `logLinkedDatasetQueryUserEmail` |
| `bigqueryDataset.replicaLocations` |

### Console listing settings

| Setting | Detail |
|---------|--------|
| Resource type | BigQuery dataset or Pub/Sub Topic; shared dataset must be in the same region as the data exchange and can't be changed after creation |
| Allow stored procedure sharing | Preview |
| Region data availability | Only regions with cross-region dataset replication turned on can be selected ("Ready to use"); default is the primary region ("Provider primary") |
| Data egress controls | Disable copy and export of shared data; Disable copy and export of query results (also selects shared data); Disable copy and export of tables through APIs (also selects shared data) |
| Category | Up to five categories |
| Data affinity | Regions used for publishing data; helps subscribers avoid Pub/Sub network egress costs |
| Icon | PNG or JPEG, smaller than 512 KiB, maximum 512 x 512 pixels |
| Public discoverability | Grant `roles/analyticshub.viewer` to `allUsers` or `allAuthenticatedUsers`; project needs an associated organization and billing account |
| Subscriber Email Logging | Logs principal identifiers to `job_principal_subject` of `INFORMATION_SCHEMA.SHARED_DATASET_USAGE`; applies to future subscriptions; not editable once saved |
| Contacts | Primary contact, Request access contact, Provider (name, primary contact), Publisher (name, primary contact) |

### Roles by listing type

| Listing type | Principal | Role |
|--------------|-----------|------|
| Private | Specific identities | Analytics Hub Subscriber |
| Non-commercial public | `allAuthenticatedUsers` | Analytics Hub Subscriber |
| Public, discoverable to non-Google Cloud users | `allUsers` | Analytics Hub Viewer |
| Commercial (including Marketplace-integrated) | Users who may browse and request access | Analytics Hub Viewer |
| Cloud Marketplace-integrated | n/a | Subscriber role is granted automatically from Cloud Marketplace orders |

## Notes

- Corrected from the official docs: the source writes the response field as `log_linked_dataset_query_user_email`; the REST JSON name is `logLinkedDatasetQueryUserEmail`.
- Source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-manage-listings (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The API, gcloud, and IAM names stay `analyticshub`; the console page is "Sharing (Analytics Hub)".
- The source also shows Console steps (create listing, create from a dataset via Sharing > Publish as listing, permissions, subscriptions, update, delete); omitted.
- Public and private listings: a private listing stays private even if `allAuthenticatedUsers` may subscribe (not shown as public on the sharing page); share its URL, or make the exchange public. Publicly discoverable exchanges can't have private listings, but private exchanges can have public listings. Granting `allUsers` / `allAuthenticatedUsers` opens the listing to everyone on the internet / every signed-in Google user.
- Create a non-authenticated URL: the listing must have public discoverability on; click Copy public link and make sure `allUsers` has `roles/analyticshub.viewer`.
- Create a listing administrator by granting Publisher or Listing Admin on the listing. A single BigQuery sharing listing supports both requesting access and Cloud Marketplace-integrated flows, so an offline commercial listing can become Marketplace-integrated without disrupting subscriptions.
- When editing the IAM policy, send back the whole policy returned by `getIamPolicy` (including its `etag`) so concurrent changes aren't overwritten.
- Caution: avoid creating shared datasets in a project that uses a VPC Service Controls perimeter; if you must, configure ingress and egress rules (https://docs.cloud.google.com/bigquery/docs/analytics-hub-vpc-sc-rules#create_a_listing). Updating a listing in a perimeter may also need rules for background synchronization (https://docs.cloud.google.com/bigquery/docs/analytics-hub-vpc-sc-rules#update-listing).
- Preview: sharing SQL stored procedures across listings is subject to the "Pre-GA Offerings Terms" (feedback: bq-data-sharing-feedback@google.com). After subscribing, the subscriber sends the linked dataset name to the provider, who authorizes the linked stored procedure on the provider's resources (non-read operations: authorize the linked shared stored procedure and attach an IAM role to each accessed provider resource; read operations: authorize either the linked or the original procedure). The subscriber must also authorize the linked procedure and attach an IAM role on their own resources.
- Remove a subscription: subscriptions created before July 25, 2023 are removed from the console list (Delete / Remove all subscriptions, confirm by typing `remove`); the linked dataset unlinks but stays visible in the subscriber project. Revoking Cloud Marketplace-integrated commercial subscriptions can impact customers and might violate the Cloud Marketplace Terms of Service. Try removals on a disposable listing first.
- Update a listing: all values except the shared dataset can change. Before adding regions, enable cross-region dataset replication on the shared dataset (you can only add regions where it has a replica); before removing a region, delete the shared dataset replica in that region. Single-region listings can be converted to multi-region. Updating a Cloud Marketplace-integrated listing prompts an update of the Marketplace data product listing, which needs review and approval by the Marketplace Operations Team.
- Featured section: requires data in BigQuery, enrollment in the Google Cloud Partner Network program (Technology Partner Path), and a listing with public discoverability on; request via the Featured listing intake form (governed by the Google Cloud Partner Program Agreement).
- Delete a listing is permanent and can't be undone. It deletes all linked datasets and removes subscriptions in subscriber projects (remove any remaining linked dataset via Sharing > Manage Subscription). Marketplace-integrated listings with active commercial subscriptions can't be deleted until all are revoked. Deleting a multi-region listing doesn't delete shared dataset replicas (delete them separately if no other listing references them) and requires revoking active subscriptions first via `projects.locations.subscriptions.revoke`. Try it on a disposable listing first.

## Related

- [analytics-hub-introduction.md](./analytics-hub-introduction.md)
- [analytics-hub-manage-exchanges.md](./analytics-hub-manage-exchanges.md)
- [analytics-hub-view-subscribe-listings.md](./analytics-hub-view-subscribe-listings.md)
