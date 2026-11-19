---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-text
---

# The AI.GENERATE_TEXT function

## Signature / Usage

This document describes the `AI.GENERATE_TEXT` function, a table-valued function
that lets you perform
generative natural language tasks by using any combination of text and
unstructured data from BigQuery
[standard tables](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables), or
unstructured data from BigQuery
[object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction).

```sql
SELECT *
FROM AI.GENERATE_TEXT(MODEL `mydataset.gemini_model`, TABLE mydataset.table_of_prompts);
```

The function works by sending requests to a BigQuery ML remote model
that represents a Gemini Enterprise Agent Platform model, and then returning that model's
response. The following types of remote models are supported:

- [Remote models](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model) over any of the [generally available](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#generally_available_models) or [preview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#preview_models) Gemini models.
- [Remote models](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model)
  over the following partner models:

  - [Anthropic Claude models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude)
  - [Mistral AI models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/mistral)
  - [Llama models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/llama)
- [Remote models over supported open models](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model-open).

Several of the `AI.GENERATE_TEXT` function's arguments provide the
parameters that shape the Agent Platform model's response.

You can use the `AI.GENERATE_TEXT` function to perform tasks such as
classification, sentiment analysis, image captioning, and transcription.

Prompt design can strongly affect the responses returned by the
Agent Platform model. For more information, see
[Introduction to prompting](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design)
or
[Design multimodal prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts).

### Input

The input you can provide to `AI.GENERATE_TEXT` varies depending on the
Agent Platform model that you reference from your remote model.

#### Input for Gemini models

When you use the Gemini models, you can use the following types
of input:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.
- Unstructured data from an object table.

When you analyze unstructured data, that data must meet the following
requirements:

- Content must be in one of the supported formats that are described in the Gemini API model [`mimeType` parameter](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini#parameters).
- For more information about accepted multimodal input, see the [technical specifications](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash#technical-specifications) for Gemini.

#### Input for other models

For all other types of models, you can analyze text data from a standard table.

### Syntax for standard tables

`AI.GENERATE_TEXT` syntax differs depending on the Agent Platform
model that your remote model references. Choose the option appropriate for your
use case.

#### Gemini

```googlesql
AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, STOP_SEQUENCES AS stop_sequences]
      [, GROUND_WITH_GOOGLE_SEARCH AS ground_with_google_search]
      [, SAFETY_SETTINGS AS safety_settings]
    }
    |
    [, MODEL_PARAMS AS model_params]
  }
  [, REQUEST_TYPE AS request_type])
)
```

#### Arguments

`AI.GENERATE_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the remote model over the Gemini Enterprise Agent Platform model. For more information about how to create this type of remote model, see [The
  `CREATE MODEL` statement for remote models over LLMs](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model).

  You can confirm what model is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in the
  model details page.

  > [!NOTE]
  > **Note:** Using a remote model based on a Gemini 2.5 model incurs charges for the [thinking process](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/thinking).

- `TABLE`: the name of the BigQuery table that contains the prompt data. The text in the column that's named `prompt` is sent to the model. If your table does not have a `prompt` column, use the `QUERY_STATEMENT` argument instead and provide a `SELECT` statement that includes an alias for an existing table column. An error occurs if no `prompt` column is available.
- `QUERY_STATEMENT`: the GoogleSQL query that generates the prompt data. The query must produce a column named `prompt`. Within the query, you can provide the prompt value in the following ways:
  - Specify a `STRING` value. For example, `('Write a poem about birds')`.
  - Specify a `STRUCT` value that contains one or more fields. You can use the following types of fields within the `STRUCT` value:

    | Field type | Description | Examples |
    |---|---|---|
    | `STRING` or `ARRAY<STRING>` | A string literal, array of string literals, or the name of a `STRING` column. | String literal: `'Is Seattle a US city?'` String column name: `my_string_column` |
    | `ObjectRef` or `ARRAY<ObjectRef>` | An [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) literal, array of `ObjectRef` literals, or the name of an `ObjectRef` column. Your input can contain at most one video object. | `OBJ.MAKE_REF('gs://my_image.jpg')` |

    The function combines `STRUCT` fields similarly to a
    [`CONCAT`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#concat)
    operation and concatenates the fields in their specified order. The same is
    true for the elements of any arrays used within the struct. The following
    table shows some examples of `STRUCT` prompt values and how they
    are interpreted:

    | Struct field types | Struct value | Semantic equivalent |
    |---|---|---|
    | `STRUCT<STRING, STRING, STRING>` | `('Describe the city ', my_city_column, ' in 15 words')` | 'Describe the city <var translate="no">my_city_column_value</var> in 15 words' |
    | `STRUCT<STRING, ObjectRef>` | `('Describe this city', image_objectref_column)` | 'Describe this city' <var translate="no">image</var> |

> [!NOTE]
> **Note:** We recommend against using the [`LIMIT
> and OFFSET` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#limit_and_offset_clause) in the prompt query. Using this clause causes the query to process all of the input data first and then apply `LIMIT` and `OFFSET`.

> [!NOTE]
> **Note:** To minimize Agent Platform charges, write query results to a table and then reference that table in the `AI.GENERATE_TEXT` function. This can help you ensure that you are sending as few rows as possible to the model.

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words. This value must be in the range `[1,8192]`. Specify a lower value for shorter responses and a higher value for longer responses. The default is `1024`.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. The default is `0.95`.

  Tokens are selected from the most to least probable until the sum of
  their probabilities equals the `TOP_P` value. For example, if
  tokens A, B, and C have a probability of `0.3`, `0.2`,
  and `0.1`, and the `TOP_P` value is `0.5`,
  then the model selects either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C.
- `TEMPERATURE`: a `FLOAT64` value in the range `[0.0,1.0]` that controls the degree of randomness in token selection. Lower `TEMPERATURE` values are good for prompts that require a more deterministic and less open-ended or creative response, while higher `TEMPERATURE` values can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is deterministic, meaning that the highest probability response is always selected. The default is `0`.
- `STOP_SEQUENCES`: an `ARRAY<STRING>` value that removes the specified strings if they are included in responses from the model. Strings are matched exactly, including capitalization. The default is an empty array.
- `GROUND_WITH_GOOGLE_SEARCH`: a `BOOL` value that determines whether the Agent Platform model uses [Grounding
  with Google Search](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview#ground-public) when generating responses. Grounding lets the model use additional information from the internet when generating a response, in order to make model responses more specific and factual. When this field is set to `TRUE`, an additional `grounding_result` column is included in the results, providing the sources that the model used to gather additional information. The default is `FALSE`.
- `SAFETY_SETTINGS`: an `ARRAY<STRUCT<STRING AS category, STRING AS threshold>>` value that configures content safety thresholds to filter responses. The first element in the struct specifies a harm category, and the second element in the struct specifies a corresponding blocking threshold. The model filters out content that violate these settings. You can only specify each category once. For example, you can't specify both `STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
  'BLOCK_MEDIUM_AND_ABOVE' AS threshold)` and `STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
  'BLOCK_ONLY_HIGH' AS threshold)`. If there is no safety setting for a given category, the `BLOCK_MEDIUM_AND_ABOVE` safety setting is used.

  Supported categories are as follows:
  - `HARM_CATEGORY_HATE_SPEECH`
  - `HARM_CATEGORY_DANGEROUS_CONTENT`
  - `HARM_CATEGORY_HARASSMENT`
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`

  Supported thresholds are as follows:
  - `BLOCK_NONE` ([Restricted](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes#how_to_remove_automated_response_blocking_for_select_safety_attributes))
  - `BLOCK_LOW_AND_ABOVE`
  - `BLOCK_MEDIUM_AND_ABOVE` (Default)
  - `BLOCK_ONLY_HIGH`
  - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`

  For more information, refer to the definition of
  [safety
  category](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes#safety_attribute_scoring) and
  [blocking
  threshold](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes#safety-settings).
- `REQUEST_TYPE`: a `STRING` value that specifies the type of inference request to send to the Gemini model. The request type determines what quota the request uses. Valid values are as follows:
  - `DEDICATED`: The `AI.GENERATE_TEXT` function only uses Provisioned Throughput quota. The `AI.GENERATE_TEXT` function returns the error `Provisioned throughput is not purchased or is not active` if Provisioned Throughput quota isn't available.
  - `SHARED`: The `AI.GENERATE_TEXT` function only uses [dynamic shared
    quota (DSQ)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/dynamic-shared-quota), even if you have purchased Provisioned Throughput quota.
  - `UNSPECIFIED`: The `AI.GENERATE_TEXT` function uses quota as follows:
    - If you haven't purchased Provisioned Throughput quota, the `AI.GENERATE_TEXT` function uses DSQ quota.
    - If you have purchased Provisioned Throughput quota, the `AI.GENERATE_TEXT` function uses the Provisioned Throughput quota first. If requests exceed the Provisioned Throughput quota, the overflow traffic uses DSQ quota.

  The default value is `UNSPECIFIED`.
- `MODEL_PARAMS`: a JSON-formatted string literal that provides parameters to the model. The value must conform to the [`generateContent`
  request body](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) format. You can provide a value for any field in the request body except for the `contents[]` field. If you set this field, then you can't also specify any model parameters in the top-level struct argument to the `AI.GENERATE_TEXT` function. You must either specify every model parameter in the `MODEL_PARAMS` field, or omit this field and specify each parameter separately.

##### Details

The model and input table must be in the same region.

#### Claude

```googlesql
AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_K AS top_k]
      [, TOP_P AS top_p]
    }
    |
    [, MODEL_PARAMS AS model_params]
  }
  )
)
```

#### Arguments

`AI.GENERATE_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the remote model over the Gemini Enterprise Agent Platform model. For more information about how to create this type of remote model, see [The
  `CREATE MODEL` statement for remote models over LLMs](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model).

  You can confirm what model is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in the
  model details page.
