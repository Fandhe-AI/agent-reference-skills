---
source: https://docs.cloud.google.com/filestore/docs/snapshots
---

# Filestore snapshots

A snapshot preserves the state of file share data at creation. Snapshots are stored within the instance as child resources, share in-common data, and consume capacity only as data is modified.

## Signature / Usage

Each directory has a hidden `.snapshot` directory holding the snapshots of its parent:

```text
volume1/
│   genomics-file.txt
│
└───.snapshot
    │
    ├───snap1/
    │        genomics-file.txt
    │
    ├───snap2/
    │        genomics-file.txt
    │
    └───snap3/
             genomics-file.txt
```

Change into a snapshot directory by typing the name explicitly: `cd somedir/.snapshot/`. Restore a file by overwriting the current file with the one in the snapshot directory.

## Options / Props

| Tier | Create snapshot | Revert instance |
|---|---|---|
| Basic HDD | No | No |
| Basic SSD | No | No |
| Zonal | Yes | Yes |
| Regional | Yes | Yes |
| Enterprise | Yes | Yes |

| Limit | Value |
|---|---|
| Snapshots per instance | up to 240 |
| File share name + snapshot name | up to 78 characters combined |
| Snapshot creation time | usually under two minutes; no data copy, no performance impact |
| Revert operation | up to two minutes; cleanup 6 hours to 10 days |

## Notes

- Revert is destructive and irreversible: all data written after the target snapshot, and all newer snapshots, are deleted and cannot be recovered; capacity and performance may be affected during cleanup. Unlike restoring from a backup, the snapshot chain is lost. Try it on a disposable instance first. Only single-share instances can revert; revert updates the NFS fsid, so unmount clients before and remount after (existing mounts return stale file handle errors); wait for a revert to finish before starting another.
- Enterprise snapshots cannot be combined with Filestore multishares. The formerly available high scale SSD tier also supports snapshots and revert.
- Source inconsistency: the service-tiers page's tier table lists "Backups, Snapshots, Replication" as data protection for "Multishares for GKE (Enterprise)", while the backups page says Filestore multishares for GKE are not supported for standard or enhanced backups and the snapshots page says Enterprise snapshots cannot be combined with Filestore multishares. The tier name makes it ambiguous whether the table row means the Enterprise tier or the multishares feature.
- Consistency: NFSv3 semantics (acknowledged writes before the snapshot are included). For strict consistency: use the `sync` mount option or `O_DIRECT|O_SYNC` (improves but does not guarantee), pause writers and flush (`fsync`), pause all applications across all shares for multi-share consistency, or stop applications and unmount.
- `.snapshot` is reserved: you cannot create a file or directory with that name; it is not listed by `READDIR`, `READDIRPLUS` or `ls -a`, and shell autocomplete omits it.
- Deleting a file captured in a snapshot does not free space on the instance.
- Snapshot how-tos: https://docs.cloud.google.com/filestore/docs/create-snapshots, https://docs.cloud.google.com/filestore/docs/restore-file, https://docs.cloud.google.com/filestore/docs/revert-snapshot
- Source: https://docs.cloud.google.com/filestore/docs/snapshots (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [backups.md](./backups.md)
- [limits.md](./limits.md)
- [service-tiers.md](./service-tiers.md)
