---
source: https://docs.cloud.google.com/iam/docs/configuring-temporary-access
---

# Conditional Role Binding: Expiring and Resource-Scoped Access

Grant a role that expires, applies only in working hours, or applies only to resources whose names match a prefix.

## Signature / Usage

### Expiring access (gcloud, read-modify-write)

```bash
gcloud projects get-iam-policy project-id --format=json > filepath
```

Edit the file (gcloud sets the version automatically):

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
        "title": "Expires_July_1_2020",
        "description": "Expires on July 1, 2020",
        "expression": "request.time < timestamp('2020-07-01T00:00:00.000Z')"
      }
    }
  ],
  "etag": "BwWKmjvelug=",
  "version": 3
}
```

```bash
gcloud projects set-iam-policy project-id filepath
```

### Expiring access (REST)

Adapted (not in the official docs): `setIamPolicy` replaces the whole policy, and `etag` only detects concurrent changes. First read the current policy with `requestedPolicyVersion: 3`, then send back every existing binding and condition together with the new binding. The Owner binding below stands for the existing bindings returned by `getIamPolicy`.

```text
POST https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:getIamPolicy
```

```json
{
  "options": {
    "requestedPolicyVersion": 3
  }
}
```

```text
POST https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:setIamPolicy
```

```json
{
  "policy": {
    "version": 3,
    "etag": "BwWKmjvelug=",
    "bindings": [
      {
        "role": "roles/owner",
        "members": [
          "user:my-user@example.com"
        ]
      },
      {
        "role": "roles/iam.securityReviewer",
        "members": [
          "group:my-group@example.com"
        ],
        "condition": {
          "title": "Expires_July_1_2020",
          "description": "Expires on July 1, 2020",
          "expression":
            "request.time < timestamp('2020-07-01T00:00:00.000Z')"
        }
      }
    ]
  }
}
```

### Weekday working hours

```text
request.time.getHours("Europe/Berlin") >= 9 &&
request.time.getHours("Europe/Berlin") <= 17 &&
request.time.getDayOfWeek("Europe/Berlin") >= 1 &&
request.time.getDayOfWeek("Europe/Berlin") <= 5
```

### Resource name prefix (Compute Engine)

```text
(resource.type == "compute.googleapis.com/Disk" &&
resource.name.startsWith("projects/PROJECT_ID/zones/ZONE_ID/disks/PREFIX")) ||
(resource.type == "compute.googleapis.com/Instance" &&
resource.name.startsWith("projects/PROJECT_ID/zones/ZONE_ID/instances/PREFIX")) ||
(resource.type != "compute.googleapis.com/Disk" &&
resource.type != "compute.googleapis.com/Instance")
```

### Extract a value from the resource name

```text
resource.type != 'compute.googleapis.com/Instance' ||
  resource.name.extract('/instances/{name}').startsWith('dev-')
```

## Options / Props

| Policy field | Detail |
|---|---|
| `version` | Must be `3` when any binding has a `condition` |
| `condition.title` / `description` | Label and explanation |
| `condition.expression` | CEL expression; `request.time`, `resource.type`, `resource.name` are used above |

## Notes

- Conditional bindings do not override unconditional ones; conditions are not allowed with legacy basic roles (Owner, Editor, Viewer) or `allUsers` / `allAuthenticatedUsers`. The Owner binding above is the official sample's unconditional neighbor, so use a throwaway project.
- Adapted from the official docs: the REST example first reads the policy (version 3) and writes back all existing bindings plus the conditional one, because `setIamPolicy` replaces the entire policy.
- Always send `version: 3` and the `etag` when writing via REST; omitting them can drop all conditions.
- Scope conditions with `resource.type` / `resource.service`; attributes a resource does not provide never grant access.
- `list` permissions are checked on the parent, so a prefix condition alone does not allow listing.
- Source: https://docs.cloud.google.com/iam/docs/configuring-temporary-access (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/configuring-resource-based-access (retrieved 2026-11-14)

## Related

- [temporary-and-resource-based-access.md](../references/iam-guides/conditions/temporary-and-resource-based-access.md)
- [conditions-overview.md](../references/iam-guides/conditions/conditions-overview.md)
- [allow-policies.md](../references/iam-guides/access-policies/allow-policies.md)
