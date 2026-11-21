---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-cloud-storage
---

# Import from Cloud Storage

Creates Gemini Enterprise (formerly Agentspace) data stores from Cloud Storage in two ways: one-time ingestion (GA, console or API) and periodic ingestion (public preview, console only, through a data connector with an entity data store).

## Signature / Usage

### One-time import: create a data store (REST)

Run the command by itself and type `DATA_STORE_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): removed the trailing comma after `"CONTENT_REQUIRED"`, which makes the JSON body invalid. Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`DATA_STORE_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"DATA_STORE_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN DATA_STORE_DISPLAY_NAME BODY; IFS= read -r DATA_STORE_DISPLAY_NAME &&
[ -n "$DATA_STORE_DISPLAY_NAME" ] &&
BODY=$(printf '%s\n' "$DATA_STORE_DISPLAY_NAME" |
jq -Rn '[inputs] as [$data_store_display_name] | {
  "displayName": $data_store_display_name,
  "industryVertical": "GENERIC",
  "solutionTypes": ["SOLUTION_TYPE_SEARCH"],
  "contentConfig": "CONTENT_REQUIRED"
}') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores?dataStoreId=DATA_STORE_ID" \
--data @- )
```

`dataStores.create` returns a long-running operation. Before you import, use the `name` field of that response as `OPERATION_NAME` and poll it as in "Poll an operation (REST)" on the long-running operations page of this skill (`references/agent-search-overview-setup/long-running-operations.md`) until the response shows `"done": true`; go on only if that response has no `error` field.

### One-time import: import documents (REST)

Run the command by itself and type each value on its own line at the prompts, in this order: `INPUT_FILE_PATTERN_1`, `INPUT_FILE_PATTERN_2`, `DATA_SCHEMA` (`document`, `content`, `custom` or `csv`), `ID_FIELD`, `ERROR_DIRECTORY`, `AUTO_GENERATE_IDS` (`true` or `false`); `jq` (required) encodes the first five as JSON strings and sends `AUTO_GENERATE_IDS` as a JSON boolean. `INPUT_FILE_PATTERN_1` must not be empty; an empty `INPUT_FILE_PATTERN_2`, `ID_FIELD`, `ERROR_DIRECTORY` or `AUTO_GENERATE_IDS` line leaves that value out of the request (the source marks `ID_FIELD`, `ERROR_DIRECTORY` and `AUTO_GENERATE_IDS` optional). Nothing is sent if the input ends first, if `INPUT_FILE_PATTERN_1` is empty, if `DATA_SCHEMA` is not one of the four values, if `AUTO_GENERATE_IDS` is not `true`, `false` or empty, if `ID_FIELD` or `AUTO_GENERATE_IDS` is set for `document` or `content`, or if both `ID_FIELD` and `AUTO_GENERATE_IDS` `true` are set. The command sends `"reconciliationMode": "INCREMENTAL"` (upsert). `FULL` "Calculates diff and replaces the entire document dataset. Existing documents may be deleted if they are not present in the source location" (`discoveryengine.v1`): a document outside `inputUris` can be removed even if it is elsewhere in Cloud Storage, so with `FULL` `inputUris` must cover every document to keep; use `INCREMENTAL` for normal additions. A line that follows the command in the same paste or script is read as a value.

Adapted (not in the official docs): `DATA_SCHEMA` is read at a prompt and checked against the four `dataSchema` values of `GcsSource` (`discoveryengine.v1`; `ID_FIELD` and `AUTO_GENERATE_IDS` are refused for `document` and `content`, and `ID_FIELD` with `AUTO_GENERATE_IDS` `true`; see the placeholders below), `"RECONCILIATION_MODE"` is the explicit `"INCREMENTAL"` (its default there), and `AUTO_GENERATE_IDS` is no longer a quoted string because `autoGenerateIds` is a boolean in the Discovery Engine v1 API. Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`INPUT_FILE_PATTERN_1`, `INPUT_FILE_PATTERN_2`, `DATA_SCHEMA`, `ID_FIELD`, `ERROR_DIRECTORY`) and sent on standard input with `--data @-`, instead of putting these Cloud Storage URIs and the field name inside the single-quoted `-d '{...}'` argument, so an apostrophe, double quote or backslash in a value cannot break the shell quoting or the JSON; an empty optional value is removed from `inputUris`, and an empty `ID_FIELD` / `ERROR_DIRECTORY` drops `idField` / `errorConfig`; every other field except `autoGenerateIds`, `dataSchema` and `reconciliationMode` is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. `AUTO_GENERATE_IDS` is read the same way, must be `true`, `false` or empty (`case`), and is passed with `jq --argjson` as a JSON boolean (an empty line becomes `null` and `autoGenerateIds` is left out), so it is never read as part of the jq program. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN INPUT_FILE_PATTERN_1 INPUT_FILE_PATTERN_2 DATA_SCHEMA ID_FIELD ERROR_DIRECTORY AUTO_GENERATE_IDS BODY; IFS= read -r INPUT_FILE_PATTERN_1 && IFS= read -r INPUT_FILE_PATTERN_2 &&
IFS= read -r DATA_SCHEMA && IFS= read -r ID_FIELD && IFS= read -r ERROR_DIRECTORY && IFS= read -r AUTO_GENERATE_IDS &&
[ -n "$INPUT_FILE_PATTERN_1" ] &&
case "$AUTO_GENERATE_IDS" in true|false|"") ;; *) false ;; esac &&
case $DATA_SCHEMA in document|content) [ -z "$ID_FIELD$AUTO_GENERATE_IDS" ] ;; custom|csv) [ "$AUTO_GENERATE_IDS" != true ] || [ -z "$ID_FIELD" ] ;; *) false ;; esac &&
BODY=$(printf '%s\n' "$INPUT_FILE_PATTERN_1" "$INPUT_FILE_PATTERN_2" "$DATA_SCHEMA" "$ID_FIELD" \
  "$ERROR_DIRECTORY" |
jq -Rn --argjson auto_generate_ids "${AUTO_GENERATE_IDS:-null}" '[inputs] as [$input_file_pattern_1, $input_file_pattern_2, $data_schema, $id_field, $error_directory] |
{
  "gcsSource": {
    "inputUris": ([$input_file_pattern_1, $input_file_pattern_2] | map(select(. != ""))),
    "dataSchema": $data_schema
  },
  "reconciliationMode": "INCREMENTAL",
  "autoGenerateIds": $auto_generate_ids,
  "idField": $id_field,
  "errorConfig": {
    "gcsPrefix": $error_directory
  }
} | if $id_field == "" then del(.idField) else . end
  | if $error_directory == "" then del(.errorConfig) else . end
  | if $auto_generate_ids == null then del(.autoGenerateIds) else . end') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/branches/0/documents:import" \
--data @- )
```

