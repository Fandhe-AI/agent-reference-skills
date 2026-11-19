---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-table
---

# The AI.GENERATE_TABLE function

## Signature / Usage

This document describes the `AI.GENERATE_TABLE` function, which lets you perform
generative natural language tasks by using any combination of text and
unstructured data from BigQuery
[standard tables](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables), and also
specify a schema to format the response from the model.

The function works by sending requests to a BigQuery ML remote model
that represents a Gemini Enterprise Agent Platform Gemini model, and then returning
that model's response. The function supports remote models over any of the
[generally available](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#generally_available_models)
or
[preview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#preview_models)
Gemini models.

Several of the `AI.GENERATE_TABLE` function's arguments provide the
parameters that shape the Agent Platform model's response.

You can use the `AI.GENERATE_TABLE` function to perform tasks such as
classification, sentiment analysis, image captioning, and transcription.

Prompt design can strongly affect the responses returned by the
Agent Platform model. For more information, see
[Introduction to prompting](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).

### Input

Using the `AI.GENERATE_TABLE` function, you can use the following types
of input:

- Text data from standard tables.
- [`ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref). You can create an `ObjectRef` value by passing a Cloud Storage URI to the [`OBJ.MAKE_REF` function](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objmake_ref) or using an `ObjectRef` column from a table.

When you analyze unstructured data, that data must meet the following
requirements:

- Content must be in one of the supported formats that are described in the Gemini API model [`mimeType` parameter](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini#parameters).
- If you are analyzing a video, the maximum supported length is two minutes. If the video is longer than two minutes, `AI.GENERATE_TABLE` only returns results for the first two minutes.

### Syntax

```googlesql
AI.GENERATE_TABLE(
MODEL `PROJECT_ID.DATASET.MODEL`,
{ TABLE `PROJECT_ID.DATASET.TABLE` | (QUERY_STATEMENT) },
STRUCT(
  OUTPUT_SCHEMA AS output_schema
  [, MAX_OUTPUT_TOKENS AS max_output_tokens]
  [, TOP_P AS top_p]
  [, TEMPERATURE AS temperature]
  [, STOP_SEQUENCES AS stop_sequences]
  [, SAFETY_SETTINGS AS safety_settings]
  [, REQUEST_TYPE AS request_type])
)
```

#### Arguments

`AI.GENERATE_TABLE` takes the following arguments:

- `PROJECT_ID`: the project that contains the
  resource.

- `DATASET`: the dataset that contains the
  resource.

- `MODEL`: the name of the remote model. For more
  information, see
  [The `CREATE MODEL` statement for remote models over LLMs](create-remote-model.md).

  > [!NOTE]
  > **Note:** Using a remote model based on a Gemini 2.5 model incurs charges for the [thinking process](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/thinking).

- `TABLE`: the name of the BigQuery table
  that contains the prompt data. The text in the column that's named `prompt` is
  sent to the model. If your table does not have a `prompt` column, use the
  `QUERY_STATEMENT` argument instead and provide a `SELECT` statement that
  includes an alias for an existing table column. An error occurs if no `prompt`
  column is available.

<!-- -->

- `QUERY_STATEMENT`: the GoogleSQL query that generates the prompt data. The query must produce a column named `prompt`. Within the query, you can provide the prompt value in the following ways:
  - Specify a `STRING` value. For example, `'This is a prompt.'`
  - Specify a `STRUCT` value that contains one or more fields. You can use the following types of fields within the `STRUCT` value:

    | Field type | Description | Examples |
    |---|---|---|
    | `STRING` or `ARRAY<STRING>` | A string literal, array of string literals, or the name of a `STRING` column. | String literal: ` 'This is a prompt.'` String column name: `my_string_column` |
    | `ObjectRef` or `ARRAY<ObjectRef>` | An [`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) literal, array of `ObjectRef` literals, or the name of an `ObjectRef` column. Your input can contain at most one video object. | `OBJ.MAKE_REF('gs://my_image.jpg')` |

    The function combines `STRUCT` fields similarly to a [`CONCAT`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#concat) operation and concatenates the fields in their specified order. The same is true for the elements of any arrays used within the struct. The following table shows some examples of `STRUCT` prompt values and how they are interpreted:

    | Struct field types | Struct value | Semantic equivalent |
    |---|---|---|
    | `STRUCT<STRING, STRING, STRING>` | ` ('Describe the city of ', my_city_column, ' in 15 words')` | 'Describe the city of <var translate="no">my_city_column_value</var> in 15 words' |
    | `STRUCT<STRING, ObjectRef>` | `('Describe the following city', image_objectref_column)` | 'Describe the following city <var translate="no">image</var>' |

    > [!NOTE]
    > **Note:** To minimize Agent Platform charges, write query results to a table and then reference that table in the `AI.GENERATE_TABLE` function. This can help you ensure that you are sending as few rows as possible to the model.

<!-- -->

- `OUTPUT_SCHEMA`: a `STRING` value that specifies the
  schema of the output as a comma-separated list of fields. Each field consists
  of a name, a data type, an optional `NOT NULL` specification, and an optional
  `OPTIONS` clause in which you can specify a description of the field or an
  allowable set of enum values. When a
  field is missing from the input data, the output field might be `NULL`. To
  ensure that a field always contains a value for missing data,
  such as `unknown` or an inferred value, specify `NOT NULL`.

  The following example shows how to specify an output schema that contains
  two string fields, `name` and `state`. The `name` field is never `NULL` and
  the `state` field has a description and set of allowable enum values. Since
  `enum` is a reserved keyword, it must be enclosed in backticks.

  Adapted (not in the official docs): the field is written `name STRING NOT NULL` (name, type, then `NOT NULL`, as the argument description says).

  ```text
  '''
  name STRING NOT NULL,
  state STRING OPTIONS(
    description = 'The 2-letter abbreviation of the state name',
    `enum` = ['CA', 'NY', 'WA'])
  ''' AS output_schema
  ```

  Supported data types include `STRING`, `INT64`, `FLOAT64`, `BOOL`, `ARRAY`,
  and `STRUCT`. For a `STRUCT` data type, you can specify the `OPTIONS` clause
  on any of its subfields:

  ```text
  '''
  location STRUCT<city STRING,
  state STRING OPTIONS(description = 'The 2-letter abbreviation of the state name')>
  ''' AS output_schema
  ```

##### Show additional optional parameters

- `MAX_OUTPUT_TOKENS`: an `INT64` value that sets the maximum number of tokens that can be generated in the response. A token might be smaller than a word and is approximately four characters. One hundred tokens correspond to approximately 60-80 words.This value must be in the range `[1,8192]`. Specify a lower value for shorter responses and a higher value for longer responses. If you don't specify a value, the model determines an appropriate value.
- `TOP_P`: a `FLOAT64` value in the range `[0.0,1.0]` that changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses. If you don't specify a value, the model determines an appropriate value.

  Tokens are selected from the most to least
  probable until the sum of their probabilities equals the `TOP_P` value.
  For example, if tokens A, B, and C have a probability of `0.3`, `0.2`, and
  `0.1`, and the `TOP_P` value is `0.5`, then the model selects either A or
  B as the next token by using the `TEMPERATURE` value and doesn't
  consider C.
- `TEMPERATURE`: a `FLOAT64` value in the range `[0.0,2.0]` that controls the degree of randomness in token selection. Lower `TEMPERATURE` values are good for prompts that require a more deterministic and less open-ended or creative response, while higher `TEMPERATURE` values can lead to more diverse or creative results. A `TEMPERATURE` value of `0` is deterministic, meaning that the highest probability response is always selected. If you don't specify a value, the model determines an appropriate value.
- `STOP_SEQUENCES`: an `ARRAY<STRING>` value that removes the specified strings if they are included in responses from the model. Strings are matched exactly, including capitalization. The default is an empty array.
- `SAFETY_SETTINGS`: an `ARRAY<STRUCT<STRING AS category,
  STRING AS threshold>>` value that configures content safety thresholds to filter responses. The first element in the struct specifies a harm category, and the second element in the struct specifies a corresponding blocking threshold. The model filters out content that violate these settings. You can only specify each category once. For example, you can't specify both `STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category,
  'BLOCK_MEDIUM_AND_ABOVE' AS threshold)` and `STRUCT('HARM_CATEGORY_DANGEROUS_CONTENT' AS category, 'BLOCK_ONLY_HIGH' AS
  threshold)`. If there is no safety setting for a given category, the `BLOCK_MEDIUM_AND_ABOVE` safety setting is used.

  Supported categories are as follows:
  - `HARM_CATEGORY_HATE_SPEECH`
  - `HARM_CATEGORY_DANGEROUS_CONTENT`
  - `HARM_CATEGORY_HARASSMENT`
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`

  Supported thresholds are as follows:
  - `BLOCK_NONE` ([Restricted](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters#how_to_configure_content_filters))
  - `BLOCK_LOW_AND_ABOVE`
  - `BLOCK_MEDIUM_AND_ABOVE` (Default)
  - `BLOCK_ONLY_HIGH`
  - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`

  For more information, see
  [Harm categories](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters#harm_categories)
  and
  [How to configure content filters](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters#how-to-configure-content-filters).
- `REQUEST_TYPE`: a `STRING` value that specifies the type of inference request to send to the Gemini model. The request type determines what quota the request uses. Valid values are as follows:
  - `DEDICATED`: The `AI.GENERATE_TABLE` function only uses Provisioned Throughput quota. The `AI.GENERATE_TABLE` function returns the error `Provisioned throughput is not purchased or is not
    active` if Provisioned Throughput quota isn't available.
  - `SHARED`: The `AI.GENERATE_TABLE` function only uses [dynamic shared quota (DSQ)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/dynamic-shared-quota), even if you have purchased Provisioned Throughput quota.
  - `UNSPECIFIED`: The `AI.GENERATE_TABLE` function uses quota as follows:
    - If you haven't purchased Provisioned Throughput quota, the `AI.GENERATE_TABLE` function uses DSQ quota.
    - If you have purchased Provisioned Throughput quota, the `AI.GENERATE_TABLE` function uses the Provisioned Throughput quota first. If requests exceed the Provisioned Throughput quota, the overflow traffic uses DSQ quota.

  The default value is `UNSPECIFIED`.

### Examples

The following examples demonstrate how to use `AI.GENERATE_TABLE`.

#### Format text input

The following example shows a request that
provides a SQL schema to format the model's response. It specifies a description
in the `OPTIONS` clause for the `weight` field to indicate that the result
should be given in kilograms.

```googlesql
SELECT
  address,
  age,
  is_married,
  name,
  phone_number,
  weight
FROM
AI.GENERATE_TABLE( MODEL `mydataset.gemini_model`,
  (
      SELECT
        '''John Smith is a 20-year old single man living at 1234 NW 45th St, Kirkland WA, 98033.
        He has two phone numbers 123-123-1234, and 234-234-2345. He is 200.5 pounds.''' AS prompt
  ),
  STRUCT('''address STRING, age INT64, is_married BOOL, name STRING, phone_number ARRAY<STRING>,
            weight FLOAT64 OPTIONS(description = "in kilograms")''' AS output_schema,
          8192 AS max_output_tokens));
```

The results look similar to the following:

```text
+-------------------------------------+-----+------------+------------+---------------+-----------+
| address                             | age | is_married | name       | phone_number  | weight    |
+-------------------------------------+-----+------------+------------+---------------+-----------+
| 1234 NW 45th St, Kirkland WA, 98033 | 20  | No         | John Smith | 123-123-1234  | 90.947236 |
|                                     |     |            |            | 234-234-2345  |           |
|                                     |     |            |            |               |           |
+-------------------------------------+-----+------------+------------+---------------+-----------+
```

#### Create a column based on image data

The following example shows how to create and populate an
`image_description` column by analyzing a product image that is stored as
an `ObjectRef` value in a standard table:

```googlesql
CREATE OR REPLACE TABLE
  `mydataset.products`
AS
  SELECT
  *
FROM
AI.GENERATE_TABLE( MODEL `mydataset.gemini`,
  (
  SELECT
    ('Can you describe the following image?',
      ref) AS prompt,
    *
  FROM
   `mydataset.products` ),
  STRUCT ( "image_description STRING" AS output_schema ));
```

### Details

The model and input table must be in the same region.

### Output

`AI.GENERATE_TABLE` returns the following columns:

- All columns in the input table.

- All columns specified in the `output_schema` argument.

- `full_response`: this is the
  [JSON response](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/GenerateContentResponse)
  from the
  [`projects.locations.endpoints.generateContent`](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.endpoints/generateContent)
  call to the model. The generated data is in the `text` element.

- `status`: a `STRING` value that contains the API response
  status for the corresponding row. This value is empty if the operation was
  successful.

### Locations

`AI.GENERATE_TABLE` must run in the same
[region or multi-region](https://docs.cloud.google.com/bigquery/docs/locations) as the remote model that the
function references.

You can create remote models over Gemini models in the
[supported regions](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#available-regions)
for the given Gemini model, and also in the `US` and `EU` multi-regions.

### Quotas and limits

See [Vertex AI and Cloud AI service functions quotas and limits](https://docs.cloud.google.com/bigquery/quotas#cloud_ai_service_functions).

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

### What's next

- Get step-by-step instructions on how to [generate structured data](https://docs.cloud.google.com/bigquery/docs/generate-table) using your own data.
- For more information about using Agent Platform models to generate text and embeddings, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- For more information about using Cloud AI APIs to perform AI tasks, see [AI application overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).
- For more information about supported SQL statements and functions for generative AI models, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-table (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the output schema example writes `name NOT NULL STRING`; the argument description gives the order name, data type, optional `NOT NULL`, so the example uses `name STRING NOT NULL`.
- Corrected from the official docs: the output section refers to the `output_response` argument, which the syntax and argument list don't define; the argument is `output_schema`.

## Related

- [Index of this directory](./README.md)
