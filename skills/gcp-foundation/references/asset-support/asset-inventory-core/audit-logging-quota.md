---
source: https://docs.cloud.google.com/asset-inventory/docs/quota
---

# Cloud Asset Inventory Quotas and Audit Logging

Default request quotas, Policy Analyzer limits, downstream-service limits, and how Cloud Asset Inventory API calls appear in Cloud Audit Logs.

## Signature / Usage

Query Cloud Asset Inventory audit logs in Logs Explorer:

```
protoPayload.serviceName="cloudasset.googleapis.com"
```

Filter for a single method (pattern; the same form applies to every method):

```
protoPayload.methodName="google.cloud.asset.v1.AssetService.AnalyzeIamPolicy"
```

### Audit log categories

Each IAM permission has a `type` (`ADMIN_READ`, `ADMIN_WRITE`, `DATA_READ`, `DATA_WRITE`). `ADMIN_READ`, `DATA_READ`, and `DATA_WRITE` methods generate Data Access audit logs; `ADMIN_WRITE` methods generate Admin Activity audit logs. Long-running operations (LROs) usually produce two entries (start and end).

| Permission type | Methods (`google.cloud.asset.v1.AssetService.*` unless noted) |
|-----------------|---------------------------------------------------------------|
| `ADMIN_READ` | `AnalyzeIamPolicy`, `AnalyzeIamPolicyLongrunning`, `AnalyzeMove` (method name is just `AnalyzeMove`), `AnalyzeOrgPolicies`, `AnalyzeOrgPolicyGovernedAssets`, `AnalyzeOrgPolicyGovernedContainers`, `BatchGetAssetsHistory`, `BatchGetEffectiveIamPolicies`, `ExportAssets`, `GetFeed`, `GetSavedQuery`, `ListAssets`, `ListFeeds`, `ListSavedQueries`, `QueryAssets`, `SearchAllIamPolicies`, `SearchAllResources`; also v1beta1 `BatchGetAssetsHistory` / `ExportAssets`, v1p2beta1 `GetFeed` / `ListFeeds`, v1p5beta1 `ListAssets`, v1p7beta1 `ExportAssets` |
| `ADMIN_WRITE` | `CreateFeed`, `CreateSavedQuery`, `DeleteFeed`, `DeleteSavedQuery`, `UpdateFeed`, `UpdateSavedQuery`; also v1p2beta1 `CreateFeed` / `DeleteFeed` / `UpdateFeed` |

## Options / Props

### Free analysis query limit

| Quota | Value |
|-------|-------|
| Analysis queries per organization per day | 20 (only for organizations without an organization-level Security Command Center Premium or Enterprise activation; shared among all Policy Analyzer tools) |

### Project quota (per consumer project)

| Quota | Value |
|-------|-------|
| `AnalyzeIamPolicy` | 100/min, 1000/day |
| `AnalyzeIamPolicyLongrunning` | 100/min, 1000/day |
| `BatchGetAssetsHistory` | 100/min |
| `BatchGetEffectiveIamPolicies` | 100/min |
| `ExportAssets` | 60/min, 6000/day |
| `ListAssets` | 100/min |
| Real-time feed APIs | 600/min |
| Saved Query APIs | 600/min |
| `SearchAllIamPolicies` | 400/min |
| `SearchAllResources` | 400/min |

### Resource organization quota (per organization)

| Quota | Value |
|-------|-------|
| `BatchGetAssetsHistory` | 180/min, 195,000/day |
| `ExportAssets` | 75/min, 13,000/day |
| `ListAssets` | 800/min, 650,000/day |
| `QueryAssets` | 20/min with a query statement; 200/min with a job reference |
| Real-time feed APIs | 30/min |
| `SearchAllIamPolicies` | 3,000/min |
| `SearchAllResources` | 1,500/min |

### Policy Analyzer expansion limits

| Limit | Value |
|-------|-------|
| `AnalyzeIamPolicy` group expansion | 1000 per group |
| `AnalyzeIamPolicy` resource expansion | 1000 per resource |
| `AnalyzeIamPolicyLongrunning` resource expansion | 100000 per resource |

## Notes

- Downstream limits also apply. BigQuery: table-operation quota (`ExportAssets` issues 2 table operations per table per request) and concurrent query-job limit. Pub/Sub: per-region publisher throughput limits and message size limits; a feed asset update whose payload exceeds the limit is discarded.
- Optimize usage: reduce query scope, slow the request rate and use exponential backoff, batch requests. `ListAssets` and `SearchAllResources` are paged and synchronous and can exhaust quota; prefer export to BigQuery / Cloud Storage or a Pub/Sub feed for large inventories.
- View current quotas in the APIs and services quotas dashboard for `cloudasset.googleapis.com`.
- Quota increase: requires Security Command Center Premium or Enterprise at the organization level (project-level activation might not qualify), via your account representative. That tier also grants unlimited analysis queries per organization per day.
- Enabling Data Access audit logs may incur Cloud Logging charges; see Cloud Audit Logs configuration docs.
- Source: https://docs.cloud.google.com/asset-inventory/docs/quota, https://docs.cloud.google.com/asset-inventory/docs/audit-logging (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-quotas.md](./access-control-quotas.md)
- [export-to-bigquery.md](../asset-feeds-export/export-to-bigquery.md)
- [feeds-pubsub.md](../asset-feeds-export/feeds-pubsub.md)
