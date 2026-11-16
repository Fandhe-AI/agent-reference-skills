---
source: https://docs.cloud.google.com/bigtable/docs/access-control
---

# Bigtable access control with IAM

Bigtable uses IAM for access control. Policies can be set at the project, instance, table, backup, authorized view and continuous materialized view level; permissions granted at a level apply to everything below it (policy inheritance), but access to an authorized view or continuous materialized view does not grant access to its parents.

## Signature / Usage

### Grant an instance-level role

```bash
gcloud bigtable instances list
```

```bash
gcloud bigtable instances set-iam-policy \
  INSTANCE_ID \
  POLICY_FILE
```

`INSTANCE_ID` is the permanent identifier for the instance. `POLICY_FILE` is the path to a local JSON or YAML file that contains a valid IAM policy.

### Grant a table-level role

```bash
gcloud bigtable instances tables list --instances=INSTANCE_ID
```

```bash
gcloud bigtable instances tables set-iam-policy \
  TABLE_ID \
  --instance=INSTANCE_ID \
  POLICY_FILE
```

### Grant a backup-level role

Adapted (not in the official docs): `--instances` is changed to `--instance`; `gcloud bigtable backups list` has no `--instances` flag (gcloud 593.0.0 reports it as unrecognized).

```bash
gcloud bigtable backups list --instance=INSTANCE_ID
```

```bash
gcloud bigtable backups set-iam-policy BACKUP_ID \
  --instance=INSTANCE_ID \
  --cluster=CLUSTER_ID \
  POLICY_FILE
```

### Grant an authorized view-level role

Adapted (not in the official docs): the command group is changed from `gcloud bigtable instances tables authorized-views` (gcloud 593.0.0: "Invalid choice: 'authorized-views'") to `gcloud bigtable authorized-views`.

```bash
gcloud bigtable authorized-views list \
  --instance=INSTANCE_ID \
  --table=TABLE_ID
```

Adapted (not in the official docs): the stray template residue (`{"</var>"}}` after each placeholder) is removed, and the arguments follow `gcloud bigtable authorized-views set-iam-policy (AUTHORIZED_VIEW : --instance=INSTANCE --table=TABLE) POLICY_FILE`: the authorized view ID is the only positional before `POLICY_FILE` and the table is passed with `--table`.

```bash
gcloud bigtable authorized-views set-iam-policy AUTHORIZED_VIEW_ID \
  --instance=INSTANCE_ID --table=TABLE_ID POLICY_FILE
```

## Options / Props

### Predefined roles

| Role | Description (from source) |
|------|-------------|
| Bigtable Administrator (`roles/bigtable.admin`) | Administers all Bigtable instances within a project, including the data stored within tables. Can create new instances. Intended for project administrators. Lowest-level resource where it can be granted: table |
| Bigtable Editor (`roles/bigtable.editor`) | Editor role for Bigtable (everything in User plus create/delete/update of instances, clusters, tables, app profiles, backups, views; no `setIamPolicy`) |
| Bigtable User (`roles/bigtable.user`) | Read-write access to the data stored within Bigtable tables. Intended for application developers or service accounts. Lowest-level resource: table |
| Bigtable Reader (`roles/bigtable.reader`) | Read-only access to the data stored within Bigtable tables. Intended for data scientists, dashboard generators and other data-analysis scenarios. Lowest-level resource: table |
| Bigtable Viewer (`roles/bigtable.viewer`) | Provides no data access. Minimal set of permissions to access the Google Cloud console for Bigtable. Lowest-level resource: table |

### Permission notes

- `CheckAndMutateRow` (conditional writes) and `ReadModifyWriteRow` require both `bigtable.tables.readRows` (or `bigtable.authorizedViews.readRows`) and `bigtable.tables.mutateRows` (or `bigtable.authorizedViews.mutateRows`).
- `bigtable.instances.executeQuery` lets you send `ExecuteQuery` and `PrepareQuery` requests to an instance.
- `bigtable.instances.list` lets users list all Bigtable instances in a project.

