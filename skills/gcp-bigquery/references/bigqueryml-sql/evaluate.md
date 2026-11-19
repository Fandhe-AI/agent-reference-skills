---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-evaluate
---

# The ML.EVALUATE function

## Signature / Usage

This document describes the `ML.EVALUATE` function, which lets you
evaluate model metrics.

### Supported models

You can use the `ML.EVALUATE` function with all model types except for the
following:

- [Imported TensorFlow models](create-tensorflow.md)
- [Remote models over Cloud AI services](create-remote-model-service.md)
- [Remote models over embedding models](create-remote-model.md)

### Syntax

The `ML.EVALUATE` function syntax differs depending on the type of model that
you use the function with. Choose the option appropriate for your use case.

#### Time series

<br />

<br />

<br />

```sql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [PERFORM_AGGREGATION AS perform_aggregation]
      [, HORIZON AS horizon]
      [, CONFIDENCE_LEVEL AS confidence_level])
)
```

<br />

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  If you specify a `TABLE` value, the input column names in the table must
  match the column names in the model, and their types must be compatible
  according to BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  If you used the
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model, then you can
  only specify the input columns present in the `TRANSFORM` clause
  in the query.

<!-- -->

- `PERFORM_AGGREGATION`: a `BOOL` value that
  indicates the level of evaluation for forecasting accuracy. If you specify
  `TRUE`, then the forecasting accuracy is on the time series level. If you
  specify `FALSE`, the forecasting accuracy is on the timestamp level.
  The default value is `TRUE`.

- `HORIZON`: an `INT64` value that specifies the
  number of forecasted time points against which the evaluation metrics are
  computed. The default value is the horizon value specified in the
  [`CREATE MODEL`](create-time-series.md)
  statement for the time series model, or `1000` if unspecified. When
  evaluating multiple time series at the same time, this parameter applies
  to each time series.

  You can only use the `HORIZON` argument
  when the following conditions are met:
  - The model type is `ARIMA_PLUS`.
  - You have specified a value for either the `TABLE` or `QUERY_STATEMENT` argument.
- `CONFIDENCE_LEVEL`: a `FLOAT64` value that
  specifies the percentage of the future values that fall in the
  prediction interval. The default value is `0.95`. The valid input
  range is `[0, 1)`.

  You can only use the `CONFIDENCE_LEVEL` argument
  when the following conditions are met:
  - The model type is `ARIMA_PLUS`.
  - You have specified a value for either the `TABLE` or `QUERY_STATEMENT` argument.
  - The `PERFORM_AGGREGATION` argument value is
    `FALSE`.

    The value of the `CONFIDENCE_LEVEL` argument
    affects the `upper_bound` and `lower_bound` values in the output.

<br />

<br />

<br />

<br />

> [!NOTE]
> **Note:**
> For `ARIMA_PLUS` and `ARIMA_PLUS_XREG` models, the output columns differ depending on whether the input data is provided or not. If no input data is provided, use `ML.ARIMA_EVALUATE` instead. The support of `ML.EVALUATE` without input data is deprecated.

<br />

#### Classification \& regression

<br />

<br />

<br />

<br />

```sql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [THRESHOLD AS threshold]
      [, TRIAL_ID AS trial_id])
)
```

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  If you specify a `TABLE` value, the input column names in the table must
  match the column names in the model, and their types must be compatible
  according to BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

  The table must have a
  column that matches the label column name that is provided during
  model training. You can provide this value by using the
  `input_label_cols` option during model training. If `input_label_cols`
  is unspecified, the column named `label` in the training data is used.
- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  If you used the
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model, then you can
  only specify the input columns present in the `TRANSFORM` clause
  in the query.

  The query must have a
  column that matches the label column name that is provided during
  model training. You can provide this value by using the
  `input_label_cols` option during model training. If `input_label_cols`
  is unspecified, the column named `label` in the training data is used.

<!-- -->

- `THRESHOLD`: a `FLOAT64` value that specifies
  a custom threshold for the evaluation. You can only use the
  `THRESHOLD` argument with binary-class
  classification models. The default value is `0.5`.

  A `0` value for precision or recall means that the selected threshold
  produced no true positive labels. A `NaN` value for precision means
  that the selected threshold produced no positive labels, neither true
  positives nor false positives.

  You must specify a value for either the
  `TABLE` or
  `QUERY_STATEMENT` argument in order to specify
  a threshold.

<br />

- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  `ML.EVALUATE` function uses the optimal trial by default. Only specify
  this argument if you ran hyperparameter tuning when creating the model.

<br />

<br />

<br />

<br />

#### Remote over Gemini

<br />

