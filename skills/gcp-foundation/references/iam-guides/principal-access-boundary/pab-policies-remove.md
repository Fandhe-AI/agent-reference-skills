---
source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-remove
---

# Remove Principal Access Boundary policies and bindings

Stop enforcing a Principal Access Boundary (PAB) policy for a principal set by deleting its policy binding, or delete the policy itself (removing it from all principal sets).

## Signature / Usage

Delete a binding (gcloud):

```bash
gcloud iam policy-bindings delete BINDING_ID \
    --RESOURCE_TYPE=RESOURCE_ID --location=global
```

Delete a binding (REST):

```
DELETE https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings/BINDING_ID
```

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings/BINDING_ID"
```

Delete a policy (gcloud):

```bash
gcloud iam principal-access-boundary-policies delete PAB_POLICY_ID \
    --organization=ORG_ID --location=global FORCE_FLAG
```

Delete a policy (REST):

```
DELETE https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID?FORCE_DELETE
```

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID?FORCE_DELETE"
```

Example operation response:

```
{
  "name": "organizations/123456789012/locations/global/operations/operation-1715373190994-6181f71b4daad-6d8168c1-13cc6600",
  "metadata": {
    "@type": "type.googleapis.com/google.iam.v3.OperationMetadata",
    "createTime": "2024-05-10T20:33:11.165728913Z",
    "target": "organizations/123456789012/locations/global/policyBindings/example-binding",
    "verb": "delete",
    "requestedCancellation": false,
    "apiVersion": "v3"
  },
  "done": false
}
```

Check operation status (REST); poll with truncated exponential backoff until `done` is `true`:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v3/OPERATION_NAME"
```

## Options / Props

| Name | Description |
|------|-------------|
| `BINDING_ID` | ID of the policy binding, for example `example-binding`. |
| `RESOURCE_TYPE` | gcloud: `project`, `folder`, `organization`. REST: `projects`, `folders`, `organizations`. Depends on the principal set in the binding. |
| `RESOURCE_ID` | Project ID (alphanumeric) or numeric folder / organization ID that the binding is a child of. |
| `PAB_POLICY_ID` | ID of the policy to delete. |
| `ORG_ID` | Numeric organization ID that owns the policy. |
| `--force` / `force=true` | Delete the policy even if bindings reference it. Without it the request fails when bindings exist. Console equivalent: **Forcefully delete policy** checkbox. |

### Required roles

| Task | Role (permission) |
|------|-------------------|
| Delete policies | `roles/iam.principalAccessBoundaryAdmin` on the organization (`iam.principalaccessboundarypolicies.delete`) |
| Delete any binding | `roles/iam.principalAccessBoundaryUser` on the organization (`iam.principalaccessboundarypolicies.unbind`) |
| Workforce pool binding | `roles/iam.workforcePoolAdmin` on the pool (`iam.workforcePools.deletePolicyBinding`) |
| Workload identity pool binding | `roles/iam.workloadIdentityPoolAdmin` on the owning project (`iam.workloadIdentityPools.deletePolicyBinding`); `roles/iam.operationViewer` for LRO status (`iam.operations.get`) |
| Workspace domain binding | `roles/iam.workspacePoolAdmin` on the organization (`iam.workspacePools.deletePolicyBinding`) |
| Project principal set binding | `roles/resourcemanager.projectIamAdmin` (`resourcemanager.projects.deletePolicyBinding`); `roles/iam.operationViewer` for LRO status |
| Folder principal set binding | `roles/resourcemanager.folderIamAdmin` (`resourcemanager.folders.deletePolicyBinding`) |
| Organization principal set binding | `roles/resourcemanager.organizationAdmin` (`resourcemanager.organizations.deletePolicyBinding`) |

## Notes

- Warning: if a principal is not subject to any PAB policy, it becomes eligible to access all Google Cloud resources. Removing the last PAB policy from a principal set therefore widens, not narrows, eligibility.
- To make principals eligible for all resources: find all PAB policies bound to the principal set, then delete the relevant bindings.
- To reduce eligible resources without ever leaving principals unbound: identify the policies containing only resources to keep (create and bind a new policy if none), then delete bindings of policies containing resources to exclude. To reduce access for specific principals, add a binding condition instead of deleting. Alternatively edit the policy.
- Eligibility to access a resource does not mean the user can access it; see policy evaluation.
- Test deletions first with Policy Simulator (simulate deleting PAB rules, a policy, or a binding).
- Deleting a policy that still has bindings eventually deletes those bindings, but until then they count against the limit of 10 bindings per principal set. Best practice: find and delete the bindings first.
- gcloud waits for the long-running operation but only REST or client libraries can fetch operation status.
- Console path: Principal Access Boundary policies page > policy ID > **Bindings** > **Actions** > **Delete binding**; or policy row > **Actions** > **Delete policy**.
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-remove (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Principal Access Boundary policies](./principal-access-boundary-policies.md)
- [Edit Principal Access Boundary policies](./pab-policies-edit.md)
