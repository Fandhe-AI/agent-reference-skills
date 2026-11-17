---
source: https://docs.cloud.google.com/vpc/docs/mtu
---

# Maximum transmission unit

The MTU is the size in bytes of the largest IP packet (IP headers, Layer 4 headers and data) that fits in an Ethernet frame. VPC networks use a default MTU of 1,460 bytes and accept any value from 1,300 to 8,896 bytes inclusive. Common custom values are 1,500 (standard Ethernet) and 8,896 (maximum).

## Signature / Usage

Borrowed gcloud command for viewing a network; its output includes the network's `mtu` setting:

```bash
gcloud compute networks describe network-name
```

## Options / Props

### Packet handling by destination

| Destination / situation | Behavior |
|---|---|
| Between instances in the same or peered VPC networks | Packets up to the MTU are delivered if both networks have identical MTUs and both NICs use the network MTU. Using one MTU across connected networks is recommended but not forced. |
| Outside the VPC network (internet, external IPs): TCP SYN / SYN-ACK | MSS clamping if necessary. |
| Outside the VPC network: IP packet 1,300 to 1,600 bytes inclusive | No change (except SYN / SYN-ACK). |
| Outside the VPC network: IP packet over 1,600 bytes | Dropped; Fragmentation Needed (ICMP over IPv4) or Packet Too Big (ICMPv6) is sent whether the DF bit is on or off. |
| Google APIs and services (via Google Front Ends with fixed, non-configurable MTUs, always TCP) | Any valid VPC MTU works; segment size negotiated by TCP MSS advertisement. Also applies to Private Google Access, Private Service Connect for Google APIs and Private Google Access for on-premises hosts. |
| Cloud VPN | Has a gateway MTU (encapsulated) and a payload MTU; see the Cloud VPN MTU considerations page. |
| Cloud Interconnect VLAN attachments | Use the same MTU for all attachments on a network and set the network MTU to the same value. |
| Firewall endpoints (Cloud NGFW) | If the network MTU exceeds the packet size the firewall endpoint supports, Layer 7 inspection can't succeed. |

### Jumbo frame support (payload over 1,460 bytes)

| Product or feature | Support |
|---|---|
| Compute Engine | Yes |
| Cloud Interconnect | Yes |
| Firewall endpoints | Yes |
| Cloud VPN | No |
| Google APIs | No |

### Compute instance NIC MTU

| Instance type | Behavior |
|---|---|
| Linux, public OS image | NIC MTU set automatically to the network MTU by DHCP Option 26. |
| Windows, public OS image | Fixed 1,460 bytes by default; after changing the network MTU you must change the Windows instance MTU. |
| Custom guest OS image | Configure NIC MTU, or verify the OS accepts the network MTU via DHCP Option 26. |
| Multiple network interfaces | Set each NIC MTU to its network's MTU. |

### GKE Pod interface MTU (Autopilot always inherits the VPC MTU)

| CNI | MTU | GKE Standard |
|---|---|---|
| kubenet | 1460 | Default |
| kubenet (GKE 1.26.1 and later) | Inherited | Default |
| Calico | 1460 | Enabled by `--enable-network-policy` |
| netd | Inherited | Intranode visibility, Workload Identity Federation for GKE, or IPv4/IPv6 dual-stack networking |
| GKE Dataplane V2 | Inherited | `--enable-dataplane-v2` |

### Mismatched MTUs

| Mismatched MTUs |
|---|
| TCP handles mismatches itself: each side's effective MSS is the minimum of the MSS in the peer's SYN / SYN-ACK and its own NIC MTU minus 40 bytes (20 IP + 20 TCP header). |
| Google Cloud uses MSS clamping toward destinations outside the VPC network, and Cloud VPN tunnels and VLAN attachments also clamp. It does not clamp within a VPC network. |
| Non-TCP (for example UDP): the sender must fit its NIC MTU, the receiver's MTU and all networks in between. Google Cloud does not fragment packets routed by next hops within a VPC network; too-large packets are dropped, with Fragmentation Needed / Packet Too Big if DF is set. It also sends that message even without DF when the network MTU is under 1,600 and the packet exceeds 1,600 bytes, or the network MTU is 1,600 or more and the packet exceeds the network MTU. |
| PMTUD requirements: allow ICMP (IPv4) / ICMPv6 ingress in VPC firewall rules or firewall policies from sources matching original packet destinations (allowing ICMP and ICMPv6 from all sources simplifies this); internal passthrough NLB and internal protocol forwarding rules must use the `L3_DEFAULT` protocol. |

## Notes

- Packet handling by destination: Internal IPv4 destinations (subnet primary/secondary ranges, alias IP ranges, internal forwarding rules) and internal IPv6 ranges count as instance-to-instance traffic. External IPv4 addresses of NICs, external passthrough NLBs and protocol forwarding are treated as outside the network; external IPv6 is in-network only when routed via subnet or peering subnet routes (not a default internet gateway next hop).
- Packet handling by destination: Google APIs special addresses: IPv4 `199.36.153.4/30` (restricted.googleapis.com), `199.36.153.8/30` (private.googleapis.com); IPv6 `2600:2d00:0002:1000::/56` (restricted) and `2600:2d00:0002:2000::/56` (private).
- Compute instance NIC MTU: If a NIC MTU must differ, set it to a value less than the network MTU.
- Before changing a VPC network's MTU you must first stop each compute instance; rebooting from within the guest OS does not update its MTU. Changing MTU can break connectivity; try on a disposable network first.
- A network created with a Google Cloud network profile can have a different default MTU (see [network-profiles.md](./network-profiles.md)).
- The source has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/describe (gcloud 593.0.0 help); the Compute Engine `Network` resource has an `mtu` field (1300 to 8896 bytes, default 1460), so the output shows the current setting. Setting it (`--mtu`) is covered by the `gcloud compute networks create` / `update` flags in the `gcp-compute` skill; the source page links to the Change the MTU setting of a VPC network guide.
- Source: https://docs.cloud.google.com/vpc/docs/mtu (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc.md](./vpc.md)
- [network-profiles.md](./network-profiles.md)
- [quota.md](./quota.md)
