---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
---

# Data definition language (DDL) statements in GoogleSQL (part 1 of 4)

## Signature / Usage

Data definition language (DDL) statements let you create and modify
BigQuery resources using
[GoogleSQL](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql)
query syntax. You can use DDL commands to create, alter, and delete resources,
such as the following:

- [Datasets](https://docs.cloud.google.com/bigquery/docs/datasets-intro)
- [Tables](https://docs.cloud.google.com/bigquery/docs/tables-intro)
- [Table schemas](https://docs.cloud.google.com/bigquery/docs/managing-table-schemas)
- [Table clones](https://docs.cloud.google.com/bigquery/docs/table-clones-intro)
- [Table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro)
- [Views](https://docs.cloud.google.com/bigquery/docs/views)
- [Connections](https://docs.cloud.google.com/bigquery/docs/connections-api-intro)
- [User-defined functions](data-definition-language-2.md#create-function-statement) (UDFs)
- [Indexes](https://docs.cloud.google.com/bigquery/docs/search-intro)
- [Capacity commitments and reservations](https://docs.cloud.google.com/bigquery/docs/reservations-intro)
- [Row-level access policies](https://docs.cloud.google.com/bigquery/docs/managing-row-level-security)
- [Default configuration settings](https://docs.cloud.google.com/bigquery/docs/default-configuration)

### Required permissions

To create a job that runs a DDL statement, you must have the
`bigquery.jobs.create` permission for the project where you are running the job.
Each DDL statement also requires specific permissions on the affected resources,
which are documented under each statement.

#### IAM roles

The predefined IAM roles `bigquery.user`,
`bigquery.jobUser`, and `bigquery.admin` include the required
`bigquery.jobs.create` permission.

For more information about IAM roles in BigQuery,
see [Predefined roles and permissions](https://docs.cloud.google.com/bigquery/access-control) or the
[IAM permissions reference](https://docs.cloud.google.com/iam/docs/permissions-reference).

### Run DDL statements

You can run DDL statements by using the Google Cloud console, by using the
bq command-line tool, by calling the
[`jobs.query`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query) REST API, or
programmatically using the
[BigQuery API client libraries](https://docs.cloud.google.com/bigquery/docs/reference/libraries).

#### Console

1. Go to the BigQuery page in the Google Cloud console.

   [Go to BigQuery](https://console.cloud.google.com/bigquery)
2. Click **Compose new query**.

3. Enter the DDL statement into the **Query editor** text area. For example:

   <br />

   ```googlesql
    CREATE TABLE mydataset.newtable ( x INT64 )

   ```

   <br />

4. Click **Run**.

#### bq

Enter the
[`bq query`](../bq-cli/bq-cli-reference-2.md#bq-query) command
and supply the DDL statement as the query parameter. Set the
`use_legacy_sql` flag to `false`.

```bash
bq query --use_legacy_sql=false \
  'CREATE TABLE mydataset.newtable ( x INT64 )'
```

#### API

Call the [`jobs.query`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query) method
and supply the DDL statement in the request body's `query` property.

DDL functionality extends the information returned by a
[Jobs resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/jobs#resource).
`statistics.query.statementType` includes the following additional values:

- `CREATE_TABLE`
- `CREATE_TABLE_AS_SELECT`
- `DROP_TABLE`
- `CREATE_VIEW`
- `DROP_VIEW`

`statistics.query` has 2 additional fields:

- `ddlOperationPerformed`: The DDL operation performed, possibly dependent on the existence of the DDL target. Current values include:
  - `CREATE`: The query created the DDL target.
  - `SKIP`: No-op. Examples --- `CREATE TABLE IF NOT EXISTS` was submitted, and the table exists. Or `DROP TABLE IF EXISTS` was submitted, and the table does not exist.
  - `REPLACE`: The query replaced the DDL target. Example --- `CREATE OR REPLACE TABLE` was submitted, and the table already exists.
  - `DROP`: The query deleted the DDL target.
- `ddlTargetTable`: When you submit a `CREATE TABLE/VIEW` statement or a `DROP TABLE/VIEW` statement, the target table is returned as an object with 3 fields:
  - "projectId": string
  - "datasetId": string
  - "tableId": string

#### Java

Call the
[`BigQuery.create()`](https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQuery#com_google_cloud_bigquery_BigQuery_create_com_google_cloud_bigquery_JobInfo_com_google_cloud_bigquery_BigQuery_JobOption____)
method to start a query job. Call the
[`Job.waitFor()`](https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.Job#com_google_cloud_bigquery_Job_waitFor_com_google_cloud_RetryOption____)
method to wait for the DDL query to finish.

Before trying this sample, follow the Java setup instructions in the
[BigQuery quickstart using
client libraries](https://docs.cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries).

For more information, see the
[BigQuery Java API
reference documentation](https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/overview).

To authenticate to BigQuery, set up Application Default Credentials.
For more information, see

[Set up authentication for client libraries](https://docs.cloud.google.com/bigquery/docs/authentication#client-libs).

Adapted (not in the official docs): removed the stray backtick before the closing quote of the SQL string, and checked the job error after `waitFor()` instead of `isDone()`, so that a failed job is not reported as success.

```java
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryException;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.JobInfo;
import com.google.cloud.bigquery.QueryJobConfiguration;

// Sample to create a view using DDL
public class DDLCreateView {

  public static void runDDLCreateView() {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "MY_PROJECT_ID";
    String datasetId = "MY_DATASET_ID";
    String tableId = "MY_VIEW_ID";
    String ddl =
        "CREATE VIEW "
            + "`"
            + projectId
            + "."
            + datasetId
            + "."
            + tableId
            + "`"
            + " OPTIONS("
            + " expiration_timestamp=TIMESTAMP_ADD("
            + " CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),"
            + " friendly_name=\"new_view\","
            + " description=\"a view that expires in 2 days\","
            + " labels=[(\"org_unit\", \"development\")]"
            + " )"
            + " AS SELECT name, state, year, number"
            + " FROM `bigquery-public-data.usa_names.usa_1910_current`"
            + " WHERE state LIKE 'W%'";
    ddlCreateView(ddl);
  }

  public static void ddlCreateView(String ddl) {
    try {
      // Initialize client that will be used to send requests. This client only needs to be created
      // once, and can be reused for multiple requests.
      BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();

      QueryJobConfiguration config = QueryJobConfiguration.newBuilder(ddl).build();

      // create a view using query and it will wait to complete job.
      Job job = bigquery.create(JobInfo.of(config));
      job = job.waitFor();
      if (job == null) {
        System.out.println("View was not created. Job no longer exists");
      } else if (job.getStatus().getError() != null) {
        System.out.println("View was not created. \n" + job.getStatus().getError().toString());
      } else {
        System.out.println("View created successfully");
      }
    } catch (BigQueryException | InterruptedException e) {
      System.out.println("View was not created. \n" + e.toString());
    }
  }
}
```

<br />

#### Node.js

Before trying this sample, follow the Node.js setup instructions in the
[BigQuery quickstart using
client libraries](https://docs.cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries).

For more information, see the
[BigQuery Node.js API
reference documentation](https://googleapis.dev/nodejs/bigquery/latest/index.html).

To authenticate to BigQuery, set up Application Default Credentials.
For more information, see

[Set up authentication for client libraries](https://docs.cloud.google.com/bigquery/docs/authentication#client-libs).

```javascript
// Import the Google Cloud client library and create a client
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function ddlCreateView() {
  // Creates a view via a DDL query

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = "my_project"
  // const datasetId = "my_dataset"
  // const tableId = "my_new_view"

  const query = `
  CREATE VIEW \`${projectId}.${datasetId}.${tableId}\`
  OPTIONS(
      expiration_timestamp=TIMESTAMP_ADD(
          CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
      friendly_name="new_view",
      description="a view that expires in 2 days",
      labels=[("org_unit", "development")]
  )
  AS SELECT name, state, year, number
      FROM \`bigquery-public-data.usa_names.usa_1910_current\`
      WHERE state LIKE 'W%'`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);

  job.on('complete', metadata => {
    console.log(`Created new view ${tableId} via job ${metadata.id}`);
  });
}
```

#### Python

Call the
[`Client.query()`](https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.client.Client#google_cloud_bigquery_client_Client_query)
method to start a query job. Call the
[`QueryJob.result()`](https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.job.QueryJob#google_cloud_bigquery_job_QueryJob_result)
method to wait for the DDL query to finish.

Before trying this sample, follow the Python setup instructions in the
[BigQuery quickstart using
client libraries](https://docs.cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries).

For more information, see the
[BigQuery Python API
reference documentation](https://docs.cloud.google.com/python/docs/reference/bigquery/latest).

To authenticate to BigQuery, set up Application Default Credentials.
For more information, see

[Set up authentication for client libraries](https://docs.cloud.google.com/bigquery/docs/authentication#client-libs).

```python
# from google.cloud import bigquery
# project = 'my-project'
# dataset_id = 'my_dataset'
# table_id = 'new_view'
# client = bigquery.Client(project=project)

sql = """
CREATE VIEW `{}.{}.{}`
OPTIONS(
    expiration_timestamp=TIMESTAMP_ADD(
        CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
    friendly_name="new_view",
    description="a view that expires in 2 days",
    labels=[("org_unit", "development")]
)
AS SELECT name, state, year, number
    FROM `bigquery-public-data.usa_names.usa_1910_current`
    WHERE state LIKE 'W%'
""".format(
    project, dataset_id, table_id
)

job = client.query(sql)  # API request.
job.result()  # Waits for the query to finish.

print(
    'Created new view "{}.{}.{}".'.format(
        job.destination.project,
        job.destination.dataset_id,
        job.destination.table_id,
    )
)
```

### On-demand query size calculation

If you use on-demand billing, BigQuery charges for data definition
language (DDL) queries based on the number of bytes processed by the query.

| DDL statement | Bytes processed |
|---|---|
| `CREATE TABLE` | None. |
| `CREATE TABLE ... AS SELECT ...` | The sum of bytes processed for all the columns referenced from the tables scanned by the query. |
| `CREATE VIEW` | None. |
| `DROP TABLE` | None. |
| `DROP VIEW` | None. |

For more information about cost estimation, see [Estimate and control costs](https://docs.cloud.google.com/bigquery/docs/best-practices-costs).

### `CREATE SCHEMA` statement

Creates a new dataset.

> [!IMPORTANT]
> **Key Point:** This SQL statement uses the term `SCHEMA` to refer to a logical collection of tables, views, and other resources. The equivalent concept in BigQuery is a *dataset* . In this context, `SCHEMA` does not refer to BigQuery [table schemas](https://docs.cloud.google.com/bigquery/docs/schemas).

#### Syntax

```googlesql
CREATE SCHEMA [ IF NOT EXISTS ]
[project_name.]dataset_name
[DEFAULT COLLATE collate_specification]
[OPTIONS(schema_option_list)]
```

#### Arguments

- `IF NOT EXISTS`: If any dataset exists with the same name, the `CREATE`
  statement has no effect.

- `DEFAULT COLLATE collate_specification`: When a new table is created in the
  dataset, the table inherits a
  default [collation specification](collation-concepts.md#default-collation-specification)
  unless a collation specification is explicitly specified for a table or a
  [column](#column).

  If you remove or change this collation specification later with the
  `ALTER SCHEMA` statement, this will not change existing
  collation specifications in this dataset. If you want to update an existing
  collation specification in a dataset, you must alter the column that contains
  the specification.
- `project_name`: The name of the project where you are creating the dataset.
  Defaults to the project that runs this DDL statement.

- `dataset_name`: The name of the dataset to create.

- [`schema_option_list`](#schema_option_list): A list of options for creating
  the dataset.

#### Details

The dataset is created in the location that you specify in the query settings.
For more information, see
[Specifying your location](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations).

For more information about creating a dataset, see
[Creating datasets](https://docs.cloud.google.com/bigquery/docs/datasets). For information about quotas, see
[Dataset limits](https://docs.cloud.google.com/bigquery/quotas#dataset_limits).

#### `schema_option_list`

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
| `location` | `STRING` | The location in which to create the dataset. If you don't specify this option, the dataset is created in the location where the query runs. If you specify this option and also explicitly set the location for the query job, the two values must match; otherwise the query fails. |
| `max_time_travel_hours` | `SMALLINT` | Specifies the duration in hours of the [time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel#time_travel) for the dataset. The `max_time_travel_hours` value must be an integer expressed in multiples of 24 (48, 72, 96, 120, 144, 168) between 48 (2 days) and 168 (7 days). 168 hours is the default if this option isn't specified. |
| `primary_replica` | `STRING` | The replica name to set as the [primary replica](https://docs.cloud.google.com/bigquery/docs/data-replication). |
| `storage_billing_model` | `STRING` | Alters the [storage billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models) for the dataset. Set the `storage_billing_model` value to `PHYSICAL` to use physical bytes when calculating storage charges, or to `LOGICAL` to use logical bytes. `LOGICAL` is the default. The `storage_billing_model` option is only available for datasets that have been updated after December 1, 2022. For datasets that were last updated before that date, the storage billing model is `LOGICAL`. When you change a dataset's billing model, it takes 24 hours for the change to take effect. Once you change a dataset's storage billing model, you must wait 14 days before you can change the storage billing model again. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags for the dataset, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.datasets.create` | The project where you create the dataset. |

#### Examples

##### Creating a new dataset

The following example creates a dataset with a default table expiration and a
set of labels.

```googlesql
CREATE SCHEMA mydataset
OPTIONS(
  location="us",
  default_table_expiration_days=3.75,
  labels=[("label1","value1"),("label2","value2")]
  )
```

##### Creating a case-insensitive dataset

The following example creates a case-insensitive dataset. Both the dataset name
and table names inside the dataset are case-insensitive.

```googlesql
CREATE SCHEMA mydataset
OPTIONS(
  is_case_insensitive=TRUE
)
```

##### Creating a dataset with collation support

The following example creates a dataset with a collation specification.

```googlesql
CREATE SCHEMA mydataset
DEFAULT COLLATE 'und:ci'
```

### `CREATE TABLE` statement

Creates a new table.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] [ TEMP | TEMPORARY ] TABLE [ IF NOT EXISTS ]
table_name
[(
  column | constraint_definition[, ...]
)]
[DEFAULT COLLATE collate_specification]
[PARTITION BY partition_expression]
[CLUSTER BY clustering_column_list]
[WITH CONNECTION connection_name]
[OPTIONS(table_option_list)]
[AS query_statement]

column:=
column_definition

constraint_definition:=
[primary_key]
| [[CONSTRAINT constraint_name] foreign_key, ...]

primary_key :=
PRIMARY KEY (column_name[, ...]) NOT ENFORCED

foreign_key :=
FOREIGN KEY (column_name[, ...]) foreign_reference

foreign_reference :=
REFERENCES primary_key_table(column_name[, ...]) NOT ENFORCED
```

#### Arguments

- `OR REPLACE`: Replaces any table with the same name if it exists. Cannot
  appear with `IF NOT EXISTS`.

- `TEMP | TEMPORARY`: Creates a
  [temporary table](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries#temporary_tables).

- `IF NOT EXISTS`: If any table exists with the same name, the `CREATE`
  statement has no effect. Cannot appear with `OR REPLACE`.

- `table_name`: The name of the table to create. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax). For temporary tables, do not include
  the project name or dataset name.

- [`column`](#column): The table's schema information.

- [`constraint_definition`](https://docs.cloud.google.com/bigquery/docs/information-schema-table-constraints): An expression that defines a table constraint.

- [`collation_specification`](collation-concepts.md#default-collation-specification):
  When a new column is added to the table without an explicit
  collation specification,
  the [column](#column) inherits this
  collation specification for `STRING` types.

  If you remove or change this collation specification later with the
  `ALTER TABLE` statement, this will not change existing
  collation specifications in this table. If you want to update an existing
  collation specification in a table, you must alter the column that contains
  the specification.

  If the table is part of a dataset, the default collation specification for
  this table overrides the default collation specification for the dataset.
- [`partition_expression`](#partition_expression): An expression that determines
  how to partition the table.

- [`clustering_column_list`](#clustering_column_list): A comma-separated list
  of column references that determine how to cluster the table. You cannot have
  collation on columns in this list.

- `connection_name`: Specifies a
  [connection resource](https://docs.cloud.google.com/bigquery/docs/connections-api-intro) that has
  credentials for accessing the external data. Specify the connection name
  in the form
  <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>. If the
  project ID or location contains a dash, enclose the connection name in
  backticks (`` ` ``). To use a [default connection](https://docs.cloud.google.com/bigquery/docs/default-connections),
  specify `DEFAULT` instead of the connection string containing
  <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>.

- [`table_option_list`](#table_option_list): A list of options for creating the
  table.

- `query_statement`: The query from which the table should be created. For the
  query syntax, see [SQL syntax reference](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).
  If a collation specification is used on this table, collation passes
  through this query statement.

- `primary_key`:
  An expression that defines a primary key
  [table constraint](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys).
  BigQuery only supports unenforced primary keys.

- `foreign_key`:
  An expression that defines a foreign key
  [table constraint](https://docs.cloud.google.com/bigquery/docs/primary-foreign-keys).
  BigQuery only supports unenforced foreign keys.

#### Details

`CREATE TABLE` statements must comply with the following rules:

- Only one `CREATE` statement is allowed.
- Either the column list, the `AS query_statement` clause, or both must be present.
- When both the column list and the `AS query_statement` clause are present, BigQuery ignores the names in the `AS query_statement` clause and matches the columns with the column list by position.
- When the `AS query_statement` clause is present and the column list is absent, BigQuery determines the column names and types from the `AS query_statement` clause.
- Column names must be specified either through the column list, the `AS query_statement` clause or schema of the table in the `LIKE` clause.
- Duplicate column names are not allowed.
- When both the `LIKE` and the `AS query_statement` clause are present, the column list in the query statement must match the columns of the table referenced by the `LIKE` clause.
- Table names are case-sensitive unless the dataset they belong to is not. To create a case-insensitive dataset, see [Creating a case-insensitive dataset](#creating-a-case-insensitive-dataset). To alter a dataset to make it case-insensitive dataset, see [Turning on case insensitivity for a dataset](data-definition-language-3.md#turning-on-case-insensitivity-for-a-dataset).

Limitations:

- It is not possible to create an [ingestion-time partitioned table](https://docs.cloud.google.com/bigquery/docs/creating-partitioned-tables) from the result of a query. Instead, use a `CREATE TABLE` DDL statement to create the table, and then use an [`INSERT` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement) to insert data into it.
- It is not possible to use the `OR REPLACE` modifier to replace a table with a different kind of partitioning. Instead, `DROP` the table, and then use a `CREATE TABLE ... AS SELECT ...` statement to recreate it.

This statement supports the following variants, which have the same limitations:

- [`CREATE TABLE LIKE`](#create-table-like-statement): Create a table with the same schema as an existing table.
- [`CREATE TABLE COPY`](#create-table-copy-statement): Create a table by copying schema and data from an existing table.

#### `column`

`(column_name column_schema[, ...])` contains the table's
schema information in a comma-separated list.

> [!NOTE]
> **Note:** Constraints cannot be specified on `ARRAY` or `STRUCT` elements.

```googlesql
column :=
  column_name column_schema

column_schema :=
   {
     simple_type
     | STRUCT<field_list>
     | ARRAY<array_element_schema>
   }
   [PRIMARY KEY NOT ENFORCED | REFERENCES table_name(column_name) NOT ENFORCED]
   [ DEFAULT default_expression |
     embedding_generation |
     identity_column ]
   [NOT NULL]
   [OPTIONS(column_option_list)]

simple_type :=
  { data_type | STRING COLLATE collate_specification }

field_list :=
  field_name column_schema [, ...]

array_element_schema :=
  { simple_type | STRUCT<field_list> }
  [NOT NULL]

embedding_generation :=
  GENERATED ALWAYS AS (generation_expression) STORED OPTIONS(generation_option_list)

identity_column :=
  [ GENERATED { ALWAYS | BY DEFAULT } ] AS IDENTITY (
    [ START WITH start_value ]
    [ INCREMENT BY increment_value ])
```

- [`column_name`](https://docs.cloud.google.com/bigquery/docs/schemas#column_names) is the name of the column.
  A column name:

  - Must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_)
  - Must start with a letter or underscore
  - Can be up to 300 characters
- `column_schema`: Similar to a
  [data type](https://docs.cloud.google.com/bigquery/docs/schemas#standard_sql_data_types), but supports an
  optional `NOT NULL` constraint for types other than `ARRAY`. `column_schema`
  also supports options on top-level columns and `STRUCT` fields.

  `column_schema` can be used only in the column definition list of
  `CREATE TABLE` statements. It cannot be used as a type in expressions.
- `simple_type`: Any
  [supported data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types)
  aside from `STRUCT` and `ARRAY`.

  If `simple_type` is a `STRING`, it supports an additional clause for
  [collation](collation-concepts.md#collation-specification-details),
  which defines how a resulting `STRING` can be compared and sorted.
  The syntax looks like this:

  ```googlesql
  STRING COLLATE collate_specification
  ```

  If you have `DEFAULT COLLATE collate_specification` assigned to the table,
  the collation specification for a column overrides the specification for the
  table.
- `default_expression`: The [default value](https://docs.cloud.google.com/bigquery/docs/default-values)
  assigned to the column. You cannot specify `DEFAULT` if `GENERATED ALWAYS AS`
  is specified.

- `field_list`: Represents the fields in a struct.

- `field_name`: The name of the struct field. Struct field names have the
  same restrictions as column names.

- `NOT NULL`: When the `NOT NULL` constraint is present for a column or field,
  the column or field is created with `REQUIRED` mode. Conversely, when the
  `NOT NULL` constraint is absent, the column or field is created with
  `NULLABLE` mode.

  Columns and fields of `ARRAY` type do not support the `NOT NULL` modifier. For
  example, a `column_schema` of `ARRAY<INT64> NOT NULL` is invalid, since
  `ARRAY` columns have `REPEATED` mode and can be empty but cannot be `NULL`.
  An array element in a table can never be `NULL`, regardless of whether the
  `NOT NULL` constraint is specified. For example, `ARRAY<INT64>` is equivalent
  to `ARRAY<INT64 NOT NULL>`.

  The `NOT NULL` attribute of a table's `column_schema` does not propagate
  through queries over the table. If table `T` contains a column declared as
  `x INT64 NOT NULL`, for example,
  `CREATE TABLE dataset.newtable AS SELECT x FROM T` creates a table named
  `dataset.newtable` in which `x` is `NULLABLE`.
- `generation_expression`: ([Preview](https://cloud.google.com/products#product-launch-stages))
  An expression for an automatically generated embedding column.
  Setting this field enables
  [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
  on the table. The only
  supported `generation_expression` syntax is a call to the
  [`AI.EMBED` function](../bigqueryml-sql/ai-embed.md).

  - You can't specify `GENERATED ALWAYS AS` if `DEFAULT` is specified.
  - The `connection_id` argument to `AI.EMBED` is required when used in a generation expression.
  - The type of the column must be `STRUCT<result ARRAY<FLOAT64>, status STRING>`.
- `generation_option_list`: The options for a generated column.
  The only supported option is `asynchronous = TRUE`.

- `ALWAYS`: The [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns)
  can only have generated values. You
  can't manually insert values into the column. This mode is the default mode.

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
  generated values can only include odd numbers.
  The default value is 1.

#### `partition_expression`

`PARTITION BY` is an optional clause that controls
[table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables) and
[vector index](https://docs.cloud.google.com/bigquery/docs/vector-index#partitions) partitioning.
`partition_expression` is an expression that determines how to partition the
table or vector index. The partition expression can contain the following
values:

- `_PARTITIONDATE`. Partition by ingestion time with daily partitions. This syntax cannot be used with the `AS query_statement` clause.
- `DATE(_PARTITIONTIME)`. Equivalent to `_PARTITIONDATE`. This syntax cannot be used with the `AS query_statement` clause.
- `<date_column>`. Partition by a `DATE` column with daily partitions.
- `DATE({ <timestamp_column> | <datetime_column> })`. Partition by a `TIMESTAMP` or `DATETIME` column with daily partitions.
- `DATETIME_TRUNC(<datetime_column>, { DAY | HOUR | MONTH | YEAR })`. Partition by a `DATETIME` column with the specified partitioning type.
- `TIMESTAMP_TRUNC(<timestamp_column>, { DAY | HOUR | MONTH | YEAR })`. Partition by a `TIMESTAMP` column with the specified partitioning type.
- `TIMESTAMP_TRUNC(_PARTITIONTIME, { DAY | HOUR | MONTH | YEAR })`. Partition by ingestion time with the specified partitioning type. This syntax cannot be used with the `AS query_statement` clause.
- `DATE_TRUNC(<date_column>, { MONTH | YEAR })`. Partition by a `DATE` column with the specified partitioning type.
- `RANGE_BUCKET(<int64_column>, GENERATE_ARRAY(<start>, <end>[, <interval>]))`.
  Partition by an integer column with the specified range, where:

  - `start` is the start of range partitioning, inclusive.
  - `end` is the end of range partitioning, exclusive.
  - `interval` is the width of each range within the partition. Defaults to 1.

#### `clustering_column_list`

`CLUSTER BY` is an optional clause that controls [table clustering](https://docs.cloud.google.com/bigquery/docs/creating-clustered-tables).
`clustering_column_list` is a comma-separated list that determines how to
cluster the table. The clustering column list can contain a list of up to four
clustering columns.

> [!NOTE]
> **Note:** You cannot have collation on a column in `clustering_column_list`.

#### `table_option_list`

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

If `VALUE` evaluates to `NULL`, the corresponding option `NAME` in the
`CREATE TABLE` statement is ignored.

#### `column_option_list`

Specify a column option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | Example: `description="a unique id"` This property is equivalent to the [schema.fields\[\].description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TableFieldSchema.FIELDS.description) table resource property. |
| `rounding_mode` | `STRING` | Example: `rounding_mode = "ROUND_HALF_EVEN"` This specifies the [rounding mode](https://docs.cloud.google.com/bigquery/docs/schemas#rounding_mode) that's used for values written to a `NUMERIC` or `BIGNUMERIC` type column or `STRUCT` field. The following values are supported: - `"ROUND_HALF_AWAY_FROM_ZERO"`: Halfway cases are rounded away from zero. For example, 2.25 is rounded to 2.3, and -2.25 is rounded to -2.3. - `"ROUND_HALF_EVEN"`: Halfway cases are rounded towards the nearest even digit. For example, 2.25 is rounded to 2.2 and -2.25 is rounded to -2.2. This property is equivalent to the [`roundingMode`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TableFieldSchema.FIELDS.rounding_mode) table resource property. |
| `data_policies` | `ARRAY<STRING>` | Applies a [data policy](https://docs.cloud.google.com/bigquery/docs/column-data-masking#create_data_policies) to a column in a table. Example: `data_policies = ["{'name':'myproject.region-us.data_policy_name1'}", "{'name':'myproject.region-us.data_policy_name2'}"]` The [`ALTER TABLE ALTER COLUMN`](data-definition-language-3.md#alter-column-set-options-statement) statement supports the `=` and `+=` operators to add data policies to a specific column. Example: `data_policies +=["data_policy1", "data_policy2"]` |
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

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the table. |

In addition, the `OR REPLACE` clause requires `bigquery.tables.update` and
`bigquery.tables.updateData` permissions.

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Creating a new table

The following example creates a partitioned table named `newtable` in
`mydataset`:

```googlesql
CREATE TABLE mydataset.newtable
(
  x INT64 OPTIONS(description="An optional INTEGER field"),
  y STRUCT <
    a ARRAY <STRING> OPTIONS(description="A repeated STRING field"),
    b BOOL
  >
)
PARTITION BY _PARTITIONDATE
OPTIONS(
  expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC",
  partition_expiration_days=1,
  description="a table that expires in 2025, with each partition living for 24 hours",
  labels=[("org_unit", "development")]
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.newtable`, your table qualifier might be
`` `myproject.mydataset.newtable` ``.

If the table name exists in the dataset, the following error is returned:

`Already Exists: project_id:dataset.table`

The table uses the following `partition_expression` to partition the table:
`PARTITION BY _PARTITIONDATE`. This expression partitions the table using
the date in the `_PARTITIONDATE` pseudocolumn.

The table schema contains two columns:

- **x:** An integer, with description "An optional INTEGER field"
- **y:** A STRUCT containing two columns:

  - **a:** An array of strings, with description "A repeated STRING field"
  - **b:** A boolean

  > [!NOTE]
  > **Note:** When you examine the table schema in the Google Cloud console, a STRUCT is displayed as a RECORD column, and an ARRAY is displayed as a REPEATED column. The STRUCT and ARRAY data types are used to create nested and repeated data in BigQuery. For more information, see [Specifying nested and repeated fields](https://docs.cloud.google.com/bigquery/docs/nested-repeated).

The table option list specifies the:

- **Table expiration time:** January 1, 2025 at 00:00:00 UTC
- **Partition expiration time:** 1 day
- **Description:** `A table that expires in 2025`
- **Label:** `org_unit = development`

##### Creating a new table from an existing table

The following example creates a table named `top_words` in `mydataset` from a
query:

```googlesql
CREATE TABLE mydataset.top_words
OPTIONS(
  description="Top ten words per Shakespeare corpus"
) AS
SELECT
  corpus,
  ARRAY_AGG(STRUCT(word, word_count) ORDER BY word_count DESC LIMIT 10) AS top_words
FROM `bigquery-public-data`.samples.shakespeare
GROUP BY corpus;
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.top_words`, your table qualifier might be
`` `myproject.mydataset.top_words` ``.

If the table name exists in the dataset, the following error is returned:

`Already Exists: project_id:dataset.table`

The table schema contains 2 columns:

- **corpus:** Name of a Shakespeare corpus
- **top_words:** An `ARRAY` of `STRUCT`s containing 2 fields:
  `word` (a `STRING`) and `word_count` (an `INT64` with the word count)

  > [!NOTE]
  > **Note:** When you examine the table schema in the Google Cloud console, a STRUCT is displayed as a RECORD column, and an ARRAY is displayed as a REPEATED column. The STRUCT and ARRAY data types are used to create nested and repeated data in BigQuery. For more information, see [Specifying nested and repeated fields](https://docs.cloud.google.com/bigquery/docs/nested-repeated).

The table option list specifies the:

- **Description:** `Top ten words per Shakespeare corpus`

##### Creating a table only if the table doesn't exist

The following example creates a table named `newtable` in `mydataset` only if no
table named `newtable` exists in `mydataset`. If the table name exists in the
dataset, no error is returned, and no action is taken.

```googlesql
CREATE TABLE IF NOT EXISTS mydataset.newtable (x INT64, y STRUCT <a ARRAY <STRING>, b BOOL>)
OPTIONS(
  expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC",
  description="a table that expires in 2025",
  labels=[("org_unit", "development")]
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.newtable`, your table qualifier might be
`` `myproject.mydataset.newtable` ``.

The table schema contains 2 columns:

- **x:** An integer
- **y:** A STRUCT containing a (an array of strings) and b (a
  boolean)

  > [!NOTE]
  > **Note:** When you examine the table schema in the Google Cloud console, a STRUCT is displayed as a RECORD, and an ARRAY is displayed as REPEATED. The STRUCT and ARRAY data types are used to create nested and repeated data in BigQuery. For more information, see [Specifying nested and repeated fields](https://docs.cloud.google.com/bigquery/docs/nested-repeated).

The table option list specifies the:

- **Expiration time:** January 1, 2025 at 00:00:00 UTC
- **Description:** `A table that expires in 2025`
- **Label:** `org_unit = development`

##### Creating or replacing a table

The following example creates a table named `newtable` in `mydataset`, and if
`newtable` exists in `mydataset`, it is overwritten with an empty table.

```googlesql
CREATE OR REPLACE TABLE mydataset.newtable (x INT64, y STRUCT <a ARRAY <STRING>, b BOOL>)
OPTIONS(
  expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC",
  description="a table that expires in 2025",
  labels=[("org_unit", "development")]
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.newtable`, your table qualifier might be
`` `myproject.mydataset.newtable` ``.

The table schema contains 2 columns:

- **x:** An integer
- **y:** A STRUCT containing a (an array of strings) and b (a
  boolean)

  > [!NOTE]
  > **Note:** When you examine the table schema in the Google Cloud console, a STRUCT is displayed as a RECORD, and an ARRAY is displayed as REPEATED. The STRUCT and ARRAY data types are used to create nested and repeated data in BigQuery. For more information, see [Specifying nested and repeated fields](https://docs.cloud.google.com/bigquery/docs/nested-repeated).

The table option list specifies the:

- **Expiration time:** January 1, 2025 at 00:00:00 UTC
- **Description:** `A table that expires in 2025`
- **Label:** `org_unit = development`

##### Creating a table with `REQUIRED` columns

The following example creates a table named `newtable` in `mydataset`. The `NOT
NULL` modifier in the column definition list of a `CREATE TABLE` statement
specifies that a column or field is created in `REQUIRED` mode.

```googlesql
CREATE TABLE mydataset.newtable (
  x INT64 NOT NULL,
  y STRUCT <
    a ARRAY <STRING>,
    b BOOL NOT NULL,
    c FLOAT64
  > NOT NULL,
  z STRING
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.newtable`, your table qualifier might be
`` `myproject.mydataset.newtable` ``.

If the table name exists in the dataset, the following error is returned:

`Already Exists: project_id:dataset.table`

The table schema contains 3 columns:

- **x:** A `REQUIRED` integer
- **y:** A `REQUIRED` STRUCT containing a (an array of strings), b (a `REQUIRED` boolean), and c (a `NULLABLE` float)
- **z:** A `NULLABLE` string

  > [!NOTE]
  > **Note:** When you examine the table schema in the Google Cloud console, a STRUCT is displayed as a RECORD, and an ARRAY is displayed as REPEATED. The STRUCT and ARRAY data types are used to create nested and repeated data in BigQuery. For more information, see [Specifying nested and repeated fields](https://docs.cloud.google.com/bigquery/docs/nested-repeated).

##### Creating a table with collation support

The following examples create a table named `newtable` in `mydataset` with
columns `a`, `b`, `c`, and a struct with fields `x` and `y`.

All `STRING` column schemas in this table are collated with `'und:ci'`:

Adapted (not in the official docs): added the comma between the struct fields `x` and `y`.

```googlesql
CREATE TABLE mydataset.newtable (
  a STRING,
  b STRING,
  c STRUCT <
    x FLOAT64,
    y ARRAY <STRING>
  >
)
DEFAULT COLLATE 'und:ci';
```

Only `b` and `y` are collated with `'und:ci'`:

Adapted (not in the official docs): added the comma between the struct fields `x` and `y`.

```googlesql
CREATE TABLE mydataset.newtable (
  a STRING,
  b STRING COLLATE 'und:ci',
  c STRUCT <
    x FLOAT64,
    y ARRAY <STRING COLLATE 'und:ci'>
  >
);
```

##### Creating a table with parameterized data types

The following example creates a table named `newtable` in `mydataset`. The
parameters in parentheses specify that the column contains a parameterized data
type. See [Parameterized Data Types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#parameterized_data_types)
for more information about parameterized types.

```googlesql
CREATE TABLE mydataset.newtable (
  x STRING(10),
  y STRUCT <
    a ARRAY <BYTES(5)>,
    b NUMERIC(15, 2) OPTIONS(rounding_mode = 'ROUND_HALF_EVEN'),
    c FLOAT64
  >,
  z BIGNUMERIC(35)
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. Instead of
`mydataset.newtable`, your table qualifier should be
`` `myproject.mydataset.newtable` ``.

If the table name exists in the dataset, the following error is returned:

`Already Exists: project_id:dataset.table`

The table schema contains 3 columns:

- **x:** A parameterized string with a maximum length of 10
- **y:** A STRUCT containing a (an array of parameterized bytes with a maximum length of 5), b (a parameterized NUMERIC with a maximum precision of 15, maximum scale of 2, and rounding mode set to 'ROUND_HALF_EVEN'), and c (a float)
- **z:** A parameterized BIGNUMERIC with a maximum precision of 35 and maximum scale of 0

##### Creating a partitioned table

The following example creates a
[partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#date_timestamp_partitioned_tables)
named `newtable` in `mydataset` using a `DATE` column:

```googlesql
CREATE TABLE mydataset.newtable (transaction_id INT64, transaction_date DATE)
PARTITION BY transaction_date
OPTIONS(
  partition_expiration_days=3,
  description="a table partitioned by transaction_date"
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.newtable`, your table qualifier might be
`` `myproject.mydataset.newtable` ``.

The table schema contains 2 columns:

- **transaction_id:** An integer
- **transaction_date:** A date

The table option list specifies the:

- **Partition expiration:** Three days
- **Description:** `A table partitioned by transaction_date`

##### Creating a partitioned table from the result of a query

The following example creates a
[partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#date_timestamp_partitioned_tables)
named `days_with_rain` in `mydataset` using a `DATE` column:

```googlesql
CREATE TABLE mydataset.days_with_rain
PARTITION BY date
OPTIONS (
  partition_expiration_days=365,
  description="weather stations with precipitation, partitioned by day"
) AS
SELECT
  DATE(CAST(year AS INT64), CAST(mo AS INT64), CAST(da AS INT64)) AS date,
  (SELECT ANY_VALUE(name) FROM `bigquery-public-data.noaa_gsod.stations` AS stations
   WHERE stations.usaf = stn) AS station_name,  -- Stations can have multiple names
  prcp
FROM `bigquery-public-data.noaa_gsod.gsod2017` AS weather
WHERE prcp != 99.9  -- Filter unknown values
  AND prcp > 0      -- Filter stations/days with no precipitation
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id`
contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.days_with_rain`, your table qualifier might be
`` `myproject.mydataset.days_with_rain` ``.

The table schema contains 3 columns:

- **date:** The `DATE` of data collection
- **station_name:** The name of the weather station as a `STRING`
- **prcp:** The amount of precipitation in inches as a `FLOAT64`

The table option list specifies the:

- **Partition expiration:** One year
- **Description:** `Weather stations with precipitation, partitioned by day`

##### Creating a clustered table

###### Example 1

The following example creates a
[clustered table](https://docs.cloud.google.com/bigquery/docs/clustered-tables)
named `myclusteredtable` in `mydataset`. The table is a [partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables),
partitioned by a truncated `TIMESTAMP` column and clustered by a `STRING` column
named `customer_id`.

```googlesql
CREATE TABLE mydataset.myclusteredtable
(
  input_timestamp TIMESTAMP,
  customer_id STRING,
  transaction_amount NUMERIC
)
PARTITION BY TIMESTAMP_TRUNC(input_timestamp, HOUR)
CLUSTER BY customer_id
OPTIONS (
  partition_expiration_days=3,
  description="a table clustered by customer_id"
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id` contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.myclusteredtable`, your table qualifier might be
`` `myproject.mydataset.myclusteredtable` ``.

The table schema contains 3 columns:

- **input_timestamp:** The time of data collection as a `TIMESTAMP`
- **customer_id:** The customer ID as a `STRING`
- **transaction_amount:** The transaction amount as `NUMERIC`

The table option list specifies the:

- **Partition expiration:** 3 days
- **Description:** `A table clustered by customer_id`

###### Example 2

The following example creates a
[clustered table](https://docs.cloud.google.com/bigquery/docs/clustered-tables)
named `myclusteredtable` in `mydataset`. The table is an
[ingestion-time partitioned table](https://docs.cloud.google.com/bigquery/docs/creating-partitioned-tables).

```googlesql
CREATE TABLE mydataset.myclusteredtable
(
  customer_id STRING,
  transaction_amount NUMERIC
)
PARTITION BY DATE(_PARTITIONTIME)
CLUSTER BY
  customer_id
OPTIONS (
  partition_expiration_days=3,
  description="a table clustered by customer_id"
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id` contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.myclusteredtable`, your table qualifier might be
`` `myproject.mydataset.myclusteredtable` ``.

The table schema contains 2 columns:

- **customer_id:** The customer ID as a `STRING`
- **transaction_amount:** The transaction amount as `NUMERIC`

The table option list specifies the:

- **Partition expiration:** 3 days
- **Description:** `A table clustered by customer_id`

###### Example 3

The following example creates a
[clustered table](https://docs.cloud.google.com/bigquery/docs/clustered-tables)
named `myclusteredtable` in `mydataset`. The table is not partitioned.

```googlesql
CREATE TABLE mydataset.myclusteredtable
(
  customer_id STRING,
  transaction_amount NUMERIC
)
CLUSTER BY
  customer_id
OPTIONS (
  description="a table clustered by customer_id"
)
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id` contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.myclusteredtable`, your table qualifier might be
`` `myproject.mydataset.myclusteredtable` ``.

The table schema contains 2 columns:

- **customer_id:** The customer ID as a `STRING`
- **transaction_amount:** The transaction amount as `NUMERIC`

The table option list specifies the:

- **Description:** `A table clustered by customer_id`

##### Creating a table with autonomous embedding generation

The following example creates a table named `embedded_table` in `mydataset` with
an [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
column `embedding` that generates embeddings from `content` column:

```googlesql
CREATE TABLE mydataset.embedded_table (
  id INT64,
  content STRING,
  embedding STRUCT<result ARRAY<FLOAT64>, status STRING>
    GENERATED ALWAYS AS (
      AI.EMBED(
        content,
        connection_id => "US.embed_connection",
        endpoint => "text-embedding-005")
    )
    STORED OPTIONS (asynchronous = true)
);
```

##### Creating a clustered table from the result of a query

###### Example 1

The following example creates a partitioned and
[clustered table](https://docs.cloud.google.com/bigquery/docs/clustered-tables)
named `myclusteredtable` in `mydataset` using the result of a query.

```googlesql
CREATE TABLE mydataset.myclusteredtable
(
  input_timestamp TIMESTAMP,
  customer_id STRING,
  transaction_amount NUMERIC
)
PARTITION BY DATE(input_timestamp)
CLUSTER BY
  customer_id
OPTIONS (
  partition_expiration_days=3,
  description="a table clustered by customer_id"
)
AS SELECT * FROM mydataset.myothertable
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id` contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.myclusteredtable`, your table qualifier might be
`` `myproject.mydataset.myclusteredtable` ``.

The table schema contains 3 columns:

- **input_timestamp:** The time of data collection as a `TIMESTAMP`
- **customer_id:** The customer ID as a `STRING`
- **transaction_amount:** The transaction amount as `NUMERIC`

The table option list specifies the:

- **Partition expiration:** 3 days
- **Description:** `A table clustered by customer_id`

###### Example 2

The following example creates a
[clustered table](https://docs.cloud.google.com/bigquery/docs/clustered-tables)
named `myclusteredtable` in `mydataset` using the result of a query. The table
is not partitioned.

```googlesql
CREATE TABLE mydataset.myclusteredtable
(
  customer_id STRING,
  transaction_amount NUMERIC
)
CLUSTER BY
  customer_id
OPTIONS (
  description="a table clustered by customer_id"
)
AS SELECT * FROM mydataset.myothertable
```

If you haven't configured a default project, prepend a project ID to the dataset
name in the example SQL, and enclose the name in backticks if `project_id` contains special characters:
`` `project_id.dataset.table` ``. So, instead of
`mydataset.myclusteredtable`, your table qualifier might be
`` `myproject.mydataset.myclusteredtable` ``.

The table schema contains 2 columns:

- **customer_id:** The customer ID as a `STRING`
- **transaction_amount:** The transaction amount as `NUMERIC`

The table option list specifies the:

- **Description:** `A table clustered by customer_id`

##### Creating a table with autonomous embedding generation

The following example creates a table named `embedded_table` in `mydataset` with
an [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
column `embedding` that generates embeddings from `content` column:

```googlesql
CREATE TABLE mydataset.embedded_table (
  id INT64,
  content STRING,
  embedding STRUCT<result ARRAY<FLOAT64>, status STRING>
    GENERATED ALWAYS AS (
      AI.EMBED(
        content,
        connection_id => "US.embed_connection",
        endpoint => "text-embedding-005")
    )
    STORED OPTIONS (asynchronous = true)
);
```

##### Creating a table with an identity column

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

The following example creates a table that contains an identity column called
`id`. The ID values start at 0 and increment by at least 2. Because `ALWAYS`
is specified, you can't insert your own values into the `id` column. It can
only contain system-generated values.

```googlesql
CREATE TABLE mydataset.identity_table (
  name STRING,
  id INT64 GENERATED ALWAYS AS IDENTITY(START WITH 0 INCREMENT BY 2)
);
```

##### Creating a temporary table

The following example creates a temporary table named `Example` and inserts
values into it.

```googlesql
CREATE TEMP TABLE Example
(
  x INT64,
  y STRING
);

INSERT INTO Example
VALUES (5, 'foo');

INSERT INTO Example
VALUES (6, 'bar');

SELECT *
FROM Example;
```

This script returns the following output:

```googlesql
+-----+---+-----+
| Row | x | y   |
+-----+---|-----+
| 1   | 5 | foo |
| 2   | 6 | bar |
+-----+---|-----+
```

##### Load data across clouds

##### Example 1

Suppose you have a BigLake table named `myawsdataset.orders` that
references data from [Amazon S3](https://docs.cloud.google.com/bigquery/docs/omni-aws-create-external-table).
You want to transfer data from that table to a
BigQuery table `myotherdataset.shipments` in the US multi-region.

First, display information about the `myawsdataset.orders` table:

```bash
    bq show myawsdataset.orders;
```

The output is similar to the following:

```text
  Last modified             Schema              Type     Total URIs   Expiration
----------------- -------------------------- ---------- ------------ -----------
  31 Oct 17:40:28   |- l_orderkey: integer     EXTERNAL   1
                    |- l_partkey: integer
                    |- l_suppkey: integer
                    |- l_linenumber: integer
                    |- l_returnflag: string
                    |- l_linestatus: string
                    |- l_commitdate: date
```

Next, display information about the `myotherdataset.shipments` table:

```bash
  bq show myotherdataset.shipments
```

The output is similar to the following. Some columns are omitted to simplify the
output.

```text
  Last modified             Schema             Total Rows   Total Bytes   Expiration   Time Partitioning   Clustered Fields   Total Logical
 ----------------- --------------------------- ------------ ------------- ------------ ------------------- ------------------ ---------------
  31 Oct 17:34:31   |- l_orderkey: integer      3086653      210767042                                                         210767042
                    |- l_partkey: integer
                    |- l_suppkey: integer
                    |- l_commitdate: date
                    |- l_shipdate: date
                    |- l_receiptdate: date
                    |- l_shipinstruct: string
                    |- l_shipmode: string
```

Now, using the `CREATE TABLE AS SELECT` statement you can selectively load data
to the `myotherdataset.orders` table in the US multi-region:

```googlesql
CREATE OR REPLACE TABLE
  myotherdataset.orders
  PARTITION BY DATE_TRUNC(l_commitdate, YEAR) AS
SELECT
  *
FROM
  myawsdataset.orders
WHERE
  EXTRACT(YEAR FROM l_commitdate) = 1992;
```

> [!NOTE]
> **Note:** If you get a `ResourceExhausted` error, retry after some time. If the issue persists, you can [contact support](https://docs.cloud.google.com/bigquery/docs/getting-support).

You can then perform a join operation with the newly created table:

```googlesql
SELECT
  orders.l_orderkey,
  orders.l_orderkey,
  orders.l_suppkey,
  orders.l_commitdate,
  orders.l_returnflag,
  shipments.l_shipmode,
  shipments.l_shipinstruct
FROM
  myotherdataset.shipments
JOIN
  `myotherdataset.orders` as orders
ON
  orders.l_orderkey = shipments.l_orderkey
AND orders.l_partkey = shipments.l_partkey
AND orders.l_suppkey = shipments.l_suppkey
WHERE orders.l_returnflag = 'R'; -- 'R' means refunded.
```

When new data is available, append the data of the 1993 year to the destination
table using the `INSERT INTO SELECT` statement:

```googlesql
INSERT INTO
   myotherdataset.orders
 SELECT
   *
 FROM
   myawsdataset.orders
 WHERE
   EXTRACT(YEAR FROM l_commitdate) = 1993;
```

##### Example 2

The following example inserts data into an ingestion-time partitioned table:

```googlesql
CREATE TABLE
 mydataset.orders(id String, numeric_id INT64)
PARTITION BY _PARTITIONDATE;
```

After creating a partitioned table, you can insert data into the ingestion-time
partitioned table:

```googlesql
INSERT INTO
 mydataset.orders(
   _PARTITIONTIME,
   id,
   numeric_id)
SELECT
 TIMESTAMP("2023-01-01"),
 id,
 numeric_id,
FROM
 mydataset.ordersof23
WHERE
 numeric_id > 4000000;
```

### `CREATE TABLE LIKE` statement

Creates a new table with all of the same metadata of another table.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] TABLE [ IF NOT EXISTS ]
table_name
LIKE [[project_name.]dataset_name.]source_table_name
...
[OPTIONS(table_option_list)]
```

#### Details

This statement is a variant of the `CREATE TABLE` statement and has the same
[limitations](#details-1).
Other than the use of the `LIKE` clause in place of a column list,
the syntax is identical to the `CREATE TABLE` syntax.

The `CREATE TABLE LIKE` statement copies only the metadata of the source table.
You can use the `AS query_statement` clause to include data into the new table.

The new table has no relationship to the source table after creation; thus
modifications to the source table will not propagate to the new table.

By default, the new table inherits partitioning, clustering, and options
metadata from the source table. You can customize metadata in the new table by
using the optional clauses in the SQL statement. For example, if you want to
specify a different set of options for the new table, then include the `OPTIONS`
clause with a list of options and values. This behavior matches that of
`ALTER TABLE SET OPTIONS`.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the table. |
| `bigquery.tables.get` | The source table. |

In addition, the `OR REPLACE` clause requires `bigquery.tables.update` and
`bigquery.tables.updateData` permissions.

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Example 1

The following example creates a new table named `newtable` in
`mydataset` with the same metadata as `sourcetable`:

```googlesql
CREATE TABLE mydataset.newtable
LIKE mydataset.sourcetable
```

##### Example 2

The following example creates a new table named `newtable` in
`mydataset` with the same metadata as `sourcetable` and the data from the
`SELECT` statement:

```googlesql
CREATE TABLE mydataset.newtable
LIKE mydataset.sourcetable
AS SELECT * FROM mydataset.myothertable
```

### `CREATE TABLE COPY` statement

Creates a table that has the same metadata and data as another table.
The source table can be a table, a
[table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro), or a
[table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro).

#### Syntax

```googlesql
CREATE [ OR REPLACE ] TABLE [ IF NOT EXISTS ] table_name
COPY source_table_name
...
[OPTIONS(table_option_list)]
```

#### Details

This statement is a variant of the `CREATE TABLE` statement and has the same
[limitations](#details-1).
Other than the use of the `COPY` clause in place of a column list,
the syntax is identical to the `CREATE TABLE` syntax.

The `CREATE TABLE COPY` statement copies both the metadata and data from the
source table.

The new table inherits partitioning and clustering from the source table. By
default, the table options metadata from the source table are also inherited,
but you can override table options by using the `OPTIONS` clause. The behavior
is equivalent to running `ALTER TABLE SET OPTIONS` after the table is copied.

The new table has no relationship to the source table after creation;
modifications to the source table are not propagated to the new table.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the table copy. |
| `bigquery.tables.get` | The source table. |
| `bigquery.tables.getData` | The source table. |

In addition, the `OR REPLACE` clause requires `bigquery.tables.update` and
`bigquery.tables.updateData` permissions.

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

### `CREATE SNAPSHOT TABLE` statement

Creates a [table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro) based on a
source table. The source table can be a table, a
[table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro), or
a table snapshot.

#### Syntax

```googlesql
CREATE SNAPSHOT TABLE [ IF NOT EXISTS ] table_snapshot_name
CLONE source_table_name
[FOR SYSTEM_TIME AS OF time_expression]
[OPTIONS(snapshot_option_list)]
```

#### Arguments

- `IF NOT EXISTS`: If a table snapshot or other
  [table resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type)
  exists with the same name, the `CREATE` statement has no effect.

- `table_snapshot_name`: The name of the table snapshot that you want to create.
  The table snapshot name must be unique per dataset. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- `source_table_name`: The name of the table that you want to snapshot or the
  table snapshot that you want to copy. See [Table path syntax](data-definition-language-4.md#table-path-syntax).

  If the source table is a standard table, then BigQuery creates
  a table snapshot of the source table. If the source table is a table snapshot,
  then BigQuery creates a copy of the table snapshot.
- [`FOR SYSTEM_TIME AS OF`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#for_system_time_as_of):
  Lets you select the version of the table that was current at the time
  specified by `time_expression`. It can only be used when creating a
  snapshot of a table; it can't be used when making a copy of a table snapshot.

- [`snapshot_option_list`](#snapshot_option_list): Additional table snapshot
  creation options such as a [label](https://docs.cloud.google.com/bigquery/docs/labels) and an expiration
  time.

#### Details

`CREATE SNAPSHOT TABLE` statements must comply with the following rules:

- Only one `CREATE` statement is allowed.
- The source table must be one of the following:
  - A table
  - A table clone
  - A table snapshot
- The `FOR SYSTEM_TIME AS OF` clause can only be used when creating a snapshot of a table or table clone; it can't be used when making a copy of a table snapshot.

#### `snapshot_option_list`

The option list lets you set table snapshot options such as a
[label](https://docs.cloud.google.com/bigquery/docs/labels) and an expiration time. You can include multiple
options using a comma-separated list.

Specify a table snapshot option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `expiration_timestamp` | `TIMESTAMP` | Example: `expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC"` This property is equivalent to the [`expirationTime`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.expiration_time) table resource property. |
| `friendly_name` | `STRING` | Example: `friendly_name="my_table_snapshot"` This property is equivalent to the [`friendlyName`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.friendly_name) table resource property. |
| `description` | `STRING` | Example: `description="A table snapshot that expires in 2025"` This property is equivalent to the [`description`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.description) table resource property. |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | Example: `labels=[("org_unit", "development")]` This property is equivalent to the [`labels`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.labels) table resource property. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

`VALUE` is a constant expression that contains only literals, query parameters,
and scalar functions.

The constant expression cannot contain:

- A reference to a table
- Subqueries or SQL statements such as `SELECT`, `CREATE`, and `UPDATE`
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

If `VALUE` evaluates to `NULL`, the corresponding option `NAME` in the
`CREATE SNAPSHOT TABLE` statement is ignored.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the table snapshot. |
| `bigquery.tables.createSnapshot` | The source table. |
| `bigquery.tables.get` | The source table. |
| `bigquery.tables.getData` | The source table. |

#### Examples

##### Create a table snapshot: fail if it already exists

The following example creates a table snapshot of the table
`myproject.mydataset.mytable`. The table snapshot is created in the dataset
`mydataset` and is named `mytablesnapshot`:

```googlesql
CREATE SNAPSHOT TABLE `myproject.mydataset.mytablesnapshot`
CLONE `myproject.mydataset.mytable`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="my_table_snapshot",
  description="A table snapshot that expires in 2 days",
  labels=[("org_unit", "development")]
)
```

If the table snapshot name already exists in the dataset, then the following
error is returned:

`Already Exists: myproject.mydataset.mytablesnapshot`

The table snapshot option list specifies the following:

- **Expiration time:** 48 hours after the time the table snapshot is created
- **Friendly name:** `my_table_snapshot`
- **Description:** `A table snapshot that expires in 2 days`
- **Label:** `org_unit = development`

##### Create a table snapshot: ignore if it already exists

The following example creates a table snapshot of the table
`myproject.mydataset.mytable`. The table snapshot is created in the dataset
`mydataset` and is named `mytablesnapshot`:

Adapted (not in the official docs): added the missing comma between the `description` and `labels` options.

```googlesql
CREATE SNAPSHOT TABLE IF NOT EXISTS `myproject.mydataset.mytablesnapshot`
CLONE `myproject.mydataset.mytable`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="my_table_snapshot",
  description="A table snapshot that expires in 2 days",
  labels=[("org_unit", "development")]
)
```

The table snapshot option list specifies the following:

- **Expiration time:** 48 hours after the time the table snapshot is created
- **Friendly name:** `my_table_snapshot`
- **Description:** `A table snapshot that expires in 2 days`
- **Label:** `org_unit = development`

If the table snapshot name already
exists in the dataset, then no action is taken, and no error is returned.

For information about restoring table snapshots, see
[`CREATE TABLE CLONE`](#create-table-clone-statement).

For information about removing table snapshots, see
[`DROP SNAPSHOT TABLE`](data-definition-language-4.md#drop-snapshot-table-statement).

### `CREATE TABLE CLONE` statement

Creates a [table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro) based on a source
table. The source table can be a table, a table clone,
or a [table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro).

#### Syntax

```googlesql
CREATE TABLE [ IF NOT EXISTS ]
destination_table_name
CLONE source_table_name [FOR SYSTEM_TIME AS OF time_expression]
...
[OPTIONS(table_option_list)]
```

#### Details

Other than the use of the `CLONE` clause in place of a column list, the syntax
is identical to the `CREATE TABLE` syntax.

#### Arguments

- `IF NOT EXISTS`: If the specified destination table name already exists, the
  `CREATE` statement has no effect.

- `destination_table_name`: The name of the table that you want to create.
  The table name must
  be unique per dataset. The table name can contain the following:

  - Up to 1,024 characters
  - Letters (upper or lower case), numbers, and underscores
- `OPTIONS(table_option_list)`: Lets you specify
  additional table creation options such as a [label](https://docs.cloud.google.com/bigquery/docs/labels) and
  an expiration time.

- `source_table_name`: The name of the source table.

`CREATE TABLE CLONE` statements must comply with the following rules:

- Only one `CREATE` statement is allowed.
- The table that is being cloned must be a table, a table clone, or a table snapshot.

#### `OPTIONS`

`CREATE TABLE CLONE` options are the same as
[`CREATE TABLE` options](#table_option_list).

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the table clone. |
| `bigquery.tables.get` | The source table. |
| `bigquery.tables.getData` | The source table. |
| `bigquery.tables.restoreSnapshot` | The source table (required only if the source table is a table snapshot). |

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Restore a table snapshot: fail if destination table already exists

The following example creates the table
`myproject.mydataset.mytable` from the table snapshot
`myproject.mydataset.mytablesnapshot`:

```googlesql
CREATE TABLE `myproject.mydataset.mytable`
CLONE `myproject.mydataset.mytablesnapshot`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 365 DAY),
  friendly_name="my_table",
  description="A table that expires in 1 year",
  labels=[("org_unit", "development")]
)
```

If the table name exists in the dataset, then the following error is
returned:

`Already Exists: myproject.mydataset.mytable.`

The table option list specifies the following:

- **Expiration time:** 365 days after the time that the table is created
- **Friendly name:** `my_table`
- **Description:** `A table that expires in 1 year`
- **Label:** `org_unit = development`

##### Create a clone of a table: ignore if the destination table already exists

The following example creates the table clone
`myproject.mydataset.mytableclone` based on the table
`myproject.mydataset.mytable`:

```googlesql
CREATE TABLE IF NOT EXISTS `myproject.mydataset.mytableclone`
CLONE `myproject.mydataset.mytable`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 365 DAY),
  friendly_name="my_table",
  description="A table that expires in 1 year",
  labels=[("org_unit", "development")]
)
```

The table option list specifies the following:

- **Expiration time:** 365 days after the time the table is created
- **Friendly name:** `my_table`
- **Description:** `A table that expires in 1 year`
- **Label:** `org_unit = development`

If the table name exists in the dataset, then no action is taken, and no error
is returned.

For information about creating a copy of a table, see
[`CREATE TABLE COPY`](#create-table-copy-statement).

For information about creating a snapshot of a table, see
[`CREATE SNAPSHOT TABLE`](#create-snapshot-table-statement).

### `CREATE VIEW` statement

Creates a new view.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] VIEW [ IF NOT EXISTS ] view_name
[(view_column_name_list)]
[OPTIONS(view_option_list)]
AS query_expression

view_column_name_list :=
  view_column[, ...]

view_column :=
  column_name [OPTIONS(view_column_option_list)]
```

#### Arguments

- `OR REPLACE`: Replaces any view with the same name if it exists. Cannot
  appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If a view or other
  [table resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type)
  exists with the same name, the `CREATE` statement has no effect. Cannot appear
  with `OR REPLACE`.

- `view_name`: The name of the view you're creating. See
  [Table path syntax](data-definition-language-4.md#table-path-syntax).

- [`view_column_name_list`](#view_column_name_list): Lets you explicitly
  specify the column names of the view, which may be aliases to the column names
  in the underlying SQL query.

- [`view_option_list`](#view_option_list): Additional view creation options
  such as a [label](https://docs.cloud.google.com/bigquery/docs/labels) and an expiration time.

- `query_expression`: The GoogleSQL query expression used to define the
  view.

#### Details

`CREATE VIEW` statements must comply with the following rules:

- Only one `CREATE` statement is allowed.

#### `view_column_name_list`

The view's column name list is optional. The names must be unique but do not have to be the same as the column names of the underlying SQL query. For example, if your view is created with the following statement:

```googlesql
CREATE VIEW mydataset.age_groups(age, count) AS SELECT age, COUNT(*)
FROM mydataset.people
group by age;
```

Then you can query it with:

```googlesql
SELECT age, count from mydataset.age_groups;
```

The number of columns in the column name list must match the number of columns in the underlying SQL query. If the columns in the table of the underlying SQL query is added or dropped, the view becomes invalid and must be recreated. For example, if the `age` column is dropped from the `mydataset.people` table, then the view created in the previous example becomes invalid.

#### `view_column_option_list`

The `view_column_option_list` lets you specify optional top-level column
options. Column options for a view have the same syntax and requirements as
for a table, but with a different list of `NAME` and `VALUE` fields:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | Example: `description="a unique id"` |

#### `view_option_list`

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
| `privacy_policy` | `JSON-formatted STRING` | The policies to enforce when anyone queries the view. To learn more about the policies available for a view, see the [`privacy_policy`](#privacy_policy) view option. > [!NOTE] > **Note:** Time travel is disabled on any view that has an analysis rule. |
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

If `VALUE` evaluates to `NULL`, the corresponding option `NAME` in the
`CREATE VIEW` statement is ignored.

#### `privacy_policy`

The following policies are available in the
[`privacy_policy` view option](#view_option_list)
to create [analysis rules](https://docs.cloud.google.com/bigquery/docs/analysis-rules). A policy represents
a condition that needs to be met before a query can be run.

| Policy | Details |
|---|---|
| `aggregation_threshold_policy` | The aggregation threshold policy to enforce when a view is queried. Syntax: ``` '{ "aggregation_threshold_policy": { "threshold": value, "privacy_unit_columns": value } }' ``` Parameters: - `aggregation_threshold_policy`: An aggregation threshold policy for the view. When this parameter is included, a minimum number of distinct entities must be present in a set of data in the view. - `threshold`: The minimum number of distinct privacy units (privacy unit column values) that need to contribute to each row in the query results. If a potential row doesn't satisfy this threshold, that row is omitted from the query results. `value` is a positive JSON integer. - `privacy_unit_columns`: The columns that represents the privacy unit columns in a view. At this time, a view can have only one privacy unit column. `value` is a JSON string. Example: ` privacy_policy='{"aggregation_threshold_policy": {"threshold" : 50, "privacy_unit_columns": "ID"}}' ` |
| `differential_privacy_policy` | A differential privacy policy for the view. When this parameter is included, only differentially private queries can be run on the view. Syntax: ``` '{ "differential_privacy_policy": { "privacy_unit_column": value, "max_epsilon_per_query": value, "epsilon_budget": value, "delta_per_query": value, "delta_budget": value, "max_groups_contributed": value } }' ``` Parameters: - `differential_privacy_policy`: The differential privacy policy for the view. - `privacy_unit_column`: The column that represents the privacy unit column for differentially private queries on the view. `value` is a JSON string. - `max_epsilon_per_query`: The maximum amount of epsilon that can be specified for a differentially private query on the view. `value` is a JSON number from 0.001 to 1e+15. - `epsilon_budget`: The amount of epsilon that can be used in totality for all differentially private queries on the view. `value` is JSON number from 0.001 to 1e+15. - `delta_per_query`: The maximum amount of delta that can be specified for a differentially private query on the view. `value` is a JSON number from 1e-15 to 1. - `delta_budget`: The amount of delta that can be used in totality for all differentially private queries on the view. The budget must be larger than the delta for any differentially private query on the view. `value` is a JSON number from 1e-15 to \`1000\`. - `max_groups_contributed`: The maximum number of groups to which each protected entity can contribute in a differentially private query. `value` is a non-negative JSON integer. Example: ` privacy_policy='{"differential_privacy_policy": { "privacy_unit_column": "contributor_id", "max_epsilon_per_query": 0.01, "epsilon_budget": 25.6, "delta_per_query": 0.005, "delta_budget": 9.6, "max_groups_contributed": 2}}' ` |
| `join_restriction_policy` | A join restriction policy for the view. When this parameter is included, only the specified joins can be run on the specified columns in the view. This policy can be used alone or with other policies, such as the aggregation threshold or differential privacy policy. Syntax: ``` '{ "join_restriction_policy": { "join_condition": value, "join_allowed_columns": value } }' ``` Parameters: - `join_restriction_policy`: The join restriction policy for the view. - `join_condition`: The type of join condition to enforce on the view. `value` can be one of the following JSON strings: - `JOIN_ALL`: All columns in `join_allowed_columns` must be inner joined upon for this view to be queried. - `JOIN_ANY`: At least one column in `join_allowed_columns` must be joined upon for this view to be queried. - `JOIN_BLOCKED`: This view can't be joined along any column. Don't set `join_allowed_columns` in this case. This can be used with all analysis rules except for the [list overlap analysis rule](https://docs.cloud.google.com/bigquery/docs/analysis-rules#list_overlap_rules). - `JOIN_NOT_REQUIRED`: A join is not required to query this view. If a join is used, only the columns in `join_allowed_columns` can be used. This can be used with all analysis rules except for the [list overlap analysis rule](https://docs.cloud.google.com/bigquery/docs/analysis-rules#list_overlap_rules). - `join_allowed_columns`: A list of columns that can be part of a join operation. `value` is a JSON array. Example: ` privacy_policy='{"join_restriction_policy": { "join_condition": "JOIN_ANY", "join_allowed_columns": ["col1", "col2"]}}' ` |

> [!NOTE]
> **Note:** Time travel is disabled on any view that has a policy.

#### Default project in view body

If the view is created in the same project used to run the `CREATE VIEW`
statement, the view body `query_expression` can reference entities without
specifying the project; the default project is the project
which owns the view. Consider the sample query below.

```googlesql
CREATE VIEW myProject.myDataset.myView AS SELECT * FROM anotherDataset.myTable;
```

After running the above `CREATE VIEW` query in the project `myProject`, you can
run the query `SELECT * FROM myProject.myDataset.myView`. Regardless of the project you
choose to run this `SELECT` query, the referenced table `anotherDataset.myTable`
is always resolved against project `myProject`.

If the view is not created in the same project used to run the `CREATE VIEW`
statement, then all references in the view body `query_expression` must be
qualified with project IDs. For instance, the preceding sample `CREATE VIEW` query
is invalid if it runs in a project different from `myProject`.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the view. |

In addition, the `OR REPLACE` clause requires `bigquery.tables.update`
permission.

If the `OPTIONS` clause includes an expiration time, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Creating a new view

The following example creates a view named `newview` in `mydataset`:

```googlesql
CREATE VIEW `myproject.mydataset.newview`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="newview",
  description="a view that expires in 2 days",
  labels=[("org_unit", "development")]
)
AS SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable`
```

If the view name exists in the dataset, the following error is returned:

`Already Exists: project_id:dataset.table`

The view is defined using the following GoogleSQL query:

`` SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable` ``

The view option list specifies the:

- **Expiration time:** 48 hours from the time the view is created
- **Friendly name:** `newview`
- **Description:** `A view that expires in 2 days`
- **Label:** `org_unit = development`

##### Creating a view only if the view doesn't exist

The following example creates a view named `newview` in `mydataset` only if no
view named `newview` exists in `mydataset`. If the view name exists in the
dataset, no error is returned, and no action is taken.

```googlesql
CREATE VIEW IF NOT EXISTS `myproject.mydataset.newview`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="newview",
  description="a view that expires in 2 days",
  labels=[("org_unit", "development")]
)
AS SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable`
```

The view is defined using the following GoogleSQL query:

`` SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable` ``

The view option list specifies the:

- **Expiration time:** 48 hours from the time the view is created
- **Friendly name:** `newview`
- **Description:** `A view that expires in 2 days`
- **Label:** `org_unit = development`

##### Creating or replacing a view

The following example creates a view named `newview` in `mydataset`, and if
`newview` exists in `mydataset`, it is overwritten using the specified query
expression.

```googlesql
CREATE OR REPLACE VIEW `myproject.mydataset.newview`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="newview",
  description="a view that expires in 2 days",
  labels=[("org_unit", "development")]
)
AS SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable`
```

The view is defined using the following GoogleSQL query:

`` SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable` ``

The view option list specifies the:

- **Expiration time:** 48 hours from the time the view is created
- **Friendly name:** `newview`
- **Description:** `A view that expires in 2 days`
- **Label:** `org_unit = development`

##### Creating a view with column descriptions

The following example creates a view named `newview` in `mydataset`. This view
definition provides the column description for each column in `mytable`.
You can rename columns from the original query.

```googlesql
CREATE VIEW `myproject.mydataset.newview` (
  column_1_new_name OPTIONS (DESCRIPTION='Description of the column 1 contents'),
  column_2_new_name OPTIONS (DESCRIPTION='Description of the column 2 contents'),
  column_3_new_name OPTIONS (DESCRIPTION='Description of the column 3 contents')
)
AS SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable`
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and a code value that the rendered page splits into two code elements with a line-break hint (`<wbr>`) is written as one code span (the twin leaves a doubled backtick in it). The prose is otherwise unchanged.
- The HTML of the rendered page leaves `<FLOAT64>` unescaped inside a code block, so a browser hides it; the text is kept here as written in the HTML source.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 4 files at section boundaries; this is part 1.
- Corrected from the official docs: the Java example's SQL string ends with `'W%'` followed by a stray backtick; removed, matching the Python and Node.js versions of the same query. The sample also reported "View created successfully" whenever `job.isDone()` was true after `waitFor()`, but a finished job can have failed. The `Job.waitFor` Javadoc of the BigQuery Java client (googleapis/java-bigquery commit a1327bbb, `Job.java`) checks `completedJob == null` (the job no longer exists) and then `completedJob.getStatus().getError() != null` (the job failed), and `JobStatus.getError()` is documented as present when the job completed and was unsuccessful; the sample now follows that pattern.
- Corrected from the official docs: the two `STRUCT` examples under `DEFAULT COLLATE` / `COLLATE` list the fields `x FLOAT64` and `y ARRAY <STRING>` without a comma between them; a comma was added in both, since `field_list` in the syntax is comma-separated.
- Corrected from the official docs: the text says the table schema contains 2 columns but lists three (`date`, `station_name`, `prcp`); changed to 3.
- Corrected from the official docs: the `FOR SYSTEM_TIME AS OF` argument is called `timestamp_expression`, but the syntax block on the same page names it `time_expression`; changed to match the syntax.
- Corrected from the official docs: the `CREATE SNAPSHOT TABLE` example has no comma between `description=...` and `labels=...`; added, since options are comma-separated.
- Corrected from the official docs: the link for `CREATE TABLE COPY` pointed to `#create-snapshot-table-statement`; changed to `#create-table-copy-statement`, the anchor of the `CREATE TABLE COPY` statement section on this page.
- Corrected from the official docs: the `join_restriction_policy` example puts single-quoted strings inside the single-quoted JSON literal, which ends the literal early and is not valid JSON; the inner strings were changed to double quotes, as in the other policy examples.
- Corrected from the official docs: the link for `ALTER TABLE ALTER COLUMN` in the `data_policies` row pointed to the `SET DATA TYPE` section; changed to `#alter-column-set-options-statement`, the section that describes the `=` and `+=` operators.
- Caution: The join example selects `orders.l_orderkey` twice in a row; the intended second column is not stated.
- Conflicting official statements: This page says a table name can have "up to 1,024 characters" here, while the `CREATE TABLE` naming rules in data-definition-language-4.md say "up to 1,024 UTF-8 bytes". The correct unit is not stated.

## Related

- [Index of this directory](./README.md)
- [Data definition language (DDL) statements in GoogleSQL (part 2 of 4)](./data-definition-language-2.md)
- [Data definition language (DDL) statements in GoogleSQL (part 3 of 4)](./data-definition-language-3.md)
- [Data definition language (DDL) statements in GoogleSQL (part 4 of 4)](./data-definition-language-4.md)
