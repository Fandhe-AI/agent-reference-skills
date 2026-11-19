---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature-time
---

# The ML.FEATURES_AT_TIME function

## Signature / Usage

This document describes the `ML.FEATURES_AT_TIME` function, which lets you use
a point-in-time cutoff for all entities when retrieving features, because
features can have time dependencies if they include time-sensitive data. To
avoid [data leakage](https://en.wikipedia.org/wiki/Leakage_(machine_learning)),
use point-in-time features when training models and running inference.

Use this function to use the same point-in-time cutoff for all entities when
retrieving features. Use the
[`ML.ENTITY_FEATURES_AT_TIME` function](entity-feature-time.md)
to retrieve features from multiple points in time for multiple entities.

### Syntax

```sql
ML.FEATURES_AT_TIME(
   { TABLE `PROJECT_ID.DATASET.TABLE_NAME` | (QUERY_STATEMENT) }
   [, TIME => TIMESTAMP][, NUM_ROWS => INT64][, IGNORE_FEATURE_NULLS => BOOL])
```

#### Arguments

`ML.FEATURES_AT_TIME` takes the following arguments:

- `PROJECT_ID`: the project that contains the table.
- `DATASET`: the BigQuery dataset that contains the table.
- `TABLE_NAME`: is the name of the BigQuery
  table that contains the feature data. The feature table must contain the
  following columns:

  - `entity_id`: a `STRING` column that contains the ID of the entity related to the features.
  - One or more feature columns.
  - `feature_timestamp`: a `TIMESTAMP` column that identifies when the feature data was last updated.

  The column names are case-insensitive. For example, you can use a column
  named `Entity_ID` instead of `entity_id`.

  The feature table must be in
  [wide](https://en.wikipedia.org/wiki/Wide_and_narrow_data#Wide) format,
  with one column for each feature.
- `QUERY_STATEMENT`: a `STRING` value that specifies a
  GoogleSQL query that returns the feature data.
  This query must return the same columns as the `TABLE_NAME` argument. See
  [GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
  for the supported SQL syntax of the `QUERY_STATEMENT` clause.

- `TIME`: a `TIMESTAMP` value that specifies the point in
  time to use as a cutoff for feature data. Only rows where the value in the
  `feature_timestamp` column is equal to or earlier than the `TIME` value are
  returned. Defaults to the value of the
  [`CURRENT_TIMESTAMP` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#current_timestamp).

- `NUM_ROWS`: an `INT64` value that specifies the number
  of rows to return for each entity ID. Defaults to `1`.

- `IGNORE_FEATURE_NULLS`: a `BOOL` value that indicates
  whether to replace a `NULL` value in a feature column with the feature column
  value from the row for the same entity that immediately precedes it in time.
  For example, for the following feature table:

  ```text
  +-----------+------+------+--------------------------+
  | entity_id | f1   | f2   | feature_timestamp        |
  +-----------+------+------+--------------------------+
  | '2'       | 5.0  | 8.0  | '2022-06-10 09:00:00+00' |
  +-----------+------+------+--------------------------+
  | '2'       | 2.0  | 4.0  | '2022-06-10 12:00:00+00' |
  +-----------+------+------+--------------------------+
  | '2'       | 7.0  | NULL | '2022-06-11 10:00:00+00' |
  +-----------+------+------+--------------------------+
  ```

  Running this query:

  ```sql
  SELECT *
  FROM
    ML.FEATURES_AT_TIME(
      TABLE mydataset.feature_table,
      time => '2022-06-11 10:00:00+00',
      num_rows => 1,
      ignore_feature_nulls => TRUE);
  ```

  Results in the following output, where the `f2` value from the
  row for entity ID 2 that is timestamped `'2022-06-10 12:00:00+00'` is
  substituted for the `NULL` value in the row timestamped
  `'2022-06-11 10:00:00+00'`:

  ```text
  +-----------+------+------+--------------------------+
  | entity_id | f1   | f2   | feature_timestamp        |
  +-----------+------+------+--------------------------+
  | '2'       | 7.0  | 4.0  | '2022-06-11 10:00:00+00' |
  +-----------+------+------+--------------------------+
  ```

  If there is no available replacement value, for example, where there is no
  earlier row for that entity ID, a `NULL` value is returned.

  Defaults to `FALSE`.

### Output

The `ML.FEATURES_AT_TIME` function returns the input table rows that meet the
point-in-time cutoff criteria, with the `feature_timestamp` column showing the
timestamp that was input in the `time` argument.

### Examples

**Example 1**

This example shows a how to retrain a model using only features that were
created or updated before `2023-01-01 12:00:00+00`:

Adapted (not in the official docs): the `MODEL` keyword, which `CREATE OR REPLACE` requires, is added.

```sql
CREATE OR REPLACE MODEL
  `mydataset.mymodel` OPTIONS (WARM_START = TRUE)
AS
SELECT * EXCEPT (feature_timestamp, entity_id)
FROM
  ML.FEATURES_AT_TIME(
    TABLE `mydataset.feature_table`,
    time => '2023-01-01 12:00:00+00',
    num_rows => 1,
    ignore_feature_nulls => TRUE);
```

**Example 2**

This example shows how to get predictions from a model based on features
that were created or updated before `2023-01-01 12:00:00+00`:

```sql
SELECT
  *
FROM
  ML.PREDICT(
    MODEL `mydataset.mymodel`,
    (
      SELECT * EXCEPT (feature_timestamp, entity_id)
      FROM
        ML.FEATURES_AT_TIME(
          TABLE `mydataset.feature_table`,
          time => '2023-01-01 12:00:00+00',
          num_rows => 1,
          ignore_feature_nulls => TRUE)
    )
  );
```

**Example 3**

This is a contrived example that you can use to see the output of the
function:

```sql
WITH
  feature_table AS (
    SELECT * FROM UNNEST(
      ARRAY<STRUCT<entity_id STRING, f_1 FLOAT64, f_2 FLOAT64, feature_timestamp TIMESTAMP>>[
        ('id1', 1.0, 1.0, TIMESTAMP '2022-06-10 12:00:00+00'),
        ('id2', 12.0, 24.0, TIMESTAMP '2022-06-11 12:00:00+00'),
        ('id1', 11.0, NULL, TIMESTAMP '2022-06-11 12:00:00+00'),
        ('id1', 6.0, 12.0, TIMESTAMP '2022-06-11 10:00:00+00'),
        ('id2', 2.0, 4.0, TIMESTAMP '2022-06-10 12:00:00+00'),
        ('id2', 7.0, NULL, TIMESTAMP '2022-06-11 10:00:00+00')])
  )
SELECT *
FROM
  ML.FEATURES_AT_TIME(
    TABLE feature_table,
    time => '2022-06-12 10:00:00+00',
    num_rows => 1,
    ignore_feature_nulls => TRUE);
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-feature-time (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the retraining example writes `CREATE OR REPLACE` followed by the model name without the `MODEL` keyword; it is written `CREATE OR REPLACE MODEL`.

## Related

- [Index of this directory](./README.md)
