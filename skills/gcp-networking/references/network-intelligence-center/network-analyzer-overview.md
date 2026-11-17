---
source: https://docs.cloud.google.com/network-intelligence-center/docs/network-analyzer/overview
---

# Network Analyzer overview

Network Analyzer automatically monitors VPC network configurations and detects misconfigurations and suboptimal configurations, with insights about topology, firewall rules, routes, configuration dependencies, and connectivity to services. It identifies failures, correlates them with recent configuration changes for root cause, and suggests resolutions.

## Signature / Usage

Insights are viewed in the Google Cloud console; the source page has no commands. Connectivity Tests, another Network Intelligence Center module, can show the details of a test with the command below.

```bash
gcloud network-management connectivity-tests describe my-test
```

## Options / Props

| Attribute | Values |
|---|---|
| Priority | Critical (service-impacting, large scope such as all VMs, global, multi-region); High (service-impacting, maybe not large scope); Medium (service impact or prevents proper usage); Low (predictive failure warnings or optimization such as cost / redundancy) |
| Insight type | Info; Warning (service degradation or lack of redundancy); Error (usability or performance already impacted) |
| Status | Active; Fixed (reported before, resolved at query time); Dismissed (by a user) |
| Other fields | Resource name, resource type, project, network insight (one-line description), first report time, insight details |

## Notes

- Insight groups: VPC network, Network services, Kubernetes engine, Hybrid connectivity, Managed services.
- Schedule: analyses trigger about ten minutes after a related configuration change and periodically at least once daily; analyses are batched.
- Shared VPC: in the host project, IP address utilization insights aggregate service project VMs and load balancers. Service project services (load balancer, GKE, Cloud SQL insights) are analyzed in the service project and include host network firewall rules and routes.
- Opt out: use the Transparency and Control Center to opt out of the Network Analyzer data processing group; this needs the Data Processing Controls Resource Admin role `roles/dataprocessing.admin`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests/describe (gcloud 593.0.0 help); Network Analyzer itself has no gcloud commands on the source page.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/network-analyzer/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
- [network-topology-overview.md](./network-topology-overview.md)
- [connectivity-tests-overview.md](./connectivity-tests-overview.md)