- `TABLE`: the name of the BigQuery table that contains the prompt data. The text in the column that's named `prompt` is sent to the model. If your table does not have a `prompt` column, use the `QUERY_STATEMENT` argument instead and provide a `SELECT` statement that includes an alias for an existing table column. An error occurs if no `prompt` column is available.
- `QUERY_STATEMENT`: the GoogleSQL query that generates the prompt data. The query must produce a column named `prompt`.

> [!NOTE]
> **Note:** We recommend against using the [`LIMIT
> and OFFSET` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#limit_and_offset_clause) in the prompt query. Using this clause causes the query to process all of the input data first and then apply `LIMIT` and `OFFSET`.

> [!NOTE]
> **Note:** To minimize Agent Platform charges, write query results to a table and then reference that table in the `AI.GENERATE_TEXT` function. This can help you ensure that you are sending as few rows as possible to the model.

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words. This value must be in the range `[1,4096]`. Specify a lower value for shorter responses and a higher value for longer responses. The default is `1024`.
- `TOP_K`: an `INT64` value in the range `[1,40]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. If you don't specify a value, the model determines an appropriate value.

  A `TOP_K` value of `1` means the next selected
  token is the most probable among all tokens in the model's vocabulary, while
  a `TOP_K` value of `3` means that the next token is
  selected from among the three most probable tokens by using the
  `TEMPERATURE` value.

  For each token selection step, the `TOP_K` tokens with the
  highest probabilities are sampled. Then tokens are further filtered based on
  the `TOP_P` value, with the final token selected using
  temperature sampling.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. If you don't specify a value, the model determines an appropriate value.

  Tokens are selected from the most to least probable until the sum of
  their probabilities equals the `TOP_P` value. For example, if
  tokens A, B, and C have a probability of `0.3`, `0.2`,
  and `0.1`, and the `TOP_P` value is `0.5`,
  then the model selects either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C.
- `MODEL_PARAMS`: a JSON-formatted string literal that provides parameters to the model. The value must conform to the [`generateContent`
  request body](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) format. You can provide a value for any field in the request body except for the `contents[]` field. If you set this field, then you can't also specify any model parameters in the top-level struct argument to the `AI.GENERATE_TEXT` function. You must either specify every model parameter in the `MODEL_PARAMS` field, or omit this field and specify each parameter separately.

#### Details

The model and input table must be in the same region.

#### Llama

```googlesql
AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, STOP_SEQUENCES AS stop_sequences]
    |
    }
    [, MODEL_PARAMS AS model_params]
  }
  )
)
```

#### Arguments

`AI.GENERATE_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the remote model over the Gemini Enterprise Agent Platform model. For more information about how to create this type of remote model, see [The
  `CREATE MODEL` statement for remote models over LLMs](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model).

  You can confirm what model is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in the
  model details page.
