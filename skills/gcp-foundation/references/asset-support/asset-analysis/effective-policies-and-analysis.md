---
source: https://docs.cloud.google.com/asset-inventory/docs/view-effective-policies
---

# View Effective IAM Policies, Policy Analysis, and Quick Start

Retrieve the effective (inherited) IAM allow policies for resources, see how Cloud Asset Inventory fits into Policy Analyzer, and list your first assets.

## Signature / Usage

Effective policies describe how all parent and ancestor policies in the resource hierarchy are inherited for a resource.

```bash
gcloud asset get-effective-iam-policy \
    --scope=SCOPE_PATH \
    --names=ASSET_NAME_1,ASSET_NAME_2,...
```

Example (instance policies inherited from organization `my-organization-id`):

```bash
gcloud asset get-effective-iam-policy \
    --scope=organizations/my-organization-id \
    --names=//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance
```

Response shape:

```
policyResults:
- fullResourceName: //compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance
  policies:
  - attachedResource: //cloudresourcemanager.googleapis.com/projects/my-project
    policy:
      bindings:
      - members:
        - user:alex@example.com
        - user:bola@example.com
        role: roles/cloudkms.admin
  - attachedResource: //cloudresourcemanager.googleapis.com/folders/000000000000
    policy:
      bindings:
      - members:
        - user:cruz@example.com
        role: roles/resourcemanager.folderAdmin
  - attachedResource: //cloudresourcemanager.googleapis.com/organizations/0000000000000
    policy:
      bindings:
      - members:
        - user:hao@example.com
        role: organizations/0000000000000/roles/CustomProjectAdmin
```

REST (`POST` with `X-HTTP-Method-Override: GET` avoids URL length limits):

```bash
curl -X POST \
     -H "X-HTTP-Method-Override: GET" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
            "names": [
              "//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance"
            ]
          }' \
     https://cloudasset.googleapis.com/v1/organizations/my-organization-id/effectiveIamPolicies:batchGet
```

### Policy Analyzer pointers

Cloud Asset Inventory powers Policy Analyzer to view allow policies (which principals have what access to which resources) and organization policies (which resources are covered by what organization policies). The analysis methods are `AnalyzeIamPolicy`, `AnalyzeIamPolicyLongRunning`, `BatchGetEffectiveIamPolicies`, `AnalyzeMove`, `AnalyzeOrgPolicies`, `AnalyzeOrgPolicyGovernedContainers`, and `AnalyzeOrgPolicyGovernedAssets`; permissions are on the access control page and free-query limits on the quota page.

### Quick start: view your assets

Roles: Cloud Asset Viewer (`roles/cloudasset.viewer`); to create and delete the sample VM, Compute Instance Admin (v1) and Service Account User. Permission to list: `cloudasset.assets.listResource`.

```bash
gcloud asset list \
    --project=PROJECT_ID \
    --asset-types=compute.googleapis.com/Instance \
    --content-type=resource
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--scope` | `projects/PROJECT_ID`, `projects/PROJECT_NUMBER`, `folders/FOLDER_ID`, or `organizations/ORGANIZATION_ID`: the top level to check inherited policies from |
| `--names` | Comma-separated full asset names (see asset names); at most 20 assets per batch |

## Notes

- Only allow policies are retrievable. Not supported: deny policies, IAM principal access boundary policies, GKE role-based access control, Cloud Storage ACLs, Cloud Storage public access prevention.
- The quick start creates a VM; delete it afterward (VM instances page, More actions, Delete) to avoid charges.
- Source: https://docs.cloud.google.com/asset-inventory/docs/view-effective-policies, https://docs.cloud.google.com/asset-inventory/docs/view-resource-policies, https://docs.cloud.google.com/asset-inventory/docs/view-assets (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [asset-insights.md](./asset-insights.md)
- [search-iam-policies.md](./search-iam-policies.md)
- [access-control-quotas.md](../asset-inventory-core/access-control-quotas.md)
- gcp-security skill (Security Command Center tiers)
