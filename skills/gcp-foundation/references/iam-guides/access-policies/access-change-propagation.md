---
source: https://docs.cloud.google.com/iam/docs/access-change-propagation
---

# Access Change Propagation

IAM access changes (granting a role, denying a permission) are eventually consistent. Recently revoked roles may still work, and recently granted roles may not yet work.

## Signature / Usage

Propagation time depends on how the change is made:

| Method | Examples | Propagation time |
|---|---|---|
| Change a policy (edit an allow or deny policy; principal limits per policy still apply) | Grant `roles/resourcemanager.organizationAdmin` in the organization allow policy; deny `cloudresourcemanager.googleapis.com/projects.setIamPolicy` in an organization deny policy; add IAM Conditions to a role binding | Typically 2 minutes, potentially 7 minutes or longer |
| Change a group's membership (group is in an allow or deny policy) | Add a principal to `org-admins@example.com`, which holds Organization Administrator | Typically several minutes, potentially hours or longer |
| Change a nested group's membership (parent group is in a policy) | Add a principal to `org-admins@example.com`, a member group of `admins@example.com`, which holds Tag Viewer (`roles/resourcemanager.tagViewer`) | Typically several minutes, potentially hours or longer |

```text
Policy change:        ~2 min (up to 7+ min)
Group membership:     several minutes (up to hours+)
Nested group change:  several minutes (up to hours+)
```

## Notes

- Adding a principal to a group generally propagates faster than removing one.
- Group membership changes generally propagate faster than nested group membership changes.
- Tag changes propagate separately and affect conditional access; see Resource Manager tag propagation.
- Source: https://docs.cloud.google.com/iam/docs/access-change-propagation (retrieved 2026-11-14; CC BY 4.0)

## Related

- [allow-policies.md](./allow-policies.md)
- [deny-policies.md](./deny-policies.md)
