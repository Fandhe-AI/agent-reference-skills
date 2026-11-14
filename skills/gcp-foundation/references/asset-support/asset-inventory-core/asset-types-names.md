---
source: https://docs.cloud.google.com/asset-inventory/docs/asset-types
---

# Asset Types, Asset Names, and Relationship Types

Supported asset types (resources, policies, runtime information), the full-resource-name format used for asset names, and relationship types. The official pages are very large catalogs; this page keeps the structure, rules, and representative entries. Use the official pages for the complete lists.

## Signature / Usage

Asset type = `<service>.googleapis.com/<Kind>`. Asset name = full resource name starting with `//`. Representative mappings:

```
asset type: compute.googleapis.com/Instance
name:       //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE

asset type: compute.googleapis.com/Disk
name:       //compute.googleapis.com/projects/PROJECT_ID/zones/ZONE/disks/DISK_ID

asset type: compute.googleapis.com/Firewall
name:       //compute.googleapis.com/projects/PROJECT_ID/global/firewalls/FIREWALL

asset type: compute.googleapis.com/Network
name:       //compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK

asset type: compute.googleapis.com/Subnetwork
name:       //compute.googleapis.com/projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK

asset type: storage.googleapis.com/Bucket
name:       //storage.googleapis.com/BUCKET

asset type: bigquery.googleapis.com/Dataset
name:       //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATA_SET

asset type: bigquery.googleapis.com/Table
name:       //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATA_SET/tables/TABLE

asset type: run.googleapis.com/Service
name:       //run.googleapis.com/projects/PROJECT_ID/locations/LOCATION/services/SERVICE

asset type: iam.googleapis.com/ServiceAccount
name:       //iam.googleapis.com/projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL
            //iam.googleapis.com/projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_ID

asset type: cloudkms.googleapis.com/CryptoKey
name:       //cloudkms.googleapis.com/projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/CRYPTO_KEY

asset type: pubsub.googleapis.com/Topic
name:       //pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC

asset type: cloudresourcemanager.googleapis.com/Project
name:       //cloudresourcemanager.googleapis.com/projects/PROJECT_ID
            //cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER

asset type: cloudresourcemanager.googleapis.com/Folder
name:       //cloudresourcemanager.googleapis.com/folders/FOLDER_ID

asset type: cloudresourcemanager.googleapis.com/Organization
name:       //cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID
```

Asset names (full resource name format) are required by get asset history, monitor asset changes (feeds), and view effective IAM policy.

## Options / Props

### Asset type categories

| Category | Content type | Notes |
|----------|--------------|-------|
| Resource types | `RESOURCE` | Eventual consistency for current data, best-effort for history. Synced every few hours unless noted; a failed sync delays freshness until the next success |
| Policy types | `ACCESS_POLICY`, `IAM_POLICY`, `ORG_POLICY` | Access policy (VPC Service Controls) parent is Organization; scope Folder / Organization / Project. IAM policy data can be delayed ~36 hours; IAM policies attach to all supported resource types and all policy types except IAM policy itself. Org policies attach to Folder / Organization / Project |
| Runtime information | `OS_INVENTORY` | `compute.googleapis.com/Instance`; only in analysis, list, and search APIs |

Unless stated, resource types are available in export, list, monitor, search, and analysis APIs. Effective tags are supported only in the search APIs and not for every type.

### Per-type exceptions seen in the catalog

| Case | Behavior |
|------|----------|
| Cloud SQL, Cloud Run functions, BigQuery Data Transfer Service, Workflows | Synced every 7 hours; asset change history might be incomplete |
| Compute Engine `Address`, `BackendService`, `Disk`, `ForwardingRule` | Search and analysis APIs return global and regional (or zonal and regional) resources; list, export, query, and monitor APIs return only regional (or zonal) |
| `GlobalAddress`, `GlobalForwardingRule`, `RegionBackendService`, `RegionDisk` | Not available in analysis and search APIs; use `Address`, `ForwardingRule`, `BackendService`, `Disk` instead |
| `compute.googleapis.com/Instance` searchable attributes | `deletionProtection`, `externalIPs`, `internalIPs`, `machineType`, `networkInterfaceNetworks`, `networkInterfaceNames`, `osLongName`, `osShortName`; metadata fields `block-project-ssh-keys`, `enable-oslogin`, `enable-osconfig`, `serial-port-enable` |
| Many services (for example AlloyDB, Cloud Run `DomainMapping`, Apigee) | Marked "Not available in the analysis APIs" |
| API keys, App Engine | `location` field might not be populated |
| Access Policy (Access Context Manager) | Retrieve all access policies in export/list/monitor APIs with `contentType` `ACCESS_POLICY` (gcloud `--content-type=access-policy`) |

