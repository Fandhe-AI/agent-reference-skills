# Cluster Management

Proxmox VE cluster management uses `pvecm` with Corosync for group communication and `pmxcfs` (Proxmox Cluster File System) to distribute configuration across all nodes in real time.

## Signature / Usage

```bash
# Create a new cluster
pvecm create <cluster-name>

# Add a node to an existing cluster (run on the new node)
pvecm add <existing-node-IP>

# Show cluster status
pvecm status

# Remove a node (run from another cluster node)
pvecm delnode <nodename>
```

## Options / Props

### pvecm add

| Option | Description |
|--------|-------------|
| `<IP>` | IP address of an existing cluster node |
| `--ring0_addr` | Explicit address for ring 0 (Corosync link 0) |
| `--link1` | Address for a second Corosync link (redundancy) |

### Corosync requirements

| Parameter | Value |
|-----------|-------|
| UDP ports | 5405–5412 |
| TCP port | 22 (SSH tunnel) |
| Max latency | < 5 ms between nodes |
| Minimum nodes for HA quorum | 3 |

## Notes

- Each node receives one vote; quorum is lost when fewer than half the nodes are reachable, causing the cluster to enter read-only mode
- Dedicated physical NIC for cluster traffic is strongly recommended; Corosync is latency-sensitive despite low bandwidth usage
- Before removing a node: migrate all VMs/CTs away and remove any Ceph or replication jobs referencing it — these become irremovable otherwise
- Always power off a node before deletion to avoid cluster corruption
- `pmxcfs` transparently replicates `/etc/pve/` to all nodes in real time over a FUSE filesystem

## Related

- [ha.md](./ha.md)
- [storage.md](./storage.md)
