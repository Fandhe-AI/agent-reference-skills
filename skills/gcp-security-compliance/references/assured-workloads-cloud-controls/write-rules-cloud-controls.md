---
source: https://docs.cloud.google.com/assured-workloads/docs/write-rules-cloud-controls
---

# Write rules for custom cloud controls (Assured Workloads)

Preview. Applies only to Assured Workloads frameworks. A custom cloud control uses Common Expression Language (CEL) expressions to evaluate properties of the scanned resource. An expression may check a single value or be a compound expression, and it must resolve to a boolean `false` to trigger a finding.

## Signature / Usage

### Enum values are strings

Adapted (not in the official docs): the source writes `=` for the comparison; CEL equality is `==`, so the operator is corrected.

```text
resource.data.state == "PENDING_GENERATION"
```

Rules for CEL expressions that evaluate resource properties:

- Properties must be properties of the scanned resource, as defined in the API definition of the resource type.
- All enums must be represented as strings (the example above is valid for `cloudkms.googleapis.com/CryptoKeyVersion`).
- The result of the expression in the `condition` property must be a Boolean; a finding is triggered only if the result is `false`.

## Options / Props

### Example CEL expressions

| Resource type | Description | CEL expression |
|---|---|---|
| `cloudkms.googleapis.com/CryptoKey` | Check the Cloud KMS key rotation period | `has(resource.data.rotationPeriod) && resource.data.rotationPeriod < duration('60h')` |
| `compute.googleapis.com/Network` | Match Virtual Private Cloud peering rule to network peers | `resource.data.selfLink.matches('https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/default') \|\| resource.data.peerings.exists(p, p.network.matches('https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/networks/shared$'))` |
| `cloudfunctions.googleapis.com/CloudFunction` | Only allow internal ingress traffic for a Cloud Run function | `has(resource.data.ingressSettings) && resource.data.ingressSettings.matches('ALLOW_INTERNAL_ONLY')` |
| `compute.googleapis.com/Instance` | Resource name matches pattern | `resource.data.name.matches('^gcp-vm-(linux\|windows)-v\\\\d+$')` |
| `serviceusage.googleapis.com/Service` | Only allow storage-related APIs to be enabled | `resource.data.state == 'ENABLED' && !( resource.data.name.matches('storage-api.googleapis.com') \|\| resource.data.name.matches('bigquery-json.googleapis.com') \|\| resource.data.name.matches('bigquery.googleapis.com') \|\| resource.data.name.matches('sql-component.googleapis.com') \|\| resource.data.name.matches('spanner.googleapis.com'))` |
| `sqladmin.googleapis.com/Instance` | Only permit public IP addresses that are on the allowlist | `(resource.data.instanceType == 'CLOUD_SQL_INSTANCE' && resource.data.backendType == 'SECOND_GEN' && resource.data.settings.ipConfiguration.ipv4Enabled ) && (resource.data.ipAddresses.all(ip, ip.type != 'PRIMARY' \|\| ip.ipAddress.matches('IP_ADDRESS')))` |
| `dataproc.googleapis.com/Cluster` | Check if project IDs in a Managed Service for Apache Spark cluster contain the substrings `testing` or `development` | `has(resource.data.projectId) && !resource.data.projectId.contains('testing') && !resource.data.projectId.contains('development')` |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" with limited support.
- Corrected from the official docs: the source example reads `resource.data.state = "PENDING_GENERATION"`; the single `=` is not a CEL comparison, so it is shown as `==`.
- In the table, `\|` is a Markdown escape for the CEL `||` operator and the `|` in a regular-expression alternation; the expression text is otherwise verbatim. Replace `PROJECT_ID` and `IP_ADDRESS` with your own values.
- Find resource type names in the Cloud Asset Inventory asset types list. CEL references: the CEL spec and language definition on GitHub (`google/cel-spec`).
- Source: https://docs.cloud.google.com/assured-workloads/docs/write-rules-cloud-controls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-cloud-controls.md](./manage-cloud-controls.md)
- [manage-frameworks.md](./manage-frameworks.md)
