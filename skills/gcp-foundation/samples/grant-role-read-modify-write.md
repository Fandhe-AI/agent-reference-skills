---
source: https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access
---

# Grant and Revoke a Role on a Project

Grant a role with a single binding command, or edit the allow policy with read-modify-write and an `etag`.

## Signature / Usage

### One-binding shortcut

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME \
    --condition=CONDITION
```

```bash
gcloud RESOURCE_TYPE remove-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME
```

### Read-modify-write

Read the current policy:

```bash
gcloud projects get-iam-policy my-project --format=json > ~/policy.json
```

Add a principal to an existing binding:

```json
{
  "role": "roles/iam.securityReviewer",
  "members": [
    "user:kai@example.com",
    "user:raha@example.com"
  ]
}
```

Or add a new binding:

```json
{
  "role": "roles/compute.storageAdmin",
  "members": [
    "user:raha@example.com"
  ]
}
```

Write it back:

```bash
gcloud projects set-iam-policy my-project ~/policy.json
```

### REST

Adapted (not in the official docs): the REST URL uses `REST_COLLECTION` (`projects`, `folders`, or `organizations`), separate from the gcloud `RESOURCE_TYPE`.

```text
POST https://cloudresourcemanager.googleapis.com/API_VERSION/REST_COLLECTION/RESOURCE_ID:getIamPolicy
```

```json
{
  "options": {
    "requestedPolicyVersion": POLICY_VERSION
  }
}
```

```text
POST https://cloudresourcemanager.googleapis.com/API_VERSION/REST_COLLECTION/RESOURCE_ID:setIamPolicy
```

```json
{
  "policy": POLICY
}
```

### Concurrency error

If the `etag` no longer matches, the REST API returns `409`; retry the whole read-modify-write with exponential backoff.

```json
{
  "error": {
    "code": 409,
    "message": "There were concurrent policy changes. Please retry the whole read-modify-write with exponential backoff.",
    "status": "ABORTED"
  }
}
```

## Options / Props

| Item | Detail |
|---|---|
| `RESOURCE_TYPE` (gcloud) | `projects`, `resource-manager folders`, or `organizations` |
| `REST_COLLECTION` (REST URL) | `projects`, `folders`, or `organizations` |
| `API_VERSION` | `v1` for projects and organizations; `v2` for folders |
| `PRINCIPAL` | `PRINCIPAL_TYPE:ID`, for example `user:my-user@example.com` |
| `ROLE_NAME` | `roles/SERVICE.IDENTIFIER`, `projects/PROJECT_ID/roles/IDENTIFIER`, or `organizations/ORG_ID/roles/IDENTIFIER` |
| `POLICY_VERSION` | Request version 3 |

## Notes

- Adapted from the official docs: the REST URLs use a separate `REST_COLLECTION` placeholder (`folders` for folders) because `resource-manager folders` is a gcloud command group, not a REST collection.
- `setIamPolicy` permanently overwrites the policy; always read first and keep the `etag`. Omitting `etag` with a version 1 body can wipe conditional bindings.
- Prefer predefined or custom roles; avoid `roles/owner` in production and use a disposable project when trying basic roles.
- `get-iam-policy` does not show inherited roles. Changes usually take effect within 2 minutes, sometimes 7 minutes or more.
- Role bindings with no principals are an error.
- Source: https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/allow-policies (retrieved 2026-11-14)

## Related

- [grant-revoke-allow-policy.md](../references/iam-guides/access-management/grant-revoke-allow-policy.md)
- [allow-policies.md](../references/iam-guides/access-policies/allow-policies.md)
- [access-change-propagation.md](../references/iam-guides/access-policies/access-change-propagation.md)
