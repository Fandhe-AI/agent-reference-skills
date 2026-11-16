---
source: https://docs.cloud.google.com/spanner/docs/instance-configurations
---

# Regional, dual-region, and multi-region configurations

An instance configuration defines the geographic placement and replication topology of an instance's databases, balancing availability, latency, cost and data residency.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

```bash
gcloud spanner instance-configs list
```

### Base regional configurations

Name is `regional-<region>`. Three read-write replicas, each in a different zone; two of three form the write quorum. Regions available:

- Americas: `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`
- Europe: `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`
- Asia Pacific: `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`
- Middle East: `me-central1`, `me-central2`, `me-west1`
- Africa: `africa-south1`

### Base dual-region configurations (Enterprise Plus)

| Name | Location | Default leader region (L) | Other region |
|------|----------|---------------------------|--------------|
| `dual-region-australia1` | au | Sydney `australia-southeast1` | Melbourne `australia-southeast2` |
| `dual-region-canada1` | ca | Toronto `northamerica-northeast2` | Montréal `northamerica-northeast1` |
| `dual-region-germany1` | de | Berlin `europe-west10` | Frankfurt `europe-west3` |
| `dual-region-india1` | in | Mumbai `asia-south1` | Delhi `asia-south2` |
| `dual-region-japan1` | jp | Tokyo `asia-northeast1` | Osaka `asia-northeast2` |

Six replicas, three per region (two read-write plus one witness each); a write quorum needs at least two voting replicas in each region.

### Base multi-region configurations (Enterprise Plus)

Columns: RW = read-write regions (first is default leader, each with 2 replicas unless noted), RO = read-only regions, W = witness region.

| Name | Location | RW (leader first) | RO | W |
|------|----------|-------------------|----|---|
| `asia1` | global | `asia-northeast1`, `asia-northeast2` | none | `asia-northeast3` |
| `asia2` (allowlist) | global | `asia-south1`, `asia-south2`, `asia-southeast1` (1 replica) | none | none |
| `eur3` | eu | `europe-west1`, `europe-west4` | none | `europe-north1` |
| `eur5` | global | `europe-west2`, `europe-west1` | none | `europe-west4` |
| `eur6` | global | `europe-west4`, `europe-west3` | none | `europe-west6` |
| `eur7` | eu | `europe-west8`, `europe-west3` | none | `europe-west12` |
| `nam3` | us | `us-east4`, `us-east1` | none | `us-central1` |
| `nam6` | us | `us-central1`, `us-east1` | `us-west1` (1), `us-west2` (1) | `us-central2` |
| `nam7` | us | `us-central1`, `us-east4` | none | `us-central2` |
| `nam8` | us | `us-west2`, `us-west1` | none | `us-west3` |
| `nam9` | us | `us-east4`, `us-central1` | `us-west1` (2) | `us-east1` |
| `nam10` | us | `us-central1`, `us-west3` | none | `us-central2` |
| `nam11` | us | `us-central1`, `us-east1` | none | `us-central2` |
| `nam12` | us | `us-central1`, `us-east4` | `us-west1` (2) | `us-central2` |
| `nam13` | us | `us-central2`, `us-central1` | none | `us-west3` |
| `nam14` | global | `us-east4`, `northamerica-northeast1` | none | `us-east1` |
| `nam15` | us | `us-south1`, `us-east4` | none | `us-central1` |
| `nam16` | us | `us-central1`, `us-east4` | none | `us-east5` |
| `nam22` | us | `us-east5`, `us-east1` | none | `us-east4` |
| `nam23` | us | `us-central1`, `us-west4` | none | `us-south1` |
| `nam24` (allowlist) | us | `us-east4`, `us-west1` | none | `us-central1` |
| `nam-eur-asia1` | global | `us-central1`, `us-central2` | `europe-west1` (2), `asia-east1` (2) | `us-east1` |
| `nam-eur-asia3` | global | `us-central1`, `us-east1` | `europe-west1` (1), `europe-west4` (1), `asia-east1` (2) | `us-central2` |

### Move an instance and change the leader region

Moving between any configurations causes no downtime and keeps transaction guarantees including strong consistency. The default leader region can be changed for dual-region and multi-region instances to any read-write region; it is a metadata operation (a long-running operation) that moves no data and takes a few minutes to take effect.

## Options / Props

| Topic | Value |
|-------|-------|
| Availability | Regional 99.99%; dual-region and multi-region 99.999% |
| Dual-region / multi-region edition | Enterprise Plus |
| Custom instance configuration (add optional read-only replicas) | Enterprise and Enterprise Plus; replica must be in a region not already in the base configuration; base replication topology cannot be changed |
| Dual-region custom configs | Not allowed; read-only replicas cannot be added |
| Optional replica codes | 1-OR: one optional read-only replica; 2-OR: up to two (add two where possible to keep read latency low) |
| Leader region eligibility | Read-write regions of the dual- or multi-region configuration |
| Regional CPU target | High-priority total CPU under 65% |
| Multi-region CPU target | High-priority total CPU under 45% in each region |
| Multi-region reads outside leader region | Use staleness of at least 15 seconds (specific to reads outside the leader region; the general stale-read minimum on the timestamp-bounds page is 10 seconds) |
| Dual-region manual failover | Usually completes within one minute; automatic Google-managed failover may take up to 45 minutes |

## Notes

- Replication: most multi-region configurations have two read-write regions (two replicas each) plus a witness region; the write quorum is one leader-region replica plus any two of the other four voting replicas. `asia2` has a fifth read-write replica in a third read-write region instead of a witness. Voting regions are typically less than a thousand miles apart. If the default leader region fails, Spanner places leaders in the second read-write region.
- Custom read-only replicas do not join write quorums and are not a standalone DR solution: if the instance goes offline they go offline shortly after and cannot serve stale reads. They do not change the 99.99% regional SLA. Optional regions per base configuration are listed in the source's "Optional region" column; unlisted regions can be requested through the source's request form.
- Dual-region failover: watch the "Dual-region quorum health timeline" metric on System insights (quorums: `Global` and each region). One region disrupted suggests a regional outage; a disrupted `Global` quorum with healthy regions suggests a network partition (fail over to the default leader region). After a manual failover you must manually fail back. RPO is zero. Do not fail over without a real disruption (a single-region quorum makes the whole system unavailable if that one region then fails); do not fail over to the disrupted region (the database becomes unavailable, unrecoverable until that region is back online; check the single-region quorum health first); if the unhealthy region is the default leader, change the leader to the failover region afterward and revert after fail back.
- Multi-region resource location defines the disaster-recovery zone guarantee; data is stored at rest only in the selected replica locations. Multi-region configurations provide external consistency.
- `asia2` and `nam24` are restricted by allowlist (contact your Technical Account Manager).
- Failover and failback change the serving topology of a live database; practice on a disposable instance first.
- The source also lists the optional read-only region columns and low-CO2 region markers for each configuration; they are omitted here.
- Source: https://docs.cloud.google.com/spanner/docs/instance-configurations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed command)

## Related

- [replication.md](./replication.md)
- [instances.md](./instances.md)
- [compute-capacity.md](./compute-capacity.md)
- [true-time-external-consistency.md](./true-time-external-consistency.md)
