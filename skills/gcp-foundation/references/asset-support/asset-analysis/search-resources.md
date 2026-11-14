---
source: https://docs.cloud.google.com/asset-inventory/docs/search-resources
---

# Search Resources

Search for resources in a project, folder, or organization with `searchAllResources` and filter the results with a query.

## Signature / Usage

Before you begin: enable the Cloud Asset Inventory API and hold `cloudasset.assets.searchAllResources` (plus `serviceusage.services.use`). To construct a query, first run a search with no query, then use fields and values from the full response to build and refine a query using the search query syntax. Console: Asset Inventory page, choose scope, **Resource** tab, type in **Filter**; **View query** shows the gcloud command and **Download CSV** exports results.

```bash
gcloud asset search-all-resources \
    --scope=SCOPE_PATH \
    --query="QUERY" \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --order-by="ORDER_BY" \
    --read-mask="READ_MASK"
```

Example: Compute Engine instances in `my-project` whose name has the word `instance` followed by `1`, sorted descending, returning only `name` and `location`:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="name:instance 1" \
    --asset-types=compute.googleapis.com/Instance \
    --order-by="name DESC" \
    --read-mask="name,location"
```

Response:

```
---
location: us-central1-a
name: //compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/instance-2-1
---
location: us-central1-a
name: //compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/instance-1
```

REST equivalent:

```bash
curl -X POST \
     -H "X-HTTP-Method-Override: GET" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "query": "name:instance 1",
            "assetTypes": ["compute.googleapis.com/Instance"],
            "orderBy": "name DESC",
            "readMask": "name,location"
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project:searchAllResources
```

### Additional examples (gcloud)

All resources in a project:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --format="table(assetType.basename(), name.basename(), name.scope(projects).segment(0):label=PROJECT_ID, labels)"
```

Compute Engine instances by exact description:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="description=instance-prod" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, location)"
```

By label (existence check on key `env`):

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="labels.env:*" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, labels)"
```

By TagKey, and by TagValue with negation:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="tagKeys:env" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, tags)"

gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="tagValues:(prod OR sea) (NOT name:instance1)" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, tags)"
```

Created after a time, located in the US, running:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="createTime>2023-31-12" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, location)"

gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="location:us-*" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, location)"

gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="state=RUNNING" \
    --asset-types=compute.googleapis.com/Instance \
    --read-mask="name,assetType,location,versionedResources" \
    --format="table(name, assetType, location, versionedResources)"
```

IAM deny policies, and related resources:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --asset-types=iam.googleapis.com/PolicyV2 \
    --query="name:denypolicies"

gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="relationships:instance-group" \
    --format="table(name, assetType, relationships)"
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--scope` | `projects/PROJECT_ID` (or number), `folders/FOLDER_ID`, or `organizations/ORGANIZATION_ID` |
| `--query` | Optional; empty or omitted searches all resources in scope |
| `--asset-types` | Optional comma-separated searchable asset types; RE2 regex supported; no match returns `INVALID_ARGUMENT`; omitted returns all |
| `--order-by` | Comma-separated fields; ascending by default, add `DESC` for descending |
| `--read-mask` | Comma-separated fields to return; see the gcloud reference for default fields |
| `--format`, `--flatten` | Standard gcloud output formatting |

## Notes

- Searching is synchronous and can strain quotas for large inventories; prefer asynchronous exports for large inventories.
- Not all resources are searchable; check the asset types page. Searchable query fields are listed in the `ResourceSearchResult` reference.
- The official time example is `createTime>2023-31-12`; the query syntax documents UTC+0 `YYYY-MM-DD` dates, so use `YYYY-MM-DD` (for example `2023-12-31`) when querying.
- The Console lists up to the results visible in the **Results** table; use **Filter results** to narrow.
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-resources (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [search-query-syntax.md](./search-query-syntax.md)
- [search-iam-policies.md](./search-iam-policies.md)
- [../asset-inventory-core/access-control-quotas.md](../asset-inventory-core/access-control-quotas.md)
