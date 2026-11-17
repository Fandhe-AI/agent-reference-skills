---
source: https://docs.cloud.google.com/security-command-center/docs/overview-threats
---

# Threat detection in Security Command Center

Security Command Center detects threats in three layers (log-based, agentless, runtime) and reports them as findings with severity levels. Related threat findings are grouped into Correlated Threats issues. Availability by service tier: Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers (some features require organization-level activation); per-service tiers are listed below.

## Signature / Usage

### Threat detection service names for `gcloud scc manage services`

`gcloud scc manage services describe` and `update` take the service as `SERVICE_NAME`. The supported-services list of the gcloud help includes these threat detection services; it also lists `vm-threat-detection-aws` (`vmtd-aws`), `cloud-run-threat-detection` (`crtd`) and `agent-engine-threat-detection` (`aetd`).

```text
* event-threat-detection (can be abbreviated as etd)

* container-threat-detection (can be abbreviated as ctd)

* vm-threat-detection (can be abbreviated as vmtd)
```

## Options / Props

### Detection layers

| Layer | Services | Tiers | What it does |
|---|---|---|---|
| Log-based | Event Threat Detection (Premium and Enterprise (Deprecated)); Sensitive Actions Service (Standard-legacy, Standard, Premium, and Enterprise (Deprecated)) | Per service, see the first column | Continuously analyzes log streams for suspicious patterns, known indicators of compromise (IoCs) and sensitive actions. |
| Agentless | Virtual Machine Threat Detection | Premium and Enterprise (Deprecated) | Scans Compute Engine VMs from the hypervisor (for example cryptocurrency miners, kernel-mode rootkits); no guest agent, guest OS configuration or guest network connectivity needed. |
| Runtime | Container Threat Detection, Cloud Run Threat Detection, Agent Platform Threat Detection (Preview) | Premium and Enterprise (Deprecated) | Monitors running containers and serverless workloads for reverse shells, container escapes and malicious programs. |

### Built-in threat detection services

| Service | Availability |
|---|---|
| Agent Platform Threat Detection (Preview) | Premium and Enterprise (Deprecated). Monitors AI agents deployed to Agent Runtime. |
| Anomaly Detection | Standard-legacy, Standard, Premium, and Enterprise (Deprecated). Uses behavior signals from outside your system to detect anomalies in service accounts, such as potential leaked credentials. |
| Cloud Run Threat Detection | Premium and Enterprise (Deprecated). |
| Container Threat Detection | Premium and Enterprise (Deprecated). Collects low-level behavior in the guest kernel of containers. |
| Event Threat Detection | Premium and Enterprise (Deprecated). Matches Cloud Logging events to IoCs, known adversarial techniques and behavioral anomalies. |
| Sensitive Actions Service | Standard-legacy, Standard, Premium, and Enterprise (Deprecated). |
| Virtual Machine Threat Detection | Premium and Enterprise (Deprecated). |

### Resource category and detection matrix

| Resource category | Example threats detected | Detection layers |
|---|---|---|
| AI | Agent-initiated data exfiltration, malicious script executed in an agentic workload | Runtime, log-based |
| Amazon EC2 | Malicious file on disk | Agentless |
| Backup and DR | Unauthorized deletion of backups and DR hosts | Log-based |
| BigQuery | Data exfiltration | Log-based |
| Cloud Run | Reverse shells, execution of reconnaissance tools, use of cryptomining commands | Runtime, log-based |
| Cloud Storage | Modifications in the IP filtering configuration for a bucket | Log-based |
| Compute Engine | Cryptomining, kernel-mode rootkits, modified boot disk persistence | Agentless, log-based |
| Database | Data exfiltration, superuser modifications to user tables | Log-based |
| Google Kubernetes Engine | Malicious binary execution, container escape, launch of privileged containers | Runtime, log-based |
| Google Workspace | Password leaks, suspicious login patterns | Log-based |
| Identity and Access Management | Anomalous role grants, sensitive policy changes, access from Tor | Log-based |
| Network | Malware DNS queries, connections to known cryptomining IP addresses | Log-based |

## Notes

- Some threat detectors are disabled by default. For the Premium and Enterprise (Deprecated) tiers, many threat detection services are enabled by default; enable or disable a service or module through Configure Security Command Center services. You might also need to enable collection of specific logs (see the log types page in this category).
- Event Threat Detection also monitors Cloud Audit Logs (Admin Activity, Data Access, System Event), VPC Flow Logs, Cloud DNS logs, foundational log sources and Google Workspace audit logs. Sensitive Actions Service monitors Admin Activity audit logs. Event Threat Detection can use Sensitive Data Protection discovery scans (when enabled) to adjust finding categories and upgrade severity.
- Threat intelligence comes from Google Threat Intelligence.
- Severity: each finding gets a severity level. Correlated Threats consolidates multiple related findings into a single issue and visualizes the attack chain.
- For the Premium and Enterprise (Deprecated) tiers (requires organization-level activation) you can configure continuous exports to Cloud Logging.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe (gcloud 593.0.0 help, `SERVICE_NAME` list); the help EXAMPLES use only the Security Health Analytics service `sha`.
- Source: https://docs.cloud.google.com/security-command-center/docs/overview-threats (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [concepts-vm-threat-detection-overview.md](./concepts-vm-threat-detection-overview.md)
- [cloud-run-threat-detection-overview.md](./cloud-run-threat-detection-overview.md)
- [agent-platform-threat-detection-overview.md](./agent-platform-threat-detection-overview.md)
- [concepts-sensitive-actions-overview.md](./concepts-sensitive-actions-overview.md)
- [correlated-threats-overview.md](./correlated-threats-overview.md)
- [how-to-investigate-threats.md](./how-to-investigate-threats.md)
