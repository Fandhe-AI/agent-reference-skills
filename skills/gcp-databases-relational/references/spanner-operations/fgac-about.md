---
source: https://docs.cloud.google.com/spanner/docs/fgac-about
---

# About fine-grained access control and IAM

This page also holds the Spanner IAM reference (merged from "Access control with IAM"): permissions, predefined roles and custom role guidance. Fine-grained access control combines IAM with SQL role-based access control for GoogleSQL- and PostgreSQL-dialect databases. You define database roles, grant privileges to them, and create IAM policies that grant permissions on database roles to IAM principals. Administrators enable fine-grained access control per principal; those principals must assume a database role. Other principals are governed by IAM database-level roles, and both models can co-exist. It controls access to tables, columns, views and change streams.

## Signature / Usage

Grant `SELECT` on a table to a database role:

```googlesql
CREATE ROLE hr_rep;
GRANT SELECT ON TABLE employees TO ROLE hr_rep;
```

PostgreSQL dialect:

```postgresql
CREATE ROLE hr_rep;
GRANT SELECT ON TABLE employees TO hr_rep;
```

Role hierarchy with privilege inheritance (GoogleSQL):

```googlesql
GRANT SELECT ON TABLE employees TO ROLE pii_access;
GRANT ROLE pii_access TO ROLE hr_manager, hr_director;
```

PostgreSQL dialect:

```postgresql
GRANT SELECT ON TABLE employees TO pii_access;
GRANT pii_access TO hr_manager, hr_director;
```

`hr_manager` and `hr_director` are members of `pii_access` and inherit `SELECT` on `employees`; their own members inherit it too.

### Setup steps

You need `roles/spanner.admin` or `roles/spanner.databaseAdmin`.

1. Create database roles and grant privileges to them.
2. Optional: create role hierarchies by granting roles to other roles.
3. For each principal: enable fine-grained access control (one-time; the principal is granted the `public` database role, which has no privileges by default), grant IAM permissions on one or more database roles, then consider revoking database-level IAM roles so access is managed by one method only.

gcloud commands for each step (`roles/spanner.fineGrainedAccessUser`, conditional `roles/spanner.databaseRoleUser`, `--database-role`) are in [configure-fgac.md](./configure-fgac.md).

## Options / Props

| Resource | Grantable privileges |
|---|---|
| Schemas | `USAGE` (required on non-default schemas to access their objects; `ALL` bulk-grants on objects of one type, new objects need new grants) |
| Tables | `SELECT`, `INSERT`, `UPDATE`, `DELETE`; a privilege on an interleaved parent doesn't propagate to children |
| Columns | `SELECT`, `INSERT`, `UPDATE` on a column subset; `DELETE` is not permitted at column level |
| Views | `SELECT` only. Invoker's rights views also need `SELECT` on underlying objects; definer's rights views need only `SELECT` on the view |
| Change streams | `SELECT`, plus `EXECUTE` on the associated read function |
| Sequences | `SELECT`, `UPDATE` |
| Models | `EXECUTE` |

| Limit | Value |
|---|---|
| Database roles per database | Up to 100 |
| Role hierarchy depth | No limit; deep and wide hierarchies might degrade query performance |

System roles: `spanner_sys_reader` (needed for Key Visualizer) and `spanner_info_reader` (unfiltered `INFORMATION_SCHEMA` results).

### IAM: custom role permissions per task

| Service account task | Required permissions |
|---|---|
| Create a backup | `spanner.backups.create` `spanner.databases.createBackup` |
| Read data | `spanner.databases.select` `spanner.sessions.create` `spanner.sessions.delete` |
| Restore a database | `spanner.backups.restoreDatabase` `spanner.databases.create` |
| Insert, update, or delete data | `spanner.databases.beginOrRollbackReadWriteTransaction` `spanner.sessions.create` `spanner.sessions.delete` `spanner.databases.write` |

### IAM: key permissions

