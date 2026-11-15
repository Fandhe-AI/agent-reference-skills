---
source: https://docs.cloud.google.com/alloydb/docs/locations
---

# AlloyDB locations

When you create a cluster you choose a location by specifying a Google Cloud region; it cannot be changed afterwards. Highly available (regional) clusters are managed across zones automatically.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/alloydb/docs/cluster-create:

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --network=NETWORK
```

## Options / Props

Low CO2 marks regions flagged as low carbon in the source.

| Area | Region | Description | Low CO2 |
|---|---|---|---|
| Americas | `northamerica-northeast1` | Montreal | yes |
| Americas | `northamerica-northeast2` | Toronto | yes |
| Americas | `northamerica-south1` | Mexico | no |
| Americas | `southamerica-east1` | Brazil | yes |
| Americas | `southamerica-west1` | Santiago | yes |
| Americas | `us-central1` | Iowa | yes |
| Americas | `us-east1` | South Carolina | no |
| Americas | `us-east4` | Northern Virginia | no |
| Americas | `us-east5` | Columbus | no |
| Americas | `us-south1` | Dallas | yes |
| Americas | `us-west1` | Oregon | yes |
| Americas | `us-west2` | Los Angeles | no |
| Americas | `us-west3` | Salt Lake City | no |
| Americas | `us-west4` | Las Vegas | no |
| Europe | `europe-central2` | Warsaw | yes |
| Europe | `europe-southwest1` | Madrid | yes |
| Europe | `europe-north1` | Finland | yes |
| Europe | `europe-north2` | Stockholm | yes |
| Europe | `europe-west1` | Belgium | yes |
| Europe | `europe-west2` | London | yes |
| Europe | `europe-west3` | Frankfurt | no |
| Europe | `europe-west4` | Netherlands | yes |
| Europe | `europe-west6` | Zurich | yes |
| Europe | `europe-west8` | Milan | yes |
| Europe | `europe-west9` | Paris | yes |
| Europe | `europe-west10` | Berlin | no |
| Europe | `europe-west12` | Turin | yes |
| Asia | `asia-east1` | Taiwan | no |
| Asia | `asia-east2` | Hong Kong | no |
| Asia | `asia-northeast1` | Tokyo | no |
| Asia | `asia-northeast2` | Osaka | no |
| Asia | `asia-northeast3` | Seoul | no |
| Asia | `asia-south1` | Mumbai | no |
| Asia | `asia-south2` | Delhi | no |
| Asia | `asia-southeast1` | Singapore | no |
| Asia | `asia-southeast2` | Jakarta | no |
| Asia | `asia-southeast3` | Bangkok | no |
| Australia | `australia-southeast1` | Sydney | no |
| Australia | `australia-southeast2` | Melbourne | no |
| Middle East | `me-central1` | Doha | no |
| Middle East | `me-central2` | Dammam | no |
| Middle East | `me-west1` | Tel Aviv | no |
| Africa | `africa-south1` | Johannesburg | no |

## Notes

- For zonal instances you can optionally set a Compute Engine zone with the `gceZone` API parameter (`gce_zone` in Terraform). If omitted, AlloyDB selects a zone with available capacity.
- Place data close to its users and services to reduce latency, for example a cluster in `us-central1` (Iowa) if you write often from a Cloud Storage bucket in that region.
- Machine series availability differs per region; see the machine type page.
- Source inconsistency: the machine type page lists `us-east7` as an N2 region, which this page does not list.
- The borrowed `gcloud alloydb clusters create` snippet puts the password on the command line: gcloud 593.0.0 has no prompt option (`--password` is required), so use a throwaway initial password and change it afterwards, or prefer IAM database authentication (see the cluster creation page's Notes). `POSTGRES_VERSION` takes the gcloud enum `POSTGRES_14`–`POSTGRES_18`.
- Source: https://docs.cloud.google.com/alloydb/docs/locations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (borrowed snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-machine-type.md](./choose-machine-type.md)
- [cluster-create.md](./cluster-create.md)
