---
source: https://docs.cloud.google.com/asset-inventory/docs/roles-permissions
---

# Cloud Asset Inventory Access Control

Cloud Asset Inventory uses IAM. Every API method requires the caller to hold the necessary permissions, and every call requires `serviceusage.services.use`.

## Signature / Usage

Grant roles on the organization, folder, or project:

| Goal | Roles |
|------|-------|
| View asset metadata | Cloud Asset Viewer (`roles/cloudasset.viewer`) + Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) |
| View asset metadata and work with feeds | Cloud Asset Owner (`roles/cloudasset.owner`) + Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) |

Underlying permissions:

```
# View asset metadata
cloudasset.assets.*
recommender.cloudAssetInsights.get
recommender.cloudAssetInsights.list
serviceusage.services.use

# View asset metadata and work with feeds
cloudasset.*
recommender.cloudAssetInsights.*
serviceusage.services.use
```

## Options / Props

Per-method permissions (RPC / REST / gcloud names).

| Method (RPC / REST / gcloud) | Required permissions |
|------------------------------|----------------------|
| `AnalyzeIamPolicy`, `AnalyzeIamPolicyLongRunning`, `BatchGetEffectiveIamPolicies` / `analyzeIamPolicy`, `analyzeIamPolicyLongRunning`, `effectiveIamPolicies.batchGet` / `analyze-iam-policy`, `analyze-iam-policy-longrunning`, `get-effective-iam-policy` | All of: `cloudasset.assets.analyzeIamPolicy`, `cloudasset.assets.searchAllIamPolicies`, `cloudasset.assets.searchAllResources`, and `iam.roles.get` to analyze policies with custom roles (extra permissions needed for Google Workspace) |
| `AnalyzeMove` / `analyzeMove` / `analyze-move` | `cloudasset.assets.analyzeMove` |
| `AnalyzeOrgPolicies`, `AnalyzeOrgPolicyGovernedContainers` (`analyze-org-policies`, `analyze-org-policy-governed-containers`) | `cloudasset.assets.analyzeOrgPolicy` and `cloudasset.assets.searchAllResources` |
| `AnalyzeOrgPolicyGovernedAssets` (`analyze-org-policy-governed-assets`) | `cloudasset.assets.analyzeOrgPolicy`, `cloudasset.assets.searchAllIamPolicies`, `cloudasset.assets.searchAllResources` |
| `CreateFeed` / `feeds.create` / `feeds create` | `cloudasset.feeds.create` plus `cloudasset.assets.exportIamPolicy` or `cloudasset.assets.exportResource` depending on content type |
| `UpdateFeed` / `feeds.patch` / `feeds update` | `cloudasset.feeds.update` plus the same export permission as above |
| `DeleteFeed` / `GetFeed` / `ListFeed` | `cloudasset.feeds.delete` / `cloudasset.feeds.get` / `cloudasset.feeds.list` |
| `BatchGetAssetsHistory`, `ExportAssets` (`get-history`, `export`) | One of, by content type: `cloudasset.assets.exportAccessPolicy` (`ACCESS_POLICY`), `exportIamPolicy` (`IAM_POLICY`), `exportOrgPolicy` (`ORG_POLICY`), `exportOSInventories` (`OS_INVENTORY`), `exportResource` (`RELATIONSHIP` or `RESOURCE`) |
| `ListAssets` / `assets.list` / `list` | One of, by content type: `cloudasset.assets.listAccessPolicy`, `listIamPolicy`, `listOrgPolicy`, `listOSInventories`, `listResource` (`RELATIONSHIP` or `RESOURCE`) |
| `QueryAssets` / `queryAssets` / `query` | One of, by content type: `cloudasset.assets.queryAccessPolicy`, `queryIamPolicy`, `queryOSInventories`, `queryResource` (`RELATIONSHIP` or `RESOURCE`) |
| `SearchAllIamPolicies` | `cloudasset.assets.searchAllIamPolicies` |
| `SearchAllResources` | `cloudasset.assets.searchAllResources`; also `cloudasset.assets.searchEnrichmentResourceOwners` when searching resource owner enrichment |

Limiting resource access: `cloudasset.assets.exportResource` / `cloudasset.assets.listResource` allow all resource types. Grant per-type permissions instead, for example `cloudasset.assets.exportComputeDisks` alone allows only `compute.googleapis.com/Disk`. Granular permissions apply only to `RESOURCE` and unspecified content types.

Console: the Google Cloud console calls `SearchAllResources`; grant `cloudasset.assets.searchAllResources` and `serviceusage.services.use`.

## Notes

- VPC Service Controls can be used with Cloud Asset Inventory for additional security; check the VPC Service Controls supported products and limitations page.
- Granting `cloudasset.owner` or `cloudasset.*` is broad; prefer Viewer unless feeds are required.
- Source: https://docs.cloud.google.com/asset-inventory/docs/roles-permissions (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [audit-logging-quota.md](./audit-logging-quota.md)
