---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-centroids
---

# The ML.CENTROIDS function

## Signature / Usage

This document describes the `ML.CENTROIDS` function, which lets you return
information about the
[centroids](https://developers.google.com/machine-learning/glossary/#centroid)
in a
[k-means model](create-kmeans.md).

### Syntax

```sql
ML.CENTROIDS(
  MODEL `PROJECT_ID.DATASET.MODEL`,
  STRUCT([, STANDARDIZE AS standardize]))
```

#### Arguments

`ML.CENTROIDS` takes the following arguments:

- `PROJECT_ID`: your project ID.
- `DATASET`: the BigQuery dataset that contains the model.
- `MODEL`: the name of the model.
- `STANDARDIZE`: a `BOOL` value that specifies whether the centroid features should be standardized to assume that all features have a mean of `0` and a standard deviation of `1`. Standardizing the features allows the absolute magnitude of the values to be compared to each other. The default value is `FALSE`.

### Output

`ML.CENTROIDS` returns the following columns:

- `trial_id`: an `INT64` value that contains the hyperparameter tuning trial ID. This column is only returned if you ran hyperparameter tuning when creating the model.
- `centroid_id`: an `INT64` value that contains the centroid ID.
- `feature`: a `STRING` value that contains the feature column name.
- `numerical_value`: a `FLOAT64` value that contains the feature value for the centroid that `centroid_id` identifies if the column identified by the `feature` value is numeric. Otherwise, `numerical_value` is `NULL`.
- `categorical_value`: an `ARRAY<STRUCT>` value that contains information
  about categorical features. Each struct contains the following fields:

  - `categorical_value.category`: a `STRING` value that contains the name of each category.
  - `categorical_value.value`: a `STRING` value that contains the value of `categorical_value.category` for the centroid that `centroid_id` identifies.
- `geography_value`: a `STRING` value that contains the
  `categorical_value.category` value for the centroid that `centroid_id`
  identifies if the column identified by the `feature` value is of type
  `GEOGRAPHY`. Otherwise, `geography_value` value is `NULL`.

The output contains one row per feature per centroid.

### Examples

The following examples show how to use `ML.CENTROIDS` with and without the
`standardize` argument.

#### Without standardization

**Numerical features**

The following example retrieves centroid information from the model
`mydataset.my_kmeans_model` in your default project. This model only
contains numerical features.

```sql
SELECT
  *
FROM
  ML.CENTROIDS(MODEL `mydataset.my_kmeans_model`)
```

This query returns results like the following:

```text
+-------------+-------------------+----------------------+---------------------+
| centroid_id | feature           | numerical_value      | categorical_value   |
+-------------+-------------------+----------------------+---------------------+
|           3 | x_coordinate      |            3095929.0 |                  [] |
|           3 | y_coordinate      | 1.0089726307692308E7 |                  [] |
|           2 | x_coordinate      |        3117072.65625 |                  [] |
|           2 | y_coordinate      | 1.0083220745833334E7 |                  [] |
|           1 | x_coordinate      |    3259947.096227731 |                  [] |
|           1 | y_coordinate      | 1.0105690227895036E7 |                  [] |
|           4 | x_coordinate      |   3109887.9056603773 |                  [] |
|           4 | y_coordinate      | 1.0057112358490566E7 |                  [] |
+-------------+-------------------+----------------------+---------------------+
```

**Categorical features**

The following example retrieves centroid information from the model
`mydataset.my_kmeans_model` in your default project. This model contains
categorical features.

```sql
SELECT
  *
FROM
  ML.CENTROIDS(MODEL `mydataset.my_kmeans_model`)
ORDER BY
  centroid_id;
```

This query returns results like the following:

```text
+-------------+-------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| centroid_id | feature           |numerical_value| categorical_value                                                                                                                                                                                                                                              |
+-------------+-------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|           1 | department        |          NULL | [{"category":"Medieval Art","feature_value":"1.0"}]                                                                                                                                                                                                            |
|           1 | medium            |          NULL | [{"category":"Iron","feature_value":"0.21602160216021601"},{"category":"Glass, ceramic","feature_value":"0.3933393339333933"},{"category":"Copper alloy","feature_value":"0.39063906390639064"}]                                                               |
|           2 | medium            |          NULL | [{"category":"Wood, gesso, paint","feature_value":"0.15"},{"category":"Carnelian","feature_value":"0.2692307692307692"},{"category":"Papyrus, ink","feature_value":"0.2653846153846154"},{"category":"Steatite, glazed","feature_value":"0.3153846153846154"}] |
|           2 | department        |          NULL | [{"category":"Egyptian Art","feature_value":"1.0"}]                                                                                                                                                                                                            |
|           3 | medium            |          NULL | [{"category":"Faience","feature_value":"1.0"}]                                                                                                                                                                                                                 |
|           3 | department        |          NULL | [{"category":"Egyptian Art","feature_value":"1.0"}]                                                                                                                                                                                                            |
|           4 | medium            |          NULL | [{"category":"Steatite","feature_value":"1.0"}]                                                                                                                                                                                                                |
|           4 | department        |          NULL | [{"category":"Egyptian Art","feature_value":"1.0"}]                                                                                                                                                                                                            |
|           5 | medium            |          NULL | [{"category":"Red quartzite","feature_value":"0.20316027088036118"},{"category":"Bronze or copper alloy","feature_value":"0.3476297968397291"},{"category":"Gold","feature_value":"0.4492099322799097"}]                                                       |
|           5 | department        |          NULL | [{"category":"Egyptian Art","feature_value":"1.0"}]                                                                                                                                                                                                            |
+-------------+-------------------+---------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

**Numerical and categorical features**

The following are the results from the same query against a k-means model with
both numerical and categorical features.

```text
+-------------+--------------------+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| centroid_id |      feature       |  numerical_value  | categorical_value                                                                                                                                                                                                                                                                 |
+-------------+--------------------+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|           1 | start_station_name |              NULL | [{"category":"Toomey Rd @ South Lamar","value":"0.5714285714285714"},{"category":"State Capitol @ 14th & Colorado","value":"0.42857142857142855"}]                                                                                                                                |
|           1 | duration_minutes   | 9.142857142857142 | []                                                                                                                                                                                                                                                                                |
|           2 | duration_minutes   |               9.0 | []                                                                                                                                                                                                                                                                                |
|           2 | start_station_name |              NULL | [{"category":"Rainey @ River St","value":"0.14285714285714285"},{"category":"11th & San Jacinto","value":"0.42857142857142855"},{"category":"ACC - West & 12th Street","value":"0.14285714285714285"},{"category":"East 11th St. at Victory Grill","value":"0.2857142857142857"}] |
+-------------+--------------------+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### With standardization

The following example retrieves centroid information from the model
`mydataset.my_kmeans_model` in your default project. The query in this example
assumes that all features have a mean of `0` and a standard deviation of `1`.

```sql
SELECT
  *
FROM
  ML.CENTROIDS(MODEL `mydataset.my_kmeans_model`,
    STRUCT(TRUE AS standardize))
```

### What's next

- For more information about model weights support in BigQuery ML, see [BigQuery ML model weights overview](https://docs.cloud.google.com/bigquery/docs/weights-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-centroids (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
