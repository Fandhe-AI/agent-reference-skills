---
source: https://docs.cloud.google.com/config-connector/docs/how-to/organizing-resources/overview
---

# Organizing your resources

Config Connector creates resources at project, folder or organization scope. It first checks for a scope-defining field in the resource spec and, if none is found, for a scope-defining annotation.

## Signature / Usage

Annotating a Namespace as the default scope (project shown; folder and organization use `cnrm.cloud.google.com/folder-id` and `cnrm.cloud.google.com/organization-id`).

```bash
kubectl annotate namespace \
NAMESPACE cnrm.cloud.google.com/project-id=PROJECT_ID
```

## Options / Props

### Scope-defining fields (in the resource `spec`)

| Field | Scope |
|---|---|
| `projectRef` | Project |
| `folderRef` | Folder |
| `organizationRef` | Organization |

### Scope-defining annotations (on the resource or its Namespace)

| Annotation | Scope |
|---|---|
| `cnrm.cloud.google.com/project-id` | Project |
| `cnrm.cloud.google.com/folder-id` | Folder |
| `cnrm.cloud.google.com/organization-id` | Organization |

## Notes

- Most Google Cloud resources can be created at only the project level.
- Once a resource is created, the field or annotation becomes immutable. To change scope, delete the resource and create a new one in a different project, folder or organization.
- A scope-defining field follows the naming convention `SCOPERef`, is part of the spec, and can be set only in the resource configuration. Most resources support fields; the source recommends fields over annotations because they make the spec more self-contained and allow creating a scope and its contained resources in one step.
- For resources without scope-defining fields, supply the annotation in the resource configuration or default it for all resources in a Namespace. The Namespace annotation is ignored if the resource has the annotation directly.
- Warning: using the Namespace annotation may cause performance issues when managing a large number of resources under one Kubernetes Namespace.
- Exceptions: if a resource listed in the resource reference has no scope-defining field or annotation, no scope is needed. Resources such as `BillingBudgetsBudget` are bound to a billing account and need billing account information instead. IAM resources (`IAMPolicy`, `IAMPartialPolicy`, `IAMPolicyMember`, `IAMAuditConfig`) need no scope; they attach to another resource through `spec.resourceRef` (for example a `PubSubTopic`, a `SpannerInstance`, or a project, folder or organization).
- Snippet taken from https://docs.cloud.google.com/config-connector/docs/how-to/install-manually (the source page has no code).
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/organizing-resources/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [namespaces-and-projects.md](./namespaces-and-projects.md)
- [creating-resource-references.md](./creating-resource-references.md)
- [annotations.md](./annotations.md)
