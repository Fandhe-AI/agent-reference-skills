---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-generic-search
---

# About Agent Search for custom apps

Introduces the capabilities of Agent Search (formerly Vertex AI Search) for custom apps: a Google-quality search and content discovery engine for website data and other structured or unstructured data, combining keyword and semantic search with grounded AI answers, personalization, and serving controls.

## Signature / Usage

### Create a custom search app (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (the twin for this page has no code block). `industryVertical` is `GENERIC` for custom search apps:

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
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/about-generic-search (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [try-enterprise-search.md](./try-enterprise-search.md)
- [generic-search-checklist.md](./generic-search-checklist.md)
- [website-search-checklist.md](./website-search-checklist.md)
- [about-advanced-features.md](./about-advanced-features.md)
- [create-engine-es.md](./create-engine-es.md)
