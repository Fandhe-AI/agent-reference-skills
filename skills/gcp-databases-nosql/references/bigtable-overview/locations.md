---
source: https://docs.cloud.google.com/bigtable/docs/locations
---

# Bigtable locations

You choose a zonal location (a zone within a region) for each cluster when creating an instance, and you cannot change the location after the cluster is created. Store data close to the users and services that need it, for example a cluster in a `us-central1` zone if you frequently write from a Cloud Storage bucket in `us-central1` (Iowa).

## Signature / Usage

### Zone naming

Zones follow the pattern `REGION-LETTER` (for example `us-central1-a`, `us-central1-b`, `us-central1-c`, `us-central1-f`). The zone is set per cluster at creation; an instance with clusters in two zones (example from the gcloud reference):

```bash
gcloud bigtable instances create my-instance-id \
    --display-name="My Instance" \
    --cluster-config=id=my-cluster-id-1,zone=us-east1-c \
    --cluster-config=id=my-cluster-id-2,zone=us-west1-c,nodes=3
```

## Options / Props

Zones available per region (each region listed below offers zones `a`, `b`, `c` except where noted). Regions marked "Low CO2" carry the source's Low CO~2~ label.

| Region | Location | Zones | Low CO2 |
|--------|----------|-------|---------|
| `africa-south1` | Johannesburg | a, b, c | no |
| `asia-east1` | Taiwan | a, b, c | no |
| `asia-east2` | Hong Kong | a, b, c | no |
| `asia-northeast1` | Tokyo | a, b, c | no |
| `asia-northeast2` | Osaka | a, b, c | no |
| `asia-northeast3` | Seoul | a, b, c | no |
| `asia-south1` | Mumbai | a, b, c | no |
| `asia-south2` | Delhi | a, b, c | no |
| `asia-southeast1` | Singapore | a, b, c | no |
| `asia-southeast2` | Jakarta | a, b, c | no |
| `asia-southeast3` | Bangkok | a, b, c | no |
| `australia-southeast1` | Sydney | a, b, c | no |
| `australia-southeast2` | Melbourne | a, b, c | no |
| `europe-central2` | Warsaw | a, b, c | yes |
| `europe-north1` | Finland | a, b, c | yes |
| `europe-north2` | Stockholm | a, b, c | yes |
| `europe-southwest1` | Madrid | a, b, c | yes |
| `europe-west1` | Belgium | b, c, d | yes |
| `europe-west2` | London | a, b, c | yes |
| `europe-west3` | Frankfurt | a, b, c | no |
| `europe-west4` | Netherlands | a, b, c | yes |
| `europe-west6` | Zürich | a, b, c | yes |
| `europe-west8` | Milan | a, b, c | yes |
| `europe-west9` | Paris | a, b, c | yes |
| `europe-west10` | Berlin | a, b, c | no |
| `europe-west12` | Turin | a, b, c | yes |
| `me-central1` | Doha | a, b, c | no |
| `me-central2` | Dammam | a, b, c | no |
| `me-west1` | Tel Aviv | a, b, c | no |
| `northamerica-northeast1` | Montréal | a, b, c | yes |
| `northamerica-northeast2` | Toronto | a, b, c | yes |
| `northamerica-south1` | Mexico | a, b, c | no |
| `us-central1` | Iowa | a, b, c, f | yes |
| `us-east1` | South Carolina | b, c, d | no |
| `us-east4` | Northern Virginia | a, b, c | no |
| `us-east5` | Columbus | a, b, c | no |
| `us-south1` | Dallas | a, b, c | yes |
| `us-west1` | Oregon | a, b, c | yes |
| `us-west2` | Los Angeles | a, b, c | no |
| `us-west3` | Salt Lake City | a, b, c | no |
| `us-west4` | Las Vegas | a, b, c | no |
| `southamerica-east1` | São Paulo | a, b, c | yes |
| `southamerica-west1` | Santiago | a, b, c | yes |

## Notes

- If a zone becomes unavailable, all zonal resources in that zone are unavailable until service is restored.
- An instance can have clusters in up to 8 regions and only one cluster per zone (see the quotas page).
- The source lists one row per zone; this page condenses them to one row per region without changing the zone names.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create (the locations page has no code block).
- Source: https://docs.cloud.google.com/bigtable/docs/locations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
- [quotas.md](./quotas.md)
