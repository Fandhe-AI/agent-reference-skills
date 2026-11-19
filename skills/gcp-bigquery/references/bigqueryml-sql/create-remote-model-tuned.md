---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model-tuned
---

# The CREATE MODEL statement for fine-tuning Gemini Enterprise Agent Platform Gemini models

## Signature / Usage

This document describes the `CREATE MODEL` statement for fine-tuning
Gemini models in Gemini Enterprise Agent Platform by using SQL. For pre-trained models,
see
[The CREATE MODEL statement for Agent Platform AI LLMs as MaaS](create-remote-model.md).
Alternatively, you can use the Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

After you create the remote model, you can use one of the following functions
to perform generative AI with that model:

- [`AI.GENERATE_TABLE`](generate-table.md)
- [`AI.GENERATE_TEXT`](ai-generate-text.md)

### Supervised tuning

To configure
[supervised tuning](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning), you must create a remote model that references one
of the
[supported models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning#supported_models).

To configure supervised tuning, specify
the `AS SELECT` clause, and optionally some of the other `CREATE MODEL`
arguments that affect supervised tuning. Supervised tuning lets you train the
model on your own data to make it better suited for your use case. However,
not all models have their performance improved by tuning. To learn more about
whether tuning would make sense for your use case, see
[Use cases for using supervised fine-tuning](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning#use_cases_for_using_supervised_fine-tuning).

After you create a tuned model, use the
[`EVALUATE` function](evaluate.md)
to evaluate whether the tuned model performs well for your use case. To learn
more, try the
[Use tuning and evaluation to improve LLM performance](https://docs.cloud.google.com/bigquery/docs/tune-evaluate)
tutorial.

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
`project_id.dataset.model_name`
REMOTE WITH CONNECTION {DEFAULT | `project_id.region.connection_id`}
OPTIONS(
  ENDPOINT = 'vertex_ai_gemini_endpoint'
  [, PROMPT_COL = 'prompt_col']
  [, INPUT_LABEL_COLS = input_label_cols]
  [, MAX_ITERATIONS = max_iterations]
  [, LEARNING_RATE_MULTIPLIER = learning_rate_multiplier]
  [, DATA_SPLIT_METHOD = 'data_split_method']
  [, DATA_SPLIT_EVAL_FRACTION = data_split_eval_fraction]
  [, DATA_SPLIT_COL = 'data_split_col']
  [, EVALUATION_TASK = 'evaluation_task'])
[AS SELECT prompt_column, label_column FROM `project_id.dataset.table_name`]
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

#### `REMOTE WITH CONNECTION`

**Syntax**

```googlesql
`[PROJECT_ID].[LOCATION].[CONNECTION_ID]`
```

BigQuery uses a
[Cloud resource connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection)
to interact with

the Gemini Enterprise Agent Platform endpoint.

The connection elements are as follows:

- `PROJECT_ID`: the project ID of the project that contains the connection.
- `LOCATION`: the [location](https://docs.cloud.google.com/bigquery/docs/locations) used by the connection. The connection must be in the same location as the dataset that contains the model.
- `CONNECTION_ID`: the connection ID---for example, `myconnection`.

  To find your connection ID,
  [view the connection details](https://docs.cloud.google.com/bigquery/docs/working-with-connections#view-connections)
  in the Google Cloud console. The connection ID is the value in the last
  section of the fully qualified connection ID that is shown in
  **Connection ID** ---for example
  `projects/myproject/locations/connection_location/connections/*myconnection*`.

  To use a [default
  connection](https://docs.cloud.google.com/bigquery/docs/default-connections), specify `DEFAULT` instead of the connection string
  containing <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>.

<br />

If you are creating a remote model over an Agent Platform model that uses supervised tuning, you need to grant the [Vertex AI Service Agent role](https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.serviceAgent) to the connection's service account in the project where you create the model. Otherwise, you need to grant the [Agent Platform User role](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.user) to the connection's service account in the project where you create the model.

If you are using the remote model to analyze unstructured data from an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction), you must also grant the
[Vertex AI Service Agent role](https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.serviceAgent)
to the service account of the connection associated with the object table.
You can find the object table's connection in the Google Cloud console, on the
**Details** pane for the object table.

**Example**

```googlesql
`myproject.us.my_connection`
```

#### `ENDPOINT`

**Syntax**

```text
ENDPOINT = 'vertex_ai_gemini_endpoint'
```

**Description**

The endpoint for an Agent Platform
Gemini model that
[supports](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning#supported_models)
supervised fine tuning. You can specify the name of the
Agent Platform Gemini model, for
example `gemini-3.5-flash-lite`, or you can specify the
Agent Platform model's endpoint URL, for
example
`https://europe-west6-aiplatform.googleapis.com/v1/projects/myproject/locations/europe-west6/publishers/google/models/gemini-3.5-flash-lite`.
If you specify the model name, BigQuery ML automatically
identifies and uses the full endpoint of the
Agent Platform model based on the location of the dataset in which
you create the model.

**Arguments**

A `STRING` value that contains the model name of an Agent Platform Gemini model that
[supports fine-tuning](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning#supported_models).

> [!NOTE]
> **Note:** To provide feedback or request support for the models in preview, send an email to [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

For
[supported Gemini models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#supported_models),
you can specify the
[global endpoint](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#use_the_global_endpoint),
as shown in the following example:

```bash
https://aiplatform.googleapis.com/v1/projects/test-project/locations/global/publishers/google/models/gemini-2.0-flash-001
```

Using the global endpoint for your requests can improve overall
availability while reducing resource exhausted (429) errors, which occur
when you exceed your quota for a regional endpoint.
If you want to use Gemini in a region where it isn't
available, you can avoid migrating your data to a different region by
using the global endpoint instead.

> [!NOTE]
> **Note:** Don't use the global endpoint if you have requirements for the data processing location, because when you use the global endpoint, you can't control or know the region where your processing requests are handled.

For information that can help you choose between the supported models, see
[Model information](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models).

##### Retired models

For more information on retired Agent Platform models, see
[Retired models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions#retired-models).

#### `PROMPT_COL`

**Syntax**

```text
PROMPT_COL = 'prompt_col'
```

**Description**

The name of the prompt column in the training data table to use when performing
supervised tuning. If you don't specify a value for this option, you must have
a column named or aliased as `prompt` in your input data.

**Arguments**

A `STRING` value. The default value is `prompt`.

#### `INPUT_LABEL_COLS`

**Syntax**

```text
INPUT_LABEL_COLS = input_label_cols
```

**Description**

The name of the label column in the training data table to use when performing
supervised tuning. If you don't specify a value for this option, you must have
a column named or aliased as `label` in your input data.

**Arguments**

A one-element `ARRAY<STRING>` value. The default value is an empty array.

#### `MAX_ITERATIONS`

**Syntax**

```text
MAX_ITERATIONS = max_iterations
```

**Description**

The number of steps to run when performing supervised tuning.
You can only use this option when performing
[supervised tuning](#supervised-tuning) with a supported model.
If you specify this option, you must also specify the
[`AS SELECT` clause](#as-select).

When you use a Gemini model,
BigQuery ML automatically converts the `MAX_ITERATIONS` value to
epochs, which is what Gemini models use for training. The
default value for `MAX_ITERATIONS` is the number of rows in the input data,
which is equivalent to one epoch. To use multiple epochs, specify a multiple of
the number of rows in your training data. For example, if you have 100 rows of
input data and you want to use two epochs, specify `200` for the argument value.
If you provide a value that isn't a multiple of the number of rows in the input
data, BigQuery ML rounds up to the nearest epoch.
For example, if you have 100 rows of input data and you specify `101` for the
`MAX_ITERATIONS` value, training is performed with two epochs.

For more information about the parameters that are used to tune
Gemini models, see
[Create a tuning job](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-supervised-tuning#create_a_text_model_supervised_tuning_job).

For more guidance on choosing the number of epochs for Gemini
models, see
[Recommended configurations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-supervised-tuning#recommended_configurations).

**Arguments**

An `INT64` value between `1` and ∞. Typically, 100 steps takes about an
hour to complete. The default value is `300`.

#### `LEARNING_RATE_MULTIPLIER`

**Syntax**

```text
LEARNING_RATE_MULTIPLIER = learning_rate_multiplier
```

**Description**

A multiplier to apply to the recommended learning rate when performing
supervised tuning.

**Arguments**

A positive `FLOAT64` value. The default value is `1.0`.

#### `DATA_SPLIT_METHOD`

**Syntax**

```sql
DATA_SPLIT_METHOD = { 'AUTO_SPLIT' | 'RANDOM' | 'CUSTOM' | 'SEQ' | 'NO_SPLIT' }
```

**Description**

The method used to split input data into training and evaluation sets when
performing supervised tuning.

Training data is used to train the model. Evaluation data is used to avoid
[overfitting](https://developers.google.com/machine-learning/glossary/#overfitting)
by using early stopping.

The percentage sizes of the data sets produced by the various arguments for
this option are approximate. Larger input data sets come closer to the
percentages described than smaller input data sets do.

You can see the model's data split information in the following ways:

- The data split method and percentage are shown in the **Training Options** section of the model's **Details** page on the **BigQuery** page of the Google Cloud console.
- Links to temporary tables that contain the split data are available in the **Model Details** section of the model's **Details** page on the **BigQuery** page of the Google Cloud console. You can also return this information from the [`DataSplitResult` field](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/models#datasplitresult) in the BigQuery API. These tables are saved for 48 hours. If you need this information for more than 48 hours, then you should export this data or copy it to permanent tables.

**Arguments**

This option accepts the following values:

- `AUTO_SPLIT`: This is the default value. This option splits the data as
  follows:

  - If there are fewer than 500 rows in the input data, then all rows are used as training data.
  - If there are more than 500 rows in the input data, then data is randomized
    and split as follows:

    - If there are between 500 and 50,000 rows in the input data, then 20% of the data is used as evaluation data and 80% is used as training data.
    - If there are more than 50,000 rows, then 10,000 rows are used as evaluation data and the remaining rows are used as training data.
- `RANDOM`: Data is randomized before being split into sets. To customize the
  data split, you can use this option with the
  [`DATA_SPLIT_EVAL_FRACTION` option](#data_split_eval_fraction). If you don't
  specify that option, data is split in the same way as for the
  `AUTO_SPLIT` option.

  A random split is deterministic: different training runs produce the same
  split results if the same underlying training data is used.

  > [!NOTE]
  > **Note:** A random split is based on the [FARM_FINGERPRINT](../googlesql-functions/hash_functions.md#farm_fingerprint) of the data (including the column name and schema), so tables with the same content but different column names and schemas might get different splitting and different evaluation metrics.

- `CUSTOM`: Split data using the value provided in the
  [`DATA_SPLIT_COL` option](#data_split_col). The `DATA_SPLIT_COL` value must be
  the name of a column of type `BOOL`. Rows with a value of `TRUE` or `NULL` are
  used as evaluation data, and rows with a value of `FALSE` are used as
  training data.

- `SEQ`: Split data sequentially by using the value in a specified column of one
  of the following types:

  - `NUMERIC`
  - `BIGNUMERIC`
  - `STRING`
  - `TIMESTAMP`

  The data is sorted smallest to largest based on the specified column.

  The last <var translate="no">n</var> rows are used as evaluation data, where <var translate="no">n</var>
  is the value specified for
  [`DATA_SPLIT_EVAL_FRACTION`](#data_split_eval_fraction). The remaining rows
  are used as training data.

  All rows with split values smaller than the threshold are used as
  training data. The remaining rows, including those with `NULL` values,
  are used as evaluation data.

  Use the [`DATA_SPLIT_COL` option](#data_split_col) option to identify the
  column that contains the data split information.
- `NO_SPLIT`: No data split; all input data is used as training data.

#### `DATA_SPLIT_EVAL_FRACTION`

**Syntax**

`DATA_SPLIT_EVAL_FRACTION = data_split_eval_fraction`

**Description**

The fraction of the data to use as evaluation data when performing supervised
tuning. Use when you specify `RANDOM` or `SEQ` as the value for the
[`DATA_SPLIT_METHOD` option](#data_split_method).

**Arguments**

A `FLOAT64` value in the range `[0, 1.0]`. The default is `0.2`. The service
maintains the accuracy of the input value to two decimal places.

#### `DATA_SPLIT_COL`

**Syntax**

`DATA_SPLIT_COL = 'data_split_col'`

**Description**

The name of the column to use to sort input data into the training or
evaluation set when performing supervised tuning. Use when you are specifying
`CUSTOM` or `SEQ` as the value for `DATA_SPLIT_METHOD`.

If you are specifying `SEQ` as the value for `DATA_SPLIT_METHOD`, then the data
is first sorted smallest to largest based on the specified column. The last
<var translate="no">n</var> rows are used as evaluation data, where <var translate="no">n</var> is the value
specified for [`DATA_SPLIT_EVAL_FRACTION`](#data_split_eval_fraction). The
remaining rows are used as training data.

If you are specifying `CUSTOM` as the value for `DATA_SPLIT_COL`, then you must
provide the name of a column of type `BOOL`. Rows with a value of `TRUE` or
`NULL`are used as evaluation data, rows with a value of `FALSE` are used as
training data.

The column you specify for `DATA_SPLIT_COL` can't be used as a feature or
label, and the column is excluded from features automatically.

**Arguments**

A `STRING` value.

#### `EVALUATION_TASK`

**Syntax**

```text
EVALUATION_TASK = 'evaluation_task'
```

**Description**

When performing supervised tuning, the type of task that you want to tune
the model to perform.

**Arguments**

A `STRING` value. The valid options are the following:

- `TEXT_GENERATION`
- `CLASSIFICATION`
- `SUMMARIZATION`
- `QUESTION_ANSWERING`
- `UNSPECIFIED`

The default value is `UNSPECIFIED`.

#### `AS SELECT`

**Syntax**

```text
AS SELECT prompt_column, label_column FROM
  `project_id.dataset.table_name`
```

**Description**

Provides the training data to use when performing supervised tuning.

**Arguments**

- `prompt_column`: The name of the column in the training data table that contains the prompt for evaluating the content in the `label_column` column. This column must be of `STRING` type or be cast to `STRING`. If you specify a value for the `PROMPT_COL` option, you must specify the same value for `prompt_column`. Otherwise this value must be `prompt`. If your table does not have a `prompt` column, use an alias to specify an existing table column. For example, `SELECT hint AS prompt, label FROM mydataset.mytable`.
- `label_column`: The name of the column in the training data table that contains the examples to train the model with. This column must be of `STRING` type or be cast to `STRING`. If you specify a value for the `INPUT_LABEL_COLS` option, you must specify the same value for `label_column`. Otherwise this value must be `label`. If your table does not have a `label` column, use an alias to specify an existing table column. For example, `SELECT prompt, feature AS label FROM mydataset.mytable`.
- `project_id`: The project ID of the project that contains the training data table.
- `dataset`: The dataset name of the dataset that contains the training data table. After optional data splitting, the number of rows in the training dataset has to be greater or equal to 10.
- `table_name`: The name of the training data table.

#### Costs

When using supervised tuning with remote models over Agent Platform
LLMs, costs are calculated based on the following:

- The bytes processed from the training data table specified in the [`AS SELECT` clause](#as-select). These charges are billed from BigQuery to your project. For more information, see [BigQuery pricing](https://cloud.google.com/bigquery/pricing).
- The number of tokens processed to tune the LLM. These charges are billed from Agent Platform to your project. For more information, see [Agent Platform pricing](https://docs.cloud.google.com/vertex-ai/generative-ai/pricing#gemini-models).

### Locations

For information about supported locations, see
[Locations for remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-remote-models).

### Examples

The following examples create BigQuery ML remote models.

#### Create a tuned model

The following example creates a BigQuery ML remote model over a
tuned version of an Agent Platform Gemini model:

```text
CREATE OR REPLACE MODEL `mydataset.tuned_model`
  REMOTE WITH CONNECTION `myproject.us.test_connection`
  OPTIONS (
    endpoint = 'gemini-2.0-flash-001',
    max_iterations = 500,
    prompt_col = 'prompt',
    input_label_cols = ['label'])
AS
SELECT
  CONCAT(
    'Please do sentiment analysis on the following text and only output a number from 0 to 5 where 0 means sadness, 1 means joy, 2 means love, 3 means anger, 4 means fear, and 5 means surprise. Text: ',
    sentiment_column) AS prompt,
  text_column AS label
FROM `mydataset.emotion_classification_train`;
```

### What's next

- For more information about using Agent Platform models with BigQuery ML, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- Try [customizing a model by using supervised fine tuning](https://docs.cloud.google.com/bigquery/docs/tune-evaluate).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model-tuned (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the `prompt_column` and `label_column` alias examples are written `SELECT AS hint AS prompt, label ...` and `SELECT AS prompt, feature AS label ...`, which are not valid GoogleSQL; the extra `AS` after `SELECT` is removed.
- Corrected from the official docs: the `SEQ` description under `DATA_SPLIT_METHOD` says the first n rows (sorted smallest to largest) are used as evaluation data, but the next sentence (rows smaller than the threshold are training data), the `DATA_SPLIT_COL` section and the other model pages say the last n rows; "first" is changed to "last". Here n is the number of rows that corresponds to the `DATA_SPLIT_EVAL_FRACTION` fraction.
- Conflicting official statements: the `MAX_ITERATIONS` description says that for Gemini models the default is the number of rows in the input data (one epoch), but its Arguments give a default of `300`. The source does not say which models the `300` default applies to.

## Related

- [Index of this directory](./README.md)