### Before you begin: source bucket in a different project

To import data from a source Google Cloud project that's different from the project with the Gemini Enterprise data store, grant these IAM roles to the `service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com` service account, where `PROJECT_NUMBER` is the project that contains the data store:

- Storage Object Viewer (`roles/storage.objectViewer`) on the input bucket (the bucket you choose with **Browse** or name in `INPUT_FILE_PATTERN_1` / `INPUT_FILE_PATTERN_2`).
- Only if you set `ERROR_DIRECTORY` (the source recommends leaving it empty so that Gemini Enterprise creates a temporary directory): Storage Object Admin (`roles/storage.objectAdmin`) on the bucket of `ERROR_DIRECTORY`.

### Request placeholders

- `PROJECT_ID`: the ID of your project.
- `DATA_STORE_ID`: the ID of the data store (to create: only lowercase letters, digits, underscores, and hyphens).
- `DATA_STORE_DISPLAY_NAME`: the display name of the data store that you want to create.
- `INPUT_FILE_PATTERN`: a file pattern in Cloud Storage containing your documents. For structured data or unstructured data with metadata, for example `gs://<your-gcs-bucket>/directory/object.json`, or `gs://<your-gcs-bucket>/directory/*.json` to match one or more files; for unstructured documents, for example `gs://<your-gcs-bucket>/directory/*.pdf`. Each file matched by the pattern becomes a document.
- `DATA_SCHEMA`: `document`, `custom`, `csv` or `content`; the API default is `document`, but the command asks for one.
  - `document`: unstructured data with metadata. Each line of the file follows `{ "id": "<your-id>", "jsonData": "<JSON string>", "content": { "mimeType": "<application/pdf or text/html>", "uri": "gs://<your-gcs-bucket>/directory/filename.pdf" } }` or the same with `"structData": <JSON object>` instead of `jsonData`.
  - `custom`: JSON for structured documents, organized according to a schema that you specify or that is auto-detected; with the document JSON in a consistent format directly in each line, IDs are generated automatically.
  - `content`: unstructured documents (PDF, HTML, DOC, TXT, PPTX). The ID of each document is automatically generated as the first 128 bits of SHA256(GCS_URI) encoded as a hex string. Multiple input file patterns are allowed as long as the matched files don't exceed the 100K files limit.
  - `csv`: a CSV file with a header row, each header mapped to a document field; give the path to the CSV file in `inputUris`.
