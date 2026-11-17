---
source: https://docs.cloud.google.com/security-command-center/docs/toxic-combinations-manage
---

# Manage toxic combinations and chokepoints

How to prepare for, investigate and remediate toxic combinations and chokepoints using Issues (Premium and Enterprise (Deprecated)), Cases (Enterprise (Deprecated)) and Findings (Premium and Enterprise (Deprecated)). Detection is always on; you remediate the underlying vulnerability, misconfiguration or external exposure findings along the simulated attack path.

## Signature / Usage

### Mute a toxic combination finding from the command line

The gcloud help sets a finding's mute state as below (finding `organizations/123/sources/456/findings/789`). The source page describes only Console mute steps (Risk > Cases > related alert > **Explore findings in SCC** > **Mute options**).

```bash
gcloud scc findings set-mute 789 \
    --organization=organizations/123 --source=456 --mute=MUTED
```

### Remediate (Console)

1. Issues: open **Issues** (Premium) or **Risk > Issues** (Enterprise (Deprecated)), select the organization, select an issue, review description and evidence, open related findings, click **Explore full attack paths**, then **How to fix**.
2. Findings: on the **Findings** page select **Finding class** **Toxic combination** or **Chokepoint**, sort by **Attack Exposure Score** descending, open a finding and follow **Next steps**.
3. Cases (Enterprise (Deprecated)): **Risk > Cases**, filter **Tags** is **Toxic combination**, sort by attack exposure (high to low), then follow **Next steps** in **Case summary**.

## Options / Props

### IAM roles on the organization

| Task | Roles |
|------|------|
| View attack paths | `roles/securitycenter.adminViewer`, `roles/securitycenter.attackPathsViewer`, `roles/securitycenter.findingsViewer` |
| View attack path findings | `roles/securitycenter.adminViewer`, `roles/securitycenter.attackPathsViewer`, `roles/securitycenter.findingsViewer` |
| View findings | `roles/securitycenter.adminViewer`, `roles/securitycenter.findingsViewer` |
| Mute findings | `roles/securitycenter.adminViewer`, `roles/securitycenter.findingsEditor`, `roles/securitycenter.findingsMuteSetter` |
| View resources | `roles/securitycenter.adminViewer`, `roles/securitycenter.findingsMuteSetter` |
| Edit findings | `roles/securitycenter.adminViewer`, `roles/securitycenter.findingsEditor`, `roles/securitycenter.findingsViewer` |

### Google SecOps roles (Enterprise (Deprecated); any one)

| Role |
|------|
| `roles/chronicle.soarVulnerabilityManager` |
| `roles/chronicle.soarThreatManager` |
| `roles/chronicle.soarAdmin` |

## Notes

- The Enterprise service tier shuts down on May 21, 2027; organizations on it move automatically to Premium on or after May 21, 2027.
- Before you begin: optionally connect AWS (Preview) and Azure (Preview) for multicloud simulations (Enterprise (Deprecated) only); install the June 25, 2024 or later release of the **SCC Enterprise -- Cloud Orchestration and Remediation** use case (Enterprise (Deprecated)); define your high-value resource set, because findings based on the default set are unlikely to reflect your priorities.
- Remediate toxic combinations and chokepoints before other risks. After a later simulation finds the path no longer exists, the finding state changes automatically from `ACTIVE` to `INACTIVE`. Cases close automatically in the next simulation (up to every 48 hours).
- Muting closes the case but leaves the finding active and hides it from default views; use it only when the risk is acceptable or cannot be remediated. Unmute with `--mute=UNMUTED` if circumstances change; try muting on a disposable finding first.
- Closed cases are removed from the **Cases** page; view them by filtering **Status** = **Closed** and **Tags** = **Toxic combination**.
- In the Issues view, grouped issues rank by severity then attack exposure score; disable **Group by detections** to sort all issues by score. **Filter issues for this primary resource** appears when several critical issues exist on one primary resource.
- For related findings in a toxic combination case, Security Command Center opens separate cases and runs their playbooks; review them from **Case overview** > **Findings** and ask ticket owners to prioritize.
- Console steps are summarized; see the source page for the full steps.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/set-mute (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/security-command-center/docs/toxic-combinations-manage (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [toxic-combinations-overview.md](./toxic-combinations-overview.md)
- [attack-exposure-define-high-value-resource-set.md](./attack-exposure-define-high-value-resource-set.md)
- [attack-exposure-learn.md](./attack-exposure-learn.md)
