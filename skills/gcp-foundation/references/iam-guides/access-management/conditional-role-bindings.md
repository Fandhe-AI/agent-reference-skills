---
source: https://docs.cloud.google.com/iam/docs/managing-conditional-role-bindings
---

# Managing Conditional Role Bindings

Add, modify, and remove IAM Conditions on role bindings in an allow policy using the read-modify-write pattern.

## Signature / Usage

Read, edit, then set (the gcloud CLI bumps `version` automatically):

```bash
gcloud projects get-iam-policy project-id --format json > file-path
gcloud projects set-iam-policy project-id file-path
```

Add a time-limited condition to a binding:

```json
{
  "bindings": [
    {
      "members": [
        "user:my-user@example.com"
      ],
      "role": "roles/owner"
    },
    {
      "members": [
        "group:my-group@example.com"
      ],
      "role": "roles/iam.securityReviewer",
      "condition": {
          "title": "Expires_2019",
          "description": "Expires at noon on 2019-12-31",
          "expression":
            "request.time < timestamp('2019-12-31T12:00:00Z')"
      }
    }
  ],
  "etag": "BwWKmjvelug=",
  "version": 3
}
```

Modify an existing condition by editing its `title`, `description`, and expression:

```json
{
  "members": [
    "group:my-group@example.com"
  ],
  "role": "roles/bigquery.dataViewer",
  "condition": {
    "title": "Duration_5_months",
    "description": "Expires in 5 months on 2020-01-12",
    "expression":
      "request.time > timestamp('2019-07-12T07:00:00.000Z') && request.time < timestamp('2020-01-12T07:00:00.000Z')"
  }
}
```

Remove a condition by deleting the `condition` block (the role then applies unconditionally):

```json
{
  "members": [
    "group:my-group@example.com"
  ],
  "role": "roles/bigquery.dataViewer"
}
```

REST read step:

```text
POST https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:getIamPolicy
```

```json
{
  "options": {
    "requestedPolicyVersion": POLICY_VERSION
  }
}
```

Console condition editor expression example:

```text
request.time < timestamp("2019-12-31T12:00:00.000Z")
```

## Options / Props

| Item | Detail |
|---|---|
| Permissions | `SERVICE.RESOURCE_TYPE.{get,getIamPolicy,setIamPolicy}`, for projects `resourcemanager.projects.{get,getIamPolicy,setIamPolicy}` |
| Role example | Security Admin (`roles/iam.securityAdmin`) |
| Policy version | Use `3` when setting policies; the REST read should request version 3 |

## Notes

- Conditional bindings do not override unconditional bindings: if a principal is already bound to a role without a condition, adding a conditional binding for the same role has no effect.
- Conditions cannot be used with legacy basic roles (Owner, Editor, Viewer) or with `allUsers` / `allAuthenticatedUsers`.
- Removing a condition does not revoke the role; it makes the role unconditional. Keep `version` at 3 even for unconditional bindings.
- Use the console "Run Linter" or the IAM linter (alpha) to validate CEL before saving.
- Source: https://docs.cloud.google.com/iam/docs/managing-conditional-role-bindings
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [grant-revoke-allow-policy.md](./grant-revoke-allow-policy.md)
- [../policy-guardrails/lint-conditions.md](../policy-guardrails/lint-conditions.md)
