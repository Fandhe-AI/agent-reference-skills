---
source: https://docs.cloud.google.com/vpc/docs/flow-logs
---

# VPC Flow Logs

VPC Flow Logs samples packets in your VPC network to generate flow logs aggregated by IP connection (5-tuple). It samples packets sent and received by VM instances (including GKE nodes), by Cloud Run or App Engine resources configured with Direct VPC egress, and packets sent through VLAN attachments for Cloud Interconnect and Cloud VPN tunnels. Logs go to Cloud Logging and can be exported to any destination Cloud Logging export supports.

## Signature / Usage

### Create a configuration for a VPC network (Network Management API)

```bash
gcloud network-management vpc-flow-logs-configs create my-config \
    --location=global \
    --network="projects/{project_id}/global/networks/{network_id}"
```

### Show effective configurations

```bash
gcloud network-management vpc-flow-logs-configs \
    show-effective-flow-logs-configs --location=global \
    --resource="projects/my-project/global/networks/my-network"
```

## Options / Props

| Configuration scope | Generates flow logs for |
|---|---|
| Organization | All VM instances and Cloud Run / App Engine resources in all subnets, all VLAN attachments, and all Cloud VPN tunnels in the organization |
| VPC network | All VM instances and Cloud Run / App Engine resources in all subnets, all VLAN attachments, and all Cloud VPN tunnels in the network |
| Subnet | All VM instances and Cloud Run / App Engine resources in the subnet (Network Management API is recommended; Compute Engine API also available) |
| VLAN attachment | A specific VLAN attachment |
| Cloud VPN tunnel | A specific Cloud VPN tunnel |

| Parameter | Values and defaults |
|---|---|
| Aggregation interval | 5 seconds (default), 30 seconds, 1 minute, 5 minutes, 10 minutes, 15 minutes |
| Secondary sampling rate (Compute Engine API configurations) | Default 50% kept; settable from `1.0` (100%) to `0.0` (0%) |
| Secondary sampling rate (Network Management API configurations) | Default 100% kept; settable from `1.0` to greater than `0.0` |
| Metadata annotations | On by default; can be turned off or limited to chosen fields |
| Filtering | Default: every sampled flow is logged; filters can limit logs |
| Log retention in Logging | 30 days by default; set a custom retention period or export |
| TCP connection logging | Optional; up to 100 connections per vCPU per second (maximum 800 per second per VM); excess might not be logged |

Processing order: filtering, aggregation, secondary flow log sampling, metadata, write to Logging. The primary sampling rate is dynamic and cannot be controlled.

## Notes

- TCP connection logging (configurable for a subnet through the Network Management API, a VPC network, or an organization) captures the outbound initial `SYN` (reporter `SRC`, direction `EGRESS`) and the inbound `SYN-ACK` (reporter `DEST`, direction `INGRESS`); identify these with the `connection_direction` field. VPC Flow Logs also generates separate records for dropped traffic.
- Specifications: no delay or performance penalty; VPC networks only (not legacy networks); samples TCP, UDP, ICMP, ESP, GRE, and RDMA flows (for RoCE only outbound flows). Egress packets are sampled before egress firewall rules (denied egress packets can be logged); ingress packets are sampled after ingress firewall rules (denied ingress packets are not).
- For VMs with multiple network interfaces, enable flow logs for each subnet with an interface. To log flows between Pods on the same GKE node, enable intranode visibility. Not supported for subnets with purpose `INTERNAL_HTTPS_LOAD_BALANCER` (proxy-only subnets).
- Logs are written to the project of the reporting VPC network (host project for Shared VPC). Billing goes to the project containing the reporting resource; with organization-level enablement each project is billed separately. Pricing: see https://cloud.google.com/vpc/pricing#network-telemetry.
- Enabling flow logs increases Cloud Logging volume and cost; changing or deleting configurations affects log collection, so try changes on a disposable network first. To analyze all packets, use Packet Mirroring.
- The `{...}` values in the gcloud examples are placeholders to replace. Other targets use `--subnet`, `--interconnect-attachment`, `--vpn-tunnel` or `--organization` instead of `--network`; see the gcloud reference. The source also shows Console and API forms.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/vpc-flow-logs-configs/create and https://docs.cloud.google.com/sdk/gcloud/reference/network-management/vpc-flow-logs-configs/show-effective-flow-logs-configs (gcloud 593.0.0 help); the source page has no code. The `gcloud compute networks subnets update --enable-flow-logs` flag is in the `gcp-compute` skill.
- Clarified from the official docs: the source names only the purpose `INTERNAL_HTTPS_LOAD_BALANCER` for subnets that cannot use VPC Flow Logs. The Compute Engine API (`Subnetwork.purpose`) marks it as a legacy purpose ("please use REGIONAL_MANAGED_PROXY instead"); the current proxy-only purposes are `GLOBAL_MANAGED_PROXY` and `REGIONAL_MANAGED_PROXY` (VPC subnets page, https://docs.cloud.google.com/vpc/docs/subnets, retrieved 2026-11-17). The source does not state flow log support for those purposes separately.
- Source: https://docs.cloud.google.com/vpc/docs/flow-logs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [flow-analyzer-overview.md](./flow-analyzer-overview.md)
- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
