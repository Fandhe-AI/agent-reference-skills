---
source: https://run.googleapis.com/$discovery/rest?version=v2
---

# Cloud Run Admin API REST API (run) (part 2/2)

## Signature / Usage

Base URL: `https://run.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `run.projects.locations.workerpools.setIamPolicy`

- Versions: v1
- `POST https://run.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM Access control policy for the specified worker pool. Overwrites any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `run.projects.locations.workerpools.testIamPermissions`

- Versions: v1
- `POST https://run.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified worker pool. There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/run`, `https://www.googleapis.com/auth/run.readonly`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `run.projects.locations.workerpools.setIamPolicy` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://run.googleapis.com/v1/{+resource}:setIamPolicy"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `run` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/run/`.
- Source: https://run.googleapis.com/$discovery/rest?version=v2, https://run.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
