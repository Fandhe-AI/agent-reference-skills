---
source: https://docs.cloud.google.com/security-command-center/docs/correlated-threats-overview
---

# Correlated Threats overview

Correlated Threats (Preview; Premium and Enterprise (Deprecated) service tiers; subject to the Pre-GA Offerings Terms) aggregates related threat findings into a single actionable issue. A rules engine queries the security graph with predefined Correlated Threats queries and creates an issue when a pattern is identified; Security Command Center manages the issue lifecycle.

## Signature / Usage

### List all findings attached to one resource

Correlated Threats issues are viewed in the Security Command Center console. For scope identification (does the affected asset, for example a GKE cluster, show other signs?), the gcloud help lists all findings attached to a particular resource under organization `123456` this way. If no location is specified, the default is `global` and the request is routed to the SCC V1 API.

```bash
gcloud scc findings list 123456 \
    --filter="resource_name=\"//container.googleapis.com/projects/\
pid/zones/zone-id/clusters/cluster-id\""
```

## Options / Props

### Issue behavior

| Item | Value |
|---|---|
| Active period | An issue stays active for 14 days after the first threat finding unless you set its state to `INACTIVE`; this period cannot be changed. |
| Automatic inactivation | Set to `INACTIVE` automatically if the underlying resources (for example VMs or GKE nodes) are deleted. |
| Rule processing | Security Command Center processes Correlated Threats rules hourly. |
| Severity | Correlated Threats issues are `Critical`. |
| Priority marker | Shown as an Active threat. |

### Correlated Threats rules

| Rule | What it looks for |
|---|---|
| Multiple correlated threat signals of cryptocurrency mining software | Multiple distinct signals from Compute Engine VMs and GKE nodes (and Pods). Examples: VM Threat Detection finds a mining program and Event Threat Detection finds connections to mining IPs or domains from the same VM; Container Threat Detection finds a program using the mining stratum protocol and Event Threat Detection finds a connection to a mining IP from the same GKE node. |
| Multiple correlated threat signals of malicious software | Multiple distinct signals from Compute Engine VMs, GKE nodes (and Pods) or Agent Runtime. Examples: Container Threat Detection finds both a malicious binary and a malicious Python script in the same Pod; Event Threat Detection finds a VM connecting to a malware IP and VM Threat Detection finds malware on the same VM disk; Agent Platform Threat Detection finds a Malicious URL and a Reverse Shell from the same AI agent. |
| Potentially compromised GCP account lateral movement to compromised compute resource | Suspicious Compute Engine or GKE API calls that modify a VM or Pod, correlated within a short period with malicious activity from that resource; indicates the VM or Pod is likely compromised and the user or service account may be the cause. Examples: a user added an SSH key to an instance and VM Threat Detection finds a miner on it; a service account accessed an instance via the Compute Engine API from Tor and the instance connects to a malicious IP; a user created a privileged container and Container Threat Detection finds the container accessing sensitive files on the GKE node. |

### Investigating an issue

| Stage | What to do |
|---|---|
| Reception | The issue appears in Security Command Center marked as an Active threat; correlation of multiple signals indicates a true positive. |
| Deconstruction | Expand the issue to see the individual findings (time, processes, malicious IPs, detection source); a chronological view and an attack chain visualization map them to MITRE ATT&CK stages. |
| Scope identification | Check the affected asset, project or cluster context, identities involved (service account or user); issues are correlated by resource using unique identifiers. Verify whether other assets show similar signs. |
| Next actions | Use the How to fix views; contain the asset (for example isolate or shut down the affected GKE node) and follow recommendations such as blocking the known malicious IP at the firewall or VPC level. |

## Notes

- Source inconsistency kept as written: the Correlated Threats page lists Premium and Enterprise (Deprecated) tiers, while the investigate-threats page says Correlated Threats findings appear in the Enterprise (Deprecated) service tier.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.
- For viewing and remediating issues see Manage and remediate issues in the Security Command Center docs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/list (gcloud 593.0.0 help). The source page has no code.
- Source: https://docs.cloud.google.com/security-command-center/docs/correlated-threats-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-threats.md](./overview-threats.md)
- [how-to-investigate-threats.md](./how-to-investigate-threats.md)
- [concepts-vm-threat-detection-overview.md](./concepts-vm-threat-detection-overview.md)
- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
