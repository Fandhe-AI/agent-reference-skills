# LXC Container Endpoints

REST API endpoints for managing Linux containers (LXC) under `/nodes/{node}/lxc`.

## Signature / Usage

```
/nodes/{node}/lxc
/nodes/{node}/lxc/{vmid}
/nodes/{node}/lxc/{vmid}/status/{action}
/nodes/{node}/lxc/{vmid}/snapshot
/nodes/{node}/lxc/{vmid}/migrate
/nodes/{node}/lxc/{vmid}/config
/nodes/{node}/lxc/{vmid}/clone
```

## Endpoints

### Container Listing & Creation

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/lxc` | List all containers on the node |
| POST | `/nodes/{node}/lxc` | Create a new container |

**Create container key parameters:**

| Name | Type | Description |
|------|------|-------------|
| `vmid` | integer | Container ID (100–999999999) |
| `ostemplate` | string | Template path (e.g., `local:vztmpl/debian-12-standard_12.0-1_amd64.tar.zst`) |
| `hostname` | string | Container hostname |
| `memory` | integer | RAM limit in MiB |
| `swap` | integer | Swap in MiB |
| `rootfs` | string | Root filesystem (e.g., `local-lvm:8`) |
| `password` | string | Root password |
| `net0` | string | Network interface (e.g., `name=eth0,bridge=vmbr0,ip=dhcp`) |
| `start` | boolean | Start container after creation |
| `unprivileged` | boolean | Run as unprivileged container (recommended) |

```bash
# Example: create and start a container via pvesh
pvesh create /nodes/mynode/lxc \
  --vmid 200 \
  --ostemplate local:vztmpl/debian-12-standard_12.0-1_amd64.tar.zst \
  --hostname myct \
  --memory 512 \
  --rootfs local-lvm:8 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --start 1
```

### Container Configuration

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/lxc/{vmid}/config` | Get current container configuration |
| PUT | `/nodes/{node}/lxc/{vmid}/config` | Update container configuration |
| DELETE | `/nodes/{node}/lxc/{vmid}` | Destroy container (must be stopped) |

### Container Status & Control

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/lxc/{vmid}/status/current` | Get container status and runtime info |
| POST | `/nodes/{node}/lxc/{vmid}/status/start` | Start the container |
| POST | `/nodes/{node}/lxc/{vmid}/status/stop` | Force-stop the container |
| POST | `/nodes/{node}/lxc/{vmid}/status/shutdown` | Graceful shutdown |
| POST | `/nodes/{node}/lxc/{vmid}/status/reboot` | Reboot the container |
| POST | `/nodes/{node}/lxc/{vmid}/status/suspend` | Suspend the container |
| POST | `/nodes/{node}/lxc/{vmid}/status/resume` | Resume from suspend |

### Snapshots

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/lxc/{vmid}/snapshot` | List snapshots |
| POST | `/nodes/{node}/lxc/{vmid}/snapshot` | Create snapshot |
| DELETE | `/nodes/{node}/lxc/{vmid}/snapshot/{snapname}` | Delete snapshot |
| POST | `/nodes/{node}/lxc/{vmid}/snapshot/{snapname}/rollback` | Rollback to snapshot |

### Migration & Clone

| Method | Path | Description |
|--------|------|-------------|
| POST | `/nodes/{node}/lxc/{vmid}/migrate` | Migrate container to another node |
| POST | `/nodes/{node}/lxc/{vmid}/clone` | Clone container |

## Notes

- All long-running operations return a task UPID. Poll `/nodes/{node}/tasks/{upid}/status` for completion.
- Required privilege: `VM.Audit` for reads; `VM.PowerMgmt` for status actions; `VM.Allocate` for create/delete.
- Containers share the host kernel; privileged containers have more access to host namespaces — prefer `unprivileged: true`.
- `pvesh ls /nodes/<node>/lxc/<vmid>` lists all available sub-paths for a specific container.

## Related

- [REST API Overview](./rest-overview.md)
- [QEMU VM Endpoints](./endpoints-qemu.md)
