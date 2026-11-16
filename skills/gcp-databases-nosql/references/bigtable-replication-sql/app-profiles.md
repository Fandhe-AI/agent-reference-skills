---
source: https://docs.cloud.google.com/bigtable/docs/app-profiles
---

# App profiles overview

An app profile stores settings that tell a Bigtable instance how to handle incoming requests from an application. Each app profile is either a standard app profile (provisioned cluster nodes, typically application-serving traffic) or a Data Boost app profile (serverless compute for high-throughput reads and queries). Some features on this page are available only in the Enterprise Plus edition.

## Signature / Usage

### Create a standard app profile

Multi-cluster routing with a description (example from the gcloud reference):

```bash
gcloud bigtable app-profiles create my-app-profile-id \
    --instance=my-instance-id --route-any \
    --description="Routes requests for my use case"
```

### Create a Data Boost app profile

Data Boost with usage billed to the host project (example from the gcloud reference). Data Boost app profiles are restricted to single-cluster routing.

Adapted (not in the official docs): added `--route-to=my-cluster-id`; without a routing flag gcloud 593.0.0 rejects the command ("Exactly one of ... must be specified").

```bash
gcloud bigtable app-profiles create my-app-profile-id \
    --instance=my-instance-id --route-to=my-cluster-id --data-boost \
    --data-boost-compute-billing-owner=HOST_PAYS
```

## Options / Props

| Topic | Standard app profile | Data Boost app profile |
|-------|----------------------|------------------------|
| Compute | Provisioned cluster nodes | Serverless compute |
| Routing policy | Single-cluster or multi-cluster (see routing.md) | Single-cluster only |
| Request priority | Configurable | Not configurable |
| Single-row transactions | Controlled by the app profile (single-cluster routing only) | Not stated |

| Limit / default | Value |
|-----------------|-------|
| App profiles per instance (custom) | Up to 2,000 |
| Default app profile, instance created with 1 cluster | Single-cluster routing, single-row transactions enabled |
| Default app profile, instance created with 2+ clusters | Multi-cluster routing to any cluster; single-row transactions are never allowed with multi-cluster routing |
| In-memory tier app profile (Preview, Enterprise Plus) | Single-cluster routing by default |

## Notes

- Use a separate app profile for each application or workload, even for single-cluster instances. Benefits: workload isolation (different compute and routing policies per workload) and observability (metrics, including CPU utilization, are available per app profile).
- Workload isolation options from the source: (1) a standard app profile for workload B routed to a cluster group that excludes one cluster, plus a single-cluster standard app profile for workload A on the excluded cluster; (2) a standard app profile routed to any cluster for workload B, plus a Data Boost app profile on a single cluster for workload A.
- Enterprise Plus Data Boost adds isolated SQL queries and analytics on HDD clusters or tables with tiered storage enabled.
- Changes to an app profile take effect immediately. Converting standard to Data Boost removes request priority settings and any non-single-cluster routing, and switches compute (and pricing) to serverless. Converting Data Boost to standard makes traffic use cluster nodes, so every routed cluster needs enough nodes for the CPU load.
- The default app profile does not change when clusters are added or removed. Best practice: create and use a new app profile instead of changing the default. It is also used when no app profile is specified or when connecting with the HBase shell.
- Changing an in-use profile can affect other workloads sharing it; prefer creating a new profile and switching application code.
- Wide-column NoSQL database; not a relational database (see `gcp-databases-relational` for Cloud SQL / Spanner).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/app-profiles/create (the app profiles overview has no code block).
- Corrected from the official docs: the gcloud reference example reads `gcloud bigtable app-profiles create my-app-profile-id --instance=my-instance-id --data-boost --data-boost-compute-billing-owner=HOST_PAYS`, which fails the required routing group (`--route-any` or `--route-to`); a single-cluster `--route-to` is added because Data Boost app profiles are restricted to single-cluster routing.
- Source: https://docs.cloud.google.com/bigtable/docs/app-profiles (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [routing.md](./routing.md)
- [replication-overview.md](./replication-overview.md)
- [replication-settings.md](./replication-settings.md)
