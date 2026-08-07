# Firewall

Proxmox VE includes a built-in firewall that operates at three levels: datacenter, node/host, and VM/container. Configuration is stored in `/etc/pve/firewall/` and distributed via `pmxcfs`. Two implementations exist: the traditional iptables-based `pve-firewall` (default) and the newer nftables-based `proxmox-firewall` (tech preview, PVE 9+), which share the same configuration files/format.

## Signature / Usage

```bash
# Configuration files
/etc/pve/firewall/cluster.fw       # Datacenter-level rules
/etc/pve/nodes/<node>/host.fw      # Node/host-level rules
/etc/pve/firewall/<vmid>.fw        # VM/CT-level rules
```

```ini
# Example cluster.fw
[OPTIONS]
enable: 1
policy_in: DROP
policy_out: ACCEPT

[RULES]
IN ACCEPT -p tcp --dport 22 -source +management
IN DROP -source +blacklist
```

## Options / Props

### Configuration levels

| Level | Config file | Scope |
|-------|-------------|-------|
| Datacenter | `/etc/pve/firewall/cluster.fw` | Cluster-wide default rules |
| Node/host | `/etc/pve/nodes/<node>/host.fw` | Per-node overrides |
| VM/CT | `/etc/pve/firewall/<vmid>.fw` | Per-VM/CT interface rules |

### Traffic zones

| Zone | Description |
|------|-------------|
| `host` | Traffic to/from the PVE host itself |
| `vm` | Traffic to/from VMs and containers |
| `vnet` | Traffic through SDN virtual networks |

### Traffic directions

| Direction | Applies to |
|-----------|-----------|
| `IN` | Incoming traffic |
| `OUT` | Outgoing traffic |
| `FORWARD` | Forwarded traffic (host/VNet zones only) |

### Standard IP sets

| Set name | Description |
|----------|-------------|
| `management` | IPs allowed administrative access |
| `blacklist` | IPs denied across all firewall levels |
| `ipfilter-net<N>` | Anti-spoofing filter per VM network interface |

### Default auto-allowed traffic (when firewall is enabled)

- Loopback interface
- Established/related connections
- Corosync cluster traffic (UDP 5405–5412)
- Web UI (TCP 8006), SSH (TCP 22), SPICE (TCP 5900–5999), SPICE proxy (TCP 3128)

### proxmox-firewall (nftables, tech preview)

| Aspect | Detail |
|--------|--------|
| Install | `apt install proxmox-firewall` |
| Enable | Add `nftables: 1` under `[OPTIONS]` in `/etc/pve/nodes/<node>/host.fw`, or toggle in the web UI |
| Service | `systemctl start/stop/status proxmox-firewall` (replaces `pve-firewall`) |
| Config format | Identical to `pve-firewall`; no migration needed |

## Notes

- Each virtual network device has its own firewall enable flag; the firewall must be enabled at both the datacenter and VM level to take effect
- Security groups bundle reusable rule sets at the cluster level; reference them in VM rules using `GROUP <name>`
- IP sets group hosts/networks referenced in rules with `+setname` syntax
- IP aliases associate human-readable names with addresses for cleaner rule definitions
- `proxmox-firewall` (nftables-based) is a tech preview as of PVE 9: not suited for production, no `REJECT` for guest traffic (dropped instead), NDP/Router Advertisement/DHCP options always generate rules regardless of default policy, and no `fwbrX` bridges are created for Linux bridges. After enabling/disabling it, running VMs/CTs must be restarted

## Related

- [networking-sdn.md](./networking-sdn.md)
- [user-access.md](./user-access.md)
