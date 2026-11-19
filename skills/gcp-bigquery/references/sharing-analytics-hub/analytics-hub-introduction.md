---
source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction
---

# Introduction to BigQuery sharing

BigQuery sharing (formerly Analytics Hub) is a data exchange platform for securely sharing, discovering, and accessing data across organizational boundaries without replicating data. It is built on a publish and subscribe model: publishers put shared resources (BigQuery datasets or Pub/Sub topics) into listings inside data exchanges, and subscribers get a linked dataset or a linked Pub/Sub subscription in their own project.

## Signature / Usage

### Enable the API

The service stays named `analyticshub.googleapis.com`.

```bash
gcloud services enable analyticshub.googleapis.com
```

### Architecture

- Shared dataset: a BigQuery dataset that is the unit of sharing. Supported objects: authorized views, authorized datasets, BigQuery ML models, external tables, materialized views, routines (UDFs, table functions, SQL stored procedures), tables, table snapshots, views. Column-level and row-level security are supported.
- Shared topic: a Pub/Sub topic that is the unit of streaming data sharing.
- Data exchange: a container of listings. Private by default (only users or groups with access can view or subscribe); a public data exchange lets all Google Cloud users (`allAuthenticatedUsers`) discover and subscribe to its listings. A primary contact email can be assigned at creation.
- Listing: a reference to a shared resource, with description, sample queries, sample message data, documentation links, and instructions. Private by default; a public listing is shared with `allAuthenticatedUsers` (listings in a public exchange are public) and can reference free or commercial resources (including Cloud Marketplace-integrated commercial listings).
- Linked dataset: a read-only dataset in the subscriber project that points at the shared dataset. Subscribers can query tables and views in real time but cannot add or update objects. Authorized views, authorized datasets, and authorized routines are supported in addition to tables and views.
- Linked Pub/Sub subscription: created in the subscriber project when subscribing to a listing with a shared topic. Publishers can manage subscriptions in Pub/Sub or through BigQuery sharing subscription management.

### Data egress options (BigQuery shared datasets only)

Publishers can restrict egress on a listing, on query results, or both. When data egress is restricted:

- Copy, clone, export, and snapshot APIs and console options are unavailable.
- BigQuery Data Transfer Service is unavailable on the restricted dataset.
- `CREATE TABLE AS SELECT` statements and writing to a destination table are unavailable.
- `CREATE VIEW AS SELECT` statements and writing to a destination view are unavailable.

## Options / Props

### IAM roles

| Role | Name | Purpose |
|------|------|---------|
| `roles/analyticshub.admin` | Analytics Hub Admin | Create data exchanges; grant permissions to publishers and subscribers |
| `roles/analyticshub.publisher` | Analytics Hub Publisher | Share data; create listings; manage subscriptions; view usage metrics |
| `roles/analyticshub.listingAdmin` | Analytics Hub Listing Admin | Update, delete, and share listings without creating them |
| `roles/analyticshub.subscriber` | Analytics Hub Subscriber | Discover and subscribe to listings (creates a linked dataset or linked Pub/Sub subscription) |
| `roles/analyticshub.viewer` | Analytics Hub Viewer | Browse exchanges and listings; request access from the publisher |

### Pricing

No additional cost for managing data exchanges or listings.

| Resource | Publisher costs | Subscriber costs | More information |
|---|---|---|---|
| BigQuery datasets | Data storage | Queries run against the shared data (on-demand or capacity pricing) | https://cloud.google.com/bigquery/pricing |
| Pub/Sub topics | Data written (publish throughput) and network egress (if applicable) | Data read (subscribe throughput) and network egress (if applicable) | https://cloud.google.com/pubsub/pricing#pubsub |

### Supported regions

| Area | Region names |
|------|--------------|
| Americas | `us-east5`, `us-south1`, `us-central1`, `us-west4`, `us-west2`, `northamerica-south1`, `northamerica-northeast1`, `us-east4`, `us-central2`, `us-west1`, `us-west3`, `southamerica-east1`, `southamerica-west1`, `us-east1`, `northamerica-northeast2` |
| Asia Pacific | `asia-south2`, `asia-east2`, `asia-southeast2`, `australia-southeast2`, `asia-south1`, `asia-northeast2`, `asia-northeast3`, `asia-southeast1`, `australia-southeast1`, `asia-east1`, `asia-northeast1` |
| Europe | `europe-west1`, `europe-west10`, `europe-north1`, `europe-west3`, `europe-west2`, `europe-southwest1`, `europe-west8`, `europe-west4`, `europe-west9`, `europe-west12`, `europe-central2`, `europe-west6` |
| Middle East | `me-central2`, `me-central1`, `me-west1` |
| Africa | `africa-south1` |

