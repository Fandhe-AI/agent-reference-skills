---
source: https://docs.cloud.google.com/iam/docs/org-policy-custom-constraints
---

# Custom Organization Policy Constraints for IAM Allow Policies

Use Organization Policy custom constraints on `iam.googleapis.com/AllowPolicy` to control who can be granted roles, who can have roles revoked, and which roles can be granted or revoked.

## Signature / Usage

Constraint file format:

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes: RESOURCE_NAME
methodTypes:
  - CREATE
  - UPDATE 
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

Create and verify the constraint:

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

Enforce it with an organization policy (dry run first, then live):

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true

dryRunSpec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy POLICY_PATH --update-mask=dryRunSpec
gcloud org-policies set-policy POLICY_PATH --update-mask=spec
```

### Test example: block granting Project IAM Admin to one user

```yaml
name: organizations/ORG_ID/customConstraints/custom.denyProjectIAMAdmin
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition:
  "resource.bindings.exists(
    binding,
    RoleNameMatches(binding.role, ['roles/resourcemanager.projectIamAdmin']) &&
    binding.members.exists(member,
      MemberSubjectMatches(member, ['user:EMAIL_ADDRESS'])
    )
  )"
actionType: DENY
displayName: Do not allow EMAIL_ADDRESS to be granted the Project IAM Admin role.
```

Adapted (not in the official docs): policy name changed to `custom.denyProjectIAMAdmin` to match the constraint created above (the official sample differs in case).

```yaml
name: projects/PROJECT_ID/policies/custom.denyProjectIAMAdmin
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-custom-constraint ~/constraint-deny-project-iam-admin.yaml
gcloud org-policies set-policy ~/policy-deny-project-iam-admin.yaml
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=user:EMAIL_ADDRESS --role=roles/resourcemanager.projectIamAdmin
```

Expected output after about two minutes of propagation:

```text
Operation denied by custom org policies: ["customConstraints/custom.denyProjectIAMAdmin": "EMAIL_ADDRESS can't be granted the Project IAM Admin role."]
```

### Conditional enforcement with tags

```yaml
name: organizations/ORG_ID/policies/custom.dontgrantStorageRoles
spec:
  rules:
  - condition:
      expression: "resource.matchTag('ORG_ID/environment', 'dev')"
    enforce: true
  - enforce: false
```

### Example constraints

Block granting a specific role:

```yaml
name: organizations/ORG_ID/customConstraints/custom.denyRole
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.bindings.exists(
  binding,
  RoleNameMatches(binding.role, ['ROLE'])
)"
actionType: DENY
displayName: Do not allow the ROLE role to be granted
```

Only allow specific roles:

```yaml
name: organizations/ORG_ID/customConstraints/custom.specificRolesOnly
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.bindings.all(
  binding,
  RoleNameMatches(binding.role, ['ROLE_1', 'ROLE_2'])
)"
actionType: ALLOW
displayName: Only allow the ROLE_1 role and ROLE_2 role to be granted
```

Prevent revocation of roles with `admin` in the name (`REMOVE_GRANT`):

```yaml
name: organizations/ORG_ID/customConstraints/custom.dontRevokeAdminRoles
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - REMOVE_GRANT
condition: "resource.bindings.exists(
  binding,
  RoleNameContains(binding.role, ['admin'])
)"
actionType: DENY
displayName: Prevent roles with "admin" in their names from being revoked
```

Deny `@gmail.com` principals:

```yaml
name: organizations/ORG_ID/customConstraints/custom.dontGrantToGmail
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.bindings.exists(
  binding,
  binding.members.exists(member,
    MemberSubjectEndsWith(member, ['@gmail.com'])
  )
)"
actionType: DENY
displayName: Do not allow members whose email addresses end with "@gmail.com" to be granted roles
```

Deny Storage roles for `allUsers` / `allAuthenticatedUsers`:

```yaml
name: organizations/ORG_ID/customConstraints/custom.denyStorageRolesForPrincipalAllUsers
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.bindings.exists(
  binding,
  RoleNameStartsWith(binding.role, ['roles/storage.']) &&
  binding.members.exists(member,
    MemberSubjectMatches(member, ['allUsers', 'allAuthenticatedUsers'])
  )
)"
actionType: DENY
displayName: Do not allow storage roles to be granted to allUsers or allAuthenticatedUsers
```

Only organization members can be granted roles:

```yaml
name: organizations/ORG_ID/customConstraints/custom.allowInternaldentitiesOnly
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.bindings.all(
  binding,
  binding.members.all(member,
    MemberInPrincipalSet(member, ['//cloudresourcemanager.googleapis.com/organizations/ORG_ID'])
  )
)"
actionType: ALLOW
displayName: Only allow organization members to be granted roles
```

Only service accounts can be granted roles:

```yaml
name: organizations/ORG_ID/customConstraints/custom.allowServiceAccountsOnly
resourceTypes:
- iam.googleapis.com/AllowPolicy
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.bindings.all(
  binding,
  binding.members.all(member,
    MemberTypeMatches(member, ['iam.googleapis.com/ServiceAccount'])
  )
)"
actionType: ALLOW
displayName: Only allow service accounts to be granted roles
```

Other documented variants combine the same functions: only specific principals (`MemberSubjectMatches` with `all`), prevent revocation from specific principals (`REMOVE_GRANT` + `exists`), roles by prefix (`RoleNameStartsWith`), and combined role plus principal allowlists.

## Options / Props

### Constraint fields and limits

| Field | Description / limit |
|---|---|
| `name` | `organizations/ORG_ID/customConstraints/custom.NAME`; letters and numbers only, up to 70 characters excluding `custom.` |
| `resourceTypes` | `iam.googleapis.com/AllowPolicy`; most resource types support up to 20 custom constraints |
| `methodTypes` | `CREATE`, `UPDATE`, `REMOVE_GRANT` (also seen in examples) |
| `condition` | CEL, up to 1,500 characters |
| `actionType` | `ALLOW` (only matching operations permitted, all else blocked) or `DENY` (matching operations blocked) |
| `displayName` | Up to 200 characters; may appear in error messages (no PII) |
| `description` | Up to 2,000 characters; shown as the violation error message |

### `resource.bindings` shape

Adapted (not in the official docs): `bindings` and `members` are arrays, and the missing comma after `role` is added.

```json
{
  "bindings": [
    BINDING
  ]
}
```

```json
{
  "role": "ROLE",
  "members": [
    MEMBER
  ]
}
```

### Supported CEL functions

| Function | Returns true when |
|---|---|
| `RoleNameMatches(role, roleNames: list)` | role fully matches one of the names |
| `RoleNameStartsWith(role, rolePrefixes: list)` | role starts with one of the strings |
| `RoleNameEndsWith(role, roleSuffixes: list)` | role ends with one of the strings |
| `RoleNameContains(role, roleSubstrings: list)` | role contains one of the strings |
| `MemberSubjectMatches(member, memberNames: list)` | member fully matches (email aliases are also evaluated) |
| `MemberSubjectStartsWith(member, memberPrefixes: list)` | member starts with one of the strings |
| `MemberSubjectEndsWith(member, memberSuffixes: list)` | member ends with one of the strings |
| `MemberInPrincipalSet(member, principalSets: list)` | member is in the listed principal set; only `//cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID` is supported |
| `MemberTypeMatches(member, principalType: list)` | member is one of the listed principal types |

