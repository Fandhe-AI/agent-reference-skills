---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview
---

# Overview of Event Threat Detection

Event Threat Detection is a built-in service for the Security Command Center Premium tier (Premium and Enterprise (Deprecated) service tiers) that continuously monitors the Cloud Logging stream of your organization or projects and identifies threats in near-real time. The detection rules, sensitive roles and log requirements are on the other Event Threat Detection pages in this category.

## Signature / Usage

### View Event Threat Detection findings in Cloud Logging

In Logs Explorer, this query shows Event Threat Detection findings. It works only if you configured continuous exports to Cloud Logging, which requires activating Security Command Center Premium at the organization level.

```text
resource.type="threat_detector"
```

## Options / Props

### How findings are produced

| Item | Behavior |
|---|---|
| Inputs | Cloud Logging stream for your organization or projects (API calls and other actions that create, read or modify configuration or metadata). With Security Command Center Premium activated at the organization level, Event Threat Detection consumes logs for projects as they are created and can monitor Google Workspace logs (user sign-ins and Admin Console actions). |
| Detection techniques | Detection logic and proprietary threat intelligence: indicators of compromise (IoC), profiling over a sliding window of time, machine learning, anomaly detection. |
| Output | A finding written to Security Command Center. With organization-level Premium activation, findings can also be written to a Cloud Logging project, then exported with Pub/Sub and processed with Cloud Run functions. |
| Google SecOps | With organization-level Premium activation you can also use Google Security Operations to investigate some findings. |
| Access | Viewing and editing findings and logs is determined by the IAM roles you are granted. |

### Sensitive data enrichment (BigQuery and Cloud Storage resources)

| Change | Effect |
|---|---|
| Category change | If the resource has high or moderate sensitivity, the category changes to a specific one (for example `Initial Access: Leaked Service Account Key Used` becomes `Initial Access: Leaked Service Account Key Affecting Sensitive Data`). |
| Severity upgrade | If the default severity is lower than High (Low or Medium), severity is upgraded by one level (for example Medium to High). |

### Unsafe Google Group changes (organization-level activation only)

| Unsafe change | Detail |
|---|---|
| External members added to privileged groups | A privileged group is one granted sensitive roles or permissions. |
| Sensitive roles or permissions granted to groups with external members | Detected from Cloud Audit Logs plus the group's IAM roles. |
| Privileged groups changed to allow anyone in the general public to join | |

### Foundational log sources and network malware logs

| Case | Behavior |
|---|---|
| Event Threat Detection enabled without VPC Flow Logs | It analyzes an independent, duplicate, internal stream of VPC Flow Logs; to investigate a finding you must enable VPC Flow Logs and navigate to Logs Explorer and Flow Analyzer manually. Only future findings carry the links if you enable them later. |
| Enabled with VPC Flow Logs | It analyzes your VPC Flow Logs and provides links to Logs Explorer and Flow Analyzer. |
| Network malware detection | Scans any one of Cloud DNS logging, Cloud NAT logging, Firewall Rules Logging, VPC Flow Logs. You do not need more than one of Cloud NAT logging, Firewall Rules Logging or VPC Flow Logs. Cloud DNS logs are usually sufficient. |
| VPC Flow Logs cost | Can incur costs; recommended: aggregation interval 15 minutes, sample rate 5% to 10% (trade-off: recall versus cost). |

## Notes

- Sensitive data enrichment requires Sensitive Data Protection discovery scans enabled and configured to send results to Security Command Center.
- Unsafe Google Group changes are detected only when Security Command Center is activated at the organization level; Event Threat Detection cannot scan the Google Workspace logs with project-level activation.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after May 21, 2027.
- For detection rules that no custom module template covers, export log data to BigQuery and run your own SQL queries. Custom modules are described in the custom modules page in this category.
- For deprecated and shut down rules, see the Security Command Center Deprecations page.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-use-event-threat-detection (Logs Explorer query; the source tags the block `bash`, it is a Logging query and is tagged `text` here).
- The source page's rules table, sensitive-roles tables and log tables are split into separate pages in this category.
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [event-threat-detection-rules.md](./event-threat-detection-rules.md)
- [event-threat-detection-sensitive-roles.md](./event-threat-detection-sensitive-roles.md)
- [event-threat-detection-log-types.md](./event-threat-detection-log-types.md)
- [custom-modules-etd-overview.md](./custom-modules-etd-overview.md)
- [how-to-use-event-threat-detection.md](./how-to-use-event-threat-detection.md)
