---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/website-search-checklist
---

# Website search checklist

Checklist of the steps to create a website search app (a type of custom search app) in Agent Search (formerly Vertex AI Search), for basic website search or advanced website indexing. For other custom search apps use the custom search checklist.

## Signature / Usage

### Create the app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block). The source says to turn on Enterprise edition when creating the app (`SEARCH_TIER_ENTERPRISE`):

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

1. Set up a Google Cloud project: review "Before you begin".
2. Prepare your data: for basic website search you can connect only one data store to an app; prepare website data per "Website data" in the prepare-data page.
3. Create a data store by providing the website URL patterns to include and to exclude ("Create a data store using website URLs").
4. Create your app and ensure Enterprise edition is turned on.
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
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/website-search-checklist (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [generic-search-checklist.md](./generic-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
- [try-enterprise-search.md](./try-enterprise-search.md)