IAM (merged here from "Access control with IAM") controls access at project, instance and database levels. You grant predefined or custom roles, not permissions. The source also lists `spanner.instanceConfigs.*`, `instancePartitions.*`, `*Operations.*`, `backupOperations.*` and `sessions.*` permissions; they appear in the role lists below.

| Permission | Description |
|---|---|
| `spanner.instances.create` / `delete` / `get` / `list` / `update` | Create, delete, get configuration of, list, update instances |
| `spanner.instances.getIamPolicy` / `setIamPolicy` | Get / set an instance's IAM policy |
| `spanner.databases.create` / `drop` / `get` / `getDdl` / `list` / `update` | Create, drop, get metadata, get schema, list, update metadata (`update` currently unavailable for IAM custom roles) |
| `spanner.databases.read` / `select` / `write` | Read API / SQL select / write |
| `spanner.databases.updateDdl` | Update a database's schema |
| `spanner.databases.beginOrRollbackReadWriteTransaction` / `beginReadOnlyTransaction` / `beginPartitionedDmlTransaction` | Begin or roll back read-write, read-only, partitioned DML transactions |
| `spanner.databases.createBackup` | Create a backup from the database; also requires `spanner.backups.create` |
| `spanner.databases.useDataBoost` | Use Spanner Data Boost compute for instance partitioned queries |
| `spanner.databases.useRoleBasedAccess` | Use fine-grained access control |
| `spanner.databases.adapt` | Lets the Spanner Adapter API interact directly with Spanner |
| `spanner.databases.getIamPolicy` / `setIamPolicy` | Get / set a database's IAM policy |
| `spanner.databaseRoles.list` / `use` | List / use database roles |
| `spanner.backups.create` | Create a backup; also requires `spanner.databases.createBackup` on the source |
| `spanner.backups.restoreDatabase` | Restore from a backup; also requires `spanner.databases.create` on the target |
| `spanner.backups.delete` / `get` / `list` / `update` / `getIamPolicy` / `setIamPolicy` | Backup management |
| `spanner.backupSchedules.create` / `delete` / `get` / `list` / `update` | Backup schedules; `create` also requires `spanner.databases.createBackup` |

### IAM: predefined roles

Person roles go to users or groups; machine roles go to service accounts. Don't grant person roles to service accounts. Most predefined roles (all except `spanner.editor`, `spanner.graphIntelligenceUser` and `spanner.serviceAgent`) list Instance and Database as the lowest-level resources where they can be granted.

- `roles/spanner.admin`: complete access to all Spanner resources in a project (grant/revoke permissions, allocate/delete chargeable resources, read/write all databases). Includes `cloudkms.keyHandles.*`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `monitoring.timeSeries.*`, `resourcemanager.projects.get`/`list`, and the `spanner.*` permissions for backups, schedules, databases including `changequorum`, `addSplitPoints`, `runGraphAlgorithms`, `setIamPolicy`, instance configs, partitions, instances including tag bindings, sessions (93 permissions in all on the IAM roles-permissions page, without `spanner.databaseRoles.use`).
- `roles/spanner.editor`: editor role for Cloud Spanner; includes `backups.copy`/`create`/`delete`/`restoreDatabase`/`update`, the `databases` data and DDL permissions, `databases.drop`, `instances.create`/`delete`/`update`, `sessions.*`; it has no `setIamPolicy` permissions and no `cloudkms.*`.
- `roles/spanner.viewer`: view all instances and databases (cannot modify or read them); recommended at project level for Console users. Includes `databases.beginReadOnlyTransaction`, `get`, `getDdl`, `getIamPolicy`, `list`, `useDataBoost` and the `get`/`list` permissions of instances, configs, partitions, operations, backups and schedules.
- `roles/spanner.backupAdmin`: create, view, update, delete backups; manage a backup's allow policy; cannot restore. `roles/spanner.backupWriter`: create backups only (for automation scripts); cannot update or delete.
- `roles/spanner.databaseAdmin`: get/list instances; create/list/drop databases; grant/revoke database access; read and write all databases (includes `cloudkms.keyHandles.*`, `databases.drop`, `databases.setIamPolicy`, `useRoleBasedAccess`, `sessions.*`).
- `roles/spanner.databaseReader`: read, run SQL, view schema (`beginReadOnlyTransaction`, `get`, `getDdl`, `partitionQuery`, `partitionRead`, `read`, `select`, `sessions.*`, `monitoring.timeSeries.create`, `instances.get`, `instancePartitions.get`). `roles/spanner.databaseReaderWithDataBoost`: the same plus `spanner.databases.useDataBoost`.
- `roles/spanner.databaseUser`: read/write, SQL including DML and Partitioned DML, view and update schema (`adapt`, transactions, `changequorum`, `updateDdl`, `write`, `sessions.*`, `databaseOperations.*`).
- `roles/spanner.databaseRoleUser`: with `roles/spanner.fineGrainedAccessUser`, grants permissions to individual database roles; add a condition per role with resource type `spanner.googleapis.com/DatabaseRole` and resource name ending in `/YOUR_SPANNER_DATABASE_ROLE`. `roles/spanner.fineGrainedAccessUser`: `spanner.databaseRoles.list`, `spanner.databases.useRoleBasedAccess`.
- `roles/spanner.graphIntelligenceUser`: Graph Intelligence features (database reader permissions plus `spanner.databases.runGraphAlgorithms` and `useDataBoost`).
- `roles/spanner.restoreAdmin`: restore databases from backups; cannot create backups. To restore to a different instance, apply at project level or to both instances (`backups.get`/`list`/`restoreDatabase`, `databases.create`/`get`/`list`, `databaseOperations.*`).
- `roles/spanner.serviceAgent`: service agents only. Do not grant to any other principal.

