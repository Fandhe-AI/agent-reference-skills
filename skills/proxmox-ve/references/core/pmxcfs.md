# Proxmox Cluster File System (pmxcfs)

pmxcfs is a database-driven file system, mounted at `/etc/pve`, that stores all Proxmox VE configuration files and replicates them in real time to all cluster nodes using `corosync`. It is implemented in user space with FUSE and stores data in SQLite (`/var/lib/pve-cluster/config.db`); a copy of the data resides in RAM, so the maximum size is currently 128 MiB (still enough for the configuration of several thousand virtual machines).

## Signature / Usage

```bash
# verbose syslog messages for pmxcfs
echo "1" >/etc/pve/.debug
echo "0" >/etc/pve/.debug

# recover VM 100 from an offline node1 to node2 (as root on any cluster member)
mv /etc/pve/nodes/node1/qemu-server/100.conf /etc/pve/nodes/node2/qemu-server/
```

## Options / Props

### Key files below `/etc/pve`

| Path | Description |
|------|-------------|
| `corosync.conf` | Corosync cluster configuration (called `cluster.conf` before Proxmox VE 4.x) |
| `datacenter.cfg` | Datacenter-wide configuration (keyboard layout, proxy, ...) |
| `domains.cfg` | Authentication domains |
| `user.cfg` | Access control configuration (users/groups/...) |
| `storage.cfg` | Storage configuration |
| `status.cfg` | External metrics server configuration |
| `vzdump.cron` | Cluster-wide vzdump backup-job schedule |
| `firewall/cluster.fw`, `firewall/<VMID>.fw` | Firewall configuration for all nodes / a VM or container |
| `nodes/<NAME>/host.fw` | Firewall configuration for an individual node |
| `ha/crm_commands`, `ha/manager_status`, `ha/resources.cfg`, `ha/rules.cfg` | HA: current CRM operations, JSON HA service status, managed resources and state, scheduling constraint rules |
| `nodes/<NAME>/config` | Node-specific configuration |
| `nodes/<NAME>/qemu-server/<VMID>.conf` | KVM VM configuration |
| `nodes/<NAME>/lxc/<VMID>.conf` | LXC container configuration |
| `nodes/<NAME>/pve-ssl.pem` / `pve-ssl.key` | Web server certificate (signed by cluster CA) and private key |
| `nodes/<NAME>/pveproxy-ssl.pem` / `pveproxy-ssl.key` | Optional override for `pve-ssl.pem` and its key |
| `pve-root-ca.pem`, `priv/pve-root-ca.key` | Cluster CA certificate and private key |
| `authkey.pub`, `priv/authkey.key` | Ticket system public / private key |
| `pve-www.key` | Private key used for generating CSRF tokens |
| `priv/shadow.cfg`, `priv/tfa.cfg`, `priv/token.cfg` | PVE realm shadow passwords, Base64-encoded two-factor configuration, API token secrets |
| `priv/authorized_keys`, `priv/known_hosts` | SSH keys of cluster members for authentication / verification |
| `priv/storage/<STORAGE-ID>.pw` | Storage password in plain text |
| `priv/ceph*`, `ceph.conf` | Ceph authentication keys / configuration (`/etc/ceph/ceph.conf` is a symbolic link to `ceph.conf`) |
| `priv/lock/*` | Lock files for safe cluster-wide operations |
| `sdn/*` | Shared SDN configuration |
| `virtual-guest/cpu-models.conf` | Custom CPU models |

### Symbolic links (point to the local node's own files)

| Link | Target |
|------|--------|
| `local` | `nodes/<LOCAL_HOST_NAME>` |
| `lxc` | `nodes/<LOCAL_HOST_NAME>/lxc/` |
| `qemu-server` | `nodes/<LOCAL_HOST_NAME>/qemu-server/` |
| `openvz` | `nodes/<LOCAL_HOST_NAME>/openvz/` (deprecated, removed soon) |

### Special status files (JSON)

| File | Description |
|------|-------------|
| `.version` | File versions (to detect file modifications) |
| `.members` | Info about cluster members |
| `.vmlist` | List of all VMs |
| `.clusterlog` | Cluster log (last 50 entries) |
| `.rrd` | RRD data (most recent entries) |

## Notes

- The pmxcfs chapter's file list gives the per-node firewall configuration as `firewall/<NAME>.fw`, but other parts of the official docs (Host System Administration network interface pinning, Firewall chapter) use `nodes/<NAME>/host.fw`; this page follows the latter (see firewall.md).
- Advantages: seamless real-time replication of all configuration, strong consistency checks to avoid duplicate VM IDs, read-only when a node loses quorum, automatic corosync configuration updates, distributed locking.
- POSIX-like (FUSE) but: no symbolic links can be created, non-empty directories cannot be renamed (keeps VMIDs unique), file permissions cannot be changed (permissions are path based), `O_EXCL` creates are not atomic (like old NFS), `O_TRUNC` creates are not atomic (FUSE restriction).
- Access rights: all files are owned by `root` with group `www-data`; only root can write, `www-data` can read most files. `/etc/pve/priv/` and `/etc/pve/nodes/${NAME}/priv/` are accessible by root only.
- Recovery of a host: copy `/var/lib/pve-cluster/config.db` to a new host, stop `pve-cluster` there, replace `config.db` (permissions `0600`), adapt `/etc/hostname` and `/etc/hosts` to the lost host, reboot and check (do not forget VM/CT data).
- Removing a node from a cluster: reinstalling it is recommended so that all secret cluster/ssh keys and shared configuration are destroyed; going back to local mode without reinstall is described under "Separate A Node Without Reinstalling" in the cluster chapter.
- Guest ownership: the node directory containing a guest config (`nodes/<NAME>/qemu-server/`, `nodes/<NAME>/lxc/`) is the guest's owner, enabling local locks instead of cluster-wide locks. If the owning node fails, regular migration is impossible (even with shared storage) because the local lock is unobtainable; HA-managed guests recover automatically (cluster-wide locking and watchdog).
- Manual recovery of a non-HA guest with only shared disks (no other local resources): move the config file as shown above. Make absolutely sure the failed source node is powered off / fenced first, otherwise Proxmox VE's locking principles are violated by `mv`. Guests with local disks or other local resources of the offline node cannot be recovered this way: wait for the node to rejoin or restore from backups.

## Related

- [cluster.md](./cluster.md)
- [ha.md](./ha.md)
- [certificates.md](./certificates.md)
- [firewall.md](./firewall.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-pmxcfs.html
