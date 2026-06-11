# High Availability (HA)

Proxmox VE HA manager automatically restarts or migrates VMs and containers when a cluster node fails. It uses watchdog-based fencing to prevent split-brain scenarios.

## Signature / Usage

```bash
# Add a VM to HA management
ha-manager add vm:<vmid> --state started --max_restart 2 --max_relocate 1

# Add a container to HA
ha-manager add ct:<ctid> --state started

# List HA resources
ha-manager status

# Remove from HA
ha-manager remove vm:<vmid>
```

## Options / Props

### ha-manager resource options

| Option | Default | Description |
|--------|---------|-------------|
| `--state` | `started` | Desired state: `started`, `stopped`, `disabled`, `ignored` |
| `--max_restart` | 1 | Restart attempts on the same node before relocating |
| `--max_relocate` | 1 | Relocation attempts to other nodes before giving up |
| `--group` | — | HA group name for node affinity (deprecated since v9.0) |

### Node Affinity Rules (v9.0+, replaces HA Groups)

| Property | Description |
|----------|-------------|
| Nodes | List of preferred/allowed nodes |
| Priority | Higher priority = preferred failover target |
| Strict | If true, resource only runs on listed nodes |

### Resource Affinity Rules

| Type | Behavior |
|------|----------|
| Positive affinity | Keep resources together on the same node |
| Negative affinity | Spread resources across separate nodes |

### Watchdog modes

| Mode | Description |
|------|-------------|
| Hardware watchdog | Independent circuit; preferred for reliable fencing |
| `softdog` | Linux kernel fallback; less reliable |

### Watchdog states

| State | Description |
|-------|-------------|
| Armed | Active HA, watchdog open, auto-failover enabled |
| Standby | Ready but no active CRM master |
| Disarmed | No auto-failover (e.g., during maintenance) |

## Notes

- HA requires a minimum of 3 cluster nodes for reliable quorum
- Two daemons cooperate: `pve-ha-lrm` (Local Resource Manager, per node) and `pve-ha-crm` (Cluster Resource Manager, elected master)
- Fencing is mandatory — without reliable fencing, HA cannot safely restart services from a failed node
- HA Groups are deprecated since PVE 9.0; use Node Affinity Rules instead
- `pmxcfs` locking ensures only one LRM and one CRM master run at any time

## Related

- [cluster.md](./cluster.md)
- [vm-qemu.md](./vm-qemu.md)
- [container-lxc.md](./container-lxc.md)
