---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-translate
---

# The AI.TRANSLATE function

## Signature / Usage

This document describes the `AI.TRANSLATE` function, which translates text
strings between languages. `AI.TRANSLATE` brings high-quality
[Translation LLM (TLLM)](https://docs.cloud.google.com/translate/docs/translation-llm) capabilities
to your SQL workflows, while also supporting standard
[Neural Machine Translation (NMT)](https://docs.cloud.google.com/translate/docs/advanced/nmt-model)
workloads.

The `AI.TRANSLATE` function uses your [Google Account user credentials](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions)
by default for standard translation tasks, reducing the need for additional
set up steps and authentication.

### Syntax

```googlesql
AI.TRANSLATE(
  content,
  target_language
  [, source_language => source_language]
  [, model => model_name]
  [, return_details => return_details]
)
```

#### Arguments

The `AI.TRANSLATE` function takes the following arguments:

- `content`: a `STRING` value that represents the text to translate. This can be a string literal, column name, or string expression.
- `target_language`: a `STRING` value that specifies a [supported language code](https://docs.cloud.google.com/translate/docs/languages) to translate the text to.
- `source_language`: a `STRING` value that specifies the [language code](https://docs.cloud.google.com/translate/docs/languages) of the original content. If omitted, the underlying API uses automatic language detection.
- `model_name`: a `STRING` value that indicates the backend translation engine. To use the TLLM model, set the value to `translation-llm`. If omitted, the value defaults to `nmt`.
- `return_details`: a `BOOL` value. If set to `TRUE`, the function returns a `STRUCT` with additional details about the translation process, including the translated text, the full response from the Translation API, and any error messages. If omitted, the value defaults to `FALSE`, and only the translated text is returned.

### Output

If `return_details` is set to `FALSE`, the function returns a `STRING` value:

- If the translation succeeds, the value contains the translated text.
- If an error occurs, the value is `NULL`.

If `return_details` is set to `TRUE`, the `AI.TRANSLATE` function returns a
`STRUCT` with the following fields:

- `result`: a `STRING` value that contains the successfully translated text. If an error occurs, then this value is `NULL`.
- `status`: a `STRING` value that contains the top-level execution status. If the operation is successful, the string contains `"OK"`. If there is an error, the string contains the API error message or HTTP code.
- `details`: a `JSON` type that contains one of the following:
  - If the translation succeeds, the Translation API result for that row, including the `translated_text` and `model` fields, and the `detected_language_code` field if the source language was detected automatically.
  - If an error occurs, the error code and reason, for example `{"error": {"code": 3, "reason": "INVALID_ARGUMENT"}}`.

### Examples

The following examples demonstrate how to use the `AI.TRANSLATE` function.

#### Translate with the default model

The following example translates text from an unspecified language to French
using the default NMT model:

```googlesql
SELECT AI.TRANSLATE('Hello, how are you?', 'fr');
```

The output is similar to the following:

```googlesql
"Bonjour, comment allez-vous ?"
```

#### Specify a source language

The following example specifies that the original text is in English:

```googlesql
SELECT AI.TRANSLATE(
  'Hello, how are you?',
  'fr',
  source_language => 'en'
);
```

The output is similar to the following:

```googlesql
"Bonjour, comment allez-vous ?"
```

#### Use a different model

The following example uses the TLLM model to translate the text:

```googlesql
SELECT AI.TRANSLATE(
  'Hello, how are you?',
  'fr',
  model => 'translation-llm'
);
```

The output is similar to the following:

```googlesql
"Bonjour comment allez-vous ?"
```

#### Return translation details

The following example sets `return_details` to `TRUE` to retrieve additional
details about the translation process:

```googlesql
SELECT AI.TRANSLATE(
    'Hello, how are you?',
    'fr',
    return_details => TRUE
  );
```

The output is similar to the following:

```googlesql
{"result":"Bonjour, comment allez-vous ?","status":"OK","details":"..."}
```

### Locations

Where the Cloud Translation API processes your data depends on the location of
your query:

- `US` multi-region: processed in the US.
- `EU` multi-region: processed in the EU.
- All other locations, including single regions such as `us-central1` and `europe-west1`: processed by the Cloud Translation API global endpoint, which doesn't guarantee a processing location.

If you have data processing location requirements, run `AI.TRANSLATE` in the
`US` or `EU` multi-region.

### What's next

- To use this function in a tutorial, see [Translate text with the `AI.TRANSLATE` function](https://docs.cloud.google.com/bigquery/docs/translate-text).
- Learn more about the [`ML.TRANSLATE` function](translate.md).
- Learn how to [process unstructured documents with the `ML.PROCESS_DOCUMENT` function](process-document.md).
- Learn how to [analyze text with the `ML.UNDERSTAND_TEXT` function](understand-text.md).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-translate (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
