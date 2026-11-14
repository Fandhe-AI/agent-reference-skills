---
source: https://docs.cloud.google.com/asset-inventory/docs/list-assets
---

# List Assets and Get Asset History

`ListAssets` returns a snapshot of assets and relationships in a project, folder, or organization; `BatchGetAssetsHistory` returns the change history of specific assets up to 35 days back.

## Signature / Usage

List a snapshot:

```bash
gcloud asset list \
    --SCOPE \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --content-type=CONTENT_TYPE \
    --relationship-types=RELATIONSHIP_TYPE_1,RELATIONSHIP_TYPE_2,... \
    --snapshot-time="SNAPSHOT_TIME"
```

Example (Compute Engine instances as of 2024-01-30; change the time to within the last 35 days):

```bash
gcloud asset list \
    --project=my-project \
    --asset-types=compute.googleapis.com/Instance \
    --content-type=resource \
    --snapshot-time="2024-01-30"
```

Response:

```
---
ancestors:
- projects/000000000000
- folders/000000000000
- organizations/000000000000
assetType: compute.googleapis.com/Instance
name: //compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/instance-name
resource:
  data:
    ASSET_METADATA
updateTime: '2024-01-30T00:00:00.000000Z'
```

REST:

```bash
curl -X POST \
     -H "X-HTTP-Method-Override: GET" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "assetTypes": ["compute.googleapis.com/Instance"],
            "contentType": "RESOURCE",
            "readTime": "2024-01-30T00:00:00Z"
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project/assets
```

Get asset history:

```bash
gcloud asset get-history \
    --project=my-project \
    --asset-names=//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance \
    --content-type=resource \
    --start-time="2024-01-30" \
    --end-time="2024-02-05"
```

History response (newest window first):

```
---
asset:
  ancestors:
  - projects/000000000000
  - folders/000000000000
  - organizations/000000000000
  assetType: compute.googleapis.com/Instance
  name: //compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance
  resource:
    data:
      LATEST_ASSET_METADATA
    discoveryDocumentUri: https://www.googleapis.com/discovery/v1/apis/compute/v1/rest?version=v1
    discoveryName: Instance
    location: us-central1-a
    parent: //cloudresourcemanager.googleapis.com/projects/000000000000
    version: v1
  updateTime: '2024-02-05T16:00:25.259186Z'
window:
  endTime: '2024-02-05T16:00:25.259186Z'
  startTime: '2024-02-03T16:00:28.854779Z'
```

REST history:

```bash
curl -X POST \
     -H "X-HTTP-Method-Override: GET" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "assetNames": ["//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance"],
            "contentType": "RESOURCE",
            "readTimeWindow": {
              "startTime": "2024-01-30T00:00:00Z",
              "endTime": "2024-02-05T00:00:00Z"
            }
          }' \
     https://cloudasset.googleapis.com/v1/projects/my-project:batchGetAssetsHistory
```

## Options / Props

| Flag | Command | Description |
|------|---------|-------------|
| `SCOPE` | both | `project=`, `folder=` (list only), or `organization=` |
| `--asset-types` | list | Comma-separated, RE2 regex supported; no match returns `INVALID_ARGUMENT`; omitted returns all |
| `--asset-names` | get-history | Required; comma-separated full asset names |
| `--content-type` | both | Omitted returns basic info only |
| `--relationship-types` | both | Needs Security Command Center Premium or Enterprise and `RELATIONSHIP` content type |
| `--snapshot-time` | list | At most 35 days in the past; omitted means now |
| `--start-time` | get-history | Required; at most 35 days in the past |
| `--end-time` | get-history | Optional; at most 35 days in the past; omitted means now |

## Notes

- Listing is synchronous and can strain quota for large inventories; prefer exports. The console uses `SearchAllResources`, so it only shows the `RESOURCE` content type; use gcloud, REST, or a client library for other content types.
- List limitations: not all BigQuery table fields are supported; frequently changing fields (`numBytes`, `numLongTermBytes`, `numPhysicalBytes`, `numRows`) are `null`.
- Asset history works only at organization and project level, not folders.
- Source: https://docs.cloud.google.com/asset-inventory/docs/list-assets, https://docs.cloud.google.com/asset-inventory/docs/get-asset-history (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](../asset-inventory-core/overview.md)
- [asset-types-names.md](../asset-inventory-core/asset-types-names.md)
- [export-to-bigquery.md](../asset-feeds-export/export-to-bigquery.md)
