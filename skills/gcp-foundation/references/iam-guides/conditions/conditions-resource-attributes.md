---
source: https://docs.cloud.google.com/iam/docs/conditions-resource-attributes
---

# Condition Resource Attribute Values

Values for `resource.service`, `resource.type`, and `resource.name` formats, plus tag identifier forms. Only the services and types listed in the official page recognize resource attributes. This page keeps the identifiers and name formats most commonly needed; the full per-type list is on the source page.

## Signature / Usage

```text
resource.service == 'storage.googleapis.com'
resource.type == 'storage.googleapis.com/Object' &&
resource.name.startsWith('projects/_/buckets/exampleco-site-assets/')
resource.matchTag('123456789012/env', 'prod')
resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')
```

## Options / Props

### Resource service values

`agentregistry.googleapis.com`, `apigee.googleapis.com`, `apihub.googleapis.com`, `backupdr.googleapis.com`, `bigquery.googleapis.com`, `bigqueryreservation.googleapis.com`, `bigtableadmin.googleapis.com`, `binaryauthorization.googleapis.com`, `ces.googleapis.com`, `clouddeploy.googleapis.com`, `cloudkms.googleapis.com`, `cloudresourcemanager.googleapis.com`, `compute.googleapis.com`, `container.googleapis.com`, `connectors.googleapis.com`, `dataform.googleapis.com`, `dns.googleapis.com`, `firestore.googleapis.com`, `iap.googleapis.com`, `integrations.googleapis.com`, `logging.googleapis.com`, `managedkafka.googleapis.com`, `networksecurity.googleapis.com`, `parametermanager.googleapis.com`, `pubsublite.googleapis.com`, `secretmanager.googleapis.com`, `spanner.googleapis.com`, `sqladmin.googleapis.com`, `storage.googleapis.com`.

### Common resource type values

| Resource type | Resource name format |
|---|---|
| `compute.googleapis.com/Instance` | `projects/project-id/zones/zone-id/instances/instance-id` |
| `compute.googleapis.com/Disk` (zonal) | `projects/project-id/zones/zone-id/disks/disk-id` |
| `compute.googleapis.com/Disk` (regional) | `projects/project-id/regions/region-id/disks/disk-id` |
| `compute.googleapis.com/Image` | `projects/project-id/global/images/image-id` |
| `compute.googleapis.com/Snapshot` | `projects/project-id/global/snapshots/snapshot-id` |
| `compute.googleapis.com/Firewall` | `projects/project-id/global/firewalls/firewall-id` |
| `compute.googleapis.com/InstanceTemplate` | `projects/project-id/global/instanceTemplates/instance-template-id` |
| `compute.googleapis.com/BackendService` (global / regional) | `projects/project-id/global/backendServices/backend-service-id` / `projects/project-id/regions/region-id/backendServices/backend-service-id` |
| `compute.googleapis.com/ForwardingRule` (regional) / `GlobalForwardingRule` | `projects/project-id/regions/region-id/forwardingRules/forwarding-rule-id` / `projects/project-id/global/forwardingRules/forwarding-rule-id` |
| `storage.googleapis.com/Bucket` | `projects/_/buckets/bucket-name` |
| `storage.googleapis.com/Object` | `projects/_/buckets/bucket-name/objects/object-name` |
| `storage.googleapis.com/ManagedFolder` | `projects/_/buckets/bucket-name/managedFolders/managed-folder-name` |
| `storage.googleapis.com/Folder` (hierarchical namespace buckets) | `projects/_/buckets/bucket-name/folders/folder-name` |
| `bigquery.googleapis.com/Dataset` | `projects/project-id/datasets/dataset-id` |
| `bigquery.googleapis.com/Table` | `projects/project-id/datasets/dataset-id/tables/table-id` |
| `bigquery.googleapis.com/Model` / `Routine` | `projects/project-id/datasets/dataset-id/models/model-id` / `.../routines/routine-id` |
| `bigtableadmin.googleapis.com/Instance` / `Cluster` / `Table` | `projects/project-id/instances/instance-id` / `.../clusters/cluster-id` / `.../tables/table-id` |
| `spanner.googleapis.com/Instance` / `Database` / `Backup` | `projects/project-id/instances/instance-id` / `.../databases/database-id` / `.../backups/backup-id` |
| `sqladmin.googleapis.com/Instance` / `BackupRun` | `projects/project-id/instances/instance-id` / `.../backupRuns/backup-id` |
| `firestore.googleapis.com/Database` | `projects/project-id/databases/database-id` |
| `container.googleapis.com/Cluster` (zonal / regional) | `projects/project-id/zones/zone/clusters/cluster-id` / `projects/project-id/locations/location/clusters/cluster-id` |
| `cloudkms.googleapis.com/KeyRing` | `projects/project-id/locations/location-id/keyRings/keyring-id` |
| `cloudkms.googleapis.com/CryptoKey` | `projects/project-id/locations/location-id/keyRings/keyring-id/cryptoKeys/cryptokey-id` |
| `cloudkms.googleapis.com/CryptoKeyVersion` | `.../cryptoKeys/cryptokey-id/cryptoKeyVersions/cryptokeyversion-id` |
| `secretmanager.googleapis.com/Secret` | `projects/project-number/secrets/secret-id` |
| `secretmanager.googleapis.com/SecretVersion` | `projects/project-number/secrets/secret-id/versions/secret-version` |
| `logging.googleapis.com/LogBucket` / `LogView` | `projects/project-id/locations/location-id/buckets/bucket-id` / `.../views/view-id` |
| `dns.googleapis.com/ResourceRecordSet` | `projects/project-id/managedZones/zone-id/rrsets/rrset-name/rrset-type` |
| `cloudresourcemanager.googleapis.com/Project` | (Apigee parent type; see source) |
| `iap.googleapis.com/Tunnel`, `TunnelInstance`, `TunnelZone`, `Web`, `WebService`, `WebServiceVersion`, `WebType` | IAP resources; see source |

The source also lists Apigee, Apigee API Hub, BigQuery Reservation, Backup and DR, Binary Authorization, Cloud Deploy, Dataform, Integration Connectors, Managed Kafka, Cloud NGFW, Network Security Integration, Parameter Manager, Pub/Sub Lite, Agent Registry, and Customer Experience Agent Studio types.

### Resource tag identifiers

| Form | Example |
|------|---------|
| Permanent ID | `tagKeys/123456789012`, `tagValues/567890123456` |
| Short name | key `env`, value `prod` |
| Namespaced name | `123456789012/env` (organization) or `myproject/env` (project) |

## Notes

- Project IDs (alphanumeric) and project numbers (numeric) are not interchangeable in resource names; use the form the table specifies.
- Cloud Storage names use `_` instead of a project; you cannot replace it with a project ID, name, or number. For folders, managed folders, and objects, use the entire name including forward slashes.
- For a secret version, the version in the request must match the condition exactly: a condition on `latest` is not satisfied by a request for version `3`, even if `3` is the latest.
- Cloud NGFW conditions only support project-level resources, not organization-level.
- Tags can be attached to organizations, projects, and folders; any resource can inherit them.
- Source: https://docs.cloud.google.com/iam/docs/conditions-resource-attributes (retrieved 2026-11-14; CC BY 4.0)

## Related

- [conditions-attribute-reference.md](./conditions-attribute-reference.md)
- [conditions-overview.md](./conditions-overview.md)
