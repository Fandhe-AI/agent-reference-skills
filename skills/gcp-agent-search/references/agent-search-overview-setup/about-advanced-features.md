---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-advanced-features
---

# About advanced features

Advanced settings you can turn on when creating Agent Search (formerly Vertex AI Search) search apps and data stores: Enterprise edition features, Generative responses (advanced LLM features), and Advanced website indexing. The tables show which setting each feature requires.

## Signature / Usage

### Select the tier and add-on when creating a search app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block). `SEARCH_TIER_ENTERPRISE` turns on Enterprise edition features; `SEARCH_ADD_ON_LLM` turns on generative responses:

Run the command by itself and type `APP_DISPLAY_NAME` on one line at the prompt; `jq` (required) encodes it as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the value.

Adapted (not in the official docs): `"searchTier"` and `"searchAddOns"` are set to `SEARCH_TIER_ENTERPRISE` and `SEARCH_ADD_ON_LLM` instead of the `SEARCH_TIER` and `SEARCH_ADD_ON` placeholders, because the text before the example says these two values turn on the features (see Notes). Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`APP_DISPLAY_NAME`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"APP_DISPLAY_NAME"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset TOKEN` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; IFS= read -r APP_DISPLAY_NAME &&
[ -n "$APP_DISPLAY_NAME" ] &&
BODY=$(printf '%s\n' "$APP_DISPLAY_NAME" |
jq -Rn '[inputs] as [$app_display_name] | {
  "displayName": $app_display_name,
  "dataStoreIds": ["DATA_STORE_ID"],
  "solutionType": "SOLUTION_TYPE_SEARCH",
  "industryVertical": "GENERIC",
  "searchEngineConfig": {
     "searchTier": "SEARCH_TIER_ENTERPRISE",
     "searchAddOns": ["SEARCH_ADD_ON_LLM"]
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

## Options / Props

### Feature requirements

| Feature | Requires |
|---|---|
| Website search (basic website search and advanced website indexing) | Enterprise edition |
| CMEK (customer-managed encryption keys) | Enterprise edition |
| Snippets for unstructured search | No requirements |
| Extractive answers for unstructured search | Enterprise edition |
| Extractive segments for unstructured search | Enterprise edition |
| Core generative answer features | Enterprise edition |
| Advanced generative answer features | Advanced LLM features |
| Search summarization without advanced generative answer features | Enterprise edition (Generative responses is also required by the setup steps; see Notes) |
| Search summarization with advanced generative answer features | Advanced LLM features |
| Search tuning for unstructured data stores | Enterprise edition |

### Features enabled by advanced website indexing

| Feature | Requires |
|---|---|
| Search summarization using the `answer` or the `search` method | Advanced LLM features and advanced website indexing |
| Search with follow-ups using the `answer` or the `converse` method | Advanced LLM features and advanced website indexing |
| Extractive segments and answers | Advanced website indexing |
| Search for an image using an image query | Advanced website indexing |
| Sitemap-based index and refresh | Advanced website indexing |
| Automatic index refresh | Advanced website indexing |
| Manual web page refresh | Advanced website indexing |
| Add structured data to data store schema | Advanced website indexing |
| Lower search latency than basic website search | Advanced website indexing |
| Blended search (multiple data stores in a single app) | Advanced website indexing |
| Search tuning | Advanced website indexing |

## Notes

- Core generative answer features include all answer generation features except the advanced ones: related questions, query simplification, multi-step queries, multi-turn queries, and multimodal answers that return images and charts.
- Advanced generative answer features include all answer generation features, including related questions, query simplification, multi-step queries, multi-turn queries, and multimodal answers that return images and charts. The source marks the core features row with `*` and the advanced generative answer and search summarization rows with `†`.
- Enterprise edition: required for extractive answers, extractive segments, search tuning and core generative answer features, and for any app that uses website data (basic website search and advanced website indexing). It can't be turned off for apps attached to website data stores; turning it off elsewhere stops the features that need it. It incurs additional cost (see https://docs.cloud.google.com/generative-ai-app-builder/pricing).
- Generative responses: you must turn on the Generative responses option to get search summarization and advanced generative answer features; for website search both also need advanced website indexing. It incurs additional costs. Turning it off stops functionality that needs advanced LLM features.
- Advanced website indexing: generates an index for the websites you specify when you create the data store, requires domain verification, imposes a quota on the number of pages you can index (you can request an increase; see https://docs.cloud.google.com/generative-ai-app-builder/quotas), and incurs additional cost. You can turn it on when you create or upgrade a data store. You cannot turn it off for an existing data store; create a new data store without selecting **Advanced website indexing**.
- Source inconsistency (search summaries): the feature table of the advanced-features page says "Search summarization without advanced generative answer features | Enterprise edition", while its "Generative responses" section says "You must turn on the Generative responses option to obtain search responses with these features:" and lists "Search summarization", and the get-search-summaries page says "For an unstructured search app: Turn on the generative responses option." (for a website search app: Enterprise edition features, Generative responses and advanced website indexing). The `discoveryengine` `v1` Discovery document also lists the summary skipped reason `LLM_ADDON_NOT_ENABLED` ("Google skips the summary if the LLM addon is not enabled."). The table is kept as written, but it reads as if Enterprise edition alone gives search summaries; the "Generative responses" section and the get-search-summaries steps require Generative responses (the LLM add-on), and without it the summary is skipped with `LLM_ADDON_NOT_ENABLED`. Follow the steps: for search summaries, turn on both Enterprise edition and Generative responses.
- Adapted from the official docs: the source's cell for "Search summarization without advanced generative answer features" is "Enterprise edition"; the note "(Generative responses is also required by the setup steps; see Notes)" is added to that cell so that the table matches the setup steps (see the source inconsistency above).
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset TOKEN` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-advanced-features (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the example sends `SEARCH_TIER_ENTERPRISE` and `SEARCH_ADD_ON_LLM` in place of the create-engine-es placeholders; in the `discoveryengine.v1` Discovery document, `GoogleCloudDiscoveryengineV1EngineSearchEngineConfig.searchTier` takes `SEARCH_TIER_STANDARD` ("Standard tier.") or `SEARCH_TIER_ENTERPRISE` ("Enterprise tier."), and `searchAddOns` takes `SEARCH_ADD_ON_LLM` ("Large language model add-on."); `SEARCH_TIER_UNSPECIFIED` and `SEARCH_ADD_ON_UNSPECIFIED` are described as "Default value when the enum is unspecified. This is invalid to use."
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [enterprise-edition.md](./enterprise-edition.md)
- [create-engine-es.md](./create-engine-es.md)
- [website-search-checklist.md](./website-search-checklist.md)
