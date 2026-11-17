---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/topologies
---

# HA VPN topologies

Recommended HA VPN topologies and the availability SLA of each: to a peer VPN gateway, between VPC networks, to Compute Engine VM instances, and HA VPN over Cloud Interconnect. For Classic VPN topologies see the separate Classic VPN topologies page.

## Signature / Usage

### Inspect gateway and tunnel health

```bash
gcloud compute vpn-gateways get-status my-gateway \
  --region=us-central1
```

The full flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/get-status

## Options / Props

### Availability SLA by topology

| Topology | Description | Availability SLA |
|---|---|---|
| Connect Google Cloud to your peer VPN gateway | One HA VPN gateway to one or two peer VPN gateways | 99.99% |
| Connect VPC networks by using HA VPN gateways | Gateway in each network, both gateways in the same region (VPC networks may be in the same or different regions) | 99.99% |
| HA VPN gateways in different regions | Gateway in each network, gateways in different regions | 99.9% |
| HA VPN to Compute Engine VM instances in multiple zones | VMs with external IP addresses | 99.9% |
| HA VPN to a single Compute Engine VM instance | One VM with an external IP address | Determined by the SLA for a single VM instance of the memory-optimized machine family (Compute Engine SLA) |

### Peer gateway configurations and `REDUNDANCY_TYPE`

| Configuration | `REDUNDANCY_TYPE` |
|---|---|
| Two peer gateways, each with one external IP | `TWO_IPS_REDUNDANCY` |
| One peer gateway with two external IPs | `TWO_IPS_REDUNDANCY` |
| One peer gateway with one external IP | `SINGLE_IP_INTERNALLY_REDUNDANT` |

### Active-active vs active-passive routing

| Feature | Active-active | Active-passive |
|---|---|---|
| Throughput | Combined throughput of both tunnels | The source says that "after reducing from two active tunnels to one, the effective overall throughput is cut in half" (see the Source inconsistency line in Notes) |
| Route advertisement | Identical MED values per tunnel; routes imported with identical priorities; ECMP egress | Different MED values per tunnel; different priorities; egress uses the highest-priority route while its tunnel is up |
| Failover | Cloud Router withdraws learned routes of an unhealthy tunnel (for example DPD down) or of a down BGP session; withdrawal can take 40-60 seconds with packet loss | Same withdrawal behavior (40-60 seconds); only one tunnel is used at a time so the second can carry all egress if the first fails |

## Notes

- 99.99% requires at least one tunnel on each HA VPN gateway interface, matched interface to interface (HA VPN `interface 0` to peer `interface 0`, `interface 1` to `interface 1`). A single tunnel from one interface does not meet the SLA. A full mesh (two tunnels from each HA VPN interface to each of two peer interfaces) is not required on the Google Cloud side. With a single-interface peer, every tunnel goes to that interface.
- Configure two tunnels from the gateway and make sure the peer is also configured to receive the same SLA; connect all gateway interfaces to all peer interfaces to survive a tunnel failure.
- IPv6 traffic needs an `IPV6_ONLY` or `IPV4_IPV6` gateway and IPv6 enabled on the BGP sessions.
- Connecting VPC networks: gateways in different regions give only 99.9%; Google does not recommend different regions unless required, since VPC networks are global and gateways in one region can still connect resources in other regions. More than two VPC networks can be connected through a hub VPC network (transitive routing) using individual HA VPN connections.
- VM topology (99.9%): at least two tunnels from each gateway interface to each VM (for example tunnels 0 and 1 to `us-central1-vm-a` in `us-central1-a`, tunnels 2 and 3 to `us-central1-vm-b` in `us-central1-b`). The VMs act as third-party network virtual appliances and sit in a different VPC network from the gateway. Single VM: two tunnels (one per interface) to the VM.
- HA VPN over Cloud Interconnect carries IPsec-encrypted traffic over Dedicated or Partner Interconnect VLAN attachments; regional internal IP ranges can be reserved for the gateways and the peer can use internal IPs.
- Active-passive in full mesh: if Cloud Router receives the same prefix with different MED values through one interface it imports only the highest-priority route; inactive routes are not visible in the console or gcloud.
- Recommendation: single HA VPN gateway means active-passive (observed bandwidth is the same in normal operation and failover); multiple gateways means active-active (twice the bandwidth, but tunnels are effectively under-provisioned and traffic may drop on failover). Avoid active-passive with more than two tunnels: across multiple gateways the passive tunnels are not used until all active tunnels on all gateways have failed, which can cause bandwidth loss.
- The source diagrams are not reproduced here.
- Source inconsistency: the source table puts "after reducing from two active tunnels to one, the effective overall throughput is cut in half" in the Active-passive column, but the same table says active-passive "uses a maximum of one tunnel at a time so that the second tunnel is able to handle all your egress bandwidth", and the recommendation on the same page says active-passive bandwidth is the same in normal operation and failover. Halving on failover matches active-active, which uses the combined throughput of both tunnels; size failover capacity from the Failover row and the recommendation, not from the active-passive Throughput cell.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/get-status (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/topologies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [best-practices.md](./best-practices.md)
- [order-of-routes.md](./order-of-routes.md)
