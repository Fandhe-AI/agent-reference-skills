---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/provide-schema
---

# Provide or auto-detect a schema for structured data

How Agent Search (formerly Vertex AI Search) determines the schema of a structured or media data store: auto-detect and edit, or provide a JSON Schema object through the API. Covers the schema property fields (`keyPropertyMapping`, `indexable`, `retrievable`, `searchable`, `dynamicFacetable`, `completable`, `recommendationsFilterable`) and the REST flow that creates a data store with an empty schema and then patches it.

## Signature / Usage

### Example schema as a JSON object

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "dynamic": "true",
  "datetime_detection": true,
  "geolocation_detection": true,
  "properties": {
    "title": {
      "type": "string",
      "keyPropertyMapping": "title",
      "retrievable": true,
      "completable": true
    },
    "description": {
      "type": "string",
      "keyPropertyMapping": "description"
    },
    "categories": {
      "type": "array",
      "items": {
        "type": "string",
        "keyPropertyMapping": "category"
      }
    },
    "uri": {
      "type": "string",
      "keyPropertyMapping": "uri"
    },
    "brand": {
      "type": "string",
      "indexable": true,
      "dynamicFacetable": true
    },
    "location": {
      "type": "geolocation",
      "indexable": true,
      "retrievable": true
    },
    "creationDate": {
      "type": "datetime",
      "indexable": true,
      "retrievable": true
    },
    "isCurrent": {
      "type": "boolean",
      "indexable": true,
      "retrievable": true
    },
    "runtime": {
      "type": "string",
      "keyPropertyMapping": "media_duration"
    },
    "releaseDate": {
      "type": "string",
      "keyPropertyMapping": "media_available_time"
    }
  }
}
```

### Provide your own schema (REST)

Step 1: prepare the schema object. Step 2: create a data store (empty schema).

Run the command by itself and type `DATA_STORE_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): the request body is built with `jq -n --arg data_store_display_name "$DATA_STORE_DISPLAY_NAME" '{...}'` from the values read by one `IFS= read -r` per placeholder (`DATA_STORE_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"DATA_STORE_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero.

```bash
IFS= read -r DATA_STORE_DISPLAY_NAME &&
[ -n "$DATA_STORE_DISPLAY_NAME" ] &&
BODY=$(jq -n --arg data_store_display_name "$DATA_STORE_DISPLAY_NAME" '{
  "displayName": $data_store_display_name,
  "industryVertical": "INDUSTRY_VERTICAL"
}') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores?dataStoreId=DATA_STORE_ID" \
--data @-
```

`INDUSTRY_VERTICAL` is `GENERIC` or `MEDIA`. `DATA_STORE_ID` can contain only lowercase letters, digits, underscores, and hyphens.

Step 3: provide the schema with `schemas.patch`.

Save the schema object (`JSON_SCHEMA_OBJECT`, for example the one below) in a JSON file. Run the command by itself and type the path to that file (`SCHEMA_FILE`) on one line at the prompt; the path is used as typed (`~` is not expanded). `jq` (required) reads the file once, checks that it holds exactly one JSON value and that it is an object, and wraps that same value in `structSchema`; nothing is sent if the path is empty, the file can't be read or parsed, or it does not hold one JSON object. A line that follows the command in the same paste or script is read as the path.

Adapted (not in the official docs): the source pastes `JSON_SCHEMA_OBJECT` into the single-quoted `-d '{...}'` argument. Here the schema is read from the file named by `IFS= read -r SCHEMA_FILE`, checked and wrapped by a single `jq -s -e 'if length == 1 and (.[0] | type) == "object" then {"structSchema": .[0]} else error(...) end'` (the file is read once on standard input with `< "$SCHEMA_FILE"`, so a file named `-` is opened as a file; the body is built from the same value that was checked, and `error` gives a non-zero exit otherwise, so the `&&` chain ends before anything is sent) and sent on standard input with `--data @-`, so an apostrophe in the schema (for example in a description) cannot break the shell quoting; the URL and headers are unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero.

```bash
IFS= read -r SCHEMA_FILE && [ -n "$SCHEMA_FILE" ] &&
BODY=$(jq -s -e 'if length == 1 and (.[0] | type) == "object" then {
  "structSchema": .[0]
} else error("SCHEMA_FILE must hold exactly one JSON object") end' < "$SCHEMA_FILE") &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl --fail-with-body -X PATCH \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/schemas/default_schema" \
--data @-
```

`JSON_SCHEMA_OBJECT` example:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "keyPropertyMapping": "title"
    },
    "categories": {
      "type": "array",
      "items": {
        "type": "string",
        "keyPropertyMapping": "category"
      }
    },
    "uri": {
      "type": "string",
      "keyPropertyMapping": "uri"
    }
  }
}
```

Step 4 (optional): review the schema with "View a schema definition".

## Options / Props

### Schema fields

| Field | Applies to | Description |
|---|---|---|
| `dynamic` | all | `"true"` adds new properties found in imported data to the schema; `"false"` ignores new properties (neither schema nor values imported). Default `"true"`. |
| `datetime_detection` | all | `true`: datetime data (RFC 3339 and ISO 8601, for example `2024-08-05T08:30:00Z`, `2024-08-05`) gets schema type `datetime`; `false`: type `string`. Default `true`. |
| `geolocation_detection` | all | `true`: an object with latitude and longitude numbers, or an object with an address string, gets type `geolocation`; `false`: type `object`. Default `true`. |
| `keyPropertyMapping` | all | Maps a field to a keyword: `title`, `description`, `uri`, `category`, `update_time`, `create_time` (media also `media_duration`, `media_available_time`). Field names need not match. In search data stores such fields are by default indexable and searchable, but not retrievable, completable, or dynamicFacetable. |
| `type` | all | `datetime`, `geolocation`, or `integer`, `boolean`, `object`, `array`, `number`, `string`. |
| `retrievable` | search apps | Field can be returned in a search response; types `number`, `string`, `boolean`, `integer`, `datetime`, `geolocation`; maximum 50 fields; off by default for user-defined and key property fields. |
| `indexable` | search apps | Field can be filtered, faceted, boosted or sorted in `servingConfigs.search`; same types; maximum 50 fields; off by default except fields with `keyPropertyMapping`. |
| `dynamicFacetable` | search apps | Can be a dynamic facet; types `number`, `string`, `boolean`, `integer`; must also be `indexable`. |
| `searchable` | search apps | Reverse indexed to match unstructured text queries; type `string` only; maximum 50 fields; off by default except fields with `keyPropertyMapping`. |
| `completable` | search apps | Can be returned as an autocomplete suggestion; type `string` only. |
| `recommendationsFilterable` | recommendations apps | Can be used in a recommendations filter expression. |

## Notes

- Approaches to providing a schema:
  - Auto-detect and edit: Console flow for structured data; Agent Search samples the first few imported documents and proposes a schema. Map key properties to the important fields.
  - Provide the schema as a JSON object: API flow (curl or program); upload data after creating the schema.
  - Media: Google-defined schema: Data structured as in "About media documents and data store"; auto-detect appends new fields by default.
  - Media: auto-detect and edit: The JSON must include fields mappable to the media key properties `title`, `uri`, `category`, `media_duration`, and `media_available_time`.
  - Media: own schema as JSON object: The schema must include fields mappable to the same five media key properties.
- A schema you provide and later update must be backward compatible with the original, otherwise the update fails. If you don't provide a schema, auto-detect can add newly detected fields on later imports; documents with new fields that are not backward compatible fail to import.
- "Field" and "property" are used interchangeably. For auto-detected schemas, newly detected fields are automatically indexable, searchable, and retrievable, within type requirements and maximum limits.
- Auto-detect does not map key properties; add the mapping manually. Mapping a field to `update_time` (or `create_time` as a fallback) is required for the `document_age` custom ranking signal.
- Put good-quality documents with all key fields at the start of the dataset, since only the first few documents are sampled. Providing your own schema typically improves result quality.
- API versions: the data store is created with `v1` and the schema patched with `v1beta` in the source's steps; the Discovery document for `v1` also has `schemas.patch`, and `structSchema` is a free-form object in both. The source's sample result shows the same PATCH on `v1`.
- Source inconsistencies kept as written: the text names `keyPropertyValues` where the schema field is `keyPropertyMapping`, and `datatime_detection` for `datetime_detection`. The source's separate field-list snippet for `recommendationsFilterable` contains `...` and is omitted.
- The source also includes a sample command with its result and Colab notebook links, which are omitted.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "DATA_STORE_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `schemas.patch` command ends with `-d '{` / `"structSchema": JSON_SCHEMA_OBJECT` / `}'`, so the whole schema is pasted inside single quotes; a schema that contains an apostrophe (valid in JSON strings) ends the shell quoting and the rest is parsed as shell syntax. The example reads the schema from a JSON file with one `jq -s` call that checks that the file holds one JSON object and builds the body from that same value, and sends the body with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/provide-schema (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-data.md](./prepare-data.md)
- [create-datastore-ingest.md](./create-datastore-ingest.md)
