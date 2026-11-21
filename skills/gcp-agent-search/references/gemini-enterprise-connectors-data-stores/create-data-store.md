---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/create-data-store
---

# Connect a Google Data Source (Create a First-Party Data Store)

Lists the Google data sources (Cloud Storage, BigQuery, Google Drive, Gmail, Google Calendar, Cloud SQL, Spanner, Firestore, Bigtable, AlloyDB for PostgreSQL and more) that Gemini Enterprise (formerly Agentspace) can turn into data stores, by launch stage, plus the supported actions per data store.

## Signature / Usage

### Create a data store (REST)

Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-cloud-storage (the source twin of this page has no code). It only creates an empty data store and connects no source: import Cloud Storage data as in [connect-cloud-storage.md](./connect-cloud-storage.md), and connect other sources on their own pages.

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

### Generally Available data sources

- Connect to BigQuery (ingestion mode)
- Import from Cloud Storage
- Sync from Google Drive
- Sync from Gmail
- Sync from Google Calendar
- Connect to Google Sites
- Sync people data
- Connect to Cloud SQL (ingestion mode)
- Connect to Spanner (ingestion mode)
- Import from Firestore
- Import from Bigtable
- Connect to AlloyDB for PostgreSQL (ingestion mode)
- Create a data store using Terraform

### Public Preview data sources

- Sync from Google Chat (Preview)
- Import from Compute Engine (Preview)
- Connect Google Stitch with data federation (Preview)
- Sync from Google Groups (Preview)
- Import people data from a custom source (Preview)
- Enable Gemini Notebook Enterprise as a search source (Preview)
- Connect to data from AlloyDB for PostgreSQL (Preview)
- Connect to data from BigQuery using federated query (Preview)
- Connect to data from Spanner using federated query (Preview)
- Connect to data from Cloud SQL using federated query (Preview)
- Connect to data from AlloyDB for PostgreSQL using federated query (Preview)
- Use Knowledge Catalog with federated query connectors (Preview)

## Options / Props

### Supported actions: Google Calendar

| Launch date | Action | Description |
|---|---|---|
| 9/1/26 | Create event | Creates a new Google Calendar event. |
| 9/1/26 | Delete event | Deletes an existing Google Calendar event. |
| 9/1/26 | Get event | Fetches a Google Calendar event by ID. |
| 9/1/26 | List calendars | Lists calendars in the user's Google Calendar account. |
| 9/1/26 | List events | Lists events from a Google Calendar. |
| 9/1/26 | Respond to event | Responds to a Google Calendar event invitation. |
| 9/1/26 | Search events | Searches for Google Calendar events matching a query. |
| 9/1/26 | Suggest time | Suggests a meeting time based on attendees' free/busy data. |
| 9/1/26 | Update event | Updates an existing Google Calendar event. |

### Supported actions: Google Chat

| Launch date | Action | Description |
|---|---|---|
| 9/1/26 | Add membership | Adds a member to a Google Chat conversation. |
| 9/1/26 | Add reaction | Adds a reaction to a Google Chat message. |
| 9/1/26 | Create conversation | Creates a Google Chat conversation (named space, direct message, or group direct message). |
| 9/1/26 | List memberships | Lists memberships in a Google Chat conversation. |
| 9/1/26 | List messages | Retrieves messages from a specified Google Chat conversation (space, direct message, or group direct message). |
| 9/1/26 | List messages (Markdown) | Retrieves messages from a specified Google Chat conversation in Markdown format. |
| 9/1/26 | Remove membership | Removes a user membership from a Google Chat conversation. |
| 9/1/26 | Remove reaction | Removes a reaction from a Google Chat message. |
| 9/1/26 | Search conversations | Searches for Google Chat conversations by display name. |
| 9/1/26 | Search messages | Searches for Google Chat messages using keywords and filters. Works across all spaces the user has access to, or can be scoped to a specific conversation. |
| 9/1/26 | Send message | Sends a Google Chat message to a conversation. |
| 9/1/26 | Send message (Markdown) | Sends a Google Chat message to a conversation with Markdown formatting. |
| 9/1/26 | Update membership | Updates a user membership in a Google Chat conversation. |

### Supported actions: Gmail

