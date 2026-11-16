---
source: https://docs.cloud.google.com/spanner/docs/configure-fgac
---

# Configure fine-grained access control

How to configure fine-grained access control for GoogleSQL-dialect and PostgreSQL-dialect Spanner databases: create database roles and grant privileges, optionally build a role hierarchy, grant database roles to principals with IAM, and tell users and developers to use database roles. Fine-grained access control users must then specify a database role to perform queries, DML or row operations.

## Signature / Usage

### Create a database role and grant privileges

GoogleSQL:

```bash
gcloud spanner databases ddl update DATABASE_NAME --instance=INSTANCE_NAME \
--ddl='CREATE ROLE ROLE_NAME; GRANT PRIVILEGES ON TABLE TABLES TO ROLE ROLE_NAME;'
```

PostgreSQL:

```bash
gcloud spanner databases ddl update DATABASE_NAME --instance=INSTANCE_NAME \
--ddl='CREATE ROLE ROLE_NAME; GRANT PRIVILEGES ON TABLE TABLES TO ROLE_NAME;'
```

`PRIVILEGES` is a comma-delimited list of fine-grained access control privileges; `TABLES` is a comma-delimited list of tables. Use the same case for schema object names as when you created them. Role hierarchies (`GRANT ROLE role1 TO ROLE role2;`) are in [fgac-about.md](./fgac-about.md).

### Step 1: enable fine-grained access control for a principal

```bash
gcloud spanner databases add-iam-policy-binding DATABASE_NAME \
--instance=INSTANCE_NAME \
--role=roles/spanner.fineGrainedAccessUser \
--member=MEMBER_NAME \
--condition=None
```

This makes the principal a fine-grained access control user. Submit it only once per principal. On success the command outputs the entire policy for the database.

### Step 2: grant permission to use database roles

```bash
gcloud spanner databases add-iam-policy-binding DATABASE_NAME \
--instance=INSTANCE_NAME \
--role=roles/spanner.databaseRoleUser \
--member=MEMBER_NAME \
--condition=CONDITION
```

`CONDITION` has the following form (one role):

```text
--condition='expression=(resource.type == "spanner.googleapis.com/DatabaseRole" && resource.name.endsWith("/ROLE1")),title=TITLE,description=DESCRIPTION'
```

More than one role: combine conditions with the or (`||`) operator; add more `||` conditions for more than two roles.

```text
--condition='expression=(resource.type == "spanner.googleapis.com/DatabaseRole" && (resource.name.endsWith("/ROLE1") || resource.name.endsWith("/ROLE2"))),title=TITLE,description=DESCRIPTION'
```

Example: grant the database roles `hr_rep` and `hr_manager` to `jsmith@example.com`:

```bash
gcloud spanner databases add-iam-policy-binding myDatabase \
  --instance=myInstance \
  --role=roles/spanner.databaseRoleUser \
  --member=user:jsmith@example.com \
  --condition='expression=(resource.type == "spanner.googleapis.com/DatabaseRole" && (resource.name.endsWith("/hr_rep") || resource.name.endsWith("/hr_manager"))),title=HR roles,description=Grant permissions on HR roles'
```

### List database roles

Unfiltered list; requires the `spanner.databaseRoles.list` permission:

```bash
gcloud spanner databases roles list --database=DATABASE_NAME --instance=INSTANCE_NAME
```

### Access the database with a database role

gcloud: add `--database-role` to `execute-sql`.

```bash
gcloud spanner databases execute-sql DATABASE_NAME \
--instance=INSTANCE_NAME \
--sql="SELECT * from TABLE_NAME;" \
--database-role=ROLE_NAME
```

Python client library (excerpt):

```python
# instance_id = "your-spanner-instance"
# database_id = "your-spanner-db-id"
spanner_client = spanner.Client()
instance = spanner_client.instance(instance_id)
role = "new_parent"
database = instance.database(database_id, database_role=role)

with database.snapshot() as snapshot:
    results = snapshot.execute_sql("SELECT * FROM Singers")
    for row in results:
        print("SingerId: {}, FirstName: {}, LastName: {}".format(*row))
```

## Options / Props

| Item | Description |
|---|---|
| `roles/spanner.viewer` | Grant to every fine-grained access control user (recommended at project level) so they can use Spanner resources in the Google Cloud console |
| `roles/spanner.fineGrainedAccessUser` | Grant once per principal with `--condition=None`; makes the principal a fine-grained access control user (permissions `spanner.databaseRoles.list`, `spanner.databases.useRoleBasedAccess`) |
| `roles/spanner.databaseRoleUser` | Grants use of the database roles selected by the IAM condition (resource type `spanner.googleapis.com/DatabaseRole`, resource name ending in `/ROLE`) |
| `MEMBER_NAME` | `user:EMAIL`, `group:EMAIL`, `serviceAccount:EMAIL` or `domain:DOMAIN` |
| `CONDITION` | IAM condition expression selecting the database roles; any expression supported by IAM conditions works |
| Database roles per database | Up to 100 |

## Notes

- Caution (source): if you don't specify a condition on `roles/spanner.databaseRoleUser`, the principal has access to all database roles.
- Caution (source): avoid granting `roles/spanner.databaseUser` (Cloud Spanner Database User) to fine-grained access control users; it provides excessive permissions.
- Transition a principal: enable fine-grained access control and grant all required database roles, update every application that runs as the principal to specify database roles, then revoke all IAM database-level roles so access is governed by one method only (exception: console users still need `roles/spanner.viewer`). Revoking roles changes live access; try it on a disposable database first.
- Authorization rules (access-with-fgac): with the Google Cloud SDK, if you specify a database role Spanner checks only fine-grained privileges and the operation fails if that check fails; without a role it checks database-level IAM permissions. In the console, principals with database-level IAM permissions get no role selector; principals with only fine-grained privileges need the `spanner_sys_reader` system role (or a member role) and select a role on the database Overview page, where the Current role field defaults to the `public` system role.
- Permission `spanner.databaseRoles.use` ("Use a specified database role") is listed on the Spanner IAM page, and the PGAdapter page says roles other than `public` need it. The IAM roles-permissions page lists no permissions for `roles/spanner.databaseRoleUser` (empty permission cell); neither page states that this role contains `spanner.databaseRoles.use`.
- Snippet taken from https://docs.cloud.google.com/spanner/docs/access-with-fgac (the `execute-sql --database-role` block and the Python excerpt).
- `gcloud ... --condition`: if a condition expression includes a comma, specify a different key-value delimiter (`--condition=^:^title=TITLE:expression=EXPRESSION`), per the gcloud help.
- IAM policies are not part of backups or export: re-grant database roles to principals after a restore (see [fgac-about.md](./fgac-about.md)).
- Leading indentation of list-nested code blocks in the twin was normalized; the `myDatabase` example is an indented (not fenced) code block in the source. The source also shows Console steps, client-library samples for role creation, grants and listing (C++, C#, Go, Java, Node.js, PHP, Python, Ruby), `gcloud asset search-all-iam-policies` queries for auditing users and conditions, and dropping roles; omitted.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`. IAM conditions in general: `gcp-foundation`.
- Source: https://docs.cloud.google.com/spanner/docs/configure-fgac (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/access-with-fgac (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/iam (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/spanner (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/spanner/docs/pgadapter (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fgac-about.md](./fgac-about.md)
- [pgadapter.md](./pgadapter.md)
- [backup.md](./backup.md)
- `gcloud spanner databases add-iam-policy-binding`: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/add-iam-policy-binding
