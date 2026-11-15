---
source: https://docs.cloud.google.com/iam/docs/policy-types
---

# IAM Policy Types and Resource Hierarchy Inheritance

IAM offers four policy types (allow, deny, Principal Access Boundary, access). Allow policies are set at any level of the resource hierarchy and inherited downward; the effective allow policy is the union of the policy on the resource and the one inherited from its parent.

## Signature / Usage

Permissions needed to view policies inherited from a parent (verbatim from the page):

```text
resourcemanager.organizations.getIamPolicy on the organization
resourcemanager.folders.getIamPolicy on the folder
resourcemanager.projects.getIamPolicy on the project
```

Predefined roles containing them:

```text
roles/resourcemanager.organizationAdmin  (organization)
roles/resourcemanager.folderAdmin        (folder)
roles/resourcemanager.projectIamAdmin    (project)
```

### Policy types

| Policy | Function | API | Relationship to targets | Attach method | Parent |
|---|---|---|---|---|---|
| Allow | Grant principals access | API of the resource itself (`setIamPolicy`) | One-to-one; one allow policy per resource | Specify resource at creation | The resource it is attached to |
| Deny | Block specific permissions | IAM v2 API | One-to-many; up to 500 deny policies per resource | Specify resource at creation | The resource it is attached to (project, folder, organization) |
| Principal Access Boundary (PAB) | Restrict which resources a principal is eligible to access | IAM v3 API | Many-to-many; up to 10 PAB policies per principal set | Policy binding to a principal set | The organization |
| Access | Allow or deny access for supported services (Eventarc) | IAM v3 API | Many-to-many; up to 5 resources per policy and 5 policies per resource | Access policy binding to the resource | Project, folder, or organization where created |

### Evaluation order

Conceptually staged (IAM actually evaluates all types simultaneously):

1. PAB policies: if the principal is not eligible for the resource, access is denied. No PAB policies means continue.
2. Deny policies (attached and inherited; Eventarc access policies with `DENY` too): any matching deny blocks access.
3. Allow policies (attached and inherited; Eventarc access policies with `ALLOW` too): access only if the principal has the required permissions.

### Hierarchy levels

- Organization: roles inherited by everything under it.
- Folder: inherited by contained projects and folders.
- Project: trust boundary; inherited by resources within.
- Resource: some resources (Pub/Sub topics, Compute Engine instances) support lower-level roles.

## Notes

- Redundant grants: if an inherited role already contains the needed permissions, granting a same-or-smaller role on the child has no effect. Basic roles are concentric (Owner includes Editor includes Viewer).
- Examples from the page: Pub/Sub (Editor on project plus Publisher on `topic_a`), Cloud Storage (`roles/storage.objectAdmin` for the data processing expert, `roles/storage.objectCreator` for the `data-uploaders` group), Compute Engine (`roles/compute.networkAdmin` at organization level, `roles/compute.instanceAdmin` on `project_2`).
- In the console, a resource's IAM page shows inherited roles only if they are grantable on that resource.
- Best practices: mirror the organization structure; group resources by trust boundary per project; grant to groups; least privilege at the smallest scope; at least two Owners per project (or a group of at least two); grant cross-project roles at folder level; use labels; audit `setIamPolicy()` calls in audit logs; audit group ownership and membership; restrict project creation by granting Project Creator to a managed group.
- Granting `roles/owner` or broad roles at organization or folder level is high privilege; prefer narrow predefined roles.
- Source: https://docs.cloud.google.com/iam/docs/policy-types
- Source: https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [roles-overview.md](../role-types/roles-overview.md)
- gcp-security (deny policies, PAB policies in depth)
