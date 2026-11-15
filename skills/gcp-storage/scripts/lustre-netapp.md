---
source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre
---

# Managed Lustre and NetApp Volumes

Copy-paste gcloud commands to create, mount, import, export and delete Managed Lustre instances, and to set up networking, storage pools, volumes, export policies and snapshots for Google Cloud NetApp Volumes.

## Signature / Usage

### Create a Managed Lustre instance

```bash
gcloud lustre instances create INSTANCE_ID \
  --per-unit-storage-throughput=PER_UNIT_STORAGE_THROUGHPUT \
  --capacity-gib=CAPACITY_GIB \
  --filesystem=FILESYSTEM \
  --location=LOCATION \
  --network=NETWORK_PATH
```

```bash
gcloud lustre instances create my-instance --capacity-gib=18000 \
    --location=us-central1-a \
    --network=projects/my-project/global/networks/default \
    --filesystem=lustrefs --per-unit-storage-throughput=1000
```

### Check creation status, list and update

```bash
gcloud lustre instances describe INSTANCE_NAME \
  --location=ZONE
```

```bash
gcloud lustre operations describe OPERATION_ID \
  --location=LOCATION
```

```bash
gcloud lustre instances list --location=us-central1-a
```

```bash
gcloud lustre instances update my-instance \
    --location=us-central1-a --description="UPDATED_DESCRIPTION"
```

Note the `mountPoint` (for example `10.115.0.3@tcp:/testfs`) and the file system name for mounting.

### Mount a Managed Lustre file system on a Compute Engine VM

```bash
sudo modprobe lustre
```

Adapted (not in the official docs): mount point `~/MOUNT_DIR` changed to the absolute `/mnt/MOUNT_DIR` so it matches the `/etc/fstab` entry below.

```bash
sudo mkdir -p /mnt/MOUNT_DIR
sudo mount -t lustre IP_ADDRESS:/FILESYSTEM_NAME /mnt/MOUNT_DIR
```

Persistent mount, add this line to `/etc/fstab` (file content, not a command) and run `sudo mount -a`:

Adapted (not in the official docs): absolute mount point; fstab does not expand `~`.

```text
IP_ADDRESS@tcp:/FILESYSTEM_NAME /mnt/MOUNT_DIR lustre defaults,_netdev 0 0
```

Adapted (not in the official docs): mount point `~/MOUNT_DIR` changed to `/mnt/MOUNT_DIR` to match the mount above.

```bash
sudo lfs df -h /mnt/MOUNT_DIR
sudo umount /mnt/MOUNT_DIR
```

### Import and export data with Cloud Storage

```bash
gcloud lustre instances import-data my-instance \
    --location=us-central1-a --gcs-path-uri=gs://my-bucket/ \
    --lustre-path='/path/to/lustre/dir'
```

```bash
gcloud lustre instances export-data my-instance \
    --location=us-central1-a --gcs-path-uri=gs://my-bucket/ \
    --lustre-path='/path/to/lustre/dir'
```

### Delete a Managed Lustre instance

> **Warning**: deleting an instance is destructive and removes its data. Try it on a disposable instance first.

```bash
gcloud lustre instances delete my-instance --location=us-central1-a
```

### NetApp Volumes: private services access

```bash
gcloud compute addresses create netapp-addresses-production-vpc1 \
 --project=PROJECT_ID \
 --global \
 --purpose=VPC_PEERING \
 --prefix-length=24 \
 --network=VPC \
 --no-user-output-enabled
```

```bash
gcloud services vpc-peerings connect \
 --project=PROJECT_ID \
 --service=netapp.servicenetworking.goog \
 --ranges=netapp-addresses-production-vpc1,ADDITIONAL_IP_RANGES \
 --network=VPC
```

Enable custom route propagation (the `sn-netapp-prod` peering is created by the service):

```bash
gcloud compute networks peerings update sn-netapp-prod \
  --project=PROJECT_ID \
  --network=VPC  \
  --import-custom-routes \
  --export-custom-routes
```

### NetApp Volumes: storage pool and volume

Both commands below are gcloud help examples; the pool command is the help's "all possible arguments" variant for a shared VPC. It uses a shared VPC host project (`VPC_PROJECT`) and needs an existing Active Directory policy (`ad1`) and KMS config (`kms-config1`); the volume command needs an existing storage pool (`sp2`, not the pool `NAME` created here). Replace these help-example values with your own resources.

Adapted (not in the official docs): runnable form of the gcloud help example: the lines wrapped by `gcloud help` inside the `--network` value are joined, and one flag is put per line.

```bash
gcloud netapp storage-pools create NAME \
    --location=us-central1 \
    --service-level=standard \
    --capacity=2048 \
    --network=name=projects/VPC_PROJECT/locations/us-central1/networks/default \
    --active-directory=ad1 \
    --kms-config=kms-config1 \
    --enable-ldap=true \
    --description="example description"
```

Adapted (not in the official docs): runnable form of the gcloud help example: the lines wrapped by `gcloud help` inside the `--smb-settings` value are joined, one flag is put per line, and `--location=us-central1` is added (the volume location is required; otherwise it must come from a fully specified name or the `netapp/location` property).

