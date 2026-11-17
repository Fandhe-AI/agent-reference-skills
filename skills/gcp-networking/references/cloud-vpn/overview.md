---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/overview
---

# Cloud VPN overview

Cloud VPN securely extends a peer network to a Virtual Private Cloud (VPC) network through an IPsec VPN connection. Traffic between the networks is encrypted by one VPN gateway and decrypted by the other. You can also connect two VPC networks by connecting two Cloud VPN instances. Cloud VPN cannot route traffic to the public internet; it is for secure communication between private networks. Google Cloud offers two gateway types: HA VPN and Classic VPN.

## Signature / Usage

### Create an HA VPN gateway

```bash
gcloud compute vpn-gateways create my-vpn-gateway \
  --region=us-central1 --network=default
```

The full flag list for `gcloud compute vpn-gateways` is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/create

## Options / Props

### HA VPN vs Classic VPN

| Feature | HA VPN | Classic VPN |
|---|---|---|
| SLA | 99.99% for most topologies, with a few exceptions (see HA VPN topologies) | 99.9% |
| External IP addresses and forwarding rules | External IP addresses created from a pool; no forwarding rules required | External IP addresses and forwarding rules must be created |
| Routing options | Only dynamic routing (BGP) | Only static (policy-based, route-based) routing |
| Two tunnels from one gateway to the same peer gateway | Supported | Not supported |
| Gateway to Compute Engine VMs with external IP addresses | Supported and recommended topology | Supported |
| API resource | `vpn-gateway` | `target-vpn-gateway` |
| IPv6 traffic | Dual stack (IPv4 and IPv6) and IPv6-only | Not supported |

### HA VPN stack types

| Stack type | Supported BGP sessions | Allowed gateway external IP addresses |
|---|---|---|
| `IPV4_ONLY` (default) | IPv4 BGP, no MP-BGP | IPv4 |
| `IPV6_ONLY` | IPv6 BGP, no MP-BGP | IPv6 |
| `IPV4_IPV6` (dual stack) | IPv4 BGP with or without MP-BGP; IPv6 BGP with or without MP-BGP; both IPv4 BGP and IPv6 BGP, no MP-BGP | IPv4 or IPv6 (chosen with `--gateway-ip-version`) |

### Specifications and limits

| Item | Value |
|---|---|
| Gateway scope | Regional resource; choose a region, not a zone |
| Connectivity | Site-to-site IPsec only; no client-to-gateway ("dial-in") and no SSL VPN |
| Traffic allowed to gateway external IPs | Only ESP, UDP 500 and UDP 4500 |
| Peer gateway IP | Static external (internet-routable) address matching the stack type; reserved ranges (RFC 5737, RFC 5735, RFC 3849, RFC 6890) cannot be used |
| Replay detection | Window of 4096 packets; cannot be turned off |
| Bandwidth per tunnel | Up to 250,000 packets per second (ingress plus egress), roughly 1 Gbps to 3 Gbps depending on average packet size (3 Gbps = 375 MBps) |
| IKE | IKEv1 and IKEv2, pre-shared key authentication only; ESP in tunnel mode with authentication (no AH, no ESP transport mode); IKEv2 required for IPv6 |
| Ciphers | Configurable only with IKEv2; cannot be modified after tunnel creation (delete and re-create) |
| Dead peer detection | Supported (RFC 3706); interval not configurable |
| GRE | Supported (tested only with GRE version 0); a firewall rule must allow GRE; no Google Cloud support for troubleshooting overlay networks |
| MTU | Peer must support prefragmentation (fragment before encapsulation) |
| MP-BGP next hops (manual) | From `2600:2d00:0:2::/63` or `169.254.0.0/16`; unique across all Cloud Routers in the VPC network |
| Org policy | `constraints/compute.disableHybridCloudIpv6` blocks IPv6 HA VPN gateways, IPv6 BGP sessions and dual-stack Dedicated Interconnect VLAN attachments |

## Notes

- HA VPN vs Classic VPN: The tunnel API resource and tunnel configuration are the same for both types.
- HA VPN stack types: The stack type sets which IP protocols the gateway and its tunnels carry (`--stack-type`, default `IPV4_ONLY`). The IP version of the gateway interfaces' own external addresses is a separate setting (`--gateway-ip-version`, `IPV4` or `IPV6`; IPv4 when omitted). The third column lists the external IP address versions the source allows for each stack type, not addresses that the gateway gets automatically.
- HA VPN gateways automatically get two external IP addresses (one per interface) from unique address pools; each interface supports multiple tunnels. A gateway with only one active interface and one external IP address gets no availability SLA. Deleting the gateway releases the addresses.
- HA VPN to HA VPN: both gateways must use identical stack types (for example both `IPV4_IPV6`). The stack type cannot be changed after creation; delete and re-create the gateway. To pause IPv6 temporarily, disable IPv6 route exchange on the IPv4 BGP session or disable the IPv6 session.
- Peer tunnel layout: two peer devices means each interface tunnels to its own peer; one two-interface peer means each interface tunnels to its own peer interface; one single-interface peer means all tunnels go to that interface. Cloud Router must advertise the same prefixes on all links (priorities may differ). The peer device must support BGP.
- HA VPN over Cloud Interconnect can assign regional internal IP addresses to gateway interfaces; this is supported only for gateways associated with VLAN attachments.
- Cipher rules: AEAD ciphers need no separate integrity cipher; non-AEAD ciphers may add integrity ciphers (defaults apply otherwise); when mixing, list AEAD ciphers first.
- Traffic that stays inside the Google Cloud network: HA VPN to HA VPN, Classic VPN to Classic VPN, and gateway to the external IP of a Compute Engine VM acting as a VPN gateway.
- Cloud VPN works with VPC networks and legacy networks; custom mode VPC networks are recommended. Overlapping on-premises and subnet ranges are resolved per the order-of-routes page.
- With Network Connectivity Center you can use HA VPN tunnels as a data transfer network between on-premises sites (attach a tunnel pair to a spoke, connect spokes to a hub); review Section 2 of the Google Cloud General Service Terms first.
- Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) can restrict peer IP addresses for all tunnels in a project, folder or organization.
- Maintenance can happen at any time without notice; tunnels normally stay online, and rarely drop briefly and re-establish automatically.
- Classic VPN: single interface, single external IP, static routing only, 99.9% SLA, no IPv6. See [classic-vpn-deprecation.md](./classic-vpn-deprecation.md) for the BGP deprecation.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/create (gcloud 593.0.0 help).
- Clarified from the official docs: the source tables list "Supported gateway external IP addresses" per stack type ("IPv4, IPv6" for `IPV4_IPV6`). The gcloud 593.0.0 help for `gcloud compute vpn-gateways create` describes `--stack-type` as "The stack type of the protocol(s) enabled on this VPN gateway" and `--gateway-ip-version` as "IP version of the HA VPN gateway. You must specify either IPv4 or IPv6. If you do not specify this field, every HA VPN gateway interface will be configured with an IPv4 address", so a dual-stack gateway still has IPv4 interface addresses unless `--gateway-ip-version=IPV6` is set.
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [topologies.md](./topologies.md)
- [choosing-networks-routing.md](./choosing-networks-routing.md)
- [supported-ike-ciphers.md](./supported-ike-ciphers.md)
- [best-practices.md](./best-practices.md)
- [quotas.md](./quotas.md)
- [classic-vpn-deprecation.md](./classic-vpn-deprecation.md)
