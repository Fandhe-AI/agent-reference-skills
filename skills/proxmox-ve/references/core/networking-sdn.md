# Networking & SDN

Proxmox VE uses the Linux network stack configured via `/etc/network/interfaces`. The Software-Defined Networking (SDN) layer adds virtual zones and VNets for fine-grained multi-node guest network control.

## Signature / Usage

```bash
# Apply network config live (requires ifupdown2)
ifreload -a

# Example /etc/network/interfaces — bridge with VLAN
auto vmbr0
iface vmbr0 inet static
    address 192.168.1.10/24
    gateway 192.168.1.1
    bridge-ports eno1
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes

# Example bond configuration
auto bond0
iface bond0 inet manual
    bond-slaves eno1 eno2
    bond-mode active-backup
    bond-miimon 100
```

## Options / Props

### Traditional networking

| Interface type | Naming | Description |
|---------------|--------|-------------|
| Physical | `eno1`, `enp3s0` | Physical NIC (systemd naming) |
| Bridge | `vmbrX` (0–4094) | Virtual switch for guests |
| Bond | `bondN` | NIC teaming / aggregation |
| VLAN | `eno1.50` | Tagged VLAN sub-interface |

### SDN zone types

| Zone type | Description |
|-----------|-------------|
| `simple` | Isolated bridge, local VMs on a single node |
| `vlan` | VLAN tagging on an existing bridge, multi-node |
| `qinq` | Stacked VLAN (802.1ad) for additional isolation |
| `vxlan` | Layer 2 over UDP tunnel across nodes |
| `evpn` | Routable Layer 3 with BGP/FRRouting |

### SDN VNet options

| Option | Description |
|--------|-------------|
| ID | Up to 8 characters |
| Zone | Associated zone |
| Tag | Unique VLAN/VXLAN ID |
| VLAN Aware | Allow guest-level VLAN tagging |
| Isolate Ports | Restrict guest-to-guest traffic on same bridge |

### SDN subnet options

| Option | Description |
|--------|-------------|
| CIDR | IP range (e.g. `10.0.1.0/24`) |
| Gateway | Default gateway for Layer 3 zones |
| SNAT | Enable Source NAT for external connectivity |
| IPAM | Auto-assign IPs from pool |
| DNS | Register subnet in DNS |

## Notes

- Network changes are staged in `/etc/network/interfaces.new`; apply with "Apply Configuration" in the web UI or `ifreload -a` (requires `ifupdown2`)
- SDN core packages are installed by default in PVE 8.1+; advanced features require `dnsmasq` (DHCP), `frr` (BGP/EVPN), and `ifupdown2`
- Use a dedicated physical NIC for Corosync cluster traffic separate from VM traffic
- VNets become standard Linux bridges on each node after SDN configuration is applied

## Related

- [cluster.md](./cluster.md)
- [vm-qemu.md](./vm-qemu.md)
- [container-lxc.md](./container-lxc.md)
- [firewall.md](./firewall.md)
