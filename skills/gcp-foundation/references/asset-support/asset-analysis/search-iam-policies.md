---
source: https://docs.cloud.google.com/asset-inventory/docs/search-allow-policies
---

# Search IAM Allow Policies

Search IAM allow policies on resources in a project, folder, or organization with `searchAllIamPolicies` and filter results with a query. To find deny policies, use a resource search instead (see search-resources).

## Signature / Usage

Requires `cloudasset.assets.searchAllIamPolicies` (and `serviceusage.services.use`). Console: Asset Inventory page, **IAM Policy** tab.

```bash
gcloud asset search-all-iam-policies \
    --scope=SCOPE_PATH \
    --query="QUERY" \
    --asset-types=ASSET_TYPE_1,ASSET_TYPE_2,... \
    --order-by="ORDER_BY"
```

Example: Compute Engine instances in `my-project` with an allow policy binding the user `alex@example.com`, descending by resource:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy:\"user:alex@example.com\"" \
    --asset-types=compute.googleapis.com/Instance \
    --order-by="resource DESC"
```

Resources with allow policies in a project:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --flatten="policy.bindings[].members[]" \
    --format="table(resource, policy.bindings.role, policy.bindings.members)"
```

Named resources:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="resource:example"
```

Allow policies on projects, folders, and organizations:

```bash
gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --asset-types=cloudresourcemanager.*
```

Owners on a project:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="roles:roles/owner" \
    --asset-types=cloudresourcemanager.* \
    --flatten="policy.bindings[].members[]" \
    --format="table(policy.bindings.members)"
```

Projects where a principal has the owner role:

```bash
gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --query="policy:(roles/owner alex@example.com)" \
    --asset-types=cloudresourcemanager.googleapis.com/Project \
    --format="table(resource)"
```

Roles / permissions a principal has on a project:

```bash
gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy:alex@example.com" \
    --asset-types=cloudresourcemanager.googleapis.com/Project \
    --flatten="policy.bindings[]" \
    --format="table(policy.bindings.role)"

gcloud asset search-all-iam-policies \
    --scope=projects/my-project \
    --query="policy:alex@example.com policy.role.permissions:\"\"" \
    --asset-types=cloudresourcemanager.* \
    --format="default(explanation.matchedPermissions)"
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

Service accounts with an owner role, and roles granted to a domain:

```bash
gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --query="policy:(roles/owner serviceAccount)" \
    --flatten="policy.bindings[].members[]" \
    --format="table(resource.segment(3):label=RESOURCE_TYPE, resource.basename():label=RESOURCE, policy.bindings.members)"

gcloud asset search-all-iam-policies \
    --scope=organizations/my-organization-id \
    --query="policy:\"domain:example.com\"" \
    --flatten="policy.bindings[]" \
    --format="table(resource, policy.bindings.role)"
```

REST form of a query (for example the owner search):

```json
{
  "query": "roles:roles/owner"
}
```

## Options / Props

Extra query fields beyond `IamPolicySearchResult` fields:

| Field | Description |
|-------|-------------|
| `memberTypes` | One of IAM principal types: `user`, `group`, `domain`, `serviceAccount`, `allUsers`, `allAuthenticatedUsers`. Example `memberTypes=user` |
| `policy.role.permissions` | Specific IAM permissions. Example `policy.role.permissions=storage.buckets.create`. The caller needs `iam.roles.get` for permissions to be listed in the response |
| `roles` | Specific IAM roles. Example `roles=roles/storage.objectAdmin` |

## Notes

- The `policy` field is a nested object and can only be used with the `:` operator.
- Not all asset types are searchable; check the asset types page. Negation (`NOT`) is not supported when searching IAM policies.
- Start with an unqualified search, then refine with fields from the full response.
- Searches for `allUsers`, owner roles, and service-account owners are useful public-exposure and over-permission audits; run them from a scope you are authorized to inspect.
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-allow-policies (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [search-query-syntax.md](./search-query-syntax.md)
- [search-resources.md](./search-resources.md)
- [effective-policies-and-analysis.md](./effective-policies-and-analysis.md)
