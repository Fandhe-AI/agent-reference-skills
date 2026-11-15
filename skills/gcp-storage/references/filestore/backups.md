---
source: https://docs.cloud.google.com/filestore/docs/backups
---

# Filestore backups

A Filestore backup is a differential copy of a file share (all file data and metadata) at a point in time. Backups are regional resources, globally addressable, and independent of the source instance.

## Signature / Usage

The source page is conceptual and has no commands. The fence below is the instance create synopsis from the creating-instances page (arguments in square brackets are optional; this is not a runnable command); it has no backup arguments. Restoring a backup into a new instance uses `gcloud filestore instances create` with `source-backup=BACKUP,source-backup-region=REGION` inside `--file-share`; Basic HDD and Basic SSD can also restore to an existing or the source instance with `gcloud filestore instances restore` (see the table below):

```text
gcloud filestore instances create INSTANCE_ID \
    [--project=PROJECT_ID] \
    [--location=LOCATION] \
    [--description=DESCRIPTION] \
    [--performance=PERFORMANCE] \
    --tier=TIER \
    --file-share=name="FILE_SHARE_NAME",capacity=FILE_SHARE_SIZE \
    --network=name="VPC-NETWORK",[connect-mode=CONNECT_MODE],[reserved-ip-range="RESERVED_IP_ADDRESS"] \
    [--labels=KEY=VALUE,[KEY=VALUE,...]] \
    [--kms-key=KMS_KEY] \
    [--deletion-protection] \
    [--deletion-protection-reason="PROTECTION_REASON"]
```

## Options / Props

| Tier | Backups | restore to new instance | restore to existing instance | restore to source instance | CMEK |
|---|---|---|---|---|---|
| Basic HDD | Yes | Yes | Yes | Yes | No |
| Basic SSD | Yes | Yes | Yes | Yes | No |
| Zonal | Yes | Yes | No | No | Yes |
| Regional | Yes | Yes | No | No | Yes |
| Enterprise | Yes | Yes | No | No | Yes |

| Feature | Standard backups | Enhanced backups |
|---|---|---|
| Managed by | Filestore | Backup and DR Service |
| Tiers | Basic, Zonal, Regional, Enterprise (multishares for GKE not supported) | Zonal, Regional, Enterprise (multishares not supported) |
| Scheduling | No | Yes (hourly, daily, weekly, monthly, yearly) |
| Immutable and indelible | No | Yes, through a backup vault |
| On-demand retention | Until manually deleted | Until expired by a backup rule or deleted |
| Protected against source project deletion | No | Yes |
| Centralized management across resources and projects | No | Yes |
| Retention over one year | No | Yes |
| Protected against source instance deletion | Yes | Yes |
| CMEK | Yes | Yes |
| Cross-region | Yes | Yes |
| Multi-regional | No | Planned |

Preserved: instance ID, tier, capacity, file share name. Not preserved: description, location, network, IP address, IP-based access controls, file locks, lock state, snapshots.

## Notes

- Deleting a backup is permanent and cannot be undone (destructive); try it on a disposable backup first. A failed delete marks the backup `invalid`; retry. Deleting the source instance does not delete its backups, and remaining backups keep accruing fees; delete unwanted backups explicitly.
- Consistency: NFSv3 and NFSv4.1 semantics; writes acknowledged as written to stable storage (or followed by an acknowledged `COMMIT`) before the backup starts are included.
- Cross-region backup traffic incurs network transfer charges. A per-region backup quota applies to basic SSD and basic HDD only. Backup creation and restore rate limits are in [limits.md](./limits.md).
- Enable the 30-day introductory trial of Backup and DR Service to explore enhanced backups. See also backup limitations (https://docs.cloud.google.com/filestore/docs/backups-limitations) and restoring (https://docs.cloud.google.com/filestore/docs/restore-data).
- Source inconsistency: the service-tiers page's tier table lists "Backups, Snapshots, Replication" as data protection for "Multishares for GKE (Enterprise)", while the backups page says Filestore multishares for GKE are not supported for standard or enhanced backups and the snapshots page says Enterprise snapshots cannot be combined with Filestore multishares. The tier name makes it ambiguous whether the table row means the Enterprise tier or the multishares feature.
- Snippet taken from https://docs.cloud.google.com/filestore/docs/creating-instances.
- Source: https://docs.cloud.google.com/filestore/docs/backups (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/filestore/docs/creating-instances (snippet; retrieved 2026-11-15)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/create (`--file-share` `source-backup`, `source-backup-region`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/restore (retrieved 2026-11-14)

## Related

- [snapshots.md](./snapshots.md)
- [limits.md](./limits.md)
- [overview.md](./overview.md)
