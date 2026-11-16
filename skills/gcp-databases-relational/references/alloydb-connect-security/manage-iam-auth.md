---
source: https://docs.cloud.google.com/alloydb/docs/database-users/manage-iam-auth
---

# Manage IAM authentication

Configure IAM database authentication on new or existing AlloyDB for PostgreSQL clusters to manage database sign-ins and permissions with individual IAM accounts or IAM groups. It complements standard PostgreSQL users and is disabled on AlloyDB instances by default. General steps: enable IAM (individual or group) authentication on the instance, grant the required IAM roles to the account or group, add the account or group to the cluster, then grant database privileges.

## Signature / Usage

### 1. Enable IAM authentication on the instance

Set the database flag `alloydb.iam_authentication` to `on` (individual authentication); for group authentication set both `alloydb.iam_authentication` and `alloydb.iam_group_authentication` to `on`. Set the flags to `off` to disable. With gcloud, pass the flag in `FLAGS_LIST` (for example `alloydb.iam_authentication=on`):

```bash
   gcloud alloydb instances update INSTANCE_ID \
   --database-flags FLAGS_LIST \
   --region=REGION_ID \
   --cluster=CLUSTER_ID \
   --project=PROJECT_ID
```

Caution (source): this command overwrites all database flags previously set; flags not in the `--database-flags` list are reset to their defaults. Include current and new flags in the list.

### 2. Grant IAM roles to the account

Grant `roles/alloydb.databaseUser` (lets the user connect to the AlloyDB instance) and `roles/serviceusage.serviceUsageConsumer` (access to an API that checks permissions), each as `ALLOYDB_ROLE`:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=PRINCIPAL \
    --role=ALLOYDB_ROLE
```

`PRINCIPAL` is `user:EMAIL_ID` or `serviceAccount:EMAIL_ID`.

### 3. Add the IAM user or service account to the cluster

```bash
gcloud alloydb users create USERNAME \
--cluster=CLUSTER \
--region=REGION \
--type=IAM_BASED
```

To give the account access to other clusters in the project, repeat this step.

### 4. Grant database privileges

A new IAM user has no privileges on any database except the objects that `PUBLIC` can access. Grant more with `GRANT` (double quotes around the email address are required):

```sql
GRANT SELECT ON TABLE_NAME TO "USERNAME";
```

### Group authentication

Assign `roles/alloydb.databaseUser` and `roles/serviceusage.serviceUsageConsumer` to the group, then create a database user for the group:

```bash
gcloud alloydb users create GROUP_EMAIL \
--cluster=CLUSTER \
--region=REGION \
--type=IAM_GROUP
```

Grant database privileges to the group instead of individual users:

```sql
GRANT SELECT ON TABLE_NAME TO "GROUP_NAME";
```

### Remove an IAM user or service account

```bash
gcloud alloydb users delete USERNAME \
--cluster=CLUSTER \
--region=REGION
```

### Troubleshoot: list users on the cluster

```bash
gcloud alloydb users list \
    --cluster=CLUSTER \
    --region=REGION
```

## Options / Props

| Item | Value |
|---|---|
| `alloydb.iam_authentication` | Default `off`; instance restarts when set, removed or modified: Yes; read pool restrictions: No (database flags reference) |
| `alloydb.iam_group_authentication` | Set with `alloydb.iam_authentication` for group authentication |
| `--type` (`gcloud alloydb users create`) | `BUILT_IN` (default, password), `IAM_BASED` (IAM user or service account), `IAM_GROUP` (IAM group); values from the gcloud help |
| `USERNAME` (IAM user) | Full email address, e.g. `dana@example.com` |
| `USERNAME` (service account) | Email without the `.gserviceaccount.com` suffix, e.g. `my-service@my-project.iam`; must not exceed 63 characters |
| `GROUP_EMAIL` | Full group email, e.g. `my-group@example.com` |
| IAM groups per cluster | Maximum 200 (inactive groups count); group names up to 63 characters (nest a longer group under a parent group with a valid name, and add the parent first) |
| Account types | `ALLOYDB_IAM_USER` (does not inherit group privileges), `ALLOYDB_IAM_GROUP_USER`, `ALLOYDB_IAM_GROUP_SERVICE_ACCOUNT` |

## Notes

- Caution (source): there is a per-minute sign-in quota for each instance, covering successful and unsuccessful sign-ins; when exceeded, sign-ins are temporarily unavailable. Avoid frequent sign-ins and restrict sign-ins with authorized networks.
- PostgreSQL truncates identifiers longer than 63 characters, which makes IAM authentication fail for a longer shortened service account name; the source points to a service account impersonation workaround (https://docs.cloud.google.com/alloydb/docs/troubleshoot/troubleshoot-iam-auth).
- Group members inherit permission to sign in to primary instances, read pool instances and AlloyDB Studio without being added individually; AlloyDB creates the member's database account on first sign-in. Restoring or migrating from a Cloud SQL for PostgreSQL backup preserves individual and group IAM user configurations. A deleted and immediately re-created Cloud Identity group might not be usable right away.
- If an account isn't inheriting group privileges and is of type `ALLOYDB_IAM_USER`, remove it from the cluster and sign in again; it is re-created as a group user type. Migrate existing individual users to groups by adding them to a group, adding the group to the cluster with roles and privileges, then deleting the individual user (transfer ownership if intended).
- Removing a group: remove `roles/alloydb.databaseUser` and other AlloyDB roles from the group on the IAM page, then delete the group user with `gcloud alloydb users delete`. Revoking the IAM role alone does not completely remove access. The source also shows `gcloud identity groups delete`, which permanently deletes the Cloud Identity group; omitted. IAM and group membership changes can take 15 minutes or more to propagate; IAM policy changes generally take effect within 60 seconds and up to 7 minutes (user-grant-access).
- The step 2 command grants the roles on the whole project (`gcloud projects add-iam-policy-binding`); access to a specific cluster comes from the database user created in step 3, repeated per cluster.
- `gcloud alloydb users delete` and flag updates that restart the instance are disruptive; try them on a disposable cluster first.
- Source inconsistency: the Console steps say roles other than "the default `alloydbsuperuser`" can be assigned to a new IAM user, while the gcloud section says a new IAM user has no privileges on any database except objects that `PUBLIC` can access.
- The manage-iam-auth page links to the flag and role-grant pages and shows no command for those steps.
- Snippet taken from https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags (step 1 block).
- Snippet taken from https://docs.cloud.google.com/alloydb/docs/user-grant-access (step 2 block). Other roles on that page: `roles/alloydb.client` with `roles/serviceusage.serviceUsageConsumer` (Auth Proxy / Language Connectors connectivity), `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/alloydb.backupDrAdmin`. Granting roles needs Owner or `resourcemanager.projects.get` / `getIamPolicy` / `setIamPolicy` (Project IAM Admin) and the Cloud Resource Manager API enabled.
- Leading indentation of list-nested code blocks was normalized except in the flag-setting block, kept as in the source. The source also shows Console steps; omitted. IAM, service accounts and groups in general: `gcp-foundation`.
- AlloyDB is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- Source: https://docs.cloud.google.com/alloydb/docs/database-users/manage-iam-auth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/user-grant-access (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/alloydb/docs/reference/database-flags (retrieved 2026-11-16; CC BY 4.0)

## Related

- [connect-iam.md](./connect-iam.md)
- [auth-proxy-connect.md](./auth-proxy-connect.md)
- [connect-language-connectors.md](./connect-language-connectors.md)
- `gcloud alloydb users create`: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/users/create
