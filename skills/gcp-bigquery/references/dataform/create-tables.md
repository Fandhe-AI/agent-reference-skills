---
source: https://docs.cloud.google.com/dataform/docs/create-tables
---

# Create tables in Dataform

Define tables, incremental tables, views and materialized views in `type: "table"` SQLX files (stored under `definitions/`). Dataform compiles each definition into SQL and creates the table in BigQuery. This page also covers partitions and clusters, incremental behavior, documentation, labels, Iceberg managed tables, and preserving access-control metadata.

## Signature / Usage

### Table types

```sql
config { type: "TABLE_TYPE" }
```

`TABLE_TYPE` is `table`, `incremental`, or `view`. For a materialized view:

```sql
config {
  type: "view",
  materialized: true
}
```

### Reference dependencies with `ref`

Adapted (not in the official docs): the non-aggregated `order_status` column is added to `GROUP BY` (`GROUP BY 1, 2, 3`).

```sql
config { type: "table" }

SELECT
  order_date AS date,
  order_id AS order_id,
  order_status AS order_status,
  SUM(item_count) AS item_count,
  SUM(amount) AS revenue

FROM ${ref("store_clean")}

GROUP BY 1, 2, 3
```

Two arguments (schema, table) disambiguate same-named tables:

```sql
config { type: "table" }
SELECT * FROM ${ref("schema", "store_clean")}
```

Manual dependencies not referenced in the `SELECT`:

```sql
config { dependencies: [ "some_table", "some_other_table" ] }
```

### Override schema, database, name

```sql
 {
   schema: "OVERRIDDEN_SCHEMA",
   database: "OVERRIDDEN_DATABASE",
   name: "OVERRIDDEN_NAME"
 }
```

### Apache Iceberg managed tables

```sql
config {
  type: "table",
  name: "my_table",
  uniqueKey: ["uniquekey"],
  bigquery: {
    iceberg: {
      bucket_name: "BUCKET_NAME"
    }
  }
}
```

### Partitions and clusters

```sql
config {
  type: "table",
  bigquery: {
    partitionBy: "DATETIME_TRUNC(<timestamp_column>, HOUR)"
  }
}
```

```sql
config {
  type: "table",
  bigquery: {
    partitionBy: "RANGE_BUCKET(<integer_column>, GENERATE_ARRAY(0, 1000000, 1000))"
  }
}
```

```sql
config {
  type: "table",
  bigquery: {
    partitionBy: "DATE(ts)",
    requirePartitionFilter : true
  }
}
SELECT CURRENT_TIMESTAMP() AS ts
```

```sql
config {
  type: "table",
  bigquery: {
    partitionBy: "DATE(ts)",
    partitionExpirationDays: 14,
  }
}
SELECT CURRENT_TIMESTAMP() AS ts
```

```sql
config {
  type: "table",
  bigquery: {
    partitionBy: "DATE(ts)",
    clusterBy: ["name", "revenue"]
  }
}
SELECT CURRENT_TIMESTAMP() as ts, name, revenue
```

### Incremental tables

Adapted (not in the official docs): `date` is added to the `SELECT` list, because the incremental branch reads `MAX(date)` from the output table.

```sql
config { type: "incremental" }

SELECT timestamp, message, date FROM ${ref("productiondb", "logs")}

${when(incremental(),
   `WHERE date > (SELECT MAX(date) FROM ${self()}) AND country = "UK"`,
   `WHERE country = "UK"`)}
```

Daily snapshot:

Adapted (not in the official docs): the incremental filter compares `CURRENT_DATE()` instead of the `snapshot_date` alias, which a `WHERE` clause cannot reference.

```sql
config { type: "incremental" }

SELECT CURRENT_DATE() AS snapshot_date, customer_id, name, account_settings FROM ${ref("productiondb", "customers")}

${when(incremental(), `WHERE CURRENT_DATE() > (SELECT MAX(snapshot_date) FROM ${self()})`) }
```

