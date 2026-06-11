# Storage Commands

Commands for managing storage via `pvesm`, Ceph clusters via `pveceph`, and backups via `vzdump`.

---

## pvesm — Storage Manager

## Show status of all datastores

```sh
pvesm status
```

## List content of a storage

```sh
pvesm list <storage>
```

Optional: `--content <type>` (e.g., `images`, `backup`, `vztmpl`), `--vmid <vmid>`.

## Add a new storage

```sh
pvesm add <type> <storage> [OPTIONS]
```

Example (NFS): `pvesm add nfs mynfs --server 192.168.1.10 --export /mnt/data --content images,backup`

## Update storage configuration

```sh
pvesm set <storage> [OPTIONS]
```

## Remove storage configuration

> **警告**: Removes only the configuration entry. Actual data on the storage is not deleted.

```sh
pvesm remove <storage>
```

## Get filesystem path for a volume

```sh
pvesm path <volume>
```

Example: `pvesm path local-lvm:vm-100-disk-0`

## Allocate a new disk image

```sh
pvesm alloc <storage> <vmid> <filename> <size>
```

Example: `pvesm alloc local-lvm 100 vm-100-disk-1 10G`

## Delete a volume

> **警告**: Permanently deletes the volume from storage. This operation is irreversible.

```sh
pvesm free <volume>
```

## Extract configuration from a vzdump backup archive

```sh
pvesm extractconfig <backup-file>
```

## Prune backups according to retention policy

```sh
pvesm prune-backups <storage>
```

Options: `--keep-last <n>`, `--keep-daily <n>`, `--keep-weekly <n>`, `--keep-monthly <n>`, `--keep-yearly <n>`, `--keep-all 1`, `--vmid <vmid>`, `--type <ct|vm>`.

## Scan NFS shares on a remote server

```sh
pvesm scan nfs <server>
```

## Scan CIFS shares on a remote server

```sh
pvesm scan cifs <server>
```

Optional: `--username <user>`, `--password <pass>`.

## Scan iSCSI portals

```sh
pvesm scan iscsi <portal>
```

## List local LVM volume groups

```sh
pvesm scan lvm
```

## List local LVM thin pools

```sh
pvesm scan lvmthin <vg>
```

## List ZFS pools on local node

```sh
pvesm scan zfs
```

---

## pveceph — Ceph Cluster Management

## Initialize Ceph configuration

```sh
pveceph init --network <cidr>
```

Example: `pveceph init --network 10.10.10.0/24`

## Install Ceph packages

```sh
pveceph install
```

Optional: `--repository <enterprise|no-subscription|test>`.

## Show Ceph cluster status

```sh
pveceph status
```

## Create a Ceph monitor on current node

```sh
pveceph mon create
```

## Destroy a Ceph monitor

> **警告**: A minimum of 3 monitors is required for quorum. Do not remove monitors below this threshold.

```sh
pveceph mon destroy <monid>
```

## Create a Ceph manager on current node

```sh
pveceph mgr create
```

## Destroy a Ceph manager

```sh
pveceph mgr destroy <id>
```

## Create an OSD on a block device

```sh
pveceph osd create <dev>
```

Optional: `--db_dev <dev>`, `--wal_dev <dev>`, `--encrypted 1`.

> **警告**: All existing data on the target block device will be destroyed.

## Destroy an OSD

> **警告**: Permanently removes the OSD and its data from the cluster. Ensure data is replicated before removal.

```sh
pveceph osd destroy <id>
```

## Show OSD details

```sh
pveceph osd details <id>
```

## Create a Ceph storage pool

```sh
pveceph pool create <name>
```

Optional: `--size <n>` (replication factor), `--min_size <n>`, `--pg_num <n>`, `--add_storages 1`.

## Destroy a Ceph storage pool

> **警告**: Permanently destroys the pool and all data within it.

```sh
pveceph pool destroy <name>
```

## List Ceph pools

```sh
pveceph pool ls
```

## Get current pool status

```sh
pveceph pool get <name>
```

## Set pool parameters

```sh
pveceph pool set <name> [OPTIONS]
```

## Create a CephFS filesystem

```sh
pveceph fs create
```

Optional: `--name <name>`, `--pg_num <n>`, `--add-storage 1`.

## Destroy a CephFS filesystem

> **警告**: Removes the CephFS instance and optionally its backing pools. Data is permanently lost.

```sh
pveceph fs destroy <name>
```

## Create a CephFS MDS daemon

```sh
pveceph mds create
```

## Destroy a CephFS MDS daemon

```sh
pveceph mds destroy <name>
```

## Start Ceph services on current node

```sh
pveceph start
```

## Stop Ceph services on current node

```sh
pveceph stop
```

## Purge all Ceph configuration and data

> **警告**: Removes all Ceph configuration, monitors, OSDs, and data from the node. This is destructive and irreversible.

```sh
pveceph purge
```

---

## vzdump — Backup and Restore

## Back up a specific VM or container

```sh
vzdump <vmid> --storage <storage>
```

## Back up using stop mode (highest consistency)

> **警告**: The `--mode stop` option shuts down the guest during backup, causing downtime.

```sh
vzdump <vmid> --storage <storage> --mode stop
```

## Back up using snapshot mode (default, minimal downtime)

```sh
vzdump <vmid> --storage <storage> --mode snapshot
```

## Back up using suspend mode

```sh
vzdump <vmid> --storage <storage> --mode suspend
```

## Back up all guests on the node

```sh
vzdump --all --storage <storage>
```

## Back up all guests in a pool

```sh
vzdump --pool <pool> --storage <storage>
```

## Back up with zstd compression

```sh
vzdump <vmid> --storage <storage> --compress zstd
```

## Back up to a specific directory

```sh
vzdump <vmid> --dumpdir /path/to/backup/dir
```

## Limit backup I/O bandwidth

```sh
vzdump <vmid> --storage <storage> --bwlimit <kib-per-second>
```

## Back up with custom notes

```sh
vzdump <vmid> --storage <storage> \
  --notes-template "{{guestname}} backup on {{node}}"
```

## Back up with retention policy

```sh
vzdump <vmid> --storage <storage> \
  --prune-backups keep-last=5,keep-daily=7,keep-weekly=4,keep-monthly=6
```

## Back up with fleecing (improved I/O performance)

```sh
vzdump <vmid> --storage <storage> \
  --fleecing enabled=1,storage=<fleecing-storage>
```

## Back up with hook script

```sh
vzdump <vmid> --storage <storage> --script /path/to/hook-script.sh
```

## Restore a VM from backup

```sh
qmrestore <backup-file> <vmid> --storage <storage>
```

Optional: `--force 1` (overwrite existing VM), `--start 1` (start after restore), `--unique 1` (randomize MAC addresses).

> **警告**: Using `--force 1` permanently overwrites the existing VM with the same `<vmid>`.

## Restore a container from backup

```sh
pct restore <vmid> <backup-file> --storage <storage>
```

Optional: `--force 1` (overwrite existing container), `--start 1`.

> **警告**: Using `--force 1` permanently overwrites the existing container with the same `<vmid>`.

## Add a ZFS log device (L2ARC / SLOG)

```sh
zpool add <pool-name> log <dev-path>
```

Replace `<dev-path>` with the path to a fast SSD device.
