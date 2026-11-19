---
source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-view-subscribe-listings
---

# View and subscribe to listings and data exchanges

In BigQuery sharing (formerly Analytics Hub) you discover and subscribe to listings and data exchanges (data clean room exchanges) to query shared data directly in BigQuery. Subscribing creates read-only linked datasets in your project; no data is replicated and no storage costs are incurred.

## Signature / Usage

### Subscribe to a listing

Call `projects.locations.dataExchanges.listings.subscribe`:

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID/listings/LISTING_ID:subscribe
```

Request body (the linked dataset to create):

```json
{
"destinationDataset": {
  "datasetReference": {
    "projectId": "SUBSCRIBER_PROJECT_ID",
    "datasetId": "LINKED_DATASET_ID"
  },
  "location": "PRIMARY_REGION"
}
}
```

For linked dataset replicas in multiple regions, set the primary region in `location` and add secondary regions to `destinationDataset.replicaLocations`; all must be regions where the listing is available. The response body is a `SubscribeListingResponse` whose `subscription` field holds the created `Subscription`. If subscriber email logging is on, it contains `logLinkedDatasetQueryUserEmail: true`; if stored procedure sharing (Preview) is on, the listing response contains `storedProcedureConfig.enabled: true`.

### Subscribe to a data exchange (data clean room)

Call `projects.locations.dataExchanges.subscribe`:

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID:subscribe
```

```json
{
"destination": "projects/SUBSCRIBER_PROJECT_ID/locations/LOCATION",
"subscription": "SUBSCRIPTION_ID",
"destinationDataset": {
  "datasetReference": {
    "projectId": "SUBSCRIBER_PROJECT_ID",
    "datasetId": "LINKED_DATASET_ID"
  },
  "location": "PRIMARY_REGION"
}
}
```

The response is an Operation object.

### List linked datasets

