---
source: https://docs.cloud.google.com/knowledge-catalog/docs/about-context
---

# About data context

Data context in Knowledge Catalog unifies technical structures, business rules and real-world usage patterns into an active context layer, so people and AI applications can discover, evaluate and interpret data assets without manual validation or hallucinations. Context differs from metadata: metadata describes an isolated asset (column names, types, partition keys, sizes), while context is the synthesized knowledge graph that adds business semantics, relationships, operational behavior and trust signals.

## Signature / Usage

### Look up an entry from the command line

```bash
gcloud dataplex entries describe entry1 \
    --entry-group=entry-group1 --location=us-central1 \
    --project=test-project
```

### Retrieve context with `LookupContext`

- The `LookupContext` method (`projects.locations.lookupContext`, REST reference `https://docs.cloud.google.com/knowledge-catalog/docs/reference/rest/v1/projects.locations/lookupContext`) returns a unified, pre-formatted bundle of metadata in one request, instead of many sequential calls for schemas, glossary terms, quality scores and query logs.
- Output formats: `yaml` (default), `json`, or `xml`.
- `context_budget`: a soft target character budget; the API truncates and prioritizes metadata to try to fit, but does not guarantee staying under the limit.
- Context views: `BASIC` (entry metadata, schemas, column descriptions, overview text, agent guidelines) and `STANDARD` (adds multi-table join relationships, attached glossary terms and synonyms, verified sample queries).
- Includes inferred join conditions (for example `orders.customer_id = customers.id`) and verified example SQL ("golden queries").

## Options / Props

### Context layers

| Layer | Content |
|---|---|
| Technical metadata | Database schemas, field types, partitioning keys, security tags (such as IAM policies). |
| Semantic metadata | Business glossaries, metric relationships, classifications, domain terminology, golden queries. |
| Operational metadata | Execution profiles, profiling statistics, data quality scores. |
| Relationships | Inferred or defined links between storage tables and business indicators. |
| Trust signals | Ownership and certification stamps. |
| Agent guidance | README files, usage notes, execution logs that tell tools how and when to query a resource. |

### Passive metadata compared with active data context

| Dimension | Technical metadata | Active data context |
|---|---|---|
| Core focus | Underlying specifications and storage format. | Business meaning, operational behavior, relationships. |
| State | Passive: stored in registries for manual lookup. | Active: continuously enriched by AI, mined from query histories, assembled dynamically for LLM prompts. |
| Primary consumers | Database engines, data engineers, compliance auditors. | AI agents, LLMs, business analysts, conversational interfaces. |
| Primary purpose | Storage management, indexing, compliance verification. | Grounding agent reasoning, resolving joins, preventing hallucinations. |

### Ways context is fed in

| Mechanism | Details |
|---|---|
| First-party harvesting | BigQuery, Spanner, Cloud SQL and AlloyDB for PostgreSQL sync schemas, types, partitioning and clustering; Looker (Google Cloud core) syncs LookML models, Explores, views, dimensions, measures, dashboards, dashboard elements and Looks; Datastream CDC stream metadata, Dataform table definitions, Cortex Framework data products. |
| Data insights | Powered by Gemini in BigQuery; mines query logs to generate column descriptions, table relationships and golden queries. |
| Data profiling and data quality | Scans compute distinct counts, null ratios, sample values and evaluate rule-based checks; live health scores are attached to entries. |
| Knowledge Studio | Context sets, enrichment workflows (reviewing AI-suggested descriptions, glossary mappings, certification), per-domain environments. |
| Custom ingestion | `CreateEntry`, `UpdateEntry`, `CreateAspectType` API methods; custom enrichment agents (ADK, LangChain); JSON or CSV bulk export and import. |

### Ways context is consumed

| Consumer | Details |
|---|---|
| Gemini in BigQuery (Conversational Agent) | Queries glossary definitions, column descriptions and historical query relationships in BigQuery Studio. |
| Data Engineering Agent in BigQuery | Discovers Apache Iceberg and BigQuery tables, invokes semantic catalog searches, generates catalog metadata. |
| Gemini and Agent Builder | Custom GenAI agents ground reasoning in catalog metadata. |
| MCP | Remote MCP server (managed endpoint, or deployed on Cloud Run) or local MCP Toolbox (CLI proxy for IDEs such as VS Code and Cursor). |
| `LookupContext` API | See Signature / Usage. |
| Context sets | Dynamic discovery via semantic search per prompt, or a preconfigured context set bound by its resource URI for deterministic grounding. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/about-context (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries/describe (gcloud 593.0.0 help); the page itself has no fenced code.
- Knowledge Catalog was formerly Dataplex Universal Catalog; API, gcloud and IAM names stay `dataplex`.
- The three pillars of context management are aggregation, enrichment, and search and retrieval; permission groups (ACLs) are respected by semantic search. In multi-agent workflows Knowledge Catalog checks agent queries against preconfigured IAM roles.
- Gemini in BigQuery and the BigQuery tables referenced here are covered by `gcp-bigquery`; the Gemini Developer API is in `google-gemini-api`.

## Related

- [introduction.md](./introduction.md)
- [metadata-overview.md](./metadata-overview.md)
