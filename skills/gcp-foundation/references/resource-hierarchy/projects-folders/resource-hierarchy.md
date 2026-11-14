---
source: https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy
---

# Google Cloud Resource Hierarchy

Organization (root) > folders (optional) > projects > service resources. The hierarchy gives ownership by parent and inheritance of IAM and organization policies.

## Signature / Usage

Resource representations:

```json
{
  "creationTime": "2020-01-07T21:59:43.314Z",
  "displayName": "my-organization",
  "lifecycleState": "ACTIVE",
  "name": "organizations/34739118321",
  "owner": {
    "directoryCustomerId": "C012ba234"
  }
}
```

```json
{
  "createTime": "2030-01-07T21:59:43.314Z",
  "displayName": "Engineering",
  "lifecycleState": "ACTIVE",
  "name": "folders/634792535758",
  "parent": "organizations/34739118321"
}
```

```json
{
  "createTime": "2020-01-07T21:59:43.314Z",
  "lifecycleState": "ACTIVE",
  "name": "my-project",
  "parent": {
    "id": "634792535758",
    "type": "folder"
  },
  "projectId": "my-project",
  "labels": {
     "my-label": "prod"
  },
  "projectNumber": "464036093014"
}
```

## Options / Props

| Resource | Key attributes |
|----------|----------------|
| Organization | Organization resource ID; display name (from the primary Workspace / Cloud Identity domain); create and last-modified time; owner = Workspace customer ID (set at creation, immutable) |
| Folder | Optional grouping between organization and projects; requires an organization; can nest; delegates administration; policy inheritance point |
| Project | Project ID (unique), project number (read-only, auto-assigned), one mutable display name, lifecycle state (`ACTIVE`, `DELETE_REQUESTED`), labels, create time |

## Notes

- Every resource except the top has exactly one parent. Ownership: project lifecycle is bound to its parent, so projects survive an employee leaving. Inheritance: IAM allow/deny policies and organization policies flow down. For IAM allow policies, the effective policy is the union of the policy set on the resource and the policy inherited from its parent. Organization Policy effective policy is evaluated separately and is not a simple union: how a policy at a child combines with its ancestors depends on the constraint and its rules (for example `inheritFromParent` and reset), so see the organization-policy pages or the official Organization Policy documentation (公式未確認 for the exact merge rules in this page's source).
- Adapted from the official docs: the source page describes the effective policy as the union of the resource's policy and inherited policies; that holds for IAM allow policies, but organization policies are evaluated with constraint-specific rules, so the first note above limits the union to allow policies.
- A Workspace or Cloud Identity account is a prerequisite for an organization resource and maps to exactly one organization. Creating a project as such a user auto-provisions the organization. Once an organization exists for a domain, managed users must create projects inside an organization; the default is their home organization.
- Initial organization allow policy grants Project Creator and Billing Account Creator to the entire domain. The Workspace super admin can assign IAM roles by default and should assign the Organization Administrator role. No other resources are created with the organization.
- Initial project IAM policy grants the owner role to the creator. Free trial / free tier users can create projects without an organization (project can be top of its own hierarchy); such projects can later be migrated into an organization.
- Most API calls need the project ID or project number; the display `name` is not the project ID.
- Source: https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [projects.md](./projects.md)
- [folders.md](./folders.md)
- [../organization-admin/organization-resource.md](../organization-admin/organization-resource.md)
- [../organization-policy/overview.md](../organization-policy/overview.md)
