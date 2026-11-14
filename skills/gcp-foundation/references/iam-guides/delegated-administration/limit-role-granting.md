---
source: https://docs.cloud.google.com/iam/docs/setting-limits-on-granting-roles
---

# Setting Limits on Granting Roles (Limited IAM Admins)

Use IAM Conditions with the `iam.googleapis.com/modifiedGrantsByRole` API attribute to let a principal grant and revoke only a specified set of roles, so teams can manage their own allow policies within boundaries.

## Signature / Usage

Condition expression format:

```
api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', []).hasOnly(roles)
```

Conditional grant of Project IAM Admin so Noam can manage only two App Engine roles:

```json
{
  "version": 3,
  "etag": "BwWKmjvelug=",
  "bindings": [
    {
      "members": [
        "user:owner@example.com"
      ],
      "role": "roles/owner"
    },
    {
      "members": [
        "user:noam@example.com"
      ],
      "role": "roles/resourcemanager.projectIamAdmin",
      "condition": {
        "title": "only_appengine_admin_viewer_roles",
        "description": "Only allows changes to role bindings with the App Engine Admin or Viewer roles",
        "expression":
          "api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', []).hasOnly(['roles/appengine.appAdmin', 'roles/appengine.appViewer'])"
      }
    }
  ]
}
```

Delegating management safely: grant the conditional role to a group (here `group:iam-compute-admins@example.com`, condition `hasOnly(['roles/compute.admin'])`) and make the team lead a group manager rather than granting her the role directly, so she cannot remove her own condition.

Example expression for the Pub/Sub roles:

```
api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', []).hasOnly(['roles/pubsub.editor', 'roles/pubsub.publisher'])
```

Read-modify-write with gcloud (policy must be set with `"version": 3`):

```bash
gcloud resource-type get-iam-policy resource-id --format=json > path
```

```bash
gcloud resource-type set-iam-policy resource-id path
```

REST read and write (`API_VERSION` is `v1` for projects and organizations, `v2` for folders):

```
POST https://cloudresourcemanager.googleapis.com/API_VERSION/RESOURCE_TYPE/RESOURCE_ID:getIamPolicy
POST https://cloudresourcemanager.googleapis.com/API_VERSION/RESOURCE_TYPE/RESOURCE_ID:setIamPolicy
```

## Options / Props

| Role to grant the limited admin | Scope |
|---|---|
| `roles/resourcemanager.projectIamAdmin` | Project |
| `roles/resourcemanager.folderIamAdmin` | Folder |
| `roles/resourcemanager.organizationAdmin` | Organization (also sets policy on projects and folders) |
| Custom role with `resourcemanager.<type>.setIamPolicy` and `getIamPolicy` | project, folder, or organization |

## Notes

- Limits: up to 10 string-constant roles in the `hasOnly()` list; the default value must be the empty list `[]`. Only projects, folders, and organizations accept these conditions in their allow policies.
- Do not use `&&` or `||` to join several `hasOnly()` statements: a request granting multiple roles at once would fail even if each is permitted separately.
- Do not allow roles containing `setIamPolicy` permissions, or custom roles the limited admin can modify (e.g. when they also hold `roles/iam.roleAdmin`): the admin could escalate to grant any role.
- Not all services recognize `modifiedGrantsByRole`; requests on those fail, except BigQuery datasets, where a limited admin whose role includes dataset grant permissions can grant or revoke regardless of the limits.
- Conditional bindings do not override unconditional bindings for the same role and principal.
- Required permissions to create limited admins: `resourcemanager.{projects,folders,organizations}.getIamPolicy` and `setIamPolicy` (roles Project IAM Admin, Folder Admin, Organization Admin). Enable the Resource Manager API.
- The official gcloud and REST samples of the placeholder policy use corrupted backslash escapes in the retrieved text, so those two blocks are not reproduced; the policy shape is the same as the JSON above.
- Source: https://docs.cloud.google.com/iam/docs/setting-limits-on-granting-roles
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [policy-types-and-inheritance.md](../policy-concepts/policy-types-and-inheritance.md)
