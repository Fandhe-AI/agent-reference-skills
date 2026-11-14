---
source: https://docs.cloud.google.com/iam/docs/configuring-temporary-access
---

# Configuring Temporary and Resource-Based Access with Conditions

How to set expiring and schedule-based access, and name-prefix / extracted-value resource conditions, with conditional role bindings (examples use projects, but any resource accepting allow policies works).

## Signature / Usage

Required roles: Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) for projects, Folder Admin (`roles/resourcemanager.folderAdmin`) for folders, Organization Admin (`roles/resourcemanager.organizationAdmin`) for projects, folders, and organizations, or Security Admin (`roles/iam.securityAdmin`) for almost all resources. Permissions: `resourcemanager.{projects,folders,organizations}.getIamPolicy` and `.setIamPolicy`.

### Expiring access (console condition editor)

```text
request.time < timestamp("2020-07-01T00:00:00.000Z")
```

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

```
POST https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:getIamPolicy
```

```
{
  "options": {
    "requestedPolicyVersion": POLICY_VERSION
  }
}
```

Modify with `"version": 3` and a `condition`, then write:

```
POST https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:setIamPolicy
```

```
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

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://cloudresourcemanager.googleapis.com/v1/projects/PROJECT_ID:getIamPolicy"
```

### Weekday working hours

```text
request.time.getHours("Europe/Berlin") >= 9 &&
request.time.getHours("Europe/Berlin") <= 17 &&
request.time.getDayOfWeek("Europe/Berlin") >= 1 &&
request.time.getDayOfWeek("Europe/Berlin") <= 5
```

As a binding condition field:

```json
"expression": "request.time.getHours('Europe/Berlin') >= 9 && request.time.getHours('Europe/Berlin') <= 17 && request.time.getDayOfWeek('Europe/Berlin') >= 1 && request.time.getDayOfWeek('Europe/Berlin') <= 5"
```

### Resource name prefix (Compute Engine)

Grants `roles/compute.instanceAdmin` for disks and instances whose names start with a prefix, and for all other resource types:

```text
(resource.type == "compute.googleapis.com/Disk" &&
resource.name.startsWith("projects/PROJECT_ID/zones/ZONE_ID/disks/PREFIX")) ||
(resource.type == "compute.googleapis.com/Instance" &&
resource.name.startsWith("projects/PROJECT_ID/zones/ZONE_ID/instances/PREFIX")) ||
(resource.type != "compute.googleapis.com/Disk" &&
resource.type != "compute.googleapis.com/Instance")
```

Prefix across zones: enumerate each zone.

```none
resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_1_ID/instances/devAccess') ||
 resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_2_ID/instances/devAccess')
```

### Extract values from resource names

Cloud Storage objects from the last 30 days (object name looks like `projects/_/buckets/acme-orders-aaa/objects/data_lake/orders/order_date=2019-11-03/aef87g87ae0876`):

```text
resource.type == 'storage.googleapis.com/Object' &&
  request.time - duration('2592000s') < date(resource.name.extract('/order_date={date_str}/'))
```

Compute Engine VMs named `dev-*` in any location, plus all other resource types:

```text
resource.type != 'compute.googleapis.com/Instance' ||
  resource.name.extract('/instances/{name}').startsWith('dev-')
```

### Custom roles with multi-type permissions

A condition checking only disks blocks VM operations:

```none
resource.type == 'compute.googleapis.com/Disk' &&
 resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_ID/disks/staging')
```

Check both disks and instances (other types not granted):

```none
(resource.type == 'compute.googleapis.com/Disk' &&
  resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_ID/disks/staging')) ||
 (resource.type == 'compute.googleapis.com/Instance' &&
  resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_ID/instances/staging'))
```

### Parent-only permissions (list)

`list` permissions are checked on the parent (here a project). Extend the condition so they work:

```none
(resource.type == 'compute.googleapis.com/Disk' &&
  resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_ID/disks/PREFIX')) ||
 (resource.type == 'compute.googleapis.com/Instance' &&
  resource.name.startsWith('projects/PROJECT_ID/zones/ZONE_ID/instances/PREFIX')) ||
 resource.type == 'cloudresourcemanager.googleapis.com/Project'
```

## Notes

- Conditional bindings do not override unconditional ones; conditions are not allowed with legacy basic roles (Owner, Editor, Viewer) or `allUsers` / `allAuthenticatedUsers`.
- The console (condition builder) offers **Expiring Access** with operator **by**; use the Condition editor for expressions; `extract()` is available only in the editor, not the builder. **Run Linter** validates CEL.
- When using a version 3 policy via REST, set `version` to `3`. If you keep policies in version control, store the policy returned by IAM, not the one you sent.
- Conditions at organization/folder/project level are inherited; parts that use attributes a resource does not provide never grant access. Scope with `resource.type` / `resource.service`.
- Parent-only permissions only apply to `list` operations; the owning service must recognize the attributes (for example Resource Manager does not recognize `resource.name`, so you cannot use it in a project-level condition for those permissions).
- The official 'Weekday working hours' console example is identical in logic to the REST body.
- Source: https://docs.cloud.google.com/iam/docs/configuring-temporary-access (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/configuring-resource-based-access (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [conditions-overview.md](./conditions-overview.md)
- [conditions-attribute-reference.md](./conditions-attribute-reference.md)
- [allow-policies.md](../access-policies/allow-policies.md)
