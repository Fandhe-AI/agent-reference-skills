---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-correlation
---

# The ML.CORRELATION function

## Signature / Usage

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
> **Note:** To request feedback or support for this feature, send an email to [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

This document describes the `ML.CORRELATION` function, which calculates
statistical correlations between a target column and one or more metric columns.
`ML.CORRELATION` offers the following features:

- **Multi-column matrix**: correlates one target variable against multiple metrics simultaneously.
- **Dimensional slicing** : automatically computes correlations for all combinations of specified dimensions, similar to a `GROUP BY CUBE` operation.
- **Flexible methods** : supports [Pearson](https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient), [Spearman](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient), and [Kendall](https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient) correlation methods.

### Syntax

Adapted (not in the official docs): the trailing comma inside `[, dimension_cols => DIMENSION_COLS, ]` is removed, as in the other optional arguments.

```googlesql
ML.CORRELATION(
  { TABLE TABLE_NAME | (QUERY_STATEMENT) },
  target_col => TARGET_COL,
  target_correlation_cols => TARGET_CORRELATION_COLS
  [, dimension_cols => DIMENSION_COLS ]
  [, method => METHOD ]
);
```

#### Arguments

The `ML.CORRELATION` function takes the following arguments:

- `TABLE_NAME`: the name of a BigQuery table that contains the data to analyze.
- `QUERY_STATEMENT`: a SQL query whose results contain the data to analyze.
- `TARGET_COL`: a `STRING` that contains the name of the primary numerical column to analyze.
- `TARGET_CORRELATION_COLS`: a `STRING` or `ARRAY<STRING>` value that contains the names of one or more numerical columns to correlate against the `TARGET_COL` column.
- `DIMENSION_COLS`: a `STRING` or `ARRAY<STRING>` value that contains the names of columns to slice the data by. The function calculates correlations for every combination of these dimensions. You can specify a maximum of 12 columns. Each column must be a [groupable type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#groupable_data_types).
- `METHOD`: a `STRING` that specifies the statistical method to use for correlation. Supported values are `PEARSON`, `SPEARMAN`, and `KENDALL`. The default value is `PEARSON`. The `KENDALL` method has higher complexity and can be slow on large datasets. For large tables, we recommend that you use `PEARSON` or `SPEARMAN`.

### Output

The `ML.CORRELATION` function returns a table where each row
represents the correlation for a specific pair of columns
within a specific data segment. The results are sorted by
`segment_size` in descending order, and then by `corr_col` in ascending order.
The output table contains the following columns:

- `segment`: an `ARRAY<STRUCT<dimension_col STRING, dimension_value JSON>>` value that contains the key-value pair for each dimension. The `JSON` value for `dimension_value` is generated using the [`TO_JSON`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#to_json) function.
- `dimension_col`: a column from `dimension_cols`, if you specified any dimension columns. The output includes one column for each dimension specified. A `NULL` value in one of these columns indicates either a true `NULL` value in the column or a placeholder `NULL` value that means the column was part of a rollup. This is conceptually similar to the presence of `NULL` placeholder values generated when you use [grouping sets](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#group_by_grouping_sets). To determine whether the `NULL` value is from the column itself, check for a `NULL` value in the `dimension_value` field for that column in the `segment` column of the output.
- `target_col`: a `STRING` value that contains the name of the input target column.
- `corr_col`: a `STRING` value that contains the name of the metric column being correlated against the target column.
- `correlation`: a `FLOAT64` value that contains the correlation coefficient in the range of `-1.0` to `1.0`.
- `segment_size`: an `INT64` value that contains the number of rows used to calculate the correlation for this segment.
- `segment_proportion`: a `FLOAT64` value that contains the fraction of total rows in the input table (`segment_size`/total rows) that belong to this segment.

### Examples

The following examples show how to use the `ML.CORRELATION` function with
the `my_dataset.marketing_sample` table:

```sql
CREATE OR REPLACE TABLE my_dataset.marketing_sample AS (
  -- New York data
  SELECT 'USA' AS country, 'New York' AS city, 'Electronics' AS product_category, 100 AS ad_spend, 150 AS budget, 1000 AS revenue UNION ALL
  SELECT 'USA', 'New York', 'Electronics', 150, 200, 1500 UNION ALL
  SELECT 'USA', 'New York', 'Apparel',     200, 250, 1800 UNION ALL

  -- Seattle data
  SELECT 'USA', 'Seattle',  'Apparel',     220, 240, 2400 UNION ALL
  SELECT 'USA', 'Seattle',  'Apparel',     300, 320, 2700 UNION ALL

  -- London data (Genuine NULL country)
  SELECT NULL,  'London',   'Electronics', 100, 120, 500  UNION ALL
  SELECT NULL,  'London',   'Electronics', 200, 220, 900  UNION ALL

  -- Missing city data (Genuine NULL city)
  SELECT NULL,  NULL,       'Apparel',     200, 200, 1000 UNION ALL
  SELECT NULL,  NULL,       'Apparel',     250, 250, 1200
);


/*---------+----------+------------------+----------+--------+---------+
 | country | city     | product_category | ad_spend | budget | revenue |
 +---------+----------+------------------+----------+--------+---------+
 | USA     | New York | Electronics      | 100      | 150    | 1000    |
 | USA     | New York | Electronics      | 150      | 200    | 1500    |
 | USA     | New York | Apparel          | 200      | 250    | 1800    |
 | USA     | Seattle  | Apparel          | 220      | 240    | 2400    |
 | USA     | Seattle  | Apparel          | 300      | 320    | 2700    |
 | NULL    | London   | Electronics      | 100      | 120    | 500     |
 | NULL    | London   | Electronics      | 200      | 220    | 900     |
 | NULL    | NULL     | Apparel          | 200      | 200    | 1000    |
 | NULL    | NULL     | Apparel          | 250      | 250    | 1200    |
 +---------+----------+------------------+----------+--------+---------*/
```

#### Calculate Pearson correlation

The following example calculates the Pearson correlation between `revenue` and
`ad_spend` from the table `my_dataset.marketing_sample` and uses `country` as
a dimension column:

```sql
SELECT country, segment, correlation, segment_size
FROM ML.CORRELATION(
  TABLE my_dataset.marketing_sample,
  target_col => 'revenue',
  target_correlation_cols => 'ad_spend',
  dimension_cols => ['country']
);


/*---------+--------------------------------------------------------+-------------+--------------+
 | country | segment                                                | correlation | segment_size |
 +---------+--------------------------------------------------------+-------------+--------------+
 | NULL    | []                                                     | 0.698       | 9            |
 | 'USA'   | [{dimension_col: 'country', dimension_value: '"USA"'}] | 0.968       | 5            |
 | NULL    | [{dimension_col: 'country', dimension_value: 'null'}]  | 0.990       | 4            |
 +---------+--------------------------------------------------------+-------------+--------------*/
```

The first
row of the result contains `NULL` for country because it corresponds to
aggregation over all countries. The third row of the result corresponds to a
genuine `NULL` in the input data for country because the
`dimension_value` field is `NULL`.

#### Calculate correlation for multiple columns

The following example calculates the correlation of `revenue` with
`ad_spend` and `budget`, sliced by `city` and `product_category`, from
the table `my_dataset.marketing_sample`:

```sql
SELECT *
FROM ML.CORRELATION(
  (SELECT * FROM my_dataset.marketing_sample WHERE country = 'USA'),
  target_col => 'revenue',
  target_correlation_cols => ['ad_spend', 'budget'],
  dimension_cols => ['city', 'product_category']
)
ORDER BY segment_size DESC, corr_col
LIMIT 5;


/*---------------------------------------------------------+----------+------------------+------------+----------+-------------+--------------+--------------------+
 | segment                                                 | city     | product_category | target_col | corr_col | correlation | segment_size | segment_proportion |
 +---------------------------------------------------------+----------+------------------+------------+----------+-------------+--------------+--------------------+
 | []                                                      | NULL     | NULL             | revenue    | ad_spend | 0.968       | 5            | 1.0                |
 | []                                                      | NULL     | NULL             | revenue    | budget   | 0.924       | 5            | 1.0                |
 | [{dimension_col: 'city', dimension_value: '"New York"'}]| New York | NULL             | revenue    | ad_spend | 0.990       | 3            | 0.6                |
 | [{dimension_col: 'product_category', ...: '"Apparel"'}] | NULL     | Apparel          | revenue    | ad_spend | 0.866       | 3            | 0.6                |
 | [{dimension_col: 'city', dimension_value: '"New York"'}]| New York | NULL             | revenue    | budget   | 0.990       | 3            | 0.6                |
 +---------------------------------------------------------+----------+------------------+------------+----------+-------------+--------------+--------------------*/
```

#### Distinguish between NULLs caused by global aggregates and NULLs caused by missing data

The following example shows how to use the `segment` column to label your rows
clearly for reporting. If a city is `NULL` and *isn't* in the segment array,
it's a global aggregate. If a city is `NULL` and *is* in the segment array, it's
missing data.

```sql
SELECT
  -- Create a clean label for reporting
  CASE
    -- If 'city' is NULL and not in the segment array, it's a global rollup
    WHEN city IS NULL AND NOT EXISTS(SELECT 1 FROM UNNEST(segment) s WHERE s.dimension_col = 'city')
      THEN 'ALL CITIES (Global)'
    -- If 'city' is NULL and in the segment array, it's missing data
    WHEN city IS NULL
      THEN 'UNKNOWN CITY'
    ELSE city
  END AS city_label,
  correlation,
  segment_size
FROM ML.CORRELATION(
  TABLE my_dataset.marketing_sample,
  target_col => 'revenue',
  target_correlation_cols => 'ad_spend',
  dimension_cols => ['city']
);


/*---------------------+-------------+--------------+
 | city_label          | correlation | segment_size |
 +---------------------+-------------+--------------+
 | ALL CITIES (Global) | 0.698       | 9            |
 | New York            | 0.990       | 3            |
 | UNKNOWN CITY        | 1.0         | 2            |
 | London              | 1.0         | 2            |
 | Seattle             | 1.0         | 2            |
 +---------------------+-------------+--------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-correlation (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the syntax writes `[, dimension_cols => DIMENSION_COLS, ]` with a trailing comma; it is written `[, dimension_cols => DIMENSION_COLS ]` like `[, method => METHOD ]`.

## Related

- [Index of this directory](./README.md)
