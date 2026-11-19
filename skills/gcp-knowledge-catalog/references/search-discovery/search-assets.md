---
source: https://docs.cloud.google.com/knowledge-catalog/docs/search-assets
---

# Search for Resources in Knowledge Catalog

Search lets you find cataloged data assets across your organization with natural language or keyword queries, narrow results with metadata filters, and open an entry to see its description, stewards and attached aspects. This page covers the console, gcloud, client libraries and REST for searching (`searchEntries`) and for viewing an entry (`lookupEntry`).

## Signature / Usage

### Search with gcloud

```bash
gcloud dataplex entries search 'foo' \
  --project=PROJECT_ID \
  --semantic-search
```

### Search with Python

```python
# This snippet has been automatically generated and should be regarded as a
# code template only.
# It will require modifications to work:
# - It may require correct/in-range values for request initialization.
# - It may require specifying regional endpoints when creating the service
#   client as shown in:
#   https://googleapis.dev/python/google-api-core/latest/client_options.html
from google.cloud import dataplex_v1


def sample_search_entries():
    # Create a client
    client = dataplex_v1.CatalogServiceClient()

    # Initialize request argument(s)
    request = dataplex_v1.SearchEntriesRequest(
        name="name_value",
        query="query_value",
    )

    # Make the request
    page_result = client.search_entries(request=request)

    # Handle the response
    for response in page_result:
        print(response)
```

### Search with REST

Adapted (not in the official docs): the location is `global`, the only location `searchEntries` accepts for `name`.

```text
POST https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/global:searchEntries?query=foo&semanticSearch=true
```

### View an entry with gcloud

```bash
gcloud dataplex entries lookup ENTRY_ID \
  --entry-group=ENTRY_GROUP_ID \
  --location=LOCATION \
  --project=PROJECT_ID
```

### View an entry with Python

```python
# This snippet has been automatically generated and should be regarded as a
# code template only.
# It will require modifications to work:
# - It may require correct/in-range values for request initialization.
# - It may require specifying regional endpoints when creating the service
#   client as shown in:
#   https://googleapis.dev/python/google-api-core/latest/client_options.html
from google.cloud import dataplex_v1


def sample_lookup_entry():
    # Create a client
    client = dataplex_v1.CatalogServiceClient()

    # Initialize request argument(s)
    request = dataplex_v1.LookupEntryRequest(
        name="name_value",
        entry="entry_value",
    )

    # Make the request
    response = client.lookup_entry(request=request)

    # Handle the response
    print(response)
```

## Options / Props

### Required roles

| Task | Role |
|---|---|
| Search for entries | `roles/dataplex.catalogAdmin` (Dataplex Catalog Admin), `roles/dataplex.catalogEditor` (Dataplex Catalog Editor) or `roles/dataplex.catalogViewer` (Dataplex Catalog Viewer) on the project used for search |
| Search for metadata of BigQuery datasets and tables | `roles/bigquery.metadataViewer` (BigQuery Metadata Viewer) on the dataset or table |
| Search for custom entries | `roles/dataplex.catalogViewer` on the project used for search |
| Enable the Dataplex API | `serviceusage.services.enable` permission (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) |

### Console filters

| Filter | Meaning |
|---|---|
| Scope | Organization (default), current project, or only starred data assets |
| Systems | Google Cloud service the asset belongs to, such as BigQuery; the Knowledge Catalog system contains entry groups |
| Projects | Projects to search in |
| Type | Data asset type (BigQuery connection, Cloud Storage bucket, database); subtype such as connection type or SQL dialect where applicable |
| Select locations | Locations to search in |
| Select datasets | Limits results to BigQuery assets in the selected datasets |
| Aspect types | Aspect types attached to the asset; filter on aspect type values to select values |

### Method parameters

| Parameter | Meaning |
|---|---|
| `query` | Search query (`?query=foo` in REST) |
| `semanticSearch` | `true` for natural language search (`--semantic-search` in gcloud) |
| `pageSize` | If <=0 defaults to 10; max 1000 (more is an invalid argument) |
| `orderBy` | `relevance`, `last_modified_timestamp` or `last_modified_timestamp asc` |
| `scope` | `organizations/<org_id>` or `projects/<project_ref>`; defaults to the organization of the project in `name` |
| `name` | `projects/{project}/locations/global` for `searchEntries`; `projects/{project}/locations/{location}` for `lookupEntry` |
| `entry` (lookup) | `projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}` |
| `view`, `aspectTypes`, `paths` (lookup) | `aspectTypes` and `paths` limit returned aspects and only work with the CUSTOM view |

## Notes

- Filters in different console sections are combined with `AND`; multiple filters within one section are combined with `OR`.
- Knowledge Catalog indexes each shard of a date-sharded table as a separate table, so search returns every shard (for example `my_table20240312` and `my_table20240311`).
- Search results depend on your read permissions for the asset in its source system (for example BigQuery Metadata Viewer for a table; Cloud SQL permissions for a Cloud SQL instance), independently of the selected project.
- Limitations: public data assets and aspects attached to entry links are outside the scope of natural language search.
- Adapted from the official docs: the REST search call in the source is shown as a request line only, with `locations/LOCATION` described as the region of the project (for example `us-central1`); the Discovery document and the `name` parameter above give `projects/{project}/locations/global` for `searchEntries`, so the example uses `global` (rest/dataplex/dataplex-2.md). The Node.js sample's `name` and `query` are commented-out template variables and are not reproduced.
- The Python blocks are auto-generated templates with placeholder values; set `name` to `projects/{project}/locations/global` (search) or `projects/{project}/locations/{location}` (lookup) before use.
- The source also shows Console, C#, Go, Java, Node.js, PHP and Ruby forms. Authentication uses Application Default Credentials.
- Entry-view details show entry type, system, platform, fully qualified name, creation and last modification time, description and stewards; the Aspects section lists required and optional aspects.
- The BigQuery tables returned by search are in `gcp-bigquery`; Knowledge Catalog catalogs them.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/search-assets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-search.md](./about-search.md)
- [search-syntax.md](./search-syntax.md)
