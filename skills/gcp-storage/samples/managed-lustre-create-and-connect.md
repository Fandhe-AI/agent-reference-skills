---
source: https://docs.cloud.google.com/managed-lustre/docs/create-instance
---

# Create a Managed Lustre Instance and Connect from Compute Engine

Create a Managed Lustre file system, check its creation status, and mount it on an Ubuntu 22.04 LTS Compute Engine client.

## Signature / Usage

### Create the instance

```bash
gcloud lustre instances create INSTANCE_ID \
  --per-unit-storage-throughput=PER_UNIT_STORAGE_THROUGHPUT \
  --capacity-gib=CAPACITY_GIB \
  --filesystem=FILESYSTEM \
  --location=LOCATION \
  --network=NETWORK_PATH
```

### Check status

```bash
gcloud lustre instances describe INSTANCE_NAME \
  --location=ZONE
```

Note the `mountPoint` (for example `10.115.0.3@tcp:/testfs`) and file system name. The create and describe commands come from different source sections: `INSTANCE_NAME` is the `INSTANCE_ID` you created and `ZONE` is the zone you passed as `LOCATION`.

### Create a client VM (Ubuntu 22.04 LTS)

```bash
gcloud compute instances create VM_NAME \
  --project=PROJECT_ID \
  --zone=LOCATION \
  --machine-type=c2d-standard-112 \
  --scopes="https://www.googleapis.com/auth/cloud-platform" \
  --network-interface=stack-type=IPV4_ONLY,subnet=SUBNET_NAME,nic-type=GVNIC \
  --network-performance-configs=total-egress-bandwidth-tier=TIER_1 \
  --create-disk=auto-delete=yes,boot=yes,device-name=VM_NAME,\
image-project=ubuntu-os-cloud,image-family=ubuntu-2204-lts,\
mode=rw,size=100,type=pd-balanced \
  --metadata=startup-script='#!/bin/bash
    sudo apt-get update
    sudo apt-get install -y lustre-client-modules-$(uname -r)'
```

### Install the client

Adapted (not in the official docs): the apt transport source URL is changed from `http://` to `https://`.

```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/google-cloud.gpg
curl -fsSL https://us-apt.pkg.dev/doc/repo-signing-key.gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/lustre-client.gpg
echo 'deb [signed-by=/usr/share/keyrings/google-cloud.gpg] https://packages.cloud.google.com/apt apt-transport-artifact-registry-stable main' \
  | sudo tee /etc/apt/sources.list.d/artifact-registry.list
sudo apt update && sudo apt install apt-transport-artifact-registry
echo "deb [signed-by=/usr/share/keyrings/lustre-client.gpg] ar+https://us-apt.pkg.dev/projects/lustre-client-binaries lustre-client-ubuntu-jammy main" \
  | sudo tee -a /etc/apt/sources.list.d/artifact-registry.list
sudo apt update
sudo apt install lustre-client-modules-$(uname -r)/lustre-client-ubuntu-jammy
sudo apt install lustre-client-utils/lustre-client-ubuntu-jammy
```

### Load the module and mount

```bash
sudo modprobe lustre
```

Adapted (not in the official docs): mount point `~/MOUNT_DIR` changed to the absolute `/mnt/MOUNT_DIR`.

```bash
sudo mkdir -p /mnt/MOUNT_DIR
sudo mount -t lustre IP_ADDRESS:/FILESYSTEM_NAME /mnt/MOUNT_DIR
```

Adapted (not in the official docs): mount point `~/MOUNT_DIR` changed to `/mnt/MOUNT_DIR` to match the mount above.

```bash
sudo lfs df -h /mnt/MOUNT_DIR
sudo umount /mnt/MOUNT_DIR
```

## Options / Props

| Flag | Description |
|---|---|
| `--per-unit-storage-throughput` | MBps per TiB: `0`, `125`, `250`, `500`, `1000`; the create page says the tier cannot change after creation, but `gcloud lustre instances update` accepts this flag (see Notes). `0` plus `--dynamic-tier-options-mode=default-cache` (REST value `DEFAULT_CACHE`) is the Dynamic tier |
| `--capacity-gib` | 9,000 to 84,016,000 GiB; can be increased later |
| `--filesystem` | 8 characters or fewer, letters and numbers, case-sensitive |
| `--location` | A supported zone, same zone as the clients |
| `--network` | `projects/PROJECT_ID/global/networks/NETWORK`, same network as clients |

## Notes

- Required role: Managed Lustre Admin (`roles/lustre.admin`) with the Managed Lustre API enabled. Creation takes 15 minutes to several hours.
- Managed Lustre cannot be mounted on Shielded VMs. Up to 20,000 clients can connect to one instance.
- Omitted: the source's HPC Rocky Linux 8 / Rocky Linux 9 / RHEL 9 client steps pipe `gcloud beta artifacts print-settings yum` (repository `lustre-client-rocky-8` or `lustre-client-rocky-9`) into `sudo bash` and then `yum install` the `kmod-lustre-client` / `lustre-client` kernel-module packages; the generated yum repository definition sets `repo_gpgcheck=0` and `gpgcheck=0` (gcloud 593.0.0 template), so packages and metadata are not signature-checked, and this sample uses the Ubuntu 22.04 apt path (verified through the `signed-by` keyrings) instead. For Rocky Linux / RHEL clients, follow https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine and install only on trusted networks.
- Lustre client packages are kernel-version specific; the VM startup script reinstalls `lustre-client-modules-$(uname -r)` after an automatic Ubuntu kernel update. The source's `apt install` commands omit `-y`.
- The VM example uses the default service account with the `cloud-platform` scope; in production attach a dedicated service account (`--service-account=SERVICE_ACCOUNT_EMAIL`).
- Adapted from the official docs: the apt source `deb [signed-by=/usr/share/keyrings/google-cloud.gpg] http://packages.cloud.google.com/apt apt-transport-artifact-registry-stable main` was changed to `https://`; `sudo mkdir -p ~/MOUNT_DIR`, `sudo mount ... ~/MOUNT_DIR`, `sudo lfs df -h ~/MOUNT_DIR` and `sudo umount ~/MOUNT_DIR` now use `/mnt/MOUNT_DIR`, to keep one absolute mount point across mount, `lfs df` and `umount` and to match the `/etc/fstab` entry the source shows (fstab does not expand `~`).
- The source also shows Console tabs, Ubuntu 20.04 / 24.04 clients, `/etc/fstab` persistence and multi-NIC setup.
- This is POSIX file storage, unrelated to Cloud Storage buckets (object storage).
- Source inconsistency: the create page says "You cannot change an instance's performance tier after it has been created", but `gcloud lustre instances update` (gcloud 593.0.0) accepts `--per-unit-storage-throughput` (valid values 0, 125, 250, 500, 1000; for a Dynamic-tier instance it "must not be set or must be set to zero").
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/create (`--dynamic-tier-options-mode`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/update (`--per-unit-storage-throughput`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/managed-lustre/docs/create-instance (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [filestore-create-and-mount.md](./filestore-create-and-mount.md)
- https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine
