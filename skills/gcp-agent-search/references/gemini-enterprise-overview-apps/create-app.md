---
source: https://docs.cloud.google.com/gemini/enterprise/docs/create-app
---

# Create a Gemini Enterprise app

Creates a Gemini Enterprise (formerly Agentspace) app in the Google Cloud console or with the `engines.create` REST method. In the API an app is an engine: a generic search engine whose `appType` is `APP_TYPE_INTRANET`.

## Signature / Usage

### Create an app with REST (`engines.create`, API version `v1`)

An existing data store is required first: connect a Google data source or a third-party data source. The data store ID is on the Data page of the data store in the console (Data Stores in the navigation menu). If you have just created the data store with `dataStores.create`, wait first: that call returns a long-running operation; use its `name` as `OPERATION_NAME` and poll it as in "Poll an operation (REST)" on the long-running operations page of this skill (`references/agent-search-overview-setup/long-running-operations.md`) until the response shows `"done": true` without an `error` field.

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

### Optional configuration in the JSON payload

Company external name (omit suffixes such as Inc or LLC):

```text
"commonConfig": {
  "companyName": "COMPANY_NAME"
}
```

### Example command and result

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: my-project-123" \
"https://discoveryengine.googleapis.com/v1/projects/my-project-123/locations/global/collections/default_collection/engines?engineId=my-app" \
-d '{
  "displayName": "my-app",
  "dataStoreIds": ["slack_1234567890123_conversation", "slack_1234567890123_file", "slack_1234567890123_message"],
  "solutionType": "SOLUTION_TYPE_SEARCH",
  "industryVertical": "GENERIC",
  "appType": "APP_TYPE_INTRANET"
}' )
```

```json
{
  "name": "projects/123456/locations/global/collections/default_collection/operations/create-engine-12345678901234567890",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.discoveryengine.v1.Engine",
    "name": "projects/123456/locations/global/collections/default_collection/engines/my-app",
    "displayName": "my-app",
    "dataStoreIds": [
      "slack_1234567890123_conversation",
      "slack_1234567890123_file",
      "slack_1234567890123_message"
    ],
    "solutionType": "SOLUTION_TYPE_SEARCH",
    "searchEngineConfig": {
      "searchTier": "SEARCH_TIER_STANDARD"
    },
    "industryVertical": "GENERIC",
    "appType": "APP_TYPE_INTRANET"
  }
}
```

### Console steps and fields

On the **Apps** page of the Gemini Enterprise console, click **Create app**, then:

- **App name**: the name of your app.
- **ID**: generated automatically; click **Edit** to change it. The app ID cannot be updated after you create the app.
- **Choose a location**: select a **Multi-region**. Use the default **global (Global)** multi-region unless you need to restrict your data to a specific geography.
- **Advanced options** (optional): **Company name** (your company's external name, omitting suffixes such as Inc or LLC; this helps the LLM identify the company the app represents) and, if you are connecting a **Google Drive** data store, **Include cross-domain documents** (allows the app to search documents outside your organization).

Click **Create**.

### Request placeholders

- `PROJECT_ID`: the ID of your project.
- `APP_ID`: the ID of the app that you want to create.
- `APP_DISPLAY_NAME`: the display name of the app that you want to create.
- `DATA_STORE_ENTITY_ID`: if your data store contains entities, use the specific entity IDs. If your data store does not contain entities, use the data store ID instead.
- `COMPANY_NAME`: your company's external name, omitting suffixes such as Inc or LLC.

## Notes

- CMEK: to protect the app's data with customer-managed encryption keys you must register your CMEK key before creating the app. Apps created prior to key registration remain unprotected.
- You can't connect website data stores to Gemini Enterprise search and assistant apps.
- The app ID cannot be updated after you create the app.
- Warning (source): enabling cross-domain documents (the console checkbox **Include cross-domain documents**) increases exposure to security risks, such as prompt injection from external documents and potential manipulation of search results.
- Adapted from the official docs: the source also shows a REST fragment `"includeCrossDomainDocuments": true` for a Google Drive data store. The field does not appear in the `discoveryengine` Discovery documents (`v1`, `v1beta`, `v1alpha`), so its name and placement in the Engine body are not confirmed and the fragment is left out; use the console option **Include cross-domain documents** under **Advanced options**. The `commonConfig` fragment is tagged `text` because it is not a complete JSON document.
- Third-party data: connect the source in the console first. The source's REST step needs "an existing data store" from a Google or a third-party data source, and its example attaches existing Slack entity data stores, while apps-data-stores.md says to use the console, not the API, to create the app for third-party data; both are kept as written.
- The source also shows next steps (connect an existing data store, StreamAssist preview, manage web app features).
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Adapted from the official docs: added the wait for a data store that was just created. `dataStores.create` returns `GoogleLongrunningOperation` in the `discoveryengine.v1` Discovery document, whose `done` field reads "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available."
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/create-app (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [apps-data-stores.md](./apps-data-stores.md)
- [quickstart-gemini-enterprise.md](./quickstart-gemini-enterprise.md)
- [configure-assistant.md](./configure-assistant.md)