Merge on a unique key:

Adapted (not in the official docs): `transaction_id`, the `uniqueKey`, is added to the `SELECT` list.

```sql
config {
  type: "incremental",
  uniqueKey: ["transaction_id"]
}

SELECT transaction_id, timestamp, action FROM weblogs.user_actions
${ when(incremental(), `WHERE timestamp > (SELECT MAX(timestamp) FROM ${self()})`) }
```

Target pruning with `updatePartitionFilter` and source pruning with `WHERE`:

Adapted (not in the official docs): `transaction_id`, the `uniqueKey`, is added to the `SELECT` list.

```sql
config {
  type: "incremental",
  uniqueKey: ["transaction_id"],
  bigquery: {
    partitionBy: "DATE(timestamp)",
    updatePartitionFilter:
        "timestamp >= timestamp_sub(current_timestamp(), interval 24 hour)"
  }
}

SELECT transaction_id, timestamp, action FROM weblogs.user_actions
${ when(incremental(), `WHERE timestamp > (SELECT MAX(timestamp) FROM ${self()})`) }
```

Avoid full scans of a partitioned source with a scripting variable:

```sql
config {
  type: "incremental",
}

pre_operations {
  DECLARE event_timestamp_checkpoint DEFAULT (
    ${when(incremental(),
    `SELECT max(event_timestamp) FROM ${self()}`,
    `SELECT timestamp("2000-01-01")`)}
  )
}

SELECT
  *
FROM
  ${ref("raw_events")}
WHERE event_timestamp > event_timestamp_checkpoint
```

Protect from full refresh:

```sql
config {
  type: "incremental",
  protected: true
}
SELECT ...
```

Change schema without a full refresh (Preview):

```sql
config {
    type: "incremental",
    onSchemaChange: "EXTEND",
}
SELECT ...
```

### Documentation and Knowledge Catalog metadata

```javascript
config {
  type: "table",
  metadata: {
    overview: "This table provides standardized trip data.",
    extraProperties: {
        generic: {
              system: "BigQuery",
              type: "table"
        }
      }
  }
}
```

Adapted (not in the official docs): the `columns` keys `column1_name`, `column2_name` and `column3_name` are written `column_1_name`, `column_2_name` and `column_3_name`, the column names the `SELECT` produces.

```sql
config {
  type: "table",
  description: "Description of the table.",
  columns: {
    column_1_name: "Description of the first column",
    column_2_name: "Description of the second column",
    column_3_name: "Description of the third column",
    record_name: {
      description: "Description of the record.",
      columns: {
       record_column1_name: "Description of the first record column",
       record_column2_name: "Description of the second record column",
      }
    }
  }
}
SELECT
  "first_column_value" AS column_1_name,
  "second_column_value" AS column_2_name,
  "third_column_value" AS column_3_name,
  STRUCT("first" AS record_column1_name,
    "second" AS record_column2_name) AS record_name
```

Reuse descriptions with an include (`includes/docs.js`):

```javascript
// filename is includes/docs.js

const user_id = `A unique identifier for a user`;
const age = `The age of a user`;
const creation_date = `The date this user signed up`;
const user_tenure = `The number of years since the user's creation date`;
const badge_count = `The all-time number of badges the user has received`;
const questions_and_answer_count = `The all-time number of questions and answers the user has created`;
const question_count = `The all-time number of questions the user has created`;
const answer_count = `The all-time number of answers the user has created`;
const last_badge_received_at = `The time the user received their most recent badge`;
const last_posted_at = `The time the user last posted a question or answer`;
const last_question_posted_at = `The time the user last posted an answer`;
const last_answer_posted_at = `The time the user last posted a question`;

