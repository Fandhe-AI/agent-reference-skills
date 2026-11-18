---
source: https://publicca.googleapis.com/$discovery/rest?version=v1
---

# Public Certificate Authority API REST API (publicca)

## Signature / Usage

Base URL: `https://publicca.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `publicca.projects.locations.externalAccountKeys.create`

- Versions: v1, v1beta1, v1alpha1
- `POST https://publicca.googleapis.com/v1/{+parent}/externalAccountKeys`
- Creates a new ExternalAccountKey bound to the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExternalAccountKey`; Response: `ExternalAccountKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this external_account_key will be created. Format: projects/\[project_id\]/locations/\[location\]. At present only the "global" location is supported. |

### Example request skeleton

Generated from the Discovery entry of `publicca.projects.locations.externalAccountKeys.create` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://publicca.googleapis.com/v1/{+parent}/externalAccountKeys"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1, v1alpha1 of `publicca` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/publicca/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://publicca.googleapis.com/$discovery/rest?version=v1, https://publicca.googleapis.com/$discovery/rest?version=v1beta1, https://publicca.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
