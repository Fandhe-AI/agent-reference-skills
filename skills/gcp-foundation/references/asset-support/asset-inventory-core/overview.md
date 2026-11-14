---
source: https://docs.cloud.google.com/asset-inventory/docs/asset-inventory-overview
---

# Cloud Asset Inventory Overview

Cloud Asset Inventory is a global metadata inventory service to view, search, export, monitor, and analyze Google Cloud asset metadata. It is built for compliance tracking, scheduled audits, and analytics, not for real-time queries.

## Signature / Usage

Ways to work with assets:

| Task | Capability |
|------|------------|
| List | List assets and relationships in a project, folder, or organization; get asset history up to 35 days |
| Search | Search resources and IAM allow policies with a custom query language, or query assets with BigQuery SQL |
| Export | Export asset metadata to BigQuery or Cloud Storage |
| Analyze | Analyze moving a resource to another project; analyze IAM and organization policies; view effective IAM policies |
| Monitor | Set up and subscribe to a feed |
| Insights | Generate insights from assets to improve security posture |

Asset metadata sources: Google Cloud resources (Compute Engine VMs, Cloud Storage buckets, App Engine instances), policies set on resources (IAM, organization policies, Access Context Manager), and runtime information from OS inventory management.

Create/update/delete history is kept for up to 35 days. Assets unchanged in the past 35 days return their latest status.

### Content types

If no content type is specified, only a basic response is returned (asset name, last update time, and the projects, folders, and organizations it belongs to). RPC and REST names are identical; gcloud names differ.

| RPC / REST | gcloud | Description |
|------------|--------|-------------|
| `ACCESS_POLICY` | `access-policy` | Access Context Manager policy set on an asset |
| `IAM_POLICY` | `iam-policy` | IAM policy binding to the resource |
| `ORG_POLICY` | `org-policy` | Legacy organization policy v1. For org policy v2 use `resource` with resource type `orgpolicy.googleapis.com/Policy` |
| `OS_INVENTORY` | `os-inventory` | Runtime OS inventory (requires VM Manager setup) |
| `RELATIONSHIP` | `relationship` | Requires Security Command Center Premium or Enterprise tier. Data available from May 30th, 2022; a relationship can have its own update timestamp |
| `RESOURCE` | `resource` | The resource's metadata |

Response with no content type:

```
---
ancestors:
- projects/PROJECT_NUMBER
- folders/FOLDER_NUMBER
- organizations/ORGANIZATION_ID
assetType: compute.googleapis.com/Instance
name: //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME
updateTime: '2023-11-15T12:28:30.087825Z'
```

Response with `IAM_POLICY`:

```
---
ancestors:
- projects/PROJECT_NUMBER
- folders/FOLDER_NUMBER
- organizations/ORGANIZATION_ID
assetType: compute.googleapis.com/Instance
iamPolicy:
  bindings:
  - members:
    - user:USER_EMAIL_ADDRESS
    role: roles/compute.securityAdmin
  etag: ETAG
name: //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME
updateTime: '2023-12-19T23:35:42.673842Z'
```

Response with `RELATIONSHIP` (specific relationship types can be requested instead of all):

```
---
ancestors:
- projects/PROJECT_NUMBER
- folders/FOLDER_NUMBER
- organizations/ORGANIZATION_ID
assetType: compute.googleapis.com/Instance
name: //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME
relatedAsset:
  ancestors:
  - projects/PROJECT_NUMBER
  - folders/FOLDER_NUMBER
  - organizations/ORGANIZATION_ID
  asset: //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/disks/INSTANCE_NAME
  assetType: compute.googleapis.com/Disk
  relationshipType: COMPUTE_INSTANCE_USE_DISK
updateTime: '2023-12-19T23:35:42.673842Z'
```

Response with `RESOURCE` (truncated here; the full response contains all VM metadata under `resource.data`):

```
---
ancestors:
- projects/PROJECT_NUMBER
- folders/FOLDER_NUMBER
- organizations/ORGANIZATION_ID
assetType: compute.googleapis.com/Instance
name: //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME
resource:
  data:
    canIpForward: false
    cpuPlatform: AMD Rome
    machineType: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/machineTypes/n2d-standard-2
    name: INSTANCE_NAME
    status: RUNNING
    zone: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE
  discoveryDocumentUri: https://www.googleapis.com/discovery/v1/apis/compute/v1/rest
  discoveryName: Instance
  location: ZONE
  parent: //cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER
  version: v1
updateTime: '2023-11-15T12:28:30.087825Z'
```

### Consistency model

- Eventual consistency: periodic data synchronization means new or modified resources might not be immediately queryable; indexing delays can propagate to search queries, feeds, and exports.
- Potential for data/event loss: information from other Google Cloud services can have temporary drops, lag, or out-of-order delivery.

## Notes

- Not designed for real-time queries where missing or stale data could break production availability or security enforcement. Call the service's API directly for live data.
- The `ancestors` field can be inconsistent across content types because each content type has its own ingestion schedule. Check `update_time`; contact Cloud Customer Care if inconsistency lasts more than 24 hours.
- Source: https://docs.cloud.google.com/asset-inventory/docs/asset-inventory-overview (retrieved 2026-11-14; content CC BY 4.0, code samples Apache 2.0)

## Related

- [asset-types-names.md](./asset-types-names.md)
- [access-control-quotas.md](./access-control-quotas.md)
- [list-and-history.md](../asset-analysis/list-and-history.md)