```bash
gcloud netapp volumes create NAME \
    --location=us-central1 \
    --capacity=1024 \
    --protocols=smb \
    --share-name=share2 \
    --storage-pool=sp2 \
    --description="test smb" \
    --security-style=ntfs \
    --smb-settings=SHOW_SNAPSHOT,SHOW_PREVIOUS_VERSIONS,ACCESS_BASED_ENUMERATION \
    --snap-reserve=0.1 \
    --async
```

```bash
gcloud netapp volumes list --location=us-central1
```

```bash
gcloud netapp volumes describe NAME --location=us-central1
```

### NetApp Volumes: mount instructions and export policy

```bash
sudo apt-get install nfs-common
```

```bash
gcloud netapp volumes describe VOLUME_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --format="value(mountOptions.instructions)"
```

```bash
gcloud netapp volumes update VOLUME_ID \
  --project=PROJECT_ID \
  --location=LOCATION \
  --export-policy=access-type=ACCESS_TYPE,allowed-clients=ALLOWED_CLIENTS_IP_ADDRESSES,has-root-access=TRUE_OR_FALSE,nfsv3=NFSV3,nfsv4=NFSV4
```

### NetApp Volumes: snapshots, revert and delete

```bash
gcloud netapp volumes snapshots create NAME \
  --location=us-central1 --volume=vol1
```

> **Warning**: reverting replaces the volume data with the snapshot contents; changes made to the volume after the snapshot was created are undone, including newer snapshots. Try it on a disposable volume first.

```bash
gcloud netapp volumes revert NAME --location=us-central1 \
  --snapshot="snapshot1"
```

> **Warning**: deleting a snapshot or volume is destructive. Try it on a disposable volume first.

```bash
gcloud netapp volumes snapshots delete NAME \
  --location=us-central1 --volume=vol1
```

```bash
gcloud netapp volumes delete NAME --location=us-central1
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--capacity-gib` | `lustre instances create` | Capacity in GiB |
| `--per-unit-storage-throughput` | `lustre instances create`, `update` | Throughput tier; `0` selects the dynamic tier (with `--dynamic-tier-options-mode=default-cache`; choices `default-cache`, `disabled`) |
| `--filesystem` | `lustre instances create` | File system name used when mounting |
| `--gcs-path-uri`, `--lustre-path` | `lustre instances import-data`, `export-data` | Cloud Storage path and Lustre directory |
| `--service-level` | `netapp storage-pools create` | Service level, for example `standard` |
| `--protocols` | `netapp volumes create` | Protocols such as `smb` |
| `--export-policy` | `netapp volumes update` | Export policy rule |
| `--async` | `netapp volumes create`, `delete` | Return without waiting for the operation |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Destructive: `lustre instances delete`, `netapp volumes delete`, `netapp volumes snapshots delete` and `netapp volumes revert` remove or overwrite data. Try them on disposable resources first.
- Parallelstore has no gcloud command group in gcloud 593.0.0, so no Parallelstore commands are listed.
- Managed Lustre and NetApp Volumes are managed file storage, not object APIs; Cloud Storage objects are covered in objects.md.
- Adapted from the official docs: the Lustre mount point `~/MOUNT_DIR` is changed to `/mnt/MOUNT_DIR` (fstab does not expand `~`); in the gcloud help examples for `storage-pools create` and `volumes create`, the values wrapped by `gcloud help` (`.../us-central1/\` + `networks/default`, `SHOW_PREVIOUS_VERSIONS,\` + `ACCESS_BASED_ENUMERATION`) are joined and one flag is put per line.
- Corrected from the official docs: the `volumes create` help example (`gcloud netapp volumes create NAME --capacity=1024 --protocols=smb ...`) has no `--location`; the volume resource "must be specified" with a location from the full name, `--location` or the `netapp/location` property, so `--location=us-central1` is added.
- `--snap-reserve` in the `volumes create` example is marked "(DEPRECATED)" in the gcloud 593.0.0 help ("The snap-reserve option is deprecated"); it is kept as in the help example, but you can omit it.
- The Lustre `instances update` help example writes `--description="<updated description>"`; it is shown as `UPDATED_DESCRIPTION`. The command is otherwise verbatim.
- The Lustre client packages must be installed before `modprobe lustre`; the Managed Lustre connect reference shows the signature-verified Ubuntu apt repository setup. The source's Rocky Linux / RHEL setup (`gcloud beta artifacts print-settings yum`) generates a yum repository with `gpgcheck=0` / `repo_gpgcheck=0` and is not reproduced; follow https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine for those images and install only on trusted networks.
- NetApp Volumes backup vaults are separate from Backup and DR backup vaults (see backup-dr.md).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/storage-pools/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/managed-lustre/docs/create-instance (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/networking (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/configure-and-use/volume-snapshots/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [filestore.md](./filestore.md)
- [backup-dr.md](./backup-dr.md)
- Managed Lustre: https://docs.cloud.google.com/managed-lustre/docs/create-instance
