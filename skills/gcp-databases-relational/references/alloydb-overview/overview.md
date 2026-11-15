---
source: https://docs.cloud.google.com/alloydb/docs/overview
---

# AlloyDB for PostgreSQL overview

AlloyDB for PostgreSQL is a fully managed, PostgreSQL-compatible database service that pairs a Google-built engine with a disaggregated, multi-node architecture. This page covers use cases, the cluster / instance / node hierarchy, key features (HA, backups, encryption, maintenance) and the tools used to administer databases.

## Signature / Usage

### Resource hierarchy

- Cluster: top-level logical container for databases, logs and metadata within a region. You can create multiple clusters in the same project and region.
- Instance: the connection point for applications. A cluster contains one or more instances. Each instance has a private, static IP address in your VPC network.
- Node: a VM dedicated to running the database engine. One or more nodes power each instance.

Creating a cluster (snippet taken from https://docs.cloud.google.com/alloydb/docs/cluster-create):

```bash
gcloud alloydb clusters create CLUSTER_ID \
    --database-version=POSTGRES_VERSION \
    --password=PASSWORD \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --network=NETWORK
```

## Options / Props

### Instance types

| Type | Access | Notes |
|---|---|---|
| Primary instance | Read and write | Exactly one per cluster. Highly available (HA): two nodes (active + standby) in different zones with automatic failover. Basic: a single node, no standby, for non-production. |
| Read pool instance | Read-only | One or more per cluster; up to 20 nodes total across the cluster. Requests are load-balanced across nodes. |

### Key features

| Feature | Description |
|---|---|
| Index advisor | Suggests new indexes from usage patterns |
| Columnar engine | Accelerates analytical queries by keeping columnar data in memory |
| Index prefetch | Reads B-tree index and table pages in parallel for range scans |
| Adaptive autovacuum | Adjusts vacuum-related parameters to the workload |
| Backups | On-demand and scheduled backups plus continuous recovery (point-in-time recovery within an adjustable retention period) |
| Cross-region replication | Secondary clusters in other regions fed asynchronously; promote a secondary, or cross-region failover (Preview) |
| Encryption | Google-owned / Google-managed keys by default; optional CMEK set at cluster creation (also applies to backups) |
| Authentication | Standard PostgreSQL user roles plus AlloyDB-specific roles; a cluster can require the AlloyDB Auth Proxy (IAM access control) |
| Maintenance | Non-disruptive: primary instances typically see under one second of downtime, read pools stay available; the swap momentarily drops active connections |

### Administration tools

| Tool | Description |
|---|---|
| AlloyDB Studio | Web-based interactive SQL interface in the Google Cloud console |
| PostgreSQL clients | `psql`, pgAdmin and other standard tools |

### Pricing factors

Instance resources (machine type), storage in the cluster's flexible storage layer, and network egress.

## Notes

- Use cases named by the source: HTAP, low-latency AI applications, mission-critical workloads, and prototyping with AI coding agents.
- Standard PostgreSQL couples engine and storage on one server; AlloyDB separates compute (nodes) from distributed storage across zones, and each scales independently.
- Two kinds of updates occur: system updates (security patches, OS upgrades, minor PostgreSQL server version updates) and configuration updates you make (resizing, database flags). `FORCE_APPLY` update mode applies a flag update faster at the cost of longer downtime.
- AlloyDB Express (Preview) offers fast provisioning, scale-to-zero compute, Private Service Connect and public DNS connectivity, and one-click upgrade to AlloyDB. It is subject to Pre-GA terms.
- AlloyDB AI (vector search and ML model invocation extensions) and AlloyDB Omni (self-hosted downloadable edition) exist but are out of scope for this skill; see the official overview.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` skills (client code only).
- The borrowed `gcloud alloydb clusters create` snippet puts the password on the command line: gcloud 593.0.0 has no prompt option (`--password` is required), so use a throwaway initial password and change it afterwards, or prefer IAM database authentication (see the cluster creation page's Notes). `POSTGRES_VERSION` takes the gcloud enum `POSTGRES_14`–`POSTGRES_18`.
- Source: https://docs.cloud.google.com/alloydb/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/cluster-create (borrowed snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-create.md](./cluster-create.md)
- [instance-primary-create.md](./instance-primary-create.md)
- [instance-read-pool-create.md](./instance-read-pool-create.md)
- [choose-machine-type.md](./choose-machine-type.md)
- [db-version-policies.md](./db-version-policies.md)
