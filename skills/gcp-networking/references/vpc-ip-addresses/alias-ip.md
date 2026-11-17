---
source: https://docs.cloud.google.com/vpc/docs/alias-ip
---

# Alias IP ranges

Alias IP ranges assign ranges of internal IP addresses as aliases to a VM network interface, so that multiple services or containers on one VM can each have their own address. They also work with GKE Pods (see the `gcp-gke` skill).

## Signature / Usage

### Subnet with a secondary range, VMs with alias ranges

```bash
gcloud compute networks subnets create subnet-a \
    --network network-a \
    --range 10.128.0.0/16 \
    --secondary-range container-range=172.16.0.0/20
```

Adapted (not in the official docs): replaced the source's `[...]` elision with `--zone=ZONE`, because `[...]` is a shell glob and the command is not runnable with it.

```bash
gcloud compute instances create vm1 \
    --zone=ZONE \
    --network-interface subnet=subnet-a,aliases=container-range:172.16.0.0/24
```

### Several alias ranges on one VM

```bash
gcloud compute networks create vpc1 --subnet-mode custom
```

```bash
gcloud compute networks subnets create subnet1 --region us-central1 --network vpc1 --range 10.128.0.0/16 --secondary-range secondaryrange1=172.16.0.0/20
```

```bash
gcloud compute instances create vm1 --zone us-central1-a --network-interface "subnet=subnet1,aliases=secondaryrange1:172.16.0.0/27;secondaryrange1:172.16.1.0/32"
```

### RoCE VPC networks: IPVLAN L2 with a namespace

Adapted (not in the official docs): removed the source comment "L3 mode handles packets at the network layer; no MAC address or ARP is used." because the command that follows creates the interface with `mode l2`.

```bash
# 1. Create a network namespace named 'example_ns'
sudo ip netns add example_ns

# 2. Create the ipvlan interface 'gpu0rdma0_ipvlanl2' linked to 'gpu0rdma0' in L2 mode
sudo ip link add gpu0rdma0_ipvlanl2 link gpu0rdma0 type ipvlan mode l2

# 3. Move the 'gpu0rdma0_ipvlanl2' interface into 'example_ns'
sudo ip link set gpu0rdma0_ipvlanl2 netns example_ns

# 4. Bring up the loopback interface inside the namespace for local process communication
sudo ip netns exec example_ns ip link set lo up

# 5. Assign the IP address to the custom interface
# Using a /32 is common in L2 mode as it acts as a point-to-point endpoint.
sudo ip netns exec example_ns ip addr add 172.16.1.0/32 dev gpu0rdma0_ipvlanl2

# 6. Set the interface state to 'up' inside the namespace
sudo ip netns exec example_ns ip link set gpu0rdma0_ipvlanl2 up

# 7. Verification: Check the interface configuration inside the namespace
sudo ip netns exec example_ns ip addr show gpu0rdma0_ipvlanl2
```

## Options / Props

### Key properties

| Property |
|----------|
| The primary IP and default gateway are typically allocated by DHCP; alias IPs are configured in the guest OS manually or by script. |
| The primary IP and the alias range of an interface must come from the same subnet resource. Primary IP from the primary range; alias range from the primary range or a secondary range of that subnet. |
| The primary IP can be static or ephemeral internal. Alias ranges are optional and not added automatically; configure at instance creation or modification. |
| An alias range can be an explicit CIDR (`10.128.1.0/24`), a single address (`10.128.7.29/32`), or a netmask (`/24`) for auto-allocation. Use `/32` for a single IP. |
| All alias IPs on an interface share the default gateway of the primary IP. |
| You cannot reserve an internal IP from a secondary subnet range; you can reserve one from a primary range and use it as a `/32` alias range. |

### Interactions

| Area | Behavior |
|------|----------|
| Routes | Google Cloud installs VPC routes for primary and alias ranges of the primary interface's subnet; no extra routes or route quota per alias. Cloud Router can advertise alias ranges to on-premises over VPN or Interconnect. |
| Anti-spoofing | With alias IPs, traffic leaving a VM must use VM or pod IPs as source; static-route container networking would need IP forwarding (anti-spoofing disabled). |
| DNS | Internal DNS covers only the primary IP of the primary interface; alias IPs and secondary-interface IPs are not associated with the host name (configure DNS manually). |
| Firewall | Alias traffic is evaluated by VPC firewall rules matching target tag or target service account. Alias ranges are not included when sources are specified by source tags or source service accounts. |
| Static routes | A route whose next hop is an address inside an alias range is not programmed; the next hop is considered down. Only primary internal IPv4 addresses of a NIC in the route's own network are programmed. |
| VPC Network Peering | Primary and secondary ranges are reachable from the peer; overlap checks cover both. |
| Auto mode networks | Auto subnets have a primary range and no secondary range; add a secondary range or create a new subnet that does not overlap `10.128.0.0/9`. |
| RoCE (MRDMA vNICs) | Alias ranges only in RoCE VPC networks for VM instances (`roce` profile), not bare metal (`roce-metal`); a RoCE network has a connection limit; IPVLAN L2 is recommended for RDMA. |

## Notes

- Secondary ranges are an organizational tool; alias ranges do not require them. Allocating from a secondary range lets you apply separate firewall rules to alias IPs vs. the VM primary IP and advertise only the container range over VPN.
- Adapted from the official docs: the first `vm1` command reads `gcloud compute instances create vm1 [...] \` in the source, where `[...]` stands for the omitted instance options; `--zone=ZONE` replaces it (Replace `ZONE` with the zone of the subnet's region).
- The source also includes diagrams and a container-over-VPN walkthrough with two firewall rules (deny on-premises traffic to the primary range, allow to the secondary range).
- The `ip`/`sudo` commands change guest networking; run them on a test VM.
- Commands for configuring alias ranges are on the official page "Configure alias IP addresses and ranges" (https://docs.cloud.google.com/vpc/docs/configure-alias-ip-ranges). The full gcloud flag list is in the `gcp-compute` skill.
- Corrected from the official docs: the source comment above `ip link add ... type ipvlan mode l2` describes L3 mode; it is removed because the command uses L2 mode.
- Source: https://docs.cloud.google.com/vpc/docs/alias-ip (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [reserve-static-internal-ip-address.md](./reserve-static-internal-ip-address.md)
- [ip-addresses.md](./ip-addresses.md)
