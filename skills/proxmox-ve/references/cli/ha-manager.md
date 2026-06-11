# ha-manager

Proxmox VE High Availability Manager. Monitors cluster resources and automatically performs failover of VMs and containers when node failures are detected.

## Signature / Usage

```bash
ha-manager <COMMAND> [OPTIONS]
ha-manager help [<COMMAND>]
```

## Subcommands

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
| `crm-command arm-ha` | Re-enable HA stack after disarming |
| `crm-command disarm-ha` | Release watchdogs cluster-wide (for full cluster shutdown) |

**Rules (Affinity / Anti-affinity):**

| Subcommand | Description |
|------------|-------------|
| `rules add <ruleid>` | Create an affinity/anti-affinity rule |
| `rules config` | List all HA rules |
| `rules set <ruleid>` | Modify a rule |
| `rules remove <ruleid>` | Delete a rule |

## Options / Props

Key options for `ha-manager add`:

| Name | Type | Description |
|------|------|-------------|
| `<sid>` | string | Service ID (e.g. `vm:100`, `ct:200`) |
| `--state` | enum | Desired state: `started`, `stopped`, `disabled`, `ignored` |
| `--max-restart` | integer | Max restart attempts on same node (default: 1) |
| `--max-relocate` | integer | Max relocate attempts to other nodes (default: 1) |
| `--comment` | string | Descriptive comment |
| `--group` | string | HA group for node priority (deprecated; use rules) |

Key options for `ha-manager status`:

| Name | Type | Description |
|------|------|-------------|
| `--verbose` | boolean | Include full CRM and LRM status output |

## Notes

- HA requires a functional cluster with quorum; at least 3 nodes are recommended.
- A watchdog device is required on each node for reliable fencing.
- Use `crm-command disarm-ha` before planned full cluster shutdowns to prevent unintended fencing.
- Node maintenance mode (`node-maintenance enable`) gracefully migrates all resources off a node before maintenance.
- `--state ignored` removes HA management without deleting the resource config entry.
- Legacy group commands (`groupadd`, `groupset`, etc.) are deprecated; use `rules` instead.

## Related

- [pvecm.md](./pvecm.md)
- [pvenode.md](./pvenode.md)
- [qm.md](./qm.md)
- [pct.md](./pct.md)