| Multi-region | Name |
|---|---|
| Data centers within member states of the European Union (not stored in `europe-west2` London or `europe-west6` Zürich) | `EU` |
| Data centers in the United States | `US` |

| Omni region | Name |
|---|---|
| AWS - US East (N. Virginia) | `aws-us-east-1` |
| AWS - US West (Oregon) | `aws-us-west-2` |
| AWS - Asia Pacific (Seoul) | `aws-ap-northeast-2` |
| AWS - Asia Pacific (Sydney) | `aws-ap-southeast-2` |
| AWS - Europe (Ireland) | `aws-eu-west-1` |
| AWS - Europe (Frankfurt) | `aws-eu-central-1` |
| Azure - East US 2 | `azure-eastus2` |

### Limitations

| Area | Limitation |
|------|------------|
| General | A shared dataset can have a maximum of 1,000 linked datasets |
| General | A shared topic can have a maximum of 10,000 Pub/Sub subscriptions (includes linked subscriptions and subscriptions created directly in Pub/Sub) |
| General | A dataset with unsupported resources can't be selected as a shared dataset |
| General | No IAM roles / IAM policies or IAM tags on individual tables within a linked dataset; apply them at the linked dataset level |
| General | Linked datasets created before July 25, 2023 aren't backfilled by the Subscription resource; only subscriptions created after July 25, 2023 work with the API methods |
| Publisher | Subscribers need explicit permission to read the source dataset to query views within linked datasets; use authorized views |
| Publisher | The query plan reveals shared view and routine query definitions (including project IDs and other datasets); don't include sensitive information such as encryption keys |
| Publisher | Shared datasets are indexed in Knowledge Catalog; with more than 100 subscribers or tables, updates might take up to 18 hours to index |
| Publisher | Shared topics are indexed in Knowledge Catalog, but you can't filter specifically for their resource type |
| Publisher | With row-level security, column-level access control, or data masking on listed tables (or base tables of shared authorized views), subscribers can't query from a Standard edition reservation; they need on-demand pricing or an Enterprise or Enterprise Plus edition reservation |
| Subscriber | Materialized views that refer to tables in the linked dataset aren't supported |
| Subscriber | Snapshots of linked dataset tables aren't supported |
| Subscriber | Queries with linked datasets and `JOIN` statements that exceed 1 TB (physical storage) might fail |
| Subscriber | No region qualifiers with `INFORMATION_SCHEMA` views to view linked dataset metadata |
| Multi-region listings | Supported only for shared datasets and linked dataset replicas; not for shared Pub/Sub topics or subscriptions, data clean rooms, or BigQuery Omni regions |
| Usage metrics | None for listings subscribed before July 20, 2023 |
| Usage metrics | External table `num_rows_processed` / `total_bytes_processed` might be inaccurate |
| Usage metrics | Consumption metrics only for BigQuery jobs; not for the Storage Read API, `tabledata.list`, or BI Engine queries |
| Usage metrics | View usage metrics populated only for queries after April 22, 2024 |
| Usage metrics | Not captured for linked Pub/Sub subscriptions (view usage in Pub/Sub) |
| Usage metrics | SQL stored procedures are not in the usage metrics dashboard; see `INFORMATION_SCHEMA.ROUTINES`, not `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` |
| VPC Service Controls | Don't publish shared data or host exchanges in perimeter projects unless ingress and egress rules are configured for publisher, exchange, and subscriber projects |
| Salesforce Data 360 | Data 360 data is shared as views; subscribers can't access the underlying tables |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/analytics-hub-manage-exchanges
- The API, gcloud, and IAM names stay `analyticshub` / Analytics Hub; the product is called BigQuery sharing in the docs.
- Public data exchanges and public listings open discovery and subscription to `allAuthenticatedUsers` (any signed-in Google Cloud user).
- Compliance: ISO 27001, ISO 27017, ISO 27018, SOC 1, SOC 2, SOC 3, PCI DSS, Penetration Testing, HIPAA, HITRUST. Quotas: https://docs.cloud.google.com/bigquery/quotas#analytics-hub
- The source also describes partner collaboration and data monetization example scenarios and Marketplace pricing context; omitted here.
- Pub/Sub topics are the other shared resource type; Pub/Sub itself is in the gcp-messaging-workflows skill.

## Related

- [analytics-hub-manage-exchanges.md](./analytics-hub-manage-exchanges.md)
- [analytics-hub-manage-listings.md](./analytics-hub-manage-listings.md)
- [analytics-hub-view-subscribe-listings.md](./analytics-hub-view-subscribe-listings.md)
