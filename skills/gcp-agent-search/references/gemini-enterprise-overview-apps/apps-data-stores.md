---
source: https://docs.cloud.google.com/gemini/enterprise/docs/apps-data-stores
---

# Gemini Enterprise apps and data stores

Explains how a Gemini Enterprise (formerly Agentspace) app connects to data stores (many-to-many), the kinds of data stores, documents, and the limits of blended search (several data stores on one app).

## Signature / Usage

### An app (engine) connected to data stores

The source page has no code block. This is the `engines.create` request from the create-app page of this category, which connects an app to data stores through `dataStoreIds` (to change the connected data stores later, see `engines.patch` in Notes).

Run the command by itself and type `APP_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`APP_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"APP_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN APP_DISPLAY_NAME BODY; IFS= read -r APP_DISPLAY_NAME &&
[ -n "$APP_DISPLAY_NAME" ] &&
BODY=$(printf '%s\n' "$APP_DISPLAY_NAME" |
jq -Rn '[inputs] as [$app_display_name] | {
  "displayName": $app_display_name,
  "dataStoreIds": ["DATA_STORE_ENTITY_ID_1", "DATA_STORE_ENTITY_ID_2", "DATA_STORE_ENTITY_ID_3"],
  "solutionType": "SOLUTION_TYPE_SEARCH",
  "industryVertical": "GENERIC",
  "appType": "APP_TYPE_INTRANET"
}') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines?engineId=APP_ID" \
--data @- )
```

### Key terms

- App: provides search results, actions and agents to end users. The term app can be used interchangeably with engine in the context of APIs.
- Data store: contains the data ingested from a first-party data source such as Cloud Storage or third-party applications such as Jira or Salesforce. Data stores that contain data from third-party applications are also called data connectors.
- Documents: each data store has one or more data records, called documents. For third-party data sources a document is an entity specific to the source (such as a Jira issue or Confluence space); for structured data, a row in a table or a JSON record that follows a schema (provided by you or derived from the ingested data); for unstructured data, a file in HTML, PDF with embedded text, or TXT format (PPTX and DOCX are available in Preview).

### Kinds of data stores (a data store can contain only one type of data)

- Structured data for third-party data stores: connectors available in Preview with allowlist: Confluence, Jira, Salesforce, Sharepoint Online, Slack. Data from these third parties is considered structured data. When you set up a connector you select a synchronization frequency and the entities to sync (such as issues for Jira, content and spaces for Confluence); a unique data store is created for each entity, and entity data stores are grouped by connector instance.
- Structured data: semantic search or recommendations over structured data (for example a product catalog or a directory of doctors). Import from BigQuery or Cloud Storage, or manually upload structured JSON data through the API. The schema is auto-detected from the imported data; optionally provide a schema, which typically improves the quality of results.
- Unstructured data: semantic search or recommendations over documents and images: HTML, PDF with embedded text and TXT; PPTX and DOCX in Preview. Search provides results in the form of 10 URLs and summarized answers for natural language queries. Documents must be uploaded to a Cloud Storage bucket with appropriate access permissions.

### Blended search limitations (several data stores on one app)

- Data stores that contain unstructured data imported using BigQuery are not supported.
- Fields allowed in search requests: `boostSpec`, `contentSearchSpec`, `dataStoreSpecs`, `facetSpecs`, `filter`, `languageCode`, `offset`, `oneBoxPageSize`, `orderBy`, `query`, `pageSize`, `pageToken`, `relevanceScoreSpec`, `relevanceThreshold`, `session`, `sessionSpec`, `spellCorrectionSpec`, `userInfo`, `userPseudoId`.
- Fields allowed in `dataStoreSpecs`: `dataStore`; `boostSpec` (if boost specs are specified for both `SearchRequest` and `dataStoreSpecs`, both are applied to search results); `filter` (if filters are specified for both, both are applied).
- CRUD operations on serving configs are supported for blended apps; only these fields can be added or updated in a serving config: `boostControlIds`, `displayName`, `filterControlIds`, `genericConfig` (`contentSearchSpec`), `name`, `solutionType`, `synonymsControlIds`.
- CRUD operations on these controls are supported for blended search apps: `boostAction`, `synonymsAction`, `filterAction`.
- If one data store uses a CMEK configuration, all other data stores must also use the same CMEK configuration.

## Notes

- Method of creation: for third-party data you use the Google Cloud console, not the API, to create your app and ingest data; for other data you can use the console or the API.
- You can't connect website data stores to Gemini Enterprise search and assistant apps.
- Blended search is rate-limited in the Gemini Enterprise Standard and Gemini Enterprise Frontline editions. Unlimited and enhanced blended search requires the Gemini Enterprise Plus edition.
- Changing connected data stores with `engines.patch`: an app connected to a single data store can't add or remove data stores, and can't replace its data store, through the API (error `Engines with a single data store cannot add or remove data stores`). An app with multiple data stores must keep at least two connected (error `Engines with multiple data stores can not remove data stores such that <2 data stores remain linked`); the same error is returned when connecting the first data store to an app that has none. Use the Google Cloud console, which can convert an app between single-data-store and multi-data-store configurations.
- When getting search results you can search across all data stores or filter to a single data store.
- Corrected from the official docs: the source lists the control `synonymAction`, while the `discoveryengine` Discovery documents (`v1`, `v1beta`, `v1alpha`) name the Control field `synonymsAction` (and the serving config field `synonymsControlIds`); no `synonymAction` field exists there. The list above uses `synonymsAction`.
- Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/create-app.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/apps-data-stores (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [create-app.md](./create-app.md)
- [quickstart-gemini-enterprise.md](./quickstart-gemini-enterprise.md)
