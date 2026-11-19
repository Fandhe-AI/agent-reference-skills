---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-key-drivers
---

# The AI.KEY_DRIVERS function

## Signature / Usage

This document describes the `AI.KEY_DRIVERS` function, which you can use to
identify segments of data that cause statistically significant changes to
a summable metric. For example, if you launch a new product, then the
following query identifies the locations where new product sales were most
unexpected:

```sql
SELECT *
FROM AI.KEY_DRIVERS(
  TABLE `mydataset.sales_table`,
  metric_col => 'sales',
  dimension_cols => ['state', 'city'],
  interest_label_col => 'is_new_product'
);
```

Calling the `AI.KEY_DRIVERS` function is similar to first
[creating a contribution analysis model](create-contribution-analysis.md)
and then calling the
[`ML.GET_INSIGHTS` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-get-insights)
on that model. For most applications, we recommend using the `AI.KEY_DRIVERS`
function because it offers a simplified syntax, faster results, and automatic
pruning. The following table summarizes the differences:

| `AI.KEY_DRIVERS` | Contribution analysis model with `ML.GET_INSIGHTS` |
|---|---|
| Supports a maximum of 12 dimensions | Supports more than 12 dimensions |
| Supports only a summable metric | Supports summable, summable by ratio, and summable by category metrics |
| Prunes redundant insights by default | Returns all insights by default |
| The segment column in the output is called `drivers` | The segment column in the output is called `contributors` |
| No model management required | Requires you to create and manage a model |

### Input data

Your input table or query result to the `AI.KEY_DRIVERS` function must
include the following:

- A numerical metric column that contains a summable metric.
- A boolean column that indicates whether each row belongs to the interest or reference set.
- Structured data with dimension columns.

### Syntax

```googlesql
AI.KEY_DRIVERS(
    { TABLE TABLE_NAME | (QUERY_STATEMENT) },
    metric_col => 'METRIC_COL',
    dimension_cols => DIMENSION_COLS,
    interest_label_col => 'INTEREST_LABEL_COL',
    [, min_apriori_support => MIN_APRIORI_SUPPORT]
    [, top_k => TOP_K]
    [, enable_pruning => ENABLE_PRUNING]
)
```

#### Arguments

The `AI.KEY_DRIVERS` function takes the following arguments:

- `TABLE_NAME`: the name of the table that contains the
  interest and reference data to analyze.

- `QUERY_STATEMENT`: a GoogleSQL query
  that produces the interest and reference data to analyze.

- `METRIC_COL`: a `STRING` expression to use to
  calculate a summable metric. The expression must be
  in the form `SUM(metric_column_name)` or `metric_column_name`, where
  `metric_column_name` is the name of a column of a numeric data type. Both
  expressions are treated as equivalent. The expression is case insensitive.

  You can't use any additional numerical computations in the contribution metric
  expression. For example, neither `SUM(AVG(metric_col))` nor
  `AVG(SUM(round(metric_col_numerator))/(SUM(metric_col_denominator))` is valid.
  You can perform additional computations in your query_statement if necessary.

  The values in the metric column that you use in the `METRIC_COL` option must
  be non-negative, unless you specify `0` for the `MIN_APRIORI_SUPPORT` value.
