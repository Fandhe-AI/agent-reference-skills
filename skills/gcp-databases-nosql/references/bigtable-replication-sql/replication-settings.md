---
source: https://docs.cloud.google.com/bigtable/docs/replication-settings
---

# Examples of replication configurations

Settings for common Bigtable replication use cases: batch/serving isolation, high availability, near-real-time backup, regional resilience and data close to users, plus questions for other use cases. Examples create an instance but also apply when adding clusters.

## Signature / Usage

### App profiles for the routing choices

Single-cluster routing (workload isolation, near-real-time backup, data close to users) routes all requests to one cluster (example from the gcloud reference):

```bash
gcloud bigtable app-profiles create \
    my-single-cluster-app-profile --instance=my-instance-id \
    --route-to=my-cluster-id
```

Multi-cluster routing (high availability) (example from the gcloud reference):

```bash
gcloud bigtable app-profiles create my-app-profile-id \
    --instance=my-instance-id --route-any
```

## Options / Props

| Use case | Clusters | App profiles / routing | Consistency |
|----------|----------|------------------------|-------------|
| Isolate batch from serving | 2 (`cluster-a`, `cluster-b`) | `live-traffic` to `cluster-a`, `batch-analytics` to `cluster-b`, both single-cluster | Read-your-writes within the same app profile only |
| Isolate two small workloads from one large | 3 | `live-traffic-app-a` to `cluster-a`, `live-traffic-app-b` to `cluster-b`, `batch-analytics` to `cluster-c`, all single-cluster | Same as above |
| High availability (HA) | See options below | Multi-cluster routing (new profile or updated default); no single-row transactions | Eventual |
| Near-real-time backup (active-passive) | 2 | Single-cluster routing; update the profile to the second cluster to fail over | Strong and read-your-writes; single-row transactions allowed |
| HA and regional resilience | 4 (2 in region A, 2 in region B, different zones) | Multi-cluster (automatic failover, eventual) or single-cluster (manual failover) | Depends |
| Store data close to users | 3 clusters in distinct regions | Single-cluster, e.g. `clickstream-us`, `clickstream-eu`, `clickstream-asia` | Per cluster |

HA cluster layouts from the source:

| Layout | Notes |
|--------|-------|
| N+2 clusters, each in a different region (recommended) | Survives two regions being unavailable; spread across continents. Example: `us-central1-a`, `europe-west1-d`, `asia-east1-b` |
| Two clusters, same region, different zones | No cross-region replication cost, no extra failover latency. Example: `australia-southeast1-a` / `-b` |
| Two clusters in different regions | Data available if one region is unreachable; replicated writes between regions are charged |
| Two clusters in region A plus one in region B | Extra capacity in A; write to A charged once, write to B charged twice |

Questions for other use cases:

| Question | Answer |
|----------|--------|
| Need single-row transactions (read-modify-write, check-and-mutate)? | Single-cluster routing and manual failover |
| Want automatic failover? | Multi-cluster routing; single-row transactions cannot be enabled |
| Want a backup/spare cluster? | Single-cluster routing, manual failover; single-row transactions possible |
| Different traffic to different clusters? | Single-cluster routing per traffic type; manual failover |

## Notes

- Enable autoscaling for clusters in most cases. With manual node allocation, provision enough nodes in every cluster to handle replication plus application load; otherwise replication delay can grow, memory can build up, and writes to other clusters might be rejected.
- To ensure HA during a regional failure, locate clients in or near more than one region where the clusters are.
- Updating a single-cluster profile to point at another cluster warns about losing read-your-writes (and strong) consistency; with single-row transactions enabled it also warns about data loss from conflicting writes during failover.
- If single-row transactions are enabled in several app profiles, do not send conflicting writes to different clusters (risk of data loss); disable them in extra profiles where possible.
- Multi-cluster failover across a distant region incurs network charges and higher latency; this is why single-cluster routing is advised for the "close to users" case.
- Multiple app profiles can route to the same cluster, and clusters can have no profile routed to them.
- Wide-column NoSQL database; not a relational database (see `gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/replication-settings (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/app-profiles/create (the replication settings page has no code block).

## Related

- [replication-overview.md](./replication-overview.md)
- [app-profiles.md](./app-profiles.md)
- [routing.md](./routing.md)
- [autoscaling.md](./autoscaling.md)
