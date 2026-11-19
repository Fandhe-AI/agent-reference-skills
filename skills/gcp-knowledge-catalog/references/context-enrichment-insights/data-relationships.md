---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-relationships
---

# Data Relationships

Preview. Data relationships in Knowledge Catalog (formerly Dataplex Universal Catalog) let you find related BigQuery tables and views and inspect how they connect, and give AI agents structural context for more accurate query generation.

## Signature / Usage

Discovered relationships are stored as `EntryLinks` between two entries; join columns and the relationship source are aspects of the entry link. Retrieve them with `LookupEntryLinks` (all entry links that reference an entry as source or target) or `LookupContext` (a single grounding endpoint returning a concise pre-formatted metadata package, including related data assets). The source shows no request code. Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/use-data-insights-structured-data (list entry links for a table entry).

Adapted (not in the official docs): the `gcurl` alias is a shell function so it also works in scripts.

```bash
gcurl() { curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" "$@"; }
```

Adapted (not in the official docs): the request is `lookupEntryLinks` with the full Entry name in the `entry` query parameter (the page's `entryGroups/@bigquery/entryLinks?filter=...` request is not a method in the Discovery document).

```bash
gcurl -G "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:lookupEntryLinks" \
  --data-urlencode "entry=projects/PROJECT_ID/locations/LOCATION/entryGroups/@bigquery/entries/bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID"
```

`entry` is the full Entry resource name of the BigQuery table. Each response returns at most 10 entry links (`pageSize` maximum is 10); pass `nextPageToken` as `pageToken` with the same other parameters to read the next page.

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
- Adapted from the official docs: the page shows `gcurl -X GET ".../entryGroups/@bigquery/entryLinks?filter=entry_references.name=..."`, but `entryGroups.entryLinks` has only create/delete/get/patch and no `filter` (rest/dataplex/dataplex-1.md); `projects.locations.lookupEntryLinks` (dataplex-2.md) takes the required `entry` query parameter and `pageSize` max 10. The `gcurl` alias (from reuse-data-quality-rules) is written as a function so it works in scripts.

## Related

- [use-data-insights-structured-data.md](./use-data-insights-structured-data.md)
- [data-insights-structured-data.md](./data-insights-structured-data.md)
