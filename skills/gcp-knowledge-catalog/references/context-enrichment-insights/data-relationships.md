---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-relationships
---

# Data Relationships

Preview. Data relationships in Knowledge Catalog (formerly Dataplex Universal Catalog) let you find related BigQuery tables and views and inspect how they connect, and give AI agents structural context for more accurate query generation.

## Signature / Usage

Discovered relationships are stored as `EntryLinks` between two entries; join columns and the relationship source are aspects of the entry link. Retrieve them with `LookupEntryLinks` (all entry links that reference an entry as source or target) or `LookupContext` (a single grounding endpoint returning a concise pre-formatted metadata package, including related data assets). The source shows no request code. Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/use-data-insights-structured-data (list entry links for a table entry).

```bash
alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'
```

```bash
gcurl -X GET "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/entryGroups/@bigquery/entryLinks?filter=entry_references.name=\"TABLE_ENTRY_NAME\""
```

## Options / Props

### Relationship columns in the console Relationships tab

| Column | Meaning |
|---|---|
| Target | Name of the connected data asset |
| Relationship | Columns used to link the assets |
| Type | Nature of the link; frequent joins and data-insights relationships both appear as `JOIN` |
| Origin | `Query history` for frequent joins; `Data insights` for relationships discovered by data insights |
| Action | Sample query to discover the link between the assets |

### Facts and limits

| Item | Value |
|---|---|
| Supported data assets | BigQuery tables and views |
| Locations | All BigQuery locations |
| Query history analysis | Samples query history, so some queries might not lead to link discovery |
| Discovery latency | Up to 72 hours after the query is executed |
| IAM | No Knowledge Catalog-specific roles are required; visibility follows source-system permissions (for example `bigquery.tables.get` for a BigQuery table). Relationships involving assets you can't view in the source system are hidden. |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- Relationship sources: historical query logs (continuous analysis of query history for potential `JOIN` patterns) and data insights (on-demand analysis of schema attributes and data overlaps with large language models).
- REST references: `projects.locations.entryGroups.entryLinks`, `projects.locations/lookupEntryLinks`, `projects.locations/lookupContext` (v1). See the page for using Knowledge Catalog with MCP, Gemini and other agents.
- The BigQuery tables and views are covered by `gcp-bigquery`; Knowledge Catalog catalogs them.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-relationships (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/use-data-insights-structured-data
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/reuse-data-quality-rules (the `gcurl` alias; the command above uses `gcurl` without defining it)

## Related

- [use-data-insights-structured-data.md](./use-data-insights-structured-data.md)
- [data-insights-structured-data.md](./data-insights-structured-data.md)