Adapted (not in the official docs): `TOP_P` is passed as `top_p`, not `top_k`.

```sql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [TASK_TYPE AS task_type]
      [, MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TEMPERATURE AS temperature]
      [, TOP_P AS top_p])
)
```

<br />

<br />

<br />

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  If the remote model isn't configured to use
  [supervised tuning](create-remote-model-tuned.md#supervised-tuning),
  the following column naming requirements apply:
  - The table must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The table must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.

  If the remote model is configured to use supervised tuning,
  the following column naming requirements apply:
  - The table must have a column whose name matches the prompt column name that is provided during model training. You can provide this value by using the `prompt_col` option during model training. If `prompt_col` is unspecified, the column named `prompt` in the training data is used. An error is returned if there is no column named `prompt`.
  - The table must have a column whose name matches the label column
    name that is provided during model training. You can provide this
    value by using the `input_label_cols` option during model training.
    If `input_label_cols` is unspecified, the column named `label` in
    the training data is used. An error is returned if there is no
    column named `label`.

    You can find information about the label and prompt columns by
    looking at the model schema information in the Google Cloud console.

  For more information, see
  [`AS SELECT`](create-remote-model-tuned.md#as-select).
- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  If the remote model isn't configured to use
  [supervised tuning](create-remote-model-tuned.md#supervised-tuning),
  the following column naming requirements apply:
  - The query must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The query must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.

  If the remote model is configured to use supervised tuning,
  the following column naming requirements apply:
  - The query must have a column whose name matches the prompt column name that is provided during model training. You can provide this value by using the `prompt_col` option during model training. If `prompt_col` is unspecified, the column named `prompt` in the training data is used. An error is returned if there is no column named `prompt`.
  - The query must have a column whose name matches the label column
    name that is provided during model training. You can provide this
    value by using the `input_label_cols` option during model training.
    If `input_label_cols` is unspecified, the column named `label` in
    the training data is used. An error is returned if there is no
    column named `label`.

    You can find information about the label and prompt columns by
    looking at the model schema information in the Google Cloud console.

  For more information, see
  [`AS SELECT`](create-remote-model-tuned.md#as-select).

<br />

- `TASK_TYPE`: a `STRING` value that specifies the
  type of task for which you want to evaluate the model's performance. The
  valid options are the following:

  - `TEXT_GENERATION`
  - `CLASSIFICATION`
  - `SUMMARIZATION`
  - `QUESTION_ANSWERING`

  The default value is `TEXT_GENERATION`.

<!-- -->

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets
  the maximum number of tokens output by the model. Specify a lower value
  for shorter responses and a higher value for longer responses.
  A token might be smaller than a word and is approximately four characters.
  100 tokens correspond to approximately 60-80 words.

  The default value is `1024`.

  <br />

  The `MAX_OUTPUT_TOKENS` value must be in the range
  `[1,8192]`.

  <br />

<!-- -->

- `TEMPERATURE`: a `FLOAT64` value that is used for
  sampling during the response generation. It controls the
  degree of randomness in token selection. Lower
  `TEMPERATURE` values are good for prompts that require a more deterministic
  and less open-ended or creative response, while higher `TEMPERATURE` values
  can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is
  deterministic, meaning that the highest probability response is always
  selected.

  The `TEMPERATURE` value must be in the range
  `[0.0,1.0]`.

  The default value is `1.0`.

<br />

- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]`
  that changes how the model selects tokens for output. Tokens are selected
  from the most to least probable until the sum of their probabilities
  equals the `TOP_P` value. For example, if tokens A,
  B, and C have a probability of `0.3`, `0.2`, and `0.1` and the
  `TOP_P` value is `0.5`, then the model selects
  either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C. Specify
  a lower value for less random responses and a higher value for more random
  responses.

  The default value is `0.95`.

  <br />

<br />

#### Remote over Claude

Adapted (not in the official docs): `TOP_P` is passed as `top_p`, not `top_k`.

```googlesql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [TASK_TYPE AS task_type]
      [, MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_K AS top_k]
      [, TOP_P AS top_p])
)
```

<br />

<br />

<br />

<br />

<br />

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  The following column naming requirements apply:
  - The table must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The table must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.
- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  The following column naming requirements apply:
  - The query must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The query must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.

<br />

- `TASK_TYPE`: a `STRING` value that specifies the
  type of task for which you want to evaluate the model's performance. The
  valid options are the following:

  - `TEXT_GENERATION`
  - `CLASSIFICATION`
  - `SUMMARIZATION`
  - `QUESTION_ANSWERING`

  The default value is `TEXT_GENERATION`.

<!-- -->

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets
  the maximum number of tokens output by the model. Specify a lower value
  for shorter responses and a higher value for longer responses.
  A token might be smaller than a word and is approximately four characters.
  100 tokens correspond to approximately 60-80 words.

  The default value is `1024`.

  <br />

  <br />

  The `MAX_OUTPUT_TOKENS` value must be in the range
  `[1,4096]`.

<br />

- `TOP_K`: an `INT64` value in the range `[1,40]`
  that changes how the model selects tokens for output. Specify a lower
  value for less random responses and a higher value for more random
  responses. The model determines an appropriate value if you don't
  specify one.

  A `TOP_K` value of `1` means the next selected token
  is the most probable among all tokens in the model's vocabulary, while a
  `TOP_K` value of `3` means that the next token is
  selected from among the three most probable tokens by using the
  `TEMPERATURE` value.

  For each token selection step, the `TOP_K` tokens
  with the highest probabilities are sampled. Then tokens are further
  filtered based on the `TOP_P` value, with the final
  token selected using temperature sampling.

<!-- -->

- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]`
  that changes how the model selects tokens for output. Tokens are selected
  from the most to least probable until the sum of their probabilities
  equals the `TOP_P` value. For example, if tokens A,
  B, and C have a probability of `0.3`, `0.2`, and `0.1` and the
  `TOP_P` value is `0.5`, then the model selects
  either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C. Specify
  a lower value for less random responses and a higher value for more random
  responses.

  <br />

  The model determines an appropriate value if you don't specify one.

<br />

#### Remote over Llama or Mistral AI

Adapted (not in the official docs): `TOP_P` is passed as `top_p`, not `top_k`.

```sql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [TASK_TYPE AS task_type]
      [, MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TEMPERATURE AS temperature]
      [, TOP_P AS top_p])
)
```

<br />

<br />

<br />

<br />

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  The following column naming requirements apply:
  - The table must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The table must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.
- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  The following column naming requirements apply:
  - The query must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The query must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.

<br />

- `TASK_TYPE`: a `STRING` value that specifies the
  type of task for which you want to evaluate the model's performance. The
  valid options are the following:

  - `TEXT_GENERATION`
  - `CLASSIFICATION`
  - `SUMMARIZATION`
  - `QUESTION_ANSWERING`

  The default value is `TEXT_GENERATION`.

<!-- -->

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets
  the maximum number of tokens output by the model. Specify a lower value
  for shorter responses and a higher value for longer responses.
  A token might be smaller than a word and is approximately four characters.
  100 tokens correspond to approximately 60-80 words.

  The default value is `1024`.

  <br />

  <br />

  The `MAX_OUTPUT_TOKENS` value must be in the range
  `[1,4096]`.

<!-- -->

- `TEMPERATURE`: a `FLOAT64` value that is used for
  sampling during the response generation. It controls the
  degree of randomness in token selection. Lower
  `TEMPERATURE` values are good for prompts that require a more deterministic
  and less open-ended or creative response, while higher `TEMPERATURE` values
  can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is
  deterministic, meaning that the highest probability response is always
  selected.

  The `TEMPERATURE` value must be in the range
  `[0.0,1.0]`.

  The default value is `1.0`.

<br />

- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]`
  that changes how the model selects tokens for output. Tokens are selected
  from the most to least probable until the sum of their probabilities
  equals the `TOP_P` value. For example, if tokens A,
  B, and C have a probability of `0.3`, `0.2`, and `0.1` and the
  `TOP_P` value is `0.5`, then the model selects
  either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C. Specify
  a lower value for less random responses and a higher value for more random
  responses.

  <br />

  The model determines an appropriate value if you don't specify one.

<br />

#### Remote over open

<br />

<br />

```sql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [TASK_TYPE AS task_type]
      [, MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TEMPERATURE AS temperature]
      [, TOP_K AS top_k]
      [, TOP_P AS top_p])
)
```

<br />

<br />

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  The following column naming requirements apply:
  - The table must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The table must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.
- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  The following column naming requirements apply:
  - The query must have a column named `input_text` that contains the prompt text to use when evaluating the model.
  - The query must have a column named `output_text` that contains the generated text that you would expect to be returned by the model.

<br />

- `TASK_TYPE`: a `STRING` value that specifies the
  type of task for which you want to evaluate the model's performance. The
  valid options are the following:

  - `TEXT_GENERATION`
  - `CLASSIFICATION`
  - `SUMMARIZATION`
  - `QUESTION_ANSWERING`

  The default value is `TEXT_GENERATION`.

<!-- -->

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets
  the maximum number of tokens output by the model. Specify a lower value
  for shorter responses and a higher value for longer responses.
  A token might be smaller than a word and is approximately four characters.
  100 tokens correspond to approximately 60-80 words.

  <br />

  The model determines an appropriate value if you don't specify one.

  <br />

  The `MAX_OUTPUT_TOKENS` value must be in the range
  `[1,4096]`.

<!-- -->

- `TEMPERATURE`: a `FLOAT64` value that is used for
  sampling during the response generation. It controls the
  degree of randomness in token selection. Lower
  `TEMPERATURE` values are good for prompts that require a more deterministic
  and less open-ended or creative response, while higher `TEMPERATURE` values
  can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is
  deterministic, meaning that the highest probability response is always
  selected.

  The `TEMPERATURE` value must be in the range
  `[0.0,1.0]`.

  <br />

  The model determines an appropriate value if you don't specify one.

<!-- -->

- `TOP_K`: an `INT64` value in the range `[1,40]`
  that changes how the model selects tokens for output. Specify a lower
  value for less random responses and a higher value for more random
  responses. The model determines an appropriate value if you don't
  specify one.

  A `TOP_K` value of `1` means the next selected token
  is the most probable among all tokens in the model's vocabulary, while a
  `TOP_K` value of `3` means that the next token is
  selected from among the three most probable tokens by using the
  `TEMPERATURE` value.

  For each token selection step, the `TOP_K` tokens
  with the highest probabilities are sampled. Then tokens are further
  filtered based on the `TOP_P` value, with the final
  token selected using temperature sampling.

<!-- -->

- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]`
  that changes how the model selects tokens for output. Tokens are selected
  from the most to least probable until the sum of their probabilities
  equals the `TOP_P` value. For example, if tokens A,
  B, and C have a probability of `0.3`, `0.2`, and `0.1` and the
  `TOP_P` value is `0.5`, then the model selects
  either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C. Specify
  a lower value for less random responses and a higher value for more random
  responses.

  <br />

  The model determines an appropriate value if you don't specify one.

