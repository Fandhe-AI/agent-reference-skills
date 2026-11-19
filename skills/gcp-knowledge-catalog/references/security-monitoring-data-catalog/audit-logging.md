---
source: https://docs.cloud.google.com/knowledge-catalog/docs/audit-logging
---

# Audit logging for Knowledge Catalog

Cloud Audit Logs for Knowledge Catalog record administrative and data-access operations. Query them in Logs Explorer by service name and see which API methods generate Admin Activity or Data Access logs, depending on the `type` of the IAM permission each method requires.

## Signature / Usage

### View Knowledge Catalog audit logs in Logs Explorer

```text
    protoPayload.serviceName="dataplex.googleapis.com"
```

To filter one method, use `protoPayload.methodName="<method>"`, for example `protoPayload.methodName="google.cloud.dataplex.v1.CatalogService.CreateEntry"`.

## Options / Props

### Permission type to audit log category

| Permission `type` | Audit log category |
|---|---|
| `ADMIN_READ`, `DATA_READ`, `DATA_WRITE` | Data Access |
| `ADMIN_WRITE` | Admin Activity |

Methods marked (LRO) are long-running operations and usually generate two entries (start and end).

### `google.cloud.dataplex.v1.CatalogService`

| Method | Log type | Permissions | LRO |
|---|---|---|---|
| `CancelMetadataJob` | Admin Activity | `dataplex.metadataJobs.cancel` (ADMIN_WRITE) | No |
| `CreateAspectType` | Admin Activity | `dataplex.aspectTypes.create` (ADMIN_WRITE) | Yes |
| `CreateEntry` | Admin Activity | See IAM documentation | No |
| `CreateEntryGroup` | Admin Activity | `dataplex.entryGroups.create` (ADMIN_WRITE) | Yes |
| `CreateEntryType` | Admin Activity | `dataplex.entryTypes.create` (ADMIN_WRITE) | Yes |
| `CreateMetadataJob` | Admin Activity | `dataplex.aspectTypes.use`, `dataplex.entryTypes.use`, `dataplex.metadataJobs.create` (all ADMIN_WRITE) | Yes |
| `DeleteAspectType` | Admin Activity | `dataplex.aspectTypes.delete` (ADMIN_WRITE) | Yes |
| `DeleteEntry` | Admin Activity | `dataplex.entries.delete` (ADMIN_WRITE) | No |
| `DeleteEntryGroup` | Admin Activity | `dataplex.entryGroups.delete` (ADMIN_WRITE) | Yes |
| `DeleteEntryType` | Admin Activity | `dataplex.entryTypes.delete` (ADMIN_WRITE) | Yes |
| `GetAspectType` | Data Access | `dataplex.aspectTypes.get` (ADMIN_READ) | No |
| `GetEntry` | Data Access | `dataplex.entries.get` (ADMIN_READ) | No |
| `GetEntryGroup` | Data Access | `dataplex.entryGroups.get` (ADMIN_READ) | No |
| `GetEntryType` | Data Access | `dataplex.entryTypes.get` (ADMIN_READ) | No |
| `GetMetadataJob` | Data Access | `dataplex.metadataJobs.get` (ADMIN_READ) | No |
| `ListAspectTypes` | Data Access | `dataplex.aspectTypes.list` (ADMIN_READ) | No |
| `ListEntries` | Data Access | `dataplex.entries.list` (ADMIN_READ) | No |
| `ListEntryGroups` | Data Access | `dataplex.entryGroups.list` (ADMIN_READ) | No |
| `ListEntryTypes` | Data Access | `dataplex.entryTypes.list` (ADMIN_READ) | No |
| `ListMetadataJobs` | Data Access | `dataplex.metadataJobs.list` (ADMIN_READ) | No |
| `LookupEntry` | Data Access | `aiplatform.datasets.get`, `dataplex.glossaryTerms.get` (ADMIN_READ) | No |
| `UpdateAspectType` | Admin Activity | `dataplex.aspectTypes.update` (ADMIN_WRITE) | Yes |
| `UpdateEntry` | Admin Activity | See IAM documentation | No |
| `UpdateEntryGroup` | Admin Activity | `dataplex.entryGroups.update` (ADMIN_WRITE) | Yes |
| `UpdateEntryType` | Admin Activity | `dataplex.entryTypes.update` (ADMIN_WRITE) | Yes |

### `google.cloud.dataplex.v1.DataScanService`

| Method | Log type | Permissions | LRO |
|---|---|---|---|
| `CreateDataScan` | Admin Activity | `dataplex.datascans.create` (ADMIN_WRITE) | Yes |
| `DeleteDataScan` | Admin Activity | `dataplex.datascans.delete` (ADMIN_WRITE) | Yes |
| `GenerateDataQualityRules` | Data Access | `dataplex.datascans.getData` (DATA_READ) | No |
| `GetDataScan` | Data Access | `dataplex.datascans.get` (ADMIN_READ), `dataplex.datascans.getData` (DATA_READ) | No |
| `GetDataScanJob` | Data Access | `dataplex.datascans.get` (ADMIN_READ), `dataplex.datascans.getData` (DATA_READ) | No |
| `ListDataScanJobs` | Data Access | `dataplex.datascans.get` (ADMIN_READ) | No |
| `ListDataScans` | Data Access | `dataplex.datascans.list` (ADMIN_READ) | No |
| `RunDataScan` | Admin Activity | `dataplex.datascans.run` (ADMIN_WRITE) | No |
| `UpdateDataScan` | Admin Activity | `dataplex.datascans.update` (ADMIN_WRITE) | Yes |

