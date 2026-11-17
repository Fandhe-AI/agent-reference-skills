---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-build-findings-query-console
---

# Query findings in the console

How to create and edit findings queries in the **Query editor** panel on the Security Command Center **Findings** page, including supported operators and the `contains`, `containsOnly` and `inIpRange` functions. Applies to Standard-legacy, Standard, Premium, and Enterprise (Deprecated) tiers.

## Signature / Usage

### The `contains` function

```text
contains(ARRAY_ATTRIBUTE_NAME, SUBFILTER)
```

When the array-type attribute is a subfield of another attribute, give both names separated by a dot.

```text
contains(indicator.ip_addresses, elem="192.0.2.80")
```

When the queried value is in a non-array subfield of an array-type attribute, use the subfield name instead of `elem`.

```text
contains(connections, destination_ip="192.0.2.80")
```

The Add filter menu adds `contains` automatically for some options.

```text
contains(connections, inIpRange(destination_ip, "2001:db8::/32"))
```

### The `containsOnly` function

```text
containsOnly(ARRAY_ATTRIBUTE_NAME,SUBFILTER)
```

```text
state="ACTIVE"
  AND NOT mute="MUTED"
  AND containsOnly(iam_bindings,member="group:example-group@example.com")
```

### The `inIpRange` function

```text
inIpRange(ATTRIBUTE_WITH_IP, "CIDR_RANGE")
```

```text
state="ACTIVE"
AND NOT mute="MUTED"
AND inIpRange(access.caller_ip, "2001:db8::/32")
```

```text
state="ACTIVE"
AND NOT mute="MUTED"
AND NOT inIpRange(access.caller_ip, "192.0.2.0/24")
```

For an attribute that can appear multiple times, combine with `contains`.

```text
contains(connections, inIpRange(source_ip, "192.0.2.0/24"))
```

## Options / Props

### Operators and functions

| Type | Supported |
|---|---|
| Strings | `=` exact match (`resource.parent_name="prod"` matches `prod`, not `production` or `canaryprod`); `:` partial match (`resource.parent_name:"prod"` matches `prod`, `production`, `canaryprod`) |
| Numbers (except int64) | `<`, `>`, `<=`, `>=`, `=`, `!=` |
| Numbers (int64) | `=`, `!=` |
| Booleans | `=` |
| Logical | `AND`, `OR`, `NOT` or `-` |
| Grouping | `(`, `)` |
| Arrays | `contains()` (at least one element matches), `containsOnly()` (only matching elements) |
| IP addresses | `inIpRange()` (CIDR range) |

### Add filter menu wording

| Menu option | Meaning |
|---|---|
| Equals / Does not equal | Exact attribute value match / non-match. |
| After / Before | Creation or update time after / before a time. |
| Greater than / Less than | Attribute value higher / lower than yours. |
| Has / Does not have | Attribute value contains / doesn't contain the Keyword text. |
| Contains any / all / none | Array value contains any / all / none of the Keyword text. |
| Contains only | Array contains only the Keyword value and no others. |
| Any within IP range / Does not have any within IP range | IP address in / not in a CIDR range. |

## Notes

- Top-level attributes in the Add filter menu: Finding, Resource, Access (`access`), Attack exposure score, Backup Disaster Recovery, Compliances (`compliances[]`), Connections (`connections[]`), Contacts, Containers, Database, Data Access Events, Data Flow Events, Data Retention Deletion Events (`DataRetentionDeletionEvent`), Exfiltration (`exfiltration`), Files, IAM binding (`iamBindings[]`), Indicator, Kernel rootkit, Kubernetes, MITRE ATT&CK (`mitreAttack`), Processes (`processes[]`), Security posture, Sensitive Data Protection, Vulnerability.
- In the console, `containsOnly` supports only the `iam_bindings.member` and `iam_bindings.role` array attributes (the **IAM binding > Member** and **Role** filters).
- In the query editor don't include escape characters: use `"string-value"`, not `\\"string-value\\"`. Press Control+Space to open autocomplete. While you use the query editor, Quick filters are deactivated. The editor highlights errors before submission.
- Large datasets or complex filters in the console can degrade performance or time out; for continuous monitoring, dashboards or cross-project analysis, export findings to BigQuery.
- With data residency enabled, use the jurisdictional console; queries return only findings stored in the selected data location.
- Selecting a project, folder or organization is required; the default query is shown in **Query preview** (use **Edit Query**).
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on it move to Premium on or after that date.
- Console click paths are omitted; see the source page.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-build-findings-query-console (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [review-manage-findings.md](./review-manage-findings.md)
- [how-to-mute-findings.md](./how-to-mute-findings.md)
- [how-to-security-marks-findings.md](./how-to-security-marks-findings.md)
