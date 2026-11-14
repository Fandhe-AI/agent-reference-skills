---
source: https://docs.cloud.google.com/iam/docs/deny-overview
---

# IAM Deny Policies

Deny policies set guardrails: deny rules prevent principals from using certain permissions regardless of the roles they hold. IAM always checks deny policies before allow policies.

## Signature / Usage

Attachment point formats (for the REST API, URL-encode the entire value):

| Resource | gcloud format | REST format |
|---|---|---|
| Organization | `cloudresourcemanager.googleapis.com/organizations/123456789012` | `cloudresourcemanager.googleapis.com%2Forganizations%2F123456789012` |
| Folder | `cloudresourcemanager.googleapis.com/folders/987654321098` | `cloudresourcemanager.googleapis.com%2Ffolders%2F987654321098` |
| Project | `cloudresourcemanager.googleapis.com/projects/my-project` | `cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project` |

Example deny policy: all principals are denied project deletion unless they are in `project-admins` or the project has tag value `test`.

Adapted (not in the official docs): corrected the official sample's typo `googelapis.com` to `googleapis.com` in the `exceptionPermissions` entry.

```json
{
  "name": "policies/cloudresourcemanager.googleapis.com%2Fprojects%2F253519172624/denypolicies/limit-project-deletion",
  "uid": "06ccd2eb-d2a5-5dd1-a746-eaf4c6g3f816",
  "kind": "DenyPolicy",
  "displayName": "Only project admins can delete projects.",
  "etag": "MTc1MTkzMjY0MjUyMTExODMxMDQ=",
  "createTime": "2021-09-07T23:15:35.258319Z",
  "updateTime": "2021-09-07T23:15:35.258319Z",
  "rules": [
    {
      "denyRule": {
        "deniedPrincipals": [
          "principalSet://goog/public:all"
        ],
        "exceptionPrincipals": [
          "principalSet://goog/group/project-admins@example.com"
        ],
        "deniedPermissions": [
          "cloudresourcemanager.googleapis.com/projects.delete",
          "cloudresourcemanager.googleapis.com/folders.*"
        ],
        "exceptionPermissions": [
          "cloudresourcemanager.googleapis.com/folders.list",
          "cloudresourcemanager.googleapis.com/folders.get"
        ],
        "denialCondition": {
          "title":  "Only for non-test projects",
          "expression": "!resource.matchTag('12345678/env', 'test')"
        }
      }
    }
  ]
}
```

### Use case: centralize administrative privileges

Deny custom role management to everyone except `custom-role-admins`; attach to the organization.

```json
{
  "deniedPrincipals": [
    "principalSet://goog/public:all"
  ],
  "exceptionPrincipals": [
    "principalSet://goog/group/custom-role-admins@example.com"
  ],
  "deniedPermissions": [
    "iam.googleapis.com/roles.create",
    "iam.googleapis.com/roles.delete",
    "iam.googleapis.com/roles.update"
  ]
}
```

### Use case: exceptions to inherited access grants

Grant Service Account Key Admin (`roles/iam.serviceAccountKeyAdmin`) on a folder, then deny key create/delete in one project (`example-prod`) by attaching this rule to that project:

```json
{
  "deniedPrincipals": [
    "principalSet://goog/group/eng@example.com"
  ],
  "deniedPermissions": [
    "iam.googleapis.com/serviceAccountKeys.create",
    "iam.googleapis.com/serviceAccountKeys.delete"
  ]
}
```

To exempt a subset (`eng-prod`) add `exceptionPrincipals`:

```json
{
  "deniedPrincipals": [
    "principalSet://goog/group/eng@example.com"
  ],
  "exceptionPrincipals": [
    "principalSet://goog/group/eng-prod@example.com"
  ],
  "deniedPermissions": [
    "iam.googleapis.com/serviceAccountKeys.create",
    "iam.googleapis.com/serviceAccountKeys.delete"
  ]
}
```

### Use case: block access based on tags

