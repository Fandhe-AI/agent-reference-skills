---
source: https://docs.cloud.google.com/knowledge-catalog/docs/introduction
---

# Knowledge Catalog overview

Knowledge Catalog unifies technical metadata and business semantics across structured and unstructured data using Gemini-powered capabilities. The resulting context graph is used to discover assets, verify data quality, and ground generative AI applications. The page is aimed at data and context engineers, data scientists, data stewards, and AI developers.

## Signature / Usage

### Search entries from the command line

```bash
gcloud dataplex entries search 'foo' --project=my-project
```

### Remote MCP server endpoint

- Remote MCP server: Google-hosted, no local server management; endpoint `https://dataplex.googleapis.com/mcp`. Best for cloud-first deployments, serverless environments such as Cloud Run, and managed external services.
- Local MCP toolbox: command-line tool that acts as a local proxy; requires binary installation and `.mcp.json` settings. Best for local agent development, rapid prototyping, and desktop IDE integrations such as VS Code or Cursor.

### Metadata lifecycle (three pillars)

| Pillar | What happens |
|---|---|
| Aggregation (discover and ingest) | Automatic crawl and index of technical metadata without moving the data: built-in databases (BigQuery, AlloyDB for PostgreSQL, Spanner), managed connectivity (for example Oracle, PostgreSQL, Collibra), data lineage (column-level). |
| Enrichment (curate context and verify trust) | Gemini data insights (column descriptions, table summaries, recommended joins), glossaries and aspects, data quality and anomaly detection, governance reviews. |
| Search and retrieval (access and ground) | Grounding agents, Context API (`LookupContext`), semantic search in natural language, data packaging (data products). |

## Options / Props

### Integrations

| Service | Primary role | Integration with Knowledge Catalog |
|---|---|---|
| Knowledge Catalog | Governance and agentic context | Unified semantic context graph; runs data quality check scans; exposes grounded schemas to AI models and applications. |
| BigQuery | Enterprise data warehousing | Datasets, tables and views are crawled, indexed and enriched with business classification aspects. |
| Gemini Enterprise Agent Platform | AI model development | Custom agents retrieve metadata context to ground reasoning; Knowledge Catalog feeds tools and context to the platform's Agent Registry. |
| Cloud Storage | Unstructured file storage | Unstructured discovery scans parse PDFs and images to build relationship maps. |

### Context orchestration phases

| Phase | Description |
|---|---|
| Ingestion and discovery | Operational databases, warehouses such as Spanner and BigQuery, object stores such as Cloud Storage, and runtime metastores such as Lakehouse runtime catalog feed schemas, lineage maps and metadata definitions. |
| Context mapping | Metadata is linked to technical aspects, business glossaries and verified queries to assemble the active context graph. |
| Delivery interfaces | MCP or direct `LookupContext` API endpoints. |
| Agent grounding | Frameworks such as the Agent Development Kit (ADK) or LangChain inject the context into LLM prompts. |

### Best practices for agentic data context

| Practice | Detail |
|---|---|
| Add aspects | Define and apply a custom trust signal aspect to certify authoritative data products. |
| Context budgets | Specify the `context_budget` option of `LookupContext`; the API fits the most important metadata first (such as lineage and primary descriptions). The budget is a soft target of approximately that many characters, not a guaranteed limit (see about-context.md). |
| Related resources | List up to 10 related tables or assets in a context inquiry so the context engine can autopopulate join paths. |
| Glossaries | Standardize terms and abbreviations in business glossaries. |
| Golden queries | Attach verified natural language queries and their correct SQL to entries. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Knowledge Catalog was formerly Dataplex Universal Catalog; the API, gcloud group and IAM names stay `dataplex`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries/search (gcloud 593.0.0 help); the page itself has no fenced code.
- Limitations stated by the source: certain automated semantic extractions might be limited to built-in Google Cloud services; standard Google Cloud API quotas apply to context retrieval and metadata extraction; before creating resources you must manually create a VPC Service Controls security perimeter, otherwise the resources have no perimeter protection (VPC Service Controls itself is in `gcp-security`).
- The tables themselves (BigQuery datasets, tables, views) are covered by the `gcp-bigquery` skill; Knowledge Catalog catalogs them.
- Official docs inconsistency: this page says `LookupContext` fits metadata "within your specified token constraints", while the About context page calls `context_budget` "a target character budget" that is a soft budget, and the API schema (`GoogleCloudDataplexV1LookupContextRequest.options`, references/rest-schemas/dataplex/) says the output is truncated "on a best-effort basis to contain approximately the desired amount of characters" with "no guarantee". The table follows the API schema.

## Related

- [metadata-overview.md](./metadata-overview.md)
- [about-context.md](./about-context.md)
- [upgrade-dataplex-universal-catalog.md](./upgrade-dataplex-universal-catalog.md)
- [enable-api.md](./enable-api.md)
