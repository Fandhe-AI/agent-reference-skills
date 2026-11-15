---
source: https://docs.cloud.google.com/storage/docs/locations
---

# Bucket locations

A bucket's location is where its object data physically resides, chosen at creation. Location types are zone (Rapid Bucket only), region, dual-region and multi-region; the type determines replication, availability and price.

## Signature / Usage

The location code is the `LOCATION` of the bucket (also used with customer-managed encryption keys and the resource locations org policy constraint). Examples from the source: region `US-CENTRAL1`, zone `US-CENTRAL1-A`, predefined dual-region `ASIA1`, multi-region `US`, configurable dual-region location code `EU` with placement `EU-CENTRAL2` and `EU-WEST1`.

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

Replace `BUCKET_LOCATION` with a location such as `US`. For a configurable dual-region set `--location` to the location code and add `--placement` with a valid pair of regions, for example `--location=ASIA --placement=ASIA-EAST1,ASIA-SOUTHEAST1`.

## Options / Props

### Location types compared

| | Zone | Region | Dual-region | Multi-region |
|---|---|---|---|---|
| Availability | Redundancy within one zone; zonal outages might affect availability | Synchronous redundancy across zones; RTO=0 automated failover/failback on zonal failure | Higher availability than regions for a class; asynchronous cross-region redundancy; turbo replication option (within 15 minutes); RTO=0 on regional failure | Higher availability than regions for a class; asynchronous cross-region redundancy; RTO=0 on regional failure |
| Pricing | Highest storage price, highest performance; zonal data transfer charges apply | Lowest storage price; no replication charges; no outbound transfer charges reading within the same region | Highest storage price; replication charges on write; no outbound transfer reading within either region | Higher than regions, lower than dual-regions; replication charges on write; outbound transfer charges always apply |

### Recommendations

| Requirement | Location | Workloads |
|---|---|---|
| Ultra-low latency, ultra-high bandwidth and I/O | Zone (Rapid Bucket only) | AI/ML, HPC, data-intensive analytics |
| Optimized latency, lowest cost, cross-zone redundancy | Region | Analytics, backup and archive |
| Cross-region redundancy with precise control of locations | Dual-region | Analytics, backup/archive, disaster recovery |
| Cross-geography access, cross-region redundancy | Multi-region | Content serving |

For a short, predictable RPO enable turbo replication on a dual-region. Use regions for short-lived datasets to avoid replication charges. Colocate data with Compute Engine VMs in the same zone or region (also dual-regions) for performance. For strict-performance multi-region workloads consider Rapid Cache.

### Zones (zonal buckets via Rapid Bucket)

| Region | Zones |
|---|---|
| `ASIA-SOUTH1` | `ASIA-SOUTH1-B` (Mumbai) |
| `ASIA-SOUTHEAST1` | `ASIA-SOUTHEAST1-A`, `ASIA-SOUTHEAST1-B`, `ASIA-SOUTHEAST1-C` (Singapore) |
| `EUROPE-WEST1` | `EUROPE-WEST1-B`, `EUROPE-WEST1-C`, `EUROPE-WEST1-D` (Belgium) |
| `EUROPE-WEST4` | `EUROPE-WEST4-A` (Netherlands) |
| `US-CENTRAL1` | `US-CENTRAL1-A`, `US-CENTRAL1-B`, `US-CENTRAL1-C`, `US-CENTRAL1-F` (Iowa); `US-CENTRAL1-AI1A` (Lincoln, Nebraska, AI zone) |
| `US-EAST1` | `US-EAST1-B`, `US-EAST1-D` |
| `US-EAST4` | `US-EAST4-A`, `US-EAST4-B`, `US-EAST4-C` |
| `US-EAST5` | `US-EAST5-A`, `US-EAST5-B`, `US-EAST5-C` |
| `US-SOUTH1` | `US-SOUTH1-A`, `US-SOUTH1-B`, `US-SOUTH1-C` |
| `US-WEST1` | `US-WEST1-A`, `US-WEST1-B`, `US-WEST1-C` |
| `US-WEST4` | `US-WEST4-A`, `US-WEST4-B`, `US-WEST4-C` |

### Regions

| Area | Regions |
|---|---|
| North America | `NORTHAMERICA-NORTHEAST1` (Montréal)^1, `NORTHAMERICA-NORTHEAST2` (Toronto), `NORTHAMERICA-SOUTH1` (Querétaro)^1, `US-CENTRAL1` (Iowa), `US-EAST1` (South Carolina), `US-EAST4` (Northern Virginia), `US-EAST5` (Columbus), `US-SOUTH1` (Dallas), `US-WEST1` (Oregon), `US-WEST2` (Los Angeles), `US-WEST3` (Salt Lake City), `US-WEST4` (Las Vegas) |
| South America | `SOUTHAMERICA-EAST1` (São Paulo), `SOUTHAMERICA-WEST1` (Santiago) |
| Europe | `EUROPE-CENTRAL2` (Warsaw), `EUROPE-NORTH1` (Finland), `EUROPE-NORTH2` (Stockholm)^1, `EUROPE-SOUTHWEST1` (Madrid), `EUROPE-WEST1` (Belgium), `EUROPE-WEST2` (London), `EUROPE-WEST3` (Frankfurt), `EUROPE-WEST4` (Netherlands), `EUROPE-WEST6` (Zürich), `EUROPE-WEST8` (Milan), `EUROPE-WEST9` (Paris), `EUROPE-WEST10` (Berlin), `EUROPE-WEST12` (Turin) |
| Asia | `ASIA-EAST1` (Taiwan), `ASIA-EAST2` (Hong Kong), `ASIA-NORTHEAST1` (Tokyo), `ASIA-NORTHEAST2` (Osaka)^1, `ASIA-NORTHEAST3` (Seoul), `ASIA-SOUTH1` (Mumbai), `ASIA-SOUTH2` (Delhi), `ASIA-SOUTHEAST1` (Singapore), `ASIA-SOUTHEAST2` (Jakarta), `ASIA-SOUTHEAST3` (Bangkok) |
| Middle East | `ME-CENTRAL1` (Doha), `ME-CENTRAL2` (Dammam), `ME-WEST1` (Tel Aviv) |
| Australia | `AUSTRALIA-SOUTHEAST1` (Sydney), `AUSTRALIA-SOUTHEAST2` (Melbourne) |
| Africa | `AFRICA-SOUTH1` (Johannesburg) |

