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

Generated from the Discovery entry of `policytroubleshooter.iam.troubleshoot` (not in the official docs); replace the `{...}` path variables:

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://policytroubleshooter.googleapis.com/v3/iam:troubleshoot"
```

## Notes

- Generated from the Discovery document(s) v3, v1, v3beta, v1beta of `policytroubleshooter` (retrieved 2026-11-14). Resources on this page: iam.
- Message schemas are listed under `references/rest-schemas/policytroubleshooter/`.
- Source: https://policytroubleshooter.googleapis.com/$discovery/rest?version=v3 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
