# ha-manager

Proxmox VE High Availability Manager. Monitors cluster resources and automatically performs failover of VMs and containers when node failures are detected.

## Signature / Usage

```bash
ha-manager <COMMAND> [OPTIONS]
ha-manager help [<COMMAND>]
```

### Subcommands

**Resource Management:**

| Subcommand | Description |
|------------|-------------|
| `add <sid>` | Add a new HA-managed resource |
| `config` | List all HA-managed resources |
| `set <sid>` | Update resource configuration |
| `remove <sid>` | Remove a resource from HA management |
| `status` | Show HA manager state |

**CRM Commands:**

| Subcommand | Description |
|------------|-------------|
| `crm-command migrate <sid> <node>` | Online migrate resource to another node |
| `crm-command relocate <sid> <node>` | Stop and restart resource on target node |
| `crm-command stop <sid>` | Stop a managed resource |
| `crm-command node-maintenance enable <node>` | Put node into maintenance mode |
| `crm-command node-maintenance disable <node>` | Take node out of maintenance mode |
| `crm-command arm-ha` | Request re-arming the HA stack after it was disarmed |
| `crm-command disarm-ha <resource-mode>` | Request disarming the HA stack, releasing all watchdogs cluster-wide (for cluster maintenance such as network or corosync reconfiguration). `<resource-mode>`: `freeze` or `ignore` |
| `migrate <sid> <node>` | Alias for `crm-command migrate` |
| `relocate <sid> <node>` | Alias for `crm-command relocate` |

**Rules (Affinity / Anti-affinity):**

| Subcommand | Description |
|------------|-------------|
| `rules add <ruleid>` | Create an affinity/anti-affinity rule |
| `rules config` | List all HA rules |
| `rules list` | List HA rules (supports `[OPTIONS]` `[FORMAT_OPTIONS]`) |
| `rules set <ruleid>` | Modify a rule |
| `rules remove <ruleid>` | Delete a rule |

## Options / Props

Key options for `ha-manager add`:

| Name | Type | Description |
|------|------|-------------|
| `<sid>` | string | Service ID (e.g. `vm:100`, `ct:200`) |
| `--state` | enum | Requested state: `disabled`, `enabled`, `ignored`, `started`, `stopped` (default: `started`) |
| `--max_restart` | integer | Max restart attempts on same node (default: 1) |
| `--max_relocate` | integer | Max relocate attempts to other nodes (default: 1) |
| `--auto-rebalance` | boolean | HA resource may be migrated during automatic rebalancing (default: 1) |
| `--failback` | boolean | Automatically migrate the resource to the node with the highest priority according to node affinity rules when a higher-priority node comes online (default: 1) |
| `--type` | enum | Resource type: `ct` or `vm` |
| `--comment` | string | Descriptive comment |
| `--group` | string | HA group for node priority (deprecated; use rules) |

Key options for `ha-manager status`:

| Name | Type | Description |
|------|------|-------------|
| `--verbose` | boolean | Include full CRM and LRM status output |

## Notes

- HA requires a functional cluster with quorum; at least 3 nodes are recommended.
- A watchdog device is required on each node for reliable fencing.
- Use `crm-command disarm-ha freeze|ignore` for cluster maintenance (e.g. network or corosync reconfiguration) to release watchdogs cluster-wide; re-enable with `crm-command arm-ha`. `freeze`: new commands and state changes are not applied. `ignore`: resources are removed from HA tracking and can be managed (start/stop/migrate) as if not HA managed.
- Node maintenance mode (`node-maintenance enable`) gracefully migrates all resources off a node before maintenance.
- `--state ignored` removes HA management without deleting the resource config entry.
- Legacy group commands (`groupadd`, `groupset`, etc.) are deprecated; use `rules` instead.

## Related

- [pvecm.md](./pvecm.md)
- [pvenode.md](./pvenode.md)
- [qm.md](./qm.md)
- [pct.md](./pct.md)