### `google.cloud.dataplex.v1.DataplexService`

| Method | Log type | Permissions | LRO |
|---|---|---|---|
| `CancelJob` | Admin Activity | `dataplex.tasks.cancel` (ADMIN_WRITE) | No |
| `CreateAsset` | Admin Activity | `dataplex.assets.create` (ADMIN_WRITE) | Yes |
| `CreateLake` | Admin Activity | `dataplex.lakes.create` (ADMIN_WRITE) | Yes |
| `CreateTask` | Admin Activity | `dataplex.tasks.create` (ADMIN_WRITE) | Yes |
| `CreateZone` | Admin Activity | `dataplex.zones.create` (ADMIN_WRITE) | Yes |
| `DeleteAsset` | Admin Activity | `dataplex.assets.delete` (ADMIN_WRITE) | Yes |
| `DeleteLake` | Admin Activity | `dataplex.lakes.delete` (ADMIN_WRITE) | Yes |
| `DeleteTask` | Admin Activity | `dataplex.tasks.delete` (ADMIN_WRITE) | Yes |
| `DeleteZone` | Admin Activity | `dataplex.zones.delete` (ADMIN_WRITE) | Yes |
| `GetAsset` | Data Access | `dataplex.assets.get` (ADMIN_READ) | No |
| `GetJob` | Data Access | `dataplex.tasks.get` (ADMIN_READ) | No |
| `GetLake` | Data Access | `dataplex.lakes.get` (ADMIN_READ) | No |
| `GetTask` | Data Access | `dataplex.tasks.get` (ADMIN_READ) | No |
| `GetZone` | Data Access | `dataplex.zones.get` (ADMIN_READ) | No |
| `ListAssetActions` | Data Access | `dataplex.assetActions.list` (ADMIN_READ) | No |
| `ListAssets` | Data Access | `dataplex.assets.list` (ADMIN_READ) | No |
| `ListJobs` | Data Access | `dataplex.tasks.get` (ADMIN_READ) | No |
| `ListLakeActions` | Data Access | `dataplex.lakeActions.list` (ADMIN_READ) | No |
| `ListLakes` | Data Access | `dataplex.lakes.list` (ADMIN_READ) | No |
| `ListTasks` | Data Access | `dataplex.tasks.list` (ADMIN_READ) | No |
| `ListZoneActions` | Data Access | `dataplex.zoneActions.list` (ADMIN_READ) | No |
| `ListZones` | Data Access | `dataplex.zones.list` (ADMIN_READ) | No |
| `RunTask` | Admin Activity | `dataplex.tasks.run` (ADMIN_WRITE) | No |
| `UpdateAsset` | Admin Activity | `dataplex.assets.update` (ADMIN_WRITE) | Yes |
| `UpdateLake` | Admin Activity | `dataplex.lakes.update` (ADMIN_WRITE) | Yes |
| `UpdateTask` | Admin Activity | `dataplex.tasks.update` (ADMIN_WRITE) | Yes |
| `UpdateZone` | Admin Activity | `dataplex.zones.update` (ADMIN_WRITE) | Yes |

Catalog, DataScan and Dataplex method names are prefixed with the service name, for example `google.cloud.dataplex.v1.DataplexService.CreateLake`.

### `google.iam.v1.IAMPolicy` (method names have no service prefix)

| Method | Log type | Permissions | LRO |
|---|---|---|---|
| `GetIamPolicy` | Data Access | `dataplex.entryGroups.getIamPolicy` (ADMIN_READ) | No |
| `SetIamPolicy` | Admin Activity | `dataplex.assets.setIamPolicy`, `dataplex.dataProducts.setIamPolicy`, `dataplex.datascans.setIamPolicy`, `dataplex.lakes.setIamPolicy`, `dataplex.zones.setIamPolicy` (all ADMIN_WRITE) | No |

### Methods that don't produce audit logs

| Method |
|---|
| `google.cloud.location.Locations.GetLocation` |
| `google.cloud.location.Locations.ListLocations` |
| `google.longrunning.Operations.CancelOperation` |
| `google.longrunning.Operations.DeleteOperation` |
| `google.longrunning.Operations.GetOperation` |
| `google.longrunning.Operations.ListOperations` |
| `google.longrunning.Operations.WaitOperation` |

## Notes

- Methods are omitted from audit logs when they are high volume with significant log generation and storage costs, have low auditing value, or are already covered by another audit or platform log.
- Methods with `DATA_READ`, `DATA_WRITE` or `ADMIN_READ` permissions generate Data Access audit logs, and `ADMIN_WRITE` methods generate Admin Activity audit logs. The source links to "Enable Data Access audit logs", "Types of audit logs" and the "Cloud Logging pricing summary" (https://docs.cloud.google.com/logging/docs/audit/configure-data-access, https://docs.cloud.google.com/logging/docs/audit#types, https://docs.cloud.google.com/stackdriver/pricing#logs-pricing-summary) but does not itself state whether Data Access logs need to be enabled or what they cost.
- Each method has a filter of the form `protoPayload.methodName="<fully qualified method>"`; for `GetIamPolicy` and `SetIamPolicy` the method name is just `GetIamPolicy` / `SetIamPolicy`.
- Cloud Audit Logs and Logging themselves are in `gcp-observability`; for how permissions are evaluated per method see the Knowledge Catalog IAM documentation.
- Snippet: the Logs Explorer query above is the single code block of the source; the per-method filter lines in the source are inline code and are shown here in prose.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/audit-logging (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitoring.md](./monitoring.md)
- [cmek.md](./cmek.md)
