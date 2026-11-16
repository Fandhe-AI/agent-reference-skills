---
source: https://docs.cloud.google.com/memorystore/docs/cluster/locations
---

# Memorystore for Redis Cluster locations

Memorystore for Redis Cluster deploys clusters in regions. A region is a geographical location where you can run your resources.

## Signature / Usage

### Create a cluster in a supported region

```bash
gcloud redis clusters create INSTANCE_ID \
--region=REGION_ID \
--network=NETWORK \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--acl-policy=ACL_POLICY_NAME
```

## Options / Props

### Supported regions

| Region | Description | Zones |
|---|---|---|
| `africa-south1` | Johannesburg | a, b, c |
| `asia-east1` | Taiwan | a, b, c |
| `asia-east2` | Hong Kong | a, b, c |
| `asia-northeast1` | Tokyo | a, b, c |
| `asia-northeast2` | Osaka | a, b, c |
| `asia-northeast3` | Seoul | a, b, c |
| `asia-south1` | Mumbai | a, b, c |
| `asia-south2` | Delhi | a, b, c |
| `asia-southeast1` | Singapore | a, b, c |
| `asia-southeast2` | Jakarta | a, b, c |
| `asia-southeast3` | Bangkok | a, b, c |
| `australia-southeast1` | Sydney | a, b, c |
| `australia-southeast2` | Melbourne | a, b, c |
| `europe-central2` | Warsaw | a, b, c |
| `europe-north1` | Finland | a, b, c |
| `europe-north2` | Stockholm | a, b, c |
| `europe-southwest1` | Madrid | b, c, d |
| `europe-west1` | Belgium | b, c, d |
| `europe-west2` | London | a, b, c |
| `europe-west3` | Frankfurt | a, b, c |
| `europe-west4` | Netherlands | a, b, c |
| `europe-west6` | Zurich | a, b, c |
| `europe-west8` | Milan | a, b, c |
| `europe-west9` | Paris | a, b, c |
| `europe-west10` | Berlin | a, b, c |
| `europe-west12` | Turin | a, b, c |
| `me-central1` | Doha | a, b, c |
| `me-central2` | Dammam | a, b, c |
| `me-west1` | Tel Aviv | a, b, c |
| `northamerica-northeast1` | Montréal | a, b, c |
| `northamerica-northeast2` | Toronto | a, b, c |
| `northamerica-south1` | Mexico | a, b, c |
| `southamerica-east1` | São Paulo | a, b, c |
| `southamerica-west1` | Santiago | a, b, c |
| `us-central1` | Iowa | a, b, c, f |
| `us-east1` | South Carolina | b, c, d |
| `us-east4` | Northern Virginia | a, b, c |
| `us-east5` | Columbus | a, b, c |
| `us-south1` | Dallas | a, b, c |
| `us-west1` | Oregon | a, b, c |
| `us-west2` | Los Angeles | a, b, c |
| `us-west3` | Salt Lake City | a, b, c |
| `us-west4` | Las Vegas | a, b, c |

## Notes

- Zone column abbreviated: a zone letter `x` in region `R` means the zone `R-x` (for example `us-central1-f`); the source lists full zone names.
- Not all regions supported by Memorystore for Redis are available for Memorystore for Redis Cluster; `gcloud redis regions list` shows Memorystore for Redis regions, not Memorystore for Redis Cluster regions (stated on the create-instances page).
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/cluster/create-instances (this page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/locations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instances.md](./create-instances.md)
- [quotas.md](./quotas.md)
