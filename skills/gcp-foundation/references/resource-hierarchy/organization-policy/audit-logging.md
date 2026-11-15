---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/audit-logging
---

# Organization Policy Audit Logging

Cloud Audit Logs for the Organization Policy Service (`orgpolicy.googleapis.com`): which methods log, their permission types, and filters.

## Signature / Usage

Filter by service:

```text
protoPayload.serviceName="orgpolicy.googleapis.com"
```

Filter by method (replace the method name):

```text
protoPayload.methodName="google.cloud.orgpolicy.v2.OrgPolicy.UpdatePolicy"
```

## Options / Props

Methods of `google.cloud.orgpolicy.v2.OrgPolicy` (none are long-running or streaming):

| Method | Permission | Permission type | Audit log type |
|--------|-----------|-----------------|----------------|
| `CreateCustomConstraint` | `orgpolicy.customConstraints.create` | ADMIN_WRITE | Admin Activity |
| `CreatePolicy` | `orgpolicy.policies.create` | ADMIN_WRITE | Admin Activity |
| `DeleteCustomConstraint` | `orgpolicy.customConstraints.delete` | ADMIN_WRITE | Admin Activity |
| `DeletePolicy` | `orgpolicy.policies.delete` | ADMIN_WRITE | Admin Activity |
| `UpdateCustomConstraint` | `orgpolicy.customConstraints.update` | ADMIN_WRITE | Admin Activity |
| `UpdatePolicy` | `orgpolicy.policies.update` | ADMIN_WRITE | Admin Activity |
| `GetCustomConstraint` | `orgpolicy.customConstraints.get` | ADMIN_READ | Data Access |
| `GetEffectivePolicy` | `orgpolicy.policy.get` | ADMIN_READ | Data Access |
| `GetPolicy` | `orgpolicy.policy.get` | ADMIN_READ | Data Access |
| `ListConstraints` | `orgpolicy.constraints.list` | ADMIN_READ | Data Access |
| `ListCustomConstraints` | `orgpolicy.customConstraints.list` | ADMIN_READ | Data Access |
| `ListPolicies` | `orgpolicy.policies.list` | ADMIN_READ | Data Access |

## Notes

- Methods requiring `ADMIN_WRITE` generate Admin Activity logs; methods requiring `DATA_READ`, `DATA_WRITE`, or `ADMIN_READ` generate Data Access logs (which must be enabled).
- The v1 Organization Policy API is hosted under `cloudresourcemanager.googleapis.com`; see Resource Manager audit logging (`../audit-logging.md`).
- Policy Denied logs (violations of constraints) are documented under VPC Service Controls audit logging; dry-run violations appear in the `policy` log (see `dry-run-policy.md`).
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/audit-logging
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [dry-run-policy.md](./dry-run-policy.md)
- [../organization-admin/resource-manager-audit-logging.md](../organization-admin/resource-manager-audit-logging.md)
