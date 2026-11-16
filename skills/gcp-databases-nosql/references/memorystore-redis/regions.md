---
source: https://docs.cloud.google.com/memorystore/docs/redis/regions
---

# Memorystore for Redis locations

Memorystore for Redis deploys instances in regions, each subdivided into zones. For the Memorystore API, locations map to regions.

## Signature / Usage

Region and zone are given on creation:

Adapted (not in the official docs): `--redis-version=redis_6_X` changed to `redis_6_x`, the value gcloud accepts (it rejects `redis_6_X` as an invalid choice).

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1 \
    --zone=us-central1-a --redis-version=redis_6_x
```

## Options / Props

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
| `europe-southwest1` | Madrid | a, b, c |
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

- Zones are written as `<region>-<letter>` (for example `us-central1-a`); the table abbreviates the zone letters from the source's full zone lists.
- Memorystore for Redis Cluster has its own locations page.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances (the regions page has no commands).
- Corrected from the official docs: the source example ends with `--redis-version=redis_6_X`, which gcloud rejects (`Invalid choice: 'redis_6_X'. Did you mean 'redis_6_x'?`); the `--redis-version` choices in the gcloud reference are lower case (`redis_3_2`, `redis_4_0`, `redis_5_0`, `redis_6_x`, `redis_7_0`, `redis_7_2`).
- Source: https://docs.cloud.google.com/memorystore/docs/redis/regions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instances.md](./instances.md)
- [create-manage-instances.md](./create-manage-instances.md)
