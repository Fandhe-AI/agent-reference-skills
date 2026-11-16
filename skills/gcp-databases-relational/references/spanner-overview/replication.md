---
source: https://docs.cloud.google.com/spanner/docs/replication
---

# Replication

Spanner replicates each database split synchronously with Paxos. Voting replicas vote on every write, so you can read up-to-date data from any read-write or read-only replica.

## Signature / Usage

### List instance configurations

The instance configurations (regional, dual-region, multi-region) determine the replica topology described on this page. List those available to your project:

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

```bash
gcloud spanner instance-configs list
```

### Monitor data replication

Monitor bytes replicated from the leader to cross-region replicas with the metric `instance/cross_region_replicated_bytes_count` (sampled every 60 seconds, visible after up to 120 seconds). In Metrics explorer select **Cloud Spanner Instance > Instance > Cross region replicated bytes**. It is under Active metrics only when cross-region replication is happening. For the amount of data instead of rate, set the aligner to **Rate > Delta** and show a Table. Filter by instance ID, database ID, source or destination region, or tag.

## Options / Props

| Replica type | Can vote | Can become leader | Can serve reads | Configure manually |
|--------------|----------|-------------------|-----------------|--------------------|
| Read-write | yes | yes | yes | no |
| Read-only | no | no | yes | yes (custom instance configuration) |
| Witness | yes | no | no | no |

| Base configuration | Replica types used |
|--------------------|--------------------|
| Regional | Read-write only (exactly three, one per zone) |
| Dual-region | Read-write and witness |
| Multi-region | Read-write, read-only and witness |

## Notes

- Replication is byte-level in the underlying file system, plus Spanner's own row replication for availability and geographic locality. A split is a range of contiguous rows ordered by primary key; each Paxos replica set elects one leader. Leaders handle writes.
- A write commits when a majority of voting replicas (write quorum) agrees. Writes are always processed at the leader first (deletes are writes). In dual-region and multi-region configurations with a client outside the leader region, leader-aware routing reduces latency.
- Reads: read-write transaction reads are served from the leader (it holds the locks). Strong reads can go to any read-write or read-only replica, which may contact the leader only to negotiate the timestamp. Stale reads go to the closest replica caught up to the timestamp.
- Read-only replicas: full copy, no vote, never affect write latency, cannot become leader, can scale asymmetrically, and are not a standalone DR solution (if the instance goes offline they go offline shortly after, including stale reads). Stale reads usually avoid a leader round trip when staleness is at least 15 seconds (this applies to read-only replicas and reads outside the leader region; the timestamp-bounds page gives 10 seconds as the general minimum for a benefit). Directed reads can route reads to a replica type or region.
- Optional read-only replicas: add them with a custom regional or multi-region instance configuration, in a region not part of the base configuration. They incur compute, storage and replication costs and do not change the SLA. If the replica is on a different continent than the leader, add at least two. Example: with `eur6` plus a read-only replica in `us-east1`, a strong read from `us-east1` takes about 100 ms (round trip to `europe-west4`). Test in non-production first.
- Witness replicas: used in dual-region and multi-region configurations, no full copy, no reads, vote on commits and leader election but cannot lead.
- Why this design: write latency grows with the number and distance of voting replicas, so base regional configurations use exactly three read-write replicas, while dual- and multi-region configurations add witness and read-only replicas instead of more read-write replicas.
- Source: https://docs.cloud.google.com/spanner/docs/replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed command; retrieved 2026-11-16)

## Related

- [instance-configurations.md](./instance-configurations.md)
- [true-time-external-consistency.md](./true-time-external-consistency.md)
- [compute-capacity.md](./compute-capacity.md)