^1 Montréal, Osaka, Querétaro and Stockholm each have three zones in one or two physical data centers; in a rare disaster data can be lost. Consider a dual-region or backing up to a second region with Storage Transfer Service.

### Predefined dual-regions

| Name | Regions |
|---|---|
| `ASIA1` | `ASIA-NORTHEAST1` + `ASIA-NORTHEAST2` (Tokyo + Osaka) |
| `EUR4` | `EUROPE-NORTH1` + `EUROPE-WEST4` (Finland + Netherlands) |
| `EUR5` | `EUROPE-WEST1` + `EUROPE-WEST2` (Belgium + London) |
| `EUR7` | `EUROPE-WEST2` + `EUROPE-WEST3` (London + Frankfurt) |
| `EUR8` | `EUROPE-WEST3` + `EUROPE-WEST6` (Frankfurt + Zürich) |
| `NAM4` | `US-CENTRAL1` + `US-EAST1` (Iowa + South Carolina) |

### Configurable dual-regions (regions must share a location code)

| Code | Regions |
|---|---|
| `ASIA` | `ASIA-EAST1`, `ASIA-SOUTHEAST1` |
| `AU` | `AUSTRALIA-SOUTHEAST1`, `AUSTRALIA-SOUTHEAST2` |
| `CA` | `NORTHAMERICA-NORTHEAST1`, `NORTHAMERICA-NORTHEAST2` |
| `DE` | `EUROPE-WEST3`, `EUROPE-WEST10` |
| `EU` | `EUROPE-CENTRAL2`, `EUROPE-NORTH1`^a, `EUROPE-SOUTHWEST1`, `EUROPE-WEST1`, `EUROPE-WEST3`^e, `EUROPE-WEST4`^a, `EUROPE-WEST8`^d, `EUROPE-WEST9`, `EUROPE-WEST10`^e, `EUROPE-WEST12`^d |
| `IN` | `ASIA-SOUTH1`, `ASIA-SOUTH2` |
| `IT` | `EUROPE-WEST8`, `EUROPE-WEST12` |
| `US` | `US-CENTRAL1`^b, `US-EAST1`^b, `US-EAST4`, `US-EAST5`^c, `US-SOUTH1`, `US-WEST1`, `US-WEST2`, `US-WEST3`, `US-WEST4` |

^a `EUROPE-NORTH1` + `EUROPE-WEST4` is available only as the predefined dual-region (`EUR4`). ^b `US-CENTRAL1` + `US-EAST1` only as predefined (`NAM4`). ^c `US-EAST5` must be paired with `US-CENTRAL1` or `US-EAST1`. ^d Pair `EUROPE-WEST8` and `EUROPE-WEST12` with the `IT` code. ^e Pair `EUROPE-WEST3` and `EUROPE-WEST10` with the `DE` code. An invalid pairing returns an error.

### Multi-regions

| Name | Description |
|---|---|
| `ASIA` | Data centers in Asia, excluding Hong Kong and Indonesia |
| `EU` | Data centers within member states of the European Union (object data is not stored in `EUROPE-WEST2` London or `EUROPE-WEST6` Zürich) |
| `US` | Data centers in the United States |

## Notes

- Bucket relocation after creation is available only if Storage Intelligence is configured; alternatively move data to a bucket in another location.
- Configurable dual-region buckets bill storage usage against SKUs in both underlying regions; other buckets bill against SKUs of their location code.
- Some tools (for example the console) present all dual-regions as configurable; if a predefined dual-region exists for the pair it is used.
- Requests from a resource in one region of a dual-region are routed to that region; during a regional outage requests fail over to the other region.
- If the regions you want are not available as a dual-region, create a bucket in each region and keep them in sync with Storage Transfer Service event-driven transfers.
- Source inconsistency: the comparison table describes both the zone column ("highest storage price, out of all location types") and the dual-region column ("Highest storage price") as the highest price; the table rows above keep the source wording.
- Snippet taken from https://docs.cloud.google.com/storage/docs/creating-buckets (the locations page itself has no code).
- Source inconsistency: the configurable dual-region example in the text uses `EU-CENTRAL2` and `EU-WEST1`, but the region tables list `EUROPE-CENTRAL2` and `EUROPE-WEST1`; use the full names from the tables (for example with `--placement`).
- Source: https://docs.cloud.google.com/storage/docs/locations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [storage-classes.md](./storage-classes.md)
- [buckets.md](./buckets.md)
- [quotas.md](./quotas.md)
