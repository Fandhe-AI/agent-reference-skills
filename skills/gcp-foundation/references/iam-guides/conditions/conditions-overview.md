---
source: https://docs.cloud.google.com/iam/docs/conditions-overview
---

# IAM Conditions Overview

IAM Conditions provide conditional, attribute-based access control using a subset of Common Expression Language (CEL). They can be used in allow policy role bindings (including Privileged Access Manager entitlements), deny policy rules, and Principal Access Boundary policy bindings.

## Signature / Usage

### Allow policy role binding

A role binding with a condition grants the role only when the expression evaluates to `true`.

```json
"bindings": [
  {
    "role": "ROLE",
    "members": [
      "MEMBER_1",
      "MEMBER_2"
    ],
    "condition": {
      "title": "TITLE",
      "description": "DESCRIPTION",
      "expression": "EXPRESSION"
    }
  }
]
```

### Deny rule

If the condition is `true` or cannot be evaluated, the deny rule applies; if `false`, it does not. Only resource tag functions are recognized.

```json
"rules": [
  {
    "denyRule": {
      "deniedPrincipals": [
        "PRINCIPAL_1",
        "PRINCIPAL_2"
      ],
      "exceptionPrincipals": [
        "EXCEPTION_PRINCIPAL_1",
        "EXCEPTION_PRINCIPAL_2"
      ],
      "deniedPermissions": [
        "DENIED_PERMISSION_1",
        "DENIED_PERMISSION_2"
      ],
      "denialCondition": {
        "title": "TITLE",
        "description": "DESCRIPTION",
        "expression": "EXPRESSION"
      }
    }
  }
]
```

### Principal Access Boundary policy binding

The bound policy is enforced only if the condition is `true`.

```json
{
  "displayName": "DISPLAY_NAME",
  "target": {
    "principalSet": "PRINCIPAL_SET"
  },
  "policyKind": "PRINCIPAL_ACCESS_BOUNDARY",
  "policy": "PAB_POLICY",
  "condition": {
    "title": "TITLE",
    "description": "DESCRIPTION",
    "expression": "EXPRESSION"
  }
}
```

### Example expressions

Resource attributes (allow policies; deny rules only support `resource.matchTag`):

```text
resource.type == 'compute.googleapis.com/Instance'
resource.service == 'storage.googleapis.com'
resource.type == 'storage.googleapis.com/Object' &&
resource.name.startsWith('projects/_/buckets/exampleco-site-assets/')
resource.matchTag('123456789012/env', 'prod')
```

Principal attributes (Principal Access Boundary bindings):

```text
principal.type == 'iam.googleapis.com/ServiceAccount'
principal.subject != 'super-admin@example.com'
```

Request attributes:

```text
'accessPolicies/199923665455/accessLevels/CorpNet' in
request.auth.access_levels

api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', [])
                 .hasOnly(['roles/billing.admin'])

request.time < timestamp('2021-01-01T00:00:00Z')

request.time.getHours('Europe/Berlin') >= 9 &&
request.time.getHours('Europe/Berlin') <= 17 &&
// Days of the week range from 0 to 6, where 0 == Sunday and 6 == Saturday.
request.time.getDayOfWeek('Europe/Berlin') >= 1 &&
request.time.getDayOfWeek('Europe/Berlin') <= '

request.time.getFullYear('Europe/Berlin') == 2020
request.time.getMonth('Europe/Berlin') < 6

destination.ip == '14.0.0.1'
destination.ip != '127.0.0.1'
destination.port == 22
destination.port > 21 && destination.port <= 23

!compute.isForwardingRuleCreationOperation() || (
  compute.isForwardingRuleCreationOperation() &&
  compute.matchLoadBalancingSchemes([
    'INTERNAL', 'INTERNAL_MANAGED', 'INTERNAL_SELF_MANAGED'
  ])
)

request.host == 'hr.example.com'
request.host.endsWith('.example.com')
request.path == '/admin/payroll.js'
request.path.startsWith('/admin')
```

## Options / Props

### Condition fields

| Name | Type | Description |
|------|------|-------------|
| `title` | string | Required. Informational label. |
| `description` | string | Optional. Informational description. |
| `expression` | string | Required. CEL logic expression; statements combined with `&&`, `\|\|`, `!`. |

### CEL features used

| Feature | Description |
|---------|-------------|
| Variables | Attributes such as `request.time` (Timestamp) or `resource.name` (String), filled at runtime. |
| Operators | Per-type operators, e.g. `resource.service == 'compute.googleapis.com'`. |
| Functions | Predefined per-type functions, e.g. `request.path.startsWith('/finance')`. |
| Logical operators | `&&`, `\|\|`, `!`. |

### Attribute categories by policy type

| Category | Examples | Usable in |
|----------|----------|-----------|
| Resource | type, name, service, tags | Allow role bindings (all); deny rules (tags only) |
| Principal | type, subject | Principal Access Boundary policy bindings |
| Request | access levels, date/time, destination IP/port (IAP TCP), host/path (IAP), API attributes | Allow role bindings |

## Notes

- Conditions cannot be used when granting legacy basic roles (Owner, Editor, Viewer) or when granting roles to `allUsers` / `allAuthenticatedUsers`.
- Conditional role bindings do not override unconditional bindings; a principal in an unconditional binding for a role always has it.
- Only some resource types accept conditional role bindings; for others, grant conditionally at the organization or project level.
- To use conditions on a Cloud Storage bucket's allow policy, enable uniform bucket-level access; otherwise put the conditional grant on a parent such as the project.
- Best practice: no more than 100 conditional role bindings per allow policy, to stay under the policy size limit.
- The access levels attribute is available only with IAP (tunnel instances, or web apps on App Engine or Compute Engine backend services).
- Timestamps use RFC 3339; time zones use IANA identifiers.
- The official working-hours example for `getDayOfWeek` ends with a truncated `<= '` literal; the sample above is verbatim from the source. Use a numeric upper bound (the Saturday value is 6) when writing a real expression.
- Source: https://docs.cloud.google.com/iam/docs/conditions-overview (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [conditions-attribute-reference.md](./conditions-attribute-reference.md)
- [conditions-resource-attributes.md](./conditions-resource-attributes.md)
- [temporary-and-resource-based-access.md](./temporary-and-resource-based-access.md)
- [allow-policies.md](../access-policies/allow-policies.md)
- [deny-policies.md](../access-policies/deny-policies.md)
