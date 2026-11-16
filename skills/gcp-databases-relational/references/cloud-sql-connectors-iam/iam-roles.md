---
source: https://docs.cloud.google.com/sql/docs/postgres/iam-roles
---

# IAM roles for Cloud SQL

Predefined Cloud SQL IAM roles, the permissions each includes, a permission-to-role map, and custom role guidance. Broader roles include the narrower ones (Editor includes Viewer; Admin includes Editor).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/iam-logins (a principal that holds `roles/cloudsql.client` and `roles/cloudsql.instanceUser` can start the Auth Proxy with automatic IAM database authentication):

```bash
./cloud-sql-proxy --auto-iam-authn INSTANCE_CONNECTION_NAME
```

## Options / Props

Cloud SQL roles other than basic roles contain only Cloud SQL permissions, except: `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.use`.

### Predefined roles

| Role | Description and key Cloud SQL permissions |
|------|-------------------------------------------|
| `roles/owner` Owner | Full access to all Google Cloud resources; manage user access. `cloudsql.*` |
| `roles/editor` Editor | Read-write access to all Google Cloud and Cloud SQL resources, except modifying permissions. All `cloudsql` permissions except `cloudsql.*.getIamPolicy` and `cloudsql.*.setIamPolicy` |
| `roles/viewer` Viewer | Read-only access to all Google Cloud resources. `cloudsql.backupRuns.export`, `cloudsql.*.get`, `cloudsql.*.list` |
| `roles/cloudsql.admin` Cloud SQL Admin | Full control of all Cloud SQL resources. `cloudsql.*` plus `recommender.cloudsql*` insights and recommendations (all actions) |
| `roles/cloudsql.editor` Cloud SQL Editor | Manage Cloud SQL resources. No ability to see or modify permissions, nor modify users or SSL certs. No import, restore from backup, clone, delete or promote instances. No start or stop replicas. No delete of databases, replicas or backups |
| `roles/cloudsql.viewer` Cloud SQL Viewer | Read-only access to all Cloud SQL resources. `cloudsql.backupRuns.export`, `cloudsql.*.get`, `cloudsql.*.list`, `cloudsql.instances.listServerCas`, `cloudsql.instances.listServerCertificates` plus recommender `get` / `list` |
| `roles/cloudsql.client` Cloud SQL Client | Connectivity from App Engine and the Cloud SQL Auth Proxy; not required for accessing an instance by IP address. `cloudsql.instances.connect`, `cloudsql.instances.get` |
| `roles/cloudsql.instanceUser` Cloud SQL Instance User | Access to an instance. `cloudsql.instances.executeSql`, `cloudsql.instances.get`, `cloudsql.instances.login` |
| `roles/cloudsql.schemaViewer` Cloud SQL Schema Viewer | Instance schema in Knowledge Catalog. `cloudsql.schemas.view` |
| `roles/cloudsql.studioUser` Cloud SQL Studio User | Cloud SQL Studio. `cloudsql.databases.list`, `cloudsql.instances.executeSql`, `cloudsql.instances.get`, `cloudsql.instances.login`, `cloudsql.users.list`, `serviceusage.services.get`, `serviceusage.services.list` |

Cloud SQL Editor permissions (`cloudsql.*`): `instances.addServerCa`, `instances.addServerCertificate`, `instances.connect`, `instances.export`, `instances.failover`, `instances.get`, `instances.list`, `instances.listServerCas`, `instances.listServerCertificates`, `instances.migrate`, `instances.reencrypt`, `instances.restart`, `instances.rotateServerCa`, `instances.rotateServerCertificate`, `instances.truncateLog`, `instances.update`, `databases.create`, `databases.get`, `databases.list`, `databases.update`, `backupRuns.create`, `backupRuns.export`, `backupRuns.get`, `backupRuns.list`, `backupRuns.update`, `schemas.view`, `sslCerts.get`, `sslCerts.list`, `users.list`; plus recommender `get` / `list` / `update` for the same insight and recommendation types as Admin.

### Permissions and their roles

Legacy role = the basic role that contains it. "Admin" = Cloud SQL Admin, "Editor" = Cloud SQL Editor, "Viewer" = Cloud SQL Viewer.

