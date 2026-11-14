---
source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies
---

# Principal Access Boundary (PAB) policies

PAB policies are attached to principal sets and define which resources those principals are eligible to access. They can only block access, never grant it.

## Signature / Usage

Policy structure:

```json
{
  "name": "organizations/0123456789012/locations/global/principalAccessBoundaryPolicies/example-policy",
  "uid": "puid_0123456789012345678",
  "etag": "W/\"Gh/PcTdJD/AWHUhPW45kdw==\"",
  "displayName": "Example policy",
  "annotations": {
    "example-key": "example-value"
  },
  "createTime": "2024-01-02T15:01:23Z",
  "updateTime": "2024-01-02T15:01:23Z",
  "details": {
    "rules": [
      {
        "description": "Example principal access boundary policy rule",
        "resources": [
          "//cloudresourcemanager.googleapis.com/organizations/0123456789012"
        ],
        "effect": "ALLOW"
      }
    ],
    "enforcementVersion": "4"
  }
}
```

Policy binding structure:

```json
{
  "name": "organizations/0123456789012/locations/global/policyBindings/example-policy-binding",
  "uid": "buid_01234567890123456789", 
  "etag": "W/\"cRMdDXbT82aLuZlvoL9Gqg==\"",
  "displayName": "Example policy binding",
  "annotations": {
    "example-key": "example-value"
  },
  "target": {
    "principalSet": "//cloudresourcemanager.googleapis.com/organizations/0123456789012"
  },
  "policyKind": "PRINCIPAL_ACCESS_BOUNDARY",
  "policy": "organizations/0123456789012/locations/global/principalAccessBoundaryPolicies/example-policy",
  "policyUid": "puid_0123456789012345678",
  "condition": {
    "title": "Exempt principal",
    "description": "Don't enforce the policy for super-admin@example.com",
    "expression": "principal.subject != 'super-admin@example.com'"
  },
  "createTime": "2024-01-02T17:00:16Z",
  "updateTime": "2024-01-02T17:00:16Z"
}
```

Create a policy (rules file items look like `{"description": "DESCRIPTION", "resources": [RESOURCES], "effect": "ALLOW"}`):

```bash
gcloud iam principal-access-boundary-policies create PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --display-name=DISPLAY_NAME --details-rules=FILE_PATH.json \
    --details-enforcement-version=ENFORCEMENT_VERSION
```

```text
POST https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global?principalAccessBoundaryPolicyId=PAB_POLICY_ID
```

```json
{
  "displayName": "DISPLAY_NAME",
  "details": {
    "rules": [
      PAB_RULES
    ],
    "enforcementVersion": "ENFORCEMENT_VERSION"
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global?principalAccessBoundaryPolicyId=PAB_POLICY_ID"
```

Apply it to a principal set with a policy binding (`RESOURCE_TYPE` is `project`, `folder` or `organization`; `CONDITION_DETAILS` optional):

```bash
gcloud iam policy-bindings create BINDING_ID \
    --RESOURCE_TYPE=RESOURCE_ID --location=global \
    --policy="organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID" \
    --target-principal-set=PRINCIPAL_SET \
    --display-name=DISPLAY_NAME \
    CONDITION_DETAILS
```

```text
POST https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings?policyBindingId=BINDING_ID
GET https://iam.googleapis.com/v3/OPERATION_NAME
```

Binding conditions:

```text
principal.type == 'iam.googleapis.com/ServiceAccount'
principal.subject != 'special-admin@example.com'
```

## Options / Props

### Supported principal sets

| Principal set | Format | Binding parent |
|---|---|---|
| Workforce identity pool | `//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID` | Organization containing the pool |
| Workload identity pool | `//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_POOL_ID` | Project containing the pool |
| Google Workspace domain | `//iam.googleapis.com/locations/global/workspace/CUSTOMER_ID` (`directoryCustomerId` from `gcloud organizations describe`) | Organization associated with the domain |
| Project's principal set | `//cloudresourcemanager.googleapis.com/projects/PROJECT_ID` (service accounts, workload identity pools, agent identities) | The project |
| Folder's principal set | `//cloudresourcemanager.googleapis.com/folders/FOLDER_ID` (includes all descendants) | The folder |
| Organization's principal set | `//cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID` (all domain identities, workforce pools, service accounts, workload pools, agent identities in the organization) | The organization |
| Agent identities | `//agents.global.org-ORGANIZATION_ID.system.id.goog/attribute.container/projects/PROJECT_NUMBER` or `//agents.global.proj-PROJECT_NUMBER.system.id.goog/attribute.container/projects/PROJECT_NUMBER` | The project |

### Limits and fields

| Item | Value |
|---|---|
| Policies per organization | 1000 |
| Rules per policy | 500 |
| Resources per policy (all rules) | 500 |
| Policies bound to one principal set | 10 |
| Binding condition | max 10 logical operators, max 250 characters; only `principal.type` and `principal.subject` attributes |
| Display name | max 63 characters; rule description max 256 characters |
| `effect` | Only `ALLOW` |
| `enforcementVersion` | `1`, `2`, `3`, `4`, or `latest` |
| Required role to create | `roles/iam.principalAccessBoundaryAdmin` on the organization (permission `iam.principalaccessboundarypolicies.create`) |

## Notes

- By default principals are eligible to access any resource. Once a principal is subject to at least one PAB policy, access is blocked unless some policy lists the resource; policies are additive (union of resources). A principal subject to no PAB policy remains eligible for everything.
- PAB blocks only permissions included in the policy's enforcement version; other permissions are unaffected. New versions can block more permissions. `latest` follows the default enforcement version (may take up to 4 weeks to change) and is not recommended because principals may lose access unexpectedly.
- Warning: when reducing eligibility, keep the principal subject to at least one PAB policy at all times, otherwise it becomes eligible for all resources. Removing or deleting all policies also grants full eligibility.
- Evaluation fails closed: errors (for example newly created principals whose details are still propagating) block access; retry later.
- PAB policies are not inherited through the resource hierarchy, but folder and organization principal sets include all descendants' principals. Publicly cached resources (for example public Cloud Storage objects) may remain viewable; modification and deletion are still blocked.
- Cross-organization bindings cannot be created; bindings created when a project moves between organizations are deleted automatically. Bindings for deleted policies fail or have no effect and are cleaned up. The policy and the principal set binding values cannot be changed after creation.
- Create and bind operations return long-running operations; poll them with `GET https://iam.googleapis.com/v3/OPERATION_NAME`. Permissions needed to apply a policy depend on the principal set.
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-create
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-accounts-overview-types.md](../service-account-concepts/service-accounts-overview-types.md)
- gcp-security covers VPC Service Controls.
