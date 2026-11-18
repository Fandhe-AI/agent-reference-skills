---
source: https://docs.cloud.google.com/security-command-center/docs/issues-overview
---

# Issues overview

Issues are notable security concerns that Security Command Center identifies in your cloud environments through virtual red teaming and rule-based detections. Available for Premium and Enterprise (Deprecated) tiers, and issues are generated only when Security Command Center is activated at the organization level.

## Signature / Usage

### List active findings in a folder

gcloud 593.0.0 has no `scc issues` command group. Issues are viewed at organization, folder or project scope; this lists the active findings under a folder.

```bash
gcloud scc findings list folders/456 --filter="state=\"ACTIVE\""
```

## Options / Props

### Issue sources (medium, high or critical severity)

| Source | Notes |
|---|---|
| Toxic combinations and chokepoints | Created by Risk Engine; must be viewed at the organization level. |
| Predefined detection rules | Security graph rules; viewable at organization, folder or project level. |
| Correlated Threats | Preview; security graph / Correlated Threats rules viewable at organization, folder or project level. |
| Design-time findings | From Application Design Center assessments integrated into Security Command Center. |
| Runtime detections | In the Application Design Center. |

### Viewing scopes (Preview; Premium and Enterprise (Deprecated))

| Scope | Shows |
|---|---|
| Organization | All issues affecting all resources in the organization. |
| Folder | Issues affecting resources in a folder or its subfolders, when created by a security graph rule or Correlated Threats rule. |
| Project | Issues affecting resources in a project, when created by a security graph rule or Correlated Threats rule. |

### Lifecycle and retention

| Item | Value |
|---|---|
| Active until | Resolved by fixing the referenced findings or deleting the affected resources. |
| Inactive issue retention | 90 days, then deleted. |
| Correlated Threats issue retention (Preview) | 14 days. |

## Notes

- A detection can discover multiple instances; by default the console groups issues with the same severity and detection.
- An issue is attributed to a folder or project if its primary resource resides in the selected scope. Without IAM permissions on resources outside the scope, only the issue category is shown (for example "VM with high-risk CVE with access to sensitive data"), and details about a secondary resource in another project or folder are hidden.
- You need the required IAM role (see "Manage and remediate issues") at organization, folder or project level to view issues in a scope.
- Use the **Select app** menu on the Issues page to filter by App Hub application; the primary resource must be registered as a service or workload. "None" shows issues for all resources.
- Investigate issues on the **Overview** page (top risks) and the **Issues** page (detailed remediation steps).
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on it move to Premium on or after that date.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/security-command-center/docs/issues-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [finding-lifecycle-overview.md](./finding-lifecycle-overview.md)
- [finding-classes.md](./finding-classes.md)
- [finding-severity-classifications.md](./finding-severity-classifications.md)
