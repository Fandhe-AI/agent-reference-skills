---
source: https://docs.cloud.google.com/security-command-center/docs/activate-scc-project-level-limitations
---

# Features available with project-level activations

Standard-legacy, Standard, and Premium service tiers. A project-level activation manages findings within one project; some detection services and finding categories need access beyond one project. Activating the Standard tier at the parent organization turns on certain cross-project features; other capabilities need an organization-level Premium activation.

## Signature / Usage

### Check Security Health Analytics for a project

Many of the limitations below are Security Health Analytics categories; this shows that service's enablement state for a project.

```bash
gcloud scc manage services describe sha --project=789
```

## Options / Props

### Enable for a project-level Premium activation by activating Standard in the parent organization

| Area | Finding categories / services |
|---|---|
| Security Health Analytics | `MFA not enforced`, `Public log bucket` (enabled for all projects in the organization) |
| Security Health Analytics (Premium finding categories) | `Audit config not monitored`, `Bucket IAM not monitored`, `Cluster private Google access disabled`, `CUSTOM_ORG_POLICY_VIOLATION`, `Custom role not monitored`, `Default network`, `DNS logging disabled`, `Egress deny rule not set`, `Firewall not monitored`, `HTTP load balancer`, `KMS project has owner`, `Legacy network`, `Locked retention policy not set`, `Log not exported`, `Network not monitored`, `Object versioning disabled`, `Org policy Confidential VM policy`, `Org policy location restriction`, `OS login disabled`, `Owner not monitored`, `Pod security policy disabled`, `Route not monitored`, `SQL instance not monitored`, `Too many KMS users`, `Weak SSL policy` |
| Event Threat Detection (Premium finding categories) | `Exfiltration: BigQuery data extraction`, `Exfiltration: CloudSQL data exfiltration` |
| Integrated services (enabled for all projects in the organization) | Sensitive Data Protection, Google Cloud Armor, Anomaly Detection, Google Security Operations |
| Integrated Premium-tier service | VM Manager (publication of findings) |
| Third-party services | Publication of findings from third-party services |

### Unavailable with project-level Premium activations (need organization-level Premium)

| Area | Finding categories / features |
|---|---|
| Security Health Analytics | `Audit logging disabled`, `KMS role separation`, `Redis role used on org`, `Service account role separation` |
| Event Threat Detection | `Defense evasion: modify VPC service control`, `Initial access: account disabled hijacked`, `Initial access: disabled password leak`, `Initial access: government based attack`, `Initial access: suspicious login blocked`, `Persistence: new geography`, `Persistence: new user agent`, `Persistence: SSO enablement toggle`, `Persistence: SSO settings changed`, `Persistence: strong authentication disabled`, `Persistence: two step verification disabled`, `Privilege escalation: external member added to privileged group`, `Privilege escalation: privileged group opened to public`, `Privilege escalation: sensitive role granted to hybrid group`, `Privilege escalation: suspicious cross-project permission use`, `Privilege escalation: suspicious token generation` |
| Sensitive Actions Service | `Defense Evasion: Organization Policy Changed`, `Defense Evasion: Remove Billing Admin`, `Persistence: Add Sensitive Role` |
| Attack path simulations | Attack exposure scores and attack paths (Premium-tier feature) |
| Graph search | Custom queries over the security graph (Premium-tier feature) |
| Security posture | Define, assess, and monitor security posture (Premium-tier feature) |
| Data residency | Not supported with project-level activations |
| Artifact Registry vulnerability assessment | Requires organization-level activation |

## Notes

- Complete lists of finding categories: Security Health Analytics detectors (https://docs.cloud.google.com/security-command-center/docs/concepts-vulnerabilities-findings#security-health-analytics-detectors), Event Threat Detection rules (https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#rules), and Sensitive Actions Service findings (https://docs.cloud.google.com/security-command-center/docs/concepts-sensitive-actions-overview#findings).
- Related guidance (activation overview): to optimize project-level Premium, activate the Standard tier at the organization level.
- Source: https://docs.cloud.google.com/security-command-center/docs/activate-scc-project-level-limitations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe (gcloud 593.0.0 help). `sha` is the abbreviated service name of `security-health-analytics`.

## Related

- [activate-scc-for-a-project.md](./activate-scc-for-a-project.md)
- [activate-scc-overview.md](./activate-scc-overview.md)
- [service-tiers.md](./service-tiers.md)
