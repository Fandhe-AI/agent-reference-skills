---
source: https://docs.cloud.google.com/sql/docs/operational-guidelines
---

# Operational guidelines

User-controlled configurations that cause an outage to be excluded from the Cloud SQL SLA, which excludes outages "caused by factors outside of Google's reasonable control". You are responsible for monitoring that the instance is properly sized and configured.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sql/docs/quotas (check the current connection limit, a flag-related value):

```sql
SHOW VARIABLES LIKE "max_connections";
```

## Options / Props

| Category | Rule |
|----------|------|
| General configuration | Only instances configured for high availability with at least one dedicated CPU are covered by the SLA. Shared-core and single-zone instances are not covered. Overloading or long recovery caused by configuration/usage also voids coverage |
| Database flag values | Some flags can compromise stability or data durability; see the engine-specific flags pages (MySQL, PostgreSQL, SQL Server) |
| Storage full | Consistently high disk utilization without automatic storage increase may not be covered |
| CPU overloaded | Consistently high CPU utilization may not be covered |
| Memory overloaded | Consistently high memory usage may not be covered |

## Notes

- If the instance is unhealthy and Cloud SQL determines it was out of compliance with these limits, the downtime does not count against the SLA.
- Set up alerts and monitoring in Cloud Monitoring. Engine-specific operational guidelines exist for MySQL, PostgreSQL and SQL Server (see the official docs).
- Source: https://docs.cloud.google.com/sql/docs/operational-guidelines (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [best-practices.md](./best-practices.md)
- [availability.md](./availability.md)
- [quotas.md](./quotas.md)
