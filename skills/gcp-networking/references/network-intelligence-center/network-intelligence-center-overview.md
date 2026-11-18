---
source: https://docs.cloud.google.com/network-intelligence-center/docs/overview
---

# Network Intelligence Center overview

Network Intelligence Center provides a single console for managing Google Cloud network visibility, monitoring, and troubleshooting. It is made up of the modules listed below.

## Signature / Usage

The source page has no commands. Connectivity Tests, one of the modules, is managed with the `gcloud network-management connectivity-tests` group.

```bash
gcloud network-management connectivity-tests list --limit=5
```

## Options / Props

| Module | Purpose | Notes |
|---|---|---|
| Cloud Network Insights | Network health and application performance across multicloud and hybrid environments, using active synthetic probing; offered in partnership with AppNeta by Broadcom | Probes run even when no user traffic is present |
| Network Services Monitoring | Communication paths and network metrics for GKE services and workloads that run in environments with ambient networking; Layer 4 telemetry (throughput, connection health) | Preview ("Pre-GA Offerings Terms"; pre-GA products are available "as is" and might have limited support). Links to Access logs, Application Monitoring, App Hub, Flow Analyzer, VPC Flow Logs |
| Flow Analyzer | Opinionated traffic analysis at 5-tuple granularity (source IP, destination IP, source port, destination port, protocol) without writing SQL against VPC Flow Logs | Built on Observability Analytics, powered by BigQuery; needs a project with a log bucket that contains VPC Flow Logs |
| Connectivity Tests | Diagnostics between network endpoints: configuration analysis plus, for some scenarios, live data plane analysis | Endpoint can be a VM, GKE cluster, load balancer forwarding rule, or an internet IP address |
| Performance Dashboard | Performance of the whole Google Cloud network and of your project's resources | Helps tell an application problem from an underlying network problem |
| Firewall Insights | Insights, recommendations and metrics on firewall rule usage; machine learning predicts future rule usage | Flags overly permissive rules |
| Network Analyzer | Continuously monitors VPC network configuration and detects misconfigurations and suboptimal configurations | Correlates failures with recent configuration changes and suggests fixes |
| Network Topology | Visualization of network infrastructure | Infrastructure view; GKE Enterprise view (GKE Enterprise enabled projects only) |

## Notes

- Network Services Monitoring is Preview; the other modules are described without a launch-stage label on this page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests/list (gcloud 593.0.0 help); the source page has no code.
- Cloud Network Insights: the source page does not state a launch stage, deprecation or retirement date for it; see cloud-network-insights-overview.md.
- Flow Analyzer reads VPC Flow Logs; see vpc-flow-logs.md. Generic Cloud Monitoring / Logging pages belong to the planned `gcp-observability` skill. VPC Service Controls (mentioned for Connectivity Tests) belongs to the `gcp-security` skill.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [connectivity-tests-overview.md](./connectivity-tests-overview.md)
- [network-topology-overview.md](./network-topology-overview.md)
- [performance-dashboard-overview.md](./performance-dashboard-overview.md)
- [firewall-insights-overview.md](./firewall-insights-overview.md)
- [network-analyzer-overview.md](./network-analyzer-overview.md)
- [flow-analyzer-overview.md](./flow-analyzer-overview.md)
- [cloud-network-insights-overview.md](./cloud-network-insights-overview.md)
- [vpc-flow-logs.md](./vpc-flow-logs.md)
