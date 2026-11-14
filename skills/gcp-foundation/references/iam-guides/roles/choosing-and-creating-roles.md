---
source: https://docs.cloud.google.com/iam/docs/creating-custom-roles
---

# Choosing Role Types and Managing Custom Roles

Guidance on picking basic, predefined, or custom roles, a five-step process for choosing predefined roles, and gcloud/REST commands for custom roles.

## Signature / Usage

Required roles to manage custom roles: Role Administrator (`roles/iam.roleAdmin`) on a project, Organization Role Administrator (`roles/iam.organizationRoleAdmin`) on an organization.

### List permissions available for custom roles

```
gcloud iam list-testable-permissions FULL_RESOURCE_NAME \
    --filter="customRolesSupportLevel!=NOT_SUPPORTED"
```

`FULL_RESOURCE_NAME` is `//cloudresourcemanager.googleapis.com/projects/my-project` or `//cloudresourcemanager.googleapis.com/organizations/123456789012`. Result format:

```
---
name: appengine.applications.create
stage: GA
---
customRolesSupportLevel: TESTING
name: appengine.applications.disable
stage: GA
```

### Describe a role

```
gcloud iam roles describe roles/iam.roleViewer
gcloud iam roles describe --organization=ORGANIZATION_ID ROLE_ID
gcloud iam roles describe --project=PROJECT_ID ROLE_ID
```

### Create a custom role from a YAML file

```yaml
title: ROLE_TITLE
description: ROLE_DESCRIPTION
stage: LAUNCH_STAGE
includedPermissions:
- PERMISSION_1
- PERMISSION_2
```

```
gcloud iam roles create ROLE_ID --project=PROJECT_ID \
    --file=YAML_FILE_PATH
```

```yaml
title: "My Company Admin"
description: "My custom role description."
stage: "ALPHA"
includedPermissions:
- iam.roles.get
- iam.roles.list
```

```
gcloud iam roles create myCompanyAdmin --organization=123456789012 \
    --file=my-role-definition.yaml
```

Output:

```yaml
Created role [myCompanyAdmin].
description: My custom role description.
etag: BwVkBX0sQD0=
includedPermissions:
- iam.roles.get
- iam.roles.list
name: organizations/123456789012/roles/myCompanyAdmin
stage: ALPHA
title: My Company Admin
```

### Create a custom role with flags

```
gcloud iam roles create myCompanyAdmin --project=my-project \
    --title="My Company Admin" --description="My custom role description." \
    --permissions="iam.roles.get,iam.roles.list" --stage=ALPHA
```

### Create via REST

```
POST https://iam.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/roles
```

```
{
  "roleId": "ROLE_ID",
  "role": {
    "title": "ROLE_TITLE",
    "description": "ROLE_DESCRIPTION",
    "includedPermissions": [
      "PERMISSION_1",
      "PERMISSION_2"
    ],
    "stage": "LAUNCH_STAGE"
  }
}
```

`RESOURCE_TYPE` is `projects` or `organizations`; `LAUNCH_STAGE` is one of `EAP`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`, `DISABLED`.

### Update, disable, list, delete, undelete

```
gcloud iam roles describe ROLE_ID --project=PROJECT_ID

gcloud iam roles update ROLE_ID --project=PROJECT_ID \
    --file=YAML_FILE_PATH

gcloud iam roles update myCompanyAdmin --organization=123456789012 \
    --add-permissions="storage.buckets.get,storage.buckets.list"

gcloud iam roles update ROLE_ID --project=PROJECT_ID \
    --stage=DISABLED

gcloud iam roles list --project=PROJECT_ID
gcloud iam roles list --organization=ORGANIZATION_ID

gcloud iam roles delete ROLE_ID --project=PROJECT_ID
gcloud iam roles undelete ROLE_ID --project=PROJECT_ID
```

Other update flags: `--remove-permissions=PERMISSIONS`, `--permissions=PERMISSIONS` (replace), `--title`, `--description`, `--stage`. Use `--organization=ORGANIZATION_ID` in place of `--project` for organization roles.

## Options / Props

### Role type guidance

| Type | When to use |
|------|-------------|
| Predefined | Default choice; managed by Google and updated as services add permissions. Prefer broad Admin / Editor / Viewer roles per service. |
| Custom | When every predefined role containing a needed permission also has permissions the principal should not have, or a role recommendation proposes a custom role. Not updated automatically. |
| Basic (Owner, Editor, Viewer) | Only when there is no alternative, e.g. development or test environments. |

### Custom role limits

| Limit | Value |
|-------|-------|
| Permissions per custom role | 3,000 |
| Total size of title, description, permission names | 64 KB |
| Organization-level custom roles per organization | 300 |
| Project-level custom roles per project | 300 |

### Choosing predefined roles

1. Identify necessary permissions (service docs, API reference per-method permissions, permission names `SERVICE.RESOURCE_TYPE.ACTION`). Focus on the most powerful permissions: create/delete resources, sensitive data access, set allow or deny policy, update organizations/folders/projects.
2. Find roles that contain them (IAM roles and permissions index; predefined roles for job functions).
3. Eliminate basic roles (in production) and service agent roles (`...serviceAgent`), then choose roles with all likely-needed permissions, or the fewest permissions for strict least privilege.
4. Grant at the lowest level that meets needs; use IAM Conditions to limit to specific resources.
5. Grant the roles, then verify with Policy Analyzer, Policy Troubleshooter, and role recommendations.

## Notes

- Custom roles cannot be defined at folder level; define at the organization level to use within a folder.
- A project-level custom role cannot contain permissions usable only at organization/folder level (for example `resourcemanager.organizations.get`): gcloud returns `INVALID_ARGUMENT: Permission PERMISSION is not valid`; the console unselects them with a warning.
- Wildcards (`*`) are not allowed in permission names, and only permissions supported in custom roles are accepted. Predefined roles that contain deprecated or restricted permissions yield custom roles that omit them.
- If a role exceeds the limits, split permissions across several roles titled like `Custom Admin (1 of 2)` and `Custom Admin (2 of 2)`.
- The `DISABLED` launch stage disables a custom role; `gcloud iam roles delete` removes it from `list` unless shown deleted, and `undelete` restores it.
- Basic roles contain thousands of permissions; replace them using role recommendations and check with Policy Simulator.
- Excluded from this page: the 14,000-line permission support matrix (https://docs.cloud.google.com/iam/docs/custom-roles-permissions-support); look up there which permissions support custom roles.
- Source: https://docs.cloud.google.com/iam/docs/creating-custom-roles (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/choose-role-type (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/iam/docs/choose-predefined-roles (retrieved 2026-11-14; CC BY 4.0)

## Related

- [allow-policies.md](../access-policies/allow-policies.md)
- [conditions-overview.md](../conditions/conditions-overview.md)
