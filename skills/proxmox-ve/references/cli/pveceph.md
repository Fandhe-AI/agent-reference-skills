# pveceph

Proxmox VE Ceph Manager. Manages Ceph services (monitors, managers, OSDs, pools, and filesystems) integrated into Proxmox VE nodes.

## Signature / Usage

```bash
pveceph <COMMAND> [OPTIONS]
pveceph help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `init` | Initial Ceph cluster configuration |
| `install` | Deploy Ceph packages on the node |
| `status` | Display Ceph cluster health and status |
| `start [<service>]` | Start Ceph services |
| `stop [<service>]` | Stop Ceph services |
| `mon create` | Create a Ceph Monitor (and optional Manager) |
| `mon destroy <monid>` | Remove a Monitor |
| `mgr create` | Deploy a Ceph Manager daemon |
| `mgr destroy <id>` | Remove a Manager daemon |
| `osd create <dev>` | Initialize an OSD on a block device |
| `osd destroy <osdid>` | Remove an OSD |
| `osd details <osdid>` | Show OSD details |
| `pool create <name>` | Create a storage pool |
| `pool destroy <name>` | Delete a pool |
| `pool get <name>` | Show pool configuration |
| `pool set <name>` | Modify pool parameters |
| `pool ls` | List all pools |
| `fs create` | Create a CephFS filesystem |
| `fs destroy <name>` | Remove a CephFS filesystem |

## Options / Props

Key options for `pveceph init`:

| Name | Type | Description |
|------|------|-------------|
| `--network` | CIDR | Ceph public network (required) |
| `--cluster-network` | CIDR | Separate OSD replication/heartbeat network |
| `--size` | integer | Target replicas per object (default: 3) |
| `--min_size` | integer | Minimum replicas for I/O (default: 2) |
| `--pg_num` | integer | Placement groups per pool (default: 128) |

Key options for `pveceph osd create`:

| Name | Type | Description |
|------|------|-------------|
| `<dev>` | path | Block device path (e.g. `/dev/sdb`) |
| `--db_dev` | path | Fast device for RocksDB metadata |
| `--wal_dev` | path | Fast device for write-ahead log |
| `--encrypted` | boolean | Enable OSD encryption |

Key options for `pveceph pool create`:

| Name | Type | Description |
|------|------|-------------|
| `--size` | integer | Number of replicas |
| `--min_size` | integer | Minimum replicas required for I/O |
| `--pg_num` | integer | Number of placement groups |
| `--add_storages` | boolean | Add corresponding Proxmox storage entries |

## Notes

- Ceph requires a minimum of 3 monitors for reliable operation.
- The `--network` option in `pveceph init` must be specified before creating monitors or OSDs.
- Destroying the last monitor is prevented to protect cluster integrity.
- OSD encryption (`--encrypted`) is configured at creation time and cannot be changed later.
- `pveceph pool destroy` can optionally remove associated Proxmox storage entries.

## Related

- [pvesm.md](./pvesm.md)
- [pvecm.md](./pvecm.md)
