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
| `--failback` | 1 | Automatically migrate the resource to the highest-priority node (per node affinity rules) when a higher-priority node comes online |
| `--auto-rebalance` | 1 | Resource may be migrated during automatic rebalancing by the CRS load balancer |

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
| Disarmed | No auto-failover (e.g., during maintenance); entered via `ha-manager crm-command disarm-ha <freeze\|ignore>` (resource mode chosen at disarm time) |

### CRS scheduling modes

Set in Datacenter -> Options -> Cluster Resource Scheduling (`crs: ha=...` in `datacenter.cfg`); default `basic`; takes effect from the next HA Manager round (about 10 seconds).

| Mode | Usage information used to pick a node |
|------|----------------------------------------|
| `basic` | Number of active guests on each node |
| `static` (static-load) | Configured CPU and memory quotas of active guests |
| `dynamic` (dynamic-load) | Average CPU and memory usage plus configured CPU and memory quotas of active guests |

## Notes

- HA requires a minimum of 3 cluster nodes for reliable quorum
- Two daemons cooperate: `pve-ha-lrm` (Local Resource Manager, per node) and `pve-ha-crm` (Cluster Resource Manager, elected master)
- Fencing is mandatory — without reliable fencing, HA cannot safely restart services from a failed node
- HA Groups are deprecated since PVE 9.0; use Node Affinity Rules instead
- `pmxcfs` locking ensures only one LRM and one CRM master run at any time
- Disarming HA for cluster maintenance (network or corosync reconfiguration that can cause quorum loss): `ha-manager crm-command disarm-ha freeze|ignore` releases all CRM and LRM watchdogs cluster-wide; `ha-manager crm-command arm-ha` reverses it. While disarmed HA does not protect services, so keep the window short. `freeze` applies no new commands or state changes; `ignore` suspends resources from HA tracking so they can be started/stopped/migrated manually (on re-arm the CRM rechecks service locations). If services are being fenced, recovered or migrated, the disarm is deferred until those operations complete.
- CRS Load Balancer: automatically issues rebalancing migrations only for HA resources, executed sequentially and always obeying HA affinity rules. Requires `static` or `dynamic` CRS mode. Every HA Manager round (about 10 s) it checks whether cluster imbalance exceeds the imbalance threshold (default 30%); if it stays above for at least the hold duration (consecutive rounds), it selects the migration (method: `bruteforce` or `topsis`) that lowers imbalance most, and issues it only if the improvement is at least the imbalance improvement margin (default 10%). Configure under Datacenter -> Options -> Cluster Resource Scheduling (`crs` options `ha-auto-rebalance*` in `datacenter.cfg`).
- Setting `auto-rebalance` to 0 on an HA resource excludes it from rebalancing migrations; any HA resource with a positive affinity to such a resource is excluded as well

## Related

- [cluster.md](./cluster.md)
- [vm-qemu.md](./vm-qemu.md)
- [container-lxc.md](./container-lxc.md)
