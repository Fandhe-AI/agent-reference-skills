---
source: https://docs.cloud.google.com/access-context-manager/docs/scoped-policies
---

# Scoped policies

Scoped policies are access policies scoped to specific folders or projects, alongside the single organization-level access policy. They delegate administration of VPC Service Controls perimeters and access levels to folder-level and project-level administrators.

## Signature / Usage

The following is the scoped policy creation command from the access policy guide; the delegation flow below follows it.

Adapted (not in the official docs): removed the `[...]` brackets around `--scopes=SCOPE`, which are optional-argument notation and are not valid in a shell command (without `--scopes` the policy applies to the whole organization).

```bash
gcloud access-context-manager policies create \
--organization ORGANIZATION_ID --scopes=SCOPE --title POLICY_TITLE
```

### Delegation sequence

1. The organization-level administrator creates a new access policy whose `scope` field references a specific folder or project.
2. The organization-level administrator assigns IAM permissions to the delegated administrator directly on the access policy resource. The delegated administrator has no permissions on other policies unless explicitly assigned.
3. The delegated administrator edits the policy to configure access levels and service perimeters, and can grant IAM permissions on that policy to any other user.

## Options / Props

### Constraints

| Topic | Rule |
|-------|------|
| Organization-level policy | An organization can have only one |
| Scope per policy | A policy has only one scope (folder or project); a folder cannot be the scope of more than one policy, but a child of that folder (for example a project) can be another policy's scope |
| Service perimeters | Can restrict only resources within the policy's scope; can allow access to projects in other folders through ingress and egress rules |
| Access levels | Visible only within the scope of the policy; perimeters and levels in other folders cannot use them |
| Project membership | A project can be a member of only one service perimeter across all policies |
| Scoped policy administrator | Can configure perimeters and access levels; cannot create a new policy or change the policy's scope |
| Org-level administrator | Can create, modify and delete scoped policies and set IAM bindings on them |

## Notes

- Deleting a folder or project also deletes the policy that has it as scope. Moving a project to another node in the hierarchy does not modify its scoped policy; delete the policy and recreate it with the new scope.
- Only VPC Service Controls supports scoped policies; other services such as IAP continue to use organization-level policies.
- Deleting a folder or project (and therefore its scoped policy) or recreating a policy is disruptive to any VPC Service Controls perimeters that policy holds; try policy changes on a disposable policy first.
- Source: https://docs.cloud.google.com/access-context-manager/docs/scoped-policies (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/access-context-manager/docs/create-access-policy
- Corrected from the official docs: `--organization ORGANIZATION_ID [--scopes=SCOPE] --title POLICY_TITLE` (optional-argument brackets in a shell command).
- The source calls the policy field `scope`; in the REST `AccessPolicy` resource it is the list field `scopes`, and in gcloud the `--scopes` flag.

## Related

- [create-access-policy.md](./create-access-policy.md)
- [overview.md](./overview.md)
