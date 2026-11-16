---
source: https://docs.cloud.google.com/sql/docs/mysql/replication
---

# About replication in Cloud SQL for MySQL

Replica types (read, cross-region, cascading, external read replicas, replication from an external server), prerequisites, binary logging impact, billing, and a quick reference of replica behavior.

## Signature / Usage

### Authorize an external read replica's IP ranges on the primary

Needed when you enforce connectors-only access (Auth Proxy / language connectors) on an instance with private services access and add an external read replica: add the replica's subnet ranges to the primary's authorized networks.

Adapted (not in the official docs): added the required `INSTANCE_NAME` argument that the official command omits.

```bash
gcloud sql instances patch INSTANCE_NAME \
--authorized-networks=IP_ADDRESS_RANGE_1/24,IP_ADDRESS_RANGE_2/24
```

Replace `INSTANCE_NAME` with your instance name and `IP_ADDRESS_RANGE_1`, `IP_ADDRESS_RANGE_2` with the IP address ranges of your external read replica. The value replaces the primary's whole authorized-networks list, so include the existing entries too.

## Options / Props

### Replica types and use cases

| Name | Primary | Replica | Use cases |
|------|---------|---------|-----------|
| Read replica | Cloud SQL instance | Cloud SQL instance | Additional read capacity, analytics target |
| Cross-region read replica | Cloud SQL instance | Cloud SQL instance | Read capacity, DR, lower read latency, migrate data between regions |
| External read replica | Cloud SQL standalone or primary instance | MySQL instance external to Cloud SQL | Lower latency for external connections, analytics, migration to other platforms |
| Replication from an external server | MySQL outside Cloud SQL | Cloud SQL for MySQL instance | Migration to Cloud SQL, replicate data to Google Cloud, analytics |

### Limits and restrictions

| Item | Value |
|------|-------|
| Direct read replicas per primary | Recommended 10 or fewer; more via cascading replicas |
| Siblings (replicas of the same primary) | Up to eight officially |
| Cascading hierarchy depth | Up to four levels including the primary |
| Delete a replica with replicas | Not allowed; delete from leaf replicas upward |
| Circular region dependency | Not supported |
| External replica primary | Can't be a Cloud SQL read replica |
| External replica outage | If interrupted longer than replication logs are preserved (the source says seven backups; retention is configurable), delete and recreate the replica |
| Connector enforcement | Can't create read replicas when enforced, and can't enable it when replicas exist (doesn't apply with private services access) |
| Replication between two external servers | Not supported |
| GTID-based replication | Can't be disabled |

### Prerequisites for creating a read replica

- Automated backups enabled.
- Binary logging enabled (requires point-in-time recovery).
- At least one backup created after binary logging was enabled.
- External replica additionally: MySQL version same or higher than the primary, and SSL/TLS configured on the primary.

### Quick reference

| Topic | Behavior |
|-------|----------|
| Backups | Can't be configured on the replica |
| Cores and memory | Can differ from the primary; a primary resize resizes replica storage to at least the primary's |
| Deleting the primary | Promote or delete all read replicas first |
| Disabling binary logging | Promote or delete all read replicas first |
| Failover | Only to a DR replica; read replicas can't fail over |
| High availability | Can be enabled on replicas |
| Load balancing | Not provided by Cloud SQL |
| Maintenance | Shares the primary's maintenance settings; replicas are updated first |
| Restoring the primary | Not possible while replicas exist; promote or delete them first |
| Settings | MySQL settings (including root password and user table changes) propagate; CPU and memory don't |
| Stopping a replica | Can't stop; can restart, delete, or disable replication |
| Upgrading a replica | Can experience a disruptive upgrade at any time |
| User tables | No changes on the replica; make them on the primary |

### Billing

- Read replicas are charged like standard instances; no charge for replication itself.
- External replicas: outbound data transfer charges.
- Cross-region replica: new-instance pricing in that region plus cross-region transfer for replication logs.

## Notes

- MySQL variant; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/replication.
- Distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js clients `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- `--authorized-networks` replaces the whole list (gcloud sql instances patch help); include the primary's existing authorized networks in the value (check them with `gcloud sql instances describe INSTANCE_NAME`), and try it on a disposable instance first.
- Corrected from the official docs: the command was `gcloud sql instances patch \ --authorized-networks=...` with no instance name; the instance argument is required.
- Authorized networks expose the instance on a public IP path; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them. The source also shows REST and PowerShell forms (omitted; the source's REST JSON body leaves `INSTANCE_NAME` and `PROJECT_ID` unquoted).
- Binary logging: Cloud SQL uses row-based replication with `sync_binlog=1` and `innodb_support_xa=true`, so each write needs an extra fsync. Binary logs are billed like data and truncated to the age of the oldest automated backup (the source says the most recent seven automated backups and all on-demand backups are retained; seven is the Enterprise edition default, and retention is configurable, see `cloud-sql-backup-recovery/backup-options.md`); check size with `SHOW BINARY LOGS`. Binary logging on replicas is supported on 5.7 and 8.0 only; replica `sync_binlog` is configurable and reset to `1` on promotion.
- Cascading: promoting a cascading replica keeps its hierarchy. Cross-region replicas can be promoted for DR; promote and failover operations change roles and can affect data, so try them on a disposable instance first.
- Don't use a replica as the source for Datastream or Kafka; if a replica is re-created by Cloud SQL, downstream systems must be re-initialized.
- Long-running transactions can affect replica creation; create replicas under low traffic. Place replicas in a different zone than an HA primary.
- Private IP replicas inherit the primary's VPC private connection.
- Source: https://docs.cloud.google.com/sql/docs/mysql/replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [users.md](./users.md)
- [iam-authentication.md](./iam-authentication.md)
- [import-export.md](./import-export.md)
