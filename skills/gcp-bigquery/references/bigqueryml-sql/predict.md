---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict
---

# The ML.PREDICT function

## Signature / Usage

This document describes the `ML.PREDICT` function, which you can use to
predict outcomes by using a model. `ML.PREDICT` works with the following models:

- [Linear and logistic regression models](create-glm.md)
- [Boosted tree models](create-boosted-tree.md)
- [Random forest models](create-random-forest.md)
- [Deep neural network (DNN) models](create-dnn-models.md)
- [Wide-and-deep models](create-wnd-models.md)
- [K-means models](create-kmeans.md)
- [Principal component analysis (PCA) models](create-pca.md)
- [Autoencoder models](create-autoencoder.md)
- Imported models:
  - [ONNX models](create-onnx.md)
  - [TensorFlow models](create-tensorflow.md)
  - [TensorFlow Lite models](create-tflite.md)
  - [XGBoost models](create-xgboost.md)
- [Agent Platform hosted models](create-remote-model-https.md)

For PCA and autoencoder models, you can use the
[`AI.GENERATE_EMBEDDING` function](ai-generate-embedding.md) as an alternative to the `ML.PREDICT`
function.
`AI.GENERATE_EMBEDDING` generates the same embedding data as `ML.PREDICT`
as an array in a single column, rather than in a series of columns. Having all
of the embeddings in a single column lets you directly use the
[`VECTOR_SEARCH` function](../googlesql-functions/search_functions.md#vector_search)
on the`AI.GENERATE_EMBEDDING` output.

You can run prediction during model creation, after model creation, or after a
failure (as long as at least one iteration is finished). `ML.PREDICT` always uses
the model weights from the last successful iteration.

### Syntax

Adapted (not in the official docs): the `STRUCT` argument is written as an optional argument that starts with a comma, `[, STRUCT(...)]`.

```sql
ML.PREDICT(
  MODEL `PROJECT_ID.DATASET.MODEL_NAME`,
  { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }
  [, STRUCT(
    [THRESHOLD AS threshold]
    [, KEEP_ORIGINAL_COLUMNS AS keep_original_columns]
    [, TRIAL_ID AS trial_id])]
)
```

#### Arguments

`ML.PREDICT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: The name of the input table that contains the
  evaluation data.

  If `TABLE` is specified, the input column names in the table must match the
  column names in the model, and their types should be compatible according to
  BigQuery [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

  For TensorFlow Lite, Open Neural Network Exchange (ONNX), and
  XGBoost models, the input must be
  [convertible](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules) to
  the type expected by the model.

  For remote models, the input columns must contain all Gemini Enterprise Agent Platform
  endpoint input fields.

  If there are unused columns from the table, they are passed through as
  output columns.
- `QUERY_STATEMENT`: The GoogleSQL query that
  is used to generate the evaluation data. See the
  [GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax)
  page for the supported SQL syntax of the `QUERY_STATEMENT` clause.

  If `QUERY_STATEMENT` is specified, the input column names from the query
  must match the column names in the model, and their types should be
  compatible according to BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

  For TensorFlow Lite, ONNX, and XGBoost models, the input must be
  [convertible](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules) to
  the type expected by the model.

  For remote models, the input columns must contain all Gemini Enterprise Agent Platform
  endpoint input fields.

  If there are unused columns from the query, they are passed through as
  output columns.

  If you used the
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model, then only the input
  columns present in the `TRANSFORM` clause must appear in `QUERY_STATEMENT`.

  If you are running inference on image data from an
  [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction), you must use the
  [`ML.DECODE_IMAGE` function](decode-image.md)
  to convert image bytes to a multi-dimensional `ARRAY` representation. You
  can use `ML.DECODE_IMAGE` output directly in an `ML.PREDICT` statement,
  or you can write the results from `ML.DECODE_IMAGE` to a table column and
  reference that column when you call `ML.PREDICT`. For more information, see
  [Predict an outcome from image data with an imported TensorFlow model](#predict-an-outcome-from-image-data-with-an-imported-tensorflow-model).
- <var translate="no">THRESHOLD</var>: a `FLOAT64` value that specifies a custom threshold for
  a binary classification model. It is used as the cutoff between the two
  labels. Predictions above the threshold are positive predictions.
  Predictions below the threshold are negative predictions. The default value
  is `0.5`.

- `KEEP_ORIGINAL_COLUMNS`: a `BOOL` value that specifies
  whether to output the input table columns. If `TRUE`, the columns from the
  input table are output. The default value is `FALSE`.

  `KEEP_ORIGINAL_COLUMNS` only applies to principal component analysis (PCA)
  models.
- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  function uses the optimal trial by default. Only specify this argument if you
  ran hyperparameter tuning when creating the model.

### Output

The output of the `ML.PREDICT` function has as many rows as the input table, and
it includes all columns from the input table and all output columns from the
model. The output column names for the model are `predicted_<label_column_name>`
and, for classification models, `predicted_<label_column_name>_probs`. In
both columns, `label_column_name` is the name of the input label column that's
used during training.

#### Regression models

For the following types of regression models:

- Linear regression
- Boosted tree regressor
- Random forest regressor
- DNN regressor
- Wide-and-deep regressor

The following column is returned:

- `predicted_<label_column_name>`: a numeric value that contains the predicted value of the label.

#### Classification models

For the following types of binary-class classification models:

- Logistic regression
- Boosted tree classifier
- Random forest classifier
- DNN classifier
- Wide-and-deep classifier

The following columns are returned:

- The `predicted_<label_column_name>`: a `STRING` value that contains one of the two input labels, depending on which label has the higher predicted probability.
- The `predicted_<label_column_name>_probs`: an `ARRAY<STRUCT>` value in the form `[<label, probability>]` that contains the predicted probability of each label.

For the following types of multiclass classification models:

- Logistic regression
- Boosted tree classifier
- Random forest classifier
- DNN classifier
- Wide-and-deep classifier

The following columns are returned:

- The `predicted_<label_column_name>`: a `STRING` value that contains the label with the highest predicted probability score.
- The `predicted_<label_column_name>_probs`: an `ARRAY<STRUCT>` value that contains the probability for each class label, calculated using a [softmax](https://developers.google.com/machine-learning/glossary/#softmax) function.

#### K-means models

For k-means models, the following columns are returned:

- `centroid_id`: an `INT64` value that identifies the centroid.
- `nearest_centroids_distance`: an `ARRAY<STRUCT>` value that contains the distances to the nearest `k` clusters, where `k` is equal to the lesser of `num_clusters` or `5`. If the model was created with the [`standardize_features` option](create.md#model_option_list) set to `TRUE`, then the model computes these distances using standardized features; otherwise, it computes these distances using non-standardized features.

#### PCA models

For PCA models, the following columns are returned:

- `principal_component_<index>`: an `INT64` value that represents the projection of the input data onto each principal component. These values can also be considered as embedded low-dimensional features in the space that is spanned by the principal components.

The original input columns are appended if the `keep_original_columns`
argument is set to `TRUE`.

#### Autoencoder models

For autoencoder models, the following columns are returned:

- `latent_col_<index>`: an `INT64` value that represents the dimensions of the latent space.

The original input columns are appended after the latent space columns.

#### Imported models

For TensorFlow Lite models, the output is the output of the
TensorFlow Lite model's predict method.

For ONNX models, the output is the output of the
ONNX model's predict method.

For XGBoost models, the output is the output of the XGBoost model's predict
method.

#### Remote models

For remote models, the output columns contain all Gemini Enterprise Agent Platform endpoint
output fields, and also a `remote_model_status` field that contains status
messages from Gemini Enterprise Agent Platform endpoint.

### Missing data imputation

In statistics, imputation is used to replace missing data with substituted
values. When you train a model in BigQuery ML, `NULL` values are
treated as missing data. When you predict outcomes in BigQuery ML,
missing values can occur when BigQuery ML encounters a `NULL`
value or a previously unseen value. BigQuery ML handles missing
data differently, based on the type of data in the column.

| Column type | Imputation method |
|---|---|
| Numeric | In both training and prediction, `NULL` values in numeric columns are replaced with the mean value of the given column, as calculated by the feature column in the original input data. |
| One-hot/Multi-hot encoded | In both training and prediction, `NULL` values in the encoded columns are mapped to an additional category that is added to the data. Previously unseen data is assigned a weight of 0 during prediction. |
| `TIMESTAMP` | `TIMESTAMP` columns use a mixture of imputation methods from both standardized and one-hot encoded columns. For the generated Unix time column, BigQuery ML replaces values with the mean Unix time across the original columns. For other generated values, BigQuery ML assigns them to the respective `NULL` category for each extracted feature. |
| `STRUCT` | In both training and prediction, each field of the `STRUCT` is imputed according to its type. |

### Permissions

You must have the `bigquery.models.getData`
[Identity and Access Management (IAM) permission](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions)
in order to run `ML.PREDICT`.

### Examples

The following examples assume your model and input table are in your default
project.

#### Predict an outcome

The following example predicts an outcome and returns the following columns:

- `predicted_label`
- `label`
- `column1`
- `column2`

```sql
SELECT
  *
FROM
  ML.PREDICT(MODEL `mydataset.mymodel`,
    (
    SELECT
      label,
      column1,
      column2
    FROM
      `mydataset.mytable`))
```

#### Compare predictions from two different models

The following example creates two models and then compares their output:

1. Create the first model:

   ```sql
   CREATE MODEL
     `mydataset.mymodel1`
   OPTIONS
     (model_type='linear_reg',
       input_label_cols=['label'],
     ) AS
   SELECT
     label,
     input_column1
   FROM
     `mydataset.mytable`
   ```
2. Create the second model:

   ```sql
   CREATE MODEL
     `mydataset.mymodel2`
   OPTIONS
     (model_type='linear_reg',
       input_label_cols=['label'],
     ) AS
   SELECT
     label,
     input_column2
   FROM
     `mydataset.mytable`
   ```
3. Compare the output of the two models:

   ```sql
   SELECT
     label,
     predicted_label1,
     predicted_label AS predicted_label2
   FROM
     ML.PREDICT(MODEL `mydataset.mymodel2`,
       (
       SELECT
         * EXCEPT (predicted_label),
             predicted_label AS predicted_label1
       FROM
         ML.PREDICT(MODEL `mydataset.mymodel1`,
           TABLE `mydataset.mytable`)))
   ```

#### Specify a custom threshold

The following example runs prediction with input data and
a custom threshold of `0.55`:

```sql
SELECT
  *
FROM
  ML.PREDICT(MODEL `mydataset.mymodel`,
    (
    SELECT
      custom_label,
      column1,
      column2
    FROM
      `mydataset.mytable`),
    STRUCT(0.55 AS threshold))
```

#### Predict an outcome from structured data with an imported TensorFlow model

The following query predicts outcomes using an imported
TensorFlow model. The `input_data` table contains inputs in the
schema expected by `my_model`. See
[the `CREATE MODEL` statement for TensorFlow models](create-tensorflow.md)
for more information.

```sql
SELECT *
FROM ML.PREDICT(MODEL `my_project.my_dataset.my_model`,
  (SELECT * FROM input_data))
```

#### Predict an outcome from image data with an imported TensorFlow model

If you are running inference on image data from an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction), you must use the
[`ML.DECODE_IMAGE` function](decode-image.md)
to convert image bytes to a multi-dimensional `ARRAY` representation. You can
use `ML.DECODE_IMAGE` output directly in an `ML.PREDICT` function,
or you can write the results from `ML.DECODE_IMAGE` to a table column and
reference that column when you call `ML.PREDICT`. You can also pass
`ML.DECODE_IMAGE` output to another image processing function for
additional preprocessing during either of these procedures.

You can join the object table to standard BigQuery tables to
limit the data used in inference, or to provide additional input to the model.

The following examples show different ways you can use the `ML.PREDICT`
function with image data.

**Example 1**

The following example uses the `ML.DECODE_IMAGE` function directly in the
`ML.PREDICT` function. It returns the inference results for all images in the
object table, for a model with an input field of `input` and an output
field of `feature`:

```googlesql
SELECT * FROM
ML.PREDICT(
  MODEL `my_dataset.vision_model`,
  (SELECT uri, ML.RESIZE_IMAGE(ML.DECODE_IMAGE(data), 480, 480, FALSE) AS input
  FROM `my_dataset.object_table`)
);
```

**Example 2**

The following example uses the `ML.DECODE_IMAGE` function directly in the
`ML.PREDICT` function, and uses the `ML.CONVERT_COLOR_SPACE` function in the
`ML.PREDICT` function to convert
the image color space from `RBG` to `YIQ`. It also shows how to
use object table fields to filter the objects included in inference.
It returns the inference results for all JPG images in the
object table, for a model with an input field of `input` and an output
field of `feature`:

```googlesql
SELECT * FROM
  ML.PREDICT(
    MODEL `my_dataset.vision_model`,
    (SELECT uri, ML.CONVERT_COLOR_SPACE(ML.RESIZE_IMAGE(ML.DECODE_IMAGE(data), 224, 280, TRUE), 'YIQ') AS input
    FROM `my_dataset.object_table`
    WHERE content_type = 'image/jpeg')
  );
```

**Example 3**

The following example uses results from `ML.DECODE_IMAGE` that have been
written to a table column but not processed any further. It uses
`ML.RESIZE_IMAGE` and `ML.CONVERT_IMAGE_TYPE` in the `ML.PREDICT` function to
process the image data. It returns the inference results for all images in the
decoded images table, for a model with an input field of `input` and an output
field of `feature`.

Create the decoded images table:

Adapted (not in the official docs): the table also keeps the `uri` column, which the inference query selects.

```googlesql
CREATE OR REPLACE TABLE `my_dataset.decoded_images`
  AS (SELECT uri, ML.DECODE_IMAGE(data) AS decoded_image
  FROM `my_dataset.object_table`);
```

Run inference on the decoded images table:

```googlesql
SELECT * FROM
ML.PREDICT(
  MODEL`my_dataset.vision_model`,
  (SELECT uri, ML.CONVERT_IMAGE_TYPE(ML.RESIZE_IMAGE(decoded_image, 480, 480, FALSE)) AS input
  FROM `my_dataset.decoded_images`)
);
```

**Example 4**

The following example uses results from `ML.DECODE_IMAGE` that have been
written to a table column and preprocessed using
`ML.RESIZE_IMAGE`. It returns the inference results for all images in the
decoded images table, for a model with an input field of `input` and an output
field of `feature`.

Create the table:

Adapted (not in the official docs): the missing comma after `ML.DECODE_IMAGE(data)` is added, and the table also keeps the `uri` column, which the inference query selects.

```googlesql
CREATE OR REPLACE TABLE `my_dataset.decoded_images`
  AS (SELECT uri, ML.RESIZE_IMAGE(ML.DECODE_IMAGE(data), 480, 480, FALSE) AS decoded_image
  FROM `my_dataset.object_table`);
```

Run inference on the decoded images table:

```googlesql
SELECT * FROM
ML.PREDICT(
  MODEL `my_dataset.vision_model`,
  (SELECT uri, decoded_image AS input
  FROM `my_dataset.decoded_images`)
);
```

**Example 5**

The following example uses the `ML.DECODE_IMAGE` function directly in the
`ML.PREDICT` function. In this example, the model has an output field of
`embeddings` and two input fields: one that expects an
image, `f_img`, and one that expects a string, `f_txt`. The image
input comes from the object table and the string input comes from a
standard BigQuery table that is joined with the object table
by using the `uri` column.

Adapted (not in the official docs): the columns are qualified with the table names used in `FROM` and `JOIN` (`object_table`, `image_description`), and `uri` is qualified because both tables have it.

```googlesql
SELECT * FROM
  ML.PREDICT(
    MODEL `my_dataset.mixed_model`,
    (SELECT object_table.uri, ML.RESIZE_IMAGE(ML.DECODE_IMAGE(object_table.data), 224, 224, FALSE) AS f_img,
      image_description.description AS f_txt
    FROM `my_dataset.object_table`
    JOIN `my_dataset.image_description`
    ON object_table.uri = image_description.uri)
  );
```

#### Predict an outcome with a model trained with the `TRANSFORM` clause

The following example trains a model using the
[`TRANSFORM` clause](create.md#transform):

```sql
CREATE MODEL `mydataset.mymodel`
  TRANSFORM(f1 + f2 as c, label)
  OPTIONS(...)
AS SELECT f1, f2, f3, label FROM t;
```

Because the `f3` column doesn't appear in the `TRANSFORM` clause,
the following prediction query omits that column in the `QUERY_STATEMENT`:

```sql
SELECT * FROM ML.PREDICT(
  MODEL `mydataset.mymodel`, (SELECT f1, f2 FROM t1));
```

If `f3` is provided in the `SELECT` statement, it isn't used for calculating
predictions but is instead passed through for use in the rest of the
SQL statement.

#### Predict dimensionality reduction results (latent space) with an autoencoder model

The following example runs prediction against a previously built
autoencoder model, where the input was 4 dimensional (4 input columns) and
the dimensionality reduction had 2 dimensions (2 output columns):

```sql
SELECT * FROM ML.PREDICT(
  MODEL `mydataset.mymodel`, (SELECT f1, f2, f3, f4 FROM t1));
```

### What's next

- For more information about model inference, see [Model inference overview](https://docs.cloud.google.com/bigquery/docs/inference-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the decoded images tables in the examples that write `ML.DECODE_IMAGE` results to a table keep only `decoded_image`, but the inference queries select `uri`; the tables also keep `uri`. The resize example also lacks the comma after `ML.DECODE_IMAGE(data)` in `ML.RESIZE_IMAGE`, which is added.
- Corrected from the official docs: the example that joins the object table with `my_dataset.image_description` qualifies the image column as `my_dataset.my_object_table.data` although the `FROM` clause reads `my_dataset.object_table`, and selects the unqualified `uri` that both joined tables have; the columns are qualified as `object_table.uri`, `object_table.data` and `image_description.description`.
- Corrected from the official docs: the syntax has no comma between the table or query argument and `STRUCT(...)`, and shows `STRUCT` as required although the examples on this page call `ML.PREDICT` without it; it is written `[, STRUCT(...)]`.
- Corrected from the official docs: for regression models `predicted_<label_column_name>` is described as a `STRING` value; it is a numeric value (the `AI.PREDICT` page says the predicted numerical values have the same data type as the label column, and `ML.EXPLAIN_PREDICT` gives the raw regression prediction as `FLOAT64`).
- Corrected from the official docs: for multiclass classification models `predicted_<label_column_name>_probs` is described as a `FLOAT64` value that contains the probability for each class label; it is an `ARRAY<STRUCT>` value, as for binary-class models (the `AI.PREDICT` page gives `ARRAY<STRUCT<label STRING, prob FLOAT64>>`).
- Conflicting official statements: `principal_component_<index>` (PCA) and `latent_col_<index>` (autoencoder) are described as `INT64` values, but projections onto principal components and latent space dimensions are real numbers, not integers. The source gives no other type for these columns; don't rely on `INT64`.

## Related

- [Index of this directory](./README.md)
