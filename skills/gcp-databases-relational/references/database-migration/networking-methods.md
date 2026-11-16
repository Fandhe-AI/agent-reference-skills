---
source: https://docs.cloud.google.com/database-migration/docs/postgres/networking-methods
---

# Networking overview (PostgreSQL migrations)

Connectivity methods between the destination Cloud SQL for PostgreSQL instance and your source for standard homogeneous PostgreSQL migrations: IP allowlist, reverse-SSH tunnel, Private Service Connect (PSC) interfaces, specialized VPC peering (Cloud SQL sources only) and VPC peering. Database Migration Service manages the migration, but it is the destination instance that opens the connection to the source.

## Signature / Usage

### Allow the destination on the source (IP allowlist, reverse SSH or private CIDR)

The page itself has no code. The task it leads to is letting the destination reach the source; for a self-managed source this is the `pg_hba.conf` change below (Snippet taken from the configure-source-database page).

```text
# Allow replication connections
host  replication  MIGRATION_USER_ACCOUNT_NAME  DESTINATION_IP_OR_CIDR  md5
# Allow database access
host  all          MIGRATION_USER_ACCOUNT_NAME  DESTINATION_IP_OR_CIDR  md5
```

### Choosing a method

Source-specific setup is in the per-source connectivity pages (self-hosted, AWS, Azure, Cloud SQL) and in "Configure reverse-SSH connectivity" (Database Migration Service can generate a setup script for the reverse-SSH VM). A decision tree diagram is on the source page.

## Options / Props

| Source database offering | New destination instance | Existing destination instance |
|---|---|---|
| Self-hosted, Amazon Aurora, Amazon RDS, Azure Database for PostgreSQL | IP allowlist, reverse-SSH tunnel, VPC peering | IP allowlist, reverse-SSH tunnel, VPC peering (requires a PSA destination instance), PSC interfaces (requires a PSC-enabled destination instance) |
| Cloud SQL for PostgreSQL | IP allowlist (not recommended), specialized VPC peering | IP allowlist (not recommended), specialized VPC peering, PSC interfaces (requires a PSC-enabled destination instance) |

| Method | Advantages | Disadvantages |
|---|---|---|
| IP allowlist | Easiest to set up; useful when the source can't be reached through private networks in Google Cloud | Exposes an IPv4 address of the source to the public internet (use TLS certificates and firewall rules); firewall changes may need the network security / IT department |
| Reverse-SSH tunnel | More secure than IP allowlist: initial connection over SSH ports on the public internet, then all traffic travels over a private tunnel to port `5432` | Intermediate server may add latency; you must set up and keep the reverse-SSH host online for the whole migration |
| PSC interfaces | Connects to the source private IP through a network attachment; consumes no peering quota; the easiest and recommended private method | Only for migrations to existing Cloud SQL destinations (create the instance in Cloud SQL first); needs a network attachment and firewall changes; the network attachment can't be modified after the connection is established |
| Specialized VPC peering (Cloud SQL sources only) | Migrate between two PSA Cloud SQL instances without a shared VPC | Both instances must be PSA instances with private IP; not supported for PSC-enabled destinations |
| VPC peering | Connects to the source private IP over peered VPC networks | Sources outside your VPC may need Cloud VPN or Cloud Interconnect; needs a VPC with private services access; consumes peering quota (PSC interfaces are usually recommended instead) |

### Requirements per method

| Method | Requirements |
|---|---|
| IP allowlist | Source IP exposed to the public internet (directly or via a public DNS hostname); destination has a public IP enabled; source allows incoming connections from the destination's outbound public IP; port `5432` |
| Reverse-SSH tunnel | SSH ports exposed publicly on the tunnel server (bastion host); a Google Cloud VM as the reverse-SSH machine; an additional machine on your network with connectivity to the source database |
| PSC interfaces | Destination is a PSC-enabled Cloud SQL for PostgreSQL instance; VPC with private services access where you create the network attachment; source IP reachable from that VPC (for Cloud SQL sources, the VPC peered with the PSA-enabled source) |
| Specialized VPC peering | Source and destination are PSA Cloud SQL for PostgreSQL instances; VPC with private services access that Database Migration Service peers with the destination; enough space to allocate IP ranges |
| VPC peering | VPC with private services access in which the source private IP is reachable |

## Notes

- IP allowlist with TLS: in the source connection profile, the **Basic** option encrypts without verifying the source's CA and **None** doesn't encrypt (https://docs.cloud.google.com/database-migration/docs/postgres/create-connection-profiles, retrieved 2026-11-16). Not from the source: over a public path use TLS or mTLS, which verify the source server, so the migration user's credentials aren't sent to an unverified host (see configure-source-database.md).
- Private connectivity to a destination created by Database Migration Service: only VPC peering (private services access) is possible; PSC interfaces need a pre-created destination instance.
- IP allowlist exposes the source on a public IP; prefer a private method. For sources inside Google Cloud (Cloud SQL or self-hosted), the source recommends PSC interfaces or VPC peering over reverse SSH; an IP allowlist for Cloud SQL sources is "not recommended".
- Migrating to a new destination instance doesn't support PSC interfaces connectivity.
- Quick-start migration connectivity is described on the quick-start migrations guide, not here.
- Cloud SQL / AlloyDB context: managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills. VPC and Private Service Connect basics belong to `gcp-foundation` / networking skills.
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/networking-methods (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from: https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-source-database.md](./configure-source-database.md)
- [create-migration-job.md](./create-migration-job.md)
- [guide-to-new-instance.md](./guide-to-new-instance.md)
