---
source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-view
---

# View Principal Access Boundary policies and bindings

List and get Principal Access Boundary (PAB) policies, and list or get the policy bindings by policy, by principal set, or by parent resource.

## Signature / Usage

List policies in an organization:

```bash
gcloud iam principal-access-boundary-policies list --organization=ORG_ID \
    --location=global  --format=FORMAT
```

```
GET https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies
```

Get one policy:

```bash
gcloud iam principal-access-boundary-policies describe PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --format=FORMAT
```

```
GET https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID
```

Example policy response:

```
{
  "name": "organizations/123456789012/locations/global/principalAccessBoundaryPolicies/example-policy",
  "uid": "puid_13364150419245236225",
  "etag": "W/\"Gh/PcTdJD/AWHUhPW45kdw==\"",
  "displayName": "Example policy",
  "createTime": "2026-07-07T00:05:48.295209Z",
  "updateTime": "2026-07-07T00:05:48.295209Z",
  "details": {
    "rules": [
      {
        "description": "Make principals eligible to access resources in example.com",
        "resources": [
          "//cloudresourcemanager.googleapis.com/organizations/123456789012"
        ],
        "effect": "ALLOW"
      }
    ],
    "enforcementVersion": "4"
  }
}
```

List bindings for a policy:

```bash
gcloud iam principal-access-boundary-policies search-policy-bindings PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --format=FORMAT
```

```
GET https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID:searchPolicyBindings
```

List bindings for a principal set (find all PAB policies bound to it):

```bash
gcloud iam policy-bindings search-target-policy-bindings \
    --RESOURCE_TYPE=RESOURCE_ID \
    --target=PRINCIPAL_SET \
    --format=FORMAT
```

```
GET https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings:searchTargetPolicyBindings?target=PRINCIPAL_SET
```

List bindings under a project, folder, or organization:

```bash
gcloud iam policy-bindings list --RESOURCE_TYPE=RESOURCE_ID \
    --location=global \
    --filter=policyKind:PRINCIPAL_ACCESS_BOUNDARY \
    --format=FORMAT
```

```
GET https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings?filter=policyKind:PRINCIPAL_ACCESS_BOUNDARY
```

Get one binding:

```bash
gcloud iam policy-bindings describe BINDING_ID \
    --RESOURCE_TYPE=RESOURCE_ID --location=global \
    --format=FORMAT
```

```
GET https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings/BINDING_ID
```

Example binding response:

```
{
  "name": "organizations/123456789012/locations/global/policyBindings/example-binding",
  "uid": "buid_9904260005517852673", 
  "etag": "W/\"xkdnPfTxoxyVqOwhQSJbMg==\"",
  "displayName": "Example binding",
  "target": {
    "principalSet": "//cloudresourcemanager.googleapis.com/organizations/123456789012"
  },
  "policyKind": "PRINCIPAL_ACCESS_BOUNDARY",
  "policy": "organizations/123456789012/locations/global/principalAccessBoundaryPolicies/example-pab-policy",
  "policyUid": "puid_9519202237377675265",
  "createTime": "2024-05-06T18:08:24.729843Z",
  "updateTime": "2024-05-06T18:08:24.729843Z"
}
```

Send REST requests with curl:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies"
```

## Options / Props

| Name | Description |
|------|-------------|
| `ORG_ID` | Numeric organization ID. |
| `PAB_POLICY_ID` | Policy ID, for example `example-policy`. |
| `BINDING_ID` | Binding ID, for example `example-binding`. |
| `RESOURCE_TYPE` | gcloud: `project`, `folder`, `organization`. REST: `projects`, `folders`, `organizations`. Depends on the principal set / binding parent. |
| `RESOURCE_ID` | Project ID (alphanumeric) or numeric folder / organization ID. |
| `PRINCIPAL_SET` | Principal set to search bindings for (see supported principal sets). |
| `FORMAT` | `json` or `yaml`. |

### Required roles

| Task | Role (permission) |
|------|-------------------|
| View policies | `roles/iam.principalAccessBoundaryViewer` on the organization (`iam.principalaccessboundarypolicies.get`, `.list`) |
| View all bindings for a policy | `roles/iam.principalAccessBoundaryViewer` (`iam.principalaccessboundarypolicies.searchIamPolicyBindings`) |
| View bindings in a parent | `roles/resourcemanager.projectIamAdmin` / `folderIamAdmin` / `organizationAdmin` on the parent (`iam.policybindings.get`, `iam.policybindings.list`) |
| Bindings for a principal set | Workforce pool: `roles/iam.workforcePoolAdmin` (`iam.workforcePools.searchPolicyBindings`); workload identity pool: `roles/iam.workloadIdentityPoolAdmin` on the owning project (`iam.workloadIdentityPools.searchPolicyBindings`); Workspace domain: `roles/iam.workspacePoolAdmin` on the org (`iam.workspacePools.searchPolicyBindings`); project / folder / organization: matching `resourcemanager.*.searchPolicyBindings` via Project IAM Admin / Folder IAM Admin / Organization Administrator |

## Notes

- Binding results contain the policy resource name; fetch the policy by ID to see its rules.
- A binding's parent resource depends on its principal set type.
- Console: Principal Access Boundary policies page > select organization; policy ID > **Bindings** tab lists its bindings.
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-view (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Principal Access Boundary policies](./principal-access-boundary-policies.md)
- [Edit Principal Access Boundary policies](./pab-policies-edit.md)
- [Remove Principal Access Boundary policies](./pab-policies-remove.md)
