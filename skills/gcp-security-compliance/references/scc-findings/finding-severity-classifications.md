---
source: https://docs.cloud.google.com/security-command-center/docs/finding-severity-classifications
---

# Finding severities

The `severity` property of a finding is a general indicator of how important it is to remediate findings of a category or subcategory. Generally remediate `HIGH` before `LOW`, but a particular `LOW` finding can matter more depending on the affected resource. Applies to Standard-legacy, Standard, Premium, and Enterprise (Deprecated) tiers unless noted.

## Signature / Usage

### List active findings

The gcloud help has no severity example; this lists the active findings under an organization and source. Add a condition on `severity` to `--filter` as needed.

```bash
gcloud scc findings list 123456 --source=5678 \
    --filter="state=\"ACTIVE\""
```

## Options / Props

### Severity values

| Severity | Vulnerability | Threat |
|---|---|---|
| `Critical` | Easily discoverable and exploitable for direct arbitrary code execution, data exfiltration, or additional access and privileges (for example publicly accessible user data, public SSH access with weak or no passwords). | Able to access, modify or delete data, or execute unauthorized code within existing resources. |
| `High` | Easily discoverable; could be exploited with other vulnerabilities for direct access to execute code or exfiltrate data (for example an internal-only database with weak or no passwords). | Able to create computational resources in the environment, but not access data or execute code in existing resources. |
| `Medium` | Could let an actor gain access to resources or privileges that eventually enable exfiltration or code execution (for example a service account with unnecessary access to projects). | Could lead to a more severe issue, but might not indicate current data access or unauthorized code execution. |
| `Low` | Hampers detection of vulnerabilities or active threats, or prevents root-cause investigation (for example monitoring and logs disabled). | Obtained minimal access; can't access data, execute code or create resources. |
| `Unspecified` | The service that generated the finding did not set a severity; assess it yourself. | Same. |

### `SCC error` class severities

| Severity | Meaning |
|---|---|
| `Critical` | A configuration error prevents generating new findings of any severity, prevents you from seeing all of a service's findings, or prevents attack path simulations from generating attack exposure scores and attack paths. |
| `High` | You can't see or export some of a service's findings, or attack exposure scores and attack paths might be incomplete or inaccurate. |

### Severity vs attack exposure score

| | Severity | Attack exposure score |
|---|---|---|
| Nature | Predetermined from the finding category; same default for all findings in a category or subcategory. | Dynamic; calculated after the finding is generated, specific to the finding instance. |
| Applies to | All findings. | Only vulnerability and misconfiguration findings supported by attack path simulations. |
| Tiers | All tiers listed above. | Premium and Enterprise (Deprecated) (requires organization-level activation). |

### Where to view severities in the console

| Tier | Places |
|---|---|
| Standard and Standard-legacy | Overview (All Risk > Top misconfigurations); Findings page Quick filters; Vulnerabilities page (filter modules by severity). |
| Premium | Risk Overview > Threats dashboard; Findings page Quick filters; Issues page (Findings panel); Vulnerabilities page. |
| Enterprise (Deprecated) | Same four places as Premium. |

## Notes

- When prioritizing vulnerability and misconfiguration findings, prioritize by attack exposure score before severity (Premium and Enterprise (Deprecated)).
- Variable severity, Enterprise (Deprecated) tier only: a finding starts at the category's default severity; if attack path simulations find that it exposes a designated high-value resource, severity is raised with its attack exposure score. If the score later drops, severity can decrease but no lower than the original default. For other tiers, severities stay static.
- Some categories assign a different default severity depending on the detected issue. Example: the Event Threat Detection `IAM anomalous grant` finding is usually `HIGH`, but `MEDIUM` when sensitive permissions are granted to a custom IAM role.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on it move to Premium on or after that date.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/security-command-center/docs/finding-severity-classifications (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [finding-classes.md](./finding-classes.md)
- [review-manage-findings.md](./review-manage-findings.md)
- [issues-overview.md](./issues-overview.md)
