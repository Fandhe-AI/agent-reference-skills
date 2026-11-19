---
source: https://docs.cloud.google.com/bigquery/docs/access-control-intro
---

# Introduction to security and access controls in BigQuery

IAM lets you grant granular access to specific BigQuery resources under the principle of least privilege. Principals (users, groups, service accounts) receive predefined or custom roles on a resource; the roles also apply to all descendants of that resource in the resource hierarchy.

## Signature / Usage

### Grant a role with DCL

Roles can be granted on datasets, tables, views and routines (see the resource list below) with the GoogleSQL data control language. Syntax:

```sql
GRANT role_list
  ON resource_type resource_name
  TO user_list
```

## Options / Props

### IAM role types

| Type | Description |
|------|-------------|
| Predefined roles | Managed by Google Cloud; support common use cases and access control patterns. |
| Custom roles | Access according to a user-specified list of permissions. |

### Resources you can grant access to

| Level | Resources |
|-------|-----------|
| Resource Manager | Organizations, folders, projects (roles apply to **all** BigQuery resources in the organization or project) |
| Dataset | Datasets, and within a dataset: tables and views, routines |
| Other | Connections, saved queries, data canvases, data preparations, pipelines, repositories |

### Ways to check which permissions a predefined role contains

| Method |
|--------|
| BigQuery IAM roles and permissions reference |
| IAM roles and permissions index |
| `gcloud iam roles describe` |
| `roles.get()` method in the IAM API |

## Notes

- Permissions are not assigned directly to principals. When you assign multiple roles, the permissions granted are the union of each role's permissions.
- New permissions might be added to predefined roles, and new predefined roles can be added at any time. If role definitions must remain unchanged, create custom IAM roles.
- Roles can be applied to tables and views and to routines within a dataset. Roles cannot be applied to models.
- Caution from the source: don't grant BigQuery basic roles to datasets. Dataset-level basic roles pre-date IAM and provide excessive and uneven access; for example, the `Owner` basic role does not provide table access permissions.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language (the source twin has no code).
- IAM in general (principals, policies, custom roles) is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/bigquery/docs/access-control-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [dataset-access-control.md](./dataset-access-control.md)
- [authorized-views.md](./authorized-views.md)
- [conditions.md](./conditions.md)
