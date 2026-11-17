---
source: https://docs.cloud.google.com/access-context-manager/docs/overview
---

# Access Context Manager Overview

Access Context Manager lets organization administrators define fine-grained, attribute-based access control for projects and resources. An access policy is the organization-wide container for access levels and service perimeters. Access levels describe the requirements a request must meet (device type and OS, IP address, user identity). Access Context Manager only defines the rules or context; enforcement happens in other services such as VPC Service Controls.

## Signature / Usage

### Expression behavior when nesting or combining access levels

If either operand of `AND` (`&&`) or `OR` (`||`) uniquely determines the result, the other operand might or might not be evaluated, and a runtime error in that evaluation is ignored. In the following example, `origin.region_code` fails but `levels.ip_check` succeeds, so the `OR` is true and access is `GRANTED`.

```text
!(origin.region_code in ['RU', 'BY', 'UA']) -> FAILED  // levels.regions_check

inIpRange(origin.ip, ['205.220.128.0/23']) -> GRANTED  // levels.ip_check

!(origin.region_code in ['RU', 'BY', 'UA']) || inIpRange(origin.ip, ['205.220.128.0/23']) -> GRANTED

levels.regions_check || levels.ip_check -> GRANTED
```

## Options / Props

### Enforcement points for Access Context Manager policies (Chrome Enterprise Premium components)

| Service | Guide |
|---------|-------|
| VPC Service Controls | https://docs.cloud.google.com/vpc-service-controls/docs/use-access-levels |
| Identity-Aware Proxy | https://docs.cloud.google.com/iap/docs/cloud-iap-context-aware-access-howto |
| Context-Aware Access for Google Workspace | https://support.google.com/a/answer/9262032 |
| Identity and Access Management (IAM) conditions | https://docs.cloud.google.com/iam/docs/conditions-overview#example-access-level |

### Access policies

| Item | Description |
|------|-------------|
| Organization-level policy | Used anywhere in the organization |
| Scoped access policy | Scope set at folder or project level; the delegated administrator manages only the scoped policy, not the organization-level policy |
| `etag` | Versions the policy; use it in `gcloud` and API calls to avoid unintended overwrites and conflicts |

### Access level definition modes

| Mode | Description |
|------|-------------|
| Basic access level | Conditions over attributes (device type, IP address, user identity). Attributes in a condition combine as **AND** (all true) or **NAND** (at least one false) |
| Custom access level | Subset of Common Expression Language; can also use data from third-party services |

### Private IP ranges recognized by Access Context Manager

| Range | Reference |
|-------|-----------|
| `10.0.0.0/8` | RFC 1918 |
| `172.16.0.0/12` | RFC 1918 |
| `192.168.0.0/16` | RFC 1918 |
| `100.64.0.0/10` | RFC 6598 Shared Address Space |
| `fc00::/7` | IPv6 Unique Local Addresses, RFC 4193 |

### Combining and nesting conditions

| Topic | Rule |
|-------|------|
| Combining | A level can hold multiple conditions combined with `AND` (stricter, default) or `OR`; set the mode when creating or updating |
| Circular dependencies | Not allowed (direct, self-reference, or transitive); the call fails with `INVALID_ARGUMENT` |
| Dependencies per condition | A condition's `requiredAccessLevels` list can reference up to 15 other access levels |
| Nesting depth | No separate depth limit beyond the limit on access levels per access policy; all referenced levels must be in the same access policy |

## Notes

- Access levels are applied in addition to standard IAM policy.
- Geographic and IP-based attributes and device attributes are detailed in [access-level-attributes.md](./access-level-attributes.md).
- Device type: available only as part of a paid enterprise security subscription; device data comes from Endpoint Verification.
- User identity: identity-only access levels can be created and managed with `gcloud` but not with the Google Cloud console. `OR` is useful to exclude entities such as service accounts from normal requirements.
- Source: https://docs.cloud.google.com/access-context-manager/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-level-attributes.md](./access-level-attributes.md)
- [create-access-policy.md](./create-access-policy.md)
- [scoped-policies.md](./scoped-policies.md)
- [create-basic-access-level.md](./create-basic-access-level.md)
- [create-custom-access-level.md](./create-custom-access-level.md)