### Custom role permissions for Google Cloud console tasks

| Console task | Required permissions |
|---|---|
| Basic access | `bigtable.appProfiles.get`, `bigtable.appProfiles.list`, `bigtable.clusters.get`, `bigtable.clusters.list`, `bigtable.instances.get`, `bigtable.instances.list`, `bigtable.locations.list`, `bigtable.tables.get`, `bigtable.tables.list`, `resourcemanager.projects.get` |
| Create an instance or cluster | Basic, plus `bigtable.clusters.create`, `bigtable.instances.create` |
| Modify an instance or cluster | Basic, plus `bigtable.clusters.update`, `bigtable.instances.update` |
| Manage replication configuration | Basic, plus `bigtable.appProfiles.create`, `bigtable.appProfiles.delete`, `bigtable.appProfiles.update` |
| Delete an instance or cluster | Basic, plus `bigtable.clusters.delete`, `bigtable.instances.delete` |
| Monitor an instance by viewing graphs | Basic, plus `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.timeSeries.list` |
| Create and update a table | Basic, plus `bigtable.tables.create`, `bigtable.tables.update` |
| Restore a backup | Basic, plus `bigtable.backups.list`, `bigtable.tables.create`, `bigtable.backups.restore` |

### IAM conditions

Supported attributes: date/time attributes (temporary, scheduled or limited-duration access) and resource attributes (name, type, service of instances, clusters, tables, backups and authorized views; for example, manage only tables with a given name prefix).

## Notes

- Bigtable roles appear in the console only after the Bigtable API is enabled for the project; enabling APIs needs `serviceusage.services.enable` (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- Bigtable cannot grant access to `allAuthenticatedUsers` or `allUsers`.
- Before setting instance-, table-, backup-, authorized view- or continuous materialized view-level roles, the user needs at least one project-level role: Bigtable Viewer (recommended), Reader, User or Administrator. Grant the least-privileged one (Viewer in almost all cases). Service accounts do not need these project-level roles. Without one, the user has no Bigtable access in the console.
- Role changes at the instance, table, backup or authorized view level can take up to two minutes to take effect.
- Do not grant service agent roles (for example Cloud Data Fusion API Service Agent) to principals other than service agents.
- `set-iam-policy` replaces the whole policy (caution added here; the source page does not state it): read the current policy first with the matching `get-iam-policy` command and keep its `etag` and existing bindings when building `POLICY_FILE`, so concurrent edits are not overwritten. To add one grant without rewriting the policy, the `add-iam-policy-binding` commands (`--member`, `--role`) exist for instances, tables, backups and authorized views.
- Corrected from the official docs: the authorized-view `set-iam-policy` example originally read `gcloud bigtable authorized-views set-iam-policy TABLE_ID{"</var>"}} \ AUTHORIZED_VIEW_ID{"</var>"}} --instance=INSTANCE_ID{"</var>"}} POLICY_FILE{"</var>"}}` (template residue, and `TABLE_ID` passed as a positional although the command takes it as `--table`); the source's backup section also lists a `TABLE_ID` that the command does not use (omitted here).
- Corrected from the official docs: `gcloud bigtable backups list --instances=INSTANCE_ID` (the flag is `--instance`) and `gcloud bigtable instances tables authorized-views list --instance=INSTANCE_ID --table=TABLE_ID` (the command group is `gcloud bigtable authorized-views`).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/backups/list (gcloud 593.0.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/authorized-views/list (gcloud 593.0.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/authorized-views/set-iam-policy (gcloud 593.0.0)
- Full per-permission tables (about 140 permissions with every including role) are omitted; the source also shows Console steps for instance, table and authorized view grants.
- Bigtable is a wide-column NoSQL database, not a relational one; for IAM, service accounts and ADC fundamentals see `gcp-foundation`.
- Source: https://docs.cloud.google.com/bigtable/docs/access-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication-and-cmek.md](./authentication-and-cmek.md)
- [backups.md](./backups.md)
