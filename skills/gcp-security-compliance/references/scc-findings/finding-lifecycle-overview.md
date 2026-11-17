---
source: https://docs.cloud.google.com/security-command-center/docs/finding-lifecycle-overview
---

# Overview of the finding lifecycle

Security Command Center and detection services manage findings through four phases: detection, triage and remediation, mute, and retention. Applies to Standard-legacy, Standard, Premium, and Enterprise (Deprecated) tiers.

## Signature / Usage

### Mark a finding remediated, or mute it

The mute state is independent of the finding state.

```bash
gcloud scc findings update \
    projects/example-project/sources/5678/findings/testFinding \
    --state=INACTIVE
```

```bash
gcloud scc findings set-mute 789 --project=projects/123 \
    --source=456 --mute=MUTED
```

## Options / Props

### Phases

| Phase | What happens |
|---|---|
| Detection | A detection service creates the finding, sets the finding class (otherwise `Finding class unspecified`) and `state` to `ACTIVE`. |
| Triage and remediation | You fix the cause; then you set `state` to `INACTIVE` manually, or the service does it automatically. |
| Mute | Optionally hide findings from default dashboards and notification workflows. |
| Retention | Findings and snapshots are stored per retention policies (finding class, state and service tier). |

### Time properties

| Property | Meaning |
|---|---|
| `create_time` | When the detection service created the finding record in Security Command Center. Set automatically; can't be changed manually. |
| `event_time` | When the service first detected the finding or last updated information in it. Set initially by the service, which might update it only on meaningful change (such as a change to `INACTIVE`). |

### Behavior by finding type

| Type | State handling |
|---|---|
| Vulnerability and misconfiguration | Service sets `INACTIVE` automatically when the problem or the resource no longer exists. Timing depends on scan frequency, permanent resource deletion (projects stay in a recovery period before permanent deletion), Cloud Asset Inventory freshness (Azure / AWS resources can take longer), and fixed `ACTIVE` windows in services such as Vulnerability Assessment for Google Cloud and Artifact Registry vulnerability assessment. |
| Threat | Never set `INACTIVE` automatically; you investigate and set it manually. |
| Toxic combination and chokepoint | Created by Risk Engine during periodic attack path simulations; see "Remediating toxic combinations and chokepoints". |
| Posture violation | Change state through the security posture service or Compliance Manager docs. |
| Error (`SCC error`) | Set to `INACTIVE` automatically when the configuration problem no longer exists. |
| Issues | Correlated Threats issues and Toxic combination / Chokepoint issues have their own lifecycle sections. |

## Notes

- If you set `INACTIVE` manually and the detection service manages the state, it might reset to `ACTIVE` until it detects that the condition is resolved.
- Muting a finding and annotating it with security marks don't change `event_time`. For vulnerability and misconfiguration findings, Security Command Center updates `event_time` every 30 days if no change has occurred, so the finding is returned by queries for recent `ACTIVE` findings. Services might not update `event_time` on every scan.
- The mute state (`MUTED` or `UNMUTED`) is independent of the finding state; you can mute an `ACTIVE` finding. You can't mute `SCC error` findings. Muted findings remain in Security Command Center and can be queried.
- Muting hides findings from the default dashboards and the default findings query; it does not remediate anything. Try it on a test finding first and unmute with `--mute=UNMUTED` if needed.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on it move to Premium on or after that date.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/update and https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/set-mute (gcloud 593.0.0 help). With no `--location`, the help says the request goes to the SCC V1 API; pass `--location` to use the V2 API.
- Source: https://docs.cloud.google.com/security-command-center/docs/finding-lifecycle-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [finding-states.md](./finding-states.md)
- [how-to-mute-findings.md](./how-to-mute-findings.md)
- [review-manage-findings.md](./review-manage-findings.md)
- [issues-overview.md](./issues-overview.md)
