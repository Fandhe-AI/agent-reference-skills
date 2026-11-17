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

| Resource type | Description | CEL expression |
|---------------|-------------|----------------|
| `cloudkms.googleapis.com/CryptoKey` | Check the Cloud KMS key rotation period | `has(resource.data.rotationPeriod) && resource.data.rotationPeriod < duration('60h')` |
| `compute.googleapis.com/Network` | Match Virtual Private Cloud peering rule to network peers | `resource.data.selfLink.matches('https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/default') \|\| resource.data.peerings.exists(p, p.network.matches('https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/shared$'))` |
| `cloudfunctions.googleapis.com/CloudFunction` | Only allow internal ingress traffic for a Cloud Run function | `has(resource.data.ingressSettings) && resource.data.ingressSettings.matches('ALLOW_INTERNAL_ONLY')` |
| `compute.googleapis.com/Instance` | Resource name matches pattern | `resource.data.name.matches('^gcp-vm-(linux\|windows)-v\\\\d+$')` |
| `serviceusage.googleapis.com/Service` | Only allow storage-related APIs to be enabled | `resource.data.state == 'ENABLED' && !( resource.data.name.matches('storage-api.googleapis.com') \|\| resource.data.name.matches('bigquery-json.googleapis.com') \|\| resource.data.name.matches('bigquery.googleapis.com') \|\| resource.data.name.matches('sql-component.googleapis.com') \|\| resource.data.name.matches('spanner.googleapis.com'))` |
| `sqladmin.googleapis.com/Instance` | Only permit public IP addresses that are on the allowlist | `(resource.data.instanceType == 'CLOUD_SQL_INSTANCE' && resource.data.backendType == 'SECOND_GEN' && resource.data.settings.ipConfiguration.ipv4Enabled ) && (resource.data.ipAddresses.all(ip, ip.type != 'PRIMARY' \|\| ip.ipAddress.matches('IP_ADDRESS')))` |
| `dataproc.googleapis.com/Cluster` | Check if project IDs in a Managed Service for Apache Spark cluster contain the substrings `testing` or `development` | `has(resource.data.projectId) && !resource.data.projectId.contains('testing') \|\| !resource.data.projectId.contains('development')` |

## Notes

- Corrected from the official docs: the official enum example is `resource.data.state = "PENDING_GENERATION"` (single `=`); CEL equality is `==`.
- In the table, `\|` is the Markdown escape for a literal `|` (CEL `||` or a regex alternation) inside table cells; copy the expression with plain `|`.
- Source inconsistency: in the `dataproc.googleapis.com/Cluster` expression, `&&` binds tighter than `||`, so it parses as `(has(...) && !contains('testing')) || !contains('development')`; the source's description says it checks for either substring. It is kept verbatim from the source.
- The `matches` regular expression for `compute.googleapis.com/Instance` is shown with the source's backslash escaping (`\\\\d`); verify escaping in the form your tooling expects before relying on it.
- Replace `PROJECT_ID` and `IP_ADDRESS` placeholders with your own values.
- More on CEL: the CEL spec and language definition at https://github.com/google/cel-spec and https://github.com/google/cel-spec/blob/master/doc/langdef.md.
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-write-cel-expressions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-overview.md](./compliance-manager-overview.md)
- [compliance-manager-apply-framework.md](./compliance-manager-apply-framework.md)
