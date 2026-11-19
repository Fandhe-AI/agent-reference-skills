---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model
---

# The CREATE MODEL statement for Gemini Enterprise Agent Platform LLMs as MaaS

## Signature / Usage

This document describes the `CREATE MODEL` statement for creating remote models
in BigQuery over LLMs in Gemini Enterprise Agent Platform as a model as a service
(MaaS) by using SQL. When you use MaaS on Agent Platform, you don't
have to provision or manage serving infrastructure for your models. Choose
MaaS for rapid development and prototyping, when you want to minimize
operational overhead.
Agent Platform offers access to
[Google models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models),
[partner models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-partner-models)
and [open models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-maas)
using MaaS. For more information, see
[When to use MaaS](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/open-models/choose-serving-option#when_to_use_maas).

Alternatively, you can use the Google Cloud console user interface to
[create a model by using a UI](https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model-console)
([Preview](https://cloud.google.com/products#product-launch-stages)) instead of constructing the SQL
statement yourself.

After you create the remote model, you can use one of the following functions
to perform generative AI with that model:

- [`AI.GENERATE_TEXT`](ai-generate-text.md)
- [`AI.GENERATE_TABLE`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-table) (only for Gemini models)

### `CREATE MODEL` syntax

```sql
{CREATE MODEL | CREATE MODEL IF NOT EXISTS | CREATE OR REPLACE MODEL}
`project_id.dataset.model_name`
REMOTE WITH CONNECTION {DEFAULT | `project_id.region.connection_id`}
OPTIONS(ENDPOINT = 'vertex_ai_llm_endpoint');
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
ENDPOINT = 'vertex_ai_llm_endpoint'
```

**Description**

The Agent Platform endpoint for the remote model to use. You can
specify the name of the Agent Platform model, for example
`gemini-3.5-flash-lite`, or you can specify the Agent Platform model's
endpoint URL, for example
`https://europe-west6-aiplatform.googleapis.com/v1/projects/myproject/locations/europe-west6/publishers/google/models/gemini-3.5-flash-lite`. If you specify the model name, BigQuery ML
automatically identifies and uses the full endpoint of the
Agent Platform model based on the location of the dataset in which
you create the model.

**Arguments**

A `STRING` value that contains the model name of the target
Agent Platform LLM. The following LLMs are supported:

#### Pretrained Gemini models

All of the
[generally available](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#generally_available_models)
and
[preview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models#preview-gemini-models)
Gemini models are supported.

> [!NOTE]
> **Note:** To provide feedback or request support for the models in preview, send an email to [bqml-feedback@google.com](mailto:bqml-feedback@google.com).

For
[supported Gemini models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#supported_models),
you can specify the
[global endpoint](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#use_the_global_endpoint),
as shown in the following example:

```bash
  https://aiplatform.googleapis.com/v1/projects/test-project/locations/global/publishers/google/models/gemini-2.5-pro
```

Using the global endpoint for your requests can improve overall
availability while reducing resource exhausted (429) errors, which occur
when you exceed your quota for a regional endpoint.
If you want to use Gemini in a region where it isn't
available, you can avoid migrating your data to a different region by
using the global endpoint instead. You can only
use the global endpoint with the `AI.GENERATE_TEXT` function.

> [!NOTE]
> **Note:** Don't use the global endpoint if you have requirements for the data processing location, because when you use the global endpoint, you can't control or know the region where your processing requests are handled.

> [!NOTE]
> **Note:** Using Gemini 2.5 models with any of these functions incurs charges for the [thinking process](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/thinking). With some functions, you can set a budget for the thinking process for Gemini 2.5 Flash and Gemini 2.5 Flash-Lite models. You can't set a budget for Gemini 2.5 Pro models. See the documentation for a given function for details.

BigQuery supports the following models:

- `gemini-4-hydrogen`
- `gemini-4-carbon`
- `gemini-4-argon`
- `gemini-3.8-flash`
- `gemini-3.7-flash`
- `gemini-3.6-flash`
- `gemini-3.5-flash-lite`
- `gemini-3.5-flash`
- `gemini-3.1-flash-lite`

Agent Platform only supports multi-regional endpoints for these models. Regional endpoints aren't supported. If you specify a short endpoint name that omits the region, such as `gemini-3.5-flash`, then BigQuery selects an endpoint according to the following rules:

- If your query is run in the `us` region, or any single region in the US, then BigQuery uses the `us` endpoint.
- If your query is run in the `eu` region, or any single region in the EU other than `europe-west2` or `europe-west6`, then BigQuery uses the `eu` endpoint.
- For all other locations, including `europe-west2` and `europe-west6`, BigQuery uses the `global` endpoint.

To specify a specific endpoint, use a fully qualified multi-regional endpoint name in one of the following formats:

<!-- -->

- `https://aiplatform.us.rep.googleapis.com/v1/projects/PROJECT_ID/locations/us/publishers/google/models/MODEL_ID`
- `https://aiplatform.eu.rep.googleapis.com/v1/projects/PROJECT_ID/locations/eu/publishers/google/models/MODEL_ID`
- `https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID`

If your query runs in the `asia-south1` region, then you must use the fully qualified global endpoint name.

<br />

#### Claude models

The following
[Anthropic Claude models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude)
are supported:

- `claude-opus-4-6`
- `claude-sonnet-4-6`
- `claude-opus-4-5`
- `claude-haiku-4-5`
- `claude-sonnet-4-5`

You must enable Claude models in Gemini Enterprise Agent Platform before you can use
them. For more information, see
[Enable a partner model](https://docs.cloud.google.com/bigquery/docs/generate-text#enable-model).

Although Claude models are multimodal, you can only use text input with
Claude models in BigQuery ML.

After you create a remote model based on a Claude model, you can use the
model with the
[`AI.GENERATE_TEXT` function](ai-generate-text.md)
to generate text based on a prompt you provide in a query or from a column in a
[standard table](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables).

#### Mistral AI models

The following
[Mistral AI models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/mistral)
are supported:

- `mistral-large-2411`
- `mistral-nemo`
- `mistral-small-2503`

Don't use a version suffix with any Mistral AI model.

You must enable Mistral AI models in Gemini Enterprise Agent Platform before you can use
them. For more information, see
[Enable a partner model](https://docs.cloud.google.com/bigquery/docs/generate-text#enable-model).

After you create a remote model based on a Mistral AI model, you can use the
model with the
[`AI.GENERATE_TEXT` function](ai-generate-text.md)
to generate text based on a prompt you provide in a query or from a column in a
[standard table](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables).

#### Open models as MaaS

To create an open model in BigQuery ML, you must specify it as
an [OpenAI API](https://platform.openai.com/docs/api-reference/introduction)
endpoint in the format `openapi/<publisher_name>/<model_name>`.

The following open models are supported:

- Llama 4 Scout 17B-16E, endpoint `openapi/meta/llama-4-scout-17b-16e-instruct-maas`, in `us-east5`
- Llama 4 Maverick 17B-128E, endpoint `openapi/meta/llama-4-maverick-17b-128e-instruct-maas`, in `us-east5`
- OpenAI gpt-oss 120B, endpoint `openapi/openai/gpt-oss-120b-maas`, in `us-central1`

> [!IMPORTANT]
> **Important:** For these open MaaS models, you must create the dataset and connection for the remote model in the same region as the model endpoint.

You must enable Llama models in Gemini Enterprise Agent Platform before you can use
them. For more information, see
[Enable a partner model](https://docs.cloud.google.com/bigquery/docs/generate-text#enable-model).

After you create a remote model, you can use the model with the
[`AI.GENERATE_TEXT` function](ai-generate-text.md)
to generate text based on a prompt you provide in a query or from a column
in a [standard table](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables).

For information that can help you choose between the supported models, see
[Model information](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models).

### Locations

For information about supported locations, see
[Locations for remote models](https://docs.cloud.google.com/bigquery/docs/locations#locations-for-remote-models).

### Examples

The following examples create BigQuery ML remote models.

#### Create a Gemini model that uses the default connection

The following example creates a BigQuery ML remote model over a
Gemini model:

```text
CREATE OR REPLACE MODEL `mydataset.gemini_model`
REMOTE WITH CONNECTION DEFAULT
OPTIONS(ENDPOINT = 'gemini-2.5-pro');
```

#### Create a partner model that uses the default connection

The following example creates a BigQuery ML remote model over a
Mistral AI model:

```text
CREATE OR REPLACE MODEL `mydataset.mistral_model`
REMOTE WITH CONNECTION DEFAULT
OPTIONS(ENDPOINT = 'mistral-large-2411');
```

### What's next

- For more information about using Agent Platform models with BigQuery ML, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- Try [generating text from BigQuery data](https://docs.cloud.google.com/bigquery/docs/generate-text).
- Try [generating structured text from BigQuery data](https://docs.cloud.google.com/bigquery/docs/generate-table).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
