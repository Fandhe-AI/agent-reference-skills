---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/responsible-ai
---

# Responsible AI and safety settings for Agent Search

Agent Search is designed with Google's AI Principles in mind and has built-in safety filters. SafeSearch filters explicit website search results (not available for private content); summarization filters derogatory, sexually explicit, toxic or violent output and returns safety attributes. Agent Search can still generate output that is offensive, insensitive or factually incorrect, so test before deploying.

## Signature / Usage

### Enable SafeSearch for Search with follow-ups

Customers can enable and disable safety filters using the API. The source's request for website search (`servingConfigs/default_config:search`) is left out; see Notes.

Run the command by itself and type the query text on one line at the prompt; `jq` (required) encodes `FREE_TEXT` as a JSON string, and nothing is sent if the input ends first or the line is empty. A line that follows the command in the same paste or script is read as the query.

Adapted (not in the official docs): used camelCase boolean `safeSearch: true`, replaced the body `serving_config` placeholder with the full serving config resource name that the field requires, and removed the trailing comma. Also, the request body is built with `jq -n --arg free_text "$FREE_TEXT" '{...}'` from the text read by `IFS= read -r FREE_TEXT`, rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"FREE_TEXT"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in the query cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs.

```bash
IFS= read -r FREE_TEXT && [ -n "$FREE_TEXT" ] && BODY=$(jq -n --arg free_text "$FREE_TEXT" '{
  "query": { "input": $free_text},
  "servingConfig": "projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/servingConfigs/SERVING_CONFIG_ID",
  "safeSearch": true
}') &&
printf '%s' "$BODY" |
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/conversations/CONVERSATION_ID:converse" \
--data @-
```

## Notes

- The `safe_search` setting applies to search results and also to Agent Search outputs like summarization (which is based on the search results). SafeSearch can be applied to public content indexed by Agent Search, such as websites.
- Even when SafeSearch is turned off, summarization output is assessed against safety attributes that filter potentially harmful content. You can also filter out responses that include "harmful categories" and topics that might be considered sensitive by using `safetyAttributes` in the Agent Search API response.
- Fallback responses: if the summarization model returns an empty string or a generic response, either the input or the output is triggering a safety filter. If you think a filter triggers inappropriately, report the issue using the Google Cloud console.
- Source difference (skipped reason value): the guide says "`SummarySkippedReason` is set to `BLOCKED_DUE_TO_POTENTIAL_POLICY_VIOLATION` if a potential policy violation is detected." The `discoveryengine` `v1`, `v1beta` and `v1alpha` Discovery documents have no `BLOCKED_DUE_TO_POTENTIAL_POLICY_VIOLATION`; `summarySkippedReasons` defines `POTENTIAL_POLICY_VIOLATION` ("The potential policy violation case. Google skips the summary if there is a potential policy violation detected. This includes content that may be violent or toxic."). Compare against `POTENTIAL_POLICY_VIOLATION` in code; `CUSTOMER_POLICY_VIOLATION` is a separate value for a policy defined by the customer.
- Left out: the source's website-search request posts to `.../dataStores/DATA_STORE_ID/servingConfigs/default_config:search` with the body `"query": { "input": "FREE_TEXT"}`, `"serving_config": "SERVING_CONFIG_ID"`, `"safe_search": "true",` (trailing comma) and `curl` lines without continuation backslashes. Correcting it would rewrite every line. Per the `discoveryengine.v1` Discovery document, `SearchRequest.query` is a string ("Raw search query."), `safeSearch` is a boolean ("Whether to turn on safe search. This is only supported for website search."), and the serving config is the `{+servingConfig}` path parameter of `servingConfigs.search`, not a `v1` body field.
- Corrected from the official docs (`:converse`): the source wrote `"serving_config": "SERVING_CONFIG_ID",` and `"safe_search": "true",` (a string, with a trailing comma). The `discoveryengine.v1beta` Discovery document defines `ConverseConversationRequest.safeSearch` as a boolean and `servingConfig` as "The resource name of the Serving Config to use. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store_id}/servingConfigs/{serving_config_id}`". The example still uses a `v1beta` path as in the source.
- Former name: Agent Search was Vertex AI Search; the API is still Discovery Engine (`discoveryengine.googleapis.com`).
- Corrected from the official docs: the source writes the query placeholder inside the single-quoted `curl -d '{...}'` body (`"input": "FREE_TEXT"`). Replacing it with a query that contains an apostrophe ends the shell quoting, and a query with `"`, `\` or a line break makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/responsible-ai (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-search-summaries.md](./get-search-summaries.md)
