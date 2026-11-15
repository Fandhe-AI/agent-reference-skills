---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/overview
---

# Organization Policy Service Overview

The Organization Policy Service gives centralized, programmatic control over cloud resources by configuring constraints across the resource hierarchy. Includes hierarchy evaluation (inheritance / merge / reconcile) rules.

## Signature / Usage

An organization policy configures a single constraint that restricts one or more Google Cloud services. It is set on an organization, folder, or project and is enforced on that resource and its descendants. A policy contains one or more rules (for example, one rule enforcing only on resources tagged `environment=development`, another rule not enforcing elsewhere). Each organization policy enforces exactly one constraint in active mode, dry-run mode, or both. Policies are defined in YAML or JSON.

### Constraint kinds

| Kind | Managed by | Shape |
|------|-----------|-------|
| Managed constraints | Google | Boolean or list parameters; designed to replace equivalent legacy managed constraints, support Policy Intelligence tools |
| Custom constraints | Your organization | Like boolean managed constraints: enforced or not enforced |
| Legacy managed constraints (formerly "predefined constraints") | Google | List rules (formerly "list constraints") or boolean rules (formerly "boolean constraints") |

Managed constraint with boolean type (equivalent to legacy `iam.disableServiceAccountCreation`):

```yaml
name: organizations/1234567890123/policies/iam.managed.disableServiceAccountCreation
spec:
  rules:
  - enforce: true
```

Managed constraint with list parameters:

Adapted (not in the official docs): the domain values are quoted, because a YAML plain scalar cannot start with `@`.

```yaml
name: organizations/1234567890123/policies/essentialcontacts.managed.allowedContactDomains
spec:
   rules:
     - enforce: true
       parameters:
          allowedDomains:
               - "@example.com"
               - "@altostrat.com"
```

Legacy managed constraint with list rules:

```yaml
name: organizations/1234567890123/policies/compute.vmExternalIpAccess
spec:
  rules:
  - values:
      allowedValues:
      - is:projects/project_a/zones/us-central1-a/instances/vm-1
      - is:projects/project_b/zones/us-central1-a/instances/vm-2
```

Legacy managed constraint with a boolean rule:

```yaml
name: organizations/1234567890123/policies/iam.disableServiceAccountCreation
spec:
  rules:
  - enforce: true
```

### Value prefixes (legacy list rules)

List values are hierarchy subtree strings (for example `constraints/compute.trustedImageProjects` takes `projects/PROJECT_ID`). Specifying allowed or denied values implicitly denies / allows everything else. Optional `prefix:value` forms:

| Prefix | Meaning |
|--------|---------|
| `is:` | Exact-value comparison (same as no prefix; required when the value contains a colon) |
| `under:` | Value and all child values; value must be the ID of an organization, folder, or project |
| `in:` | All resources that include this value, for example `in:us-locations` in `constraints/gcp.resourceLocations` denied list blocks all locations in the `us` region |

If no list is provided or the policy is the Google-managed default, the constraint's default behavior applies (allow all or deny all).

### Boolean rules

A boolean legacy constraint is enforced or not enforced (for example `constraints/compute.disableSerialPortAccess`: enforced = serial port access not allowed). Setting the Google-managed default applies the constraint default.

### Hierarchy evaluation

Descendants inherit a policy by default. A child policy overwrites or merges with the inherited one.

```text
Constraint default: allow all values
Organization Node:  allow red square, green circle
Resource 1: inheritFromParent=TRUE,  allow blue diamond  -> effective: red square, green circle, blue diamond
Resource 2: inheritFromParent=TRUE,  deny green circle   -> effective: red square only (deny wins)
Resource 3: inheritFromParent=FALSE, allow yellow hexagon -> effective: yellow hexagon only
Resource 4: inheritFromParent=FALSE, restoreDefault      -> effective: allow all (constraint default)
```

Illustration derived from the official hierarchy diagram description (shapes stand for list values).

Rules:

- Not enforced anywhere in ancestors: the Google-managed default behavior of the constraint is enforced (this can restrict operations even if you never defined a policy; override with a policy to allow).
- A resource's own policy supersedes ancestors unless `inheritFromParent = true`, in which case the parent's effective policy is merged and reconciled. Example: folder denies `projects/123`, project denies `projects/456` -> both denied.
- Default behavior is never merged; a set policy always replaces it. Example: `constraints/iam.allowServiceAccountCredentialLifetimeExtension` is DENY by default at org level; a project allowing `SomeServiceAccount` yields an effective policy that allows it. If the org explicitly set `DENY`, the DENY-wins rule applies instead.
- `inheritFromParent = false`: resource does not inherit the parent policy and uses the constraint default unless it sets allowed/denied values.
- List rules: `DENY` values always win. A value in both allowed and denied lists is denied (avoid doing this).
- Boolean rules do not merge: the value set on the resource (`TRUE`/`FALSE`) is used. Example: folder `enforced: true`, project `enforced: false` for `constraints/iam.managed.disableServiceAccountCreation` -> not enforced on the project.
- `RestoreDefault` / reset: the resource uses the constraint default, and children inherit that.

## Notes

- Differs from IAM: IAM focuses on who (authorize principals); Organization Policy focuses on what (restrictions on how resources can be configured).
- Managed constraints inherited from a parent are not merged; a resource either enforces the parent's configuration or overrides it with its own policy.
- Dry-run mode: violations are audit-logged but not denied; use it to evaluate impact before enforcement (see `dry-run-policy.md`).
- Conditional policies use tags to enforce a constraint only on tagged resources (see `tags-condition.md`).
- Violations: new policies are usually not retroactive. A pre-existing violating state is considered in violation but the service does not stop; fix manually. Retroactive constraints are labeled as such in the constraints list.
- Policy Intelligence tools: test changes (Policy Simulator, Preview), dry-run policies, analyze existing policies. Testing and dry-running all changes is recommended.
- Common use cases: limit resource sharing by domain, limit IAM service accounts, restrict resource locations.
- Adapted from the official docs: the `allowedDomains` values (`"@example.com"`, `"@altostrat.com"`) are quoted because a YAML plain scalar cannot start with `@`.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/overview
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [using-constraints.md](./using-constraints.md)
- [dry-run-policy.md](./dry-run-policy.md)
- [custom-constraints.md](./custom-constraints.md)
- [tags-condition.md](./tags-condition.md)
