---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-advanced-features
---

# About advanced features

Advanced settings you can turn on when creating Agent Search (formerly Vertex AI Search) search apps and data stores: Enterprise edition features, Generative responses (advanced LLM features), and Advanced website indexing. The tables show which setting each feature requires.

## Signature / Usage

### Select the tier and add-on when creating a search app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block). `SEARCH_TIER_ENTERPRISE` turns on Enterprise edition features; `SEARCH_ADD_ON_LLM` turns on generative responses:

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
| Search summarization without advanced generative answer features | Enterprise edition |
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
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-advanced-features (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [enterprise-edition.md](./enterprise-edition.md)
- [create-engine-es.md](./create-engine-es.md)
- [website-search-checklist.md](./website-search-checklist.md)
