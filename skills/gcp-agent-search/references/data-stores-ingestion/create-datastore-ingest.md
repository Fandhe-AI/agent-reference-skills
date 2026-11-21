---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-datastore-ingest
---

# About Agent Search apps and data stores

Overview of Agent Search (formerly Vertex AI Search) apps and data stores: how apps relate to data stores, what a document is for each data type, document-level CRUD operations, the website / structured / media / unstructured / healthcare data store kinds, and blended search (several data stores on one custom search app). A Google Cloud project can contain multiple apps.

## Signature / Usage

### Create a data store with the API

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/provide-schema. The source page itself has no code block. Replace `INDUSTRY_VERTICAL` with `GENERIC` or `MEDIA`; `DATA_STORE_ID` can contain only lowercase letters, digits, underscores, and hyphens.

Run the command by itself and type `DATA_STORE_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): the request body is built with `jq -n --arg data_store_display_name "$DATA_STORE_DISPLAY_NAME" '{...}'` from the values read by one `IFS= read -r` per placeholder (`DATA_STORE_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"DATA_STORE_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; IFS= read -r DATA_STORE_DISPLAY_NAME &&
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
--data @- )
```

## Notes

- App to data store relationship:
  - Custom search app: Many-to-many. Several data stores on one app is called blended search.
  - Custom recommendations app: One-to-one with its data store.
  - Media app: Many-to-one: an app connects to only one data store, a data store can be connected to several apps (for example a media search app and a media recommendations app share one).
  - Healthcare search app (deprecated): Many-to-one, as for media (for example a patient-facing and a provider-facing app share a data store). Batch import goes into a data store within an app; streaming import (Preview) goes into an entity, a type of data store within a data connector, which is itself a type of data store within an app.
- What a document is:
  - Website: A web page.
  - Structured data: A row in a table or a JSON record that follows a schema (provided by you or derived from the ingested data).
  - Structured data for media: A row or JSON record following a media-specific schema; at minimum title, URI to the content location, categories, duration and available date.
  - Unstructured data: A file in TXT, PDF, HTML, DOCX, PPTX, XLSX, or XLSM format.
  - Healthcare FHIR data: A supported FHIR R4 resource.
- Document CRUD (structured and unstructured data stores):
  - Create: `documents.create`
  - Read: `documents.get`, `documents.list`
  - Update: `documents.patch`; set `allowMissing` to `true` for an upsert (insert if not found)
  - Delete: `documents.delete` (single record instead of deleting the data store)
- Website data store types:
  - Basic website search: Search over the existing Google Search index for the included websites; no domain verification.
  - Advanced website indexing: Index generated from sitemaps you submit, or from an initial index mirroring Google Search that you extend by recrawling; requires domain verification; allows adding structured data (`meta` tags, PageMap attributes, schema.org data) to the schema.
- Blended search limitations:
  - Data stores per search app: Limit of 50.
  - Turning on: Connect at least two data stores during app creation; if you don't select multiple data stores at creation you can't add more later.
  - Add / remove: Allowed, but the app can't have fewer than two data stores at any time. A single data store connected at creation can't be added or removed.
  - Website data stores: Need advanced website indexing turned on.
  - Unstructured data imported using BigQuery: Not supported.
  - Image search: Not supported (`params` field with `searchType: 1`).
  - CMEK: If one data store uses a CMEK configuration, all others must use the same CMEK configuration.
  - Search request fields allowed: `boostSpec`, `contentSearchSpec`, `dataStoreSpecs`, `facetSpecs`, `filter`, `languageCode`, `offset`, `oneBoxPageSize`, `orderBy`, `query`, `pageSize`, `pageToken`, `relevanceScoreSpec`, `relevanceThreshold`, `session`, `sessionSpec`, `spellCorrectionSpec`, `userInfo`, `userPseudoId`
  - `DataStoreSpec` fields allowed: `dataStore`; `boostSpec` and `filter` (if specified in both `SearchRequest` and `dataStoreSpecs`, both are applied)
  - Serving config fields that can be added or updated: `boostControlIds`, `displayName`, `filterControlIds`, `genericConfig` (`contentSearchSpec`), `name`, `solutionType`, `synonymsControlIds`
  - Controls with CRUD support: `boostAction`, `synonymAction`, `filterAction`
- Source inconsistency (disconnecting data stores): the source says "After a data store is connected to an app, it can't be disconnected." Its "About blended search" section says "You can add or remove data stores from a blended search app, but the app can't have fewer than two data stores connected to it at any time." and "If you connect a single data store to a search app during app creation, then you can't add or remove that data store." Both are kept as written; the blended-search sentences give the case in which a data store can be removed (a blended search app that keeps at least two connected data stores).
- A data store can contain only one type of data. Website data created with the API must be attached to an app with Enterprise features enabled in the Google Cloud console.
- Document-level CRUD isn't supported for website data stores: change included / excluded URL patterns, maintain sitemaps, or refresh web pages instead.
- Excluded URL patterns take priority over included ones. Media apps can only connect to media data stores (structured data stores with a Google-defined schema, or a custom schema with five media-related fields); media data stores also hold user events, which are required for media apps.
- Unstructured search returns 10 URLs and summarized answers for natural language queries; documents must be in a Cloud Storage bucket with appropriate access permissions.
- Deprecated: "Agent Search for healthcare is deprecated and won't be available after May 15, 2027." (https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data, retrieved 2026-11-21).
- Try document deletion (`documents.delete`) in a disposable project first. Console and per-type "What's next" links in the source are omitted.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "DATA_STORE_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-datastore-ingest (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/provide-schema (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-data.md](./prepare-data.md)
- [provide-schema.md](./provide-schema.md)
- [parse-chunk-documents.md](./parse-chunk-documents.md)
- [turn-on-advanced-indexing.md](./turn-on-advanced-indexing.md)
