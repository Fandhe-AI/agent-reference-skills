---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es
---

# Create a search app

Create an Agent Search (formerly Vertex AI Search) search app, called an engine in the API, with the Google Cloud console, the `engines.create` REST method, the Python client library, or Terraform. A data store must already exist.

## Signature / Usage

### REST

Find your data store ID first (console **Data Stores** page, then the **Data** page of the data store). If you have just created the data store with `dataStores.create`, wait first: that call returns a long-running operation; use its `name` as `OPERATION_NAME` and poll it as in "Poll an operation (REST)" on the long-running operations page of this skill (`references/agent-search-overview-setup/long-running-operations.md`) until the response shows `"done": true` without an `error` field. In Agent Search the term app can be used interchangeably with engine in the context of APIs. Attaching data stores: for an app created with a single data store, the source says "If you attach only one data store, you cannot remove it or add other data stores to the app later." Sharing data stores between apps: the data stores guide says "Custom search apps have a many-to-many relationship with data stores." The REST step of this source also says "A data store can be attached to only one app"; see Notes for this inconsistency.

Run the command by itself and type `APP_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): the request body is built with `jq -n --arg app_display_name "$APP_DISPLAY_NAME" '{...}'` from the values read by one `IFS= read -r` per placeholder (`APP_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"APP_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset TOKEN` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; IFS= read -r APP_DISPLAY_NAME &&
[ -n "$APP_DISPLAY_NAME" ] &&
BODY=$(jq -n --arg app_display_name "$APP_DISPLAY_NAME" '{
  "displayName": $app_display_name,
  "dataStoreIds": ["DATA_STORE_ID"],
  "solutionType": "SOLUTION_TYPE_SEARCH",
  "industryVertical": "GENERIC",
  "searchEngineConfig": {
     "searchTier": "SEARCH_TIER",
     "searchAddOns": ["SEARCH_ADD_ON"]
   }
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

### Python

Uses Application Default Credentials. For a location other than `global`, the sample sets the regional endpoint `{location}-discoveryengine.googleapis.com`. To create the app without generative responses, delete the `search_add_ons=` line.

Adapted (not in the official docs): the comment above `search_add_ons` lists only `SEARCH_ADD_ON_LLM`; the source also lists `SEARCH_ADD_ON_UNSPECIFIED`, which the Discovery document says is invalid to use (see Notes).

```python
from typing import List

from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1 as discoveryengine

# TODO(developer): Uncomment these variables before running the sample.
# project_id = "YOUR_PROJECT_ID"
# location = "YOUR_LOCATION" # Values: "global"
# engine_id = "YOUR_ENGINE_ID"
# data_store_ids = ["YOUR_DATA_STORE_ID"]


def create_engine_sample(
    project_id: str, location: str, engine_id: str, data_store_ids: List[str]
) -> str:
    #  For more information, refer to:
    # https://cloud.google.com/generative-ai-app-builder/docs/locations#specify_a_multi-region_for_your_data_store
    client_options = (
        ClientOptions(api_endpoint=f"{location}-discoveryengine.googleapis.com")
        if location != "global"
        else None
    )

    # Create a client
    client = discoveryengine.EngineServiceClient(client_options=client_options)

    # The full resource name of the collection
    # e.g. projects/{project}/locations/{location}/collections/default_collection
    parent = client.collection_path(
        project=project_id,
        location=location,
        collection="default_collection",
    )

    engine = discoveryengine.Engine(
        display_name="Test Engine",
        # Options: GENERIC, MEDIA, HEALTHCARE_FHIR
        industry_vertical=discoveryengine.IndustryVertical.GENERIC,
        # Options: SOLUTION_TYPE_RECOMMENDATION, SOLUTION_TYPE_SEARCH, SOLUTION_TYPE_CHAT, SOLUTION_TYPE_GENERATIVE_CHAT
        solution_type=discoveryengine.SolutionType.SOLUTION_TYPE_SEARCH,
        # For search apps only
        search_engine_config=discoveryengine.Engine.SearchEngineConfig(
            # Options: SEARCH_TIER_STANDARD, SEARCH_TIER_ENTERPRISE
            search_tier=discoveryengine.SearchTier.SEARCH_TIER_ENTERPRISE,
            # Options: SEARCH_ADD_ON_LLM
            search_add_ons=[discoveryengine.SearchAddOn.SEARCH_ADD_ON_LLM],
        ),
        # For generic recommendation apps only
        # similar_documents_config=discoveryengine.Engine.SimilarDocumentsEngineConfig,
        data_store_ids=data_store_ids,
    )

    request = discoveryengine.CreateEngineRequest(
        parent=parent,
        engine=engine,
        engine_id=engine_id,
    )

    # Make the request
    operation = client.create_engine(request=request)

    print(f"Waiting for operation to complete: {operation.operation.name}")
    response = operation.result()

    # After the operation is complete,
    # get information from operation metadata
    metadata = discoveryengine.CreateEngineMetadata(operation.metadata)

    # Handle the response
    print(response)
    print(metadata)

    return operation.operation.name
```

### Console

1. In the console, go to **AI Applications** > **Apps**, click **Create app**, and under **Site search with AI mode** click **Create**.
2. Turn **Enterprise edition features** on or off, and **Generative Responses** on or off.
3. Enter **Your app name** and **External name of your company or organization** (avoid suffixes like Inc or LLC; this helps the LLM identify the company the app represents).
4. Select a location (Enterprise features must be on to pick a location; Google recommends the default **global (Global)** unless you must restrict data to a geography), click **Continue**, then select or create a data store.

## Options / Props

### REST body fields

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | ID of your Google Cloud project |
| `APP_ID` | ID of the Agent Search app to create |
| `APP_DISPLAY_NAME` | Display name of the app |
| `DATA_STORE_ID` | ID of an existing data store to add to the app |
| `SEARCH_TIER` | `SEARCH_TIER_STANDARD` or `SEARCH_TIER_ENTERPRISE`; `SEARCH_TIER_ENTERPRISE` is required for website search and for choosing a region for your app, and Enterprise edition features incur additional cost |
| `SEARCH_ADD_ON` | `SEARCH_ADD_ON_LLM` for generative responses with advanced LLM features (search summaries and search with follow-ups); otherwise delete the `"searchAddOns"` line and the comma at the end of the `"searchTier"` line (see Notes) |

## Notes

- Python sample enum options (from the sample's comments):
  - `industry_vertical`: `GENERIC`, `MEDIA`, `HEALTHCARE_FHIR`
  - `solution_type`: `SOLUTION_TYPE_RECOMMENDATION`, `SOLUTION_TYPE_SEARCH`, `SOLUTION_TYPE_CHAT`, `SOLUTION_TYPE_GENERATIVE_CHAT`
  - `search_tier`: `SEARCH_TIER_STANDARD`, `SEARCH_TIER_ENTERPRISE`
  - `search_add_ons`: `SEARCH_ADD_ON_LLM` (the source also lists `SEARCH_ADD_ON_UNSPECIFIED`; see the Corrected line below)
- The industry vertical `GENERIC` is used to create custom search apps that contain structured, unstructured, website data stores, or multiple data stores (blended search).
- Data stores attached to one app (this source, console step): "If you attach only one data store, you cannot remove it or add other data stores to the app later. Attaching multiple data stores lets you update the attached data stores later, but the app always requires at least two data stores." (see "About blended search" in the data stores guide).
- Apps that share a data store (data stores guide, "Relationship between apps and data stores"): "Custom search apps have a many-to-many relationship with data stores. When multiple data stores are connected to a single custom search app, this is referred to as *blended search*." The same guide says a custom recommendations app "has a one-to-one connection with its data store", and media and healthcare search apps have "a many-to-one relationship with its data store. An app can only connect to one data store, whereas a given data store can be connected to several apps."
- Source inconsistency: the REST step of this source says "A data store can be attached to only one app and can't be removed from the app later.", while the data stores guide says custom search apps have a many-to-many relationship with data stores. Both are kept as written; the source does not say which rule applies to a data store that another custom search app already uses.
- Terraform: use the `google_discovery_engine_search_engine` resource of the `hashicorp/google` provider (https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/discovery_engine_search_engine).
- Corrected from the official docs: the source says "To create a search app using Terraform, see `discovery_engine_search_engine`", which is the registry page name; the resource type is `google_discovery_engine_search_engine` (`resource "google_discovery_engine_search_engine" "basic" {` in https://github.com/hashicorp/terraform-provider-google/blob/f7664c7e5d4b/website/docs/r/discovery_engine_search_engine.html.markdown , retrieved 2026-11-21).
- The Python sample waits for the long-running operation with `operation.result()`; the Python sample comment lists `global` as the location value.
- The REST method is `engines.create` (Discovery Engine API `v1`).
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset TOKEN` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- Adapted from the official docs: added the wait for a data store that was just created. `dataStores.create` returns `GoogleLongrunningOperation` in the `discoveryengine.v1` Discovery document, whose `done` field reads "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available."
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-datastore-ingest (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Corrected from the official docs: the source says "If you don't want generative responses, then either specify `SEARCH_ADD_ON_UNSPECIFIED` as the search add-on or remove the `searchAddOns` field.", and its Python sample comment lists "SEARCH_ADD_ON_LLM, SEARCH_ADD_ON_UNSPECIFIED". In the `discoveryengine.v1` Discovery document, `searchAddOns` takes `SEARCH_ADD_ON_LLM` ("Large language model add-on."), and `SEARCH_ADD_ON_UNSPECIFIED` is described as "Default value when the enum is unspecified. This is invalid to use.", so this page only says to leave the add-on out (REST: delete the `"searchAddOns"` line and the comma at the end of the `"searchTier"` line; Python: delete the `search_add_ons=` line).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [about-advanced-features.md](./about-advanced-features.md)
- [enterprise-edition.md](./enterprise-edition.md)
- [long-running-operations.md](./long-running-operations.md)
- [generic-search-checklist.md](./generic-search-checklist.md)
