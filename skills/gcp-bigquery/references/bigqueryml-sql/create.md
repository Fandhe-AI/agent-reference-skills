---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create
---

# The CREATE MODEL statement

## Signature / Usage

To create a model in BigQuery, use the BigQuery ML `CREATE
MODEL` statement. This statement is similar to the
[`CREATE TABLE`](https://docs.cloud.google.com/bigquery/docs/data-definition-language#create_table_statement)
DDL statement. When you run a query that contains a `CREATE MODEL` statement, a
[query job](https://docs.cloud.google.com/bigquery/docs/managing-jobs) is generated for you that processes
the query. You can also use the Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)).

For more information about supported SQL statements and functions for each
model type, see the following documents:

- [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai)
- [End-to-end user journeys for time series forecasting models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-forecast)
- [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey)
- [End-to-end user journeys for imported models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-import)
- [Contribution analysis user journey](https://docs.cloud.google.com/bigquery/docs/contribution-analysis#contribution_analysis_user_journey)

### Required permissions

- To create a dataset to store the model, you need the
  `bigquery.datasets.create` IAM permission.

- To create a model, you need the following permissions:

  - `bigquery.jobs.create`
  - `bigquery.models.create`
  - `bigquery.models.getData`
  - `bigquery.models.updateData`
  - `bigquery.connections.delegate` (for remote models)

The following [predefined IAM roles](https://docs.cloud.google.com/bigquery/docs/access-control#bigquery)
grant these permissions:

- [BigQuery Studio Admin](https://docs.cloud.google.com/bigquery/docs/access-control#bigquery.studioAdmin)
- [BigQuery Admin](https://docs.cloud.google.com/bigquery/docs/access-control#bigquery.admin)

For more information about IAM roles and permissions in
BigQuery, see
[Introduction to IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### `CREATE MODEL` syntax

> [!NOTE]
> **Note:** This syntax statement provides a comprehensive list of model types with their model options. When you create a model, use that model specific `CREATE
> MODEL` statement for convenience. You can view specific `CREATE MODEL` statements by clicking the `MODEL_TYPE` name in the following list, in the table of contents in the left panel, or in the *create model* link in the [End-to-end user journey for each model](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-e2e-journey).

Adapted (not in the official docs): the trailing comma inside `[, NUM_TRIALS = int64_value, ]` is removed, as in the other options.

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
model_name
[TRANSFORM (select_list)]
[INPUT (field_name field_type)
 OUTPUT (field_name field_type)]
[REMOTE WITH CONNECTION {`connection_name` | DEFAULT}]
[OPTIONS(model_option_list)]
[AS {query_statement |
  (
    training_data AS (query_statement),
    custom_holiday AS (holiday_statement)
  )}]

model_option_list:
    MODEL_TYPE = { 'LINEAR_REG' |
      'LOGISTIC_REG' |
      'KMEANS' |
      'MATRIX_FACTORIZATION' |
      'PCA' |
      'AUTOENCODER' |
      'AUTOML_CLASSIFIER' |
      'AUTOML_REGRESSOR' |
      'BOOSTED_TREE_CLASSIFIER' |
      'BOOSTED_TREE_REGRESSOR' |
      'RANDOM_FOREST_CLASSIFIER' |
      'RANDOM_FOREST_REGRESSOR' |
      'DNN_CLASSIFIER' |
      'DNN_REGRESSOR' |
      'DNN_LINEAR_COMBINED_CLASSIFIER' |
      'DNN_LINEAR_COMBINED_REGRESSOR' |
      'ARIMA_PLUS' |
      'ARIMA_PLUS_XREG' |
      'TENSORFLOW' |
      'TENSORFLOW_LITE' |
      'ONNX' |
      'XGBOOST' |
      'CONTRIBUTION_ANALYSIS'}
    [, MODEL_REGISTRY = { 'VERTEX_AI' } ]
    [, VERTEX_AI_MODEL_ID = string_value ]
    [, VERTEX_AI_MODEL_VERSION_ALIASES = string_array ]
    [, INPUT_LABEL_COLS = string_array ]
    [, MAX_ITERATIONS = int64_value ]
    [, EARLY_STOP = { TRUE | FALSE } ]
    [, MIN_REL_PROGRESS = float64_value ]
    [, DATA_SPLIT_METHOD = { 'AUTO_SPLIT' | 'RANDOM' | 'CUSTOM' | 'SEQ' | 'NO_SPLIT' } ]
    [, DATA_SPLIT_EVAL_FRACTION = float64_value ]
    [, DATA_SPLIT_TEST_FRACTION = float64_value ]
    [, DATA_SPLIT_COL = string_value ]
    [, OPTIMIZE_STRATEGY = { 'AUTO_STRATEGY' | 'BATCH_GRADIENT_DESCENT' | 'NORMAL_EQUATION' } ]
    [, L1_REG = float64_value ]
    [, L2_REG = float64_value ]
    [, LEARN_RATE_STRATEGY = { 'LINE_SEARCH' | 'CONSTANT' } ]
    [, LEARN_RATE = float64_value ]
    [, LS_INIT_LEARN_RATE = float64_value ]
    [, WARM_START = { TRUE | FALSE } ]
    [, AUTO_CLASS_WEIGHTS = { TRUE | FALSE } ]
    [, CLASS_WEIGHTS = struct_array ]
    [, INSTANCE_WEIGHT_COL = string_value ]
    [, NUM_CLUSTERS = int64_value ]
    [, KMEANS_INIT_METHOD = { 'RANDOM' | 'KMEANS++' | 'CUSTOM' } ]
    [, KMEANS_INIT_COL = string_value ]
    [, DISTANCE_TYPE = { 'EUCLIDEAN' | 'COSINE' } ]
    [, STANDARDIZE_FEATURES = { TRUE | FALSE } ]
    [, MODEL_PATH = string_value ]
    [, BUDGET_HOURS = float64_value ]
    [, OPTIMIZATION_OBJECTIVE = { string_value | struct_value } ]
    [, FEEDBACK_TYPE = {'EXPLICIT' | 'IMPLICIT'} ]
    [, NUM_FACTORS = int64_value ]
    [, USER_COL = string_value ]
    [, ITEM_COL = string_value ]
    [, RATING_COL = string_value ]
    [, WALS_ALPHA = float64_value ]
    [, BOOSTER_TYPE = { 'gbtree' | 'dart'} ]
    [, NUM_PARALLEL_TREE = int64_value ]
    [, DART_NORMALIZE_TYPE = { 'tree' | 'forest'} ]
    [, TREE_METHOD = { 'auto' | 'exact' | 'approx' | 'hist'} ]
    [, MIN_TREE_CHILD_WEIGHT = float64_value ]
    [, COLSAMPLE_BYTREE = float64_value ]
    [, COLSAMPLE_BYLEVEL = float64_value ]
    [, COLSAMPLE_BYNODE = float64_value ]
    [, MIN_SPLIT_LOSS = float64_value ]
    [, MAX_TREE_DEPTH = int64_value ]
    [, SUBSAMPLE = float64_value ]
    [, ACTIVATION_FN = { 'RELU' | 'RELU6' | 'CRELU' | 'ELU' | 'SELU' | 'SIGMOID' | 'TANH' } ]
    [, BATCH_SIZE = int64_value ]
    [, DROPOUT = float64_value ]
    [, HIDDEN_UNITS = int_array ]
    [, OPTIMIZER = { 'ADAGRAD' | 'ADAM' | 'FTRL' | 'RMSPROP' | 'SGD' } ]
    [, TIME_SERIES_TIMESTAMP_COL = string_value ]
    [, TIME_SERIES_DATA_COL = string_value ]
    [, TIME_SERIES_ID_COL = { string_value | string_array } ]
    [, HORIZON = int64_value ]
    [, AUTO_ARIMA = { TRUE | FALSE } ]
    [, AUTO_ARIMA_MAX_ORDER = int64_value ]
    [, AUTO_ARIMA_MIN_ORDER = int64_value ]
    [, NON_SEASONAL_ORDER = (int64_value, int64_value, int64_value) ]
    [, DATA_FREQUENCY = { 'AUTO_FREQUENCY' | 'PER_MINUTE' | 'HOURLY' | 'DAILY' | 'WEEKLY' | ... } ]
    [, FORECAST_LIMIT_LOWER_BOUND = float64_value  ]
    [, FORECAST_LIMIT_UPPER_BOUND = float64_value  ]
    [, INCLUDE_DRIFT = { TRUE | FALSE } ]
    [, HOLIDAY_REGION = { 'GLOBAL' | 'NA' | 'JAPAC' | 'EMEA' | 'LAC' | 'AE' | ... } ]
    [, CLEAN_SPIKES_AND_DIPS = { TRUE | FALSE } ]
    [, ADJUST_STEP_CHANGES = { TRUE | FALSE } ]
    [, DECOMPOSE_TIME_SERIES = { TRUE | FALSE } ]
    [, HIERARCHICAL_TIME_SERIES_COLS = { string_array } ]
    [, ENABLE_GLOBAL_EXPLAIN = { TRUE | FALSE } ]
    [, APPROX_GLOBAL_FEATURE_CONTRIB = { TRUE | FALSE }]
    [, CALCULATE_P_VALUES = { TRUE | FALSE } ]
    [, FIT_INTERCEPT = { TRUE | FALSE } ]
    [, CATEGORY_ENCODING_METHOD = { 'ONE_HOT_ENCODING' | 'DUMMY_ENCODING' |
      'LABEL_ENCODING' | 'TARGET_ENCODING' } ]
    [, { ENDPOINT = string_value |
      HUGGING_FACE_MODEL_ID = string_value |
      MODEL_GARDEN_MODEL_NAME = string_value} ]
    [, HUGGING_FACE_TOKEN = string_value ]
    [, MACHINE_TYPE = string_value ]
    [, MIN_REPLICA_COUNT = int64_value ]
    [, MAX_REPLICA_COUNT = int64_value ]
    [, RESERVATION_AFFINITY_TYPE = { 'NO_RESERVATION' | 'ANY_RESERVATION' | 'SPECIFIC_RESERVATION' } ]
    [, RESERVATION_AFFINITY_KEY = string_value ]
    [, RESERVATION_AFFINITY_VALUES = string_array ]
    [, ENDPOINT_IDLE_TTL = interval_value ]
    [, REMOTE_SERVICE_TYPE = { 'CLOUD_AI_VISION_V1' | 'CLOUD_AI_NATURAL_LANGUAGE_V1' |
      'CLOUD_AI_TRANSLATE_V3' } ]
    [, NUM_TRIALS = int64_value ]
    [, MAX_PARALLEL_TRIALS = int64_value ]
    [, HPARAM_TUNING_ALGORITHM = { 'VIZIER_DEFAULT' | 'RANDOM_SEARCH' | 'GRID_SEARCH' } ]
    [, HPARAM_TUNING_OBJECTIVES = { 'R2_SCORE' | 'ROC_AUC' | ... } ]
    [, NUM_PRINCIPAL_COMPONENTS = int64_value ]
    [, PCA_EXPLAINED_VARIANCE_RATIO = float64_value ]
    [, SCALE_FEATURES = { TRUE | FALSE } ]
    [, PCA_SOLVER = { 'FULL' | 'RANDOMIZED' | 'AUTO' } ]
    [, TIME_SERIES_LENGTH_FRACTION = float64_value ]
    [, MIN_TIME_SERIES_LENGTH = int64_value ]
    [, MAX_TIME_SERIES_LENGTH = int64_value ]
    [, TREND_SMOOTHING_WINDOW_SIZE = int64_value ]
    [, SEASONALITIES = string_array ]
    [, PROMPT_COL = string_value ]
    [, LEARNING_RATE_MULTIPLIER = float64_value ]
    [, ACCELERATOR_TYPE = { 'GPU' | 'TPU' } ]
    [, EVALUATION_TASK = { 'TEXT_GENERATION' | 'CLASSIFICATION' | 'SUMMARIZATION' |
      'QUESTION_ANSWERING' | 'UNSPECIFIED' } ]
    [, DOCUMENT_PROCESSOR = string_value ]
    [, SPEECH_RECOGNIZER = string_value ]
    [, KMS_KEY_NAME = string_value ]
    [, CONTRIBUTION_METRIC = string_value ]
    [, DIMENSION_ID_COLS = string_array ]
    [, IS_TEST_COL = string_value ]
    [, MIN_APRIORI_SUPPORT = float64_value ]
    [, PRUNING_METHOD = {'NO_PRUNING', 'PRUNE_REDUNDANT_INSIGHTS'}  ]
    [, TOP_K_INSIGHTS_BY_APRIORI_SUPPORT = int64_value ]
```

#### `CREATE MODEL`

Creates and trains a new model in the specified dataset. If the model name
exists, `CREATE MODEL` returns an error.

#### `CREATE MODEL IF NOT EXISTS`

Creates and trains a new model only if the model does not exist in the
specified dataset.

#### `CREATE OR REPLACE MODEL`

Creates and trains a model and replaces an existing model with the same name in
the specified dataset.

#### `model_name`

`model_name` is the name of the model you're creating or replacing. The model
name must be unique per dataset: no other model or table can have the same name.
The model name must follow the same naming rules as a BigQuery table. A
model name can:

- Contain up to 1,024 characters
- Contain letters (upper or lower case), numbers, and underscores

`model_name` is case-sensitive.

If you don't have a default project configured, prepend the project ID to the
model name in following format, including backticks:
`` `[PROJECT_ID].[DATASET].[MODEL]` ``; for example,
`` `myproject.mydataset.mymodel` ``.

#### `TRANSFORM`

TRANSFORM lets you specify all preprocessing during model creation and
have it automatically applied during prediction and evaluation.

For example, you can create the following model:

```sql
CREATE OR REPLACE MODEL `myproject.mydataset.mymodel`
  TRANSFORM(ML.FEATURE_CROSS(STRUCT(f1, f2)) as cross_f,
            ML.QUANTILE_BUCKETIZE(f3) OVER() as buckets,
            label_col)
  OPTIONS(model_type='linear_reg', input_label_cols=['label_col'])
AS SELECT * FROM t
```

During prediction, you don't need to preprocess the input again, and the same
transformations are automatically restored:

```sql
SELECT * FROM ML.PREDICT(MODEL `myproject.mydataset.mymodel`, (SELECT f1, f2, f3 FROM table))
```

When the `TRANSFORM` clause is present, only output columns from the
`TRANSFORM` clause are used in training. Any results from
`query_statement` that don't appear in the `TRANSFORM` clause are ignored.

The input columns of the `TRANSFORM` clause are the result of `query_statement`.
So, the final input used in training is the set of columns generated by the
following query:

```sql
SELECT (select_list) FROM (query_statement);
```

Input columns of the `TRANSFORM` clause can be of any SIMPLE type or ARRAY of
SIMPLE type. SIMPLE types are non-STRUCT and non-ARRAY data types.

In prediction (`ML.PREDICT`), users only need to pass in the original
columns from the `query_statement` that are used inside the `TRANSFORM` clause.
The columns dropped in `TRANSFORM` don't need to be provided during prediction.
`TRANSFORM` is automatically applied to the input data during prediction,
including the statistics used in ML analytic functions (for example,
`ML.QUANTILE_BUCKETIZE`).

To learn more about feature preprocessing, see
[Feature preprocessing overview](https://docs.cloud.google.com/bigquery/docs/preprocess-overview), or try the
[Feature Engineering Functions](https://github.com/GoogleCloudPlatform/bigquery-ml-utils/blob/master/notebooks/bqml-preprocessing-functions.ipynb) notebook.

To try using the `TRANSFORM` clause, try the
[Use the BigQuery ML `TRANSFORM` clause for feature engineering](https://docs.cloud.google.com/bigquery/docs/bigqueryml-transform) tutorial or the
[Create Model With Inline Transpose](https://github.com/GoogleCloudPlatform/bigquery-ml-utils/blob/master/notebooks/bqml-feature-engineering.ipynb) notebook.

#### `select_list`

You can pass columns from `query_statement` through to model training without
transformation by either using `*`, `* EXCEPT()`, or by listing
the column names directly.

Not all columns from `query_statement` are required to appear in the `TRANSFORM`
clause, so you can drop columns appearing in `query_statement` by omitting
them from the `TRANSFORM` clause.

You can transform inputs from `query_statement` by using expressions in
`select_list`. `select_list` is similar to a normal `SELECT` statement.
`select_list` supports the following syntax:

- `*`
- `* EXCEPT()`
- `* REPLACE()`
- `expression`
- `expression.*`

The following cannot appear inside `select_list`:

- Aggregation functions.
- Non-BigQuery ML analytic functions. For more information about supported functions, see [Manual feature preprocessing](https://docs.cloud.google.com/bigquery/docs/manual-preprocessing).
- UDFs.
- Subqueries.
- Anonymous columns. For example, `a + b as c` is allowed, while `a + b` isn't.

The output columns of `select_list` can be of any BigQuery
supported data type.

If present, the following columns must appear in `select_list` without
transformation:

- `label`
- `data_split_col`
- `kmeans_init_col`
- `instance_weight_col`

If these columns are returned by `query_statement`, you must reference them in
`select_list` by column name outside of any expression, or by using `*`. You
can't use aliases with these columns.

#### `INPUT` and `OUTPUT`

`INPUT` and `OUTPUT` clauses are used to specify input and output format for [remote models](create-remote-model.md) or [XGBoost models](create-xgboost.md).

##### `field_name`

For remote models, `INPUT` and `OUTPUT` field names must be identical as the
field names of the Gemini Enterprise Agent Platform endpoint request and response. See examples in [remote model `INPUT` and `OUTPUT` clause](create-remote-model-https.md#input-and-output-clauses).

For XGBoost models, `INPUT` field names must be identical to the names in the `feature_names` field if `feature_names` field is populated in the XGBoost model file. See [XGBoost INPUT OUTPUT clause](create-xgboost.md#input-output-clause) for more details.

##### `field_type`

[Remote models](create-remote-model-https.md) support the
following BigQuery data types for `INPUT` and `OUTPUT` clauses:

- Simple type: [BOOL](../googlesql-syntax/data-types.md#boolean-type), [INT64](../googlesql-syntax/data-types.md#integer-type), [FLOAT64](../googlesql-syntax/data-types.md#floating-point-type), [NUMERIC](../googlesql-syntax/data-types.md#decimal-types), [BIGNUMERIC](../googlesql-syntax/data-types.md#decimal-types), [STRING](../googlesql-syntax/data-types.md#string-type)
- [ARRAY](../googlesql-syntax/data-types.md#array-type)\<Simple type\>

[XGBoost models](create-xgboost.md) only support
[numeric types](../googlesql-syntax/data-types.md#numeric-types)
for the `INPUT` field type and
[`FLOAT64`](../googlesql-syntax/data-types.md#floating-point-type)
for the `OUTPUT` field type.

#### `connection_name`

BigQuery uses a `CLOUD_RESOURCE` [connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection)
to interact with your Gemini Enterprise Agent Platform endpoint. You need to grant [Vertex AI User role](https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user) to connection's service account on your Gemini Enterprise Agent Platform endpoint project.

See examples in [remote model `CONNECTION` statement](create-remote-model.md#remote-with-connection).

To use a [default connection](https://docs.cloud.google.com/bigquery/docs/default-connections), specify
`DEFAULT` instead of the connection name.

#### `model_option_list`

`CREATE MODEL` supports the following options:

##### `MODEL_TYPE`

**Syntax**

```sql
MODEL_TYPE = { 'LINEAR_REG' | 'LOGISTIC_REG' | 'KMEANS' | 'PCA' |
'MATRIX_FACTORIZATION' | 'AUTOENCODER' | 'AUTOML_REGRESSOR' |
'AUTOML_CLASSIFIER' | 'BOOSTED_TREE_CLASSIFIER' | 'BOOSTED_TREE_REGRESSOR' |
'RANDOM_FOREST_CLASSIFIER' | 'RANDOM_FOREST_REGRESSOR' |
'DNN_CLASSIFIER' | 'DNN_REGRESSOR' | 'DNN_LINEAR_COMBINED_CLASSIFIER' |
'DNN_LINEAR_COMBINED_REGRESSOR' | 'ARIMA_PLUS' | 'ARIMA_PLUS_XREG' |
'TENSORFLOW' | 'TENSORFLOW_LITE' | 'ONNX' | 'XGBOOST' | 'CONTRIBUTION_ANALYSIS'}
```

**Description**

Specify the model type. This argument is required.

**Arguments**

The argument is in the model type column.

| Model category | Model type | Description | Model specific CREATE MODEL statement |
|---|---|---|---|
| Regression | `'LINEAR_REG'` | Linear regression for real-valued label prediction; for example, the sales of an item on a given day. | [CREATE MODEL statement for generalized linear models](create-glm.md) |
| Regression | `'BOOSTED_TREE_REGRESSOR'` | Create a boosted tree regressor model using the XGBoost library. | [CREATE MODEL statement for boosted tree models](create-boosted-tree.md) |
| Regression | `'RANDOM_FOREST_REGRESSOR'` | Create a random forest regressor model using the XGBoost library. | [CREATE MODEL statement for random forest models](create-random-forest.md) |
| Regression | `'DNN_REGRESSOR'` | Create a Deep Neural Network Regressor model. | [CREATE MODEL statement for DNN models](create-dnn-models.md) |
| Regression | `'DNN_LINEAR_COMBINED_REGRESSOR'` | Create a Wide-and-Deep Regressor model. | [CREATE MODEL statement for Wide-and-Deep models](create-wnd-models.md) |
| Regression | `'AUTOML_REGRESSOR'` | Create a regression model using AutoML. | [CREATE MODEL statement for AutoML models](create-automl.md) |
| Classification | `'LOGISTIC_REG'` | Logistic regression for binary-class or multi-class classification; for example, determining whether a customer will make a purchase. | [CREATE MODEL statement for generalized linear models](create-glm.md) |
| Classification | `'BOOSTED_TREE_CLASSIFIER'` | Create a boosted tree classifier model using the XGBoost library. | [CREATE MODEL statement for boosted tree models](create-boosted-tree.md) |
| Classification | `'RANDOM_FOREST_CLASSIFIER'` | Create a random forest classifier model using the XGBoost library. | [CREATE MODEL statement for random forest models](create-random-forest.md) |
| Classification | `'DNN_CLASSIFIER'` | Create a Deep Neural Network Classifier model. | [CREATE MODEL statement for DNN models](create-dnn-models.md) |
| Classification | `'DNN_LINEAR_COMBINED_CLASSIFIER'` | Create a Wide-and-Deep Classifier model. | [CREATE MODEL statement for Wide-and-Deep models](create-wnd-models.md) |
| Classification | `'AUTOML_CLASSIFIER'` | Create a classification model using AutoML. | [CREATE MODEL statement for AutoML models](create-automl.md) |
| Clustering | `'KMEANS'` | K-means clustering for data segmentation; for example, identifying customer segments. | [CREATE MODEL statement for K-means models](create-kmeans.md) |
| Collaborative Filtering | `'MATRIX_FACTORIZATION'` | Matrix factorization for recommendation systems. For example, given a set of users, items, and some ratings for a subset of the items, creates a model to predict a user's rating for items they have not rated. | [CREATE MODEL statement for matrix factorization models](create-matrix-factorization.md) |
| Dimensionality Reduction | `'PCA'` | Principal component analysis for dimensionality reduction. | [CREATE MODEL statement for PCA models](create-pca.md) |
| Dimensionality Reduction | `'AUTOENCODER'` | Create an Autoencoder model for anomaly detection, dimensionality reduction, and embedding purposes. | [CREATE MODEL statement for Autoencoder model](create-autoencoder.md) |
| Time series forecasting | `'ARIMA_PLUS'` (previously `'ARIMA'`) | Univariate time-series forecasting with many modeling components under the hood such as ARIMA model for the trend, STL and ETS for seasonality, and holiday effects. | [CREATE MODEL statement for time series models](create-time-series.md) |
| Time series forecasting | `'ARIMA_PLUS_XREG'` | Multivariate time-series forecasting using linear regression and ARIMA_PLUS as the underlying techniques. | [CREATE MODEL statement for time series models](create-multivariate-time-series.md) |
| Augmented analytics | `'CONTRIBUTION_ANALYSIS'` | Create a contribution analysis model to find key drivers of a change. | [CREATE MODEL statement for Contribution Analysis](create-contribution-analysis.md) |
| Importing models | `'TENSORFLOW'` | Create a model by importing a TensorFlow model into BigQuery. | [CREATE MODEL statement for TensorFlow models](create-tensorflow.md) |
| Importing models | `'TENSORFLOW_LITE'` | Create a model by importing a TensorFlow Lite model into BigQuery. | [CREATE MODEL statement for TensorFlow Lite models](create-tflite.md) |
| Importing models | `'ONNX'` | Create a model by importing an ONNX model into BigQuery. | [CREATE MODEL statement for ONNX models](create-onnx.md) |
| Importing models | `'XGBOOST'` | Create a model by importing a XGBoost model into BigQuery. | [CREATE MODEL statement for XGBoost models](create-xgboost.md) |
| Remote models | N/A | Create a model by specifying a Cloud AI service, or the endpoint for a Gemini Enterprise Agent Platform model. | [CREATE MODEL statement for remote models over Google models in Agent Platform](create-remote-model.md) [CREATE MODEL statement for remote models over hosted models in Agent Platform](create-remote-model-https.md) [CREATE MODEL statement for remote models over Cloud AI services](create-remote-model-service.md) |

<br />

> [!NOTE]
> **Note:** We are deprecating `ARIMA` as the model type. While the model training pipelines of `ARIMA` and `ARIMA_PLUS` are the same, `ARIMA_PLUS` supports more capabilities, including support for a new training option, [`DECOMPOSE_TIME_SERIES`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#decompose_time_series), and table-valued functions including [`ML.ARIMA_EVALUATE`](arima-evaluate.md) and [`ML.EXPLAIN_FORECAST`](explain-forecast.md).

##### Other model options

The following table provides a comprehensive list of model options, with a brief
descriptions and their applicable model types. You can find detailed description
in the model specific `CREATE MODEL` statement by clicking the model type in the
"Applied model types" column.

When the applied model types are supervised learning models, unless "regressor"
or "classifier" is explicitly listed, it means that model options apply to both
the regressor and the classifier. For example, the "boosted tree" means that
model option applies to both boosted tree regressor and boosted tree classifier,
while the "boosted tree classifier" only applies to the classifier.

| Name | Description | Applied model types |
|---|---|---|
| MODEL_REGISTRY | The MODEL_REGISTRY option specifies the Model Registry destination. | All model types are supported. |
| VERTEX_AI_MODEL_ID | The Agent Platform model ID to register the model with. | All model types are supported. |
| VERTEX_AI_MODEL_VERSION_ALIASES | The Agent Platform model alias to register the model with. | All model types are supported. |
| INPUT_LABEL_COLS | The label column names in the training data. | [Linear \& logistic regression](create-glm.md#input_label_cols), [Boosted trees](create-boosted-tree.md#input_label_cols), [Random forest](create-random-forest.md#input_label_cols), [DNN](create-dnn-models.md#input_label_cols), [Wide \& Deep](create-wnd-models.md#input_label_cols), [AutoML](create-automl.md#input_label_cols) |
| MAX_ITERATIONS | The maximum number of training iterations or steps. | [Linear \& logistic regression](create-glm.md#max_iterations), [Boosted trees](create-boosted-tree.md#max_iterations), [DNN](create-dnn-models.md#max_iterations), [Wide \& Deep](create-wnd-models.md#max_iterations), [Kmeans](create-kmeans.md#max_iterations), [Matrix factorization](create-matrix-factorization.md#max_iterations), [Autoencoder](create-autoencoder.md#max_iterations) |
| EARLY_STOP | Whether training should stop after the first iteration in which the relative loss improvement is less than the value specified for \`MIN_REL_PROGRESS\`. | [Linear \& logistic regression](create-glm.md#early_stop), [Boosted trees](create-boosted-tree.md#early_stop), [Random forest](create-random-forest.md#early_stop), [DNN](create-dnn-models.md#early_stop), [Wide \& Deep](create-wnd-models.md#early_stop), [Kmeans](create-kmeans.md#early_stop), [Matrix factorization](create-matrix-factorization.md#early_stop), [Autoencoder](create-autoencoder.md#early_stop) |
| MIN_REL_PROGRESS | The minimum relative loss improvement that is necessary to continue training when \`EARLY_STOP\` is set to true. | [Linear \& logistic regression](create-glm.md#min_rel_progress), [Boosted trees](create-boosted-tree.md#min_rel_progress), [Random forest](create-random-forest.md#min_rel_progress), [DNN](create-dnn-models.md#min_rel_progress), [Wide \& Deep](create-wnd-models.md#min_rel_progress), [Kmeans](create-kmeans.md#min_rel_progress), [Matrix factorization](create-matrix-factorization.md#min_rel_progress), [Autoencoder](create-autoencoder.md#min_rel_progress) |
| DATA_SPLIT_METHOD | The method to split input data into training and evaluation sets when not running hyperparameter tuning, or into training, evaluation, and test sets when running hyperparameter tuning. | [Linear \& logistic regression](create-glm.md#data_split_method), [Boosted trees](create-boosted-tree.md#data_split_method), [Random forest](create-random-forest.md#data_split_method), [DNN](create-dnn-models.md#data_split_method), [Wide \& Deep](create-wnd-models.md#data_split_method) [Matrix factorization](create-matrix-factorization.md#data_split_method) |
| DATA_SPLIT_EVAL_FRACTION | Specifies the fraction of the data used for evaluation. Accurate to two decimal places. | [Linear \& logistic regression](create-glm.md#data_split_eval_fraction), [Boosted trees](create-boosted-tree.md#data_split_eval_fraction), [Random forest](create-random-forest.md#data_split_eval_fraction), [DNN](create-dnn-models.md#data_split_eval_fraction), [Wide \& Deep](create-wnd-models.md#data_split_eval_fraction) [Matrix factorization](create-matrix-factorization.md#data_split_eval_fraction) |
| DATA_SPLIT_TEST_FRACTION | Specifies the fraction of the data used for testing when you are running hyperparameter tuning. Accurate to two decimal places. | [Linear \& logistic regression](create-glm.md#data_split_test_fraction), [Boosted trees](create-boosted-tree.md#data_split_test_fraction), [Random forest](create-random-forest.md#data_split_test_fraction), [DNN](create-dnn-models.md#data_split_test_fraction), [Wide \& Deep](create-wnd-models.md#data_split_test_fraction) [Matrix factorization](create-matrix-factorization.md#data_split_test_fraction) |
| DATA_SPLIT_COL | Identifies the column used to split the data. | [Linear \& logistic regression](create-glm.md#data_split_col), [Boosted trees](create-boosted-tree.md#data_split_col), [Random forest](create-random-forest.md#data_split_col), [DNN](create-dnn-models.md#data_split_col), [Wide \& Deep](create-wnd-models.md#data_split_col) [Matrix factorization](create-matrix-factorization.md#data_split_col) |
| OPTIMIZE_STRATEGY | The strategy to train linear regression models. | [Linear regression](create-glm.md#optimize_strategy) |
| L1_REG | The amount of [L1 regularization](https://developers.google.com/machine-learning/glossary/#L1_regularization) applied. | [Linear \& logistic regression](create-glm.md#l1_reg), [Boosted trees](create-boosted-tree.md#l1_reg) [Random forest](create-random-forest.md#l1_reg) |
| L2_REG | The amount of [L2 regularization](https://developers.google.com/machine-learning/glossary/#L2_regularization) applied. | [Linear \& logistic regression](create-glm.md#l2_reg), [Boosted trees](create-boosted-tree.md#l2_reg), [Random forest](create-random-forest.md#l2_reg), [Matrix factorization](create-matrix-factorization.md#l2_reg), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#l2_reg) |
| LEARN_RATE_STRATEGY | The strategy for specifying the [learning rate](https://developers.google.com/machine-learning/glossary/#learning_rate) during training. | [Linear \& logistic regression](create-glm.md#learn_rate_strategy) |
| LEARN_RATE | The learn rate for [gradient descent](https://developers.google.com/machine-learning/glossary/#gradient_descent) when LEARN_RATE_STRATEGY is set to CONSTANT. | [Linear \& logistic regression](create-glm.md#learn_rate) |
| LS_INIT_LEARN_RATE | Sets the initial learning rate that LEARN_RATE_STRATEGY=LINE_SEARCH uses. | [Linear \& logistic regression](create-glm.md#ls_init_learn_rate) |
| WARM_START | Retrain a model with new training data, new model options, or both. | [Linear \& logistic regression](create-glm.md#warm_start), [DNN](create-dnn-models.md#warm_start), [Wide \& Deep](create-wnd-models.md#warm_start), [Kmeans](create-kmeans.md#warm_start), [Autoencoder](create-autoencoder.md#warm_start) |
| AUTO_CLASS_WEIGHTS | Whether to balance class labels using weights for each class in inverse proportion to the frequency of that class. | [Logistic regression](create-glm.md#auto_class_weights), [Boosted tree classifier](create-boosted-tree.md#auto_class_weights), [Random forest classifier](create-random-forest.md#auto_class_weights), [DNN classifier](create-dnn-models.md#auto_class_weights), [Wide \& Deep classifier](create-wnd-models.md#auto_class_weights) |
| CLASS_WEIGHTS | The weights to use for each class label. This option cannot be specified if AUTO_CLASS_WEIGHTS is specified. It takes an ARRAY of STRUCTs; each STRUCT is a (STRING, FLOAT64) pair representing a class label and the corresponding weight. A weight must be present for every class label. The weights are not required to add up to one. For example: CLASS_WEIGHTS = \[STRUCT('example_label', .2)\]. | [Logistic regression](create-glm.md#class_weights), [Boosted tree classifier](create-boosted-tree.md#class_weights), [Random forest classifier](create-random-forest.md#class_weights), [DNN classifier](create-dnn-models.md#class_weights), [Wide \& Deep classifier](create-wnd-models.md#class_weights) |
| INSTANCE_WEIGHT_COL | Identifies the column used to specify the weights for each data point in the training dataset. | [Boosted trees](create-boosted-tree.md#instance_weight_col), [Random forest](create-random-forest.md#instance_weight_col) |
| NUM_CLUSTERS | The number of clusters to identify in the input data. | [Kmeans](create-kmeans.md#num_clusters) |
| KMEANS_INIT_METHOD | The method of initializing the clusters. | [Kmeans](create-kmeans.md#kmeans_init_method) |
| KMEANS_INIT_COL | Identifies the column used to initialize the centroids. | [Kmeans](create-kmeans.md#kmeans_init_col) |
| DISTANCE_TYPE | The type of metric to compute the distance between two points. | [K-means](create-kmeans.md#distance_type) |
| STANDARDIZE_FEATURES | Whether to [standardize numerical features](https://en.wikipedia.org/wiki/Feature_scaling). | [Kmeans](create-kmeans.md#standardize_features) |
| BUDGET_HOURS | Sets the training budget hours. | [AutoML](create-automl.md#budget_hours) |
| OPTIMIZATION_OBJECTIVE | Sets the optimization objective function to use for AutoML. | [AutoML](create-automl.md#optimization_objective) |
| MODEL_PATH | Specifies the location of the imported model to import. | [Imported TensorFlow model](create-tensorflow.md#model_path), [Imported TensorFlow lite model](create-tflite.md#model_path), [Imported ONNX model](create-onnx.md#model_path), [Imported XGBoost model](create-xgboost.md#model_path) |
| FEEDBACK_TYPE | Specifies feedback type for matrix factorization models which changes the algorithm that is used during training. | [Matrix factorization](create-matrix-factorization.md#feedback_type) |
| NUM_FACTORS | Specifies the number of latent factors. | [Matrix factorization](create-matrix-factorization.md#num_factors) |
| USER_COL | The user column name. | [Matrix factorization](create-matrix-factorization.md#user_col) |
| ITEM_COL | The item column name. | [Matrix factorization](create-matrix-factorization.md#item_col) |
| RATING_COL | The rating column name. | [Matrix factorization](create-matrix-factorization.md#rating_col) |
| WALS_ALPHA | A hyperparameter for matrix factorization models with IMPLICIT feedback. | [Matrix factorization](create-matrix-factorization.md#wals_alpha) |
| BOOSTER_TYPE | For boosted tree models, specify the booster type to use, with default value GBTREE. | [Boosted trees](create-boosted-tree.md#booster_type) |
| NUM_PARALLEL_TREE | Number of parallel trees constructed during each iteration. | [Boosted trees](create-boosted-tree.md#num_parallel_tree), [Random forest](create-random-forest.md#num_parallel_tree) |
| DART_NORMALIZE_TYPE | Type of normalization algorithm for DART booster. | [Boosted trees](create-boosted-tree.md#dart_normalize_type) |
| TREE_METHOD | Type of tree construction algorithm. | [Boosted trees](create-boosted-tree.md#tree_method), [Random forest](create-random-forest.md#tree_method) |
| MIN_TREE_CHILD_WEIGHT | Minimum sum of instance weight needed in a child for further partitioning. | [Boosted trees](create-boosted-tree.md#min_tree_child_weight), [Random forest](create-random-forest.md#min_tree_child_weight) |
| COLSAMPLE_BYTREE | Subsample ratio of columns when constructing each tree. Subsampling occurs once for every tree constructed. | [Boosted trees](create-boosted-tree.md#colsample_bytree), [Random forest](create-random-forest.md#colsample_bytree) |
| COLSAMPLE_BYLEVEL | Subsample ratio of columns for each level. Subsampling occurs once for every new depth level reached in a tree. | [Boosted trees](create-boosted-tree.md#colsample_bylevel), [Random forest](create-random-forest.md#colsample_bylevel) |
| COLSAMPLE_BYNODE | Subsample ratio of columns for each node (split). Subsampling occurs once every time a new split is evaluated. | [Boosted trees](create-boosted-tree.md#colsample_bynode), [Random forest](create-random-forest.md#colsample_bynode) |
| MIN_SPLIT_LOSS | Minimum loss reduction required to make a further partition on a leaf node of the tree. | [Boosted trees](create-boosted-tree.md#min_split_loss), [Random forest](create-random-forest.md#min_split_loss) |
| MAX_TREE_DEPTH | Maximum depth of a tree. | [Boosted trees](create-boosted-tree.md#max_tree_depth), [Random forest](create-random-forest.md#max_tree_depth) |
| SUBSAMPLE | Subsample ratio of the training instances. | [Boosted trees](create-boosted-tree.md#subsample), [Random forest](create-random-forest.md#subsample) |
| ACTIVATION_FN | Specifies the activation function of the neural network. | [DNN](create-dnn-models.md#activation_fn), [Wide \& Deep](create-wnd-models.md#activation_fn), [Autoencoder](create-autoencoder.md#activation_fn) |
| BATCH_SIZE | Specifies the mini batch size of samples that are fed to the neural network. | [DNN](create-dnn-models.md#batch_size), [Wide \& Deep](create-wnd-models.md#batch_size), [Autoencoder](create-autoencoder.md#batch_size) |
| DROPOUT | Specifies the dropout rate of units in the neural network. | [DNN](create-dnn-models.md#dropout), [Wide \& Deep](create-wnd-models.md#dropout), [Autoencoder](create-autoencoder.md#dropout) |
| HIDDEN_UNITS | Specifies the hidden layers of the neural network. | [DNN](create-dnn-models.md#hidden_units), [Wide \& Deep](create-wnd-models.md#hidden_units), [Autoencoder](create-autoencoder.md#hidden_units) |
| OPTIMIZER | Specifies the optimizer for training the model. | [DNN](create-dnn-models.md#optimizer), [Wide \& Deep](create-wnd-models.md#optimizer), [Autoencoder](create-autoencoder.md#optimizer) |
| TIME_SERIES_TIMESTAMP_COL | The timestamp column name for time series models. | [ARIMA_PLUS](create-time-series.md#time_series_timestamp_col), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#time_series_timestamp_col) |
| TIME_SERIES_DATA_COL | The data column name for time series models. | [ARIMA_PLUS](create-time-series.md#time_series_data_col), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#time_series_data_col) |
| TIME_SERIES_ID_COL | The ID column names for time-series models. | [ARIMA_PLUS](create-time-series.md#time_series_id_col), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#time_series_id_col) |
| HORIZON | The number of time points to forecast. When forecasting multiple time series at once, this parameter applies to each time series. | [ARIMA_PLUS](create-time-series.md#horizon), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#horizon) |
| AUTO_ARIMA | Whether the training process should use auto.ARIMA or not. | [ARIMA_PLUS](create-time-series.md#auto_arima), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#auto_arima) |
| AUTO_ARIMA_MAX_ORDER | The maximum value for the sum of non-seasonal p and q. It controls the parameter search space in the auto.ARIMA algorithm. | [ARIMA_PLUS](create-time-series.md#auto_arima_max_order), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#auto_arima_max_order) |
| AUTO_ARIMA_MIN_ORDER | The minimum value for the sum of non-seasonal p and q. It controls the parameter search space in the auto.ARIMA algorithm. | [ARIMA_PLUS](create-time-series.md#auto_arima_min_order), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#auto_arima_min_order) |
| NON_SEASONAL_ORDER | The tuple of non-seasonal p, d, and q for the ARIMA_PLUS model. | [ARIMA_PLUS](create-time-series.md#non_seasonal_order), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#non_seasonal_order) |
| DATA_FREQUENCY | The data frequency of the input time series. | [ARIMA_PLUS](create-time-series.md#data_frequency), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#data_frequency) |
| FORECAST_LIMIT_LOWER_BOUND | The lower bound of the time series forecasting values. | [ARIMA_PLUS](create-time-series.md#forecast_limit_lower_bound) |
| FORECAST_LIMIT_UPPER_BOUND | The upper bound of the time series forecasting values. | [ARIMA_PLUS](create-time-series.md#forecast_limit_upper_bound) |
| INCLUDE_DRIFT | Should the ARIMA_PLUS model include a linear drift term or not. | [ARIMA_PLUS](create-time-series.md#include_drift), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#include_drift) |
| HOLIDAY_REGION | The geographical region based on which the holiday effect is applied in modeling. | [ARIMA_PLUS](create-time-series.md#holiday_region), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#holiday_region) |
| CLEAN_SPIKES_AND_DIPS | Whether the spikes and dips should be cleaned. | [ARIMA_PLUS](create-time-series.md#clean_spikes_and_dips), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#clean_spikes_and_dips) |
| ADJUST_STEP_CHANGES | Whether the step changes should be adjusted. | [ARIMA_PLUS](create-time-series.md#adjust_step_changes), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#adjust_step_changes) |
| DECOMPOSE_TIME_SERIES | Whether the separate components of both the history and the forecast parts of the time series (such as seasonal components) should be saved. | [ARIMA_PLUS](create-time-series.md#decompose_time_series) |
| HIERARCHICAL_TIME_SERIES_COLS | The column names used to generate hierarchical time series forecasts. The column order represents the hierarchy structure. | [ARIMA_PLUS](create-time-series.md#hierarchical_time_series_cols) |
| ENABLE_GLOBAL_EXPLAIN | Specifies whether to compute global explanations using explainable AI to evaluate global feature importance to the model. | [Linear \& logistic regression](create-glm.md#enable_global_explain), [Boosted trees](create-boosted-tree.md#enable_global_explain), [Random forest](create-random-forest.md#enable_global_explain) |
| APPROX_GLOBAL_FEATURE_CONTRIB | Specifies whether to use fast approximation for feature contribution computation. | [Boosted trees](create-boosted-tree.md#approx_global_feature_contrib), [Random forest](create-random-forest.md#approx_global_feature_contrib) |
| CALCULATE_P_VALUES | Specifies whether to compute p-values for the model during training. | [Linear \& logistic regression](create-glm.md#calculate_p_values) |
| FIT_INTERCEPT | Specifies whether to fit an intercept for the model during training. | [Linear \& logistic regression](create-glm.md#fit_intercept) |
| CATEGORY_ENCODING_METHOD | Specifies the default encoding method for categorical features. | [Linear \& logistic regression](create-glm.md#category_encoding_method), [Boosted trees](create-boosted-tree.md#category_encoding_method) |
| ENDPOINT | Specifies the Gemini Enterprise Agent Platform endpoint to use for a remote model. This can be the name of a Google model in Agent Platform or the HTTPS endpoint of a model deployed to Agent Platform. | [Remote models over Google models in Agent Platform](create-remote-model.md#endpoint) [Remote models over hosted models in Agent Platform](create-remote-model-https.md#endpoint) [Remote models over open models](create-remote-model-open.md#manually-deployed) |
| HUGGING_FACE_MODEL_ID | Specifies the model ID for a supported Hugging Face model. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| MODEL_GARDEN_MODEL_NAME | Specifies the model ID and model version of a supported Agent Platform Model Garden model. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| HUGGING_FACE_TOKEN | Specifies the Hugging Face User Access Token to use. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| MACHINE_TYPE | Specifies the machine type to use when deploying the model to Agent Platform. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| MIN_REPLICA_COUNT | Specifies the minimum number of machine replicas used when deploying the model to Agent Platform. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| MAX_REPLICA_COUNT | Specifies the maximum number of machine replicas used when deploying the model to Agent Platform. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| RESERVATION_AFFINITY_TYPE | Determines whether the deployed model uses Compute Engine reservations to provide assured virtual machine (VM) availability when serving predictions, and specifies whether the model uses VMs from all available reservations or just one specific reservation. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| RESERVATION_AFFINITY_KEY | The key for a Compute Engine reservation. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| RESERVATION_AFFINITY_VALUES | Specifies the full resource name of the Compute Engine reservation. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| ENDPOINT_IDLE_TTL | Specifies the duration of inactivity after which a BigQuery-managed Agent Platform model is automatically undeployed from an Agent Platform endpoint. | [Remote models over open models](create-remote-model-open.md#automatically-deployed) |
| REMOTE_SERVICE_TYPE | Specifies the Cloud AI service to use for a remote model. | [Remote models over Cloud AI services](create-remote-model-service.md#remote_service_type) |
| NUM_TRIALS | Specifies the maximum number of submodels to train when you are running hyperparameter tuning. | [Linear \& logistic regression](create-glm.md#num_trials), [Boosted trees](create-boosted-tree.md#num_trials), [Random forest](create-random-forest.md#num_trials), [DNN](create-dnn-models.md#num_trials), [Wide \& Deep](create-wnd-models.md#num_trials), [Kmeans](create-kmeans.md#num_trials), [Matrix factorization](create-matrix-factorization.md#num_trials), [Autoencoder](create-autoencoder.md#num_trials) |
| MAX_PARALLEL_TRIALS | Specifies the maximum number of trials to run at the same time when you are running hyperparameter tuning. | [Linear \& logistic regression](create-glm.md#max_parallel_trials), [Boosted trees](create-boosted-tree.md#max_parallel_trials), [Random forest](create-random-forest.md#max_parallel_trials), [DNN](create-dnn-models.md#max_parallel_trials), [Wide \& Deep](create-wnd-models.md#max_parallel_trials), [Kmeans](create-kmeans.md#max_parallel_trials), [Matrix factorization](create-matrix-factorization.md#max_parallel_trials), [Autoencoder](create-autoencoder.md#max_parallel_trials) |
| HPARAM_TUNING_ALGORITHM | Specifies the algorithm used to tune the hyperparameters when you are running hyperparameter tuning. | [Linear \& logistic regression](create-glm.md#hparam_tuning_algorithm), [Boosted trees](create-boosted-tree.md#hparam_tuning_algorithm), [Random forest](create-random-forest.md#hparam_tuning_algorithm), [DNN](create-dnn-models.md#hparam_tuning_algorithm), [Wide \& Deep](create-wnd-models.md#hparam_tuning_algorithm), [Kmeans](create-kmeans.md#hparam_tuning_algorithm), [Matrix factorization](create-matrix-factorization.md#hparam_tuning_algorithm), [Autoencoder](create-autoencoder.md#hparam_tuning_algorithm) |
| HPARAM_TUNING_OBJECTIVES | Specifies the hyperparameter tuning objective for the model. | [Linear \& logistic regression](create-glm.md#hparam_tuning_objectives), [Boosted trees](create-boosted-tree.md#hparam_tuning_objectives), [Random forest](create-random-forest.md#hparam_tuning_objectives), [DNN](create-dnn-models.md#hparam_tuning_objectives), [Wide \& Deep](create-wnd-models.md#hparam_tuning_objectives), [Kmeans](create-kmeans.md#hparam_tuning_objectives), [Matrix factorization](create-matrix-factorization.md#hparam_tuning_objectives), [Autoencoder](create-autoencoder.md#hparam_tuning_objectives) |
| NUM_PRINCIPAL_COMPONENTS | The number of principal components to keep. | [PCA](create-pca.md#num_principal_components) |
| PCA_EXPLAINED_VARIANCE_RATIO | The ratio for the explained variance. | [PCA](create-pca.md#pca_explained_variance_ratio) |
| SCALE_FEATURES | Determines whether or not to scale the numerical features to unit variance. | [PCA](create-pca.md#scale_features) |
| PCA_SOLVER | The solver to use to calculate the principal components. | [PCA](create-pca.md#pca_solver) |
| TIME_SERIES_LENGTH_FRACTION | The fraction of the interpolated length of the time series that's used to model the time series trend component. | [ARIMA_PLUS](create-time-series.md#time_series_length_fraction), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#time_series_length_fraction) |
| MIN_TIME_SERIES_LENGTH | The minimum number of time points that are used in modeling the trend component of the time series. | [ARIMA_PLUS](create-time-series.md#min_time_series_length), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#min_time_series_length) |
| MAX_TIME_SERIES_LENGTH | The maximum number of time points that are used in modeling the trend component of the time series. | [ARIMA_PLUS](create-time-series.md#max_time_series_length), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#max_time_series_length) |
| TREND_SMOOTHING_WINDOW_SIZE | The smoothing window size for the trend component. | [ARIMA_PLUS](create-time-series.md#trend_smoothing_window_size), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#trend_smoothing_window_size) |
| SEASONALITIES | The seasonality of the time series data refers to the presence of variations that occur at certain regular intervals such as weekly, monthly or quarterly. | [ARIMA_PLUS](create-time-series.md#seasonalities) |
| PROMPT_COL | The name of the prompt column in the training data table to use when performing supervised tuning. | [Remote models over Google models in Agent Platform](create-remote-model-tuned.md#prompt_col) |
| LEARNING_RATE_MULTIPLIER | A multiplier to apply to the recommended learning rate when performing supervised tuning. | [Remote models over Google models in Agent Platform](create-remote-model-tuned.md#learning_rate_multiplier) |
| EVALUATION_TASK | When performing supervised tuning, the type of task that you want to tune the model to perform. | [Remote models over Google models in Agent Platform](create-remote-model-tuned.md#evaluation_task) |
| DOCUMENT_PROCESSOR | Identifies the document processor to use when the REMOTE_SERVICE_TYPE option value is `CLOUD_AI_DOCUMENT_V1`. | [Remote models over Cloud AI services](create-remote-model-service.md#document_processor) |
| SPEECH_RECOGNIZER | Identifies the speech recognizer to use when the REMOTE_SERVICE_TYPE option value is `CLOUD_AI_SPEECH_TO_TEXT_V2` | [Remote models over Cloud AI services](create-remote-model-service.md#speech_recognizer) |
| KMS_KEY_NAME | Specifies the Cloud Key Management Service [customer-managed encryption key (CMEK)](https://docs.cloud.google.com/kms/docs/cmek) to use to encrypt the model. | [Linear \& logistic regression](create-glm.md#kms_key_name), [Boosted trees](create-boosted-tree.md#kms_key_name), [Random forest](create-random-forest.md#kms_key_name), [DNN](create-dnn-models.md#kms_key_name), [Wide \& Deep](create-wnd-models.md#kms_key_name), [AutoML](create-automl.md#kms_key_name), [K-means](create-kmeans.md#kms_key_name), [PCA](create-pca.md#kms_key_name), [Autoencoder](create-autoencoder.md#kms_key_name), [Matrix factorization](create-matrix-factorization.md#kms_key_name), [ARIMA_PLUS](create-time-series.md#kms_key_name), [ARIMA_PLUS_XREG](create-multivariate-time-series.md#kms_key_name), [ONNX](create-onnx.md#kms_key_name), [TensorFlow](create-tensorflow.md#kms_key_name), [TensorFlow Lite](create-tflite.md#kms_key_name), [XGBoost](create-xgboost.md#kms_key_name) |
| CONTRIBUTION_METRIC | The expression to use when performing contribution analysis. | [Contribution analysis](create-contribution-analysis.md#contribution_metric) |
| DIMENSION_ID_COLS | The names of the columns to use as dimensions when summarizing the contribution analysis metric. | [Contribution analysis](create-contribution-analysis.md#dimension_id_cols) |
| IS_TEST_COL | The name of the column to use to determine whether a given row is test data or control data. | [Contribution analysis](create-contribution-analysis.md#is_test_col) |
| MIN_APRIORI_SUPPORT | The minimum apriori support threshold for including segments in the model output. | [Contribution analysis](create-contribution-analysis.md#min_apriori_support) |
| TOP_K_INSIGHTS_BY_APRIORI_SUPPORT | The number of top insights by apriori support to include in the model output. | [Contribution analysis](create-contribution-analysis.md#top_k_insights_by_apriori_support) |
| PRUNING_METHOD | The pruning method to use for the contribution analysis model. | [Contribution analysis](create-contribution-analysis.md#pruning_method) |

#### `AS`

All model types support the following `AS` clause syntax for specifying the training data:

```googlesql
AS query_statement
```

For time series forecasting models that have a `DATA_FREQUENCY` value
of either `DAILY` or `AUTO_FREQUENCY`, you can optionally use the
following `AS` clause syntax to perform
[custom holiday modeling](create-time-series.md#custom-holidays)
in addition to specifying the training data:

```googlesql
AS (
  training_data AS (query_statement),
  custom_holiday AS (holiday_statement)
)
```

##### `query_statement`

The `query_statement` argument specifies the query that is used to
generate the training data. For information about the supported SQL syntax of
the `query_statement` clause, see
[GoogleSQL query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

##### `holiday_statement`

The `holiday_statement` argument specifies the query that provides custom
holiday modeling information for time series forecast models. This query must
return 50,000 rows or less and must contain the following columns:

- `region`: Required. A `STRING` value that identifies the region to target for
  holiday modeling. Use one of the following options:

  - An upper-case [holiday region code](create-time-series.md#holiday_region). Use this option to overwrite or supplement the holidays for the specified region. You can see the holidays for a region by running `SELECT * FROM
    bigquery-public-data.ml_datasets.holidays_and_events_for_forecasting WHERE
    region = region`.
  - An arbitrary string. Use this option to specify a custom region that you want to model holidays for. For example, you could specify `London` if you are only modeling holidays for that city.

  Be sure not to use an existing holiday region code when you are
  trying to model for a custom region. For example, if you want to model a
  holiday in California, and specify `CA` as the `region` value, the
  service recognizes that as the holiday region code for Canada and
  targets that region. Because the argument is case-sensitive, you could
  specify `ca`, `California`, or some other value that isn't a holiday
  region code.
- `holiday_name`: Required. A `STRING` value that identifies the holiday
  to target for holiday modeling. Use one of the following options:

  - The holiday name as it is represented in the `bigquery-public-data.ml_datasets.holidays_and_events_for_forecasting` public table, including case. Use this option to [overwrite](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#change_the_metadata_for_built-in_holidays) or [supplement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create#supplement_built-in_holidays_with_additional_custom_holidays) the specified holiday.
  - A string that represents a custom holiday. The string must be a valid column name so that it can be used in `ML.EXPLAIN_FORECAST` output. For example, it cannot contain space. For more information on column naming, see [Column names](https://docs.cloud.google.com/bigquery/docs/schemas#column_names).
- `primary_date`: Required. A `DATE` value that specifies the date the holiday
  falls on.

- `preholiday_days`: Optional. An `INT64` value that specifies the start of the
  holiday window around the holiday that is taken into account when
  modeling. Must be greater than or equal to `1`. Defaults to `1`.

- `postholiday_days`: Optional. An `INT64` value that specifies the end of the
  holiday window around the holiday that is taken into account when
  modeling. Must be greater than or equal to `1`. Defaults to `1`.

The `preholiday_days` and `postholiday_days` arguments together describe
the holiday window around the holiday that is taken into account
when modeling. The holiday window is defined as
`[primary_date - preholiday_days, primary_date + postholiday_days]` and is
inclusive of the pre- and post-holiday days. The value for each holiday window
must be less than or equal to `30` and must be the same across the given
holiday. For example, if you are modeling Arbor Day for several different years,
you must specify the same holiday window for all of those years.

To achieve the best holiday modeling result, provide as much historical and
forecast information about the occurrences of each included holiday as possible.
For example, if you have time series data from 2018 to 2022 and would like to
forecast for 2023, you get the best result by providing the custom holiday
information for all of those years, similar to the following:

```googlesql
CREATE OR REPLACE MODEL `mydataset.arima_model`
  OPTIONS (
    model_type = 'ARIMA_PLUS',
    holiday_region = 'US',...) AS (
        training_data AS (SELECT * FROM `mydataset.timeseries_data`),
        custom_holiday AS (
            SELECT
              'US' AS region,
              'Halloween' AS holiday_name,
              primary_date,
              5 AS preholiday_days,
              1 AS postholiday_days
            FROM
              UNNEST(
                [
                  DATE('2018-10-31'),
                  DATE('2019-10-31'),
                  DATE('2020-10-31'),
                  DATE('2021-10-31'),
                  DATE('2022-10-31'),
                  DATE('2023-10-31')])
                AS primary_date
          )
      )
```

### Supported inputs

The `CREATE MODEL` statement supports the following data types for input label,
data split columns and input feature columns.

#### Supported input feature types

See [Supported input feature types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-input-feature-types) for BigQuery ML supported input feature types.

#### Supported data types for input label columns

BigQuery ML supports different GoogleSQL data types depending on the
model type. Supported data types for `input_label_cols` include:

| `Model type` | `Supported label types` |
|---|---|
| `regression models` | [`INT64`](../googlesql-syntax/data-types.md#integer-type) [`NUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_type) [`BIGNUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#bignumeric_type) [`FLOAT64`](../googlesql-syntax/data-types.md#floating-point-type) |
| `classification models` | Any [groupable](../googlesql-syntax/data-types.md#data-type-properties) data type |

#### Supported data types for data split columns

BigQuery ML supports different GoogleSQL data types depending on
the data split method. Supported data types for `data_split_col` include:

| `Data split method` | `Supported column types` |
|---|---|
| `CUSTOM` | [`BOOL`](../googlesql-syntax/data-types.md#boolean-type) |
| `SEQ` | [`INT64`](../googlesql-syntax/data-types.md#integer-type) [`NUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#numeric_type) [`BIGNUMERIC`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#bignumeric_type) [`FLOAT64`](../googlesql-syntax/data-types.md#floating-point-type) [`TIMESTAMP`](../googlesql-syntax/data-types.md#timestamp-type) |

### Limitations

`CREATE MODEL` statements must comply with the following rules:

- Only one `CREATE` statement is allowed.
- When you use a `CREATE MODEL` statement, the size of the model must be 90 MB or less or the query fails. Generally, if all categorical variables are short strings, a total feature cardinality (model dimension) of 5-10 million is supported. The dimensionality is dependent on the cardinality and length of the string variables.
- The label column cannot contain `NULL` values. If the label column contains `NULL` values, then the query fails.
- The `CREATE MODEL IF NOT EXISTS` clause always updates the last modified timestamp of a model.
- Query statements used in the `CREATE MODEL` statement cannot contain `EXTERNAL_QUERY`. If you want to use `EXTERNAL_QUERY`, then [materialize the
  query result](../googlesql-syntax/data-definition-language-1.md#create-table-statement) and then use the `CREATE MODEL` statement with the newly created table.

### Quotas

Troubleshoot quota for `CREATE MODEL` statements.

#### Maximum number of `CREATE MODEL` statements

This error means that you have exceeded the quota for `CREATE MODEL` statements.

**Error message**

```text
Quota exceeded: Your project exceeded quota for CREATE MODEL queries per
 project.
```

##### Resolution

If you exceed the [quota](https://docs.cloud.google.com/bigquery/quotas#create_model_statements)
for `CREATE MODEL` statements, send an email to
[bqml-feedback@google.com](mailto:bqml-feedback@google.com)
and request a quota increase.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the syntax writes `HPARAM_TUNING_OBJECTIVES` as a single string value, but the hyperparameter tuning examples on the model pages (for example `create-kmeans.md`, `create-glm.md` and `create-dnn-models.md`) pass a one-element array such as `HPARAM_TUNING_OBJECTIVES=['ROC_AUC']`; only one objective is supported. Use the one-element array form of the examples.
- Corrected from the official docs: the syntax writes `[, NUM_TRIALS = int64_value, ]` with a trailing comma; it is written `[, NUM_TRIALS = int64_value ]` like the other options.
- Corrected from the official docs: the `TIME_SERIES_ID_COL` row links its `ARIMA_PLUS_XREG` entry to the `HORIZON` section; it links to `TIME_SERIES_ID_COL`.
- Corrected from the official docs: the query `SELECT * FROM bigquery-public-data.ml_datasets.holidays_and_events_for_forecasting WHERE region = region`, given for seeing the holidays of a region, compares the column with itself and returns every region; write a region code string on the right side, such as `region = 'US'`.

## Related

- [Index of this directory](./README.md)
