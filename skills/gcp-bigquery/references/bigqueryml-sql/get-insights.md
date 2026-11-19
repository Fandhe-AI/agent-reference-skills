---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-get-insights
---

# The ML.GET_INSIGHTS function

## Signature / Usage

This document describes the `ML.GET_INSIGHTS` function, which you can use to
retrieve information about changes to key metrics in your multi-dimensional data
from a
[contribution analysis](https://docs.cloud.google.com/bigquery/docs/contribution-analysis) model.
You can use a
[`CREATE MODEL` statement](create-contribution-analysis.md)
to create a contribution analysis model in BigQuery.

### Syntax

```sql
ML.GET_INSIGHTS(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`
)
```

#### Arguments

`ML.GET_INSIGHTS` takes the following arguments:

- `PROJECT_ID`: Your project ID.
- `DATASET`: The BigQuery dataset that contains the model.
- `MODEL_NAME`: The name of the contribution analysis model.

### Output

Some of the `ML.GET_INSIGHTS` output columns contain metrics that compare the
values for a given segment in either the test or control dataset against the
values for the *population* , which is all segments in the same dataset. The
metric values calculated for the entire population except for the given segment
are referred to as *complement* values.

#### Output for summable metric contribution analysis models

`ML.GET_INSIGHTS` returns the following output columns for contribution
analysis models that use
[summable metrics](create-contribution-analysis.md#use-a-summable-metric),
in addition to the dimension columns:

- `contributors`: an `ARRAY<STRING>` value that contains the dimension values for a given segment. The other output metrics that are returned in the same row apply to the segment described by these dimensions.
- `metric_test`: a numeric value that contains the sum of the value of the
  metric column in the test dataset for the given segment. The metric column is
  specified in the `CONTRIBUTION_METRIC` option of the contribution analysis
  model.

  `SUM(metric_column_name) WHERE is_test_col = TRUE`
- `metric_control`: a numeric value that contains the sum of the value of the
  metric column in the control dataset for the given segment. The metric column
  is specified in the `CONTRIBUTION_METRIC` option of the contribution analysis
  model.

  `SUM(metric_column_name) WHERE is_test_col = FALSE`
- `difference`: a numeric value that contains the difference between the
  `metric_test` and `metric_control` values:

  `metric_test - metric_control`
- `relative_difference`: a numeric value that contains the relative change in
  the segment value between the test and control datasets:

  `difference / metric_control`
- `unexpected_difference`: a numeric value that contains the unexpected
  difference between the segment's actual `metric_test` value and the segment's
  expected `metric_test` value, which is determined by comparing the ratio of
  change for this segment against the complement ratio of change. The
  `unexpected_difference` value is calculated as follows:

  1. Determine the `metric_test` value for all segments except the given
     segment, referred to here as `complement_test_change`:

     `complement_test_change = sum(metric_test for the population) - metric_test`
  2. Determine the `metric_control` value for all segments except the given
     segment, referred to here as `complement_control_change`:

     `complement_control_change = sum(metric_control for the population) - metric_control`
  3. Determine the ratio between the `complement_test_change` and
     `complement_control_change` values, referred to here as
     `complement_change_ratio`:

     `complement_change_ratio = complement_test_change / complement_control_change`
  4. Determine the expected `metric_test` value for the given
     segment, referred to here as `expected_metric_test`:

     `expected_metric_test = metric_control * complement_change_ratio`
  5. Determine the `unexpected_difference` value:

     `unexpected_difference = metric_test - expected_metric_test`
- `relative_unexpected_difference`: a numeric value that contains the
  ratio between the `unexpected_difference` value and the `expected_metric_test`
  value:

  `unexpected_difference / expected_metric_test`

  You can
  use the `relative_unexpected_difference` value to determine if the change to
  this segment is smaller than expected compared to the change in all of the
  other segments.
- `apriori_support`: a numeric value that contains the apriori support value
  for the segment. The apriori support value is either the ratio between the
  `metric_test` value for the segment and the `metric_test` value for the
  population, or the ratio between the `metric_control` value for the segment
  and the `metric_control` value for the population, whichever is greater.
  The calculation is expressed as the following:

  ```text
  GREATEST(
    metric_test / SUM(metric_test for the population),
    metric_control / SUM(metric_control for the population)
  )
  ```

  If the `apriori_support` value is less than the
  [apriori support threshold](create-contribution-analysis.md#use-an-apriori-support-threshold)
  value specified in the model, then the segment is considered too small to be
  of interest and is excluded by the model.
- `contribution`: a numeric value that contains the absolute value of the
  `difference` value: `ABS(difference)`.

Insights are automatically ordered by contribution in descending order to
determine the contributors associated with the largest differences in your
data between the test and control sets.

#### Output for summable ratio metric contribution analysis models

`ML.GET_INSIGHTS` returns the following output columns for contribution
analysis models that use
[summable ratio metrics](create-contribution-analysis.md#use-a-summable-ratio-metric), in
addition to the dimension columns:

- `contributors`: an `ARRAY<STRING>` value that contains the dimension values for a given segment. The other output metrics that are returned in the same row apply to the segment described by these dimensions.
- `metric_test`: a numeric value that contains the ratio between the
  two metrics that you are evaluating, in the test dataset for the given
  metric. These two metrics are specified in the
  [`CONTRIBUTION_METRIC` option](create-contribution-analysis.md#contribution_metric) of the
  contribution analysis model. The `metric_test` value is calculated as the
  following:

  `sum(numerator_metric_column_name) / sum(denominator_metric_column_name) WHERE is_test_col = TRUE`
- `metric_control`: a numeric value that contains the ratio between the
  two metrics that you are evaluating, in the control dataset for the
  given metric. These two metrics are specified in the
  [`CONTRIBUTION_METRIC` option](create-contribution-analysis.md#contribution_metric) of the
  contribution analysis model. The `metric_control` value is calculated as
  the following:

  `SUM(numerator_metric_column_name) / SUM(denominator_metric_column_name) WHERE is_test_col = FALSE`
- `metric_test_over_metric_control`: a numeric value that contains the ratio
  between the `metric_test` value and the `metric_control` value:

  `metric_test / metric_control`
- `metric_test_over_complement`: a numeric value that contains the ratio
  between the `metric_test` value for this segment and the complement
  `metric_test` value:

  `metric_test / SUM(metric_test for the complement)`

  You can use the
  `metric_test_over_complement` value to compare the size of this segment to
  the size the other segments.

  For example, consider the following table of test data:

  | dim1 | dim2 | dim3 | metric_a | metric_b |
  |---|---|---|---|---|
  | 1 | 10 | 20 | 50 | 100 |
  | 1 | 15 | 30 | 75 | 200 |
  | 5 | 20 | 40 | 1 | 10 |

  Assume that the `CONTRIBUTION_METRIC` value is
  `SUM(metric_a) / SUM(metric_b)`. Using the data in the preceding table, the
  `metric_a` value for the population is `126`, while the `metric_b` value for
  the population is
  `310`. The `metric_test_over_complement` value for the segment in the first
  row of the table is calculated as the following:

  `(50/100)/((75+1)/(200+10)) = .5/(76/210) = 1.38`

  This
  `metric_test_over_complement` value indicates that the size of this segment
  is larger than the size of all of the other segments combined.
  Alternatively, the `metric_test_over_complement` value for the segment in
  the third row of table is calculated as the following:

  `(1/10)/((50+75)/(100+200)) = .1/(125/300) = 0.24`

  This `metric_test_over_complement` value indicates that the size of this
  segment is smaller than the combined size of the rest of the segments.
- `metric_control_over_complement`: a numeric value that contains the ratio
  between the `metric_control` value for this segment and the complement
  `metric_control` value:

  `metric_control / sum(metric_control for the complement)`

  You can use the
  `metric_control_over_complement` value to compare the size of this segment to
  the size of the other segments.
- `aumann_shapley_attribution`: a numeric value that contains the
  [Aumann-Shapley
  value](https://wikipedia.org/wiki/Shapley_value#Aumann%E2%80%93Shapley_value)
  for this segment. The Aumann-Shapley value measures the contribution of the
  segment ratio relative to the population ratio. You can use the Aumann-Shapley
  value to determine [how much a feature contributes to the prediction
  value](https://papers.nips.cc/paper_files/paper/2017/file/8a20a8621978632d76c43dfd28b67767-Paper.pdf).
  In the context of contribution analysis, BigQuery ML uses the
  Aumann-Shapley value to measure the attribution of the segment relative to the
  population. When calculating this measurement, the service considers the
  segment ratio changes and the complement population changes between the test
  and control datasets.

- `apriori_support`: a numeric value that contains the apriori support value
  for the segment. The apriori support value is calculated using the numerator
  column specified in the model's `CONTRIBUTION_METRIC` option:

  `numerator column value for the given segment / SUM(numerator column value for the population)`

  If the `apriori_support` value is less than the
  [apriori support threshold](create-contribution-analysis.md#use-an-apriori-support-threshold)
  value specified in the model, then the segment is considered too small to be
  of interest and is excluded by the model.
- `contribution`: a numeric value that contains the absolute value of the
  `aumann_shapley_attribution`:

  `ABS(aumann_shapley_attribution)`

Insights are automatically ordered by contribution in descending order to
determine the contributors associated with the largest differences in your
data between the test and control sets.

#### Output for summable by category metric contribution analysis models

`ML.GET_INSIGHTS` returns the following output columns for contribution analysis
models that use summable category metrics, in addition to the dimension columns:

- `contributors`: an `ARRAY<STRING>` value that contains the dimension values for a given segment. The other output metrics that are returned in the same row apply to the segment described by these dimensions.
- `metric_test`: a numeric value that contains the ratio between the sum of
  the metric column and the number of distinct values of the count distinct
  column in the test dataset for a given segment:

  `SUM(sum_column_name) / COUNT(DISTINCT categorical_column_name) WHERE is_test_col = TRUE`

  The metric and count distinct columns are specified in the
  `CONTRIBUTION_METRIC` option of the contribution analysis model.
- `metric_control`: a numeric value that contains the ratio between the sum
  of the metric column and the number of distinct values of the count distinct
  column in the control dataset for a given segment:

  `SUM(sum_column_name) / COUNT(DISTINCT categorical_column_name) WHERE is_test_col = FALSE`

  The metric and categorical columns are specified in
  the `CONTRIBUTION_METRIC` option of the contribution analysis model.
- `difference`: a numeric value that contains the difference between the
  `metric_test` and `metric_control` values:

  `metric_test - metric_control`.
- `relative_difference`: a numeric value that contains the relative change in
  the segment value between the test and control datasets:

  `difference/metric_control`
- `metric_test_over_population`: a numeric value that contains the ratio
  between the `metric_test` value for this segment and the `metric_test` value
  for the population:

  `metric_test / (metric_test for the population)`

  You can use the
  `metric_test_over_population` value to compare the size of the segment to the
  overall size of the test dataset.
- `metric_control_over_population`: a numeric value that contains the ratio
  between the `metric_control` value for this segment and the `metric_control`
  value for the population:

  `metric_control / (metric_control for the population)`

  You can use the
  `metric_control_over_population` value to compare the size of the segment to
  the overall size of the control dataset.
- `apriori_support`: a numeric value that contains the apriori support value
  for the segment. To calculate apriori support, the `sum_metric_column`
  is used to compute the segment size relative to the population for both the
  test and control datasets and `apriori_support` is selected as the greater of
  the two values. The calculation is expressed as the following:

  ```text
  GREATEST(
    SUM(sum_column_name test) / SUM(sum_column_name test for the population),
    SUM(sum_column_name control) / SUM(sum_column_name control for the population)
  )
  ```

  If the `apriori_support` value is less than the apriori support threshold
  value specified in the model, then the segment is considered too small to be
  of interest and is excluded by the model.
- `contribution`: a numeric value that contains the absolute value of the
  difference, calculated as `ABS(difference)`.

Insights are automatically ordered by contribution in descending order to
quickly determine the contributors associated with the largest differences in
your data between the test and control sets.

### What's next

[Get data insights from a contribution analysis model](https://docs.cloud.google.com/bigquery/docs/get-contribution-analysis-insights).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-get-insights (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
