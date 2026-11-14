---
source: https://docs.cloud.google.com/iam/docs/deny-access
---

# Create and Manage an IAM Deny Policy

Block a principal from using specific permissions with a deny policy attached to a project, folder, or organization.

## Signature / Usage

Requires Deny Admin (`roles/iam.denyAdmin`) on the organization and the IAM API enabled. Deny policies use the v2 permission format: v1 `iam.roles.create` is v2 `iam.googleapis.com/roles.create`.

### Policy file (`policy.json`)

```json
{
  "displayName": "My deny policy.",
  "rules": [
    {
      "denyRule": {
        "deniedPrincipals": [
          "principal://goog/subject/lucian@example.com"
        ],
        "deniedPermissions": [
          "iam.googleapis.com/roles.create"
        ]
      }
    }
  ]
}
```

### Create

```bash
gcloud iam policies create my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --policy-file=policy.json
```

### List and view

```bash
gcloud iam policies list \
    --attachment-point=ATTACHMENT_POINT \
    --kind=denypolicies \
    --format=json
```

```bash
gcloud iam policies get my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --format=json \
    > ./policy.json
```

### Update (read-modify-write)

Edit `policy.json` (keep the `etag` from the read), then:

```bash
gcloud iam policies update my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --policy-file=policy.json
```

### Delete

```bash
gcloud iam policies delete my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies
```

### REST create

```
POST https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies?policyId=POLICY_ID
```

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v2/policies/ENCODED_ATTACHMENT_POINT/denypolicies?policyId=POLICY_ID"
```

The call returns a long-running operation; poll it until `done` is `true`:

Adapted (not in the official docs): use the full `name` returned by the mutation (it includes `denypolicies/POLICY_ID`).

```
GET https://iam.googleapis.com/v2/OPERATION_NAME
# OPERATION_NAME = e.g. policies/ENCODED_ATTACHMENT_POINT/denypolicies/POLICY_ID/operations/OPERATION_ID
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `deniedPrincipals` | list | Principals that cannot use the permissions |
| `exceptionPrincipals` | list, optional | Principals exempt from the denial |
| `deniedPermissions` | list | v2-format permissions that cannot be used |
| `exceptionPermissions` | list, optional | Permissions not denied even if listed above |
| `denialCondition` | object, optional | CEL expression; resource-tag functions only |

## Notes

- Deny policies are inherited down the hierarchy and override allow policies. Limit: 500 deny policies and 500 deny rules per resource.
- Deleting a deny policy is permanent; pass `etag` for a conditional delete. Test on a throwaway project before attaching at the organization.
- If denied principals include service agents (for example `principalSet://goog/public:all`), add your service agents as exceptions so services keep working.
- Changes usually take effect within 2 minutes, sometimes 7 minutes or more.
- Source: https://docs.cloud.google.com/iam/docs/deny-access (retrieved 2026-11-14)

## Related

- [deny-policies.md](../references/iam-guides/access-policies/deny-policies.md)
- [allow-policies.md](../references/iam-guides/access-policies/allow-policies.md)
- [access-change-propagation.md](../references/iam-guides/access-policies/access-change-propagation.md)
