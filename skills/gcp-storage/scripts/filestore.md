---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore
---

# Filestore

Copy-paste gcloud commands to create, update, snapshot, back up, restore, mount and delete Filestore (managed NFS) instances.

## Signature / Usage

### Set default project, zone and region

```bash
gcloud config set project PROJECT_ID
gcloud config set filestore/zone zone
gcloud config set filestore/region region
```

Replace `zone` and `region` with your zone and region. Use `filestore/region` for the regional or enterprise tier.

### Create an instance

```bash
gcloud filestore instances create INSTANCE_ID \
    --tier=TIER \
    --file-share=name="FILE_SHARE_NAME",capacity=FILE_SHARE_SIZE \
    --network=name="VPC-NETWORK"
```

Regional instance with custom performance, IP-based access rules and deletion protection (the rules live in a flags file):

Adapted (not in the official docs): removed the invalid `reserved-ip-range="10.0.7.0/29"` (a /29 block is for Basic tier only) so Filestore allocates the range, and joined the wrapped `--deletion-protection-reason` string onto one line.

```bash
gcloud filestore instances create render1 \
  --project=myproject \
  --region=us-central1 \
  --tier=REGIONAL \
  --performance=max-iops-per-tb=17000 \
  --network=name="default" \
  --flags-file=nfs-export-options.json \
  --deletion-protection \
  --deletion-protection-reason="All genomics data must adhere to current organization policies."
```

`nfs-export-options.json`:

Adapted (not in the official docs): added a third rule granting `admin` access (`READ_WRITE` + `NO_ROOT_SQUASH`) to a single admin client, `10.0.0.10/32`, because the page requires at least one `admin` rule at instance creation and the source's two rules (`editor` and `admin-viewer`) include none; replace the address with your admin VM's internal IP.

```json
{
  "--file-share":
    {
      "capacity": "2048",
      "name": "my_vol",
      "nfs-export-options": [
        {
          "access-mode": "READ_WRITE",
          "ip-ranges": [
            "10.0.0.0/29",
            "10.2.0.0/29"
          ],
          "squash-mode": "ROOT_SQUASH",
          "anon_uid": 1003,
          "anon_gid": 1003
        },
        {
          "access-mode": "READ_ONLY",
          "ip-ranges": [
            "192.168.0.0/26"
          ],
          "squash-mode": "NO_ROOT_SQUASH"
        },
        {
          "access-mode": "READ_WRITE",
          "ip-ranges": [
            "10.0.0.10/32"
          ],
          "squash-mode": "NO_ROOT_SQUASH"
        }
      ]
    }
}
```

### List, describe and update

```bash
gcloud filestore instances list --limit=5 --sort-by=~name
```

```bash
gcloud filestore instances describe NAME --location=us-central1-c
```

```bash
gcloud filestore instances update NAME \
    --description="A new description."
```

```bash
gcloud filestore instances update NAME --project=PROJECT_ID \
    --zone=ZONE --file-share=name=VOLUME_NAME,capacity=CAPACITY
```

```bash
gcloud filestore instances update NAME --project=PROJECT_ID \
    --zone=ZONE --performance=max-iops-per-tb=MAX-IOPS-PER-TB
```

### Snapshots

```bash
gcloud filestore instances snapshots create my-snapshot \
    --instance=my-instance --instance-region=us-central1
```

```bash
gcloud filestore instances snapshots list --instance=my-instance \
  --instance-region=us-central1 --limit=5
```

```bash
gcloud filestore instances snapshots describe my-snapshot \
    --instance=my-instance --instance-region=us-central1
```

> **Warning**: deleting a snapshot is destructive. Try it on a disposable snapshot first.

```bash
gcloud filestore instances snapshots delete my-snapshot \
    --instance=my-instance --instance-region=us-central1
```

> **Warning**: reverting replaces the current instance data with the snapshot contents. It is irreversible: all data written since the target snapshot was created is deleted and can't be recovered, and snapshots created after the target snapshot are also deleted. Try it on a disposable instance first.

```bash
gcloud filestore instances revert my-instance \
    --target-snapshot=my-snapshot --location=us-central1
```