module.exports = {
   user_id,
   age,
   creation_date,
   user_tenure,
   badge_count,
   questions_and_answer_count,
   question_count,
   answer_count,
   last_badge_received_at,
   last_posted_at,
   last_question_posted_at,
   last_answer_posted_at,
};
```

```sql
config {
  type: "table",
  description: "Table description.",
  columns: {
    user_id: docs.user_id,
    column2_name: "Description of the second column",
    column3_name: "Description of the third column",
    age: docs.age,
  }
}

SELECT ...
```

### Labels

```sql
config {
  type: "table",
  bigquery: {
    partitionBy: "DATE(ts)",
    labels: {
      department: "shipping",
      "cost-center": "logistics"
    }
  }
}

SELECT CURRENT_TIMESTAMP() AS ts
```

### Preserve access-control metadata (Dataform core 3.0.62 or later)

```sql
config {
  type: "table",
  preserveGovernanceControls: true
}

SELECT
  customer_id,
  email,
  phone_number
FROM
  ${ref("raw_customers")}
```

Project-wide default in `workflow_settings.yaml`:

```yaml
defaultProject: my-gcp-project-id
defaultDataset: my_dataform_dataset
defaultLocation: US
defaultAssertionDataset: my_dataform_assertions
dataformCoreVersion: 3.0.62
preserveGovernanceControls: true
```

Reapply a row access policy after the table is recreated:

```sql
config {
  type: "table",
}

SELECT
  bike_id,
  start_time,
  duration
FROM
  ${ref("raw_trips")}

post_operations {
  CREATE ROW ACCESS POLICY my_policy
  ON ${self()}
  GRANT TO ('serviceAccount:sa-name@example-gcp-project.iam.gserviceaccount.com')
  FILTER USING (bike_id LIKE 'US-%');
}
```

## Options / Props

### Table types in `type: "table"` files

| Value | Description |
|-------|-------------|
| `table` | Regular table |
| `incremental` | Incremental table |
| `view` | Table view |
| `view` + `materialized: true` | Materialized view |

### `onSchemaChange` (Preview; Dataform core 3.0.11 or later; not available in the Dataform CLI)

| Value | Behavior |
|-------|----------|
| `IGNORE` (default) | Ignores added columns and shows an error for missing columns |
| `FAIL` | Stops the action on any schema change |
| `EXTEND` | Adds new columns (NULL for previous records); error if a column is removed or missing |
| `SYNCHRONIZE` | Adds new columns and removes columns missing from the query |

### Config and `bigquery` block properties shown

| Property | Description |
|----------|-------------|
| `schema` / `database` / `name` | Override BigQuery dataset, project ID, and table name |
| `dependencies` | Manual dependencies |
| `uniqueKey` | Columns used to merge rows instead of appending |
| `protected` | Prevents rebuild from scratch of an incremental table |
| `bigquery.partitionBy` | Partition expression |
| `bigquery.requirePartitionFilter` | Require a partition filter |
| `bigquery.partitionExpirationDays` | Days to retain partitions |
| `bigquery.clusterBy` | Cluster columns |
| `bigquery.updatePartitionFilter` | Limits target partitions scanned during `MERGE`; only functional with `uniqueKey` (otherwise insert strategy is used) |
| `bigquery.labels` | BigQuery labels |
| `bigquery.iceberg.bucket_name` | Cloud Storage bucket for Iceberg table data |
| `metadata.overview` | Knowledge Catalog overview (Dataform core 3.0.37 or later) |
| `metadata.extraProperties.generic` | Generic aspects (Dataform core 3.0.52 or later) |
| `preserveGovernanceControls` | Preserve data policies and data governance tags (Preview) across runs (3.0.62 or later) |

### Required roles

| Role | Purpose |
|------|---------|
| `roles/dataform.editor` | Complete tasks (on the workspace) |
| `roles/dataplex.catalogEditor` | Sync metadata to Knowledge Catalog (project or `@bigquery` entry group) |
| `roles/bigquery.dataViewer`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.admin` | Execution service account: read `INFORMATION_SCHEMA.COLUMNS` |
| `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagAdmin` | Execution service account: `bigquery.tables.createTagBinding`, `bigquery.tables.deleteTagBinding` |
| `roles/bigquerydatapolicy.admin`, `roles/bigquery.admin` | Execution service account: `bigquery.dataPolicies.create`, `bigquery.dataPolicies.update` |

