---
source: https://bigquery.googleapis.com/$discovery/rest?version=v2
---

# BigQuery API message schemas (bigquery) (part 3/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigquery/`.

### `ViewDefinition`

- Describes the definition of a logical view.
- Version: v2

### Shape of `ViewDefinition`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "foreignDefinitions": "array<ForeignViewDefinition>",
  "privacyPolicy": "PrivacyPolicy",
  "query": "string",
  "useExplicitColumnNames": "boolean",
  "useLegacySql": "boolean",
  "userDefinedFunctionResources": "array<UserDefinedFunctionResource>"
}
```

### Example `ViewDefinition` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0`, `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests).

```json
{
  "foreignDefinitions": [],
  "privacyPolicy": {},
  "query": "",
  "useExplicitColumnNames": false,
  "useLegacySql": false,
  "userDefinedFunctionResources": []
}
```

## Options / Props

### `ViewDefinition` fields

| Field | Type | Description |
|---|---|---|
| `foreignDefinitions` | `array<ForeignViewDefinition>` | Optional. Foreign view representations. |
| `privacyPolicy` | PrivacyPolicy | Optional. Specifies the privacy policy for the view. |
| `query` | string | Required. A query that BigQuery executes when the view is referenced. |
| `useExplicitColumnNames` | boolean | True if the column names are explicitly specified. For example by using the 'CREATE VIEW v(c1, c2) AS ...' syntax. Can only be set for GoogleSQL views. |
| `useLegacySql` | boolean | Specifies whether to use BigQuery's legacy SQL for this view. The default value is true. If set to false, the view uses BigQuery's GoogleSQL (https://docs.cloud.google.com/bigquery/docs/introduction-sql). Queries and views that reference this view must use the same flag value. A wrapper is used here because the default value is True. |
| `userDefinedFunctionResources` | `array<UserDefinedFunctionResource>` | Describes user-defined function resources used in the query. |

## Notes

- Generated from the Discovery document(s) v2 of `bigquery` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://bigquery.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
