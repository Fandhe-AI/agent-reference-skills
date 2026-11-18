---
source: https://docs.cloud.google.com/logging/docs/region-support
---

# Regionality and supported regions for Cloud Logging

Log buckets are regional resources: the infrastructure that stores, indexes, and searches logs is in a specific location. Except for buckets in `global`, `eu`, or `us`, Google Cloud manages the infrastructure so data is redundantly available across zones in the bucket's region.

## Signature / Usage

To apply a storage region to the new `_Default` and `_Required` buckets in your organization, configure the default resource location.

Snippet taken from https://docs.cloud.google.com/logging/docs/default-settings

```none
gcloud logging settings update --organization=ORGANIZATION_ID --storage-location=LOCATION
```

## Options / Props

### Special locations

| Region name | Description |
|---|---|
| `global` | Logs stored in any data centers in the world; may be moved. No additional redundancy guarantees compared to a regional bucket. |
| `eu` | Any data centers within the European Union; may be moved. No additional redundancy guarantees. |
| `us` | Any data centers within the United States; may be moved. No additional redundancy guarantees. |

### Africa

| Region name | Description |
|---|---|
| `africa-south1` | Johannesburg |

### Americas

| Region name | Description |
|---|---|
| `northamerica-northeast1` | Montréal |
| `northamerica-northeast2` | Toronto |
| `northamerica-south1` | Mexico |
| `southamerica-east1` | São Paulo |
| `southamerica-west1` | Santiago |
| `us-central1` | Iowa |
| `us-east1` | South Carolina |
| `us-east4` | North Virginia |
| `us-east5` | Columbus |
| `us-south1` | Dallas |
| `us-west1` | Oregon |
| `us-west2` | Los Angeles |
| `us-west3` | Salt Lake City |
| `us-west4` | Las Vegas |

### Asia Pacific

| Region name | Description |
|---|---|
| `asia-east1` | Taiwan |
| `asia-east2` | Hong Kong |
| `asia-northeast1` | Tokyo |
| `asia-northeast2` | Osaka |
| `asia-northeast3` | Seoul |
| `asia-south1` | Mumbai |
| `asia-south2` | Delhi |
| `asia-southeast1` | Singapore |
| `asia-southeast2` | Jakarta |
| `asia-southeast3` | Bangkok |
| `australia-southeast1` | Sydney |
| `australia-southeast2` | Melbourne |

### Europe

| Region name | Description |
|---|---|
| `europe-central2` | Warsaw |
| `europe-north1` | Finland |
| `europe-north2` | Stockholm |
| `europe-southwest1` | Madrid |
| `europe-west1` | Belgium |
| `europe-west2` | London |
| `europe-west3` | Frankfurt |
| `europe-west4` | Netherlands |
| `europe-west6` | Zurich |
| `europe-west8` | Milan |
| `europe-west9` | Paris |
| `europe-west10` | Berlin |
| `europe-west12` | Turin |

### Middle East

| Region name | Description |
|---|---|
| `me-central1` | Doha |
| `me-central2` | Dammam |
| `me-west1` | Tel Aviv |

## Notes

- Log Router: processes all entries written to the API in the region in which they are received, and stores them temporarily to buffer against sink disruptions. It may send logs to a different region based on a sink's definition, or if you share log data with another service such as Security Command Center Threat Detection. Sinks apply regardless of region.
- `_Required` and `_Default` buckets are in `global` by default; you can't change the location of existing buckets, but default settings can set the location for new ones. A user-defined bucket's location is set at creation and can't be changed; create a new bucket and direct entries to it with sinks.
- To choose where data is stored or analyzed with Observability Analytics, don't use `global`: use a regional bucket, or, to colocate with a BigQuery multi-region, use the matching `eu` / `us` location. Buckets in `global` or multi-regions offer no added resiliency over single regions such as `us-west1`.
- Queries across regions run in the locations of the queried buckets and are aggregated in the region the query was received from.
- Limitations: no advisory notifications about sensitive actions when Admin Activity logs are in a specific region; no CMEK on a bucket in `global`; Cloud Monitoring is a global product and the storage location of log-based metric time series is unspecified; Gemini Cloud Assist can store data in any Google Cloud data center globally, so with data residency or CMEK requirements don't enable the Gemini Cloud Assist API (or services that query log data and store results in `global`).
- The Logs Explorer shows `global` buckets as, for example, `GLOBAL (US-WEST4)`.
- Source: https://docs.cloud.google.com/logging/docs/region-support (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [store-log-entries.md](./store-log-entries.md)
- [default-settings.md](./default-settings.md)