Basic roles (`roles/viewer`, `roles/editor`, `roles/owner`) are project-level, apply to all Google Cloud resources and should be avoided in favor of predefined roles: viewer lists/gets metadata and reads and queries; editor also creates instances and databases and writes data; owner also modifies access.

IAM policy methods exist on instances, databases and backups: `getIamPolicy`, `setIamPolicy`, `testIamPermissions` (REST `projects.instances[.databases|.backups].*`; RPC on `InstanceAdmin` / `DatabaseAdmin`).

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/fgac-about (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/iam (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/spanner (retrieved 2026-11-14; CC BY 4.0)
- The IAM role entries above are summarized; the full per-role permission lists, per-resource `*Operations` tables, the service agent permission list and the Console permission-per-action table are on the official IAM page. Don't grant service agent roles to anything but service agents. `spanner.databases.drop` and `spanner.instances.delete` are destructive: dropping a database deletes its data (PITR can't recover it; its backups remain restorable into a new database), and deleting an instance drops all of its databases and is not reversible (https://docs.cloud.google.com/spanner/docs/pitr, https://docs.cloud.google.com/spanner/docs/getting-started/gcloud). Try deletions on a disposable resource first. With `roles/spanner.databaseReader`, read-only transactions might occasionally fail with a permissions error (see "Manage the write-sessions fraction" in the Sessions docs). For IAM, service accounts and ADC in general, see `gcp-foundation`.
- Spanner relies on IAM for identity management rather than managing user credentials in the database. Privileges: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE`.
- Backups include database role definitions and restored databases re-create roles with privileges, but IAM policies are not part of backups: re-grant access to database roles to principals after a restore.
- Limitations: export doesn't export roles and privileges and import can't import them (set them up manually); the Data tab on the TABLE page in the Console is unavailable to fine-grained access control users.
- Example use cases in the source: HR system with different roles (compensation analysts shouldn't see social security numbers), ride-sharing riders vs drivers, an append-only ledger permitting `SELECT` and `INSERT` only.
- `DROP ROLE` and `REVOKE` change live access; try them on a disposable database first.

## Related

- [change-streams.md](./change-streams.md)
- [backup.md](./backup.md)
- [configure-fgac.md](./configure-fgac.md)
- Privileges reference: https://docs.cloud.google.com/spanner/docs/fgac-privileges
- System roles: https://docs.cloud.google.com/spanner/docs/fgac-system-roles