- `DIMENSION_COLS`: an `ARRAY<STRING>`
  that lists the names of the columns to use as dimensions when summarizing the
  metric specified in the `METRIC_COL` option.
  The dimension columns that you specify must have an `INT64`, `BOOL`, or
  `STRING` data type. You must provide between 1 and 12 columns. You can't use
  the columns from the `METRIC_COL` or `INTEREST_LABEL_COL` arguments
  as dimensions.

  Any rows in the dimension columns that contain `NULL` values are removed. If
  you have `NULL` values in your data, you can preprocess the data to fill in the
  `NULL` values by using the
  [`ML.IMPUTER` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-imputer),
  or by using the
  [`IFNULL` expression](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions#ifnull)
  to replace `NULL` values with a custom value.
- `INTEREST_LABEL_COL`: a `STRING` value that contains the
  name of the column to use to determine whether a given row is
  interest group or reference group. The column that you specify must have a `BOOL`
  data type. For more information, see
  [choose interest and reference data](#choose-interest-and-reference-data).

- `MIN_APRIORI_SUPPORT`: a `FLOAT64` value in the range
  `[0,1]` that contains
  the minimum apriori support threshold for including
  segments in the output. The apriori support for a segment is computed as the
  following:

  ```text
  GREATEST(
    metric_interest / SUM(metric_interest for the population),
    metric_reference / SUM(metric_reference for the population)
  )
  ```

  The `metric_interest` and `metric_reference` values are the sum of the metric
  column for the segment on the interest or reference group respectively.
  All segments whose
  `apriori_support` value is less than the `MIN_APRIORI_SUPPORT` value that you
  specify are excluded from the output. You can't use the `MIN_APRIORI_SUPPORT`
  option with `TOP_K`. The default value is `0.1`.
- `TOP_K`: an `INT64` value
  between 1 and 1,000,000 that contains the maximum number
  of insights to output with the highest apriori
  support value. The model automatically retrieves the insights with the
  highest apriori support values and prunes insights with low apriori support,
  decreasing query runtime compared to using no apriori support thresholding.
  The `TOP_K` option can't be used together with
  `MIN_APRIORI_SUPPORT`.

  An `INT64` value between 1 and 1,000,000. There is no default value. If no
  `TOP_K` is specified, a `MIN_APRIORI_SUPPORT`
  threshold of 0.1 is applied.
- `ENABLE_PRUNING`: a `BOOL` value that determines
  whether the model filters the insights generated by the model according to
  the following:

  - `FALSE`: All insights are returned except those filtered
    by apriori support thresholds specified by `MIN_APRIORI_SUPPORT` or
    `TOP_K`.

  - `TRUE`: Redundant insights are omitted
    from the result. Two rows are considered to contain redundant insights
    if the following conditions are met:

    - Their metric values are equal.
    - The dimensions and corresponding values of one row are a subset of the dimensions and corresponding values of the other. In this case, the row that has more dimensions (the more descriptive row) is kept.

    The `all` insight row is never pruned.

  The default value is `TRUE`.

### Choose interest and reference data

Key driver
analysis requires test (interest) and control
(reference) data in a single
table as input. The control set is used as a baseline to compare
against the
test set, which contains the data points of interest. The following
are examples of test and control sets:

- **Periods of time:** Compare two different months of revenue data.
- **Geographic regions:** Compare retention rate across different countries.
- **Product types:** Compare sales per user across different product types.
- **Campaign or promotion:** Compare website engagement across different ad campaigns.

To set up the input data, you can create tables of test and control data
separately and take the union of the two tables.

For best results, we recommend
having roughly equal numbers of test and control rows when using
the summable
metric to avoid biased results.

### Output

`AI.KEY_DRIVERS` returns the following output columns
in addition to the dimension columns:

- `drivers`: an `ARRAY<STRING>` value that contains the dimension values
  for a given segment. The other output metrics that are returned in the same
  row apply to the segment described by these dimensions.

- `metric_interest`: a numeric value that contains the sum of the value of the
  metric column in the interest dataset for the given segment.

- `metric_reference`: a numeric value that contains the sum of the value of the
  metric column in the reference dataset for the given segment.

- `difference`: a numeric value that contains the difference between the
  `metric_interest` and `metric_reference` values:

  `metric_interest - metric_reference`
- `relative_difference`: a numeric value that contains the relative change in
  the segment value between the interest and reference datasets:

  `difference / metric_reference`
- `unexpected_difference`: a numeric value that contains the unexpected
  difference between the segment's actual `metric_interest` value and the segment's
  expected `metric_interest` value, which is determined by comparing the ratio of
  change for this segment against the complement ratio of change. The
  `unexpected_difference` value is calculated as follows:

  1. Determine the `metric_interest` value for all segments except the given
     segment, referred to here as `complement_interest_change`:

     `complement_interest_change = sum(metric_interest for the population) - metric_interest`
  2. Determine the `metric_reference` value for all segments except the given
     segment, referred to here as `complement_reference_change`:

     `complement_reference_change = sum(metric_reference for the population) - metric_reference`
  3. Determine the ratio between the `complement_interest_change` and
     `complement_reference_change` values, referred to here as
     `complement_change_ratio`:

     `complement_change_ratio = complement_interest_change / complement_reference_change`
  4. Determine the expected `metric_interest` value for the given
     segment, referred to here as `expected_metric_interest`:

     `expected_metric_interest = metric_reference * complement_change_ratio`
  5. Determine the `unexpected_difference` value:

     `unexpected_difference = metric_interest - expected_metric_interest`
- `relative_unexpected_difference`: a numeric value that contains the
  ratio between the `unexpected_difference` value and the `expected_metric_interest`
  value:

  `unexpected_difference / expected_metric_interest`

  You can
  use the `relative_unexpected_difference` value to determine if the change to
  this segment is smaller than expected compared to the change in all of the
  other segments.
- `apriori_support`: a numeric value that contains the apriori support value
  for the segment. The apriori support value is either the ratio between the
  `metric_interest` value for the segment and the `metric_interest` value for
  the population, or the ratio between the `metric_reference` value for the
  segment and the `metric_reference` value for the population, whichever is
  greater. The calculation is expressed as the following:

  ```text
  GREATEST(
    metric_interest / SUM(metric_interest for the population),
    metric_reference / SUM(metric_reference for the population)
  )
  ```

  If the `apriori_support` value is less than the
  [apriori support threshold](create-contribution-analysis.md#use-an-apriori-support-threshold)
  value specified in the model, then the segment is considered too small to be
  of interest and is excluded by the model.
- `contribution`: a numeric value that contains the absolute value of the
  `difference` value: `ABS(difference)`.

### Example

The following query shows how to use the `AI.KEY_DRIVERS` function to analyze
publicly available Iowa liquor sale data from 2024. The reference data consists
of sales that happened in the first half of the year
2024 and the interest data consists of sales that happened in the second
half of the year 2024. The `min_apriori_support` argument is set to 0 so
that all segments are included in the output.

```sql
WITH InputData AS (
  SELECT
    CAST(sale_dollars AS BIGNUMERIC) AS sale_dollars,
    city,
    category_name,
    vendor_name,
    (date > '2024-07-01') AS IS_H2
  FROM `bigquery-public-data.iowa_liquor_sales.sales`
  WHERE EXTRACT(YEAR FROM DATE) = 2024)

SELECT * EXCEPT(city, vendor_name, category_name)
FROM AI.KEY_DRIVERS(
  TABLE InputData,
  metric_col => 'sale_dollars',
  dimension_cols => ['city', 'vendor_name', 'category_name'],
  interest_label_col => 'IS_H2',
  min_apriori_support => 0
);
```

The first several rows of the output look similar to the following. The values
are truncated to improve readability:

| drivers | metric_interest | metric_reference | difference | relative_difference | unexpected_difference | relative_unexpected_difference | apriori_support | contribution |
|---|---|---|---|---|---|---|---|---|
| \[all\] | 230372400 | 216802833 | 13569567 | 0.063 | 13569567 | 0.063 | 1 | 13569567 |
| \[category_name=DIAGEO AMERICAS\] | 50788320 | 43857330 | 6930990 | 0.158 | 5247510 | 0.115 | 0.220 | 6930990 |
| \[vendor_name=TEMPORARY \& SPECIALTY PACKAGES\] | 11068763 | 5297807 | 5770957 | 1 | 5575616 | 1 | 0.048 | 5770957 |
| \[vendor_name=TEMPORARY \& SPECIALTY PACKAGES,category_name=DIAGEO AMERICAS\] | 6196380 | 2771982 | 3424398 | 1 | 3293005 | 1 | 0.027 | 3424398 |
| \[vendor_name=STRAIGHT BOURBON WHISKIES\] | 21255149 | 19015184 | 2239965 | 0.118 | 1150744 | 0.057 | 0.092 | 2239965 |
| \[city=URBANDALE\] | 3661058 | 2111396 | 1549663 | 0.734 | 1431452 | 0.642 | 0.016 | 1549663 |
| \[category_name=SAZERAC COMPANY INC\] | 35528047 | 34155473 | 1372574 | 0.040 | -908292 | -0.025 | 0.158 | 1372574 |
| \[category_name=BROWN FORMAN CORP.\] | 10863109 | 9572464 | 1290644 | 0.135 | 723452 | 0.071 | 0.047 | 1290644 |
| \[city=DES MOINES\] | 25824531 | 27001845 | -1177314 | -0.044 | -3275264 | -0.113 | 0.125 | 1177314 |

You can infer insights such as the following from the results:

- **Total sales:** Overall sales volume increased by
  6.3% from the first half (H1) to the second
  half (H2) of the year, growing from a reference metric value of $216.8M to an
  interest metric value of $230.4M. This represents a $13.6M absolute
  difference.

- **Vendor Contribution:** Diageo Americas was a significant contributor to the
  growth, realizing a $6.9M increase (Interest: $50.8M, Reference: $43.9M),
  which translates to a 15.8% relative growth. In contrast, while Sazerac's
  sales also grew by $1.4M (Interest: $35.5M, Reference: $34.2M), this 4% growth
  rate was smaller than expected.

- **Geographic Decline:** The city of Des Moines experienced a sales decline of
  $1.2M (Interest: $25.8M, Reference: $27.0M), resulting in a relative
  difference of -4.4%. Critically, this segment of the data accounts for 12.5%
  (its `apriori_support` value) of the overall population.

### What's next

- Learn more about [contribution analysis](https://docs.cloud.google.com/bigquery/docs/contribution-analysis).
- Learn how to [create a contribution analysis model](create-contribution-analysis.md).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-key-drivers (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
