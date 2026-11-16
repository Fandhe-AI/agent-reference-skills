---
source: https://docs.cloud.google.com/spanner/docs/compute-capacity
---

# Compute capacity, nodes and processing units

Compute capacity determines the server and storage resources available to the databases in an instance. It is measured in processing units (PUs) or nodes, with 1000 PUs equal to 1 node.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

```bash
gcloud spanner instances create test-instance --config=regional-us-central1 \
    --description="My Instance" --nodes=1
```

### Change the compute capacity

- You can increase capacity at any time; most requests finish within minutes, rarely up to an hour.
- You can reduce capacity unless the reduced capacity would hold more than 10 TiB of data per node (1000 PUs; not from the source's reduction list: below 1 node the storage allotment is 1024.0 GiB per 100 PUs, see the Options table) or the instance has a large number of splits (try progressively smaller reductions; after one or two weeks Spanner might merge splits).
- Change capacity with the Google Cloud console, the Google Cloud CLI or the client libraries.

## Options / Props

| Rule | Value |
|------|-------|
| PU granularity | Multiples of 100 (100, 200, 300 ...). From 1000 PUs: multiples of 1000 PUs or nodes (1, 2, 3 ...) |
| Below 1 node | Must be specified in PUs; limited resources can cause non-linear scaling and intermittent latency increases |
| Storage, under 1000 PUs | 1024.0 GiB of data per 100 PUs |
| Storage, 1 node and larger | 10 TiB per node |
| Servers per node | Regional: at least three; multi-region: at least five |
| Server tasks per zone | 1000 PUs or fewer: one task; above 1000 PUs: one task per 1000 PUs |
| CPU utilization while removing capacity | Keep under 65% (regional) and 45% per region (multi-region) |

## Notes

- A node or 1000 PUs is a logical unit, not one physical server.
- Spanner makes the full specified capacity available in each zone hosting a replica (1000 PUs regional = 1000 PUs in each of three zones); it is not divided among zones.
- Storage is counted in binary gigabytes (1 GB = 2^30 bytes, GiB). Example: a 300 GB database fits 100 PUs until it exceeds 1024.0 GiB; add 100 PUs after that or writes might be rejected. Spanner bills actual storage used, not the allotment.
- Increasing capacity does not add replicas (fixed by the instance configuration); it gives each replica more CPU and RAM.
- Scaling cannot fix lock contention or hotspots.
- There is no suspend mode: capacity is a dedicated resource and Spanner performs background work even when idle.
- With autoscaling enabled, read-only replicas can be scaled independently (asymmetric read-only autoscaling; the editions overview lists it for the Enterprise and Enterprise Plus editions only, see editions-overview.md).
- Source: https://docs.cloud.google.com/spanner/docs/compute-capacity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/editions-overview (edition of asymmetric read-only autoscaling; retrieved 2026-11-16; CC BY 4.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed command)

## Related

- [instances.md](./instances.md)
- [instance-configurations.md](./instance-configurations.md)
- [autoscaling-overview.md](./autoscaling-overview.md)
- [quotas.md](./quotas.md)
