# Storage Replication

The `pvesr` command-line tool manages the Proxmox VE storage replication framework. Replication copies guest volumes to another node using snapshots (incremental after the initial full sync), giving redundancy for guests on local storage without shared storage and shortening migration time.

## Signature / Usage

```bash
# Replicate guest 100 to node pve1 every 5 minutes, rate limited to 10 (megabytes per second)
pvesr create-local-job 100-0 pve1 --schedule "*/5" --rate 10

pvesr disable 100-0
pvesr enable 100-0
# Change the schedule to once per hour (minute 00)
pvesr update 100-0 --schedule '00'
```

## Options / Props

| Item | Description |
|------|-------------|
| Job ID | Cluster-wide unique: VMID plus a job number (e.g. `100-0`); only specified manually with the CLI |
| `--schedule` | systemd calendar event subset; minimum interval one minute, maximum once a week; GUI default is `all 15 minutes` |
| `--rate` | Per-job bandwidth limit (megabytes per second) |
| Supported storage | `zfspool` (ZFS local): snapshots yes, stable yes |
| `replication` in `datacenter.cfg` | Dedicated replication network, e.g. `replication: secure,network=10.1.2.0/24` (GUI: Datacenter -> Options -> Replication Settings) |

### Manual recovery after node failure

Example: VM 100 and CT 200 replicated from node A (failed, not coming back) to node B. On node B:

Prerequisite: before forcing quorum or moving the configs, make absolutely sure node A is really powered off / fenced; otherwise the `mv` violates Proxmox VE's locking principles, which can have unexpected consequences (see [pmxcfs.md](./pmxcfs.md)).

```bash
# Only after node A is confirmed powered off / fenced
pvecm status
pvecm expected 1     # only if quorum cannot be fixed otherwise
mv /etc/pve/nodes/A/qemu-server/100.conf /etc/pve/nodes/B/qemu-server/100.conf
mv /etc/pve/nodes/A/lxc/200.conf /etc/pve/nodes/B/lxc/200.conf
qm start 100
pct start 200
```

## Notes

- A guest can be replicated to multiple target nodes, but not twice to the same target node. Replication direction switches automatically when the guest is migrated to its replication target; only deltas are transferred then. Migrating to a node without replica sends the whole disk data; afterwards the job continues to the configured nodes.
- Error handling: a failing job goes to an error state, its configured intervals are suspended, and the replication is retried every 30 minutes; once it succeeds the original schedule resumes. Common causes: network not working, no free space on the target storage, storage with the same storage ID not available on the target node. Use the replication log to find the cause.
- If a guest is stuck on a failed node, move it manually (see above), but only after making absolutely sure the failed source node is really powered off / fenced. Avoid cluster-affecting changes (adding/removing nodes, storages, guests) while `expected votes` is forced; use it only to get vital guests running or to resolve the quorum issue.
- High availability is allowed together with replication, but data written between the last sync and the node failure can be lost.
- Replication traffic uses the migration network by default, which in turn defaults to the management network.
- The official pvesr chapter's CLI example uses `'*/00'` for the hourly schedule, but the proxmox-time calendar-event parser only accepts `*/N` with N > 0 (a zero repeat leaves `/00` unconsumed and causes a parse error), so this page uses `00` (minute 00, once per hour).
- The replication panel exists at datacenter, node and guest level in the web GUI (different job scope); jobs can be created, modified and removed there or with `pvesr`.

## Related

- [zfs.md](./zfs.md)
- [ha.md](./ha.md)
- [cluster.md](./cluster.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-pvesr.html