| Launch date | Action | Description |
|---|---|---|
| 9/1/26 | Batch label messages | Adds one or more labels to multiple Gmail messages in a single request. |
| 9/1/26 | Batch label threads | Adds one or more labels to multiple Gmail threads in a single request. |
| 9/1/26 | Batch unlabel messages | Removes one or more labels from multiple Gmail messages in a single request. |
| 9/1/26 | Batch unlabel threads | Removes one or more labels from multiple Gmail threads in a single request. |
| 9/1/26 | Create draft | Creates a new Gmail draft. |
| 9/1/26 | Create filter | Creates a new Gmail filter. |
| 9/1/26 | Create label | Creates a new label in Gmail. |
| 9/1/26 | Delete filter | Deletes an existing Gmail filter. |
| 9/1/26 | Delete label | Deletes an existing Gmail label. |
| 9/1/26 | Forward | Forwards an existing Gmail message. |
| 9/1/26 | Get message attachment | Fetches metadata for an attachment on a Gmail message. |
| 9/1/26 | Get thread | Fetches the full contents of a Gmail thread. |
| 9/1/26 | Label message | Adds one or more existing labels to a specific Gmail message. |
| 9/1/26 | Label thread | Adds one or more existing labels to a specific Gmail thread. |
| 9/1/26 | List drafts | Lists Gmail drafts in the user's mailbox. |
| 9/1/26 | List filters | Lists Gmail filters in the user's mailbox. |
| 9/1/26 | List labels | Lists labels defined in the user's Gmail mailbox. |
| 9/1/26 | List threads | Lists Gmail threads in the user's mailbox. |
| 9/1/26 | Reply | Replies to an existing Gmail message. |
| 9/1/26 | Search threads | Searches for Gmail threads matching a query. |
| 9/1/26 | Send message | Sends a new Gmail message. |
| 9/1/26 | Unlabel message | Removes one or more existing labels from a specific Gmail message. |
| 9/1/26 | Unlabel thread | Removes one or more existing labels from a specific Gmail thread. |
| 9/1/26 | Update draft | Updates an existing Gmail draft. |
| 9/1/26 | Update label | Updates an existing Gmail label. |

### Supported actions: Google Drive

| Launch date | Action | Description |
|---|---|---|
| 9/1/26 | Copy file | Copies a file in Google Drive. |
| 9/1/26 | Create file | Creates a new file in Google Drive. |
| 9/1/26 | Download file content | Downloads the content of a Google Drive file. |
| 9/1/26 | Get file metadata | Fetches metadata for a Google Drive file. |
| 9/1/26 | Get file permissions | Lists the permissions on a Google Drive file. |
| 9/1/26 | List recent files | Lists recent files in Google Drive. |
| 9/1/26 | List shared drives | Lists shared drives in Google Drive. |
| 9/1/26 | Read file content | Reads the contents of a Google Drive file. |
| 9/1/26 | Search files | Searches for Google Drive files matching a query. |
| 9/1/26 | Share file | Shares a Google Drive file with one or more users. |
| 9/1/26 | Trash file | Moves a Google Drive file to the trash. |
| 9/1/26 | Update file | Updates an existing Google Drive file. |
| 10/12/26 | Get cell values | Reads cell values from a Google Sheets spreadsheet. |
| 10/12/26 | Get spreadsheet | Reads the contents and metadata of a Google Sheets spreadsheet. |
| 10/12/26 | Insert dimension | Inserts rows or columns into a Google Sheets spreadsheet. |
| 10/12/26 | Read document | Reads the contents of a Google Docs document. |
| 10/12/26 | Read presentation | Reads the contents of a Google Slides presentation. |
| 10/12/26 | Update cell values | Writes cell values to a Google Sheets spreadsheet. |
| 10/12/26 | Update formulas | Writes formulas to a Google Sheets spreadsheet. |
| 10/30/26 | Update document | Applies updates to a Google Docs document. |
| 10/30/26 | Update presentation | Applies updates to a Google Slides presentation. |
| 10/30/26 | Update spreadsheet | Applies structural updates to a Google Sheets spreadsheet. |

### Supported actions: Google Stitch

| Launch date | Action | Description |
|---|---|---|
| 6/5/26 | Create project | Creates a new Stitch project. |
| 6/5/26 | Update design system | Updates a design system. |
| 6/23/26 | Apply design system | Applies a design system to a project. |
| 6/23/26 | Create design system | Creates a new design system. |
| 7/29/26 | Edit screens | Edits screens. |

## Notes

- Google Workspace data sources (Google Drive, Gmail, Google Calendar, Google Chat) require a Google Workspace organization account and a Customer ID. Personal Google Accounts (consumer accounts ending in `@gmail.com`) don't have a customer ID and aren't supported for data connectors.
- Not all Google data stores support actions; for example Google Sites is ingestion-only and doesn't support actions. Several listed actions create, update or send content in Google Workspace (for example Create event, Send message, Update draft, Update document); enable only the actions users need.
- Troubleshooting: with customer-managed encryption keys and a data import that fails with `The caller does not have permission`, make sure the CryptoKey Encrypter/Decrypter IAM role (`roles/cloudkms.cryptoKeyEncrypterDecrypter`) on the key has been granted to the Cloud Storage service agent.
- To import from a third-party data source see introduction-to-connectors-and-data-stores.md (third-party connectors by launch stage).
- Corrected from the official docs: the example Cloud Storage `curl` body ended with `"CONTENT_REQUIRED",` before the closing brace; the trailing comma was removed.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "DATA_STORE_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/create-data-store (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/connectors/connect-cloud-storage
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [connect-cloud-storage.md](./connect-cloud-storage.md)
- [connect-bigquery.md](./connect-bigquery.md)
- [introduction-to-connectors-and-data-stores.md](./introduction-to-connectors-and-data-stores.md)