- `ERROR_DIRECTORY`: optional; a Cloud Storage directory for error information about the import, for example `gs://<your-gcs-bucket>/directory/import_errors`. Google recommends leaving it empty so Gemini Enterprise automatically creates a temporary directory.
- `RECONCILIATION_MODE`: optional; `FULL` or `INCREMENTAL`, default `INCREMENTAL`. `INCREMENTAL` does an upsert (adds new documents and replaces existing documents with updated documents with the same ID). `FULL` causes a full rebase: new and updated documents are added, and documents that are not in Cloud Storage are removed from the data store; it is helpful to automatically delete documents you no longer need.
- `AUTO_GENERATE_IDS`: optional; whether to automatically generate document IDs. If `true`, IDs are generated from a hash of the payload; generated IDs might not remain consistent over multiple imports, so with auto-generated IDs over multiple imports Google highly recommends `reconciliationMode` `FULL`. Specify `autoGenerateIds` only when `gcsSource.dataSchema` is `custom` or `csv`, otherwise an `INVALID_ARGUMENT` error is returned. For `custom` or `csv` without it (or with `false`), IDs come from `idField`; `document` takes each line's `id` and `content` the SHA256 of the URI.
- `ID_FIELD`: optional (`custom` or `csv` only; the `discoveryengine.v1` default is `_id`); the name of the JSON field that holds the document IDs (for example, if `{"my_id":"some_uuid"}` is the ID field, specify `"idField":"my_id"`). Specify it only when `gcsSource.dataSchema` is `custom` or `csv` and `auto_generate_ids` is `false` or unspecified, otherwise an `INVALID_ARGUMENT` error is returned. The field must be of string type, between 1 and 63 characters, and conform to RFC-1034, otherwise the documents fail to import.

## Options / Props

### One-time versus periodic ingestion

| One-time ingestion | Periodic ingestion |
|---|---|
| Generally available (GA). | Public preview. |
| Data must be refreshed manually. | Data updates automatically every one, three, or five days. Data cannot be manually refreshed. |
| Gemini Enterprise creates a single data store from one folder or file in Cloud Storage. | Gemini Enterprise creates a *data connector*, and associates a data store (called an *entity* data store) with it for the file or folder that is specified. Each Cloud Storage data connector can have a single entity data store. |
| Data from multiple files, folders, and buckets can be combined in one data store by first ingesting data from one Cloud Storage location and then more data from another location. | Because manual data import is not supported, the data in an entity data store can only be sourced from one Cloud Storage file or folder. |
| Data source access control is supported. | Data source access control is not supported. The imported data can contain access controls but these controls won't be respected. |
| You can create a data store using either the Google Cloud console or the API. | You must use the console to create data connectors and their entity data stores. |
| CMEK-compliant. | CMEK-compliant. |

## Notes