- `TABLE`: the name of the BigQuery table that contains the prompt data. The text in the column that's named `prompt` is sent to the model. If your table does not have a `prompt` column, use the `QUERY_STATEMENT` argument instead and provide a `SELECT` statement that includes an alias for an existing table column. An error occurs if no `prompt` column is available.
- `QUERY_STATEMENT`: the GoogleSQL query that generates the prompt data. The query must produce a column named `prompt`.

> [!NOTE]
> **Note:** We recommend against using the [`LIMIT
> and OFFSET` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#limit_and_offset_clause) in the prompt query. Using this clause causes the query to process all of the input data first and then apply `LIMIT` and `OFFSET`.

> [!NOTE]
> **Note:** To minimize Agent Platform charges, write query results to a table and then reference that table in the `AI.GENERATE_TEXT` function. This can help you ensure that you are sending as few rows as possible to the model.

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words. This value must be in the range `[1,4096]`. Specify a lower value for shorter responses and a higher value for longer responses. The default is `1024`.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. The default is `0.95`. If you don't specify a value, the model determines an appropriate value.

  Tokens are selected from the most to least probable until the sum of
  their probabilities equals the `TOP_P` value. For example, if
  tokens A, B, and C have a probability of `0.3`, `0.2`,
  and `0.1`, and the `TOP_P` value is `0.5`,
  then the model selects either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C.
- `TEMPERATURE`: a `FLOAT64` value in the range `[0.0,1.0]` that controls the degree of randomness in token selection. Lower `TEMPERATURE` values are good for prompts that require a more deterministic and less open-ended or creative response, while higher `TEMPERATURE` values can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is deterministic, meaning that the highest probability response is always selected. The default is `0`.
- `STOP_SEQUENCES`: an `ARRAY<STRING>` value that removes the specified strings if they are included in responses from the model. Strings are matched exactly, including capitalization. The default is an empty array.
- `MODEL_PARAMS`: a JSON-formatted string literal that provides parameters to the model. The value must conform to the [`generateContent`
  request body](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) format. You can provide a value for any field in the request body except for the `contents[]` field. If you set this field, then you can't also specify any model parameters in the top-level struct argument to the `AI.GENERATE_TEXT` function. You must either specify every model parameter in the `MODEL_PARAMS` field, or omit this field and specify each parameter separately.

#### Details

The model and input table must be in the same region.

#### Mistral AI

```googlesql
AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, STOP_SEQUENCES AS stop_sequences]
    |
    }
    [, MODEL_PARAMS AS model_params]
  }
  )
)
```

#### Arguments

`AI.GENERATE_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the remote model over the Gemini Enterprise Agent Platform model. For more information about how to create this type of remote model, see [The
  `CREATE MODEL` statement for remote models over LLMs](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model).

  You can confirm what model is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in the
  model details page.
- `TABLE`: the name of the BigQuery table that contains the prompt data. The text in the column that's named `prompt` is sent to the model. If your table does not have a `prompt` column, use the `QUERY_STATEMENT` argument instead and provide a `SELECT` statement that includes an alias for an existing table column. An error occurs if no `prompt` column is available.
- `QUERY_STATEMENT`: the GoogleSQL query that generates the prompt data. The query must produce a column named `prompt`.

> [!NOTE]
> **Note:** We recommend against using the [`LIMIT
> and OFFSET` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#limit_and_offset_clause) in the prompt query. Using this clause causes the query to process all of the input data first and then apply `LIMIT` and `OFFSET`.

> [!NOTE]
> **Note:** To minimize Agent Platform charges, write query results to a table and then reference that table in the `AI.GENERATE_TEXT` function. This can help you ensure that you are sending as few rows as possible to the model.

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words. This value must be in the range `[1,4096]`. Specify a lower value for shorter responses and a higher value for longer responses. The default is `1024`.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. The default is `0.95`. If you don't specify a value, the model determines an appropriate value.

  Tokens are selected from the most to least probable until the sum of
  their probabilities equals the `TOP_P` value. For example, if
  tokens A, B, and C have a probability of `0.3`, `0.2`,
  and `0.1`, and the `TOP_P` value is `0.5`,
  then the model selects either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C.
- `TEMPERATURE`: a `FLOAT64` value in the range `[0.0,1.0]` that controls the degree of randomness in token selection. Lower `TEMPERATURE` values are good for prompts that require a more deterministic and less open-ended or creative response, while higher `TEMPERATURE` values can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is deterministic, meaning that the highest probability response is always selected. The default is `0`.
- `STOP_SEQUENCES`: an `ARRAY<STRING>` value that removes the specified strings if they are included in responses from the model. Strings are matched exactly, including capitalization. The default is an empty array.
- `MODEL_PARAMS`: a JSON-formatted string literal that provides parameters to the model. The value must conform to the [`generateContent`
  request body](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) format. You can provide a value for any field in the request body except for the `contents[]` field. If you set this field, then you can't also specify any model parameters in the top-level struct argument to the `AI.GENERATE_TEXT` function. You must either specify every model parameter in the `MODEL_PARAMS` field, or omit this field and specify each parameter separately.

#### Details

The model and input table must be in the same region.

#### Open models

```sql
AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  {
    {
      [MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_K AS top_k]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, USE_CHAT_MODE AS use_chat_mode]
    }
    |
    [, MODEL_PARAMS AS model_params]
  }
  )
)
```

#### Arguments

`AI.GENERATE_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the remote model over the Gemini Enterprise Agent Platform model. For more information about how to create this type of remote model, see [The
  `CREATE MODEL` statement for remote models over LLMs](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model).

  You can confirm what model is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in the
  model details page.
