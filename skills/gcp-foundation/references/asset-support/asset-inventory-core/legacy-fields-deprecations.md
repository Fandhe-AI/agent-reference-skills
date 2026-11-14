---
source: https://docs.cloud.google.com/asset-inventory/docs/legacy-fields
---

# Legacy Fields and Deprecations

Legacy field names kept for backward compatibility in `BatchGetAssetsHistory`, `ExportAssets`, and `ListAssets` (all Compute Engine), resources that still populate the deprecated `kmsKey` field in search results, and the API deprecation record.

## Signature / Usage

Legacy names are not in the discovery document; prefer the current name. Query exported BigQuery data with the current name:

```sql
SELECT firewall.name, sourceRanges
FROM `PROJECT_ID.DATASET_ID.STRUCTURED_INSTANCE_TABLE_NAME` AS firewall
JOIN UNNEST(firewall.resource.data.sourceRanges) AS sourceRanges
```

(Snippet taken from the Cloud Asset Inventory BigQuery export page: https://docs.cloud.google.com/asset-inventory/docs/export-bigquery)

## Options / Props

Current vs legacy field names (resource type, current, legacy). Singular legacy names are the repeated-field singular forms:

| Resource type | Current field name | Legacy field name |
|---------------|--------------------|-------------------|
| `BackendBucket` / `BackendService` / `RegionBackendService` | `cdnPolicy.bypassCacheOnRequestHeaders`, `customResponseHeaders` | `cdnPolicy.bypassCacheOnRequestHeader`, `customResponseHeader` |
| `BackendService` / `RegionBackendService` | `cdnPolicy.cacheKeyPolicy.includeHttpHeaders`, `includeNamedCookies`, `securitySettings.clientTlsPolicy`, `securitySettings.subjectAltNames` | `...includeHttpHeader`, `...includeNamedCookie`, `securitySettings.authentication`, `securitySettings.subjectAltName` |
| `BackendBucket` | `cdnPolicy.includeHttpHeaders` | `cdnPolicy.includeHttpHeader` |
| `ExternalVpnGateway`, `VpnGateway` | `interfaces`, `vpnInterfaces` | `interface`, `vpnInterface` |
| `FirewallPolicy` | `rules.match.srcSecureTags`, `targetSecureTags` | `rules.match.srcSecureTag`, `targetSecureTag` |
| `ForwardingRule`, `GlobalForwardingRule` | `metadataFilters` | `metadataFilter` |
| `GlobalAddress` | `users` | `user` |
| `Image` | `shieldedInstanceInitialState.dbs` / `dbxs` / `keks` | `...db` / `dbx` / `kek` |
| `Instance` | `disks.initializeParams.licenses`, `disks.initializeParams.resourcePolicies`, `disks.shieldedInstanceInitialState.dbs`/`dbxs`/`keks`, `networkInterfaces.ipv6AccessConfigs`, `reservationAffinity` | singular forms; `allocationAffinity` |
| `InstanceTemplate` | `properties.disks.initializeParams.licenses`, `properties.disks.initializeParams.resourcePolicies`, `properties.disks.shieldedInstanceInitialState.*`, `properties.networkInterfaces`, `properties.reservationAffinity`, `properties.resourcePolicies` | singular forms; `properties.allocationAffinity` |
| `Interconnect`, `InterconnectAttachment` | `circuitInfos`, `candidateIpv6Subnets`, `ipsecInternalAddresses` | `circuitInfo`, `candidateIpv6Subnet`, `ipsecInternalAddress` |
| `NodeTemplate` | `accelerators`, `disks` | `accelerator`, `disk` |
| `PacketMirroring` | `filter.cidrRanges`, `filter.ipProtocols`, `network` | `filter.cidrRange`, `filter.ipProtocol`, `mirroredNetwork` |
| `ResourcePolicy` | `resourceStatus.instanceSchedulePolicy`, `snapshotSchedulePolicy.schedule.weeklySchedule.dayOfWeeks`, `snapshotSchedulePolicy.snapshotProperties.storageLocations` | `resourceStatus.instanceSchedulePolicyStatus`, `...dayOfWeek`, `...storageLocation` |
| `Route`, `Router`, `SecurityPolicy`, `SslPolicy` | `asPaths`; `nats.drainNatIps`, `nats.rules`; `rules`, `headerAction.requestHeadersToAdds`, `match.config.srcIpRanges`; `customFeatures`, `enabledFeatures`, `warnings` | singular forms (`asPath`, `nats.drainNatIp`, `nats.rule`, `rule`, ...) |
| `TargetHttpProxy` | `authorizationPolicy`, `serverTlsPolicy` | `authorization`, `authentication` |
| `UrlMap` | `pathMatchers.routeRules.routeAction.corsPolicy.allowHeaders` / `allowMethods` / `allowOrigins` / `allowOriginRegexes` / `exposeHeaders`, `...retryPolicy.retryConditions`, `...weightedBackendServices`, `pathMatchers.routeRules.service` | singular forms; `pathMatchers.routeRules.backendService` |

Resource types that still populate the deprecated `kmsKey` field of `ResourceSearchResult` in `SearchAllResources` (use the newer `kmsKeys` field): Artifact Registry `Repository`; BigQuery `Dataset`, `Table`, `Model`; Bigtable `Backup`, `Cluster`; Composer `Environment`; `cloudfunctions.googleapis.com/CloudFunction`; Healthcare `Dataset`; Logging `LogBucket`; Cloud Run `Revision`; Spanner `Database`; Cloud SQL `Instance`, `BackupRun`; Cloud Storage `Bucket`; Compute `Disk`, `Image`; Dataflow `Job`; Dataproc `Cluster`; Dataproc Metastore `Service`; Datastream `Stream`; Dialogflow `LocationSettings`; Document AI `HumanReviewConfig`, `Processor`, `ProcessorVersion`; Redis `Instance`; Pub/Sub `Topic`; and eleven Vertex AI types (`BatchPredictionJob`, `CustomJob`, `DataLabelingJob`, `Dataset`, `Endpoint`, `HyperparameterTuningJob`, `MetadataStore`, `Model`, `ModelDeploymentMonitoringJob`, `PipelineJob`, `TrainingPipeline`).

Deprecations:

| Feature | Deprecated | Shutdown | Details |
|---------|------------|----------|---------|
| Cloud Asset Inventory API v1p4beta1 | May 17, 2021 | May 17, 2022 | Removed; upgrade to API version 1 |

## Notes

- The deprecation policy follows the Google Cloud Platform Terms of Service ("Discontinuation of Services") and applies only to listed services and features.
- Source: https://docs.cloud.google.com/asset-inventory/docs/legacy-fields, https://docs.cloud.google.com/asset-inventory/docs/deprecations (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [asset-types-names.md](./asset-types-names.md)
- [export-to-bigquery.md](../asset-feeds-export/export-to-bigquery.md)