Only `project-admins` can delete projects tagged `env=prod`, without adding IAM Conditions to every grant (attach to the organization):

```json
{
  "displayName": "Only project admins can delete production projects.",
  "rules": [
    {
      "denyRule": {
        "deniedPrincipals": [
          "principalSet://goog/public:all"
        ],
        "exceptionPrincipals": [
          "principalSet://goog/group/project-admins@example.com"
        ],
        "deniedPermissions": [
          "cloudresourcemanager.googleapis.com/projects.delete"
        ],
        "denialCondition": {
          "title":  "Only for prod projects",
          "expression": "resource.matchTag('12345678/env', 'prod')"
        }
      }
    }
  ]
}
```

## Options / Props

### Deny policy metadata

| Field | Description |
|---|---|
| `name` | `policies/ATTACHMENT_POINT/denypolicies/POLICY_ID` |
| `uid` | Unique ID assigned by Google |
| `kind` | Always `DenyPolicy` |
| `displayName` | Optional human-readable name |
| `etag` | Version identifier; must match the stored value or the update fails |
| `createTime` / `updateTime` | Creation and last-update times |

### Deny rule fields

| Field | Description |
|---|---|
| `deniedPrincipals` | Principals denied the permissions. Individual (user, service account, single workforce/workload identity) and sets (Google groups, Cloud Identity domains, workforce/workload sets, all internet users). Identifiers: "Principal identifiers for deny policies" |
| `exceptionPrincipals` | Optional. Exempt principals, even if listed or in a listed group |
| `deniedPermissions` | Permissions in IAM `v2` format `SERVICE_FQDN/RESOURCE.ACTION` (e.g. `iam.googleapis.com/roles.delete`). Only supported permissions can be denied |
| `exceptionPermissions` | Optional. Permissions principals can still use even if they match `deniedPermissions` (e.g. carve-outs from a permission group) |
| `denialCondition` | Optional. If true or cannot be evaluated, the deny applies; if false, it does not. |

### Permission groups

| Pattern | Denies |
|---|---|
| `SERVICE_FQDN/RESOURCE.*` | All permissions for the resource |
| `SERVICE_FQDN/*.*` | All permissions for the service |
| `SERVICE_FQDN/*.VERB` | All permissions for the service ending in the verb |

### Supported permissions (deny)

Deny policies require the IAM `v2` permission format `SERVICE_FQDN/RESOURCE.ACTION`; `SERVICE_FQDN` is typically the v1 `SERVICE_ID` plus `.googleapis.com`. Only a subset of permissions is supported, and some have aliases (either form works). The full table is a per-service list such as `accessapproval.googleapis.com/requests.approve`, `accessapproval.googleapis.com/*.*` and `accesscontextmanager.googleapis.com/servicePerimeters.commit`; consult the official supported-permissions page for a specific service.

## Notes

- Limits: each resource can have up to 500 deny policies, containing a total of 500 deny rules. Each deny policy is evaluated independently.
- Deny policies attach to a project, folder, or organization and are inherited by all descendants; a more permissive lower-level deny policy cannot override a higher-level deny.
- Denial conditions have the same structure as IAM Conditions but only recognize resource tag functions.
- Permission groups include all current and future matching permissions. Wildcards work only in supported permission groups.
- Access changes are eventually consistent.
- Deny rules using `principalSet://goog/public:all` with exceptions can lock out administrators; always include an exception group for break-glass administrators.
- Corrected from the official docs: the example contains the typo `cloudresourcemanager.googelapis.com/folders.get`; fixed to `googleapis.com`.
- Source: https://docs.cloud.google.com/iam/docs/deny-overview
- Source: https://docs.cloud.google.com/iam/docs/deny-permissions-support
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [pab-enforcement-versions.md](./pab-enforcement-versions.md)
- [custom-org-policy-iam.md](./custom-org-policy-iam.md)
- [permission-errors-and-resource-names.md](./permission-errors-and-resource-names.md)
