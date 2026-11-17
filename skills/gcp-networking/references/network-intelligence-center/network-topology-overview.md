---
source: https://docs.cloud.google.com/network-intelligence-center/docs/network-topology/concepts/overview
---

# Network Topology overview

Network Topology is a visualization tool that shows the topology of your network infrastructure as a graph where nodes are entities and lines are connections. The Infrastructure view shows VPC networks, hybrid connectivity, connectivity to Google-managed services, and metrics. The GKE Enterprise view (GKE Enterprise enabled projects only) shows clusters, namespaces, workloads, and pods. It combines configuration with real-time operational data and needs no additional configuration or agents.

## Signature / Usage

Network Topology is used through the Google Cloud console; the source page has no commands. Connectivity Tests, another Network Intelligence Center module, can list its tests with the command below.

```bash
gcloud network-management connectivity-tests list --limit=5
```

## Options / Props

### Base entities and aggregation hierarchy (Infrastructure view)

| Base entity | Aggregation hierarchy (top to bottom) |
|---|---|
| VM instance | region > network > subnet > zone > instance group > instance |
| VM instance group | region > network > subnet > zone > instance group |
| Classic Application Load Balancer, external passthrough NLB, external proxy NLB | external load balancing > load balancer |
| Internal load balancer | internal load balancing > load balancer |
| Cloud NAT gateway | region > network > NATs > NAT gateway |
| VPC Network Peering | peer networks > network (peer endpoint shown when you lack permission to view the peer network) |
| Country (external clients) | business region (Americas, APAC, EMEA) > country |
| Cloud Interconnect | interconnect |
| VLAN attachments | interconnect > interconnect attachments |
| Cloud VPN gateway | gateway |
| Cloud VPN | gateway > vpn tunnel |
| On-premises | on-premises |
| Router appliance instances | (no hierarchy listed) |
| Google-managed services | Google services > Google service |

GKE Enterprise view: GKE Pod = region > network > subnet > zone > GKE cluster > GKE namespace > GKE workload > GKE pod; workload, namespace and cluster are the same path truncated at that level.

### Data freshness

| Component | Data period | Availability |
|---|---|---|
| Entities and connections | Previous hour (hourly snapshots) | Immediately after each hour; graph can change up to 20 minutes after the hour ends |
| Overlaid metrics | Selected hour (traffic and packet loss use the average, latency uses the median) | As entities and connections become available |
| Time series charts | Real time, default last hour per minute; timeframes `1 hour` to `6 weeks` | At most 7 minutes after an activity |

## Notes

- History is six weeks. Entities and connections appear only if they communicated in the selected period.
- If the graph is too large for the browser it is truncated (some nodes and connections may be missing); metrics are not sampled or truncated. Remove projects from the metrics scope or show only the current project.
- Traffic types: TCP, UDP, ICMP, ICMPV6, ESP and GRE on certain paths. Only the first network interface (`nic0`) of a VM is visualized. VMs communicating by external IPs are shown as traffic to/from the other VM's country, not a direct connection.
- Google-managed services are supported through the `default-internet-gateway` default route or Private Google Access; external internet traffic, direct Google access, and Private Google Access from on-premises hosts are not supported. App Engine Memcache, Filestore, Memorystore, Cloud SQL, and partner/marketplace solutions are not shown.
- Metrics: hourly throughput, packet loss (within Google Cloud regions and zones), median latency (RTT). Insights rank high egress instances and instance groups (GKE Enterprise view: high egress GKE workloads); filters are all egress, cross-zonal egress, egress to internet, and hybrid egress. The high egress and network verdict outlier tables can be downloaded as CSV. Dual-stack Pod IPv6 addresses are not shown.
- Multiple projects: configure a Cloud Monitoring metrics scope; project aggregation groups entities by project (external clients are excluded).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests/list (gcloud 593.0.0 help); Network Topology itself has no gcloud commands. Cloud Monitoring in general belongs to the planned `gcp-observability` skill.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/network-topology/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
- [performance-dashboard-overview.md](./performance-dashboard-overview.md)
- [network-analyzer-overview.md](./network-analyzer-overview.md)
