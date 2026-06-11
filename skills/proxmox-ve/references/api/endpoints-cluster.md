# Cluster & Node Endpoints

REST API endpoints for cluster-wide management and per-node operations.

## Signature / Usage

```
/nodes
/nodes/{node}
/nodes/{node}/status
/nodes/{node}/tasks
/cluster
/cluster/options
/cluster/ha
/cluster/replication
/cluster/metrics
```

## Node Endpoints

### Node Listing

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes` | List all cluster nodes and their status |
| GET | `/nodes/{node}/status` | Detailed node status (CPU, memory, uptime) |
| GET | `/nodes/{node}/rrddata` | Historical resource usage metrics |
| GET | `/nodes/{node}/netstat` | Network statistics |
| GET | `/nodes/{node}/services` | List node services and their state |

```bash
pvesh get /nodes
pvesh get /nodes/pve1/status --output-format json-pretty
```

### Task Tracking (Async Operations)

All long-running API calls return an UPID (Unique Process ID). Use these endpoints to track progress:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/tasks` | List recent tasks on a node |
| GET | `/nodes/{node}/tasks/{upid}/status` | Get task status (`running`, `stopped`, exit code) |
| GET | `/nodes/{node}/tasks/{upid}/log` | Get task log output |
| DELETE | `/nodes/{node}/tasks/{upid}` | Stop a running task |

```bash
# Check task result
pvesh get /nodes/pve1/tasks/UPID:pve1:00001234:...:qmstart:100:root@pam:/status
```

## Cluster Endpoints

### Cluster Information

| Method | Path | Description |
|--------|------|-------------|
| GET | `/cluster/status` | Cluster membership and quorum status |
| GET | `/cluster/resources` | All cluster resources (VMs, containers, storage, nodes) |
| GET | `/cluster/options` | Datacenter configuration |
| PUT | `/cluster/options` | Update datacenter configuration |
| GET | `/version` | API version information |

```bash
pvesh get /cluster/status
pvesh get /cluster/resources --type vm
pvesh set cluster/options --console html5
```

### High Availability

| Method | Path | Description |
|--------|------|-------------|
| GET | `/cluster/ha/resources` | List HA-managed resources |
| POST | `/cluster/ha/resources` | Add resource to HA |
| GET | `/cluster/ha/resources/{sid}` | Get HA resource config |
| PUT | `/cluster/ha/resources/{sid}` | Update HA resource config |
| DELETE | `/cluster/ha/resources/{sid}` | Remove resource from HA |
| GET | `/cluster/ha/groups` | List HA groups |
| GET | `/cluster/ha/status/current` | Current HA manager status |

### Replication

| Method | Path | Description |
|--------|------|-------------|
| GET | `/cluster/replication` | List replication jobs |
| POST | `/cluster/replication` | Create replication job |
| PUT | `/cluster/replication/{id}` | Update replication job |
| DELETE | `/cluster/replication/{id}` | Remove replication job |

**Replication key parameters:**

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Job ID format: `<VMID>-<JOBNUM>` |
| `target` | string | Target node name |
| `schedule` | string | systemd calendar format (default: `*/15`) |
| `rate` | number | Bandwidth limit in Mbps |

## Notes

- `GET /cluster/resources` accepts a `type` filter: `vm`, `storage`, `node`, or `pool`.
- Quorum is required for most write operations on the cluster; nodes losing quorum become read-only.
- The `/version` endpoint requires no authentication and is useful for connectivity checks.

## Related

- [REST API Overview](./rest-overview.md)
- [Access & Storage Endpoints](./endpoints-access-storage.md)
