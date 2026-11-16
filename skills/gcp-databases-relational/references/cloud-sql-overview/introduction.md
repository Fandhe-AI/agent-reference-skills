---
source: https://docs.cloud.google.com/sql/docs/introduction
---

# Cloud SQL overview (introduction and key terms)

Cloud SQL is a fully managed relational database service for MySQL, PostgreSQL, and SQL Server. It handles backups, high availability and failover, network connectivity, export and import, maintenance and updates, monitoring, and logging. This page also covers the key terms page (instance, HA, failover, clone, replication, Auth Proxy).

## Signature / Usage

### Machine type naming

Each Cloud SQL instance is one VM with a persistent disk and a static IP. The machine type is chosen at creation time; custom machine types are named `db-custom-N4-{CPUs}-{Memory}` or `db-custom-{CPUs}-{Memory}` (per https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview).

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (database version, machine type and region chosen at creation):

```bash
  gcloud sql instances create myinstance \
  --database-version=POSTGRES_16 \
  --tier=db-perf-optimized-N-4 \
  --edition=ENTERPRISE_PLUS \
  --region=us-central1
```

## Options / Props

### What a Cloud SQL instance is

| Concept | Description |
|---------|-------------|
| Instance | Powered by a VM on a Google Cloud host. The VM runs the database program (for example MySQL Server) and service agents (logging, monitoring). |
| Storage | Scalable, durable network storage device called a `persistent disk` attached to the VM. |
| IP | A static IP address sits in front of each VM so the address persists for the instance lifetime. |
| HA standby | The high availability option adds a standby VM in another zone with an identical configuration. |

### Update types

| Kind | Who | Downtime |
|------|-----|----------|
| Configuration updates (more compute, change a database flag, enable HA) | User | Some can require downtime |
| Hardware updates | Cloud SQL | None (live migration) |
| Online updates (service agents next to the database) | Cloud SQL | None |
| Maintenance updates (OS and database program) | Cloud SQL | Instance restart; schedule via maintenance window. Enterprise Plus edition (PostgreSQL, MySQL) limits it to sub-second |

### Key terms

| Term | Meaning |
|------|---------|
| Cloud SQL instance | One VM including the database instance and accompanying software containers |
| Database instance | The set of software and files that operate the databases (MySQL, PostgreSQL or SQL Server) |
| Public / private IP | Public IP = reachable through the internet; private-IP-only = reachable only through a VPC. An instance can have both |
| High availability (HA) | Two synchronized instances (primary and standby), one VM each, in different zones of the same region |
| Failover | Cloud SQL switches serving from the primary to the standby; autofailover triggers when no heartbeat was issued in the previous interval |
| Standby instance | Replaces the primary on failover; not shown in the Google Cloud console; connections move automatically |
| Clone | New, completely independent copy of the source instance; later changes are not reflected either way |
| Replication / read replica | Copies of an instance used to offload reads; replica is an exact copy updated in almost real time; send writes to the primary |
| Source server | Primary instance of replication; may be Cloud SQL or external (on-premises/other cloud = `Replication from an external server`) |
| Cloud SQL Auth Proxy client | Open source client run on your servers; connects to a companion proxy server on the instance for secure SSL/TLS connections and to avoid opening the firewall; authentication via IAM |

### Pricing factors

Provisioned storage (GiB per month), CPUs, memory, location, network egress, and number of IP addresses assigned and used. New customers get $300 in free credits.

### Administration tools

Cloud SQL creates and deletes databases and users but is not an administration tool. Examples: phpMyAdmin and MySQL Workbench (MySQL), Toad Edge (MySQL, PostgreSQL), pgAdmin.org (PostgreSQL), SQL Server Management Studio and Visual Studio Code (SQL Server).

## Notes

- Connecting is similar to a self-managed database; the instance has a public IP (internet) and/or a private IP (VPC only). Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Managed PostgreSQL / MySQL / SQL Server on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- The sub-second maintenance row names only PostgreSQL and MySQL, as the source does; https://docs.cloud.google.com/sql/docs/sqlserver/editions-intro also gives less than 1 second of maintenance downtime for SQL Server Enterprise Plus (see `cloud-sql-sqlserver/editions-intro.md`).
- The source also shows quickstart links and an architecture image (omitted).
- Source: https://docs.cloud.google.com/sql/docs/introduction (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/key-terms (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [feature-support.md](./feature-support.md)
- [features.md](./features.md)
- [availability.md](./availability.md)
