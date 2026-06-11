# Hyper-Converged Ceph

Proxmox VE integrates Ceph directly, allowing cluster nodes to serve as both compute and storage. Core components are OSD (object storage), MON (monitor), and MGR (manager).

## Signature / Usage

```bash
# Initialize Ceph on the first node
pveceph init --network 10.10.10.0/24

# Add a monitor
pveceph mon create

# Add an OSD (one per physical disk)
pveceph osd create /dev/sdb

# Create a storage pool
pveceph pool create <pool-name> --size 3 --min_size 2

# Check Ceph cluster status
ceph status
```

## Options / Props

### pveceph init

| Option | Description |
|--------|-------------|
| `--network` | Public network CIDR (storage traffic) |
| `--cluster-network` | Separate OSD replication/heartbeat network (optional but recommended) |

### pveceph pool create

| Option | Description |
|--------|-------------|
| `--size` | Number of replicas (default: 3) |
| `--min_size` | Minimum replicas to allow I/O (default: 2) |
| `--pg_num` | Number of Placement Groups (default: 128) |
| `--erasure-coding` | Use erasure-coded pool instead of replicated |

### Component roles

| Component | Minimum | Role |
|-----------|---------|------|
| MON | 3 | Maintains cluster map and quorum |
| MGR | 1 (2+ recommended) | Monitoring, dashboards, modules |
| OSD | 1 per disk | Stores objects; 1 OSD = 1 physical disk |

## Notes

- Minimum recommended deployment: 3 nodes, 12 OSDs distributed evenly across nodes
- Recommended memory: 8 GB per OSD for stable performance
- Recommended network: 10+ Gbps dedicated; separate public and cluster networks reduce OSD replication impact on client I/O
- Do not use hardware RAID controllers with Ceph OSDs; use raw disks or HBAs in passthrough mode
- SSDs improve OSD recovery time and latency; NVMe recommended for WAL/DB devices

## Related

- [storage.md](./storage.md)
- [cluster.md](./cluster.md)
- [ha.md](./ha.md)
