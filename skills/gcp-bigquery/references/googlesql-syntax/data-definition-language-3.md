---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
---

# Data definition language (DDL) statements in GoogleSQL (part 3 of 4)

## Signature / Usage

### `ALTER SCHEMA SET DEFAULT COLLATE` statement

Sets [collation specifications](collation-concepts.md#collation-specification-details) on
a dataset.

#### Syntax

```googlesql
ALTER SCHEMA [IF EXISTS]
[project_name.]dataset_name
SET DEFAULT COLLATE collate_specification
```

#### Arguments

- `IF EXISTS`: If no dataset exists with that name, the statement has no effect.

- `DEFAULT COLLATE collate_specification`: When a new table is created in the
  dataset, the table inherits a
  default [collation specification](collation-concepts.md#default-collation-specification)
  unless a collation specification is explicitly specified for a
  [column](data-definition-language-1.md#column).

  The updated collation specification only applies to tables created afterwards.
- `project_name`: The name of the project that contains the dataset. Defaults
  to the project that runs this DDL statement.

- `dataset_name`: The name of the dataset.

- [`collate_specification`](collation-concepts.md#collation-specification-details):
  Specifies the collation specifications to set.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.datasets.get` | The dataset to alter. |
| `bigquery.datasets.update` | The dataset to alter. |

#### Example

Assume you have an existing table, `mytable_a`, in a dataset called `mydataset`.
For example:

```googlesql
CREATE SCHEMA mydataset
```

```googlesql
CREATE TABLE mydataset.mytable_a
(
  number INT64,
  word STRING
)
```

```text
+----------------------+
| mydataset.mytable_a  |
|   number INT64       |
|   word STRING        |
+----------------------+
```

At a later time, you decide to add a collation specification to your
dataset. For example:

```googlesql
ALTER SCHEMA mydataset
SET DEFAULT COLLATE 'und:ci'
```

If you create a new table for your dataset, it inherits `COLLATE 'und:ci'` for
all `STRING` columns. For example, collation is added to `characters`
when you create the `mytable_b` table in the `mydataset` dataset:

```googlesql
CREATE TABLE mydataset.mytable_b
(
  amount INT64,
  characters STRING
)
```

```text
+--------------------------------------+
| mydataset.mytable_b                  |
|   amount INT64                       |
|   characters STRING COLLATE 'und:ci' |
+--------------------------------------+
```

However, although you have updated the collation specification for the dataset,
your existing table, `mytable_a`, continues to use the previous
collation specification. For example:

```text
+---------------------+
| mydataset.mytable_a |
|   number INT64      |
|   word STRING       |
+---------------------+
```

### `ALTER SCHEMA SET OPTIONS` statement

Sets options on a dataset.

The statement runs in the location of the dataset if the dataset exists, unless
you specify the location in the query settings. For more information, see
[Specifying your location](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations).

#### Syntax

```googlesql
ALTER SCHEMA [IF EXISTS]
[project_name.]dataset_name
SET OPTIONS(schema_set_options_list)
```

#### Arguments

- `IF EXISTS`: If no dataset exists with that name, the statement has no effect.

- `project_name`: The name of the project that contains the dataset. Defaults
  to the project that runs this DDL statement.

- `dataset_name`: The name of the dataset.

- [`schema_set_options_list`](#schema_set_options_list): The list of options to
  set.

#### `schema_set_options_list`

The option list specifies options for the dataset. Specify the options in the following format: `NAME=VALUE, ...`

<br />

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `default_kms_key_name` | `STRING` | Specifies the default Cloud KMS key for encrypting table data in this dataset. You can override this value when you create a table. |
| `default_partition_expiration_days` | `FLOAT64` | Specifies the default expiration time, in days, for table partitions in this dataset. You can override this value when you create a table. |
| `default_rounding_mode` | `STRING` | Example: `default_rounding_mode = "ROUND_HALF_EVEN"` This specifies the [`defaultRoundingMode`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/datasets#Dataset.FIELDS.default_rounding_mode) that is used for new tables created in this dataset. It does not impact existing tables. The following values are supported: - `"ROUND_HALF_AWAY_FROM_ZERO"`: Halfway cases are rounded away from zero. For example, 2.25 is rounded to 2.3, and -2.25 is rounded to -2.3. - `"ROUND_HALF_EVEN"`: Halfway cases are rounded towards the nearest even digit. For example, 2.25 is rounded to 2.2 and -2.25 is rounded to -2.2. |
| `default_table_expiration_days` | `FLOAT64` | Specifies the default expiration time, in days, for tables in this dataset. You can override this value when you create a table. |
| `description` | `STRING` | The description of the dataset. |
| `failover_reservation` | `STRING` | Associates the dataset to a reservation in the case of a failover scenario. |
| `friendly_name` | `STRING` | A descriptive name for the dataset. |
| `is_case_insensitive` | `BOOL` | `TRUE` if the dataset and its table names are case-insensitive, otherwise `FALSE`. By default, this is `FALSE`, which means the dataset and its table names are case-sensitive. - Datasets: `mydataset` and `MyDataset` can coexist in the same project, unless one of them has case-sensitivity turned off. - Tables: `mytable` and `MyTable` can coexist in the same dataset if case-sensitivity for the dataset is turned on. |
| `is_primary` | `BOOLEAN` | Declares if the dataset is the primary replica. |
| `labels` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of labels for the dataset, expressed as key-value pairs. |
| `max_time_travel_hours` | `SMALLINT` | Specifies the duration in hours of the [time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel#time_travel) for the dataset. The `max_time_travel_hours` value must be an integer expressed in multiples of 24 (48, 72, 96, 120, 144, 168) between 48 (2 days) and 168 (7 days). 168 hours is the default if this option isn't specified. |
| `primary_replica` | `STRING` | The replica name to set as the [primary replica](https://docs.cloud.google.com/bigquery/docs/data-replication). |
| `storage_billing_model` | `STRING` | Alters the [storage billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models) for the dataset. Set the `storage_billing_model` value to `PHYSICAL` to use physical bytes when calculating storage charges, or to `LOGICAL` to use logical bytes. `LOGICAL` is the default. The `storage_billing_model` option is only available for datasets that have been updated after December 1, 2022. For datasets that were last updated before that date, the storage billing model is `LOGICAL`. When you change a dataset's billing model, it takes 24 hours for the change to take effect. Once you change a dataset's storage billing model, you must wait 14 days before you can change the storage billing model again. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags for the dataset, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.datasets.get` | The dataset to alter. |
| `bigquery.datasets.update` | The dataset to alter. |

#### Examples

##### Setting the default table expiration for a dataset

The following example sets the default table expiration.

```googlesql
ALTER SCHEMA mydataset
SET OPTIONS(
  default_table_expiration_days=3.75
  )
```

##### Turning on case insensitivity for a dataset

The following example turns on case insensitivity for the name of a dataset and
the table names within that dataset.

```googlesql
ALTER SCHEMA mydataset
SET OPTIONS(
  is_case_insensitive=TRUE
)
```

### `ALTER SCHEMA ADD REPLICA` statement

Adds a replica to a schema ([preview](https://cloud.google.com/products/#product-launch-stages)).

#### Syntax

```googlesql
ALTER SCHEMA [IF EXISTS]
[project_name.]dataset_name
ADD REPLICA replica_name [OPTIONS(add_replica_options_list)]
```

#### Arguments

- `IF EXISTS`: If no dataset exists with that name, the statement has no effect.
- `dataset_name`: The name of the dataset to alter. See [Table path
  syntax](data-definition-language-4.md#table-path-syntax).
- `replica_name`: The name of the new replica. Conventionally, this is the same as the location you are creating the replica in.
- [`add_replica_options_list`](#add_replica_options_list): The list of options to set.

#### `add_replica_options_list`

The option list specifies options for the dataset. Specify the options in the
following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `location` | `STRING` | The location in which to create the replica. |
| `replica_kms_key` | `STRING` | The Cloud Key Management Service key set in the destination region. `replica_kms_key` is used as a substitute encryption key in the destination region for any keys used in the source region. Any table in the source region that's encrypted with a Cloud KMS key is encrypted with the `replica_kms_key`. This value must be a Cloud KMS key created in the replica dataset's region, not the source dataset's region. For more information about setting up a Cloud KMS key, see [Grant encryption and decryption permission](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#grant_permission). |

#### Required permissions

To get the permissions that
you need to manage replicas,

ask your administrator to grant you the
[BigQuery Data Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataEditor) (`roles/bigquery.dataEditor`) IAM role on your schema.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

#### Examples

The following example adds a secondary replica that is named `EU` in the `EU`
multi-region to a schema that is named `cross_region_dataset`:

Adapted (not in the official docs): changed the `location` option value from a backticked identifier to a string literal.

```googlesql
ALTER SCHEMA cross_region_dataset
ADD REPLICA `EU` OPTIONS(location='eu');
```

### `ALTER SCHEMA DROP REPLICA` statement

Drops a replica from a schema ([preview](https://cloud.google.com/products/#product-launch-stages)).

#### Syntax

```googlesql
ALTER SCHEMA [IF EXISTS] dataset_name
DROP REPLICA replica_name
```

- `IF EXISTS`: If no dataset exists with that name, the statement has no effect.
- `dataset_name`: The name of the dataset to alter. See [Table path syntax](data-definition-language-4.md#table-path-syntax).
- `replica_name`: The name of the replica to drop.

#### Required permissions

To get the permissions that
you need to manage replicas,

ask your administrator to grant you the
[BigQuery Data Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataEditor) (`roles/bigquery.dataEditor`) IAM role on your schema.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

#### Examples

The following example removes a replica that is located in the `us-east4` region from the `cross_region_dataset` dataset:

Adapted (not in the official docs): removed the syntax brackets around `IF EXISTS`.

```googlesql
ALTER SCHEMA IF EXISTS cross_region_dataset
DROP REPLICA `us-east4`
```

### `ALTER TABLE SET OPTIONS` statement

Sets the options on a table.

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name
SET OPTIONS(table_set_options_list)
```

#### Arguments

- `IF EXISTS`: If no table exists with that name, the statement has no effect.

- `table_name`: The name of the table to alter. See [Table path syntax](data-definition-language-4.md#table-path-syntax).

- [`table_set_options_list`](#table_set_options_list): The list of options to
  set.

#### Details

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

#### `table_set_options_list`

The option list lets you set table options such as a
[label](https://docs.cloud.google.com/bigquery/docs/labels) and an expiration time. You can include multiple
options using a comma-separated list.

Specify a table option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `expiration_timestamp` | `TIMESTAMP` | Example: `expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC"` This property is equivalent to the [expirationTime](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.expiration_time) table resource property. |
| `partition_expiration_days` | `FLOAT64` | Example: `partition_expiration_days=7` Sets the partition expiration in days. For more information, see [Set the partition expiration](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#partition-expiration). By default, partitions don't expire. This property is equivalent to the [timePartitioning.expirationMs](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TimePartitioning.FIELDS.expiration_ms) table resource property but uses days instead of milliseconds. One day is equivalent to 86400000 milliseconds, or 24 hours. This property can only be set if the table is partitioned. |
| `require_partition_filter` | `BOOL` | Example: `require_partition_filter=true` Specifies whether queries on this table must include a predicate filter that filters on the partitioning column. For more information, see [Set partition filter requirements](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#require-filter). The default value is `false`. This property is equivalent to the [timePartitioning.requirePartitionFilter](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TimePartitioning.FIELDS.require_partition_filter) table resource property. This property can only be set if the table is partitioned. |
| `kms_key_name` | `STRING` | Example: `kms_key_name="projects/project_id/locations/location/keyRings/keyring/cryptoKeys/key"` This property is equivalent to the [encryptionConfiguration.kmsKeyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/EncryptionConfiguration#FIELDS.kms_key_name) table resource property. See more details about [Protecting data with Cloud KMS keys](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption). |
| `friendly_name` | `STRING` | Example: `friendly_name="my_table"` This property is equivalent to the [friendlyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.friendly_name) table resource property. |
| `description` | `STRING` | Example: `description="a table that expires in 2025"` This property is equivalent to the [description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.description) table resource property. |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | Example: `labels=[("org_unit", "development")]` This property is equivalent to the [labels](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.labels) table resource property. |
| `default_rounding_mode` | `STRING` | Example: `default_rounding_mode = "ROUND_HALF_EVEN"` This specifies the default [rounding mode](https://docs.cloud.google.com/bigquery/docs/schemas#rounding_mode) that's used for values written to any new `NUMERIC` or `BIGNUMERIC` type columns or `STRUCT` fields in the table. It does not impact existing fields in the table. The following values are supported: - `"ROUND_HALF_AWAY_FROM_ZERO"`: Halfway cases are rounded away from zero. For example, 2.5 is rounded to 3.0, and -2.5 is rounded to -3. - `"ROUND_HALF_EVEN"`: Halfway cases are rounded towards the nearest even digit. For example, 2.5 is rounded to 2.0 and -2.5 is rounded to -2.0. This property is equivalent to the [`defaultRoundingMode`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.default_rounding_mode) table resource property. |
| `enable_change_history` | `BOOL` | Example: `enable_change_history=TRUE` Set this property to `TRUE` in order to capture [change history](https://docs.cloud.google.com/bigquery/docs/change-history) on the table, which you can then view by using the [`CHANGES` function](../googlesql-functions/time-series-functions.md#changes). Enabling this table option has an impact on costs; for more information see [Pricing and costs](https://docs.cloud.google.com/bigquery/docs/change-history#pricing_and_costs). The default is `FALSE`. |
| `max_staleness` | `INTERVAL` | Example: `max_staleness=INTERVAL "4:0:0" HOUR TO SECOND` The maximum interval behind the current time where it's acceptable to read stale data. For example, with [change data capture](https://docs.cloud.google.com/bigquery/docs/change-data-capture), when this option is set, the table copy operation is denied if data is more stale than the `max_staleness` value. `max_staleness` is disabled by default. |
| `enable_fine_grained_mutations` | `BOOL` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `enable_fine_grained_mutations=TRUE` Set this property to `TRUE` to enable [fine-grained DML optimization](https://docs.cloud.google.com/bigquery/docs/data-manipulation-language#fine-grained_dml) on the table. The default is `FALSE`. |
| `storage_uri` | `STRING` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `storage_uri=gs://BUCKET_DIRECTORY/TABLE_DIRECTORY/` A fully qualified location prefix for the external folder where data is stored. Supports `gs:` buckets. Required for [managed tables](https://docs.cloud.google.com/bigquery/docs/managed-tables). |
| `file_format` | `STRING` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `file_format=PARQUET` The open-source file format in which the table data is stored. Only `PARQUET` is supported. Required for [managed tables](https://docs.cloud.google.com/bigquery/docs/managed-tables). The default is `PARQUET`. |
| `table_format` | `STRING` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `table_format=ICEBERG` The open table format in which metadata-only snapshots are stored. Only `ICEBERG` is supported. Required for [managed tables](https://docs.cloud.google.com/bigquery/docs/managed-tables). The default is `ICEBERG`. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags for the table, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

`VALUE` is a constant expression containing only literals, query parameters,
and scalar functions.

The constant expression **cannot** contain:

- A reference to a table
- Subqueries or SQL statements such as `SELECT`, `CREATE`, or `UPDATE`
- User-defined functions, aggregate functions, or analytic functions
- The following scalar functions:
  - `ARRAY_TO_STRING`
  - `REPLACE`
  - `REGEXP_REPLACE`
  - `RAND`
  - `FORMAT`
  - `LPAD`
  - `RPAD`
  - `REPEAT`
  - `SESSION_USER`
  - `GENERATE_ARRAY`
  - `GENERATE_DATE_ARRAY`

Setting the value replaces the existing value of that option for the table, if
there was one. Setting the value to `NULL` clears the table's value for that
option.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Setting the expiration timestamp and description on a table

The following example sets the expiration timestamp on a table to seven days
from the execution time of the `ALTER TABLE` statement, and sets the description
as well:

```googlesql
ALTER TABLE mydataset.mytable
SET OPTIONS (
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY),
  description="Table that expires seven days from now"
)
```

##### Setting the require partition filter attribute on a partitioned table

The following example sets the
[`timePartitioning.requirePartitionFilter`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TimePartitioning)
attribute on a [partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables):

```googlesql
ALTER TABLE mydataset.mypartitionedtable
SET OPTIONS (require_partition_filter=true)
```

Queries that reference this table must use a filter on the partitioning column,
or else BigQuery returns an error. Setting this option to `true`
can help prevent mistakes in querying more data than intended.

##### Clearing the expiration timestamp on a table

The following example clears the expiration timestamp on a table so that it will
not expire:

```googlesql
ALTER TABLE mydataset.mytable
SET OPTIONS (expiration_timestamp=NULL)
```

### `ALTER TABLE ADD COLUMN` statement

Adds one or more new columns to an existing table schema.

#### Syntax

```googlesql
ALTER TABLE table_name
ADD COLUMN [IF NOT EXISTS] column [, ...]
```

#### Arguments

- `table_name`: The name of the table. See [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `IF NOT EXISTS`: If the column name already exists, the statement has no effect.

- `column`: The column to add. This includes the name of the column and schema
  to add. The column name and schema use the same syntax used in the
  [`CREATE TABLE`](data-definition-language-1.md#create-table-statement) statement.

#### Details

You cannot use this statement to create:

- Partitioned columns.
- Clustered columns.
- Nested columns inside existing `RECORD` fields.

You cannot add a `REQUIRED` column to an existing table schema. However, you
can create a nested `REQUIRED` column as part of a new `RECORD` field.

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

Without the `IF NOT EXISTS` clause, if the table already contains a column with
that name, the statement returns an error. If the `IF NOT EXISTS` clause is
included and the column name already exists, no error is returned, and no
action is taken.

The value of the new column for existing rows is set to one of the following:

- `NULL` if the new column was added with `NULLABLE` mode. This is the default mode.
- An empty `ARRAY` if the new column was added with `REPEATED` mode.

For more information about schema modifications in BigQuery, see
[Modifying table schemas](https://docs.cloud.google.com/bigquery/docs/managing-table-schemas).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

##### Adding columns

The following example adds the following columns to an existing table named
`mytable`:

- Column `A` of type `STRING`.
- Column `B` of type `GEOGRAPHY`.
- Column `C` of type `NUMERIC` with `REPEATED` mode.
- Column `D` of type `DATE` with a description.

```googlesql
ALTER TABLE mydataset.mytable
  ADD COLUMN A STRING,
  ADD COLUMN IF NOT EXISTS B GEOGRAPHY,
  ADD COLUMN C ARRAY <NUMERIC>,
  ADD COLUMN D DATE OPTIONS(description="my description")
```

If any of the columns named `A`, `C`, or `D` already exist, the statement fails.
If column `B` already exists, the statement succeeds because of the `IF NOT
EXISTS` clause.

##### Adding a `RECORD` column

The following example adds a column named `A` of type `STRUCT` that contains the
following nested columns:

- Column `B` of type `GEOGRAPHY`.
- Column `C` of type `INT64` with `REPEATED` mode.
- Column `D` of type `INT64` with `REQUIRED` mode.
- Column `E` of type `TIMESTAMP` with a description.

```googlesql
ALTER TABLE mydataset.mytable
   ADD COLUMN A STRUCT<
       B GEOGRAPHY,
       C ARRAY <INT64>,
       D INT64 NOT NULL,
       E TIMESTAMP OPTIONS(description="creation time")
       >
```

The query fails if the table already has a column named `A`, even if that
column does not contain any of the nested columns that are specified.

The new `STRUCT` named `A` is nullable, but the nested column `D` within `A` is
required for any `STRUCT` values of `A`.

##### Adding collation support to a column

When you create a new column for your table, you can specifically assign a
new collation specification to that column.

```googlesql
ALTER TABLE mydataset.mytable
ADD COLUMN word STRING COLLATE 'und:ci'
```

##### Adding an automatically generated embedding column

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

The following example adds an [automatically generated
embedding](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation) column `embedding`
that generates embeddings from `content` column to the existing table
`embedded_table` in `mydataset`:

```googlesql
ALTER TABLE mydataset.embedded_table
  ADD COLUMN embedding
    STRUCT<result ARRAY<FLOAT64>, status STRING>
    GENERATED ALWAYS AS (
      AI.EMBED(
        content,
        connection_id => "US.embed_connection",
        endpoint => "text-embedding-005")
    )
    STORED OPTIONS (asynchronous = TRUE)
;
```

### `ALTER TABLE ADD FOREIGN KEY` statement

Adds a [foreign key constraint](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys) to an existing table.
You can add multiple foreign key constraints by using additional
`ADD FOREIGN KEY` statements.

#### Syntax

```googlesql
ALTER TABLE [[project_name.]dataset_name.]fk_table_name
ADD [CONSTRAINT [IF NOT EXISTS] constraint_name] FOREIGN KEY (fk_column_name[, ...])
REFERENCES pk_table_name(pk_column_name[,...]) NOT ENFORCED
[ADD...];
```

#### Arguments

- `project_name`: The name of the project containing the table with a [primary key](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys). Defaults to the project that runs this DDL statement if undefined.
- `dataset_name`: The name of the dataset that contains the table with a primary key. Defaults to the project that runs this DDL statement if undefined.
- `fk_table_name`: The name of the existing table to add a foreign key to.
- `IF NOT EXISTS`: If a constraint of the same name already exists in the defined table, the statement has no effect.
- `constraint_name`: The name of the constraint to add.
- `fk_column_name`: In the foreign key table, the name of the foreign key column. Only top-level columns can be used as foreign key columns.
- `pk_table_name`: The name of the table that contains the primary key.
- `pk_column_name`: In the primary key table, the name of the primary key column. Only top-level columns can be used as primary key columns.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example adds the `my_fk_name` foreign key constraint to the
`fk_table` table. This example depends on an existing table, `pk_table`.

1. Add a primary key to the `pk_table` table:

   ```googlesql
   ALTER TABLE pk_table
   ADD PRIMARY KEY (x,y) NOT ENFORCED;
   ```

   <br />

2. Create a table named `fk_table` for the foreign key.

   ```googlesql
   CREATE TABLE fk_table(x int64, y int64, i int64, j int64, u int64, v int64);
   ```

   <br />

3. Add the `my_fk_name` foreign key constraint to the `fk_table`.

   ```googlesql
   ALTER TABLE fk_table
   ADD CONSTRAINT my_fk_name FOREIGN KEY (u, v)
   REFERENCES pk_table(x, y) NOT ENFORCED
   ```

   <br />

The following example adds the `fk` and `fk2` foreign key constraints to the
`fk_table` table in a single statement. This example depends on an existing
table, `pk_table`.

1. Add a primary key to the `pk_table` table:

   ```googlesql
   ALTER TABLE pk_table
   ADD PRIMARY KEY (x,y) NOT ENFORCED;
   ```

   <br />

2. Create a table named `fk_table` for multiple foreign key constraints.

   ```googlesql
   CREATE TABLE fk_table(x int64, y int64, i int64, j int64, u int64, v int64);
   ```

   <br />

3. Add the `fk` and `fk2` constraints to `fk_table` in one statement.

   ```googlesql
   ALTER TABLE fk_table
   ADD PRIMARY KEY (x,y) NOT ENFORCED,
   ADD CONSTRAINT fk FOREIGN KEY (u, v) REFERENCES pk_table(x, y) NOT ENFORCED,
   ADD CONSTRAINT fk2 FOREIGN KEY (i, j) REFERENCES pk_table(x, y) NOT ENFORCED;
   ```

   <br />

### `ALTER TABLE ADD PRIMARY KEY` statement

Adds a [primary key](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys) to an existing table.

#### Syntax

```googlesql
ALTER TABLE [[project_name.]dataset_name.]table_name
ADD PRIMARY KEY(column_list) NOT ENFORCED;
```

#### Arguments

- `project_name`: The name of the project containing the table with a primary key. Defaults to the project that runs this DDL statement if undefined.
- `dataset_name`: The name of the dataset that contains the table with a primary key.
- `table_name`: The name of the existing table with a primary key.
- `column_list`: The list of columns to be added as primary keys.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example adds the primary key constraint of `x` and `y`
to the `pk_table` table.

```googlesql
ALTER TABLE pk_table ADD PRIMARY KEY (x,y) NOT ENFORCED;
```

<br />

### `ALTER TABLE RENAME TO` statement

Renames a clone, snapshot, or table.

The `ALTER TABLE RENAME TO` statement recreates the table in the destination
dataset with the creation timestamp of the original table. If you have
configured [dataset-level table
expiration](https://docs.cloud.google.com/bigquery/docs/updating-datasets#table-expiration), the renamed
table might be immediately deleted if its original creation timestamp falls
outside of the expiration window.

> [!CAUTION]
> **Caution:** Renaming a table deletes all [aspects](https://docs.cloud.google.com/knowledge-catalog/docs/about-aspects#aspects) that might be attached to it or its columns in [Knowledge Catalog](https://docs.cloud.google.com/knowledge-catalog/docs/metadata-overview).

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name
RENAME TO new_table_name
```

#### Arguments

- `IF EXISTS`: If no table exists with that name, the statement has no effect.

- `table_name`: The name of the table to rename. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `new_table_name`: The new name of the table. The value of `new_table_name` must only
  include the name of the table, not the full [table path syntax](data-definition-language-4.md#table-path-syntax).
  The new name cannot be an existing table name.

#### Details

- If you want to rename a table that has data streaming into it, you must stop the streaming, commit any pending streams, and wait for BigQuery to indicate that streaming is not in use.
- While a table can usually be renamed 5 hours after the last streaming operation, it might take longer. In some cases, the wait time can be up to 8 days.
- Existing table ACLs and row access policies are preserved, but table ACL and row access policy updates made during the table rename are not preserved.
- You can't concurrently rename a table and run a DML statement on that table.
- Renaming a table removes all [Knowledge Catalog aspects](https://docs.cloud.google.com/knowledge-catalog/docs/about-aspects#aspects) on the table.
- Any search index or vector index created on the table is dropped when the table is renamed.
- You can't rename external tables.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

##### Renaming a table

The following example renames the table `mydataset.mytable` to
`mydataset.mynewtable`:

```googlesql
ALTER TABLE mydataset.mytable RENAME TO mynewtable
```

### `ALTER TABLE RENAME COLUMN` statement

> [!CAUTION]
> **Caution:** Renaming a column deletes all [Knowledge Catalog aspects](https://docs.cloud.google.com/knowledge-catalog/docs/about-aspects#aspects) that are attached to it. Primary key columns can't be renamed.

Renames one or more columns in an existing table schema.

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name
RENAME COLUMN [IF EXISTS] column_to_column[, ...]

column_to_column :=
    column_name TO new_column_name
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If the specified table does not exist, the
  statement has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top-level column you're altering.

- `new_column_name`: The new name of the column. The new name cannot be an
  existing column name.

#### Details

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

If the table to be modified has active row-level access policies, the statement
returns an error.

Without the `IF EXISTS` clause, if the table does not contain a column with that
name, then the statement returns an error. If the `IF EXISTS` clause is included
and the column name does not exist, then no error is returned, and no action is
taken.

This statement only renames the column from the table. Any objects that refer to
the column, such as views or materialized views, must be updated or recreated
separately.

You cannot use this statement to rename the following:

- Subfields, such as nested columns in a `STRUCT`
- Partitioning columns
- Clustering columns
- Fields that are part of primary key constraints or foreign key constraints
- Columns in a table that has row access policies

After one or more columns in a table are renamed, you cannot do the following:

- Query the table with legacy SQL.
- Query the table as a wildcard table.

Renaming the
columns with their original names removes these restrictions.

Multiple `RENAME COLUMN` statements in one `ALTER TABLE` statement are
supported. The sequence of renames are interpreted and validated in order.
Each `column_name` must refer to a column name that exists after all preceding
renames have been applied. `RENAME COLUMN` cannot be used with other `ALTER
TABLE` actions in one statement.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

##### Renaming columns

The following example renames columns from an existing table named `mytable`:

- Column `A` -\> `columnA`
- Column `B` -\> `columnB`

```googlesql
ALTER TABLE mydataset.mytable
  RENAME COLUMN A TO columnA,
  RENAME COLUMN IF EXISTS B TO columnB
```

If column `A` does not exist, then the statement fails. If column `B` does not
exist, then the statement still succeeds because of the `IF EXISTS` clause.

The following example swaps the names of `columnA` and `columnB`:

```googlesql
ALTER TABLE mydataset.mytable
  RENAME COLUMN columnA TO temp_col,
  RENAME COLUMN columnB TO columnA,
  RENAME COLUMN temp_col TO columnB
```

### `ALTER TABLE DROP COLUMN` statement

Drops one or more columns from an existing table schema.

#### Syntax

```googlesql
ALTER TABLE table_name
DROP COLUMN [IF EXISTS] column_name [, ...]
```

#### Arguments

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax). The table must already exist and have a
  schema.

- `IF EXISTS`: If the specified column does not exist, the statement has no
  effect.

- `column_name`: The name of the column to drop.

#### Details

Dropping a column is a metadata-only operation and does not
immediately free up the storage that is associated with the dropped column. The
storage is freed up the next time the table is written to, typically when you
perform a DML operation on it or when a background optimization job happens.
Since `DROP COLUMN` is not a data cleanup operation, there is no guaranteed
time window within which the data will be deleted.

There are two options for immediately reclaiming storage:

- Overwrite a table with a `SELECT * EXCEPT` query.
- Export the data to Cloud Storage, delete the unwanted columns, and then load the data into a new table with the correct schema.

You can restore a dropped column in a table using
[time travel](https://docs.cloud.google.com/bigquery/docs/access-historical-data#restore-a-table).
You cannot use this statement to drop the following:

- Partitioned columns
- Clustered columns
- Fields that are part of [primary key constraints or foreign key constraints](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys)
- Nested columns inside existing `RECORD` fields
- Columns in a table that has row access policies

After one or more columns in a table are dropped you cannot do the following:

- Query the table with legacy SQL.
- Query the table as a wildcard table.

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

Without the `IF EXISTS` clause, if the table does not contain a column with that
name, then the statement returns an error. If the `IF EXISTS` clause is included and
the column name does not exist, then no error is returned, and no action is taken.

This statement only removes the column from the table. Any objects that refer to
the column, such as views or materialized views, must be updated or recreated
separately.

For more information about schema modifications in
BigQuery, see
[Modifying table schemas](https://docs.cloud.google.com/bigquery/docs/managing-table-schemas).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

##### Dropping columns

The following example drops the following columns from an existing table named
`mytable`:

- Column `A`
- Column `B`

```googlesql
ALTER TABLE mydataset.mytable
  DROP COLUMN A,
  DROP COLUMN IF EXISTS B
```

If the column named `A` does not exist, then the statement fails. If column `B`
does not exist, then the statement still succeeds because of the `IF EXISTS` clause.

After one or more columns in a table are dropped, you cannot do the following:

- Query the table with legacy SQL.
- Accelerate queries on the table with BigQuery BI Engine.
- Query the table as a Wildcard Table.
- Copy the table in the Google Cloud console.
- Copy the table using the [`bq cp`](../bq-cli/bq-cli-reference-2.md#bq-cp) command.

Recreating the table using `CREATE TABLE ... AS SELECT ...` removes these restrictions.

### `ALTER TABLE DROP CONSTRAINT` statement

Drops a constraint from an existing table. You can use this statement to drop
[foreign key constraints](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys) from a table.

#### Syntax

```googlesql
ALTER TABLE [[project_name.]dataset_name.]table_name
DROP CONSTRAINT [IF EXISTS] constraint_name;
```

#### Arguments

- `project_name`: The name of the project containing the table with a primary key. Defaults to the project that runs this DDL statement if undefined.
- `dataset_name`: The name of the dataset that contains the table with a primary key.
- `table_name`: The name of the existing table with a primary key.
- `IF EXISTS`: If no constraint with that name exists in the defined table, the statement has no effect.
- `constraint_name`: The name of the constraint to drop.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example drops the constraint `myConstraint` from the existing
table `myTable`.

```googlesql
ALTER TABLE mytable DROP CONSTRAINT myConstraint;
```

<br />

### `ALTER TABLE DROP PRIMARY KEY` statement

Drops a [primary key](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys) from an
existing table.

#### Syntax

```googlesql
ALTER TABLE [[project_name.]dataset_name.]table_name
DROP PRIMARY KEY [IF EXISTS];
```

#### Arguments

- `project_name`: The name of the project containing the table with a primary key. Defaults to the project that runs this DDL statement if undefined.
- `dataset_name`: The name of the dataset that contains the table with a primary key.
- `table_name`: The name of the existing table with a primary key.
- `IF EXISTS`: If no primary key exists in the defined table, the statement has no effect.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example drops all primary keys from the existing table `myTable`.

```googlesql
ALTER TABLE myTable
DROP PRIMARY KEY;
```

### `ALTER TABLE SET DEFAULT COLLATE` statement

Sets [collation specifications](collation-concepts.md#collation-specification-details) on
a table.

#### Syntax

```googlesql
ALTER TABLE
  table_name
  SET DEFAULT COLLATE collate_specification
```

#### Arguments

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax). The table must already exist and have a
  schema.

- `SET DEFAULT COLLATE collate_specification`: When a new column is created in the
  schema, and if the column does not have an explicit
  [collation specification](collation-concepts.md#default-collation-specification),
  the [column](data-definition-language-1.md#column) inherits this
  collation specification for `STRING` types. The updated
  collation specification only applies to columns added afterwards.

  If you want to add a collation specification on a new column in
  an existing table, you can do this when you
  [add the column](#alter-table-add-column-statement). If you add a
  collation specification directly on a column, the collation specification
  for the column has precedence over a table's default collation specification.
  You cannot update an existing collation specification on a column.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Example

Assume you have an existing table, `mytable`, in a schema called `mydataset`.

```googlesql
CREATE TABLE mydataset.mytable
(
  number INT64,
  word STRING
) DEFAULT COLLATE 'und:ci'
```

When you create `mytable`, all `STRING` columns inherit `COLLATE 'und:ci'`.
The resulting table has this structure:

```text
+--------------------------------+
| mydataset.mytable              |
|   number INT64                 |
|   word STRING COLLATE 'und:ci' |
+--------------------------------+
```

At a later time, you decide to change the collation specification for your
table.

```googlesql
ALTER TABLE mydataset.mytable
SET DEFAULT COLLATE ''
```

Although you have updated the collation specification, your existing column,
`word`, continues to use the previous collation specification.

```text
+--------------------------------+
| mydataset.mytable              |
|   number INT64                 |
|   word STRING COLLATE 'und:ci' |
+--------------------------------+
```

However, if you create a new column for your table, the new column includes the
new collation specification. In the following example a column called `name`
is added. Because the new collation specification is empty, the default
collation specification is used.

```googlesql
ALTER TABLE mydataset.mytable
ADD COLUMN name STRING
```

```text
+--------------------------------+
| mydataset.mytable              |
|   number INT64                 |
|   word STRING COLLATE 'und:ci' |
|   name STRING COLLATE          |
+--------------------------------+
```

### `ALTER COLUMN SET OPTIONS` statement

Sets options, such as the column description, on a column in a table or view
in BigQuery.

#### Syntax

```googlesql
ALTER { TABLE | VIEW } [IF EXISTS] name
ALTER COLUMN [IF EXISTS] column_name
SET OPTIONS({ column_set_options_list | view_column_set_options_list })
```

#### Arguments

- `(ALTER { TABLE | VIEW }) IF EXISTS`: If no table or view exists with that
  name, then the statement has no effect.

- `name`: The name of the table or view to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top-level column you're altering. Modifying
  subfields, such as nested columns in a `STRUCT`, is not supported.

- [`column_set_options_list`](#column_set_options_list): The list of options to
  set on the column of the table. This option must be used with `TABLE`.

- [`view_column_set_options_list`](#view_column_set_options_list): The list of
  options to set on the column of the view. This option must be used with
  `VIEW`.

#### Details

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

#### `column_set_options_list`

Specify a column option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | Example: `description="a unique id"` This property is equivalent to the [schema.fields\[\].description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TableFieldSchema.FIELDS.description) table resource property. |
| `rounding_mode` | `STRING` | Example: `rounding_mode = "ROUND_HALF_EVEN"` This specifies the [rounding mode](https://docs.cloud.google.com/bigquery/docs/schemas#rounding_mode) that's used for values written to a `NUMERIC` or `BIGNUMERIC` type column or `STRUCT` field. The following values are supported: - `"ROUND_HALF_AWAY_FROM_ZERO"`: Halfway cases are rounded away from zero. For example, 2.25 is rounded to 2.3, and -2.25 is rounded to -2.3. - `"ROUND_HALF_EVEN"`: Halfway cases are rounded towards the nearest even digit. For example, 2.25 is rounded to 2.2 and -2.25 is rounded to -2.2. This property is equivalent to the [`roundingMode`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TableFieldSchema.FIELDS.rounding_mode) table resource property. |
| `data_policies` | `ARRAY<STRING>` | Applies a [data policy](https://docs.cloud.google.com/bigquery/docs/column-data-masking#create_data_policies) to a column in a table. Example: `data_policies = ["{'name':'myproject.region-us.data_policy_name1'}", "{'name':'myproject.region-us.data_policy_name2'}"]` The [`ALTER TABLE ALTER COLUMN`](#alter-column-set-options-statement) statement supports the `=` and `+=` operators to add data policies to a specific column. Example: `data_policies +=["data_policy1", "data_policy2"]` |
| `data_governance_tags` | `ARRAY<STRUCT<STRING, STRING>>` | Applies [data governance tags](https://docs.cloud.google.com/bigquery/docs/tags#data-governance-tags) to a column in a table. Example: `data_governance_tags = [("myproject/tag_key", "tag_value")]` |

`VALUE` is a constant expression containing only literals, query parameters,
and scalar functions.

The constant expression **cannot** contain:

- A reference to a table
- Subqueries or SQL statements such as `SELECT`, `CREATE`, or `UPDATE`
- User-defined functions, aggregate functions, or analytic functions
- The following scalar functions:
  - `ARRAY_TO_STRING`
  - `REPLACE`
  - `REGEXP_REPLACE`
  - `RAND`
  - `FORMAT`
  - `LPAD`
  - `RPAD`
  - `REPEAT`
  - `SESSION_USER`
  - `GENERATE_ARRAY`
  - `GENERATE_DATE_ARRAY`

Setting the `VALUE` replaces the existing value of that option for the column, if
there was one. Setting the `VALUE` to `NULL` clears the column's value for that
option.

#### `view_column_set_options_list`

The `view_column_set_options_list` lets you specify optional top-level column
options. Column options for a view have the same syntax and requirements as
for a table, but with a different list of `NAME` and `VALUE` fields:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | Example: `description="a unique id"` |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example sets a new description on a table column called `price`:

```googlesql
ALTER TABLE mydataset.mytable
ALTER COLUMN price
SET OPTIONS (description = 'Price per unit');
```

The following example sets a new description on a view column called `total`:

```googlesql
ALTER VIEW mydataset.myview
ALTER COLUMN total
SET OPTIONS (description = 'Total sales of the product');
```

### `ALTER COLUMN DROP NOT NULL` statement

Removes a `NOT NULL` constraint from a column in a table in BigQuery.

#### Syntax

Adapted (not in the official docs): renamed `column` to `column_name` to match the argument defined below the syntax.

```googlesql
ALTER TABLE [IF EXISTS] table_name
ALTER COLUMN [IF EXISTS] column_name DROP NOT NULL
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If no table exists with that name, the statement
  has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top level column you're altering. Modifying
  subfields is not supported.

#### Details

If a column does not have a `NOT NULL` constraint the query returns an error.

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example removes the `NOT NULL` constraint from a column called `mycolumn`:

```googlesql
ALTER TABLE mydataset.mytable
ALTER COLUMN mycolumn
DROP NOT NULL
```

### `ALTER COLUMN SET DATA TYPE` statement

Changes the data type of a column in a table in BigQuery
to a less restrictive data type. For example, a `NUMERIC` data type can be changed
to a `BIGNUMERIC` type but not the reverse.

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name
ALTER COLUMN [IF EXISTS] column_name SET DATA TYPE column_schema
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If no table exists with that name, the statement
  has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top level column you're altering. Modifying
  subfields is not supported.

- `column_schema`: The schema that you're converting the column to. This schema
  uses the same syntax used in the [`CREATE TABLE`](data-definition-language-1.md#create-table-statement)
  statement.

#### Details

The following data type conversions are supported:

- `INT64` to `NUMERIC`, `BIGNUMERIC`, `FLOAT64`
- `NUMERIC` to `BIGNUMERIC`, `FLOAT64`

You can also convert data types from more restrictive to less restrictive
[parameterized data types](data-types.md#parameterized-data-types).
For example, you can increase the maximum length of a string type or increase the
precision or scale of a numeric type.

The following are examples of valid parameterized data type conversions:

- `NUMERIC(10, 6)` to `NUMERIC(12, 8)`
- `NUMERIC` to `BIGNUMERIC(40, 20)`
- `STRING(5)` to `STRING(7)`

This statement is not supported for
[external tables](https://docs.cloud.google.com/bigquery/docs/external-tables).

Without the `IF EXISTS` clause, if the table does not contain a column with that
name, the statement returns an error. If the `IF EXISTS` clause is included and
the column name does not exist, no error is returned, and no action is taken.

If you want to change the column data type for a table that has data streaming
into it, then you must stop the streaming, commit any pending streams, and wait
for BigQuery to indicate that streaming
is not in use. While a table's column data type can usually be changed 5 hours
after the last streaming operation, it might take longer. You can also consider
adding a new column instead of updating an existing one.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

##### Changing the data type for a column

The following example changes the data type of column `c1` from an `INT64` to `NUMERIC`:

```googlesql
CREATE TABLE dataset.my_table(c1 INT64);

ALTER TABLE dataset.my_table ALTER COLUMN c1 SET DATA TYPE NUMERIC;
```

##### Changing the data type for a field

The following example changes the data type of one of the fields in the `s1` column:

```googlesql
CREATE TABLE dataset.my_table(s1 STRUCT <a INT64, b STRING>);

ALTER TABLE dataset.my_table ALTER COLUMN s1
SET DATA TYPE STRUCT <a NUMERIC, b STRING>;
```

##### Changing precision

The following example changes the precision of a parameterized data type
column:

```googlesql
CREATE TABLE dataset.my_table (pt NUMERIC(7,2));

ALTER TABLE dataset.my_table
ALTER COLUMN pt
SET DATA TYPE NUMERIC(8,2);
```

### `ALTER COLUMN SET DEFAULT` statement

Sets the [default value](https://docs.cloud.google.com/bigquery/docs/default-values) of a column.

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name ALTER COLUMN [IF EXISTS] column_name
SET DEFAULT default_expression;
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If the specified table does not exist, the
  statement has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top-level column to add a default value to.

- `default_expression`: The default value assigned to the column. The
  expression must be a
  [literal](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#literals) or one of
  the following functions:

  - [`CURRENT_DATE`](../googlesql-functions/date_functions.md#current_date)
  - [`CURRENT_DATETIME`](../googlesql-functions/datetime_functions.md#current_datetime)
  - [`CURRENT_TIME`](../googlesql-functions/time_functions.md#current_time)
  - [`CURRENT_TIMESTAMP`](../googlesql-functions/timestamp_functions.md#current_timestamp)
  - [`GENERATE_UUID`](../googlesql-functions/utility-functions.md#generate_uuid)
  - [`RAND`](../googlesql-functions/mathematical_functions.md#rand)
  - [`SESSION_USER`](../googlesql-functions/security_functions.md#session_user)
  - [`ST_GEOGPOINT`](../googlesql-functions/geography_functions-1.md#st_geogpoint)

#### Details

Setting the default value for a column only affects future inserts to the table.
It does not change any existing table data.

The type of the default value must match the type of the column.
A `STRUCT` type can only have a default value set for the entire `STRUCT` field. You
cannot set the default value for a subset of the fields. You cannot set the
default value of an array to `NULL` or set an element within
an array to `NULL`.

If the default value is a function, it is evaluated at the time that the value
is written to the table, not the time the table is created.

You can't set default values on columns that are
[primary keys](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example sets the default value of the column `mycolumn` to the
current time:

```googlesql
ALTER TABLE mydataset.mytable
ALTER COLUMN mycolumn
SET DEFAULT CURRENT_TIME();
```

### `ALTER COLUMN SET GENERATED` statement

Changes a regular column into an
[identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns).

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name ALTER COLUMN [IF EXISTS] column_name
SET GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY (
  [ START WITH start_value ]
  [ INCREMENT BY increment_value ]
);
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If the specified table does not exist, the
  statement has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top-level `INT64`
  column to become an identity column.
  If the column is already an identity column, then this statement returns an
  error.

- `ALWAYS`: The [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns)
  can only have generated values. You
  can't manually insert values into the column. This is the default mode.

- `BY DEFAULT`: You can manually insert values into the
  [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns). If
  you add a row to the table and don't specify a value for the column, or
  specify a `NULL` value, then a generated value is used.

- `start_value`: An `INT64` literal that contains the first generated value to
  use for the identity column. The default value is 1.

- `increment_value`: An `INT64` value other than 0 that contains the minimum
  difference between successive values generated for the identity column.
  Some values might be skipped. The difference between successive generated
  values is always a multiple of the `increment_value`. For example,
  if your starting value is 1 and your increment is 2, then the
  generated values can only include odd numbers. The default value is 1.

#### Details

Designating a column as an identity column only affects future inserts to the
table. It doesn't change any existing table data.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example changes the column `id` into an identity column. Generated
values for this column are greater than or equal to 100 and differ by multiples
of 10.

```googlesql
ALTER TABLE mydataset.mytable
ALTER COLUMN id
SET GENERATED AS IDENTITY (
  START WITH 100
  INCREMENT BY 10
);
```

### `ALTER COLUMN DROP DEFAULT` statement

Removes the [default value](https://docs.cloud.google.com/bigquery/docs/default-values) assigned to a column.
This is the same as setting the default value to `NULL`.

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name ALTER COLUMN [IF EXISTS] column_name
DROP DEFAULT;
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If the specified table does not exist, the
  statement has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the top-level column to remove the default value
  from. If you drop the default value from a column that does not have
  a default set, an error is returned.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example removes the default value from the column `mycolumn`:

```googlesql
ALTER TABLE mydataset.mytable
ALTER COLUMN mycolumn
DROP DEFAULT;
```

### `ALTER COLUMN DROP GENERATED` statement

Removes identity generation from an
[identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns).

#### Syntax

```googlesql
ALTER TABLE [IF EXISTS] table_name ALTER COLUMN [IF EXISTS] column_name
DROP GENERATED;
```

#### Arguments

- `(ALTER TABLE) IF EXISTS`: If the specified table does not exist, the
  statement has no effect.

- `table_name`: The name of the table to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `(ALTER COLUMN) IF EXISTS`: If the specified column does not exist, the
  statement has no effect.

- `column_name`: The name of the identity column to remove identity generation
  from. If you run this statement for a column that isn't an identity column,
  then an error is returned.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table to alter. |
| `bigquery.tables.update` | The table to alter. |

#### Examples

The following example removes the property of being an identity column
from the column `id_col`:

```googlesql
ALTER TABLE mydataset.mytable
ALTER COLUMN id_col
DROP GENERATED;
```

### `ALTER VIEW SET OPTIONS` statement

Sets the options on a [view](https://docs.cloud.google.com/bigquery/docs/views).

#### Syntax

```googlesql
ALTER VIEW [IF EXISTS] view_name
SET OPTIONS(view_set_options_list)
```

#### Arguments

- `IF EXISTS`: If no view exists with that name, the statement has no effect.

- `view_name`: The name of the view to alter. See [Table path syntax](data-definition-language-4.md#table-path-syntax).

- [`view_set_options_list`](#view_set_options_list): The list of options to set.

#### `view_set_options_list`

The option list allows you to set view options such as a
[label](https://docs.cloud.google.com/bigquery/docs/labels) and an expiration time. You can include multiple
options using a comma-separated list.

Specify a view option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `expiration_timestamp` | `TIMESTAMP` | Example: `expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC"` This property is equivalent to the [expirationTime](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.expiration_time) table resource property. |
| `friendly_name` | `STRING` | Example: `friendly_name="my_view"` This property is equivalent to the [friendlyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.friendly_name) table resource property. |
| `description` | `STRING` | Example: `description="a view that expires in 2025"` This property is equivalent to the [description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.description) table resource property. |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | Example: `labels=[("org_unit", "development")]` This property is equivalent to the [labels](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.labels) table resource property. |
| `privacy_policy` | `JSON-formatted STRING` | The policies to enforce when anyone queries the view. To learn more about the policies available for a view, see the [`privacy_policy`](data-definition-language-1.md#privacy_policy) view option. > [!NOTE] > **Note:** Time travel is disabled on any view that has an analysis rule. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags for the view, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

`VALUE` is a constant expression containing only literals, query parameters,
and scalar functions.

The constant expression **cannot** contain:

- A reference to a table
- Subqueries or SQL statements such as `SELECT`, `CREATE`, or `UPDATE`
- User-defined functions, aggregate functions, or analytic functions
- The following scalar functions:
  - `ARRAY_TO_STRING`
  - `REPLACE`
  - `REGEXP_REPLACE`
  - `RAND`
  - `FORMAT`
  - `LPAD`
  - `RPAD`
  - `REPEAT`
  - `SESSION_USER`
  - `GENERATE_ARRAY`
  - `GENERATE_DATE_ARRAY`

Setting the value replaces the existing value of that option for the view, if
there was one. Setting the value to `NULL` clears the view's value for that
option.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The view to alter. |
| `bigquery.tables.update` | The view to alter. |

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Setting the expiration timestamp and description on a view

The following example sets the expiration timestamp on a view to seven days
from the execution time of the `ALTER VIEW` statement, and sets the description
as well:

```googlesql
ALTER VIEW mydataset.myview
SET OPTIONS (
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY),
  description="View that expires seven days from now"
)
```

### `ALTER MATERIALIZED VIEW SET OPTIONS` statement

Sets the options on a materialized view.

#### Syntax

```googlesql
ALTER MATERIALIZED VIEW [IF EXISTS] materialized_view_name
SET OPTIONS(materialized_view_set_options_list)
```

#### Arguments

- `IF EXISTS`: If no materialized view exists with that name, the statement has
  no effect.

- `materialized_view_name`: The name of the materialized view to alter. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- [`materialized_view_set_options_list`](#materialized_view_set_options_list):
  The list of options to set.

#### `materialized_view_set_options_list`

The option list allows you to set materialized view options such as a whether
refresh is enabled. the refresh interval, a [label](https://docs.cloud.google.com/bigquery/docs/labels) and
an expiration time. You can include multiple options using a comma-separated
list.

Specify a materialized view option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `enable_refresh` | `BOOLEAN` | Example: `enable_refresh=false` Default: `true` |
| `refresh_interval_minutes` | `FLOAT64` | Example: `refresh_interval_minutes=20` Default: `refresh_interval_minutes=30` |
| `expiration_timestamp` | `TIMESTAMP` | Example: `expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC"` This property is equivalent to the [expirationTime](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.expiration_time) table resource property. `expiration_timestamp` is optional and not used by default. |
| `max_staleness` | `INTERVAL` | Example: `max_staleness=INTERVAL "4:0:0" HOUR TO SECOND` The [`max_staleness` property](https://docs.cloud.google.com/bigquery/docs/materialized-views-create#max_staleness) provides consistently high performance with controlled costs when processing large, frequently changing datasets. `max_staleness` is disabled by default. |
| `allow_non_incremental_definition` | `BOOLEAN` | Example: `allow_non_incremental_definition=true` The [`allow_non_incremental_definition` property](https://docs.cloud.google.com/bigquery/docs/materialized-views-create#non-incremental) supports an expanded range of SQL queries to create materialized views. `allow_non_incremental_definition=true` is disabled by default. `CREATE MATERIALIZED VIEW` statement support only. The `allow_non_incremental_definition` property can't be changed after the materialized view is created. |
| `kms_key_name` | `STRING` | Example: `kms_key_name="projects/project_id/locations/location/keyRings/keyring/cryptoKeys/key"` This property is equivalent to the [encryptionConfiguration.kmsKeyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/EncryptionConfiguration#FIELDS.kms_key_name) table resource property. See more details about [Protecting data with Cloud KMS keys](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption). |
| `friendly_name` | `STRING` | Example: `friendly_name="my_mv"` This property is equivalent to the [friendlyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.friendly_name) table resource property. |
| `description` | `STRING` | Example: `description="a materialized view that expires in 2025"` This property is equivalent to the [description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.description) table resource property. |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | Example: `labels=[("org_unit", "development")]` This property is equivalent to the [labels](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.labels) table resource property. |
| `tags` | `ARRAY<STRUCT<STRING, STRING>>` | An array of IAM tags for the materialized view, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

Setting the value replaces the existing value of that option for the
materialized view, if there was one. Setting the value to `NULL` clears the
materialized view's value for that option.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The materialized view to alter. |
| `bigquery.tables.update` | The materialized view to alter. |

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Setting the enable refresh state and refresh interval on a materialized view

The following example enables refresh and sets the refresh interval to 20
minutes on a materialized view:

```googlesql
ALTER MATERIALIZED VIEW mydataset.my_mv
SET OPTIONS (
  enable_refresh=true,
  refresh_interval_minutes=20
)
```

### `ALTER ORGANIZATION SET OPTIONS` statement

Sets the options on an organization.

#### Syntax

```googlesql
ALTER ORGANIZATION
SET OPTIONS (
  organization_set_options_list);
```

#### Arguments

- [`organization_set_options_list`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#organization_set_options_list): The list of options to set.

#### `organization_set_options_list`

The option list specifies options for the organization. Specify the options in the
following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `default_kms_key_name` | `STRING` | The default Cloud Key Management Service key for encrypting table data, including temporary or anonymous tables. For more information, see [Customer-managed Cloud KMS keys](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption). Example: `kms_key_name="projects/project_id/locations/location/keyRings/keyring/cryptoKeys/key"` This property is equivalent to the [`encryptionConfiguration.kmsKeyName`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/EncryptionConfiguration#FIELDS.kms_key_name) table resource property. |
| `default_time_zone` | `STRING` | The default time zone to use in time zone-dependent SQL functions, when a time zone is not specified as an argument. For more information, see [time zones](data-types.md#time-zones). Example: `` `region-us.default_time_zone` = "America/Los_Angeles" ``. Sets the default time zone to `America/Los_Angeles` in the `us` region. |
| `default_query_job_timeout_ms` | `INT64` | The default time after which a query job times out. The timeout period must be between 5 minutes and 48 hours. Example: `` `region-us.default_query_job_timeout_ms` = 1800000 ``. Sets the default query job timeout time to 30 minutes for all jobs in the `us` region. |
| `default_interactive_query_queue_timeout_ms` | `INT64` | The default amount of time that an interactive query is queued. If unset, the default is 6 hours. The minimum value is 1 millisecond. The maximum value is 48 hours. To disable interactive query queueing, set the value to -1. Example: `` `region-us.default_interactive_query_queue_timeout_ms` = 1800000 ``. Sets the default queue timeout for interactive queries in the `us` region to 30 minutes. |
| `default_batch_query_queue_timeout_ms` | `INT64` | The default amount of time that a batch query is queued. If unset, the default is 24 hours. The minimum value is 1 millisecond. The maximum value is 48 hours. To disable batch query queueing, set the value to -1. Example: `` `region-us.default_batch_query_queue_timeout_ms` = 1800000 ``. Sets the default queue timeout for batch queries in the `us` region to 30 minutes. |
| `default_query_optimizer_options` | `STRING` | The history-based query optimizations. This option can be one of the following: - `'adaptive=on'`: Use history-based query optimizations. - `'adaptive=off'`: Don't use history-based query optimizations. - `NULL` (default): Use the default history-based query optimizations setting, which is equivalent to `'adaptive=on'`. Example: `` `region-us.default_query_optimizer_options` = 'adaptive=on' `` |
| `query_runtime` | `STRING` | Specifies whether the BigQuery query processor uses the [advanced runtime](https://docs.cloud.google.com/bigquery/docs/running-queries#advanced-runtime). Set the `query_runtime` value to `advanced` to enable the advanced runtime during preview. The advanced runtime is now automatically enabled. Example: `` `region-us.query_runtime` = 'advanced' ``. Enables the advanced runtime. |
| `enable_global_queries_execution` | `BOOL` | Determines if [global queries](https://docs.cloud.google.com/bigquery/docs/global-queries) can be run. The default value is `FALSE`, which means that global queries are not enabled. Example: `` `region-us.enable_global_queries_execution` = true ``. Enables global queries. |
| `enable_global_queries_data_access` | `BOOL` | Determines if [global queries](https://docs.cloud.google.com/bigquery/docs/global-queries) can access data stored in the region. The default value is `FALSE`, which means that global queries can't copy data from this region regardless of the project in which they run. Example: `` `region-us.enable_global_queries_data_access` = true ``. |
| `reservation_override_mode` (Preview) | `STRING` | Specifies how query reservations can be overridden in the region. This option can be one of the following: - `'ALLOW_ANY_OVERRIDE'`: Allows all reservation overrides, including forcing on-demand billing (`'none'`). - `'DENY_OVERRIDE_TO_NONE'` (default): Allows overrides to other existing reservations, but explicit on-demand overrides (`'none'`) fail. - `'DENY_ANY_OVERRIDE'`: Any attempt to override an assigned reservation fails. Example: `` `region-us.reservation_override_mode` = 'ALLOW_ANY_OVERRIDE' `` |
| `reusable_column_aliases_mode` | `STRING` | Determines whether reusable column aliases are enabled for the organization in the region. Set to `on` to enable reusable column aliases. The default value is `off`. Example: `` `region-us.reusable_column_aliases_mode` = "on" `` |
| `disable_on_demand_billing` (Preview) | `BOOL` | Determines whether on-demand billing is disabled for the organization in the region. If `true`, all queries must use an assigned reservation or they fail. Example: `` `region-us.disable_on_demand_billing` = true `` |
| `exclude_biglake_in_datasets_list` | `BOOL` | Determines whether BigLake namespaces in the region are excluded from [`datasets.list`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/datasets/list) results for the organization. The default value is `false`, which includes BigLake namespaces. Set to `true` to exclude BigLake namespaces. Example: `` `region-us.exclude_biglake_in_datasets_list` = true `` |
| `default_location` | `STRING` | The [location](https://docs.cloud.google.com/bigquery/docs/locations) that's used to run jobs when it can't be inferred from the request. For example, the default location is used if the query doesn't contain references to any datasets or connections. This setting can only be applied globally. Example: `` `default_location` = 'europe-west6' ``. Sets the default location to the `europe-west6` region. |

Setting the value replaces the existing value of that option for the
organization, if there is one. Setting the value to `NULL` clears the
organization's value for that option.

#### Required permissions

The `ALTER ORGANIZATION SET OPTIONS` statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.config.update` | The organization to alter. |

#### Examples

The following example sets the default time zone to America/Chicago and the default query job timeout to one hour for an organization in the US region:

Adapted (not in the official docs): renamed the option `default_job_query_timeout_ms` to `default_query_job_timeout_ms`.

```googlesql
ALTER ORGANIZATION
SET OPTIONS (
  `region-us.default_time_zone` = "America/Chicago",
  `region-us.default_query_job_timeout_ms` = 3600000
);
```

The following example sets the default time zone, the default query job timeout,
the default interactive and batch queue timeouts, and the default
Cloud KMS key, clearing the organization level default settings:

```googlesql
ALTER ORGANIZATION
SET OPTIONS (
  `region-us.default_time_zone` = NULL,
  `region-us.default_kms_key_name` = NULL,
  `region-us.default_query_job_timeout_ms` = NULL,
  `region-us.default_interactive_query_queue_timeout_ms` = NULL,
  `region-us.default_batch_query_queue_timeout_ms` = NULL);
```

### `ALTER PROJECT SET OPTIONS` statement

Sets the options on a project.

#### Syntax

```googlesql
ALTER PROJECT project_id
SET OPTIONS (project_set_options_list);
```

#### Arguments

- `project_id`: The name of the project you're altering. This argument is optional, and defaults to the project that runs this DDL query.
- [`project_set_options_list`](#project_set_options_list): The list of options to set.

#### `project_set_options_list`

The option list specifies options for the project. Specify the options in the
following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `default_kms_key_name` | `STRING` | The default Cloud Key Management Service key for encrypting table data, including temporary or anonymous tables. For more information, see [Customer-managed Cloud KMS keys](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption). Example: `kms_key_name="projects/project_id/locations/location/keyRings/keyring/cryptoKeys/key"` This property is equivalent to the [`encryptionConfiguration.kmsKeyName`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/EncryptionConfiguration#FIELDS.kms_key_name) table resource property. |
| `default_time_zone` | `STRING` | The default time zone to use in time zone-dependent SQL functions, when a time zone is not specified as an argument. For more information, see [time zones](data-types.md#time-zones). Example: `` `region-us.default_time_zone` = "America/Los_Angeles" ``. Sets the default time zone to `America/Los_Angeles` in the `us` region. |
| `default_query_job_timeout_ms` | `INT64` | The default time after which a query job times out. The timeout period must be between 5 minutes and 48 hours. Example: `` `region-us.default_query_job_timeout_ms` = 1800000 ``. Sets the default query job timeout time to 30 minutes for jobs run in the `us` region. |
| `default_interactive_query_queue_timeout_ms` | `INT64` | The default amount of time that an interactive query is queued. If unset, the default is 6 hours. The minimum value is 1 millisecond. The maximum value is 48 hours. To disable interactive query queueing, set the value to -1. Example: `` `region-us.default_interactive_query_queue_timeout_ms` = 1800000 ``. Sets the default queue timeout for interactive queries in the `us` region to 30 minutes. |
| `default_batch_query_queue_timeout_ms` | `INT64` | The default amount of time that a batch query is queued. If unset, the default is 24 hours. The minimum value is 1 millisecond. The maximum value is 48 hours. To disable batch query queueing, set the value to -1. Example: `` `region-us.default_batch_query_queue_timeout_ms` = 1800000 ``. Sets the default queue timeout for batch queries in the `us` region to 30 minutes. |
| `default_query_optimizer_options` | `STRING` | The history-based query optimizations. This option can be one of the following: - `'adaptive=on'`: Use history-based query optimizations. - `'adaptive=off'`: Don't use history-based query optimizations. - `NULL` (default): Use the default history-based query optimizations setting, which is equivalent to `'adaptive=on'`. Example: `` `region-us.default_query_optimizer_options` = 'adaptive=on' `` |
| `default_cloud_resource_connection_id` | `STRING` | The default connection to use when creating tables and models ([Preview](https://cloud.google.com/products#product-launch-stages)). Only specify the connection's ID, and exclude the attached project ID and region prefixes. Using default connections can cause the permissions granted to the connection's service account to be updated, depending on the type of table or model you create. For more information, see the [Default connection overview](https://docs.cloud.google.com/bigquery/docs/default-connections). Example: `` `region-us.default_cloud_resource_connection_id` = "connection_1" ``. Sets the default connection to `connection_1` in the `us` region. |
| `default_sql_dialect_option` | `STRING` | The default SQL query dialect for executing query jobs using the bq command-line tool or BigQuery API. Changing this setting doesn't affect the default dialect in the console. This option can be one of the following: - `'default_legacy_sql'`(default): Use legacy SQL if the query dialect isn't specified at the job level. - `'default_google_sql'`: Use GoogleSQL if the query dialect isn't specified at the job level. - `'only_google_sql'`: Use GoogleSQL if the query dialect is not specified at the job level. Reject jobs with query dialect set to legacy SQL. - `'NULL'`: Use the default query dialect setting, which is equivalent to `'default_legacy_sql'`. Example: `` `region-us.default_sql_dialect_option` = 'default_google_sql' ``. Use GoogleSQL if the query dialect isn't specified at the job level. |
| `query_runtime` | `STRING` | Specifies whether the BigQuery query processor uses the [advanced runtime](https://docs.cloud.google.com/bigquery/docs/running-queries#advanced-runtime). Set the `query_runtime` value to `advanced` to enable the advanced runtime during preview. The advanced runtime is now automatically enabled. Example: `` `region-us.query_runtime` = 'advanced' ``. Enables the advanced runtime. |
| `enable_reservation_based_fairness` | `BOOL` | Determines how idle slots are shared. For administration projects created after October 10, 2026, reservation-based fairness is enabled (`true`) by default. For projects created before October 10, 2026 where this option is `false`, idle slots are equally distributed across all query projects. If `true`, idle slots are shared equally across all reservations first, and then across projects within the reservation. For more information, see [reservation-based fairness](https://docs.cloud.google.com/bigquery/docs/slots#fairness). Example: `` `region-us.enable_reservation_based_fairness` = true ``. Enables reservation-based fairness. |
| `enable_global_queries_execution` | `BOOL` | Determines if [global queries](https://docs.cloud.google.com/bigquery/docs/global-queries) can be run. The default value is `FALSE`, which means that global queries are not enabled. Example: `` `region-us.enable_global_queries_execution` = true ``. Enables global queries. |
| `enable_global_queries_data_access` | `BOOL` | Determines if [global queries](https://docs.cloud.google.com/bigquery/docs/global-queries) can access data stored in the region. The default value is `FALSE`, which means that global queries can't copy data from this region regardless of the project in which they run. Example: `` `region-us.enable_global_queries_data_access` = true ``. |
| `reservation_override_mode` ([Preview](https://cloud.google.com/products#product-launch-stages)) | `STRING` | Specifies how query reservations can be overridden in the region. This option can be one of the following: - `'ALLOW_ANY_OVERRIDE'`: Allows all reservation overrides, including forcing on-demand billing (`'none'`). - `'DENY_OVERRIDE_TO_NONE'` (default): Allows overrides to other existing reservations, but explicit on-demand overrides (`'none'`) fail. - `'DENY_ANY_OVERRIDE'`: Any attempt to override an assigned reservation fails. Example: `` `region-us.reservation_override_mode` = 'ALLOW_ANY_OVERRIDE' `` |
| `reusable_column_aliases_mode` | `STRING` | Determines whether reusable column aliases are enabled for the project in the region. Set to `on` to enable reusable column aliases. The default value is `off`. Example: `` `region-us.reusable_column_aliases_mode` = "on" `` |
| `reservation_attribution_mode` ([Preview](https://cloud.google.com/products#product-launch-stages)) | `STRING` | Specifies the reservation cost attribution mode for the project. This option determines whether compute costs are attributed to the administrative project (default) or the individual projects that run the queries. This option can be one of the following: - `'RESERVATION_ATTRIBUTION_MODE_PROJECT_LEVEL'`: Attributes reservation compute costs directly to the projects executing the jobs. - `'RESERVATION_ATTRIBUTION_MODE_NO_ATTRIBUTION'` (default): No attribution; costs are attributed to the administrative project holding the capacity. Example: `` `region-us.reservation_attribution_mode` = 'RESERVATION_ATTRIBUTION_MODE_PROJECT_LEVEL' `` |
| `exclude_biglake_in_datasets_list` | `BOOL` | Determines whether BigLake namespaces in the region are excluded from [`datasets.list`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/datasets/list) results for the project. The default value is `false`, which includes BigLake namespaces. Set to `true` to exclude BigLake namespaces. Example: `` `region-us.exclude_biglake_in_datasets_list` = true `` |
| `default_location` | `STRING` | The [location](https://docs.cloud.google.com/bigquery/docs/locations) that's used to run jobs when it can't be inferred from the request. For example, the default location is used if the location of the datasets in a query can't be determined. This setting can only be applied globally. Example: `` `default_location` = 'europe-west6' ``. Sets the default location to the `europe-west6` region. |

Setting the value replaces the existing value of that option for the project, if there was one. Setting the value to `NULL` clears the
project's value for that option.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.config.update` | The project to alter. |

#### Examples

The following example sets the default time zone to `America/New_York` and the default query job timeout to 30 minutes for a project in the `us` region.

Adapted (not in the official docs): renamed the option `default_job_query_timeout_ms` to `default_query_job_timeout_ms`.

```googlesql
ALTER PROJECT project_id
SET OPTIONS (
  `region-us.default_time_zone` = "America/New_York",
  `region-us.default_query_job_timeout_ms` = 1800000
);
```

The following example sets the default time zone, the default query job timeout, the default Cloud KMS key to `NULL`, and the default interactive and batch queue timeouts and default sql dialect, clearing the project level default settings:

```googlesql
ALTER PROJECT project_id
SET OPTIONS (
  `region-us.default_time_zone` = NULL,
  `region-us.default_kms_key_name` = NULL,
  `region-us.default_query_job_timeout_ms` = NULL,
  `region-us.default_interactive_query_queue_timeout_ms` = NULL,
  `region-us.default_batch_query_queue_timeout_ms` = NULL,
  `region-us.default_sql_dialect_option` = NULL);
```

### `ALTER BI_CAPACITY SET OPTIONS` statement

Sets the options on BigQuery BI Engine capacity.

#### Syntax

```googlesql
ALTER BI_CAPACITY `project_id.location_id.default`
SET OPTIONS(bi_capacity_options_list)
```

#### Arguments

- `project_id`: Optional project ID of the project that will benefit from BI Engine acceleration. If omitted, the query project ID is used.

- `location_id`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) where data needs to be cached, prefixed with `region-`. Examples: `region-us`, `region-us-central1`.

- [`bi_capacity_options_list`](#bi_capacity_options_list):
  The list of options to set.

#### `bi_capacity_options_list`

The option list specifies a set of options for BigQuery BI Engine capacity.

Specify a column option list in the following format:

`NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `size_gb` | `INT64` | Specifies the size of the reservation in gigabytes. |
| `preferred_tables` | `<ARRAY<STRING>>` | List of tables that acceleration should be applied to. Format: `project.dataset.table or dataset.table`. If project is omitted, query project is used. |

Setting `VALUE` replaces the existing value of that option for the BI Engine
capacity, if there is one. Setting `VALUE` to `NULL` clears the value
for that option.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.bireservations.update` | BI Engine reservation |

#### Examples

##### Allocating BI Engine capacity without preferred tables

```googlesql
ALTER BI_CAPACITY `my-project.region-us.default`
SET OPTIONS(
  size_gb = 250
)
```

##### Deallocating BI capacity

```googlesql
ALTER BI_CAPACITY `my-project.region-us.default`
SET OPTIONS(
  size_gb = 0
)
```

##### Removing a set of preferred tables from reservation

```googlesql
ALTER BI_CAPACITY `my-project.region-us.default`
SET OPTIONS(
  preferred_tables = NULL
)
```

##### Allocating BI Capacity with preferred tables list

```googlesql
ALTER BI_CAPACITY `my-project.region-us.default`
SET OPTIONS(
  size_gb = 250,
  preferred_tables = ["data_project1.dataset1.table1",
                      "data_project2.dataset2.table2"]
)
```

##### Overwriting list of preferred tables without changing the size

```googlesql
ALTER BI_CAPACITY `region-us.default`
SET OPTIONS(
  preferred_tables = ["dataset1.table1",
                      "data_project2.dataset2.table2"]
)
```

### `ALTER CAPACITY SET OPTIONS` statement

Alters an existing capacity commitment.

#### Syntax

```googlesql
ALTER CAPACITY `project_id.location_id.commitment_id`
SET OPTIONS (alter_capacity_commitment_option_list);
```

#### Arguments

- `project_id`: The project ID of the administration project that maintains ownership of this commitment.
- `location_id`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the commitment.
- `commitment_id`: The ID of the commitment. The value must be unique to the project and location. It must start and end with a lowercase letter or a number and contain only lowercase letters, numbers and dashes.
- [`alter_capacity_commitment_option_list`](#alter_capacity_commitment_option_list): The options you can set to alter the capacity commitment.

#### `alter_capacity_commitment_option_list`

The option list specifies options for the capacity commitment. Specify the options in the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `plan` | String | The commitment plan to purchase. Supported values include: `ANNUAL`, `THREE_YEAR`, and `TRIAL`. For more information, see [slot commitments](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_commitments). |
| `renewal_plan` | String | The plan this capacity commitment is converted to after `commitment_end_time` passes. Once the plan is changed, the committed period is extended according to the commitment plan. Applicable for ANNUAL, THREE_YEAR, and TRIAL commitments. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.capacityCommitments.update` | The administration project that maintains ownership of the commitments. |

#### Example

The following example changes a capacity commitment to a three-year plan that is
located in the `region-us` region and managed by a project `admin_project`:

```googlesql
ALTER CAPACITY `admin_project.region-us.my-commitment`
SET OPTIONS (
  plan = 'THREE_YEAR');
```

### `ALTER RESERVATION SET OPTIONS` statement

Alters an existing reservation.

#### Syntax

```googlesql
ALTER RESERVATION `project_id.location_id.reservation_id`
SET OPTIONS (alter_reservation_option_list);
```

#### Arguments

- `project_id`: The project ID of the administration project that maintains ownership of this reservation.
- `location_id`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the reservation.
- `reservation_id`: The ID of the reservation. The value must be unique to the project and location. It must start and end with a lowercase letter or a number and contain only lowercase letters, numbers and dashes.
- [`alter_reservation_option_list`](#alter_reservation_option_list): The options you can set to alter the reservation.

#### `alter_reservation_option_list`

The option list specifies options for the reservation. Specify the options in the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `ignore_idle_slots` | `BOOLEAN` | If the value is `true`, then the reservation uses only the slots that are provisioned to it. The default value is `false`. For more information, see [Idle slots](https://docs.cloud.google.com/bigquery/docs/slots#idle_slots). |
| `slot_capacity` | `INTEGER` | The number of slots to allocate to the reservation. If this reservation was created with an [edition](https://docs.cloud.google.com/bigquery/docs/editions-intro), this is equivalent to the amount of [baseline slots](https://docs.cloud.google.com/bigquery/docs/slots-autoscaling-intro#using_reservations_with_baseline_and_autoscaling_slots). |
| `target_job_concurrency` | `INTEGER` | A soft upper bound on the number of jobs that can run concurrently in this reservation. |
| `autoscale_max_slots` | `INTEGER` | The maximum number of slots that can be added to the reservation by autoscaling. |
| `secondary_location` | `STRING` | The secondary location to use in the case of disaster recovery. |
| `is_primary` | `BOOLEAN` | If the value is `true`, the reservation is set to be the primary reservation. |
| `labels` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of labels for the reservation, expressed as key-value pairs. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.reservations.update` | The administration project that maintains ownership of the commitments. |

#### Examples

##### Autoscaling example

The following example changes an autoscaling reservation to 300 baseline slots
and 400 autoscaling slots for a max reservation size of 700. These slots are
located in the `region-us` region and managed by a project `admin_project`:

```googlesql
ALTER RESERVATION `admin_project.region-us.my-reservation`
SET OPTIONS (
  slot_capacity = 300,
  autoscale_max_slots = 400);
```

### `ALTER SEARCH INDEX` statement

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

Alters an existing [search index](https://docs.cloud.google.com/bigquery/docs/search-index) on a table.

#### Syntax

```googlesql
ALTER SEARCH INDEX [ IF EXISTS ] index_name ON table_name
alter_action [, ...]
[ REBUILD ]

alter_action:
  set_options | add_column | drop_column | alter_column

set_options: SET OPTIONS (index_option_list)
add_column: ADD COLUMN [ IF NOT EXISTS ] column_name [OPTIONS (index_column_option_list)]
alter_column: ALTER COLUMN [ IF EXISTS ] column_name SET OPTIONS (index_column_option_list)
drop_column: DROP COLUMN [ IF EXISTS ] column_name
```

#### Arguments

- `IF EXISTS`: If no search index exists with that name, the statement has no effect.
- `index_name`: The name of the search index to alter.
- `table_name`: The name of the table on which the search index is built. For more information, see [Table path syntax](data-definition-language-4.md#table-path-syntax).
- `index_option_list`: The [index options](data-definition-language-2.md#index_option_list) to modify. Setting values for any of the options overwrites their existing values. You can use `NULL` or `[]`, depending on the type of option, to revert an option's value to its default setting. If you don't specify any options (`SET OPTIONS()`), then there is no change to the existing options.
- `column_name`: The name of a top-level column in the table to add, alter, or drop. The column must be one of the [supported data types](data-definition-language-2.md#supported-data-types) or contain a field that is one of the supported types.
- `REBUILD`: Fully rebuild the index content. You must specify `REBUILD` in the
  following situations:

  - You perform more than one type of alter action, such as if you add and drop columns.
  - You change the `index_granularity` for an existing column.
  - You change the `default_index_column_granularity` for the entire index.
  - You dropped a column from the index and want to remove the indexed data of the dropped column immediately.

#### Details

To run this statement, you must have a reservation with
[job type `BACKGROUND`](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#assignments)
on the project that contains the indexed table.

You can't run concurrent `ALTER SEARCH INDEX` statements on the same index.

If you drop a column from an index
created with `ALL COLUMNS`, the index loses the `ALL COLUMNS` property; new
columns added to the base table won't be indexed automatically. Dropping a
column without specifying `REBUILD` is a metadata-only operation and doesn't
immediately free up the index storage that is associated with the dropped
column. The storage isn't freed up until the underlying data in the base table
is deleted. There is no guaranteed time window within which the data is deleted.
Until the index data is removed, search queries might scan more files than
necessary.

When you run the `ALTER SEARCH INDEX` statement without specifying `REBUILD`,
BigQuery can reuse existing index data to perform the update
more efficiently. To avoid causing a full rebuild, consider splitting
updates into single steps that don't require a rebuild. For example, if you
add and drop a column from your index in a single statement, then you must
perform a rebuild. Alternatively, you can add a column in one
statement, and then drop a column in another statement.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.get` | The table on which to update the index. |
| `bigquery.tables.updateIndex` | The table on which to update the index. |

#### Examples

The following example creates a search index called `my_index` on all string
columns of `complex_table`. In this case, columns `a` and `my_struct.string_field`
are indexed.

```googlesql
CREATE TABLE dataset.complex_table(
  a STRING,
  my_struct STRUCT <string_field STRING, int_field INT64>,
  b INT64
);

CREATE SEARCH INDEX my_index
ON dataset.complex_table(ALL COLUMNS)
OPTIONS (data_types = ['STRING']);
```

The following query adds column `b` to the index, and specifies the index
granularity as `COLUMN`:

```googlesql
ALTER SEARCH INDEX my_index ON dataset.complex_table
ADD COLUMN b OPTIONS (data_types = ['INT64'],
                      index_granularity = 'COLUMN');
```

The following query adds the struct subfield `int_field` to the index by
including `INT64` as an indexed type on the column `my_struct`:

```googlesql
ALTER SEARCH INDEX my_index ON dataset.complex_table
ALTER COLUMN my_struct SET OPTIONS(data_types = ['STRING', 'INT64']);
```

To index all `INT64` columns and subfields, you can change the top level
`data_types` option from `['STRING']` to `['STRING', 'INT64']`:

```googlesql
ALTER SEARCH INDEX my_index ON dataset.complex_table
SET OPTIONS(data_types = ['STRING', 'INT64']);
```

To drop the indexed column `a`, run the following query:

```googlesql
ALTER SEARCH INDEX my_index ON dataset.complex_table
DROP COLUMN a;
```

To specify multiple types of alterations in a single statement, specify
`REBUILD` at the end of the statement:

```googlesql
ALTER SEARCH INDEX my_index ON dataset.complex_table
  ADD COLUMN b OPTIONS(data_types = ['INT64'], index_granularity = 'COLUMN'),
  ALTER COLUMN my_struct SET OPTIONS(data_types = ['STRING', 'INT64']),
  DROP COLUMN a,
  SET OPTIONS(default_index_column_granularity = 'GLOBAL'),
  REBUILD;
```

### `ALTER VECTOR INDEX REBUILD` statement

Rebuild a [vector index](https://docs.cloud.google.com/bigquery/docs/vector-index) on a table.

#### Syntax

```googlesql
ALTER VECTOR INDEX [ IF EXISTS ] index_name
ON table_name
REBUILD;
```

#### Arguments

- `IF EXISTS`: If no vector index exists with that name, the statement has
  no effect.

- `index_name`: The name of the vector index to rebuild.

- `table_name`: The name of the table that the vector index is on.
  See [Table path syntax](data-definition-language-4.md#table-path-syntax).

  If the table doesn't contain a vector index, or if the table contains a
  different vector index than the one specified in the `index_name`
  argument, the query fails.
- `REBUILD`: Indicates that the statement rebuilds the vector index. This
  argument is required.

#### Details

Use the `ALTER VECTOR INDEX REBUILD` statement to rebuild an active vector
index on a table without having to drop the vector index, and without any
index downtime. When you run the statement, BigQuery creates
a *shadow index*, a background-only index that inherits the configuration of the
current index, on the table and trains it in the background.
BigQuery promotes the shadow index to be the active index
when the shadow index has enough coverage.

To run the `ALTER VECTOR INDEX REBUILD` statement, you must
[create a reservation assignment](https://docs.cloud.google.com/bigquery/docs/reservations-assignments#assign_my_prod_project_to_prod_reservation)
with a job type of `BACKGROUND` for the project that contains the table.
If you run the statement without an appropriate reservation, the query fails.

You can have only one vector index rebuild in progress at a time. The
`ALTER VECTOR INDEX REBUILD` statement completes before the shadow index
replaces the active index, because the shadow index training and cutover
happen asynchronously. If you start another vector index
rebuild before the shadow index replaces the initial index, the second rebuild
request fails.

#### Required permissions

To get the permissions that
you need to alter vector indexes,

ask your administrator to grant you the
BigQuery Data Editor (`roles/bigquery.dataEditor`) or BigQuery Data Owner (`roles/bigquery.dataOwner`)
IAM role on your table.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

#### Examples

The following example rebuilds the `index1` vector index on the `sales` table:

```googlesql
ALTER VECTOR INDEX IF EXISTS index1
ON mydataset.sales
REBUILD;
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and a code value that the rendered page splits into two code elements with a line-break hint (`<wbr>`) is written as one code span (the twin leaves a doubled backtick in it). The prose is otherwise unchanged.
- The HTML of the rendered page leaves `<FLOAT64>` unescaped inside a code block, so a browser hides it; the text is kept here as written in the HTML source.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 4 files at section boundaries; this is part 3.
- Corrected from the official docs: the link text `add_replica_option_list` differs from the syntax and heading name `add_replica_options_list`; changed.
- Corrected from the official docs: the `ADD REPLICA` and `DROP REPLICA` argument `dataset_name` is described as "The name of the table to alter"; changed to "dataset", since both are `ALTER SCHEMA` statements.
- Corrected from the official docs: the `ADD REPLICA` example passes `location=`eu``, a backticked identifier, but the `location` option is a `STRING`; changed to the string literal `'eu'`.
- Corrected from the official docs: the `DROP REPLICA` example contains `[IF EXISTS]`, which is syntax notation for an optional clause, not SQL; the brackets were removed.
- Corrected from the official docs: the link for `ALTER TABLE ALTER COLUMN` pointed to the `SET DATA TYPE` section; the `=` / `+=` option setting it describes is in the `ALTER COLUMN SET OPTIONS` statement section, so the anchor was changed to `#alter-column-set-options-statement` (here and in the same data_policies row of the CREATE TABLE option list).
- Corrected from the official docs: the `DROP NOT NULL` syntax uses `column`, but the arguments define `column_name`; changed to `column_name`.
- Corrected from the official docs: the anchor `#organziation_set_options_list` is misspelled; changed to `#organization_set_options_list`, matching the heading below.
- Corrected from the official docs: the `ALTER ORGANIZATION` and `ALTER PROJECT` examples use `default_job_query_timeout_ms`, but the option tables on the same page define `default_query_job_timeout_ms`; changed in both examples.
- Corrected from the official docs: the search index example text says the index is on `my_table`, but the statement that follows uses `dataset.complex_table`; changed.
- Corrected from the official docs: `IF EXISTS` of `DROP CONSTRAINT` says "If no primary key exists"; changed to "If no constraint with that name exists", since the syntax is `DROP CONSTRAINT [IF EXISTS] constraint_name`. The same sentence for `DROP PRIMARY KEY` is correct and unchanged.
- Corrected from the official docs: the section `view_column_set_options_list` describes "the `view_column_option_list`"; changed to `view_column_set_options_list`, the name in its heading and in the syntax.
- Caution: The `SET GENERATED` example writes `SET GENERATED AS IDENTITY (`, while the syntax shows `SET GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY (` as a required choice; which of the two is intended is not stated.
- Caution: The `ALTER PROJECT` syntax shows `project_id` as a required token, while the argument description says it is optional and defaults to the project that runs the query. The valid form without it is not shown.
- Conflicting official statements: In the `ALTER SEARCH INDEX` syntax `[ REBUILD ]` is on its own line, while the example ends `SET OPTIONS(...),\n  REBUILD;` with a comma before `REBUILD`. Which is correct is not stated.

## Related

- [Index of this directory](./README.md)
- [Data definition language (DDL) statements in GoogleSQL (part 1 of 4)](./data-definition-language-1.md)
- [Data definition language (DDL) statements in GoogleSQL (part 2 of 4)](./data-definition-language-2.md)
- [Data definition language (DDL) statements in GoogleSQL (part 4 of 4)](./data-definition-language-4.md)
