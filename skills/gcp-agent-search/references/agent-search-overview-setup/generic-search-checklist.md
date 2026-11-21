---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/generic-search-checklist
---

# Custom search checklist

Checklist of the steps to create a custom search app in Agent Search (formerly Vertex AI Search) over structured or unstructured data. For website search apps use the website search checklist; for a first sample app use "Get started with custom search".

## Signature / Usage

### Create the app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block):

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/engines?engineId=APP_ID" \
-d '{
  "displayName": "APP_DISPLAY_NAME",
  "dataStoreIds": ["DATA_STORE_ID"],
  "solutionType": "SOLUTION_TYPE_SEARCH",
  "industryVertical": "GENERIC",
  "searchEngineConfig": {
     "searchTier": "SEARCH_TIER",
     "searchAddOns": ["SEARCH_ADD_ON"]
   }
}'
```

### Steps

1. Set up a Google Cloud project: review "Before you begin" (project, Agent Search turned on, access control).
2. Prepare your data: review supported data and the app / data store relationship ("About apps and data stores"), prepare data per "Prepare data for ingestion", and set up data source access control if you must limit what users can view.
3. Import your data: create a data store (console or API with a Cloud Storage bucket location) or set up a third-party connector as a synced data source ("Create a search data store").
4. Create your app: create a search app and connect it to the data store.
5. Set up billing: choose General (pay-as-you-go) or Configurable pricing ("Set up configurable pricing for custom search").
6. Configure search settings: widget results, widget facets (Preview), field settings, autocomplete, serving controls, search tuning (Preview), custom embeddings (Preview).
7. Configure search results: filter custom search, get snippets, extractive answers or extractive segments.
8. Preview search results in the console **Preview** page or by REST ("Get search results").
9. Deploy: embed the search widget ("Add the search widget to a webpage") or integrate search API calls (client libraries).
10. Record and import user events (historical import, real-time recording) for personalized search and browse.
11. Maintain your app: refresh your data.

## Notes

- Data types for a data store:
  - Unstructured data: Documents (such as PDFs, HTML files, and TXT files) stored in Cloud Storage; optionally provide metadata in a JSON file or a BigQuery table
  - Structured data: Data provided with a specific schema, for example in a BigQuery table, as JSON files in Cloud Storage, or from third-party connectors such as Jira
- Pricing models:
  - General: A pay-as-you-go consumption-based model (the default for a project)
  - Configurable: A mixed-pricing model that unbundles capabilities into a subscription package with two subscriptions and optional add-ons; enable it at project level, then select configurable pricing for apps and data stores
- Search settings options:
  - Search widget results: Search widget deployment
  - Search widget facets (Preview): Search widget deployment
  - Field settings: API integration; structured data or unstructured data with metadata
  - Autocomplete: Suggestions based on document content, fields, search history or user events
  - Serving controls: Boosted, buried, filtered or redirected results, or queries associated with other queries
  - Search tuning (Preview): Tune the search model with your own training data
  - Custom embeddings (Preview): Data stores with structured data or unstructured data with metadata
- Agent Search for custom search supports two pricing models (General and Configurable); a project is pay-as-you-go by default.
- The source is a navigation checklist with links to the pages named in the steps; the REST snippet is borrowed from the create-a-search-app page.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/generic-search-checklist (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [website-search-checklist.md](./website-search-checklist.md)
- [try-enterprise-search.md](./try-enterprise-search.md)
- [create-engine-es.md](./create-engine-es.md)
- [before-you-begin.md](./before-you-begin.md)
