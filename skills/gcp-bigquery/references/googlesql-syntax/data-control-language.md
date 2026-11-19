---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language
---

# Data control language (DCL) statements in GoogleSQL

## Signature / Usage

The BigQuery data control language (DCL) statements let you set up
and control BigQuery resources using
[GoogleSQL](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql) query syntax.

Use these statements to give or remove access to BigQuery resources.

For more information on controlling access to specific BigQuery resources,
see:

- [Controlling access to datasets](https://docs.cloud.google.com/bigquery/docs/dataset-access-controls)
- [Controlling access to tables](https://docs.cloud.google.com/bigquery/docs/table-access-controls)
- [Controlling access to views](https://docs.cloud.google.com/bigquery/docs/authorized-views)

### Permissions required

The following permissions are required to run `GRANT` and `REVOKE` statements.

| Resource Type | Permissions |
|---|---|
| Dataset | `bigquery.datasets.update` |
| Table | `bigquery.tables.setIamPolicy` |
| View | `bigquery.tables.setIamPolicy` |
| Project | `resourcemanager.projects.setIamPolicy` |

### `GRANT` statement

Grants roles to users on BigQuery resources.

#### Syntax

```text
GRANT role_list
  ON resource_type resource_name
  TO user_list
```

#### Arguments

- `role_list`: A role or list of comma separated roles that contains the
  permissions you want to grant. For more information on the types of roles available,
  see [Roles and permissions](https://docs.cloud.google.com/iam/docs/roles-overview).

- `resource_type`: The type of resource the role is applied to. Supported values include:
  `SCHEMA` (equivalent to dataset), `TABLE`, `VIEW`,
  `EXTERNAL TABLE`, and `PROJECT`.

- `resource_name`: The name of the resource you want to grant the permission on.

- [`user_list`](#user_list): A comma separated list of users that the role is granted to.

#### `user_list`

Specify users using the following formats:

| User Type | Syntax | Example |
|---|---|---|
| Google account | `user:$user@$domain` | `user:first.last@example.com` |
| Google group | `group:$group@$domain` | `group:my-group@example.com` |
| Service account | `serviceAccount:$user@$project.iam.gserviceaccount.com` | `serviceAccount:robot@example.iam.gserviceaccount.com` |
| Google domain | `domain:$domain` | `domain:example.com` |
| All Google accounts | `specialGroup:allAuthenticatedUsers` | `specialGroup:allAuthenticatedUsers` |
| All users | `specialGroup:allUsers` | `specialGroup:allUsers` |
| Connection | `connection:[$project_id.]$location.$connection_id` If `$project_id` is omitted, the project where you run this DCL statement is used. | `connection:my-bq-project.us.my-connection` |

For more information about each type of user in the table, see
[Concepts related to identity](https://docs.cloud.google.com/iam/docs/overview#concepts_related_identity).

#### Examples

The following example grants the `bigquery.dataViewer` role to the users
`raha@example-pet-store.com` and `sasha@example-pet-store.com` on a dataset named
`myDataset`:

```sql
GRANT `roles/bigquery.dataViewer` ON SCHEMA `myProject`.myDataset
TO "user:raha@example-pet-store.com", "user:sasha@example-pet-store.com"
```

The following example grants the `aiplatform.user` and `run.invoker` roles to
the `my-connection` and `other-connection` connections on the
`my-vertex-project` project:

```sql
GRANT `roles/aiplatform.user`, `roles/run.invoker`
ON PROJECT `my-vertex-project`
TO "connection:my-bq-project.us.my-connection", "connection:another-bq-project.eu.other-connection";
```

### `REVOKE` statement

Removes roles from a list of users on BigQuery resources.

#### Syntax

```text
REVOKE role_list
  ON resource_type resource_name
  FROM user_list
```

#### Arguments

- `role_list`: A role or list of comma separated roles that contains the
  permissions you want to remove. For more information on the types of roles available,
  see [Roles and permissions](https://docs.cloud.google.com/iam/docs/roles-overview).

- `resource_type`: The type of resource that the role will be removed from. Supported values include:
  `SCHEMA` (equivalent to dataset), `TABLE`, `VIEW`,
  `EXTERNAL TABLE`, and `PROJECT`.

- `resource_name`: The name of the resource you want to revoke the role on.

- [`user_list`](#user_list): A comma separated list of users that the role is revoked from.

#### Examples

The following example removes the `bigquery.admin` role on the `myDataset`
dataset from the `example-team@example-pet-store.com` group and a service
account:

```sql
REVOKE `roles/bigquery.admin` ON SCHEMA `myProject`.myDataset
FROM "group:example-team@example-pet-store.com", "serviceAccount:user@test-project.iam.gserviceaccount.com"
```

The following example revokes the `run.invoker` role on the `my-vertex-project`
project from the `my-connection` connection:

```sql
REVOKE `roles/run.invoker`
ON PROJECT `my-vertex-project`
FROM "connection:my-bq-project.us.my-connection";
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
