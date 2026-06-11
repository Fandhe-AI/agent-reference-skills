# Proxmox VE Daemons

Core Proxmox VE background daemons. Each runs as a systemd service and can be controlled with `systemctl start|stop|restart|status <name>` or the daemon's own CLI.

## Signature / Usage

```
External client
    │ HTTPS :8006
    ▼
pveproxy (www-data)
    │ HTTP :85 (privileged ops)
    ▼
pvedaemon (root)
    │ reads/writes
    ▼
pmxcfs (/etc/pve) ←→ Corosync ←→ other nodes
```

## Options / Props

| Daemon | Service Name | Port | User | Role |
|--------|-------------|------|------|------|
| pvedaemon | `pvedaemon` | 85 (localhost only) | root | Core API worker. Exposes the full PVE API on 127.0.0.1:85 and executes all privileged operations. Spawns up to 3 worker processes (configurable via `MAX_WORKERS` in `/etc/default/pvedaemon`, max 127). |
| pveproxy | `pveproxy` | 8006 (HTTPS, all interfaces) | www-data | Public HTTPS gateway. Forwards unprivileged API requests itself and proxies privileged requests to pvedaemon. Handles SSL/TLS, host-based ACLs, and automatic cluster-node routing. Configurable via `/etc/default/pveproxy`. |
| pvestatd | `pvestatd` | — | root | Status poller. Periodically queries status of VMs, containers, and storage, then distributes collected metrics to all cluster nodes. |
| pve-firewall | `pve-firewall` | — | root | Distributed firewall. Runs on each node and programs iptables/nftables rules for host, VM/container, and VNet traffic zones. Config files: `/etc/pve/firewall/cluster.fw`, `/etc/pve/nodes/<node>/host.fw`, `/etc/pve/firewall/<VMID>.fw`. |
| pve-ha-crm | `pve-ha-crm` | — | root | Cluster Resource Manager. Elected master daemon that makes cluster-wide HA decisions, issues start/stop/migrate commands to LRM instances, and handles failover when a node becomes unavailable. |
| pve-ha-lrm | `pve-ha-lrm` | — | root | Local Resource Manager. Runs on every node; receives commands from CRM, executes them locally (start/stop/migrate), and reports results back. Uses distributed locks via pmxcfs for safe coordination. |
| pmxcfs | `pve-cluster` | — | root | Cluster File System. FUSE-based, database-backed (SQLite + Corosync) filesystem mounted at `/etc/pve`. Replicates all cluster configuration in real time. Enforces quorum (read-only when quorum lost). Max capacity: 128 MB. |
| pvescheduler | `pvescheduler` | — | root | Job scheduler. Triggers scheduled replication jobs and vzdump (backup) jobs according to their configured schedules. Reads job definitions from `/etc/pve/jobs.cfg`. |
| spiceproxy | `spiceproxy` | 3128 (TCP) | www-data | SPICE HTTP proxy. Forwards CONNECT requests from SPICE clients to the correct PVE VM's display socket. Shares ACL configuration with pveproxy (`/etc/default/pveproxy`). |
| qmeventd | `qmeventd` | Unix socket | root | QEMU event handler. Monitors QMP sockets for SHUTDOWN events; on client disconnect after shutdown, runs `/usr/sbin/qm cleanup` to remove stale tap devices and vGPU allocations. |

## Notes

**Key Ports**

| Port | Protocol | Purpose |
|------|----------|---------|
| 8006 | TCP/HTTPS | Web UI & REST API (pveproxy) |
| 85 | TCP/HTTP | Internal API (pvedaemon, localhost only) |
| 3128 | TCP | SPICE proxy (spiceproxy) |
| 5900–5999 | TCP | VNC console sessions |
| 5405–5412 | UDP | Corosync cluster communication |
| 60000–60050 | TCP | Live migration |
| 22 | TCP | SSH (cluster node communication, pvesh proxying) |

- `pvedaemon` and `pveproxy` are the API stack: never expose port 85 externally.
- `pve-ha-crm` and `pve-ha-lrm` work together: CRM holds the cluster view, LRM executes on each node. Both rely on pmxcfs locks for coordination.
- `pmxcfs` must be running before most other PVE services start; it provides `/etc/pve` which holds all cluster config.
- Worker counts for `pvedaemon` and `pveproxy` are both controlled by `MAX_WORKERS` in their respective `/etc/default/` files.
