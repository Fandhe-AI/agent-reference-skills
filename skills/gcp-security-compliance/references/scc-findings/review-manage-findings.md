---
source: https://docs.cloud.google.com/security-command-center/docs/review-manage-findings
---

# Review and manage findings

How to query, inspect, mute, mark and change the state of findings on the Security Command Center **Findings** page. Applies to Standard-legacy, Standard, Premium, and Enterprise (Deprecated) tiers.

## Signature / Usage

### Default findings query

The query editor starts with this query. Findings with `launch_state` set to `LAUNCH_STATE_DEPRECATED` are described in "Standard tier enhanced and automatically activated for some customers".

```text
state="ACTIVE"
AND NOT mute="MUTED"
AND launch_state="LAUNCH_STATE_DEPRECATED"
```

As written in the source, the last line keeps only findings with `launch_state` set to `LAUNCH_STATE_DEPRECATED` (findings from deprecated Security Health Analytics detectors). To exclude those findings instead and review active findings from current detectors, negate the condition.

Adapted (not in the official docs): `AND launch_state=...` changed to `AND NOT launch_state=...` so the query excludes deprecated-detector findings.

```text
state="ACTIVE"
AND NOT mute="MUTED"
AND NOT launch_state="LAUNCH_STATE_DEPRECATED"
```

### List findings with gcloud

```bash
gcloud scc findings list 123456 --source=5678 \
    --filter="state=\"ACTIVE\""
```

## Options / Props

### Required roles (on the organization)

| Role | ID |
|---|---|
| Security Center Findings Viewer | `roles/securitycenter.findingsViewer` |
| Security Center Findings Editor | `roles/securitycenter.findingsEditor` |

### Behavior and defaults

| Item | Detail |
|---|---|
| Default time range | `Last 7 days`, based on the finding's `eventTime` (when the record was last updated). |
| Default view | Active findings that are not muted and are new or updated over the last seven days; use **Inactive** or **Muted** in Quick filters for others. |
| Availability | Usually under a minute after the generating service stores the finding; retention depends on tier. |
| Predefined views, Standard-legacy | All Findings, Vulnerabilities, Identity. |
| Predefined views, Standard / Premium | All Findings, Vulnerabilities, Identity, Data, Threats. |
| Predefined views, Enterprise | All Findings, Vulnerabilities, Identity, Threats, Data. |
| Scope | Selecting a project, folder or organization shows only findings associated with its resources. |
| Data residency | If enabled, use the jurisdictional console. |
| Detail view tabs | Summary, Source properties, JSON (`findings`, `resource`, `sourceProperties` objects). |
| Hidden columns | Any column except **Category**. |

### Missing information in findings

| Field | Why it can be blank or `Unspecified` |
|---|---|
| Project ID | The issue was detected at organization or folder level. |
| Severity | A third-party source or custom module didn't set one. |
| Resource type | Resource unsupported by Cloud Asset Inventory or an unrecognized name. |
| Cloud service provider | Deprecated Security Health Analytics detectors (`LAUNCH_STATE_DEPRECATED`), custom sources or integrations that don't specify an environment. |

## Notes

- The **Findings** page doesn't show threat detections and alerts created by curated detections; view them in the Security Operations console under SIEM Dashboards.
- Source properties differ for each finding and service and aren't standardized; the source strongly discourages consuming them programmatically.
- Changing the state: select the finding, then **Change active state** > **Active** or **Inactive**. Muting and unmuting is possible from query results or the detail view; muted findings stay logged for audit and compliance. A security mark added to a finding applies only to that finding.
- When sharing a link to a finding, the recipient needs an IAM role that grants permission to view it.
- Findings can be filtered by App Hub application (**Select app** menu or **App ID** quick filter).
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on it move to Premium on or after that date.
- Console click paths are omitted; see the source page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/list (gcloud 593.0.0 help).
- With no `--location`, the gcloud help says the request goes to the SCC V1 API; pass `--location` to use the V2 API.
- Source inconsistency: the source labels the query with `launch_state="LAUNCH_STATE_DEPRECATED"` as the query the editor starts with; that condition selects only deprecated-detector findings, so copying it as a general findings query hides active findings from current detectors. The source query is kept verbatim and an `AND NOT` variant is added.
- Source: https://docs.cloud.google.com/security-command-center/docs/review-manage-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-to-build-findings-query-console.md](./how-to-build-findings-query-console.md)
- [how-to-mute-findings.md](./how-to-mute-findings.md)
- [how-to-security-marks-findings.md](./how-to-security-marks-findings.md)
- [finding-states.md](./finding-states.md)
- [finding-severity-classifications.md](./finding-severity-classifications.md)