Adapted (not in the official docs): removed the trailing `\` after `PROJECT=PROJECT_ID`, which joined the assignment and the `for` line into one invalid command; `${PROJECT}` and `${dataset}` (taken from command output) are double-quoted.

```bash
PROJECT=PROJECT_ID
for dataset in $(bq ls --project_id "${PROJECT}" | tail +3); do [ "$(bq show -d --project_id "${PROJECT}" "${dataset}" | egrep LINKED)" ] && echo "${dataset}"; done
```

In Knowledge Catalog search, match all linked datasets with the predicate `type=dataset.linked`.

### Query linked datasets

```sql
SELECT * FROM `PROJECT_ID`.`LINKED_DATASET_ID`.`TABLE_NAME`
LIMIT 10;
```

### View table metadata

```sql
SELECT * FROM `LINKED_DATASET_ID`.INFORMATION_SCHEMA.TABLES;
```

## Options / Props

### Required roles

| Task | Role | Scope |
|------|------|-------|
| Discover listings and data exchanges | Analytics Hub Viewer (`roles/analyticshub.viewer`) | Subscriber project (as the source writes it; for a listing or exchange in another project, the role must be on that listing, exchange or publisher project, see Notes) |
| Subscribe to listings | BigQuery User (`roles/bigquery.user`) | Subscriber project |
| Subscribe to listings | Analytics Hub Subscriber (`roles/analyticshub.subscriber`) | Publisher's listing, exchange, or project |
| Subscribe to data exchanges | BigQuery User (`roles/bigquery.user`) | Subscriber project |
| Subscribe to data exchanges | Analytics Hub Subscriber (`roles/analyticshub.subscriber`) | Data clean room |
| Subscribe to data exchanges | Analytics Hub Subscription Owner (`roles/analyticshub.subscriptionOwner`) | Destination project |
| View and query linked datasets | BigQuery Data Viewer (`roles/bigquery.dataViewer`) | Subscriber project |
| View table metadata | BigQuery Data Viewer (`roles/bigquery.dataViewer`) | Subscriber project |
| Update linked datasets | BigQuery Data Owner (`roles/bigquery.dataOwner`) | Subscriber project |
| Delete linked datasets | BigQuery Admin (`roles/bigquery.admin`) | Subscriber project |

Required permissions: `bigquery.datasets.create` (create new datasets) and `bigquery.jobs.create` (query datasets), both on the subscriber project. Creating linked dataset replicas also needs `bigquery.datasets.update` on the linked dataset.

### Placeholders

| Name | Description |
|------|-------------|
| `PROJECT_ID` | Project that contains the listing / data exchange (in the `bq` and query examples: your project) |
| `LOCATION` | Location of the listing or data exchange |
| `DATAEXCHANGE_ID` / `LISTING_ID` | IDs to subscribe to |
| `SUBSCRIBER_PROJECT_ID` | Project where the linked dataset is created |
| `LINKED_DATASET_ID` | ID given to the linked dataset |
| `PRIMARY_REGION` | Region where the linked dataset is created |
| `SUBSCRIPTION_ID` | Name of the subscription to create (data exchange subscribe) |

## Notes

- Corrected from the official docs: the source writes `replica_locations`, `log_linked_dataset_query_user_email` and `stored_procedure_config: true`; the REST JSON names are `replicaLocations`, `logLinkedDatasetQueryUserEmail` and `storedProcedureConfig` (an object whose `enabled` field is the boolean), and `listings.subscribe` returns `SubscribeListingResponse` (field `subscription`) rather than a bare Subscription.
- Adapted from the official docs: the linked-dataset loop expands `$PROJECT` and `$dataset` unquoted; they are written `"${PROJECT}"` / `"${dataset}"` so a value from `bq ls` output is passed as one argument.
- The source says to grant Analytics Hub Viewer "on the subscriber project". An IAM grant applies to the resource it is set on and its descendants, so it does not reach a listing or exchange in a publisher project; the publisher grants `roles/analyticshub.viewer` on the listing or exchange (for public discoverability to `allUsers` / `allAuthenticatedUsers`), as described in https://docs.cloud.google.com/bigquery/docs/analytics-hub-manage-listings.
- Source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-view-subscribe-listings (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source shows `PROJECT=PROJECT_ID \` followed by `for dataset in $(bq ls --project_id $PROJECT | ...` on the next line (a continuation that merges the two lines) with unquoted `$PROJECT` / `$dataset`.
- The source also shows Console steps for discovering, subscribing, viewing, updating, and deleting linked datasets; omitted.
- Discovery filters in the console: Listings (private, public, or within your organization; "Clean rooms" for data clean room exchanges), Categories, Location (data exchange location only), Provider.
- Commercial listings: click Request access or Purchase via Marketplace instead of Subscribe.
- Replica regions: the system attempts to create linked dataset replicas, but without `bigquery.datasets.update` on the linked dataset replicas aren't created. The primary region doesn't need to match the provider's primary region.
- Caution: avoid placing data in a project within a VPC Service Controls perimeter; if you do, add the appropriate ingress and egress rules (https://docs.cloud.google.com/bigquery/docs/analytics-hub-vpc-sc-rules#subscribe_to_a_listing).
- Running shared stored procedures (Preview) in a linked dataset requires authorizing them (authorized routines) to access resources in your project.
- Linked dataset resources are read-only: you can only update the description and labels (and default collation); changes don't affect the source or shared dataset.
- Region-based `INFORMATION_SCHEMA` queries don't return metadata for linked tables.
- Unsubscribing means deleting the linked dataset; this doesn't delete the source dataset and can't be undone (you can resubscribe to recreate it). Try it on a disposable linked dataset first. If a publisher removes your subscription, the linked dataset stays in your project, unlinked, and can't be queried; delete it.

## Related

- [analytics-hub-introduction.md](./analytics-hub-introduction.md)
- [analytics-hub-manage-exchanges.md](./analytics-hub-manage-exchanges.md)
- [analytics-hub-manage-listings.md](./analytics-hub-manage-listings.md)
