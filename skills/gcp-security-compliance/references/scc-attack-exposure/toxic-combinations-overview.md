---
source: https://docs.cloud.google.com/security-command-center/docs/toxic-combinations-overview
---

# Toxic combinations and chokepoints overview

Risk Engine detects toxic combinations (groups of security issues that create an attack path to high-value resources) and chokepoints (shared resources where multiple attack paths converge, so one fix remediates many toxic combinations). Each detection generates a finding with an attack exposure score and an attack path visualization. Premium and Enterprise (Deprecated) service tiers.

## Signature / Usage

### List toxic combination and chokepoint findings

In the console, use the **Findings** page and filter **Finding class** by **Toxic combination** or **Chokepoint**. Risk Engine generates attack exposure scores and attack path simulations for these finding classes:

```text
- `Toxic combination` class findings.
- `Chokepoint` class findings.
```

## Options / Props

### Supported platforms

| Platform | Service tier | Stage |
|------|------|------|
| Google Cloud | Premium and Enterprise (Deprecated) | No Preview label in the source |
| Amazon Web Services (AWS) | Enterprise (Deprecated) | Preview |
| Microsoft Azure | Enterprise (Deprecated) | Preview |

### Severity by attack exposure score

| Item | Severity |
|------|------|
| Toxic combination, score >= 10 | Critical |
| Toxic combination, score < 10 | High |
| Chokepoint (score always >= 10) | Critical |

### Where attack paths are shown

| Tier | Full path | Simplified path |
|------|------|------|
| Premium | **Attack paths** page | **Risk Overview** (Riskiest issues widget); **Issues** page, issue **Overview** tab |
| Enterprise (Deprecated) | Click **Explore full attack paths** in a simplified view | **Risk > Overview** (Riskiest issues widget); **Risk > Issues** **Overview** tab; **Risk > Cases** **Case overview** tab |

### Attack path highlighting

| Border color | Meaning |
|------|------|
| Yellow | Resource with security issues contributing to a toxic combination |
| Red | Resource identified as a chokepoint |

## Notes

- The Enterprise service tier shuts down on May 21, 2027; organizations on it move automatically to Premium on or after May 21, 2027.
- Toxic combination score and attack exposure score are the same measure; the **Findings** page may call it the toxic combination score. Score derives from the number, priority values and scores of exposed high-value resources and the likelihood that a determined attacker reaches them.
- Highest-risk items appear as issues on the **Risk Overview** and **Issues** pages; findings related to toxic combinations and chokepoints are captured in risk reports.
- Related findings: individual risks are also detected by other detection services, which generate separate findings, cases and playbooks, possibly worked by other team members. Check their status and ask owners to prioritize them to help resolve the toxic combination.
- Cases (Enterprise (Deprecated) only): a case opens for each toxic combination finding; chokepoints do not generate cases. Case priority defaults to the finding severity (`Critical` or `High`); changing case or alert priority does not change the finding severity. Case detail shows description, score, attack path, affected resources, remediation steps, related findings, playbooks and tickets; filter with the **Toxic Combination** tag.
- Closing: remediation is detected in the next simulation (approximately every 48 hours) and closes the case automatically. Muting the finding closes the case and omits the finding from default queries, but the finding remains active; it hides a real exposure, so mute only when the risk is accepted or unavoidable.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/attack-exposure-supported-features (supported finding classes). The source page has no code; screenshots omitted.
- Source: https://docs.cloud.google.com/security-command-center/docs/toxic-combinations-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [toxic-combinations-manage.md](./toxic-combinations-manage.md)
- [attack-exposure-learn.md](./attack-exposure-learn.md)
- [attack-exposure-supported-features.md](./attack-exposure-supported-features.md)
- [risk-reports-overview.md](./risk-reports-overview.md)
