---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-generic-search
---

# About Agent Search for custom apps

Introduces the capabilities of Agent Search (formerly Vertex AI Search) for custom apps: a Google-quality search and content discovery engine for website data and other structured or unstructured data, combining keyword and semantic search with grounded AI answers, personalization, and serving controls.

## Signature / Usage

### Create a custom search app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block). `industryVertical` is `GENERIC` for custom search apps:

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

- Key capabilities:
  - High-quality search: Understands user intent, including complex and natural language queries; combines keyword and semantic search
  - Personalized browse: Personalized results without a specific search query, and a personalized feed based on user context and navigation patterns
  - Data sources: Website, Structured Data (databases, JSON files in Cloud Storage, BigQuery tables), Unstructured Data (PDF, HTML, TXT, JPEG and PNG files in Cloud Storage or BigQuery), Blended Search (multiple data stores in one app)
  - Grounded AI answer generation: AI answers grounded in your data with citations; follow-up questions and related queries
  - Personalization: Improves results and ranking over time from user events such as clicks and conversions
  - Data management and CRUD operations: Create, read, update and delete documents in data stores; selectively delete individual records
  - Customization: Tune and configure the search and browse experience
- Components:
  - Data store: Stores content from the data sources (public website, structured, unstructured)
  - Data processing and indexing: Keyword extraction, semantic understanding using embeddings, metadata processing, advanced document parsing (tables, images, graphs via OCR or layout parsing)
  - Search app: Connects to one or more data stores; for blended search, data is ingested through connectors; search and browse behavior is configured at the app level
  - User query: Search query (text or images, powered by autocomplete) or navigational query / browse (personalized, no specific query)
  - Retrieval and ranking: Query understanding (natural language processing, filters with natural language understanding, knowledge graph, optional spelling correction / synonyms / query rephrasing); retrieval (keyword matching, semantic search, filtering); ranking (relevance, web signals for website search, boosting and burying, personalization, ordering)
  - Results and answer generation: Search results (snippets, extractive answers, extractive segments, serving controls, tuning), answer generation with citations, personalized browse
  - User events: Tracks clicks and views to improve search and personalization
- Configuration areas:
  - Data preparation: Schema for structured data (provide or auto-detect), metadata, chunking, parsing (digital parser, OCR parser for PDFs, Layout Parser), custom embeddings
  - Data ingestion: Crawling for website data; structured and unstructured data from Cloud Storage and BigQuery or through the REST API; CRUD operations
  - Search and browse configuration: Field settings, autocomplete, serving controls (boost/bury, filter, synonyms, redirect, promote controls), search tuning (Preview), website-specific configurations (advanced indexing, refresh web pages by automatic / manual / sitemap-based refresh)
  - Retrieval: Filter with natural-language understanding, filter by document-level relevance, filter using metadata
  - Ranking: Boost or bury, order web search results, order results from structured data stores
  - Search results: Answers and follow-ups, search summaries, snippets and extractive content, personalized browse (requires user events)
  - User events: Record clicks and views to improve search and personalization
- Vertical-specific apps are separate: media search and recommendations, commerce and retail (AI Commerce Search), and healthcare search. Agent Search for healthcare is deprecated: "Agent Search for healthcare is deprecated and won't be available after May 15, 2027." (https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data, retrieved 2026-11-21).
- Search tuning is marked Preview in the source.
- The diagrams (Figure 1 and Figure 2) in the source are not reproduced.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "APP_DISPLAY_NAME"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset TOKEN` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-generic-search (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [try-enterprise-search.md](./try-enterprise-search.md)
- [generic-search-checklist.md](./generic-search-checklist.md)
- [website-search-checklist.md](./website-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
