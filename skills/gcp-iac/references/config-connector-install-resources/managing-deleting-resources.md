---
source: https://docs.cloud.google.com/config-connector/docs/how-to/managing-deleting-resources
---

# Managing and deleting resources

When you define a resource, Config Connector creates it if it does not exist, or acquires and starts managing it if a resource with the same name already exists in the organization, project or folder. By default, deleting the Config Connector object deletes the Google Cloud resource.

## Signature / Usage

### Acquire an existing BigQuery dataset

Enable the BigQuery API and make sure the `bq` tool is available. Create a dataset, then acquire it:

```bash
bq --location=US mk \
--dataset \
--default_table_expiration 3600 \
--description description \
PROJECT_ID:bigquerydatasetsample
```

`bq-sample.yaml`:

```yaml
apiVersion: bigquery.cnrm.cloud.google.com/v1beta1
kind: BigQueryDataset
metadata:
  name: bigquerydatasetsample
spec:
  defaultTableExpirationMs: 3600000
  description: "BigQuery Dataset Sample"
  friendlyName: bigquerydataset-sample
  location: US
```

```bash
kubectl apply --namespace CC_NAMESPACE -f bq-sample.yaml
```

```bash
kubectl describe --namespace CC_NAMESPACE bigquerydataset bigquerydatasetsample
```

### Delete the dataset

```bash
kubectl delete --namespace CC_NAMESPACE -f bq-sample.yaml
```

```text
bigquerydataset.bigquery.cnrm.cloud.google.com "bigquerydatasetsample" deleted
```

```bash
bq show PROJECT_ID:bigquerydatasetsample
```

### Keep resources after deletion

Add the `abandon` deletion policy before deleting the Config Connector resource:

```yaml
apiVersion: bigquery.cnrm.cloud.google.com/v1beta1
kind: BigQueryDataset
metadata:
  name: bigquerydatasetsample
  annotations:
    cnrm.cloud.google.com/deletion-policy: abandon
spec:
  defaultTableExpirationMs: 3600000
  description: "BigQuery Dataset Sample"
  friendlyName: bigquerydataset-sample
  location: US
```

## Options / Props

### Resources with a service-generated resource ID (acquire only with `resourceID`)

| Config Connector resource |
|---|
| `AccessContextManagerAccessPolicy` |
| `ApigeeOrganization` |
| `BigQueryDataTransferConfig` |
| `BillingBudgetsBudget` |
| `CloudIdentityGroup` |
| `CloudIdentityMembership` |
| `ComputeFirewallPolicy` |
| `DLPDeidentifyTemplate` |
| `DLPInspectTemplate` |
| `DLPJobTrigger` |
| `DLPStoredInfoType` |
| `DataCatalogPolicyTag` |
| `DataCatalogTaxonomy` |
| `EssentialContactsContact` |
| `Folder` |
| `IAPBrand` |
| `IAPIdentityAwareProxyClient` |
| `IdentityPlatformTenant` |
| `MonitoringAlertPolicy` |
| `MonitoringGroup` |
| `MonitoringNotificationChannel` |
| `MonitoringUptimeCheckConfig` |
| `RecaptchaEnterpriseKey` |
| `ResourceManagerLien` |
| `SQLSSLCert` |
| `SecretManagerSecretVersion` |
| `StorageNotification` |
| `StorageTransferJob` |
| `TagsTagBinding` |
| `TagsTagKey` |
| `TagsTagValue` |
| `VertexAIDataset` |
| `VertexAIIndex` |

### Resources that cannot be acquired

| Config Connector resource |
|---|
| `DataflowFlexTemplateJob` |
| `FirestoreIndex` |
| `IAMServiceAccountKey` |

## Notes

- Warning from the source: when deleting a Config Connector resource, the associated Google Cloud resource is deleted by default. To keep it, set `cnrm.cloud.google.com/deletion-policy: abandon` before deleting. The warning's elided fragment (`... metadata: annotations: ...`) is not shown; the full BigQuery `abandon` example that follows it on the same source page is shown instead. Try deletion on a disposable project first.
- Acquisition happens when manifest values and the resource name match; if a resource has no name (for example a Project ID), the resource's ID is used.
- Resources with a service-generated resource ID can only be acquired with the `resourceID` field. `Folder` is a special case: set `resourceID` to the ID of an existing folder to acquire it; if `resourceID` is unspecified, `Folder` acquires the folder with the given `displayName` in the given parent folder or organization, and creates a new folder if none is found.
- Replace `CC_NAMESPACE` with the namespace Config Connector manages resources from. The source also shows `bq` checks that print `Not Found` after deletion.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/managing-deleting-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-resources-with-resource-ids.md](./managing-resources-with-resource-ids.md)
- [annotations.md](./annotations.md)
- [getting-started.md](./getting-started.md)
