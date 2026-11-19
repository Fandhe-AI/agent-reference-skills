---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
---

# Data definition language (DDL) statements in GoogleSQL (part 4 of 4)

## Signature / Usage

### `ALTER DATA_POLICY` statement

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-security@google.com](mailto:bigquery-security@google.com).

#### Syntax

```googlesql
ALTER DATA_POLICY [ IF EXISTS ] `project_id.region-location_id.data_policy_id`
SET OPTIONS (alter_option_list);
```

#### Arguments

- `IF EXISTS`: If no data policy exists with that name, the statement has
  no effect.

- `project_id`: The project ID of the project where the data policy will reside
  in.

- `location_id`: The location of the data policy.

- `data_policy_id`: The name of the data policy to be updated.

- [`alter_option_list`](#alter_option_list): The list of options to update on the data policy.

#### `alter_option_list`

The option list specifies options for the data policy. Specify the options in
the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `data_policy_type` | `STRING` | Set it to `DATA_MASKING_POLICY`. |
| `masking_expression` | `STRING` | Specifies the [predefined masking rule](https://docs.cloud.google.com/bigquery/docs/reference/bigquerydatapolicy/rest/v2/projects.locations.dataPolicies#PredefinedExpression) or a [custom masking routine](https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro#custom_mask). |

#### Required permissions

The user or service account that updates a data policy must have the
`bigquery.dataPolicies.update` permission.

The `bigquery.dataPolicies.update` permission is included in the
BigQuery Data Policy Admin, BigQuery Admin and BigQuery Data Owner roles.

### `ALTER CONNECTION SET OPTIONS` statement

Modifies an existing connection.

#### Syntax

```googlesql
ALTER CONNECTION [IF EXISTS] `[[project_id.]location.]connection_id`
SET OPTIONS (alter_connection_option_list);
```

#### Arguments

- `project_id` (Optional): The ID of the project that the connection is in. If omitted, the project where you run this DDL statement is used.
- `location` (Optional): The [location](https://docs.cloud.google.com/bigquery/docs/locations) of the connection. If omitted, the location where you run this DDL statement is used.
- `connection_id`: The name of the connection.
- [`alter_connection_option_list`](#alter_connection_option_list): The options to alter for the connection.

#### `alter_connection_option_list`

Specify options in the `NAME=VALUE, ...` format. You can modify the following
options:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `friendly_name` | `STRING` | A descriptive name for the connection. |
| `description` | `STRING` | A description of the connection. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.connections.update` | The project that the connection is in. |

#### Examples

The following example modifies the description of the
`my_cloud_resource_connection` connection:

```googlesql
ALTER CONNECTION `us.my_cloud_resource_connection`
SET OPTIONS (
  description = "Updated description for my Cloud resource connection"
  );
```

### `DROP SCHEMA` statement

Deletes a dataset.

#### Syntax

```googlesql
DROP [EXTERNAL] SCHEMA [IF EXISTS]
[project_name.]dataset_name
[ CASCADE | RESTRICT ]
```

#### Arguments

- `EXTERNAL`: Specifies if that dataset is a federated dataset. The
  `DROP EXTERNAL` statement only removes the external definition from
  BigQuery. The data stored in the external location is not
  affected.

- `IF EXISTS`: If no dataset exists with that name, the statement has no effect.

- `project_name`: The name of the project that contains the dataset. Defaults
  to the project that runs this DDL statement.

- `dataset_name`: The name of the dataset to delete.

- `CASCADE`: Deletes the dataset and all resources within the dataset, such as
  tables, views, and functions. You must have permission to delete the
  resources, or else the statement returns an error. For a list of
  BigQuery permissions, see
  [Predefined roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control).

- `RESTRICT`: Deletes the dataset only if it's empty. Otherwise, returns an
  error. If you don't specify either `CASCADE` or `RESTRICT`, then the default
  behavior is `RESTRICT`.

#### Details

The statement runs in the location of the dataset if it exists, unless you
specify the location in the query settings. For more information, see
[Specifying your location](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.datasets.delete` | The dataset to delete. |
| `bigquery.tables.delete` | The dataset to delete. If the dataset is empty, then this permission is not required. |

#### Examples

The following example deletes the dataset named `mydataset`. If the dataset does
not exist or is not empty, then the statement returns an error.

```googlesql
DROP SCHEMA mydataset
```

The following example drops the dataset named `mydataset` and any resources
in that dataset. If the dataset does not exist, then no error is returned.

```googlesql
DROP SCHEMA IF EXISTS mydataset CASCADE
```

### `UNDROP SCHEMA` statement

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

[Undeletes a dataset](https://docs.cloud.google.com/bigquery/docs/restore-deleted-datasets)
within your time travel window.

#### Syntax

```googlesql
UNDROP SCHEMA [IF NOT EXISTS]
[project_name.]dataset_name
[OPTIONS (location="us")]
```

#### Arguments

- `IF NOT EXISTS`: If a dataset already exists with that name, the statement has
  no effect.

- `project_name`: The name of the project that contained the deleted dataset.
  Defaults to the project that runs this DDL statement.

- `dataset_name`: The name of the dataset to undelete.

- `location`: Original location of the deleted dataset.

#### Details

When you run this statement, you must
[specify the location](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations)
where the dataset was deleted. If you don't, the `US` multi-region is used.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.datasets.create` | The project where you are undeleting the dataset. |
| `bigquery.datasets.get` | The dataset that you are undeleting. |

#### Examples

The following example undeletes the dataset named `mydataset`. If the dataset
already exists or has passed the time travel window, then the statement returns
an error.

```googlesql
UNDROP SCHEMA mydataset;
```

### `DROP TABLE` statement

Deletes a table or [table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro).

#### Syntax

```googlesql
DROP TABLE [IF EXISTS] table_name
```

#### Arguments

- `IF EXISTS`: If no table exists with that name, the statement has no effect.

- `table_name`: The name of the table to delete. See
  [Table path syntax](#table-path-syntax).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.delete` | The table to delete. |
| `bigquery.tables.get` | The table to delete. |

#### Examples

##### Deleting a table

The following example deletes a table named `mytable` in the `mydataset`:

```googlesql
DROP TABLE mydataset.mytable
```

If the table name does not exist in the dataset, the following error is
returned:

`Error: Not found: Table myproject:mydataset.mytable`

##### Deleting a table only if the table exists

The following example deletes a table named `mytable` in `mydataset` only if
the table exists. If the table name does not exist in the dataset, no error is
returned, and no action is taken.

```googlesql
DROP TABLE IF EXISTS mydataset.mytable
```

### `DROP SNAPSHOT TABLE` statement

Deletes a [table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro).

#### Syntax

```googlesql
DROP SNAPSHOT TABLE [IF EXISTS] table_snapshot_name
```

#### Arguments

- `IF EXISTS`: If no table snapshot exists with that name, then the statement has no
  effect.

- `table_snapshot_name`: The name of the table snapshot to delete. See
  [Table path syntax](#table-path-syntax).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.deleteSnapshot` | The table snapshot to delete. |

#### Examples

##### Delete a table snapshot: fail if it doesn't exist

The following example deletes the table snapshot named `mytablesnapshot` in the
`mydataset` dataset:

```googlesql
DROP SNAPSHOT TABLE mydataset.mytablesnapshot
```

If the table snapshot does not exist in the dataset, then the following error is
returned:

`Error: Not found: Table snapshot myproject:mydataset.mytablesnapshot`

##### Delete a table snapshot: ignore if it doesn't exist

The following example deletes the table snapshot named `mytablesnapshot` in the
`mydataset` dataset.

```googlesql
DROP SNAPSHOT TABLE IF EXISTS mydataset.mytablesnapshot
```

If the table snapshot doesn't exist in the dataset, then no action is taken, and
no error is returned.

For information about creating table snapshots, see
[CREATE SNAPSHOT TABLE](data-definition-language-1.md#create-snapshot-table-statement).

For information about restoring table snapshots, see
[CREATE TABLE CLONE](data-definition-language-1.md#create-table-clone-statement).

### `DROP EXTERNAL TABLE` statement

Deletes an external table.

#### Syntax

```googlesql
DROP EXTERNAL TABLE [IF EXISTS] table_name
```

#### Arguments

- `IF EXISTS`: If no external table exists with that name, then the statement has no
  effect.

- `table_name`: The name of the external table to delete. See
  [Table path syntax](#table-path-syntax).

#### Details

If `table_name` exists but is not an external table, the statement returns the following
error:

`Cannot drop table_name which has type TYPE. An
external table was expected.`

The `DROP EXTERNAL` statement only removes the external table definition from
BigQuery. The data stored in the external location is not
affected.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.delete` | The external table to delete. |
| `bigquery.tables.get` | The external table to delete. |

#### Examples

The following example drops the external table named `external_table` from the
dataset `mydataset`. It returns an error if the external table does not exist.

```googlesql
DROP EXTERNAL TABLE mydataset.external_table
```

The following example drops the external table named `external_table` from the
dataset `mydataset`. If the external table does not exist, no error is returned.

```googlesql
DROP EXTERNAL TABLE IF EXISTS mydataset.external_table
```

### `DROP VIEW` statement

Deletes a view.

#### Syntax

```googlesql
DROP VIEW [IF EXISTS] view_name
```

#### Arguments

- `IF EXISTS`: If no view exists with that name, the statement has no effect.

- `view_name`: The name of the view to delete. See
  [Table path syntax](#table-path-syntax).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.delete` | The view to delete. |
| `bigquery.tables.get` | The view to delete. |

#### Examples

##### Deleting a view

The following example deletes a view named `myview` in `mydataset`:

```googlesql
DROP VIEW mydataset.myview
```

If the view name does not exist in the dataset, the following error is returned:

`Error: Not found: Table myproject:mydataset.myview`

##### Deleting a view only if the view exists

The following example deletes a view named `myview` in `mydataset` only if
the view exists. If the view name does not exist in the dataset, no error is
returned, and no action is taken.

```googlesql
DROP VIEW IF EXISTS mydataset.myview
```

### `DROP MATERIALIZED VIEW` statement

Deletes a materialized view.

#### Syntax

```googlesql
DROP MATERIALIZED VIEW [IF EXISTS] mv_name
```

#### Arguments

- `IF EXISTS`: If no materialized view exists with that name, the statement has
  no effect.

- `mv_name`: The name of the materialized view to delete. See
  [Table path syntax](#table-path-syntax).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.delete` | The materialized view to delete. |
| `bigquery.tables.get` | The materialized view to delete. |

#### Examples

##### Deleting a materialized view

The following example deletes a materialized view named `my_mv` in `mydataset`:

```googlesql
DROP MATERIALIZED VIEW mydataset.my_mv
```

If the materialized view name does not exist in the dataset, the following error
is returned:

`Error: Not found: Table myproject:mydataset.my_mv`

If you are deleting a materialized view in another project, you must specify the
project, dataset, and materialized view in the following format:
`` `project_id.dataset.materialized_view` ``
(including the backticks if `project_id` contains special characters); for example,
`` `myproject.mydataset.my_mv` ``.

##### Deleting a materialized view only if it exists

The following example deletes a materialized view named `my_mv` in `mydataset`
only if the materialized view exists. If the materialized view name does not
exist in the dataset, no error is returned, and no action is taken.

```googlesql
DROP MATERIALIZED VIEW IF EXISTS mydataset.my_mv
```

If you are deleting a materialized view in another project, you must specify the
project, dataset, and materialized view in the following format:
`` `project_id.dataset.materialized_view` ``,
(including the backticks if `project_id` contains special characters); for example,
`` `myproject.mydataset.my_mv` ``.

### `DROP FUNCTION` statement

Deletes a persistent user-defined function (UDF) or
user-defined aggregate function (UDAF).

#### Syntax

```googlesql
DROP FUNCTION [IF EXISTS] [[project_name.]dataset_name.]function_name
```

#### Arguments

- `IF EXISTS`: If no function exists with that name, the statement has no
  effect.

- `project_name`: The name of the project containing the function to delete.
  Defaults to the project that runs this DDL query. If the project name
  contains special characters such as colons, it should be quoted in backticks
  `` ` `` (example: `` `google.com:my_project` ``).

- `dataset_name`: The name of the dataset containing the function to delete.
  Defaults to the `defaultDataset` in the request.

- `function_name`: The name of the function you're deleting.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.delete` | The function to delete. |

#### Examples

The following example statement deletes the function `parseJsonAsStruct`
contained in the dataset `mydataset`.

```googlesql
DROP FUNCTION mydataset.parseJsonAsStruct;
```

The following example statement deletes the function `parseJsonAsStruct` from
the dataset `sample_dataset` in the project `other_project`.

```googlesql
DROP FUNCTION `other_project`.sample_dataset.parseJsonAsStruct;
```

### `DROP TABLE FUNCTION`

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Deletes a [table function](https://docs.cloud.google.com/bigquery/docs/table-functions).

#### Syntax

```googlesql
DROP TABLE FUNCTION [IF EXISTS] [[project_name.]dataset_name.]function_name
```

#### Arguments

- `IF EXISTS`: If no table function exists with this name, the statement
  has no effect.

- `project_name`: The name of the project containing the table function
  to delete. Defaults to the project that runs this DDL query.

- `dataset_name`: The name of the dataset containing the table function to
  delete.

- `function_name`: The name of the table function to delete.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.delete` | The table function to delete. |

#### Example

The following example deletes a table function named `my_table_function`:

```googlesql
DROP TABLE FUNCTION mydataset.my_table_function;
```

### `DROP PROCEDURE` statement

Deletes a stored procedure.

#### Syntax

```googlesql
DROP PROCEDURE [IF EXISTS] [[project_name.]dataset_name.]procedure_name
```

#### Arguments

- `IF EXISTS`: If no procedure exists with that name, the statement has no
  effect.

- `project_name`: The name of the project containing the procedure to delete.
  Defaults to the project that runs this DDL query. If the project name
  contains special characters such as colons, it should be quoted in backticks
  `` ` `` (example: `` `google.com:my_project` ``).

- `dataset_name`: The name of the dataset containing the procedure to delete.
  Defaults to the `defaultDataset` in the request.

- `procedure_name`: The name of the procedure you're deleting.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.delete` | The procedure to delete. |

#### Examples

The following example statement deletes the procedure `myprocedure`
contained in the dataset `mydataset`.

```googlesql
DROP PROCEDURE mydataset.myProcedure;
```

The following example statement deletes the procedure `myProcedure` from
the dataset `sample_dataset` in the project `other_project`.

Adapted (not in the official docs): changed the project to `other_project` and the procedure name to `myProcedure`, as named in the text above the example.

```googlesql
DROP PROCEDURE `other_project`.sample_dataset.myProcedure;
```

### `DROP ROW ACCESS POLICY` statement

Deletes a row-level access policy.

> [!IMPORTANT]
> **Important:** You cannot delete the last row-level access policy from a table using `DROP ROW ACCESS POLICY`. Attempting to do so results in an error. To delete the last row-level access policy on table, you must use `DROP ALL ROW
> ACCESS POLICIES` instead.

#### Syntax

```googlesql
DROP ROW ACCESS POLICY [ IF EXISTS ]
row_access_policy_name ON table_name;
```

```googlesql
DROP ALL ROW ACCESS POLICIES ON table_name;
```

#### Arguments

- `IF EXISTS`: If no row-level access policy exists with that name, the
  statement has no effect.

- `row_access_policy_name`: The name of the row-level access policy that you are
  deleting. Each row-level access policy on a table has a unique name.

- `table_name`: The name of the table with the row-level access policy or
  policies that you want to delete.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.rowAccessPolicies.delete` | The row-level access policy to delete. |
| `bigquery.rowAccessPolicies.setIamPolicy` | The row-level access policy to delete. |
| `bigquery.rowAccessPolicies.list` | The table to delete all row-level access policies on. Only required for `DROP ALL` statements. |

#### Examples

Delete a row-level access policy from a table:

```googlesql
DROP ROW ACCESS POLICY my_row_filter ON project.dataset.my_table;
```

Delete all the row-level access policies from a table:

```googlesql
DROP ALL ROW ACCESS POLICIES ON project.dataset.my_table;
```

### `DROP CAPACITY` statement

Deletes a capacity commitment.

#### Syntax

```googlesql
DROP CAPACITY [IF EXISTS]
project_id.location.capacity-commitment-id
```

#### Arguments

- `IF EXISTS`: If no capacity commitment exists with that ID, the statement has no effect.
- `project_id`: The project ID of the administration project where the capacity commitment was created.
- `location`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the commitment.
- `capacity-commitment-id`: The capacity commitment ID.

To find the capacity commitment ID, query the
[`INFORMATION_SCHEMA.CAPACITY_COMMITMENTS_BY_PROJECT`](../information-schema/capacity-commitments.md)
table.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.capacityCommitments.delete` | The administration project that maintains ownership of the commitments. |

#### Example

The following example deletes the capacity commitment:

```googlesql
DROP CAPACITY `admin_project.region-us.1234`
```

### `DROP RESERVATION` statement

Deletes a reservation.

#### Syntax

```googlesql
DROP RESERVATION [IF EXISTS]
project_id.location.reservation_id
```

#### Arguments

- `IF EXISTS`: If no reservation exists with that ID, the statement has no effect.
- `project_id`: The project ID of the administration project where the reservation was created.
- `location`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the reservation.
- `reservation_id`: The reservation ID.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.reservations.delete` | The administration project that maintains ownership of the commitments. |

#### Example

The following example deletes the reservation `prod`:

```googlesql
DROP RESERVATION `admin_project.region-us.prod`
```

### `DROP ASSIGNMENT` statement

Deletes a reservation assignment.

#### Syntax

```googlesql
DROP ASSIGNMENT [IF EXISTS]
project_id.location.reservation_id.assignment_id
```

#### Arguments

- `IF EXISTS`: If no assignment exists with that ID, the statement has no effect.
- `project_id`: The project ID of the administration project where the reservation was created.
- `location`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the reservation.
- `reservation_id`: The reservation ID.
- `assignment_id`: The assignment ID.

To find the assignment ID, query the
[`INFORMATION_SCHEMA.ASSIGNMENTS` view](../information-schema/assignments.md).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.reservationAssignments.delete` | The administration project and the assignee. |

#### Example

The following example deletes an assignment from the reservation named `prod`:

```googlesql
DROP ASSIGNMENT `admin_project.region-us.prod.1234`
```

### `DROP SEARCH INDEX` statement

Deletes a search index on a table.

#### Syntax

```googlesql
DROP SEARCH INDEX [ IF EXISTS ] index_name ON table_name
```

#### Arguments

- `IF EXISTS`: If no search index exists with that name on the table, the statement has no effect.
- `index_name`: The name of the search index to be deleted.
- `table_name`: The name of the table with the index.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.deleteIndex` | The table with the search index to delete. |

#### Example

The following example deletes a search index `my_index` from `my_table`:

```googlesql
DROP SEARCH INDEX my_index ON dataset.my_table;
```

### `DROP VECTOR INDEX` statement

Deletes a vector index on a table.

#### Syntax

```googlesql
DROP VECTOR INDEX [ IF EXISTS ] index_name ON table_name
```

#### Arguments

- `IF EXISTS`: If no vector index exists with that name on the table, the statement has no effect.
- `index_name`: The name of the vector index to be deleted.
- `table_name`: The name of the table with the vector index.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.deleteIndex` | The table with the vector index to delete. |

#### Example

The following example deletes a vector index `my_index` from `my_table`:

```googlesql
DROP VECTOR INDEX my_index ON dataset.my_table;
```

### `DROP DATA_POLICY` statement

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-security@google.com](mailto:bigquery-security@google.com).

Deletes a data policy in a project.

#### Syntax

Adapted (not in the official docs): replaced the literal example names in the syntax with the placeholders defined in the arguments.

```googlesql
DROP DATA_POLICY [ IF EXISTS ] `project_id.region-location_id.data_policy_id`;
```

#### Arguments

- `IF EXISTS`: If no data policy exists with that name, the statement has
  no effect.

- `project_id`: The project ID of the project where the data policy will reside
  in.

- `location_id`: The location of the data policy.

- `data_policy_id`: The name of the data policy to be deleted.

#### Required permissions

The user or service account that deletes a data policy must have the
`bigquery.dataPolicies.delete` permission. This permission is included in the
BigQuery Data Policy Admin, BigQuery Admin and BigQuery Data Owner roles.

### `DROP CONNECTION` statement

Deletes an existing connection.

#### Syntax

```googlesql
DROP CONNECTION [IF EXISTS] `[[project_id.]location.]connection_id`;
```

#### Arguments

- `project_id` (Optional): The ID of the project that the connection is in. If omitted, the project where you run this DDL statement is used.
- `location` (Optional): The [location](https://docs.cloud.google.com/bigquery/docs/locations) of the connection. If omitted, the location where you run this DDL statement is used.
- `connection_id`: The name of the connection to delete.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.connections.delete` | The project that the connection is in. |

#### Example

The following example deletes the `my_cloud_resource_connection` connection:

```googlesql
DROP CONNECTION IF EXISTS `us.my_cloud_resource_connection`;
```

### Table path syntax

Use the following syntax when specifying the path of a
[table resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type),
including standard tables, views, materialized views, external tables, and
table snapshots.

```googlesql
table_path :=
  [[project_name.]dataset_name.]table_name
```

- `project_name`: The name of the project that contains the table resource.
  Defaults to the project that runs the DDL query. If the project name contains
  special characters such as colons, quote the name in backticks
  `` ` `` (example: `` `google.com:my_project` ``).

- `dataset_name`: The name of the dataset that contains the table resource.
  Defaults to the `defaultDataset` in the request.

- `table_name`: The name of the table resource.

When you create a table in BigQuery, the table name must
be unique per dataset. The table name can:

- Contain characters with a total of up to 1,024 UTF-8 bytes.
- Contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category).

The following are all examples of valid table names:
`table 01`, `ग्राहक`, `00_お客様`, `étudiant-01`.

Caveats:

- Table names are case-sensitive by default. `mytable` and `MyTable` can coexist in the same dataset, unless they are part of a [dataset with
  case-sensitivity turned off](data-definition-language-1.md#creating-a-case-insensitive-dataset).
- Some table names and table name prefixes are reserved. If you receive an error saying that your table name or prefix is reserved, then select a different name and try again.
- If you include multiple dot operators (`.`) in a sequence, the duplicate
  operators are implicitly stripped.

  For example, this:
  `project_name....dataset_name..table_name`

  Becomes this:
  `project_name.dataset_name.table_name`

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; and 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 4 files at section boundaries; this is part 4.
- Corrected from the official docs: the `DROP PROCEDURE` example uses `other-project` and `myprocedure`, but the text above names the project `other_project` and the procedure `myProcedure` (the `DROP FUNCTION` example also uses `other_project`); changed.
- Corrected from the official docs: the `DROP DATA_POLICY` syntax uses literal names (`myproject.region-us.data_policy_name`), but the arguments define `project_id`, `location_id` and `data_policy_id`; changed to the placeholder form used in the `ALTER DATA_POLICY` syntax.
- Corrected from the official docs: in the `DROP MATERIALIZED VIEW` text the comma after the format is inside the code span (the same sentence under `CREATE` and earlier in this section has no comma); moved outside the code span.
- Corrected from the official docs: the `DROP CAPACITY` argument `project_id` says "where the reservation was created", copied from `DROP RESERVATION`; changed to "capacity commitment", which is what the statement deletes.
- Corrected from the official docs: the `DROP DATA_POLICY` permission sentence says the account "creates a data policy" but requires `bigquery.dataPolicies.delete`; changed to "deletes".
- Conflicting official statements: The table name rules here say up to 1,024 UTF-8 bytes, while `CREATE TABLE` in data-definition-language-1.md says up to 1,024 characters. The correct unit is not stated.

## Related

- [Index of this directory](./README.md)
- [Data definition language (DDL) statements in GoogleSQL (part 1 of 4)](./data-definition-language-1.md)
- [Data definition language (DDL) statements in GoogleSQL (part 2 of 4)](./data-definition-language-2.md)
- [Data definition language (DDL) statements in GoogleSQL (part 3 of 4)](./data-definition-language-3.md)