<br />

#### All other models

<br />

<br />

<br />

<br />

```sql
ML.EVALUATE(
  MODEL `PROJECT_ID.DATASET.MODEL`
  [, { TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) }],
    STRUCT(
      [THRESHOLD AS threshold]
      [, TRIAL_ID AS trial_id])
)
```

<br />

#### Arguments

`ML.EVALUATE` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the project that contains the resource.
- `MODEL`: the name of the model.
- `TABLE`: the name of the input table that contains the evaluation data.

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training are
  returned.

  If you specify a `TABLE` value, the input column names in the table must
  match the column names in the model, and their types must be compatible
  according to BigQuery
  [implicit coercion rules](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules#coercion).

- `QUERY_STATEMENT`: a GoogleSQL query that
  is used to generate the evaluation data. For the supported SQL syntax of
  the `QUERY_STATEMENT` clause in
  GoogleSQL, see
  [Query syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#sql_syntax).

  If you don't specify a table or query to provide input data, the
  evaluation metrics that are generated for the model during training
  are returned.

  If you used the
  [`TRANSFORM` clause](create.md#transform)
  in the `CREATE MODEL` statement that created the model, then you can
  only specify the input columns present in the `TRANSFORM` clause
  in the query.

<!-- -->

- `THRESHOLD`: a `FLOAT64` value that specifies
  a custom threshold for the evaluation. You can only use the
  `THRESHOLD` argument with binary-class
  classification models. The default value is `0.5`.

  A `0` value for precision or recall means that the selected threshold
  produced no true positive labels. A `NaN` value for precision means
  that the selected threshold produced no positive labels, neither true
  positives nor false positives.

  You must specify a value for either the
  `TABLE` or
  `QUERY_STATEMENT` argument in order to specify
  a threshold.

<br />

- `TRIAL_ID`: an `INT64` value that identifies the
  hyperparameter tuning trial that you want the function to evaluate. The
  `ML.EVALUATE` function uses the optimal trial by default. Only specify
  this argument if you ran hyperparameter tuning when creating the model.

  You can't use the `TRIAL_ID` argument with PCA
  models.

<br />

<br />

<br />

<br />

### Output

`ML.EVALUATE` returns a single row of metrics applicable to the
type of model specified.

For models that return them, the `precision`, `recall`, `f1_score`, `log_loss`,
and `roc_auc` metrics are macro-averaged for all of the class labels. For a
macro-average, metrics are calculated for each label and then an unweighted
average is taken of those values.

#### Time series

`ML.EVALUATE` returns the following columns for `ARIMA_PLUS` or
`ARIMA_PLUS_XREG` models when input data is provided and
`perform_aggregation` is `FALSE`:

- `time_series_id_col` or `time_series_id_cols`: a value that contains the identifiers of a time series. `time_series_id_col` can be an `INT64` or `STRING` value. `time_series_id_cols` can be an `ARRAY<INT64>` or `ARRAY<STRING>` value. Only present when forecasting multiple time series at once. The column names and types are inherited from the `TIME_SERIES_ID_COL` option as specified in the `CREATE MODEL` statement. `ARIMA_PLUS_XREG` models don't support this column.
- `time_series_timestamp_col`: a `STRING` value that contains the timestamp column for a time series. The column name and type are inherited from the `TIME_SERIES_TIMESTAMP_COL` option as specified in the `CREATE MODEL` statement.
- `time_series_data_col`: a `STRING` value that contains the data column for a time series. The column name and type are inherited from the `TIME_SERIES_DATA_COL` option as specified in the `CREATE MODEL` statement.
- `forecasted_time_series_data_col`: a `STRING` value that contains the same data as `time_series_data_col` but with `forecasted_` prefixed to the column name.
- `lower_bound`: a `FLOAT64` value that contains the lower bound of the prediction interval.
- `upper_bound`: a `FLOAT64` value that contains the upper bound of the prediction interval.
- `absolute_error`: a `FLOAT64` value that contains the absolute value of the difference between the forecasted value and the actual data value.
- `absolute_percentage_error`: a `FLOAT64` value that contains the absolute value of the absolute error divided by the actual value.

> [!NOTE]
> **Notes:**
>
> The following things are true for time series models when input data is
> provided and `perform_aggregation` is `FALSE`:
>
> - `ML.EVALUATE` evaluates the forecasting accuracy of each forecasted timestamp.
> - For history timestamps, the following columns are `NULL`:
>   - `forecasted_time_series_data_col`
>   - `lower_bound`
>   - `upper_bound`
>   - `absolute_error`
>   - `absolute_percentage_error`

`ML.EVALUATE` returns the following columns for `ARIMA_PLUS` or
`ARIMA_PLUS_XREG` models when input data is provided and
`perform_aggregation` is `TRUE`:

- `time_series_id_col` or `time_series_id_cols`: the identifiers of a time series. Only present when forecasting multiple time series at once. The column names and types are inherited from the `TIME_SERIES_ID_COL` option as specified in the `CREATE MODEL` statement. `ARIMA_PLUS_XREG` models don't support this column.
- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the model.
- `root_mean_squared_error`: a `FLOAT64` value that contains the [root mean squared error](https://en.wikipedia.org/wiki/Root-mean-square_deviation) for the model.
- `mean_absolute_percentage_error`: a `FLOAT64` value that contains the [mean absolute percentage error](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error) for the model.
- `symmetric_mean_absolute_percentage_error`: a `FLOAT64` value that contains the [symmetric mean absolute percentage error](https://en.wikipedia.org/wiki/Symmetric_mean_absolute_percentage_error) for the model.
- `mean_absolute_scaled_error`: a `FLOAT64` value that contains the [mean absolute scaled error](https://en.wikipedia.org/wiki/Mean_absolute_scaled_error) for the model.

> [!NOTE]
> **Notes:**
>
> The following things are true for time series models when input data is
> provided and `perform_aggregation` is `TRUE`:
>
> - `ML.EVALUATE` evaluates the forecasting accuracy of each forecasted timestamp.
> - The error metrics are aggregated over the forecasting error on each forecasted timestamp.

`ML.EVALUATE` returns the following columns for an `ARIMA_PLUS` model when
input data isn't provided:

- `time_series_id_col` or `time_series_id_cols`: the identifiers of a time series. Only present when forecasting multiple time series at once. The column names and types are inherited from the `TIME_SERIES_ID_COL` option as specified in the `CREATE MODEL` statement.
- `non_seasonal_p`: an `INT64` value that contains the order for the autoregressive model. For more information, see [Autoregressive integrated moving average](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average).
- `non_seasonal_d`: an `INT64` that contains the degree of differencing for the non-seasonal model. For more information, see [Autoregressive integrated moving average](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average).
- `non_seasonal_q`: an `INT64` that contains the order for the moving average model. For more information, see [Autoregressive integrated moving average](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average).
- `has_drift`: a `BOOL` value that indicates whether the model includes a linear drift term.
- `log_likelihood`: a `FLOAT64` value that contains the [log likelihood](https://en.wikipedia.org/wiki/Likelihood_function#Log-likelihood) for the model.
- `aic`: a `FLOAT64` value that contains the [Akaike information criterion](https://en.wikipedia.org/wiki/Akaike_information_criterion) for the model.
- `variance`: a `FLOAT64` value that measures how far the observed value differs from the predicted value mean.
- `seasonal_periods`: a `STRING` value that contains the seasonal period for the model.
- `has_holiday_effect`: a `BOOL` value that indicates whether the model includes any holiday effects.
- `has_spikes_and_dips`: a `BOOL` value that indicates whether the model performs automatic spikes and dips detection and cleanup.
- `has_step_changes`: a `BOOL` value that indicates whether the model has step changes.

> [!NOTE]
> **Note:** The support of `ML.EVALUATE` without input data is deprecated. Use `ML.ARIMA_EVALUATE` instead.

#### Classification

The following types of models are classification models:

- Logistic regressor
- Boosted tree classifier
- Random forest classifier
- DNN classifier
- Wide \& Deep classifier
- AutoML Tables classifier

`ML.EVALUATE` returns the following columns for classification models:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial. This column is only returned if you ran hyperparameter tuning when creating the model. This column doesn't apply for AutoML Tables models.
- `precision`: a `FLOAT64` value that contains the [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision) for the model.
- `recall`: a `FLOAT64` value that contains the [recall](https://en.wikipedia.org/wiki/Precision_and_recall) for the model.
- `accuracy`: a `FLOAT64` value that contains the [accuracy](https://en.wikipedia.org/wiki/Accuracy_and_precision) for the model. `accuracy` is computed as a global total or micro-average. For a micro-average, the metric is calculated globally by counting the total number of correctly predicted rows.
- `f1_score`: a `FLOAT64` value that contains the [F1 score](https://en.wikipedia.org/wiki/F-score) for the model.
- `log_loss`: a `FLOAT64` value that contains the [logistic loss](https://en.wikipedia.org/wiki/Loss_functions_for_classification#Logistic_loss) for the model.
- `roc_auc`: a `FLOAT64` value that contains the [area under the receiver operating characteristic curve](https://en.wikipedia.org/wiki/Receiver_operating_characteristic#Area_under_the_curve) for the model.

#### Regression

The following types of models are regression models:

- Linear regression
- Boosted tree regressor
- Random forest regressor
- Deep neural network (DNN) regressor
- Wide \& Deep regressor
- AutoML Tables regressor

`ML.EVALUATE` returns the following columns for regression models:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial. This column is only returned if you ran hyperparameter tuning when creating the model. This column doesn't apply for AutoML Tables models.
- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the model.
- `mean_squared_log_error`: a `FLOAT64` value that contains the mean squared logarithmic error for the model. The mean squared logarithmic error measures the distance between the actual and predicted values.
- `median_absolute_error`: a `FLOAT64` value that contains the [median absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `r2_score`: a `FLOAT64` value that contains the [R2 score](https://en.wikipedia.org/wiki/Coefficient_of_determination#Interpretation) for the model.
- `explained_variance`: a `FLOAT64` value that contains the [explained variance](https://en.wikipedia.org/wiki/Explained_variation) for the model.

#### K-means

`ML.EVALUATE` returns the following columns for k-means models:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial. This column is only returned if you ran hyperparameter tuning when creating the model.
- `davies_bouldin_index`: a `FLOAT64` value that contains the [Davies-Bouldin Index](https://en.wikipedia.org/wiki/Davies%E2%80%93Bouldin_index) for the model.
- `mean_squared_distance`: a `FLOAT64` value that contains the mean squared distance for the model, which is the average of the distances between training data points to their closest centroid.

#### Matrix factorization

`ML.EVALUATE` returns the following columns for matrix factorization models
with implicit feedback:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial. This column is only returned if you ran hyperparameter tuning when creating the model.
- `recall`: a `FLOAT64` value that contains the [recall](https://en.wikipedia.org/wiki/Precision_and_recall) for the model.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the model.
- `normalized_discounted_cumulative_gain`: a `FLOAT64` value that contains the [normalized discounted cumulative gain](https://en.wikipedia.org/wiki/Discounted_cumulative_gain#Normalized_DCG) for the model.
- `average_rank`: a `FLOAT64` value that contains the [average rank (PDF download)](http://yifanhu.net/PUB/cf.pdf) for the model.

`ML.EVALUATE` returns the following columns for matrix factorization models
with explicit feedback:

- `trial_id`: an `INT64` value that identifies the hyperparameter tuning trial. This column is only returned if you ran hyperparameter tuning when creating the model.
- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the model.
- `mean_squared_log_error`: a `FLOAT64` value that contains the mean squared logarithmic error for the model. The mean squared logarithmic error measures the distance between the actual and predicted values.
- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `r2_score`: a `FLOAT64` value that contains the [R2 score](https://en.wikipedia.org/wiki/Coefficient_of_determination#Interpretation) for the model.
- `explained_variance`: a `FLOAT64` value that contains the [explained variance](https://en.wikipedia.org/wiki/Explained_variation) for the model.

#### Remote over pre-trained models

This section describes the output for the following types of models:

- Gemini
- Anthropic Claude
- Mistral AI
- Llama
- Open models

`ML.EVALUATE` returns different columns depending on the `task_type` value
that you specify.

When you specify the `TEXT_GENERATION` task type, the following columns are
returned:

- `bleu4_score`: a `FLOAT64` column that contains the [bilingual evaluation understudy (BLEU4) score](https://en.wikipedia.org/wiki/BLEU) for the model.
- `rouge-l_precision`: a `FLOAT64` column that contains the [Recall-oriented understudy for gisting evaluation (ROUGE-L)](https://en.wikipedia.org/wiki/ROUGE_(metric)) [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision) for the model.
- `rouge-l_recall`: a `FLOAT64` column that contains the ROUGE-L [recall](https://en.wikipedia.org/wiki/Precision_and_recall) for the model.
- `rouge-l_f1`: a `FLOAT64` column that contains the ROUGE-L [F1 score](https://en.wikipedia.org/wiki/F-score) for the model.
- `evaluation_status`: a `STRING` column in JSON format that contains the
  following elements:

  - `num_successful_rows`: the number of successful inference rows returned from Gemini Enterprise Agent Platform.
  - `num_total_rows`: the number of total input rows.

When you specify the `CLASSIFICATION` task type, the following columns are
returned:

- `precision`: a `FLOAT64` column that contains the [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision) for the model.
- `recall`: a `FLOAT64` column that contains the [recall](https://en.wikipedia.org/wiki/Precision_and_recall) for the model.
- `f1`: a `FLOAT64` column that contains the [F1 score](https://en.wikipedia.org/wiki/F-score) for the model.
- `label`: a `STRING` column that contains the label generated for the input data.
- `evaluation_status`: a `STRING` column in JSON format that contains the
  following elements:

  - `num_successful_rows`: the number of successful inference rows returned from Agent Platform.
  - `num_total_rows`: the number of total input rows.

When you specify the `SUMMARIZATION` task type, the following columns are
returned:

- `rouge-l_precision`: a `FLOAT64` column that contains the [Recall-oriented understudy for gisting evaluation (ROUGE-L)](https://en.wikipedia.org/wiki/ROUGE_(metric)) [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision) for the model.
- `rouge-l_recall`: a `FLOAT64` column that contains the ROUGE-L [recall](https://en.wikipedia.org/wiki/Precision_and_recall) for the model.
- `rouge-l_f1`: a `FLOAT64` column that contains the ROUGE-L [F1 score](https://en.wikipedia.org/wiki/F-score) for the model.
- `evaluation_status`: a `STRING` column in JSON format that contains the
  following elements:

  - `num_successful_rows`: the number of successful inference rows returned from Agent Platform.
  - `num_total_rows`: the number of total input rows.

When you specify the `QUESTION_ANSWERING` task type, the following columns are
returned:

- `exact_match`: a `FLOAT64` column that indicates if the generated text exactly matches the [ground truth](https://en.wikipedia.org/wiki/Ground_truth#Statistics_and_machine_learning). This value is `1` if the generated text equals the ground truth, otherwise it is `0`. This metric is an average across all of the input rows.
- `evaluation_status`: a `STRING` column in JSON format that contains the
  following elements:

  - `num_successful_rows`: the number of successful inference rows returned from Agent Platform.
  - `num_total_rows`: the number of total input rows.

#### Remote over custom models

`ML.EVALUATE` returns the following column for remote models over
custom models deployed to Agent Platform:

- `remote_eval_metrics`: a `JSON` column containing appropriate metrics for the model type.

#### PCA

`ML.EVALUATE` returns the following column for PCA models:

- `total_explained_variance_ratio`: a `FLOAT64` value that contains the percentage of the cumulative variance explained by all the returned principal components. For more information, see [the `ML.PRINCIPAL_COMPONENT_INFO` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-principal-component-info).

#### Autoencoder

`ML.EVALUATE` returns the following columns for autoencoder models:

- `mean_absolute_error`: a `FLOAT64` value that contains the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) for the model.
- `mean_squared_error`: a `FLOAT64` value that contains the [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error) for the model.
- `mean_squared_log_error`: a `FLOAT64` value that contains the mean squared logarithmic error for the model. The mean squared logarithmic error measures the distance between the actual and predicted values.

### Limitations

`ML.EVALUATE` is subject to the following limitations:

- `ML.EVALUATE` doesn't support [imported TensorFlow models](create-tensorflow.md) or [remote models over Cloud AI services](create-remote-model-service.md).
- For remote models over Agent Platform endpoints, `ML.EVALUATE` fetches evaluation result from the Gemini Enterprise Agent Platform endpoint and doesn't take any input data.

### Costs

When used with remote models over Agent Platform LLMs,
`ML.EVALUATE` costs are calculated based on the following:

- The bytes processed from the input table. These charges are billed from BigQuery to your project. For more information, see [BigQuery pricing](https://cloud.google.com/bigquery/pricing).
- The input to and output from the LLM. These charges are billed from Agent Platform to your project. For more information, see [Agent Platform pricing](https://docs.cloud.google.com/vertex-ai/generative-ai/pricing).

### Examples

The following examples show how to use `ML.EVALUATE`.

#### `ML.EVALUATE` with no input data specified

The following query evaluates a model with no input data specified:

```sql
SELECT
  *
FROM
  ML.EVALUATE(MODEL `mydataset.mymodel`)
```

#### `ML.EVALUATE` with a custom threshold and input data

The following query evaluates a model with input data and a custom
threshold of `0.55`:

```sql
SELECT
  *
FROM
  ML.EVALUATE(MODEL `mydataset.mymodel`,
    (
    SELECT
      custom_label,
      column1,
      column2
    FROM
      `mydataset.mytable`),
    STRUCT(0.55 AS threshold))
```

#### `ML.EVALUATE` to calculate forecasting accuracy of a time series

The following query evaluates the 30-point forecasting accuracy for a
time series model:

```sql
SELECT
  *
FROM
  ML.EVALUATE(MODEL `mydataset.my_arima_model`,
    (
    SELECT
      timeseries_date,
      timeseries_metric
    FROM
      `mydataset.mytable`),
    STRUCT(TRUE AS perform_aggregation, 30 AS horizon))
```

#### `ML.EVALUATE` to calculate ARIMA_PLUS forecasting accuracy for each forecasted timestamp

The following query evaluates the forecasting accuracy for each of the 30
forecasted points of a time series model. It also computes the prediction
interval based on a confidence level of `0.9`.

```sql
SELECT
  *
FROM
  ML.EVALUATE(MODEL `mydataset.my_arima_model`,
    (
    SELECT
      timeseries_date,
      timeseries_metric
    FROM
      `mydataset.mytable`),
    STRUCT(FALSE AS perform_aggregation, 0.9 AS confidence_level,
    30 AS horizon))
```

#### `ML.EVALUATE` to calculate ARIMA_PLUS_XREG forecasting accuracy for each forecasted timestamp

The following query evaluates the forecasting accuracy for each of the 30
forecasted points of a time series model. It also computes the prediction
interval based on a confidence level of `0.9`. Note that you need to include the
side features for the evaluation data.

```sql
SELECT
  *
FROM
  ML.EVALUATE(MODEL `mydataset.my_arima_xreg_model`,
    (
    SELECT
      timeseries_date,
      timeseries_metric,
      feature1,
      feature2
    FROM
      `mydataset.mytable`),
    STRUCT(FALSE AS perform_aggregation, 0.9 AS confidence_level,
    30 AS horizon))
```

#### `ML.EVALUATE` to calculate LLM text generation accuracy

The following query evaluates the LLM text generation accuracy for
the classification task type for each label from the evaluation table.

```sql
SELECT
  *
FROM
  ML.EVALUATE(MODEL `mydataset.my_llm`,
    (
    SELECT
      prompt,
      label
    FROM
      `mydataset.mytable`),
    STRUCT('classification' AS task_type))
```

### What's next

- For more information about model evaluation, see [BigQuery ML model evaluation overview](https://docs.cloud.google.com/bigquery/docs/evaluate-overview).
- For more information about supported SQL statements and functions for ML models, see [End-to-end user journeys for ML models](https://docs.cloud.google.com/bigquery/docs/e2e-journey).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-evaluate (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: for `ARIMA_PLUS` and `ARIMA_PLUS_XREG` models with `perform_aggregation` set to `FALSE`, `time_series_timestamp_col`, `time_series_data_col` and `forecasted_time_series_data_col` are described as `STRING` values while their name and type are inherited from the `CREATE MODEL` options; the `STRING` type is not confirmed (`ML.DETECT_ANOMALIES` gives `TIMESTAMP` and `FLOAT64` for the same columns).
- Corrected from the official docs: the generative model syntax blocks pass `TOP_P AS top_k`, while the argument list describes `TOP_P` as the `FLOAT64` top-p value and the last syntax block writes `TOP_P AS top_p`; they are written `TOP_P AS top_p`.

## Related

- [Index of this directory](./README.md)
