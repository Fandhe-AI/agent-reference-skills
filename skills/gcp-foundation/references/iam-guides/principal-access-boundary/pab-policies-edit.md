---
source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-edit
---

# Edit Principal Access Boundary policies and bindings

Edit existing Principal Access Boundary (PAB) policies (rules, display name, enforcement version) and policy bindings (display name, conditions), and check the status of the resulting long-running operations.

## Signature / Usage

Edit a policy (gcloud):

```bash
gcloud iam principal-access-boundary-policies update PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --FIELD_TO_UPDATE=UPDATED_VALUE \
    --format=FORMAT
```

Edit a policy (REST):

```
PATCH https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID?updateMask=FIELDS_TO_UPDATE
```

Request JSON body. Adapted (not in the official docs): the trailing comma after `enforcementVersion` is removed so the JSON is valid.

```
{
  "displayName": DISPLAY_NAME,
  "details": {
    "rules": [
      PAB_RULES
    ],
    "enforcementVersion": "ENFORCEMENT_VERSION"
  }
}
```

Rule format:

```json
{
  "description": "DESCRIPTION",
  "resources": [
    RESOURCES
  ],
  "effect": "ALLOW"
}
```

Edit a policy binding (gcloud):

```bash
gcloud iam policy-bindings update BINDING_ID \
    --RESOURCE_TYPE=RESOURCE_ID --location=global \
    --FIELD_TO_UPDATE=UPDATED_VALUE \
    --format=FORMAT
```

Edit a policy binding (REST):

```
PATCH https://iam.googleapis.com/v3/RESOURCE_TYPE/RESOURCE_ID/locations/global/policyBindings/BINDING_ID?updateMask=FIELDS_TO_UPDATE
```

```
{
  "displayName": "DISPLAY_NAME",
  "condition": {
    CONDITION_DETAILS
  }
}
```

Send with curl (save the body as `request.json`):

```
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v3/organizations/ORG_ID/locations/global/principalAccessBoundaryPolicies/PAB_POLICY_ID?updateMask=FIELDS_TO_UPDATE"
```

Check a long-running operation:

```
GET https://iam.googleapis.com/v3/OPERATION_NAME
```

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v3/OPERATION_NAME"
```

The operation name has the format `RESOURCE_TYPE/RESOURCE_ID/locations/global/operations/OPERATION_ID`. If `done` is not present, poll again with truncated exponential backoff until `done` is `true`.

Example operation response:

```
{
  "name": "organizations/123456789012/locations/global/operations/operation-1715626721931-6185a7953ef76-76f80ee4-19cd1bf7",
  "metadata": {
    "@type": "type.googleapis.com/google.iam.v3.OperationMetadata",
    "createTime": "2024-05-13T18:58:43.721277235Z",
    "target": "organizations/123456789012/locations/global/principalAccessBoundaryPolicies/example-policy",
    "verb": "update",
    "requestedCancellation": false,
    "apiVersion": "v3"
  },
  "done": false
}
```

## Options / Props

### Policy update flags (gcloud)

| Flag | Description |
|------|-------------|
| `--display-name=DISPLAY_NAME` | Replace the display name. |
| `--details-enforcement-version=ENFORCEMENT_VERSION` | Update the enforcement version. |
| `--details-rules=RULES_FILE.json` | Replace all rules with those in the file. Cannot be combined with `--add-details-rules`. |
| `--add-details-rules=RULES_FILE` | Append the rules in the file to existing rules. Cannot be combined with `--details-rules`. |
| `--remove-details-rules=RULES_FILE` | Remove rules that exactly match a rule in the file. Cannot be combined with `--clear-rule-details`. |
| `--clear-details-rules` | Clear all rules from the policy. |

### Policy REST fields

| Name | Description |
|------|-------------|
| `FIELDS_TO_UPDATE` | Comma-separated update mask. If omitted, IAM replaces the existing policy with the request body. Accepted: `displayName`, `details`, `details.rules`, `details.rules.description`, `details.rules.resources`, `details.rules.effect`, `details.enforcementVersion`. |
| `DISPLAY_NAME` | Optional. Max 63 characters. |
| `PAB_RULES` | Up to 500 rules per policy. Rule `description` max 256 characters. At most 500 resources across all rules (projects, folders, organizations). |
| `ENFORCEMENT_VERSION` | `1`, `2`, `3`, `4`, or `latest`. |

### Binding update

| Name | Description |
|------|-------------|
| `--display-name` | Replace the binding display name. |
| `--condition-description` / `--condition-expression` / `--condition-title` | Replace or add the condition. When adding a condition to a binding without one, `--condition-expression` is required. |
| `RESOURCE_TYPE` | gcloud: `project`, `folder`, `organization`. REST: `projects`, `folders`, `organizations`. Depends on the principal set in the binding. |
| `FIELDS_TO_UPDATE` (REST) | `displayName`, `condition`, `condition.expression`, `condition.title`, `condition.description`. If omitted, the binding is replaced by the request body. |
| `condition.expression` | CEL; must reference `principal.type` or `principal.subject` only; up to 10 logical operators (`&&`, `\|\|`, `!`) and 250 characters. |
| `displayName` | Max 63 characters. |

### Required roles

| Task | Role / permission |
|------|-------------------|
| Edit policies | `roles/iam.principalAccessBoundaryAdmin` on the organization (`iam.principalaccessboundarypolicies.update`) |
| Edit any binding | `roles/iam.principalAccessBoundaryUser` on the organization (`iam.principalaccessboundarypolicies.bind`) |
| Binding to workforce pools | `roles/iam.workforcePoolAdmin` on the pool (`iam.workforcePools.updatePolicyBinding`) |
| Binding to workload identity pools | `roles/iam.workloadIdentityPoolAdmin` on the owning project (`iam.workloadIdentityPools.updatePolicyBinding`); `roles/iam.operationViewer` for LRO status (`iam.operations.get`) |
| Binding to a Workspace domain | `roles/iam.workspacePoolAdmin` on the organization (`iam.workspacePools.updatePolicyBinding`) |
| Binding to a project principal set | `roles/resourcemanager.projectIamAdmin` (`resourcemanager.projects.updatePolicyBinding`); `roles/iam.operationViewer` for LRO status |
| Binding to a folder principal set | `roles/resourcemanager.folderIamAdmin` (`resourcemanager.folders.updatePolicyBinding`) |
| Binding to an organization principal set | `roles/resourcemanager.organizationAdmin` (`resourcemanager.organizations.updatePolicyBinding`) |

## Notes

- After a binding is created, its policy ID and principal set cannot be changed. To change who a policy applies to: edit the binding condition, create a new binding for another principal set, or delete the binding.
- Console: Principal Access Boundary policies page > policy ID > **Edit policy** (rules, display name, enforcement version; optional **Test changes** with Policy Simulator) or **Bindings** tab > **Actions** > **Edit binding**.
- REST and client library changes return a long-running operation; the gcloud CLI waits for it but you must use REST or client libraries to get the operation status.
- Omitting the update mask replaces the whole policy or binding with the request body.
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-edit (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Principal Access Boundary policies](./principal-access-boundary-policies.md)
