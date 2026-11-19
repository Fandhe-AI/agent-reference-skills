---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-entity-feature-time
---

# The ML.ENTITY_FEATURES_AT_TIME function

## Signature / Usage

This document describes the `ML.ENTITY_FEATURES_AT_TIME` function, which lets
you use multiple point-in-time cutoffs for multiple entities when retrieving
features, because features can have time dependencies if they include
time-sensitive data. To avoid
[data leakage](https://en.wikipedia.org/wiki/Leakage_(machine_learning)), use
point-in-time features when training models and running inference.

Use this function to retrieve features from multiple entities for multiple
points in time. For example, you could retrieve features created at or before
three different points in time for entity 1, and features created at or before
yet another different point in time for entity 2. Use the
[`ML.FEATURES_AT_TIME` function](feature-time.md)
to use the same point-in-time cutoff for all entities when retrieving features.

### Syntax

```sql
ML.ENTITY_FEATURES_AT_TIME(
   { TABLE `PROJECT_ID.DATASET.FEATURE_TABLE_NAME` | (FEATURE_QUERY_STATEMENT) },
   { TABLE `PROJECT_ID.DATASET.ENTITY_TIME_TABLE_NAME` | (ENTITY_TIME_QUERY_STATEMENT) },
   [, NUM_ROWS => INT64][, IGNORE_FEATURE_NULLS => BOOL])
```

#### Arguments

`ML.ENTITY_FEATURES_AT_TIME` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the BigQuery dataset that contains the resource.
- `FEATURE_TABLE_NAME`: a `STRING` value that specifies
  the name of the BigQuery table that contains the feature data.
  The feature table must contain the following columns:

  - `entity_id`: a `STRING` column that contains the ID of the entity related to the features.
  - One or more feature columns.
  - `feature_timestamp`: a `TIMESTAMP` column that identifies when the feature data was last updated.

  The column names are case-insensitive. For example, you can use a column
  named `Entity_ID` instead of `entity_id`.

  The feature table must be in
  [wide](https://en.wikipedia.org/wiki/Wide_and_narrow_data#Wide) format,
  with one column for each feature.
- `FEATURE_QUERY_STATEMENT`: a `STRING` value that
  specifies a GoogleSQL query that returns the feature data. This
  query must return the same columns as `feature_table`. See
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax)
  for the supported SQL syntax of the `FEATURE_QUERY_STATEMENT` clause.

- `ENTITY_TIME_TABLE_NAME`: a `STRING` value that
  specifies the name of the BigQuery table that maps entity IDs
  to feature lookup times. The entity time table must contain the
  following columns:

  - `entity_id`: a `STRING` column that contains the entity ID.
  - `time`: a `TIMESTAMP` column that identifies a point in time to use as a cutoff time when selecting features for the entity represented by the entity ID.

  The column names are case-insensitive. For example, you can use a column
  named `Entity_ID` instead of `entity_id`.

  The table identified by the `ENTITY_TIME_TABLE_NAME` value must be no
  larger than 100 MB.
- `ENTITY_TIME_QUERY_STATEMENT`: a `STRING` value that
  specifies a GoogleSQL query that returns the entity time data. This
  query must return the same columns as the `ENTITY_TIME_TABLE_NAME` argument.
  See
  [GoogleSQL query syntax](../googlesql-syntax/query-syntax-1.md#sql-syntax)
  for the supported SQL syntax of the `ENTITY_TIME_QUERY_STATEMENT` clause.

- `NUM_ROWS`: an `INT64` value that specifies the number
  of rows to return for each row in `ENTITY_TIME_TABLE_NAME`. Defaults to `1`.

- `IGNORE_FEATURE_NULLS`: a `BOOL` value that indicates
  whether to replace a `NULL` value in a feature column with the feature column
  value from the row for the same entity that immediately precedes it in time.
  For example, for the following feature table and entity time table:

  **Feature table**

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

  <br />

  **Entity time table**

  ```text
  +-----------+--------------------------+
  | entity_id | time                     |
  +-----------+--------------------------+
  | '2'       | '2022-06-11 10:00:00+00' |
  +-----------+--------------------------+
  ```

  <br />

  Running this query:

  ```sql
  SELECT *
  FROM
    ML.ENTITY_FEATURES_AT_TIME(
      TABLE mydataset.feature_table,
      TABLE mydataset.entity_time_table,
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

`ML.ENTITY_FEATURES_AT_TIME` returns the input table rows that meet the
point-in-time cutoff criteria, with the `feature_timestamp` column showing the
timestamp from the `time` column of the entity time table.

Because you can specify multiple points in time from which to retrieve features
for the same entity, it is possible to return duplicate rows, depending on the
timestamps in the feature and entity time tables, and the `num_rows` value
you specify. For example, if the only row in the feature table for entity ID 1
is timestamped `2022-06-11 10:00:00+00`, and you have two rows for entity ID 1
in the entity time table that both have later timestamps, the function output
has 2 rows with the same feature data for entity ID 1.

If either of the following conditions are true:

- No entity IDs from the entity time table are found in the feature table.
- The rows in the feature table whose entity IDs match those in the entity time table don't meet the point-in-time criteria.

Then the function doesn't return any output for that entity
time table row.

### Examples

**Example 1**

This example shows a how to retrain a model using only features that were
created or updated before the timestamps identified in
`mydataset.entity_time_table`:

```sql
CREATE OR REPLACE
  `mydataset.mymodel` OPTIONS (WARM_START = TRUE)
AS
SELECT * EXCEPT (feature_timestamp, entity_id)
FROM
  ML.ENTITY_FEATURES_AT_TIME(
    TABLE `mydataset.feature_table`,
    TABLE `mydataset.entity_time_table`,
    num_rows => 1,
    ignore_feature_nulls => TRUE);
```

**Example 2**

This example shows a how to get predictions from a model based on features
that were created or updated before the timestamps identified in
`mydataset.entity_time_table`:

```sql
SELECT
  *
FROM
  ML.PREDICT(
    MODEL `mydataset.mymodel`,
    (
      SELECT * EXCEPT (feature_timestamp, entity_id)
      FROM
        ML.ENTITY_FEATURES_AT_TIME(
          TABLE `mydataset.feature_table`,
          TABLE `mydataset.entity_time_table`,
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
  ),
  entity_time_table AS (
    SELECT * FROM UNNEST(
      ARRAY<STRUCT<entity_id STRING, time TIMESTAMP>>[
        ('id1', TIMESTAMP '2022-06-12 12:00:00+00'),
        ('id2', TIMESTAMP '2022-06-11 10:00:00+00'),
        ('id1', TIMESTAMP '2022-06-10 13:00:00+00')])
  )
SELECT *
FROM
  ML.ENTITY_FEATURES_AT_TIME(
    TABLE feature_table, TABLE entity_time_table, num_rows => 1, ignore_feature_nulls => TRUE);
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-entity-feature-time (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
