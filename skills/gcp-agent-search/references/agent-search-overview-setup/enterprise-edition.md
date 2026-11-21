---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/enterprise-edition
---

# Turn Enterprise edition on or off

How to turn Enterprise edition features on or off for an Agent Search (formerly Vertex AI Search) search app. Enterprise edition is available only for search apps, not for recommendations or chat agents.

## Signature / Usage

### Turn Enterprise edition on or off (console)

1. In the Google Cloud console, go to **AI Applications > Apps** (`https://console.cloud.google.com/gen-app-builder/engines`).
2. Click the app name.
3. In the navigation menu, click **Configurations**, then the **Response Settings** tab.
4. In the **Enterprise edition features** pane, click the toggle on or off. This option is only available for search apps that support Enterprise edition features and can't be turned off for apps with website data stores.
5. Click **Save**. Changes take place within a few minutes.

### Select the tier when creating an app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block); `searchTier` is `SEARCH_TIER_STANDARD` or `SEARCH_TIER_ENTERPRISE`:

Run the command by itself and type `APP_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): the request body is built with `jq -n --arg app_display_name "$APP_DISPLAY_NAME" '{...}'` from the values read by one `IFS= read -r` per placeholder (`APP_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"APP_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset TOKEN` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; unset TOKEN; IFS= read -r APP_DISPLAY_NAME &&
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

## Notes

- Features that require Enterprise edition include (source list): "Website search (both Standard and Enterprise editions)", extractive answers, extractive segments, and core generative answers. The parenthetical "(both Standard and Enterprise editions)" is not explained in the source.
- Website search: the advanced features page says "turning on Enterprise edition features is required for website search. That is, Enterprise edition features are required for any Agent Search app that uses website data (basic website search and advanced website indexing). This setting can't be turned off for apps that are attached to website data stores." So both basic website search and advanced website indexing require Enterprise edition.
- You can't turn off Enterprise edition for apps that are connected to a website data store.
- Turning on Enterprise edition features can incur additional costs; see the Agent Search pricing page (https://docs.cloud.google.com/generative-ai-app-builder/pricing).
- After turning Enterprise edition off, all features that require it stop working in the app within a few minutes; make sure the app doesn't need them first.
- The source shows only Console steps; the REST snippet is borrowed.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset TOKEN` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/enterprise-edition (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-advanced-features (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
