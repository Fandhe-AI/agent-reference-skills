---
source: https://docs.cloud.google.com/database-center/docs/overview
---

# Database Center

Database Center is an AI-assisted dashboard that gives one centralized view across your database fleet: health issues, recommendations, alerts, and Gemini chat about availability, data protection, security and compliance. This page merges the overview, set-up (IAM), health-issues, dashboard-views, alerts and best-practices pages.

## Signature / Usage

### Roles to grant (IAM, project / folder / organization level)

Source lists the roles below. Grant at organization level to see all database resources. Console path: IAM page, View by Principals, GRANT ACCESS, Assign roles, Save. You need `Owner` or `Admin` on the project to grant roles.

- `roles/databasecenter.viewer`: view access to all instances in the project for which Database Center is enabled. Metadata of managed databases only, not their data.
- `roles/recommender.viewer` (optional): view access to recommender-related health issues.
- `roles/monitoring.editor`: create and modify alerting policies in the Google Cloud console.
- "Database center admin" (console role name): create, update or delete a saved dashboard view.

### Resolve a data protection issue: deletion protection (Cloud SQL)

"Deletion protection not enabled" is a Built-in data protection health issue for Cloud SQL. Enable deletion protection on an existing instance (Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/deletion-protection):

```bash
gcloud sql instances patch INSTANCE_NAME \
    --deletion-protection
```

### Enable optional tiers

- Gemini tier: enable Gemini Cloud Assist (chat is available at project and folder level).
- Security Command Center (SCC) tier: activate SCC. Built-in tier gives basic security issues; Premium gives all SCC-supported issues.

### Dashboard views (Preview)

Save filters and health-issue settings as a view: Database Center page, **Save changes**, **Create new view**, name it, optional ID (cannot be changed later), choose "only me" or shared with anyone who can access the project, **Save**. Views can also be updated, favorited and deleted (delete asks you to type the view name). **Copy link** shares a temporary, unsaved view by URL with colleagues in the organization. Scheduled reports can be created for a view.

### Alerts (Preview)

Database Center **Alerts** tab shows an **Incidents** pane and a **Policies** pane for the selected project. Create, edit, copy and delete are started in Database Center and completed in Google Cloud Observability. Alerting policies apply to a single project only; you cannot create one for an organization.

## Options / Props

### Supported products (health issues)

| Product | Notes |
| --- | --- |
| AlloyDB for PostgreSQL, Bigtable, Cloud SQL for MySQL / PostgreSQL / SQL Server, Firestore, Memorystore for Redis, Memorystore for Redis Cluster, Oracle Database@Google Cloud, Spanner | Supported |
| MySQL / PostgreSQL / SQL Server on Compute Engine VM | Preview |
| BigQuery | Resource inventory monitoring only, no health issues |
| Memorystore for Valkey | Resource inventory and metrics monitoring only |

### Health issue categories

| Category | Description |
| --- | --- |
| Availability configuration | Configurations that affect durability, fault tolerance and downtime |
| Cost | Cost-saving opportunities |
| Data protection | Backups present, sufficient retention, no gaps in protection, Cloud SQL protected by Backup and DR Service |
| Security | Misconfigurations, vulnerabilities, threats, regulatory compliance |
| Industry compliance | CIS Google Cloud Foundation 2.0 / 1.3 / 1.2 / 1.1 / 1.0, NIST 800-53, ISO-27001, PCI-DSS v3.2.1 (the full table also lists newer standards such as HIPAA, SOC2 v2017, PCI-DSS v4.0) |
| Performance and capacity | High CPU / memory, low storage, many tables, temp tables |
| Other | Query troubleshooting, error / logging scope, connection and user settings |

### Health issue tiers

| Tier | Requirement |
| --- | --- |
| Built-in | Included by default |
| Gemini | Requires Gemini Cloud Assist |
| Security Command Center (SCC) | Requires Security Command Center |

### Selected examples from the supported-issues table

| Category | Issue | Tier |
| --- | --- | --- |
| Availability | Database resource not failover protected | Built-in |
| Availability | Not multi-regional for disaster recovery | Built-in |
| Cost | Idle database resource / Overprovisioned database resource | Gemini |
| Data protection | No automated backup policy; Short backup retention; Last backup failed; Last backup older than 24 hours; Deletion protection not enabled; No point-in-time recovery | Built-in |
| Security | Public IP enabled; Exposed to broad access; Unencrypted connections; Auditing not enabled; Server certificate expiring | Built-in |
| Security | No root password; Weak root password; Encryption key not customer-managed | SCC |
| Performance and capacity | High resource utilization; Hotspot detected; Nearing or at storage capacity | Built-in |
| Performance and capacity | Inefficient queries | SCC |

## Notes

- Data is not real time: usually updated within a few minutes, sometimes up to 24 hours.
- Database Center does not notify you about health issues; check the dashboard regularly (for example weekly) and verify recently added resources.
- If SCC or Gemini Cloud Assist is not enabled, their issue checks display as passing in the UI.
- Issues marked (E+) in the source table need Cloud SQL Enterprise edition or higher.
- Health issue customizations are saved per user. Many health issues in the source are marked Preview (for example several Bigtable, Spanner and Compute Engine VM checks).
- Best practices from the source: confirm HA (primary and standby in different zones, synchronous replication, automatic failover); use cross-region replication (asynchronous; disaster recovery, lower read latency, load balancing, read capacity); enable automated backups; set long backup retention windows; use enhanced backup protection (Backup and DR Service) for Cloud SQL, verified on the Resources page via Column display options, **Backup protection** shows **Enhanced**.
- Security issues under SCC Built-in for Cloud SQL: Public IP enabled, Exposed to public access. Premium covers the long list including compliance violations, weak passwords and logging misconfigurations.
- The source also shows the full ~100-row health-issue matrix per product (omitted here), Console click-paths for IAM, and the Preview list of per-product issues.
- Managed Google Cloud database fleet dashboard; distinct from Supabase (`supabase`) and from client code skills (`mssql`, `drizzle`). Cloud SQL and AlloyDB services are covered in other categories of this skill; IAM basics are in `gcp-foundation`.
- The Database Center source pages contain no code blocks. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/deletion-protection (the gcloud remediation for the "Deletion protection not enabled" issue). The snippet comes from the PostgreSQL page; the gcloud help for `gcloud sql instances patch` describes `--[no-]deletion-protection` for any Cloud SQL instance without an engine restriction.
- Source: https://docs.cloud.google.com/sql/docs/postgres/deletion-protection (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/database-center/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/database-center/docs/set-up-database-center (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/database-center/docs/database-health-issues (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/database-center/docs/dashboard-views (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/database-center/docs/alerts (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/database-center/docs/best-practices-managing-database-fleet-health (retrieved 2026-11-16)

## Related

- [query-insights.md](./query-insights.md)
