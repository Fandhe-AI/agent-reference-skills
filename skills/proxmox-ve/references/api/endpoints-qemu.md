# QEMU VM Endpoints

REST API endpoints for managing QEMU/KVM virtual machines under `/nodes/{node}/qemu`.

## Signature / Usage

```
/nodes/{node}/qemu
/nodes/{node}/qemu/{vmid}
/nodes/{node}/qemu/{vmid}/status/{action}
/nodes/{node}/qemu/{vmid}/snapshot
/nodes/{node}/qemu/{vmid}/migrate
/nodes/{node}/qemu/{vmid}/config
/nodes/{node}/qemu/{vmid}/clone
```

## Endpoints

### VM Listing & Creation

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/qemu` | List all VMs on the node |
| POST | `/nodes/{node}/qemu` | Create a new VM |

**Create VM key parameters:**

| Name | Type | Description |
|------|------|-------------|
| `vmid` | integer | VM ID (100–999999999) |
| `memory` | integer | RAM in MiB |
| `cores` | integer | Number of CPU cores |
| `net0` | string | Network device (e.g., `virtio,bridge=vmbr0`) |
| `scsi0` | string | Primary disk (e.g., `local-lvm:32`) |
| `ostype` | string | OS type: `l26`, `win10`, etc. |
| `start` | boolean | Start VM after creation |

### VM Configuration

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/qemu/{vmid}/config` | Get current VM configuration |
| PUT | `/nodes/{node}/qemu/{vmid}/config` | Update VM configuration |
| DELETE | `/nodes/{node}/qemu/{vmid}` | Destroy VM (must be stopped) |

### VM Status & Control

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/qemu/{vmid}/status/current` | Get VM status and runtime info |
| POST | `/nodes/{node}/qemu/{vmid}/status/start` | Start the VM |
| POST | `/nodes/{node}/qemu/{vmid}/status/stop` | Force-stop the VM |
| POST | `/nodes/{node}/qemu/{vmid}/status/shutdown` | Graceful shutdown (ACPI) |
| POST | `/nodes/{node}/qemu/{vmid}/status/reboot` | Reboot the VM |
| POST | `/nodes/{node}/qemu/{vmid}/status/reset` | Hard reset the VM |
| POST | `/nodes/{node}/qemu/{vmid}/status/suspend` | Suspend to RAM |
| POST | `/nodes/{node}/qemu/{vmid}/status/resume` | Resume from suspend |

### Snapshots

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/qemu/{vmid}/snapshot` | List snapshots |
| POST | `/nodes/{node}/qemu/{vmid}/snapshot` | Create snapshot |
| DELETE | `/nodes/{node}/qemu/{vmid}/snapshot/{snapname}` | Delete snapshot |
| POST | `/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback` | Rollback to snapshot |

**Snapshot key parameters:**

| Name | Type | Description |
|------|------|-------------|
| `snapname` | string | Snapshot name |
| `description` | string | Optional description |
| `vmstate` | boolean | Include RAM state |

### Migration

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/qemu/{vmid}/migrate` | Get preconditions for migration |
| POST | `/nodes/{node}/qemu/{vmid}/migrate` | Migrate VM to another node |

**Migrate key parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | string | Target node name |
| `online` | boolean | Live migration (VM stays running) |
| `with-local-disks` | boolean | Migrate local disks too |

### Clone

| Method | Path | Description |
|--------|------|-------------|
| POST | `/nodes/{node}/qemu/{vmid}/clone` | Clone VM (full or linked) |

## Notes

- All long-running operations return a task UPID. Poll `/nodes/{node}/tasks/{upid}/status` for completion.
- Required privilege: `VM.Audit` for reads; `VM.PowerMgmt` for status actions; `VM.Allocate` for create/delete.
- `pvesh ls /nodes/<node>/qemu/<vmid>` lists all available sub-paths for a specific VM.

## Related

- [REST API Overview](./rest-overview.md)
- [LXC Container Endpoints](./endpoints-lxc.md)