| Permission | Cloud SQL roles | Legacy role |
|------------|-----------------|-------------|
| `cloudsql.backupRuns.create` / `.update` | Admin, Editor | Editor |
| `cloudsql.backupRuns.delete` | Admin | Editor |
| `cloudsql.backupRuns.export` | Admin, Editor, Viewer | N/A |
| `cloudsql.backupRuns.get` / `.list` | Admin, Editor, Viewer | Viewer |
| `cloudsql.databases.create` / `.update` | Admin, Editor | Editor |
| `cloudsql.databases.delete` | Admin | Editor |
| `cloudsql.databases.get` | Admin, Editor, Viewer | Viewer |
| `cloudsql.databases.list` | Admin, Editor, Studio User, Viewer | Viewer |
| `cloudsql.databases.getIamPolicy` / `.setIamPolicy` | Admin | Owner |
| `cloudsql.instances.addServerCa` / `.addServerCertificate` | Admin, Editor | Editor |
| `cloudsql.instances.clone` | Admin | Editor |
| `cloudsql.instances.connect` | Admin, Client, Editor | Editor |
| `cloudsql.instances.create` / `.delete` | Admin | Editor |
| `cloudsql.instances.demoteMaster` | Admin | Editor |
| `cloudsql.instances.executeSql` | Admin, Instance User, Studio User | Owner |
| `cloudsql.instances.export` | Admin, Editor | Owner |
| `cloudsql.instances.failover` | Admin, Editor | Editor |
| `cloudsql.instances.get` | Admin, Client, Editor, Studio User, Viewer | Viewer |
| `cloudsql.instances.getIamPolicy` / `.setIamPolicy` | Admin | Owner |
| `cloudsql.instances.import` | Admin | Editor |
| `cloudsql.instances.list` / `.listServerCas` / `.listServerCertificates` | Admin, Editor, Viewer | Viewer |
| `cloudsql.instances.promoteReplica` | Admin | Editor |
| `cloudsql.instances.resetSslConfig` | Admin | Editor |
| `cloudsql.instances.reencrypt` / `.restart` / `.truncateLog` / `.update` | Admin, Editor | Editor |
| `cloudsql.instances.restoreBackup` | Admin | Editor |
| `cloudsql.instance.rotateServerCa` / `cloudsql.instance.rotateServerCertificate` | Admin, Editor | Editor |
| `cloudsql.instances.startReplica` / `.stopReplica` | Admin | Editor |
| `cloudsql.schemas.view` | Admin, Editor, Schema Viewer | Viewer |
| `cloudsql.sslCerts.create` / `.delete` | Admin | Editor |
| `cloudsql.sslCerts.get` / `.list` | Admin, Editor, Viewer | Viewer |
| `cloudsql.users.create` / `.delete` / `.update` | Admin | Editor |
| `cloudsql.users.list` | Admin, Editor, Studio User, Viewer | Viewer |
| `recommender.cloudsql*` (`get`, `list`) | Admin, Editor, Viewer | N/A |
| `recommender.cloudsql*` (`update`) | Admin, Editor | N/A |

Recommender families: `cloudsqlInstanceDiskUsageTrendInsights`, `cloudsqlInstanceOutOfDiskRecommendations`, `cloudsqlInstancePerformanceInsights`, `cloudsqlInstancePerformanceRecommendations`, `cloudsqlInstanceOomProbabilityInsights`, `cloudsqlInstanceSecurityInsights`, `cloudsqlInstanceSecurityRecommendations`, `cloudsqlInstanceUnderprovisionedCpuUsageInsights`, `cloudsqlInstanceUnderprovisionedMemoryUsageInsights`, `cloudsqlUnderProvisionedInstanceRecommendations`.

## Notes

- Custom roles: if you include either `cloudsql.instances.list` or `cloudsql.instances.get`, include both, otherwise the Google Cloud console doesn't function correctly for Cloud SQL.
- Source inconsistency: the permissions table writes `cloudsql.instance.rotateServerCa` and `cloudsql.instance.rotateServerCertificate` (singular `instance`) while the role table writes `cloudsql.instances.rotateServerCa`; kept verbatim in the permissions table.
- Source inconsistency: the IAM roles and permissions reference (https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsql, retrieved 2026-11-14; `iam/cloudsql.md` in this skill) differs from this page: `roles/cloudsql.editor` also has `cloudsql.instances.demoteMaster`, and basic `roles/editor` has `cloudsql.instances.executeSql` / `.login` but not `cloudsql.instances.export`. Use the reference for current role contents.
- The permissions table was condensed by grouping rows with identical role assignments; the full per-permission recommender rows are in the source.
- Snippet is borrowed because the source has no code block.
- Cloud SQL is managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`) roles. IAM fundamentals: `gcp-foundation`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/iam-roles (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/sql/docs/postgres/iam-logins

## Related

- [roles-and-permissions.md](./roles-and-permissions.md)
- [iam-authentication.md](./iam-authentication.md)
- [iam-logins.md](./iam-logins.md)