### Backups

```bash
gcloud filestore backups create my-backup --instance=my-instance \
    --file-share=my-fs --instance-zone=us-central1-c \
    --region=us-central1 --description="My backup description"
```

```bash
gcloud filestore backups list --limit=5
```

```bash
gcloud filestore backups describe my-backup --region=us-central1
```

> **Warning**: restoring writes backup data into the target file share. Try it on a disposable instance first.

```bash
gcloud filestore instances restore my-instance \
    --zone=europe-west3-a --file-share=vol1 \
    --source-backup=my-backup --source-backup-region=europe-west3
```

> **Warning**: deleting a backup is destructive. Try it on a disposable backup first.

```bash
gcloud filestore backups delete my-backup --region=us-central1
```

### Delete an instance

> **Warning**: deleting an instance is destructive and removes its file shares. Try it on a disposable instance first.

```bash
gcloud filestore instances delete NAME --zone=us-central1-c
```

### Mount a file share on Linux

```bash
sudo apt-get -y update &&
sudo apt-get install nfs-common
```

```bash
sudo mkdir -p mount-point-directory
sudo mount -o rw ip-address:/file-share mount-point-directory
```

```bash
df -h --type=nfs
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--tier` | `instances create` | Service tier; cannot be changed after creation |
| `--file-share` | `instances create`, `update` | File share name and capacity |
| `--performance` | `instances create`, `update` | `max-iops-per-tb` or `max-iops` |
| `--flags-file` | `instances create`, `update` | JSON file with flags such as NFS export options |
| `--deletion-protection` | `instances create` | Block instance deletion; add `--deletion-protection-reason` |
| `--instance-region` | `snapshots ...` | Region of the instance that owns the snapshot |
| `--target-snapshot` | `instances revert` | Snapshot to revert to |
| `--source-backup`, `--source-backup-region` | `instances restore` | Backup and its region |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Destructive: `instances delete`, `snapshots delete`, `instances revert`, `instances restore` and `backups delete` remove or overwrite data. Try each on a disposable instance first.
- The Filestore API must be enabled, and the zonal/regional instance quota starts at 0; request a quota increase before creating instances. Enterprise and high scale SSD tier instances cannot be created from the console.
- The `render1` example creates a file share of 2048 GiB with read-write (root squashed) and read-only access by IP range, plus one `admin` rule (read-write, no root squash) for a single admin client; set the `--tier`, ranges and capacity for your own network.
- Filestore is managed file storage (NFS), not an object API; Cloud Storage FUSE and Cloud Storage are covered in objects.md and buckets.md.
- Corrected from the official docs: the regional example passed `--network=name="default",reserved-ip-range="10.0.7.0/29"` (described as "Reserved IP address range is `10.0.7.0/29`"), but a /29 block is valid only for Basic tier; the creating-instances page requires a block size of 26 for zonal, regional and enterprise instances. `reserved-ip-range` is optional (per the `gcloud filestore instances create` help), so it is removed and Filestore allocates a free range, which the page recommends.
- Corrected from the official docs: the source breaks the quoted `--deletion-protection-reason` value across lines; it is joined on one line.
- Corrected from the official docs: the creating-instances page says "At least one rule must grant `admin` access at the time of instance creation", but its `nfs-export-options.json` example contains only an `editor` rule (`"access-mode": "READ_WRITE"` with `"squash-mode": "ROOT_SQUASH"`) and an `admin-viewer` rule (`"access-mode": "READ_ONLY"` with `"squash-mode": "NO_ROOT_SQUASH"`). A third `admin` rule (`READ_WRITE` + `NO_ROOT_SQUASH`) for the single admin client `10.0.0.10/32` (an example address, not from the source) is added; replace it with your admin VM's internal IP. The rule can be removed once the instance is created.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/snapshots (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/backups (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/filestore/docs/creating-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/filestore/docs/iam (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/filestore/docs/mounting-fileshares (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/filestore/docs/snapshots (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [lustre-netapp.md](./lustre-netapp.md)
- [backup-dr.md](./backup-dr.md)
- Filestore service tiers: https://docs.cloud.google.com/filestore/docs/service-tiers
