---
source: https://policytroubleshooter.googleapis.com/$discovery/rest?version=v3
---

# Policy Troubleshooter API REST API (policytroubleshooter)

## Signature / Usage

Base URL: `https://policytroubleshooter.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v3).

### `policytroubleshooter.iam.troubleshoot`

- Versions: v3, v1, v3beta, v1beta
- `POST https://policytroubleshooter.googleapis.com/v3/iam:troubleshoot`
- Checks whether a principal has a specific permission for a specific resource, and explains why the principal does or doesn't have that permission.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyRequest`; Response: `GoogleCloudPolicytroubleshooterIamV3TroubleshootIamPolicyResponse`

### `policytroubleshooter.iam.troubleshootError`

- Versions: v3beta
- `POST https://policytroubleshooter.googleapis.com/v3beta/iam:troubleshootError`
- Checks the access request associated with the error identifier and explains why the access is denied by IAM policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudPolicytroubleshooterIamV3betaTroubleshootIamPolicyErrorRequest`; Response: `GoogleCloudPolicytroubleshooterIamV3betaTroubleshootIamPolicyErrorResponse`

### Example request skeleton

Generated from the Discovery entry of `policytroubleshooter.iam.troubleshoot` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://policytroubleshooter.googleapis.com/v3/iam:troubleshoot"
```

## Notes

- Generated from the Discovery document(s) v3, v1, v3beta, v1beta of `policytroubleshooter` (retrieved 2026-11-14). Resources on this page: iam.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/policytroubleshooter/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://policytroubleshooter.googleapis.com/$discovery/rest?version=v3, https://policytroubleshooter.googleapis.com/$discovery/rest?version=v1, https://policytroubleshooter.googleapis.com/$discovery/rest?version=v3beta, https://policytroubleshooter.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
