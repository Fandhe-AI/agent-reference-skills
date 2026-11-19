---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-contribution-analysis
---

# The CREATE MODEL statement for contribution analysis models

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating
[contribution analysis](https://docs.cloud.google.com/bigquery/docs/contribution-analysis) models in
BigQuery. You can use contribution analysis models to
generate insights about changes to key metrics in your multi-dimensional data.

After you have created a contribution analysis model, you can use the
[`ML.GET_INSIGHTS` function](get-insights.md)
to retrieve the metric information calculated by the model.

For more information about supported SQL statements and functions for this
model, see
[Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey).

### `CREATE MODEL` syntax

```googlesql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL} 
`project_id.dataset.model_name`
OPTIONS(
  MODEL_TYPE = 'CONTRIBUTION_ANALYSIS',
  CONTRIBUTION_METRIC = 'contribution_metric',
  IS_TEST_COL = 'is_test_col'
  [, DIMENSION_ID_COLS = dimension_column_array]
  [, MIN_APRIORI_SUPPORT = min_apriori_support]
  [, TOP_K_INSIGHTS_BY_APRIORI_SUPPORT = top_k_insights_by_apriori_support]
  [, PRUNING_METHOD = {'NO_PRUNING', 'PRUNE_REDUNDANT_INSIGHTS'}]
)
AS query_statement;
```

#### `CREATE MODEL`

Creates and trains a new model in the specified dataset. If the model name
exists, `CREATE MODEL` returns an error.

#### `CREATE MODEL IF NOT EXISTS`

Creates and trains a new model only if the model doesn't exist in the
specified dataset.

#### `CREATE OR REPLACE MODEL`

Creates and trains a model and replaces an existing model with the same name in
the specified dataset.

#### `model_name`

The name of the model you're creating or replacing. The model
name must be unique in the dataset: no other model or table can have the same
name. The model name must follow the same naming rules as a
BigQuery table. A model name can:

- Contain up to 1,024 characters
- Contain letters (upper or lower case), numbers, and underscores

`model_name` is case-sensitive.

If you don't have a default project configured, then you must prepend the
project ID to the model name in the following format, including backticks:

\`\[PROJECT_ID\].\[DATASET\].\[MODEL\]\`

For example, \`myproject.mydataset.mymodel\`.

#### `MODEL_TYPE`

**Syntax**

```sql
MODEL_TYPE = 'CONTRIBUTION_ANALYSIS'
```

**Description**

Specify the model type. This option is required.

#### `CONTRIBUTION_METRIC`

**Syntax**

`CONTRIBUTION_METRIC = 'contribution_metric'`

**Description**

Provides the expression to use to calculate the metric you are analyzing.

To calculate a [summable metric](#use-a-summable-metric),
the expression must be in the form `SUM(metric_column_name)`, where
`metric_column_name` is a numeric data type.

To calculate a
[summable ratio metric](#use-a-summable-ratio-metric),
the expression must be in the form
`SUM(numerator_metric_column_name)/SUM(denominator_metric_column_name)`, where
`numerator_metric_column_name` and `denominator_metric_column_name` are
numeric data types.

To calculate a
[summable by category metric](#use-a-summable-by-category-metric),
the expression must be in the form
`SUM(metric_sum_column_name)/COUNT(DISTINCT categorical_column_name)`. The summed
column must be a numeric data type. The categorical column must have type
`BOOL`, `DATE`, `DATETIME`, `TIME`, `TIMESTAMP`, `STRING`, or `INT64`.

The expression is case insensitive.

You can't use any additional numerical computations in the contribution metric
expression. For example, neither `SUM(AVG(metric_col))` nor
`AVG(SUM(round(metric_col_numerator))/(SUM(metric_col_denominator))` is valid.
You can perform additional computations in the
[`query_statement`](#query_statement) if necessary.

The values in the metrics columns that you use in the `CONTRIBUTION_METRIC`
option must be non-negative, unless you specify `0` for the
`MIN_APRIORI_SUPPORT` value.

**Arguments**

A `STRING` value. There is no default value.

#### `IS_TEST_COL`

**Syntax**

`IS_TEST_COL = 'is_test_col'`

**Description**

Provides the name of the column to use to determine whether a given row is
test data or control data. The column that you specify must have a `BOOL`
data type.

**Arguments**

A `STRING` value. There is no default value.

#### `DIMENSION_ID_COLS`

**Syntax**

`DIMENSION_ID_COLS = dimension_column_array`

**Description**

Provides the names of the columns to use as dimensions when summarizing the
metric specified in the [`CONTRIBUTION_METRIC` option](#contribution_metric).
The dimension columns that you specify must have an `INT64`, `BOOL`, or `STRING`
data type.

Any rows in the dimension columns that contain `NULL` values are removed. If
you have `NULL` values in your data, you can preprocess the data to fill in the
`NULL` values by using the
[`ML.IMPUTER` function](imputer.md),
or by using the
[`IFNULL` expression](../googlesql-functions/conditional_expressions.md#ifnull)
to replace `NULL` values with a custom value.

If you want to use a
[numerical](../googlesql-syntax/data-types.md#numeric-types)
column that has a data type other than `INT64` as a dimension, you can use any
function that outputs an `INT64`, `BOOL`, or `STRING` value in the
`query_statement` to transform continuous values. For
example, you could use one of the
[numerical preprocessing functions](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing#numerical_functions),
such as
[`ML.BUCKETIZE`](bucketize.md).

Using fewer dimensions helps reduce the model creation runtime.

**Arguments**

An `ARRAY<STRING>` value. For example,
`['dimension_column_1','dimension_column_2','dimension_column_3']`.
The array can have 13 or fewer array elements when the `MIN_APRIORI_SUPPORT`
option value is `0`, and 50 or fewer array elements when the
`MIN_APRIORI_SUPPORT` option value is greater than `0`.

If you omit the `dimension_id_cols` option, then all columns in the query statement that are not specified in the `contribution_metric` or `is_test_col` options are used as `dimension_id_cols`.

#### `MIN_APRIORI_SUPPORT`

**Syntax**

`MIN_APRIORI_SUPPORT = min_apriori_support`

**Description**

Provide the minimum
[apriori support threshold](#use-an-apriori-support-threshold) for including
segments in the model output. All segments whose
[`apriori_support` value](get-insights.md#output)
is less than the `MIN_APRIORI_SUPPORT` value that you specify are excluded.
The `MIN_APRIORI_SUPPORT` option can't be used together with
`TOP_K_INSIGHTS_BY_APRIORI_SUPPORT`.

**Arguments**

A `FLOAT64` value in the range `[0, 1]`. The default value is `0.1`.

#### `TOP_K_INSIGHTS_BY_APRIORI_SUPPORT`

**Syntax**

`TOP_K_INSIGHTS_BY_APRIORI_SUPPORT = top_k_insights_by_apriori_support`

**Description**

Provide the maximum number of insights to output with the highest apriori
support value. The model automatically retrieves the insights with the
highest apriori support values and prunes insights with low apriori support,
decreasing query runtime compared to using no apriori support thresholding. The
`TOP_K_INSIGHTS_BY_APRIORI_SUPPORT` option can't be used together with
`MIN_APRIORI_SUPPORT`.

**Arguments**

An `INT64` value between 1 and 1,000,000. There is no default value. If no
`TOP_K_INSIGHTS_BY_APRIORI_SUPPORT` is specified, a `MIN_APRIORI_SUPPORT`
threshold of 0.1 is applied.

#### `PRUNING_METHOD`

**Syntax**

`PRUNING_METHOD = {'NO_PRUNING' | 'PRUNE_REDUNDANT_INSIGHTS'}`

**Description**

The pruning method used to filter insights generated by the model.

**Arguments**

- `NO_PRUNING`: All insights are returned, respecting any apriori support thresholds specified by `MIN_APRIORI_SUPPORT` or `TOP_K_INSIGHTS_BY_APRIORI_SUPPORT`.
- `PRUNE_REDUNDANT_INSIGHTS`: Redundant insights are pruned from the model.
  Two rows are considered to be redundant insights if the following
  conditions are met:

  - Their metric values are equal.
  - The dimension IDs and corresponding values of one row are a subset of the dimension IDs and corresponding values of the other. In this case, the row with more dimension IDs (the more descriptive row) is kept.

  The `all` insight row is never pruned.

The default value is `NO_PRUNING`.

#### `query_statement`

The
[GoogleSQL query](../googlesql-syntax/query-syntax-1.md)
that contains the test and control data to analyze. The table of input data
that you specify in the query must contain exactly the columns that you
reference in the
`CONTRIBUTION_METRIC`, `DIMENSION_ID_COLS`, and `IS_TEST_COL` options.

### Choose test and control data

Contribution analysis requires test (interest) and control (reference) data in a single table as input. The control set is used as a baseline to compare against the test set, which contains the data points of interest. The following are examples of test and control sets:

<br />

- **Periods of time:** Compare two different months of revenue data.
- **Geographic regions:** Compare retention rate across different countries.
- **Product types:** Compare sales per user across different product types.
- **Campaign or promotion:** Compare website engagement across different ad campaigns.

To set up the input data, you can create tables of test and control data
separately and take the union of the two tables.
The final input table must
contain your dimension columns, numeric metric columns, and a categorical column
if you're using a summable by category metric.
For best results, we recommend
having roughly equal numbers of test and control rows when using
the summable or summable ratio
metric to avoid biased results.
If the number of test and
control rows are unbalanced, then the
[summable by category metric](#use-a-summable-by-category-metric)
might reduce bias by normalizing the numeric metric against categorical values,
allowing for easier comparisons between contributors.

### Use a summable metric

A summable metric contribution analysis model summarizes the values of a
metric column that you specify, and then determines a total for each segment of
the data. For example, you might summarize by revenue, or by number of items
sold.

An example input dataset for a summable metric contribution analysis model
might look similar to the following table:

| **product** | **store** | **city** | **revenue** | **is_test** |
|---|---|---|---|---|
| shoe_1 | store_2 | Mountain View | 100 | true |
| shoe_1 | store_3 | Sunnyvale | 200 | true |
| shoe_2 | store_1 | San Francisco | 85 | true |
| shoe_1 | store_2 | Mountain View | 100 | false |
| shoe_1 | store_3 | Sunnyvale | 150 | false |
| shoe_2 | store_1 | San Francisco | 175 | false |

In this example, the numerical `revenue` column provides the metric to
analyze. The `product`, `store`, and `city` columns are the
dimensions to analyze as contributors to total revenue. The `is_test` column
value indicates whether the row belongs to the test set or the control set.
Your `CREATE MODEL` statement would include the following:

```sql
CONTRIBUTION_METRIC = 'SUM(revenue)',
DIMENSION_ID_COLS = ['product', 'store', 'city'],
IS_TEST_COL = 'is_test',
```

### Use a summable ratio metric

A summable ratio metric contribution analysis model summarizes the values of
two numeric columns that you specify, and determines the ratio between them for
each segment of the data. For example, you might analyze the ratio between cost
and clicks values to determine the cost per click in an ad campaign.

An example input dataset for a summable ratio metric contribution analysis model
might look similar to the following table:

| **browser** | **device** | **cost** | **clicks** | **is_test** |
|---|---|---|---|---|
| Chrome | iPad | 100.00 | 30 | true |
| Firefox | Pixel | 100.00 | 10 | true |
| Edge | Pixel | 250.00 | 40 | true |
| Chrome | iPad | 100.00 | 40 | false |
| Firefox | Pixel | 50.00 | 5 | false |

In this case, the numerical `cost` and `clicks` columns provide the metrics to
analyze. The `browser` and `device` columns are the dimensions to analyze as
contributors to the cost and click values. The `is_test` column
value indicates whether the row belongs to the test set or the control set.
Your `CREATE MODEL` statement would include the following:

```sql
CONTRIBUTION_METRIC = 'SUM(cost)/SUM(clicks)',
DIMENSION_ID_COLS = ['browser', 'device'],
IS_TEST_COL = 'is_test',
```

### Use a summable by category metric

A summable by category metric contribution analysis model sums the value of a
numeric column and divides it by the number of distinct values from a
categorical column, defined as a column of one of the following types:

- `BOOL`
- `DATE`
- `DATETIME`
- `TIME`
- `TIMESTAMP`
- `STRING`
- `INT64`.

For example, if `sales` is your numeric column and `month`
is your categorical column, then the metric would analyze the contributions of
each segment to monthly sales.

An example input dataset for the summable by category metric contribution
analysis model might look similar to the following table:

| **item_id** | **category** | **sales** | **month** | **is_test** |
|---|---|---|---|---|
| 1 | shirts | 150 | December | true |
| 2 | jackets | 100 | January | true |
| 3 | hats | 50 | April | true |
| 1 | shirts | 125 | February | false |
| 4 | hats | 10 | February | false |
| 2 | jackets | 75 | November | false |

In this case, the numerical sales and categorical month columns provide the
metrics to analyze. The `item_id` and `category` columns are
the dimensions to analyze as contributors to the sales per month values.
The `is_test` column value indicates whether the row belongs to the test set or
the control set. Your `CREATE MODEL` statement would include the following:

```sql
CONTRIBUTION_METRIC = 'SUM(sales)/COUNT(DISTINCT month)',
DIMENSION_ID_COLS = ['item_id', 'category'],
IS_TEST_COL = 'is_test',
```

### Use an apriori support threshold

You can optimize a contribution analysis model by specifying an apriori support
threshold. The model uses the threshold value that you specify to prune the
search space and include only larger segments.
Apriori support is measured by comparing the
size of each segment relative to the rest of the population, and dropping the
segments where this ratio is less than the model's apriori support threshold
value.
This pruning lets you analyze only the segments of data that are large enough to
be of interest, and also reduces model creation time. There are two ways that
you can use an apriori support threshold in a contribution analysis model:

1. Tune your own apriori support value with `MIN_APRIORI_SUPPORT`.
2. Provide the maximum number of insights to retrieve using `TOP_K_INSIGHTS_BY_APRIORI_SUPPORT`, which automatically fetches the `k` insights with the highest apriori support values.

### Examples

The following examples show how to create contribution analysis models.

**Example 1**

The following example creates a contribution analysis model that uses a
summable metric:

```sql
CREATE (OR REPLACE) MODEL `myproject.mydataset.ca_model`
  OPTIONS(
    MODEL_TYPE = 'CONTRIBUTION_ANALYSIS',
    CONTRIBUTION_METRIC = 'SUM(house_price)',
    DIMENSION_ID_COLS = ['city', 'floor_space'],
    IS_TEST_COL = 'dataset_type'
) AS
SELECT * FROM mydataset.house_sales WHERE state = 'WA';
```

**Example 2**

The following example creates a contribution analysis model that uses a
summable ratio metric:

```sql
CREATE (OR REPLACE) MODEL `myproject.mydataset.ca_model`
  OPTIONS(
    MODEL_TYPE = 'CONTRIBUTION_ANALYSIS',
    CONTRIBUTION_METRIC = 'SUM(concessions_sold)/SUM(attendee_count)',
    DIMENSION_ID_COLS = ['venue_ID','event_date','concession_type'],
    IS_TEST_COL = 'test_col',
    MIN_APRIORI_SUPPORT = .08
) AS
SELECT concessions_sold, attendee_count, venue_ID,
  event_date, concession_type, test_col
FROM mydataset.regional_sales;
```

**Example 3**

The following example creates a contribution analysis model that uses a
summable by category metric:

```googlesql
CREATE (OR REPLACE) MODEL `myproject.mydataset.ca_model`
  OPTIONS(
    MODEL_TYPE = 'CONTRIBUTION_ANALYSIS',
    CONTRIBUTION_METRIC = 'SUM(concessions_sold)/COUNT(DISTINCT sales_date)',
    DIMENSION_ID_COLS = ['venue_ID','event_date', 'attendee_count', 'concession_type'],
    IS_TEST_COL = 'test_col',
    TOP_K_INSIGHTS_BY_APRIORI_SUPPORT = 25,
    PRUNING_METHOD = 'PRUNE_REDUNDANT_INSIGHTS'
) AS
SELECT concessions_sold, attendee_count, venue_ID,
  event_date, concession_type, test_col, sales_date
FROM mydataset.regional_sales;
```

### What's next

- Learn how to call the [`ML.GET_INSIGHTS` function](get-insights.md) to get insights from your contribution analysis model.
- Try a tutorial on how to [Get data insights from a contribution analysis model using a summable metric](https://docs.cloud.google.com/bigquery/docs/get-contribution-analysis-insights).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-contribution-analysis (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
