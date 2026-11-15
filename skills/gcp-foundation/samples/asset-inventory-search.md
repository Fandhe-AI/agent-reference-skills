---
source: https://docs.cloud.google.com/asset-inventory/docs/search-resources
---

# Search Resources and IAM Policies in Asset Inventory

Find resources by name, label, or tag, and audit who holds which roles with `search-all-resources` and `search-all-iam-policies`.

## Signature / Usage

Enable the Cloud Asset Inventory API. Resource search needs `cloudasset.assets.searchAllResources`; IAM policy search needs `cloudasset.assets.searchAllIamPolicies` (plus `serviceusage.services.use`).

### Search resources

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="name:instance 1" \
    --asset-types=compute.googleapis.com/Instance \
    --order-by="name DESC" \
    --read-mask="name,location"
```

By label existence and by tag:

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="labels.env:*" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, labels)"
```

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --query="tagKeys:env" \
    --asset-types=compute.googleapis.com/Instance \
    --format="table(name, assetType, tags)"
```

REST:

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

### Find deny policies

```bash
gcloud asset search-all-resources \
    --scope=projects/my-project \
    --asset-types=iam.googleapis.com/PolicyV2 \
    --query="name:denypolicies"
```

### Audit IAM allow policies

Projects where a principal has the owner role:

```bash
gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --query="policy:(roles/owner alex@example.com)" \
    --asset-types=cloudresourcemanager.googleapis.com/Project \
    --format="table(resource)"
```

Service accounts with an owner role:

```bash
gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --query="policy:(roles/owner serviceAccount)" \
    --flatten="policy.bindings[].members[]" \
    --format="table(resource.segment(3):label=RESOURCE_TYPE, resource.basename():label=RESOURCE, policy.bindings.members)"
```

Principals who can access Cloud Storage buckets:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy.role.permissions:storage.buckets" \
    --asset-types=cloudresourcemanager.* \
    --flatten="policy.bindings[].members[]" \
    --format="table(policy.bindings.members)"
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--scope` | `projects/PROJECT_ID`, `folders/FOLDER_ID`, or `organizations/ORGANIZATION_ID` |
| `--query` | Optional; empty searches all resources in scope |
| `--asset-types` | Comma-separated; RE2 regex supported |
| `--order-by` | Comma-separated fields; add `DESC` for descending |
| `--read-mask` | Fields to return (resource search) |

## Notes

- Search is synchronous and can strain quotas; use exports for large inventories. Not all asset types are searchable.
- Start with an unqualified search, then refine using fields from the full response.
- `policy` is a nested field usable only with `:`; `NOT` is not supported when searching IAM policies.
- Run owner and service-account audits only from a scope you are authorized to inspect.
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-resources (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-allow-policies (retrieved 2026-11-14)

## Related

- [search-resources.md](../references/asset-support/asset-analysis/search-resources.md)
- [search-iam-policies.md](../references/asset-support/asset-analysis/search-iam-policies.md)
- [search-query-syntax.md](../references/asset-support/asset-analysis/search-query-syntax.md)
