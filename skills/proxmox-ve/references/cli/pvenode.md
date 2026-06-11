# pvenode

Proxmox VE Node Management Tool. Controls node-specific settings, certificates, guest bulk operations, and task history.

## Signature / Usage

```bash
pvenode <COMMAND> [OPTIONS]
pvenode help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `config get` | Retrieve node configuration settings |
| `config set` | Modify node configuration options |
| `cert info` | Display current certificate information |
| `cert set <certificate> <key>` | Upload custom TLS certificate and key |
| `cert delete` | Remove custom certificate |
| `acme account register` | Register an ACME account |
| `acme account deactivate` | Deactivate an ACME account |
| `acme account update` | Update ACME account contact info |
| `acme account list` | List configured ACME accounts |
| `acme cert order` | Order/renew certificate from ACME CA |
| `acme cert revoke` | Revoke ACME certificate |
| `acme plugin add <type> <pluginid>` | Add ACME DNS/standalone plugin |
| `acme plugin update <pluginid>` | Update plugin configuration |
| `acme plugin remove <pluginid>` | Remove a plugin |
| `acme plugin list` | List configured plugins |
| `startall` | Start all VMs and containers (onboot=1 by default) |
| `stopall` | Stop all VMs and containers |
| `migrateall <target>` | Migrate all guests to another node |
| `task list` | Show finished task history |
| `task log <upid>` | Show task execution log |
| `task status <upid>` | Check task completion status |
| `wakeonlan <node>` | Send Wake-on-LAN packet to a node |

## Options / Props

Key options for `pvenode startall` / `pvenode stopall`:

| Name | Type | Description |
|------|------|-------------|
| `--vms` | list | Limit to specific VM/CT IDs |
| `--force` | boolean | Start all VMs, not just those with `onboot=1` |
| `--timeout` | integer | Timeout in seconds |

Key options for `pvenode migrateall`:

| Name | Type | Description |
|------|------|-------------|
| `<target>` | string | Target node name |
| `--maxworkers` | integer | Maximum simultaneous migrations |
| `--vms` | list | Limit to specific VM/CT IDs |
| `--with-local-disks` | boolean | Migrate VMs with local disks |

Key options for `pvenode task list`:

| Name | Type | Description |
|------|------|-------------|
| `--errors` | boolean | Show only failed tasks |
| `--source` | enum | Filter by source: `all`, `active`, `archive` |
| `--limit` | integer | Maximum number of tasks to return |

General output option:

| Name | Type | Description |
|------|------|-------------|
| `--output-format` | enum | Output format: `json`, `json-pretty`, `yaml`, `text` |

## Notes

- `pvenode startall --force` starts all VMs regardless of `onboot` setting; use with care.
- ACME certificate management integrates with Let's Encrypt and other ACME-compatible CAs.
- `pvenode stopall` sends a shutdown signal and waits; use `--timeout` to set a maximum wait time.
- Task UPIDs can be obtained from `pvenode task list` or API responses.

## Related

- [pvecm.md](./pvecm.md)
- [pveum.md](./pveum.md)
- [ha-manager.md](./ha-manager.md)
