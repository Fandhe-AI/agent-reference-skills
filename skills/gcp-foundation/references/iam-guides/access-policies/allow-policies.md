---
source: https://docs.cloud.google.com/iam/docs/allow-policies
---

# IAM Allow Policies

Allow policies grant access to Google Cloud resources. One allow policy is attached per resource and it also applies to descendants that inherit it.

## Signature / Usage

An allow policy is a collection of role bindings plus metadata (`etag`, `version`, optional `auditConfig` on organizations, folders, projects, and billing accounts). Each role binding has principals (`members`), one `role`, and an optional `condition`.

### Simple policy

```json
{
  "bindings": [
    {
      "members": [
        "user:jie@example.com"
      ],
      "role": "roles/owner"
    }
  ],
  "etag": "BwUjMhCsNvY=",
  "version": 1
}
```

### Multiple role bindings

```json
{
  "bindings": [
    {
      "members": [
        "user:jie@example.com"
      ],
      "role": "roles/resourcemanager.organizationAdmin"
    },
    {
      "members": [
        "user:raha@example.com",
        "user:jie@example.com"
      ],
      "role": "roles/resourcemanager.projectCreator"
    }
  ],
  "etag": "BwUjMhCsNvY=",
  "version": 1
}
```

### Conditional role binding (version 3)

```json
{
  "bindings": [
    {
      "members": [
        "group:prod-dev@example.com",
        "serviceAccount:prod-dev-example@appspot.gserviceaccount.com"
      ],
      "role": "roles/appengine.deployer",
      "condition": {
        "title": "Expires_July_1_2022",
        "description": "Expires on July 1, 2022",
        "expression": "request.time < timestamp('2022-07-01T00:00:00.000Z')"
      }
    }
  ],
  "etag": "BwWKmjvelug=",
  "version": 3
}
```

Conditional bindings do not override unconditional bindings for the same principal and role: if a principal is in an unconditional binding for a role, it always has that role.

### Deleted principals

Bindings for deleted principals get a `deleted:` prefix (service accounts also `?uid=numeric-id`). A newly created principal with the same name does not inherit them; add it explicitly.

```json
{
  "bindings": [
    {
      "members": [
        "deleted:serviceAccount:my-service-account@project-id.iam.gserviceaccount.com?uid=123456789012345678901"
      ],
      "role": "roles/owner"
    },
    {
      "members": [
        "serviceAccount:my-service-account@project-id.iam.gserviceaccount.com"
      ],
      "role": "roles/resourcemanager.projectCreator"
    }
  ],
  "etag": "BwUjMhCsNvY=",
  "version": 1
}
```

### Concurrency control with etag

Policies are updated with read-modify-write. Include the `etag` from the read in the write; on mismatch the REST API returns `409 Conflict`. Retry the whole read-modify-write with exponential backoff.

```json
{
  "error": {
    "code": 409,
    "message": "There were concurrent policy changes. Please retry the whole read-modify-write with exponential backoff.",
    "status": "ABORTED"
  }
}
```

### Requesting a policy version

```bash
POST https://cloudresourcemanager.googleapis.com/v1/projects/project-id:getIamPolicy
```

```json
{
  "options": {
    "requestedPolicyVersion": 3
  }
}
```

If the request omits a version, IAM assumes version 1 and conditional bindings are returned without the condition, with the role name suffixed by `_withcond_<hash>`:

```json
{
  "bindings": [
    {
      "members": [
        "user:tal@example.com"
      ],
      "role": "roles/iam.securityReviewer_withcond_58e135cabb940ad9346c"
    }
  ],
  "etag": "BwWKmjvelug=",
  "version": 1
}
```

## Options / Props

### Policy versions

| Version | Description |
|---|---|
| `1` | First schema. One role bound to one or more principals. No conditional role bindings. |
| `2` | Reserved for internal use. |
| `3` | Adds the `condition` field in role bindings. |

### Limits

| Limit | Value |
|---|---|
| Principals per allow policy | 1,500 (every appearance counts, no deduplication; includes principals exempted from Data Access audit logging; a domain or group counts as one principal per appearance) |
| Google groups, Cloud Identity domains, Google Workspace accounts per policy | 250 (a unique group counts once; domains/accounts count every appearance) |

With IAM Conditions or very long principal identifiers, fewer principals may be allowed.

### Policy inheritance

The effective policy of a resource is the union of the allow policy on the resource and those on all its ancestors (organization, folders, project). Each inherited binding is evaluated independently; access is granted if any binding grants it. Adding a binding at any level widens access.

| Role on organization (Storage Object Viewer) | Role on `myproject-123` (Storage Object Creator) | Effective on `myproject-123` |
|---|---|---|
| resourcemanager.projects.get, resourcemanager.projects.list, storage.objects.get, storage.objects.list | resourcemanager.projects.get, resourcemanager.projects.list, storage.objects.create | union of both |

## Notes

- Basic roles contain thousands of permissions across all services. In production, do not grant basic roles such as Owner unless there is no alternative; prefer predefined or custom roles.
- If you use IAM Conditions, always specify version 3 and always include `etag` when writing via REST or client libraries. Omitting `etag` lets a version 1 policy overwrite a version 3 policy and deletes all conditions.
- The Google Cloud console and gcloud CLI set the policy version automatically.
- Changes are eventually consistent; see access-change-propagation.md.
- Default policies: most resources start empty, but a new project gets a binding granting its creator `roles/owner` (created by the system, no `setIamPolicy` needed).
- If you remove a deleted principal from a binding and then undelete the principal, it is not added back.
- Some services do not accept conditions in allow policies.
- Best practices: use groups instead of individual principals; grant at the organization level only to a few teams (Security, Network); mirror operational structure with folder tiers; grant at project level for least privilege (or use IAM Conditions on folder/org grants); do not grant to principals outside your domain (enforce with the `iam.allowedPolicyMemberDomains` constraint, enforced by default with your domain for organizations created on or after May 3, 2024).
- Source: https://docs.cloud.google.com/iam/docs/allow-policies (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-change-propagation.md](./access-change-propagation.md)
- [deny-policies.md](./deny-policies.md)
- [conditions-overview.md](../conditions/conditions-overview.md)
