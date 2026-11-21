---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/website-search-checklist
---

# Website search checklist

Checklist of the steps to create a website search app (a type of custom search app) in Agent Search (formerly Vertex AI Search), for basic website search or advanced website indexing. For other custom search apps use the custom search checklist.

## Signature / Usage

### Create the app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block). The source says to turn on Enterprise edition when creating the app (`SEARCH_TIER_ENTERPRISE`):

Run the command by itself and type `APP_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): the request body is built with `jq -n --arg app_display_name "$APP_DISPLAY_NAME" '{...}'` from the values read by one `IFS= read -r` per placeholder (`APP_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"APP_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; IFS= read -r APP_DISPLAY_NAME &&
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
curl --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines?engineId=APP_ID" \
--data @- )
```

### Steps

1. Set up a Google Cloud project: review "Before you begin".
2. Prepare your data: for basic website search you can connect only one data store to an app; prepare website data per "Website data" in the prepare-data page.
3. Create a data store by providing the website URL patterns to include and to exclude ("Create a data store using website URLs").
4. Create your app and ensure Enterprise edition is turned on. With the API, first wait until the `dataStores.create` long-running operation shows `"done": true` without `error` (long-running operations page of this skill).
5. Set up billing: choose General (pay-as-you-go) or Configurable pricing. For configurable pricing for basic web apps: don't select any add-ons and set the **Storage Subscription Threshold** to the minimum (basic web apps don't use storage).
6. Configure search settings at a data store level: widget results and autocomplete for the widget; autocomplete and serving controls (filtered or promoted) for API integration.
7. Configure search results at a request level: filter website search with filter expressions (basic website search), order web search results (basic website search), get snippets.
8. Preview search results in the console **Preview** page or with cURL calls.
9. Deploy: embed the search widget or integrate search API calls.
10. Record and import user events (historical import, real-time recording).
11. Optionally turn on advanced website indexing at any time to enrich indexing.

## Notes

- Website data store types:
  - Basic website search: For basic website search, you can connect only one data store to an app
  - Advanced website indexing: Indexes the web pages in your search data store; requires domain verification and offers additional features over basic website search
- Pricing models:
  - General: A pay-as-you-go consumption-based model (the default for a project)
  - Configurable: A mixed-pricing model with two subscriptions and optional add-ons; enable it at project level, then select it for apps and data stores
- Advanced website indexing: see about-advanced-features.md for the features, domain verification requirement and page-index quota. The source's two checklists are shown behind Basic website search / Advanced website indexing buttons; the steps above follow the basic checklist, with the final step upgrading to advanced indexing.
- Enterprise edition features are required for any app that uses website data.
- The REST snippet is borrowed from the create-a-search-app page.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell.
- Adapted from the official docs: step 4 adds the wait for the data store's creation operation; `dataStores.create` returns `GoogleLongrunningOperation` in the `discoveryengine.v1` Discovery document.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/website-search-checklist (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [generic-search-checklist.md](./generic-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
- [try-enterprise-search.md](./try-enterprise-search.md)
