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
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/run/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`run` v2, revision 20261031) also lists 96 endpoints of the form `https://LOCATION-run.googleapis.com/` (Locational Endpoint) and `https://run.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `asia-southeast4`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://run.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://africa-south1-run.googleapis.com/`) and keep the path.
- Source: https://run.googleapis.com/$discovery/rest?version=v2, https://run.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
