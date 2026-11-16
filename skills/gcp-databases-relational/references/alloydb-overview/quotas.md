---
source: https://docs.cloud.google.com/alloydb/quotas
---

# Quotas and limits

AlloyDB for PostgreSQL uses quotas (default values, adjustable on request) and system limits (fixed values) to allocate resources fairly and prevent overload. This page covers rate quotas per API group, resource quotas for clusters, vCPUs and storage, fixed limits, and the `max_connections` sizing table.

## Signature / Usage

### Error messages when a quota is exceeded

Cluster create / restore:

```text
Quota limit 'ClustersUsedPerProjectPerRegion' has been exceeded. Limit: 5 in region us-central1.
```

Instance create / update:

```text
Quota limit 'VCPUsUsedPerProjectPerRegion' has been exceeded. Limit: 128 in region us-central1.
```

Database write (for example `INSERT`) beyond the storage quota:

```text
AlloyDB instance exceeds available storage quota.
```

### Check and increase quotas

In the Google Cloud console, open the Quotas page (`https://console.cloud.google.com/iam-admin/quotas`), click **Filter**, select **Service** and then **AlloyDB API**. If **AlloyDB API** is not listed, the AlloyDB Admin API is not enabled. To increase: select the quotas, click **Edit quotas**, enter name, email and phone, then enter the request and click **Submit request**. Request a few days in advance of a notable usage increase.

## Options / Props

### Permissions

| Permission | Purpose |
|---|---|
| `serviceusage.quotas.get` | View quotas |
| `serviceusage.quotas.update` | Change quotas |

Included by default in the basic roles Owner and Editor and in the predefined Quota Administrator role.

### Rate quotas (per minute, per API group, per project, per region, per user)

Exceeding a rate quota returns HTTP `429` with reason `rateLimitExceeded`. Quotas refill over 60-second intervals.

| Group name | Description | Default quota range (queries per minute) | API methods |
|---|---|---|---|
| Connect APIs | Establish new connections. | 180-2000 | `projects.locations.clusters.generateClientCertificate`, `projects.locations.clusters.instances.getConnectionInfo` |
| Get APIs | Read a single resource. | 180-1000 | `projects.locations.clusters.get`, `projects.locations.clusters.instances.get`, `projects.locations.backups.get`, `projects.locations.get` |
| Get operation API | Get the latest state of a long-running operation. | 950-2000 | `projects.locations.operations.get` |
| List APIs | Read a group of resources of the same type. | 180-1000 | `projects.locations.clusters.list`, `projects.locations.clusters.instances.list`, `projects.locations.backups.list`, `projects.locations.supportedDatabaseFlags.list`, `projects.locations.list` |
| List operations API | List operations that match a specific filter in the request. | 2200-3000 | `projects.locations.operations.list` |
| Mutate APIs | Modify resource state. | 180-250 | `projects.locations.clusters.create`, `projects.locations.clusters.patch`, `projects.locations.clusters.delete`, `projects.locations.clusters.restore`, `projects.locations.clusters.instances.create`, `projects.locations.clusters.instances.patch`, `projects.locations.clusters.instances.delete`, `projects.locations.clusters.instances.failover`, `projects.locations.clusters.instances.restart`, `projects.locations.backups.create`, `projects.locations.backups.patch`, `projects.locations.backups.delete`, `projects.locations.operations.delete`, `projects.locations.operations.cancel` |

### Resource quotas

| Resource | Default | Maximum |
|---|---|---|
| Clusters per project per region | 3 to 10, depending on project usage history | 20 |
| vCPUs per project per region | 10,000 (all customer projects) | not stated |
| Storage per cluster | 16 TiB | 128 TiB |

Each primary instance uses two VMs; each read pool instance uses one VM per node. The vCPUs per VM are set when you create or update the instance. Resource quotas do not reset over time; release unused resources (for example delete an unneeded cluster).

### Limits (fixed; request an increase by filing a support case)

| Item | Limit |
|---|---|
| Read pool nodes per cluster (across all read pool instances) | 20 |
| Maximum concurrent connections per instance | Default varies by instance size; adjustable up to the maximum for that size |

### Maximum concurrent connections (`max_connections` flag)

| VCPU | Memory (GB) | Default `max_connections` value | Maximum recommended `max_connections` value |
|---|---|---|---|
| 1 | 8 | `100` | `200` |
| 2 | 16 | `100` | `570` |
| 4 | 32 | `200` | `980` |
| 8 | 64 | `400` | `2300` |
| 14 | 112 | `700` | `4000` |
| 16 | 128 | `800` | `4600` |
| 22 | 176 | `1000` | `6300` |
| 32 | 256 | `1000` | `9175` |
| 44 | 352 | `1000` | `12600` |
| 48 | 384 | `1000` | `13760` |
| 64 | 512 | `1000` | `18350` |
| 72 | 576 | `1000` | `20640` |
| 88 | 704 | `1000` | `25230` |
| 96 | 768 | `1000` | `27525` |
| 128 | 864 | `1000` | `30960` |
| 144 | 1152 | `1000` | `41290` |

### Saved queries limits (Preview)

| Value | Limit |
|---|---|
| Maximum saved queries per project (including other Google Cloud products) | 10,000 |
| Maximum size for each query | 1 MiB |

## Notes

- A read pool instance's `max_connections` must match or exceed the primary instance's value. Update `max_connections` before downsizing an instance.
- Run at most four concurrent queries per instance vCPU. For short-lived connections use a pooler (pgbouncer, pgpool-II) and an application-side pooler (HikariCP, c3p0).
- Values above the recommendation (up to 240,000) reduce shared-buffer memory: per-connection memory is roughly concurrent queries multiplied by `work_mem` (default `4MB` or the vCPU count, whichever is higher).
- Free-trial projects cannot request quota changes. Quotas reset to defaults if billing is disrupted or the billing account changes.
- Quotas do not guarantee hardware availability. Create / start / scale can fail with quota remaining; Compute Engine reservations do not apply to AlloyDB. Retry after a delay, choose another machine series or vCPU size, or use another region.
- Saved queries limits apply to a Preview feature (Pre-GA terms).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` skills (client code only).
- Source: https://docs.cloud.google.com/alloydb/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-machine-type.md](./choose-machine-type.md)
- [instance-read-pool-create.md](./instance-read-pool-create.md)
- Read pool scaling: https://docs.cloud.google.com/alloydb/docs/instance-read-pool-scale
- Cloud Quotas overview: https://docs.cloud.google.com/docs/quotas/overview