- `TABLE`: the name of the BigQuery table that contains the prompt data. The text in the column that's named `prompt` is sent to the model. If your table does not have a `prompt` column, use the `QUERY_STATEMENT` argument instead and provide a `SELECT` statement that includes an alias for an existing table column. An error occurs if no `prompt` column is available.
- `QUERY_STATEMENT`: the GoogleSQL query that generates the prompt data. The query must produce a column named `prompt`.

> [!NOTE]
> **Note:** We recommend against using the [`LIMIT
> and OFFSET` clause](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#limit_and_offset_clause) in the prompt query. Using this clause causes the query to process all of the input data first and then apply `LIMIT` and `OFFSET`.

> [!NOTE]
> **Note:** To minimize Agent Platform charges, write query results to a table and then reference that table in the `AI.GENERATE_TEXT` function. This can help you ensure that you are sending as few rows as possible to the model.

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words. This value must be in the range `[1,4096]`. Specify a lower value for shorter responses and a higher value for longer responses. If you don't specify a value, the model determines an appropriate value.
- `TOP_K`: an `INT64` value in the range `[1,40]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. If you don't specify a value, the model determines an appropriate value.

  A `TOP_K` value of `1` means the next selected
  token is the most probable among all tokens in the model's vocabulary, while
  a `TOP_K` value of `3` means that the next token is
  selected from among the three most probable tokens by using the
  `TEMPERATURE` value.

  For each token selection step, the `TOP_K` tokens with the
  highest probabilities are sampled. Then tokens are further filtered based on
  the `TOP_P` value, with the final token selected using
  temperature sampling.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. If you don't specify a value, the model determines an appropriate value.

  Tokens are selected from the most to least probable until the sum of
  their probabilities equals the `TOP_P` value. For example, if
  tokens A, B, and C have a probability of `0.3`, `0.2`,
  and `0.1`, and the `TOP_P` value is `0.5`,
  then the model selects either A or B as the next token by using the
  `TEMPERATURE` value and doesn't consider C.
- `TEMPERATURE`: a `FLOAT64` value in the range `[0.0,1.0]` that controls the degree of randomness in token selection. Lower `TEMPERATURE` values are good for prompts that require a more deterministic and less open-ended or creative response, while higher `TEMPERATURE` values can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is deterministic, meaning that the highest probability response is always selected. If you don't specify a value, the model determines an appropriate value.
- `USE_CHAT_MODE`: a `BOOL` value that controls how the function interacts with models that support chat-based interactions.
  - If omitted, the function attempts to use the model's chat mode. If the model endpoint doesn't support chat mode, the function automatically falls back to using a standard non-chat request.
  - If `TRUE`, the function uses chat mode. If the model endpoint doesn't support chat mode, the query fails. This is useful to ensure you are using the intended interaction type.
  - If `FALSE`, the function disables chat mode. You are responsible for constructing the complete prompt, including any necessary formatting or templates expected by the model for non-chat interactions.
- `MODEL_PARAMS`: a JSON-formatted string literal that provides parameters to the model. The value must conform to the [`generateContent`
  request body](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) format. You can provide a value for any field in the request body except for the `contents[]` field. If you set this field, then you can't also specify any model parameters in the top-level struct argument to the `AI.GENERATE_TEXT` function. You must either specify every model parameter in the `MODEL_PARAMS` field, or omit this field and specify each parameter separately.

#### Details

The model and input table must be in the same region.

### Syntax for object tables

Use the following syntax to use `AI.GENERATE_TEXT` with Gemini
models and object table data.

```googlesql
AI.GENERATE_TEXT(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  PROMPT AS prompt
  {
    {
      [, MAX_OUTPUT_TOKENS AS max_output_tokens]
      [, TOP_P AS top_p]
      [, TEMPERATURE AS temperature]
      [, STOP_SEQUENCES AS stop_sequences]
      [, SAFETY_SETTINGS AS safety_settings]
    }
    |
    [, MODEL_PARAMS AS model_params]
  }
  )
)
```

#### Arguments

`AI.GENERATE_TEXT` takes the following arguments:

- `PROJECT_ID`: the project that contains the resource.
- `DATASET`: the dataset that contains the resource.
- `MODEL`: the name of the remote model over the Gemini Enterprise Agent Platform model. For more information about how to create this type of remote model, see [The `CREATE MODEL` statement for remote models over LLMs](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model).

  You can confirm which model is used by the remote model by opening the
  Google Cloud console and looking at the **Remote endpoint** field in the
  model details page.

  Note: Using a remote model based on a Gemini 2.5 model incurs
  charges for the
  [thinking process](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/thinking).
- `TABLE`: the name of the [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction) that contains the content to analyze. For more information on what types of content you can analyze, see [Input](#input).

  The Cloud Storage bucket used by the input object table must be in
  the same project where you have created the model and where you are
  calling the `AI.GENERATE_TEXT` function.
- `QUERY_STATEMENT`: the GoogleSQL query that generates the image data. You can only specify `WHERE` and `ORDER BY` clauses in the query.
- `PROMPT`: a `STRING` value that contains the prompt to use to analyze the visual content. The `prompt` value must contain less than 16,000 tokens. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words.

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. This value must be in the range `[1,8192]`. Specify a lower value for shorter responses and a higher value for longer responses. The default is `1024`.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. The default is `0.95`.

  Tokens are selected from the most to least probable until the sum of
  their probabilities equals the `TOP_P` value. For example, if
  tokens A, B, and C have a probability of `0.3`,
  `0.2`, and `0.1`, and the `TOP_P` value
  is `0.5`, then the model selects either A or B as the next
  token by using the `TEMPERATURE` value and doesn't consider C.
- `TEMPERATURE`: a `FLOAT64` value in the range `[0.0,1.0]` that controls the degree of randomness in token selection. Lower `TEMPERATURE` values are good for prompts that require a more deterministic and less open-ended or creative response, while higher `TEMPERATURE` values can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is deterministic, meaning that the highest probability response is always selected. The default is `0`.
- `STOP_SEQUENCES`: an `ARRAY<STRING>` value that removes the specified strings if they are included in responses from the model. Strings are matched exactly, including capitalization. The default is an empty array.
- `SAFETY_SETTINGS`: an `ARRAY<STRUCT<STRING AS category, STRING AS threshold>>` value that configures content safety thresholds to filter responses. The first element in the struct specifies a harm category, and the second element in the struct specifies a corresponding blocking threshold. The model filters out content that violate these settings. You can only specify each category once. For example, you can't specify both `STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
  'BLOCK_MEDIUM_AND_ABOVE' AS threshold)` and `STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
  'BLOCK_ONLY_HIGH' AS threshold)`. If there is no safety setting for a given category, the `BLOCK_MEDIUM_AND_ABOVE` safety setting is used.

  Supported categories are as follows:
  - `HARM_CATEGORY_HATE_SPEECH`
  - `HARM_CATEGORY_DANGEROUS_CONTENT`
  - `HARM_CATEGORY_HARASSMENT`
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`

  Supported thresholds are as follows:
  - `BLOCK_NONE` ([Restricted](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes#how_to_remove_automated_response_blocking_for_select_safety_attributes))
  - `BLOCK_LOW_AND_ABOVE`
  - `BLOCK_MEDIUM_AND_ABOVE` (Default)
  - `BLOCK_ONLY_HIGH`
  - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`

  For more information, refer to the definition of
  [safety category](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters#harm_categories) and
  [blocking threshold](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters#how-to-configure-content-filters).
- `MODEL_PARAMS`: a JSON-formatted string literal that provides additional parameters to the model. The value must conform to the [`generateContent` request body](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent) format. You can provide a value for any field in the request body except for the `contents[]` field. If you set this field, then you can't also specify any model parameters in the top-level struct argument to the `AI.GENERATE_TEXT` function.

##### Details

The model and input table must be in the same region.

### Output

`AI.GENERATE_TEXT` returns the input table plus the following columns:

#### Gemini API models

- `result`: a `STRING` value that contains the text generated by the model.
- `rai_result`: a `JSON` value that contains the responsible AI result, including safety attributes.
- `grounding_result`: a `JSON` value that contains the result of the grounding check if it's performed.
- `statistics`: a `JSON` value that contains statistics about the generation process, such as token counts.
- `full_response`: a `JSON` value that contains the complete JSON response from the Vertex AI API.
- `status`: a `STRING` value that contains the status of the API call. An empty string indicates success.

#### Claude models

- `result`: a `STRING` value that contains the text generated by the model.
- `full_response`: a `JSON` value that contains the complete JSON response from the Vertex AI API.
- `status`: a `STRING` value that contains the status of the API call. An empty string indicates success.

#### LLama models

- `result`: a `STRING` value that contains the text generated by the model.
- `full_response`: a `JSON` value that contains the complete JSON response from the Vertex AI API.
- `status`: a `STRING` value that contains the status of the API call. An empty string indicates success.

#### Mistral AI models

- `result`: a `STRING` value that contains the text generated by the model.
- `full_response`: a `JSON` value that contains the complete JSON response from the Vertex AI API.
- `status`: a `STRING` value that contains the status of the API call. An empty string indicates success.

#### Open models

- `result`: a `STRING` value that contains the text generated by the model.
- `full_response`: a `JSON` value that contains the complete JSON response from the Vertex AI API.
- `status`: a `STRING` value that contains the status of the API call. An empty string indicates success.

### Examples

#### Text analysis

The following examples assume that you have already created a remote
Gemini model called `mydataset.gemini_model`.

**Example 1**

This example shows a request to a Gemini model that enriches
a table of articles from the `bbc_news` public dataset with a column of
one-sentence summaries.

```googlesql
SELECT result, title, body
FROM
  AI.GENERATE_TEXT(
    MODEL `mydataset.gemini_model`,
    (
      SELECT *,
        ('Summarize the following article in a single sentence: ', body) AS prompt
      FROM `bigquery-public-data.bbc_news.fulltext`
      LIMIT 3));
```

The result looks similar to the following:

```text
/*---------------------------------------+--------------------+------------------------------+
 | result                                | title              | body                         |
 +---------------------------------------+--------------------+------------------------------+
 | Despite UN concerns, a World Bank     | Global digital     | The 'digital divide' between |
 | report indicates that the digital...  | divide 'narrowing' | rich and poor nations...     |
 | ...                                   | ...                | ...                          |
 +---------------------------------------+--------------------+------------------------------*/
```

**Example 2**

This example shows a request a Gemini model
that excludes model responses that contain
the strings `Golf` or `football`.

```googlesql
SELECT *
FROM
  AI.GENERATE_TEXT(
    MODEL
      `mydataset.gemini_model`,
    TABLE `mydataset.prompt_table`,
    STRUCT(
      .15 AS temperature,
      ['Golf', 'football'] AS stop_sequences));
```

**Example 3**

This example shows a request to a Gemini model with the
following characteristics:

- Provides prompt data from a table column that's named `prompt`.
- Retrieves and returns public web data for response grounding.

```googlesql
SELECT *
FROM
  AI.GENERATE_TEXT(
    MODEL
      `mydataset.gemini_model`,
    TABLE `mydataset.prompt_table`,
    STRUCT(
      TRUE AS ground_with_google_search));
```

**Example 4**

This example shows a request to a Gemini model with the
following characteristics:

- Provides prompt data from a table column that's named `prompt`.
- Uses the <var translate="no">`model_params`</var> argument to pass model parameters as a JSON-formatted string.

```googlesql
SELECT *
FROM
  AI.GENERATE_TEXT(
    MODEL
      `mydataset.gemini_model`,
    TABLE `mydataset.prompt_table`,
    STRUCT(
      '''
      {
        "safety_settings": [
          { "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_LOW_AND_ABOVE" },
          { "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
        ],
        "generation_config": {
          "max_output_tokens": 75,
          "thinking_config": {"thinking_budget": 0}
        }
      }
      ''' AS model_params
    )
  );
```

**Example 5**

The following example shows how to extract information from unstructured
text and use the `model_params` argument to specify a custom schema, limit
the maximum number of output tokens to 200, and disable thinking:

Adapted (not in the official docs): the `response_schema` keys and values use double quotes, because `MODEL_PARAMS` must be a JSON-formatted string.

```googlesql
SELECT
  *
FROM
  AI.GENERATE_TEXT(MODEL mydataset.gemini_model,
    (
    SELECT
      'Extract the weather data from this sentence: It is 75 degrees Fahrenheit and sunny in Seattle.' AS prompt
    ),
    STRUCT(
      '''
      {
        "generation_config": {
          "max_output_tokens": 200,
          "thinking_config": {"thinking_budget": 0},
          "response_mime_type": "application/json",
          "response_schema": {"type": "OBJECT", "properties": {"city_name": {"type": "STRING"}, "temperature": {"type": "INTEGER"}}}
        }
      }
      ''' AS model_params
    )
  );
```

**Example 6**

The following example shows how to use the `model_params` argument to
ground with Google Search, specify a maximum number of output tokens, and
disable thinking:

```googlesql
SELECT
  *
FROM
  AI.GENERATE_TEXT(MODEL mydataset.gemini_model,
    (
    SELECT
      'What is the weather in Seattle today?' AS prompt
    ),
    STRUCT(
      '''
      {
        "tools": [{"googleSearch": {}}],
        "generation_config": {
          "max_output_tokens": 100,
          "thinking_config": {"thinking_budget": 0}
        }
      }
      ''' AS model_params
    )
  );
```

**Example 7**

The following example shows you how to use the `model_params` argument to
enable
[context caching](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview),
specify the maximum number of output tokens, and disable thinking:

```googlesql
SELECT
  *
FROM
  AI.GENERATE_TEXT(MODEL mydataset.gemini_model,
    (
    SELECT
      'What is the restaurant name in my context?' AS prompt
    ),
    STRUCT(
      '''
      {
        "cachedContent": "projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHED_CONTENT_ID",
        "generation_config": {
          "max_output_tokens": 200,
          "thinking_config": {"thinking_budget": 0}
        }
      }
      ''' AS model_params
    )
  );
```

#### Visual content analysis

**Example 1**

This example adds product description information to a table by analyzing
the object data in an `ObjectRef` column named `image`:

```googlesql
UPDATE mydataset.products
SET
  image_description = (
    SELECT
      result
    FROM
      AI.GENERATE_TEXT(
        MODEL `mydataset.gemini_model`,
        (
          SELECT
            ('Can you describe the following image?', image) AS prompt
        )
      )
  )
WHERE image IS NOT NULL;
```

**Example 2**

This example analyzes visual content from an object table that's named
`dogs` and identifies the breed of dog contained in the content. The content
returned is filtered by the specified safety settings:

Adapted (not in the official docs): a comma is added between the `TABLE` argument and the `STRUCT` argument.

```googlesql
SELECT
  uri,
  result
FROM
  AI.GENERATE_TEXT(
    MODEL
      `mydataset.dog_identifier_model`,
    TABLE `mydataset.dogs`,
      STRUCT(
        'What is the breed of the dog?' AS PROMPT,
        .01 AS TEMPERATURE,
        [STRUCT('HARM_CATEGORY_HATE_SPEECH' AS category,
          'BLOCK_LOW_AND_ABOVE' AS threshold),
        STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
          'BLOCK_MEDIUM_AND_ABOVE' AS threshold)] AS safety_settings));
```

#### Audio content analysis

This example translates and transcribes audio content from an object table
that's named `feedback`:

```googlesql
SELECT
  uri,
  result
FROM
  AI.GENERATE_TEXT(
    MODEL
      `mydataset.audio_model`,
        TABLE `mydataset.feedback`,
          STRUCT(
          'What is the content of this audio clip, translated into Spanish?' AS PROMPT,
          .01 AS TEMPERATURE));
```

#### PDF content analysis

This example classifies PDF content from an object table
that's named `documents`:

Adapted (not in the official docs): commas are added between the `MODEL`, `TABLE` and `STRUCT` arguments.

```googlesql
SELECT
  uri,
  result
FROM
  AI.GENERATE_TEXT(
    MODEL
      `mydataset.classify_model`,
        TABLE `mydataset.documents`,
          STRUCT(
          'Classify this document using the following categories: legal, tax-related, real estate' AS PROMPT,
          .2 AS TEMPERATURE));
```

### Use Agent Platform Provisioned Throughput

You can use
[Agent Platform Provisioned Throughput](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/overview)
with the `AI.GENERATE_TEXT` function to provide consistent high throughput for
requests. The remote model that you reference in the `AI.GENERATE_TEXT` function
must use a
[supported Gemini model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/supported-models)
in order for you to use Provisioned Throughput.

To use Provisioned Throughput,
[calculate your Provisioned Throughput requirements](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/measure-provisioned-throughput)
and then
[purchase Provisioned Throughput](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/purchase-provisioned-throughput)
quota before running the `AI.GENERATE_TEXT` function. When you purchase
Provisioned Throughput, do the following:

- For **Model** , select the same Gemini model as the one used by the remote model that you reference in the `AI.GENERATE_TEXT` function.
- For **Region** , select the same region as the dataset that contains
  the remote model that you reference in the `AI.GENERATE_TEXT` function, with
  the following exceptions:

  - If the dataset is in the `US` multi-region, select the `us-central1` region.
  - If the dataset is in the `EU` multi-region, select the `europe-west4` region.

After you submit the order, wait for the order to be approved and appear on the
[**Orders**](https://console.cloud.google.com/vertex-ai/provisioned-throughput) page.

After you have purchased Provisioned Throughput quota, use the
`request_type` argument to determine how the `AI.GENERATE_TEXT` function uses
the quota.

### Locations

`AI.GENERATE_TEXT` must run in the same
[region or multi-region](https://docs.cloud.google.com/bigquery/docs/locations) as the remote model that the
function references. See the following topics for more information:

- For Gemini model supported regions, see [Google model endpoint locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#google_model_endpoint_locations). Gemini models are also available in the `US` and `EU` multi-regions.
- For Claude, Llama, and Mistral AI model supported regions, see [Google Cloud partner model endpoint locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#genai-partner-models).

### Quotas and limits

<br />

For quota and limit information, see
[Generative AI functions](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions) in the
BigQuery quotas and limits reference.
For information about managing the cost of this function, see
[Control costs with token quotas](https://docs.cloud.google.com/bigquery/docs/control-genai-costs).

### Known issues

This section contains information about known issues.

<br />

#### Resource exhausted errors

Sometimes after a query job that uses this function finishes successfully,
some returned rows contain the following error message:

```sql
A retryable error occurred: RESOURCE EXHAUSTED error from <remote endpoint>
```

This issue occurs because BigQuery query jobs finish successfully
even if the function fails for some of the rows. The function fails when the
volume of API calls to the remote endpoint exceeds the quota limits for that
service. This issue occurs most often when you are running multiple parallel
batch queries. BigQuery retries these calls, but if the retries
fail, the `resource exhausted` error message is returned.

To iterate through inference calls until all rows are successfully processed,
you can use the
[BigQuery remote inference SQL scripts](https://github.com/GoogleCloudPlatform/bigquery-ml-utils/tree/master/sql_scripts/remote_inference)
or the
[BigQuery remote inference pipeline Dataform package](https://github.com/dataform-co/dataform-bqml).
To try the BigQuery ML remote inference SQL script, see
[Handle quota errors by calling `AI.GENERATE_TEXT` iteratively](https://docs.cloud.google.com/bigquery/docs/iterate-generate-text-calls).

### What's next

- Try [a tutorial on generating text using a public dataset](https://docs.cloud.google.com/bigquery/docs/generate-text-tutorial).
- Get step-by-step instructions on how to [generate text](https://docs.cloud.google.com/bigquery/docs/generate-text) using your own data.
- Get step-by-step instructions on how to tune an LLM and use it to [generate text](https://docs.cloud.google.com/bigquery/docs/tune-evaluate).
- For more information about using Agent Platform models to generate text and embeddings, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- For more information about using Cloud AI APIs to perform AI tasks, see [AI application overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-text (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the visual content analysis example (`mydataset.dogs`) has no comma between the `TABLE` and `STRUCT` arguments of `AI.GENERATE_TEXT`; the comma is added.
- Corrected from the official docs: the document classification example (`mydataset.documents`) has no commas between the `MODEL`, `TABLE` and `STRUCT` arguments of `AI.GENERATE_TEXT`; the commas are added.
- Corrected from the official docs: the structured output example writes `response_schema` with single-quoted keys and values, which is not valid JSON; `MODEL_PARAMS` must be a JSON-formatted string, so double quotes are used.
- Corrected from the official docs (rendering): the page's HTML writes `ARRAY<STRING>` unescaped inside `<code>`, so the rendered page and its Markdown twin show `ARRAY`; the type is restored from the HTML source. (`STOP_SEQUENCES` for object tables)
- Corrected from the official docs (rendering): the page's HTML writes `ARRAY<STRUCT<STRING AS category, STRING AS threshold>>` unescaped inside `<code>`, so the rendered page and its Markdown twin show `ARRAY>`; the type is restored from the HTML source. (`SAFETY_SETTINGS` for object tables)

## Related

- [Index of this directory](./README.md)
