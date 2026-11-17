---
source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-write-cel-expressions
---

# Write rules for custom cloud controls (Security Command Center)

When you create a custom cloud control (Premium and Enterprise (Deprecated) service tiers), you write Common Expression Language (CEL) expressions that evaluate properties of the scanned resource. Supported resources are Cloud Asset Inventory resource types; REST APIs are not supported. An expression can check a single value or be a compound expression, and it must resolve to a boolean `false` to trigger a finding.

## Signature / Usage

### Compare an enum value (as a string)

Adapted (not in the official docs): the official example uses a single `=`, which is not a CEL comparison operator; changed to `==`.

```text
resource.data.state == "PENDING_GENERATION"
```

## Options / Props

### Rules for CEL expressions

| Rule | Detail |
|------|--------|
| Properties | Properties in the expression must be properties of the scanned resource, as defined in the API definition of the resource type. |
| Enums | All enums must be represented as strings (for example, for `cloudkms.googleapis.com/CryptoKeyVersion`). |
| Result | The result of expressions defined in the `condition` property must be a Boolean. A finding is triggered only if the result is `false`. |
| Resource names | Find the resource type name in the Cloud Asset Inventory asset types page. |

### Example CEL expressions

Adapted (not in the official docs): the key-rotation example converts `rotationPeriod` with `duration(...)` and the network example compares URLs with `==`. A finding is raised only when an expression returns `false`, so the instance-name, service-allowlist and Cloud SQL examples are rewritten to return `true` for compliant resources: the name pattern uses `[0-9]+` instead of `\\\\d+`, the service example returns `true` for disabled or allowlisted services, and the Cloud SQL example returns `true` when the instance is out of scope or has no public IP and compares addresses exactly with `in`.

| Resource type | Description | CEL expression |
|---------------|-------------|----------------|
| `cloudkms.googleapis.com/CryptoKey` | Check the Cloud KMS key rotation period | `has(resource.data.rotationPeriod) && duration(resource.data.rotationPeriod) < duration('60h')` |
| `compute.googleapis.com/Network` | Match Virtual Private Cloud peering rule to network peers | `resource.data.selfLink == 'https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/default' \|\| resource.data.peerings.exists(p, p.network == 'https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/shared')` |
| `cloudfunctions.googleapis.com/CloudFunction` | Only allow internal ingress traffic for a Cloud Run function | `has(resource.data.ingressSettings) && resource.data.ingressSettings.matches('ALLOW_INTERNAL_ONLY')` |
| `compute.googleapis.com/Instance` | Resource name matches pattern | `resource.data.name.matches('^gcp-vm-(linux\|windows)-v[0-9]+$')` |
| `serviceusage.googleapis.com/Service` | Only allow storage-related APIs to be enabled | `resource.data.state != 'ENABLED' \|\| ( resource.data.name.matches('storage-api.googleapis.com') \|\| resource.data.name.matches('bigquery-json.googleapis.com') \|\| resource.data.name.matches('bigquery.googleapis.com') \|\| resource.data.name.matches('sql-component.googleapis.com') \|\| resource.data.name.matches('spanner.googleapis.com'))` |
| `sqladmin.googleapis.com/Instance` | Only permit public IP addresses that are on the allowlist | `!(resource.data.instanceType == 'CLOUD_SQL_INSTANCE' && resource.data.backendType == 'SECOND_GEN' && resource.data.settings.ipConfiguration.ipv4Enabled) \|\| resource.data.ipAddresses.all(ip, ip.type != 'PRIMARY' \|\| ip.ipAddress in ['IP_ADDRESS_1', 'IP_ADDRESS_2'])` |
| `dataproc.googleapis.com/Cluster` | Check if project IDs in a Managed Service for Apache Spark cluster contain the substrings `testing` or `development` | `has(resource.data.projectId) && !resource.data.projectId.contains('testing') && !resource.data.projectId.contains('development')` |

## Notes

- Corrected from the official docs: the official enum example is `resource.data.state = "PENDING_GENERATION"` (single `=`); CEL equality is `==`.
- In the table, `\|` is the Markdown escape for a literal `|` (CEL `||` or a regex alternation) inside table cells; copy the expression with plain `|`.
- Replace `PROJECT_ID`, `IP_ADDRESS_1` and `IP_ADDRESS_2` placeholders with your own values.
- More on CEL: the CEL spec and language definition at https://github.com/google/cel-spec and https://github.com/google/cel-spec/blob/master/doc/langdef.md.
- Corrected from the official docs: the source's examples conflict with the rule that a finding is triggered only when the result is `false`. (1) `'^gcp-vm-(linux|windows)-v\\\\d+$'` leaves `\\d` in the regular expression after CEL unescapes the string, which matches a literal backslash and `d`, not a digit; it is `[0-9]+` here. (2) `resource.data.state == 'ENABLED' && !(...)` is `true` for an enabled service that is not on the list, so a disallowed service never raised a finding; the expression is inverted to `state != 'ENABLED' || (...)`. (3) The Cloud SQL expression was `false` for every instance without `ipv4Enabled`, raising a finding for instances with no public IP, and `ipAddress.matches('IP_ADDRESS')` is an unanchored regular expression in which `.` matches any character (`10.0.0.1` also matches `110.0.0.10`); it now returns `true` for out-of-scope instances and uses exact membership (`in [...]`). Replace `IP_ADDRESS_1` / `IP_ADDRESS_2` with the allowed addresses.
- Corrected from the official docs: the `dataproc.googleapis.com/Cluster` expression joined the two negated `contains` checks with `||`, so it was `true` (no finding) whenever the project ID lacked either substring; the checks are joined with `&&`, as in the equivalent Assured Workloads example.
- Corrected from the official docs: the key-rotation example compares `resource.data.rotationPeriod` with `duration('60h')` directly. In the Cloud Asset Inventory resource data the field is a JSON duration string such as `"86400s"`, so it is wrapped in `duration(...)`; the CEL spec defines both `duration(string)` and the identity `duration(google.protobuf.Duration)`, so the wrapped form works in either case (https://github.com/google/cel-spec/blob/master/doc/langdef.md).
- Corrected from the official docs: the network example used `matches()`, an unanchored regular expression, for the network URLs, so a network named `default-untrusted` also satisfied the `default` condition; both URLs are compared with `==`.
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-write-cel-expressions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-overview.md](./compliance-manager-overview.md)
- [compliance-manager-apply-framework.md](./compliance-manager-apply-framework.md)
