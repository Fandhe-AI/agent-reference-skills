---
source: https://docs.cloud.google.com/knowledge-catalog/docs/use-data-insights-structured-data
---

# Use Data Insights for Structured Data

How to generate, review and manage AI-generated descriptions, sample queries and relationship graphs in Knowledge Catalog (formerly Dataplex Universal Catalog). BigQuery resources get insights only in BigQuery Studio; Apache Iceberg, Apache Hive and SAP BDC tables and namespaces managed by Lakehouse are generated in Knowledge Catalog (Preview).

## Signature / Usage

### Custom instructions example (Preview)

```text
LANGUAGE: Always write column descriptions in uppercase.

DOMAIN_CONTEXT:
- This dataset supports the Order-to-Cash process for the EMEA commercial
  sales team.
- Primary consumers are finance analysts and regional sales managers, not
  engineers.

RELATIONSHIPS:
- returns.order_item_id → order_items.id (one-to-one; use LEFT JOIN to
  preserve unreturned items)
```

### List entry links for a table entry

Adapted (not in the official docs): the `gcurl` alias is a shell function so it also works in scripts.

```bash
gcurl() { curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" "$@"; }
```

Adapted (not in the official docs): the request is `lookupEntryLinks` with the full Entry name in the `entry` query parameter (the page's `entryGroups/@bigquery/entryLinks?filter=...` request is not a method in the Discovery document).

```bash
gcurl -G "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:lookupEntryLinks" \
  --data-urlencode "entry=projects/PROJECT_ID/locations/LOCATION/entryGroups/@bigquery/entries/bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID"
```

Replace `PROJECT_ID` (project ID), `LOCATION` (region where the datascan is triggered), `DATASET_ID` and `TABLE_ID` (the BigQuery table). `entry` is the full Entry resource name. Each response returns at most 10 entry links (`pageSize` maximum is 10); pass `nextPageToken` as `pageToken` to read the next page.

### Update the `schema-join` aspect of an entry link

```bash
gcurl -X PATCH "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/entryGroups/@bigquery/entryLinks/ENTRYLINK_ID?aspectKeys=dataplex-types.global.schema-join" \
-d '{
  "aspects": {
    "dataplex-types.global.schema-join": {
      "data": {
        "joins": [
          {
            "source": { "name": "PROJECT_ID.DATASET_ID.SOURCE_TABLE", "fields": ["SOURCE_FIELD"] },
            "target": { "name": "PROJECT_ID.DATASET_ID.TARGET_TABLE", "fields": ["TARGET_FIELD"] },
            "type": "JOIN",
            "inferenceSource": "USER"
          }
        ],
        "userManaged": false
      }
    }
  }
}'
```

Replace `ENTRYLINK_ID` with the entry link ID found above, `DATASET_ID`, `SOURCE_TABLE`, `SOURCE_FIELD`, `TARGET_TABLE` and `TARGET_FIELD` with the join columns.

## Options / Props

### Required roles

| Role | Resource | Purpose |
|---|---|---|
| `roles/dataplex.dataScanDataViewer` | Project containing the resource | Read-only access to generated insights |
| `roles/biglake.viewer` | Resource | Read Apache Iceberg, Apache Hive, or SAP BDC table data |
| `roles/dataplex.catalogEditor` | Resource | Publish descriptions as aspects |
| `roles/dataplex.entryOwner` | Resource | Publish queries as aspects |

Required permissions: `dataplex.datascans.create`, `dataplex.datascans.get`, `dataplex.datascans.getData`, `dataplex.datascans.run`. Enabling APIs needs `serviceusage.services.enable` (for example through `roles/serviceusage.serviceUsageAdmin`).

### APIs to enable

| API |
|---|
| Dataplex API |
| BigQuery API |
| Gemini for Google Cloud API |

### Generate options for Iceberg tables and namespaces (Preview)

| Option | Values |
|---|---|
| Insight type | BigQuery SQL (GoogleSQL; tables and namespaces); Spark SQL (BigLake Iceberg REST Catalog tables only) |
| Publish condition | On: attach permanently as metadata aspects (indexable, searchable, visible to others). Off: view temporarily in the session |
| Custom instructions | Optional guidance and domain context |
| Region | Required to pick the processing region when the resource is in a multi-region |

### Source priority for relationships

| Priority | Source |
|---|---|
| 1 | `USER` (manual edits) |
| 2 | `TABLE_CONSTRAINTS` |
| 3 | `QUERY_HISTORY` |
| 4 | `AGENT` (LLM suggestions) |

## Notes

- Updating descriptions and relationships for tables, and descriptions for datasets, is possible only through the Dataplex API (`entries.patch`). Queries can be edited in the Console (Source defaults to Agent; set to User to stop regeneration overriding it; `User managed` = True protects the whole query set of the aspect) or through `entries.patch`.
- Entry links store discovered relationships with a `schema-join` aspect. `UpdateEntryLink` (PATCH) replaces the entire aspect and doesn't merge the `joins` list, so a payload with one join removes all existing joins. To add a relationship, first retrieve the current `schema-join` aspect and include all existing joins in the request body.
- To keep manual changes from being overwritten, set `userManaged: true` at the aspect level (skips all automated updates) and `inferenceSource: "USER"` in specific join entries. `AGENT`-derived relationships are removed if a later scan no longer recommends them.
- Adapted from the official docs: the page lists entry links with `gcurl -X GET ".../entryGroups/@bigquery/entryLinks?filter=entry_references.name=\"TABLE_ENTRY_NAME\""` and describes `TABLE_ENTRY_NAME` as `bigquery.googleapis.com/projects/...`. `entryGroups.entryLinks` has only create/delete/get/patch and no `filter` (rest/dataplex/dataplex-1.md); `projects.locations.lookupEntryLinks` (dataplex-2.md) takes the required `entry` query parameter (a full Entry name) and `pageSize` max 10. The `gcurl` alias (from reuse-data-quality-rules) is written as a function so it works in scripts; the PATCH example below uses the same `gcurl`.
- Gemini in BigQuery is part of Gemini for Google Cloud and doesn't support the same compliance and security offerings as BigQuery; set it up only for projects that don't require compliance offerings unsupported by Gemini for Google Cloud. The Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.
- Insight generation takes a few minutes. The PATCH changes metadata in the catalog; try it on a test entry link first.
- The source also shows Console steps for BigQuery Studio and Knowledge Catalog Search. Lakehouse is the former BigLake. BigQuery tables and Gemini in BigQuery setup are in `gcp-bigquery`.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/use-data-insights-structured-data (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-insights-structured-data.md](./data-insights-structured-data.md)
- [data-relationships.md](./data-relationships.md)
