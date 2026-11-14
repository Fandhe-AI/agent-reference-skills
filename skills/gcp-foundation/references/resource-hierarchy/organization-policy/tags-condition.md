---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/tags-organization-policy
---

# Conditional Organization Policies with Tags

Use tags to conditionally enforce constraints: a rule's `condition` (CEL expression) decides which resources a rule applies to.

## Signature / Usage

List rule example (`gcp.resourceLocations`) with unconditional and conditional values in one policy:

Adapted (not in the official docs): value groups are written with the `in:` prefix (`in:us-east1-locations`, `in:us-west1-locations`), as in the later example on this page; without `in:` they are treated as exact values.

```yaml
name: RESOURCE_TYPE/RESOURCE_ID/policies/gcp.resourceLocations
spec:
  rules:
  # As there is no condition specified, this allowedValue is enforced unconditionally.
  - values:
      allowedValues:
      - in:us-east1-locations
  # This condition applies to the values block.
  - condition:
      expression: "resource.matchTag('ORGANIZATION_ID/location', 'us-west1')"
    values:
      allowedValues:
      - in:us-west1-locations
```

```bash
gcloud org-policies set-policy POLICY_PATH
```

Result: the resource and its children are restricted to `us-east1-locations`; those tagged `location: us-west1` are allowed `us-east1-locations` and `us-west1-locations`.

Boolean rule example:

Adapted (not in the official docs): the policy name is `compute.disableSerialPortAccess`; the official sample writes `gcp.disableSerialPortAccess`, which does not match the constraint the same page describes (`compute.disableSerialPortAccess`).

```yaml
name: RESOURCE_TYPE/RESOURCE_ID/policies/compute.disableSerialPortAccess
spec:
  rules:
  - condition:
      expression: "resource.matchTag('ORGANIZATION_ID/disableSerialAccess', 'yes')"
    enforce: true
  - enforce: false
```

Multiple conditional rules:

```yaml
name: organizations/ORGANIZATION_ID/policies/gcp.resourceLocations
spec:
  rules:
  - condition:
      expression: "resource.matchTag('ORGANIZATION_ID/location', 'us-east')"
    values:
      allowedValues:
      - in:us-east1-locations
  - condition:
      expression: "resource.matchTag('ORGANIZATION_ID/location', 'us-west')"
    values:
      allowedValues:
      - in:us-west1-locations
  - values:
      deniedValues:
      - in:asia-south1-locations
```

```
gcloud org-policies set-policy /tmp/policy.yaml
```

Restrict untagged resources (deny a service unless the project carries the governance tag; the `!` operator needs the console Condition editor):

```text
!resource.matchTag("012345678901/sqlAdmin", "enabled")
```

## Options / Props

A condition holds 1 to 10 subexpressions joined by `||` or `&&` (and `!`); each is one of:

| Function | Meaning |
|----------|---------|
| `resource.matchTag('KEY_NAME', 'VALUE_SHORT_NAME')` | Namespaced key (for example `123456789012/env`) and value short name (`prod`) |
| `resource.matchTagId('KEY_ID', 'VALUE_ID')` | Permanent IDs, for example `tagKeys/123456789012`, `tagValues/567890123456` |
| `resource.hasTagKey('KEY_NAME')` | Any value of the tag key (namespaced name) |
| `resource.hasTagKeyId('KEY_ID')` | Any value of the tag key (permanent ID) |

Expressions are CEL (Common Expression Language); see the CEL spec.

## Notes

- Only tags attached to supported resources can be used for conditional enforcement.
- Most policies are evaluated when a resource is created or updated. Mandatory tags can govern resources at creation (custom-constraint approach, Preview).
- A policy with a conditional rule must also include an unconditional rule or it cannot be saved. For boolean rules, the unconditional rule is the default and every conditional rule must have the opposite value, to avoid multiple tags conflicting (for `disableSerialPortAccess` default true means conditional values must be false).
- List rules enabled with tags merge with the existing policy per normal inheritance; conditional rules apply only if the condition is true. Boolean rules enabled with tags override the existing policy.
- In the console, a condition using `!` renders an error in the Condition builder but still functions; edit via the Condition editor.
- The governance-tag pattern means a project cannot use the restricted API until it is tagged (or inherits the tag).
- Adapted from the official docs: the boolean example uses `compute.disableSerialPortAccess` (official sample: `gcp.disableSerialPortAccess`) and the first list example uses `in:` on location value groups.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/tags-organization-policy
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [overview.md](./overview.md)
- [using-constraints.md](./using-constraints.md)
- [../labels/labels.md](../labels/labels.md)