### Governance preservation limitations

| Limitation | Detail |
|------------|--------|
| Column removal | Backed-up policies and tags of a removed column are ignored |
| Column rename | Associations are lost or swapped; reapply manually |
| Partitioning / clustering change | Not supported in place; BigQuery rejects the replacement; drop the table and rerun, then reapply policies and tags |
| Partition expiration removal | Removing `partitionExpirationDays` doesn't remove expiration on an existing table |
| Table type | After a run the table is reported as `table_type = 'CLONE'` in `INFORMATION_SCHEMA.TABLES` but behaves as a standard table |
| Table-level tags, row access policies | Not preserved; reapply in `post_operations` |
| Non-transactional swap | A failure midway may leave `TABLE_NAME_old` or `df_tmp_intermediate` |
| Policy tags | Not supported; use data governance tags (Preview) and data policies |

## Notes

- Dataform compiles table queries into `CREATE OR REPLACE TABLE ... AS SELECT` without an explicit schema, so columns are `NULLABLE`; `REQUIRED` modes can't be set in `config` or `columns`. Use `assertions: { nonNull: ["column_name"] }` / `rowConditions`, or a `type: "operations"` file with `hasOutput: true` containing `CREATE OR REPLACE TABLE` DDL with `NOT NULL`.
- `ref` can reference tables, data source declarations and operations with `hasOutput` set to `true`. `resolve` references like `ref` but adds no dependency. If a table name is overridden, use the overridden name in `ref`. File names can only include numbers, letters, hyphens, and underscores.
- Incremental tables insert only into existing columns; after changing the query, use **Run with full refresh** or the CLI `--full-refresh` option (Dataform then ignores `${when(incremental(), ...)}` and runs `CREATE OR REPLACE`). Try full refresh and `SYNCHRONIZE` on a disposable dataset first.
- Caution: `SYNCHRONIZE` can't be undone and removing columns can lose data. Dropping partitioned or clustered columns is handled with `ALTER TABLE DROP COLUMN` with no validation by Dataform.
- Preserving governance rebuilds through a staging table each run. Previous data stays in time travel (7 days by default, configurable down to 2 days) then a 7-day fail-safe that can't be shortened; with physical storage billing it is billed in addition. Pricing is not copied here.
- Policy tags can be set via the `columns` property, which does not configure data types or `REQUIRED` modes. Column-level security and data masking are in `gcp-bigquery` BigQuery references.
- The source also shows Console click-paths, a second `docs.js` block (a `columns` constant using `=` inside an object literal, which is not valid JavaScript) and its usage; those are omitted. Console steps are omitted.
- Unquoted placeholders such as `<timestamp_column>` and `SELECT ...` are kept as written in the source.
- Corrected from the official docs: the `ref` example groups by `1, 2` although `order_status` is not aggregated (`GROUP BY 1, 2, 3`); the first incremental example filters on `MAX(date)` of the output table but does not select `date`; the daily snapshot filters on the `SELECT` alias `snapshot_date` in `WHERE` (written with `CURRENT_DATE()`); the two `uniqueKey: ["transaction_id"]` examples do not select `transaction_id`.
- Corrected from the official docs: the column-description example documents `column1_name` to `column3_name` while its `SELECT` produces `column_1_name` to `column_3_name`; the `columns` keys are aligned with the `SELECT`.
- Source: https://docs.cloud.google.com/dataform/docs/create-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [dependencies.md](./dependencies.md)
- [overview.md](./overview.md)
- [sql-workflows.md](./sql-workflows.md)