### Relationship types

Relationship types require Security Command Center Premium or Enterprise tier, are supported in the export, list, search-history, and monitor APIs, and (unless a type says otherwise) not in analysis and search APIs. Examples by asset type:

| Asset type | Relationship types (examples) |
|------------|-------------------------------|
| `compute.googleapis.com/Instance` | `COMPUTE_INSTANCE_USE_DISK`, `COMPUTE_INSTANCE_IS_IN_TARGET_POOL`, `COMPUTE_INSTANCE_TO_K8S_NODE`, `INSTANCE_TO_INSTANCEGROUP`, `INSTANCE_TO_INSTANCEGROUPMANAGER` |
| `compute.googleapis.com/Disk` | `COMPUTE_DISK_BOOTED_FROM_IMAGE`, `COMPUTE_DISK_BOOTED_FROM_SNAPSHOT`, `COMPUTE_DISK_USED_BY_INSTANCE` |
| `compute.googleapis.com/BackendService` | `COMPUTE_BACKEND_SERVICE_TO_FORWARDING_RULE`, `..._TO_INSTANCE_GROUP`, `..._TO_NETWORK_ENDPOINT_GROUP`, `..._TO_URLMAP` |
| `container.googleapis.com/Cluster` | `GKE_CLUSTER_TO_NODE_POOL`, `GKE_CLUSTER_TO_K8S_NAMESPACE`, `GKE_CLUSTER_TO_K8S_NODE`, `GKE_CLUSTER_TO_GKEHUB_MEMBERSHIPS` |
| `k8s.io/Node` | `NODE_TO_CLUSTER`, `NODE_TO_COMPUTE_INSTANCE` |
| `pubsub.googleapis.com/Topic` / `Subscription` | `PUBSUB_TOPIC_TO_SUBSCRIPTION` / `PUBSUB_SUBSCRIPTION_TO_TOPIC` |
| `storage.googleapis.com/Bucket` | `STORAGE_BUCKET_TO_COMPUTE_BACKEND_BUCKET` |
| `appengine.googleapis.com/Application`, `Service`, `Version` | `APP_ENGINE_APPLICATION_TO_SERVICE`, `APP_ENGINE_SERVICE_TO_VERSION`, `VERSION_TO_SERVICE`, and others |
| `bigtableadmin.googleapis.com/Instance` | `BIGTABLE_INSTANCE_TO_CLUSTER`, `BIGTABLE_INSTANCE_TO_TABLE`, `BIGTABLE_INSTANCE_TO_APP_PROFILE` |

Types marked in the official table as available in analysis/search: `INSTANCE_TO_INSTANCEGROUP`, `INSTANCE_TO_INSTANCEGROUPMANAGER`, `COMPUTE_INSTANCE_IS_IN_TARGET_POOL`, `INSTANCEGROUP_TO_INSTANCEGROUPMANAGER`, `SERVICE_TO_APPLICATION`, `VERSION_TO_APPLICATION`, `VERSION_TO_SERVICE`, `NODE_TO_CLUSTER`, `NODE_TO_COMPUTE_INSTANCE`, `NAMESPACE_TO_CLUSTER` (these rows carry no "Not available in the analysis and search APIs" text).

## Notes

- Compute Engine instance names use `INSTANCE` as the name; Project can be addressed by ID or number; Pub/Sub deleted topics use `//pubsub.googleapis.com/_deleted-topic_`.
- The official lists change often; check the official asset types, asset names, and relationship types pages before relying on a specific entry.
- Source: https://docs.cloud.google.com/asset-inventory/docs/asset-types, https://docs.cloud.google.com/asset-inventory/docs/asset-names, https://docs.cloud.google.com/asset-inventory/docs/relationship-types (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [list-and-history.md](../asset-analysis/list-and-history.md)
- [feeds-pubsub.md](../asset-feeds-export/feeds-pubsub.md)