Macros: `list.all(item, expr)` (typically with `ALLOW`) and `list.exists(item, expr)` (typically with `DENY`). Operators `==`, `!=`, `in`, `contains`, `startsWith`, `endsWith` are not supported on `resource.bindings`; `&&` and `||` are.

### `MemberTypeMatches` principal types

| Principal type | Identifier |
|---|---|
| `iam.googleapis.com/ConsumerPrincipal` | `user:USER_EMAIL_ADDRESS` (consumer Google Account) |
| `iam.googleapis.com/WorkspacePrincipal` | `user:USER_EMAIL_ADDRESS` (Cloud Identity / Workspace) |
| `iam.googleapis.com/ConsumerGroup` | `group:GROUP_EMAIL_ADDRESS` |
| `iam.googleapis.com/WorkspaceGroup` | `group:GROUP_EMAIL_ADDRESS` |
| `iam.googleapis.com/Domain` | `domain:DOMAIN` |
| `iam.googleapis.com/WorkforcePoolPrincipal` | `principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |
| `iam.googleapis.com/WorkforcePoolPrincipalSet` | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/...` (`group/GROUP_ID`, `attribute.NAME/VALUE`, `*`) |
| `iam.googleapis.com/WorkloadPoolPrincipal` | `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |
| `iam.googleapis.com/WorkloadPoolPrincipalSet` | `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/...` |
| `iam.googleapis.com/ServiceAccount` | `serviceAccount:SERVICE_ACCOUNT_EMAIL_ADDRESS` (excludes service agents) |
| `iam.googleapis.com/ServiceAgent` | `serviceAccount:SERVICE_AGENT_EMAIL_ADDRESS` |
| `iam.googleapis.com/PublicPrincipals` | `allUsers`, `allAuthenticatedUsers` |
| `iam.googleapis.com/ProjectRoleReference` | `projectOwner:PROJECT_ID`, `projectEditor:PROJECT_ID`, `projectViewer:PROJECT_ID` |
| `iam.googleapis.com/ResourcePrincipal` / `ResourcePrincipalSet` | identifiers of resources with built-in identities |
| `iam.googleapis.com/AgenticIdentityPoolPrincipal` / `AgenticIdentityPoolPrincipalSet` | `principal://agents.global.org-ORG_ID.system.id.goog/SUBJECT_ATTRIBUTE_VALUE` and `principalSet://agents.global.proj-PROJECT_NUMBER.system.id.goog/*` forms (also `agents-nonprod`) |

## Notes

- Corrected from the official docs: the policy name in the test example is `custom.denyProjectIAMAdmin` (the official sample used `denyProjectIamAdmin`, which does not match the constraint); the `resource.bindings` shape uses arrays for `bindings` and `members`.
- Nested lists: use the same macro at every level. Mixing `all` over bindings with `exists` over members makes a condition that passes if any one member is in the organization, so outside principals can be granted alongside an internal one. Use `all` + `all` for `ALLOW` and `exists` + `exists` for `DENY`.
- Limitations: dry-run audit logs for `setIamPolicy` violations may lack `resourceName`, `serviceName`, `methodName`; no audit log is produced if a custom policy makes `setIamPolicy` on the organization fail.
- These policies do not affect Cloud Storage default ACL grants, convenience values, BigQuery default dataset access, or roles from default allow policies (e.g. project creator getting Owner).
- Owner invitations can still be sent but cannot be accepted when the policy blocks the Owner role.
- Automatic role grants to service agents or default service accounts blocked by a policy can fail the whole operation; use tags to temporarily disable the constraint, then re-enable it.
- Policies take effect in up to 15 minutes (about two minutes in the test example). Test in a new project, not an existing one.
- Required roles: Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) on the organization; Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) for the test project.
- A conditional rule must be paired with an unconditional rule.
- Source: https://docs.cloud.google.com/iam/docs/org-policy-custom-constraints
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [deny-policies.md](./deny-policies.md)
- [lint-conditions.md](./lint-conditions.md)
