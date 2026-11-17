---
source: https://docs.cloud.google.com/security-command-center/docs/risk-reports-overview
---

# Risk reports overview

Risk reports summarize the results of Security Command Center attack path simulations: a high-level overview followed by sample toxic combinations and attack paths. Preview. Premium and Enterprise (Deprecated) service tiers, organization-level activation. Reports show data for Google Cloud resources only.

## Signature / Usage

### What "Your risk exposure" counts

Reports are viewed in the Google Cloud console and downloaded as PDF. In the Risk Engine introduction section, **Your risk exposure** refers to the following:

```text
  - The number of successful attack paths.
  - The number of exposed resources with a score that is greater than zero.
  - **Percentage of exposed resource value**: A graph that shows the attack exposure score divided by the resource value over time.
```

## Options / Props

### Report sections (in report order)

| Section | Contents |
|------|------|
| Risk Engine introduction | High-value resource set (whether you created resource value configurations); Sensitive Data Protection; valued resources assigned in the latest simulation per resource type; VPC Service Controls; your risk exposure (successful attack paths, exposed resources with score > 0, percentage of exposed resource value over time); attack paths graph |
| System attack exposure | Organization exposure score and percentage of exposed resources over time; project exposure histogram; most exposed projects; most exposed resources |
| Entry points and chokepoints | Attacker entry points diagram and table (grouped by type, with frequency); attack path chokepoints diagram; top four chokepoints with suggested mitigations |
| Toxic combination details | Example for the highest-scoring toxic combination; short-term remediation; long-term remediations |
| Toxic combination across your environment | Categories with highest scored issues; toxic combinations with highest exposure scores; attack step method breakdown mapped to the MITRE ATT&CK framework with frequency |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms (Service Specific Terms); pre-GA features are available "as is" and might have limited support.
- The Enterprise service tier shuts down on May 21, 2027; organizations on it move automatically to Premium on or after May 21, 2027.
- You can access risk reports in the Google Cloud console, but downloading a PDF copy requires a role with specific permissions (see https://docs.cloud.google.com/security-command-center/docs/download-risk-reports#before-you-begin). Share downloaded reports carefully, since they describe exposure paths to your high-value resources.
- Risk reports capture findings related to toxic combinations and chokepoints.
- A risk report is useful to share a high-level view of the security landscape of your environment.
- Source: https://docs.cloud.google.com/security-command-center/docs/risk-reports-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [toxic-combinations-overview.md](./toxic-combinations-overview.md)
- [attack-exposure-learn.md](./attack-exposure-learn.md)
- [attack-exposure-supported-features.md](./attack-exposure-supported-features.md)
