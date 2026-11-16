---
source: https://docs.cloud.google.com/memorystore/docs/memcached/regions
---

# Regions and zones

Memorystore for Memcached instances live in zones within regions. A connecting client must be located in the same region as the instance. Connecting across zones of the same region is possible, but provisioning in the same zone improves network performance. For the Memorystore API, locations map to regions.

## Signature / Usage

### Pick a region at creation

```bash
gcloud memcache instances create myinstance --node-count=3 --node-cpu=2 --node-memory=2GB --region=us-central1 --zones=us-central1-a,us-central1-b,us-central1-c --memcached-version=1.6.15
```

## Options / Props

### Supported regions

Zones are the region name plus suffix: `-a`, `-b`, `-c` unless stated otherwise.

| Region | Location | Zones |
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
| `northamerica-northeast1` | Montreal | a, b, c |
| `northamerica-northeast2` | Toronto | a, b, c |
| `northamerica-south1` | Querétaro | a, b, c |
| `southamerica-east1` | São Paulo | a, b, c |
| `us-central1` | Iowa | a, b, c |
| `us-east1` | South Carolina | b, c, d |
| `us-east4` | Northern Virginia | a, b, c |
| `us-east5` | Columbus | a, b, c |
| `us-south1` | Dallas | a, b, c |
| `us-west1` | Oregon | a, b, c |
| `us-west2` | Los Angeles | a, b, c |
| `us-west3` | Salt Lake City | a, b, c |
| `us-west4` | Las Vegas | a, b, c |

## Notes

- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/create-manage-instances (the regions page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/regions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-node-properties.md](./instance-node-properties.md)
- [create-manage-instances.md](./create-manage-instances.md)