- Periodic ingestion: after creation, the first sync occurs about an hour after the data connector is created; the next sync then occurs around 24 hours, 72 hours, or 120 hours later. The entity data store is named `gcs_store`. Sync frequency options: daily, every three days, or every five days.
- Data import is recursive: files within folders in the specified bucket or folder are imported.
- Caution: Cloud Storage permissions aren't imported with the data. After import, any user with sufficient Gemini Enterprise permissions can view the data, even without permission to view it in Cloud Storage.
- If `<your-gcs-bucket>` is not under `PROJECT_ID`, give the service account `service-<project number>@gcp-sa-discoveryengine.iam.gserviceaccount.com` "Storage Object Viewer" permissions for the bucket (for example source project "123", destination project "456": grant `service-456@gcp-sa-discoveryengine.iam.gserviceaccount.com` on the bucket under project "123").
- Ingestion can take several minutes or several hours; status moves from **In progress** to **Import completed** (one-time) or **succeeded** on the **Data ingestion activity** tab (periodic).
- Optional: OCR parser and layout parser can incur additional costs (Document AI feature pricing). Configure parsing / chunking with the `documentProcessingConfig` object in the data store creation request; an OCR parser for PDFs is recommended for scanned PDFs.
- To specify your own schema for structured data, provide it first as a JSON object and then start the REST procedure at the import step (after the `schemas.patch` operation shows `"done": true` without `error`).
- The source also shows the Console steps.
- Corrected from the official docs: the example `curl` bodies ended with `"CONTENT_REQUIRED",` and `"dataSchema": "DATA_SCHEMA",` before the closing brace (trailing commas removed), and `"autoGenerateIds": "AUTO_GENERATE_IDS"` is sent as a JSON boolean instead of a string (`autoGenerateIds` is `"type": "boolean"` in `GoogleCloudDiscoveryengineV1ImportDocumentsRequest` of the `discoveryengine` `v1` Discovery document).
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "DATA_STORE_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's import command writes `"inputUris": ["INPUT_FILE_PATTERN_1", "INPUT_FILE_PATTERN_2"],`, `"idField": "ID_FIELD",` and `"gcsPrefix": "ERROR_DIRECTORY"` inside the single-quoted `curl -d '{...}'` body. A Cloud Storage object name or field name with an apostrophe ends the shell quoting, and `"` or `\` breaks the JSON, so the values are read with `IFS= read -r`, passed to `jq -Rn` on standard input by the `printf` builtin (not as arguments) and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Adapted from the official docs: the source goes from `dataStores.create` straight to `documents:import`. `dataStores.create` returns `GoogleLongrunningOperation` in the `discoveryengine.v1` Discovery document, whose `done` field reads "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available." The step above adds the wait for `done: true` without `error`.
- Adapted from the official docs: the source grants both `roles/storage.objectAdmin` and `roles/storage.objectViewer` "in the project that contains the Gemini Enterprise data store", while its import step asks only for "Storage Object Viewer" permissions on the bucket. The page grants `roles/storage.objectViewer` on the input bucket and keeps `roles/storage.objectAdmin` (the source's only write role) for the error-output bucket. The source doesn't say which permissions writing to `ERROR_DIRECTORY` needs; `roles/storage.objectCreator` ("Allows users to create objects. Does not give permission to view, delete, or overwrite objects", https://docs.cloud.google.com/iam/docs/roles-permissions/storage) is narrower but not confirmed for the import.
- Corrected from the official docs: the source says that without `autoGenerateIds` (or with `false`) "you must specify `idField`"; `ImportDocumentsRequest.idField` (`discoveryengine.v1`) says "If it is unset, a default value `_id` is used" and allows it only for `custom` or `csv`.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-cloud-storage (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: in the import command, `AUTO_GENERATE_IDS` is read at a prompt, checked to be `true`, `false` or empty (left out) and passed to `jq` with `--argjson`, so the value is not written into the `jq` program (`autoGenerateIds` is a `boolean` in the `discoveryengine.v1` Discovery document).
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [prepare-data.md](./prepare-data.md)
- [create-data-store.md](./create-data-store.md)
- [connect-bigquery.md](./connect-bigquery.md)
