---
source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies
---

# Principal Access Boundary Policy and Binding

Restrict which resources a set of principals is eligible to access by creating a PAB policy and binding it to a principal set.

## Signature / Usage

Requires `roles/iam.principalAccessBoundaryAdmin` on the organization.

### Rule format

```text
{"description": "DESCRIPTION", "resources": [RESOURCES], "effect": "ALLOW"}
```

### Create the policy

```bash
gcloud iam principal-access-boundary-policies create PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --display-name=DISPLAY_NAME --details-rules=FILE_PATH.json \
    --details-enforcement-version=ENFORCEMENT_VERSION
```

REST:

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

### Bind it to a principal set

`RESOURCE_TYPE` is `project`, `folder` or `organization`; `CONDITION_DETAILS` is optional.

```bash
gcloud iam policy-bindings create BINDING_ID \
    --RESOURCE_TYPE=RESOURCE_ID --location=global \
    --policy="organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID" \
    --target-principal-set=PRINCIPAL_SET \
    --display-name=DISPLAY_NAME \
    CONDITION_DETAILS
```

Poll the long-running operation:

```text
GET https://iam.googleapis.com/v3/OPERATION_NAME
```

### Binding conditions (exempt principals)

```text
principal.type == 'iam.googleapis.com/ServiceAccount'
principal.subject != 'special-admin@example.com'
```

## Options / Props

| Principal set | Format |
|---|---|
| Workforce identity pool | `//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID` |
| Workload identity pool | `//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_POOL_ID` |
| Project's principal set | `//cloudresourcemanager.googleapis.com/projects/PROJECT_ID` |
| Folder's principal set | `//cloudresourcemanager.googleapis.com/folders/FOLDER_ID` |
| Organization's principal set | `//cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID` |

| Limit | Value |
|---|---|
| Policies per organization | 1000 |
| Rules per policy | 500 |
| Policies bound to one principal set | 10 |
| `effect` | Only `ALLOW` |
| `enforcementVersion` | `1`, `2`, `3`, `4`, or `latest` |

## Notes

- PAB can only block access, never grant it. Once a principal is subject to at least one PAB policy, access is blocked unless some policy lists the resource.
- Keep principals subject to at least one PAB policy at all times; removing all policies makes them eligible for everything again.
- `latest` is not recommended because principals may lose access unexpectedly; pin an enforcement version. Evaluation fails closed, so test on a throwaway project and organization subset first.
- The policy and the principal set of a binding cannot be changed after creation.
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-create (retrieved 2026-11-14)

## Related

- [principal-access-boundary-policies.md](../references/iam-guides/principal-access-boundary/principal-access-boundary-policies.md)
- [deny-policies.md](../references/iam-guides/access-policies/deny-policies.md)
- [workload-identity-federation-pools.md](../references/iam-guides/workload-and-workforce-federation/workload-identity-federation-pools.md)
