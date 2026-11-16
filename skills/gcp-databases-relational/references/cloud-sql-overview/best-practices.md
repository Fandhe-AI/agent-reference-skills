---
source: https://docs.cloud.google.com/sql/docs/best-practices
---

# Cloud SQL best practices

Recommendations for performance, durability and availability, grouped by instance administration, security, data architecture, application implementation, import/export and backup.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sql/docs/quotas (check connection limits when sizing pooling):

```sql
SELECT * FROM pg_settings WHERE name = 'max_connections';
```

## Options / Props

### Instance configuration and administration

| Practice | Detail |
|----------|--------|
| Follow operational guidelines | Needed for SLA coverage |
| Configure a maintenance window | Control when disruptive updates happen |
| Timestamp in instance ID | If you regularly delete and recreate instances, to make new IDs usable |
| One administrative operation at a time | Restarts, updates, imports, exports, backups, clones can't run concurrently; a premature request fails. The green check only means `RUNNABLE`; check the **Operations** tab |
| 20% free storage | If automatic storage increase is disabled (or limit enabled) keep at least 20% free; alert on disk utilization metric above `.8` |
| Avoid CPU over-utilization | Add CPUs (restart required); at the max, shard across instances |
| Avoid memory exhaustion | Watch `usage` and `total_usage` metrics together; add memory (restart required); at the max, shard |

### Security

| Practice | Detail |
|----------|--------|
| Prefer Private IP | Unless Public IP is required, to minimize unauthorized network connections |
| Avoid `0.0.0.0/0` in Authorized Networks | Permits access from the global internet without restriction |
| Avoid excessively large Authorized Networks | Use a CIDR prefix no smaller than /16, preferably greater than /19 |
| Enable password policies | MySQL/PostgreSQL instance password policies: weak passwords, expiry, lockout on failed logins; especially for Public IP |
| Secure search path | Set `search_path` to `pg_catalog` for high-privileged users (prevents search path hijacking) |
| `log_statement` = `none` | Default is `none`; otherwise PostgreSQL can log statements containing passwords. Use pgAudit instead |

### Data architecture, application, import/export, backup

| Area | Practice |
|------|----------|
| Architecture | Prefer many smaller instances over one large instance |
| Application | Connection pooling and exponential backoff; test maintenance (self-service maintenance) and failovers (manual failover); keep transactions small and short; keep the Auth Proxy up to date |
| Import | For small instances temporarily increase CPU and RAM to speed imports; export from external servers with the proper procedure |
| Backups vs exports | Backups are lightweight but (per this page) are deleted with the instance, can't cover a single database/table, and can't restore if the region is unavailable. Exports create a file in Cloud Storage, survive instance deletion and can be per database or table |
| Deletion protection | Instances created in the console or Terraform enable accidental deletion prevention by default; automate exports with Cloud Scheduler plus the REST API (or Cloud Run functions) |

## Notes

- Authorized Networks with `0.0.0.0/0` and public IP expose the instance; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Manually triggered failover is disruptive; try it on a disposable instance first.
- Source inconsistency: this page says deleting the instance also deletes its backups; the backup pages describe final backups, retained backups and point-in-time recovery of a deleted instance that outlive the instance when enabled (see `cloud-sql-backup-recovery/backups.md` and `pitr.md`). Exports are unaffected either way.
- The source also links to troubleshooting pages (debugging connection issues, known issues) and per-engine best practices for MySQL, PostgreSQL and SQL Server.
- Source: https://docs.cloud.google.com/sql/docs/best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [operational-guidelines.md](./operational-guidelines.md)
- [quotas.md](./quotas.md)
- [availability.md](./availability.md)
