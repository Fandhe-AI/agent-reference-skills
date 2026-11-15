---
source: https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine
---

# Connect from a Compute Engine client (Managed Lustre)

Create a Compute Engine client, install the Lustre client packages from Artifact Registry, load the kernel module and mount a Managed Lustre instance. Up to 20,000 clients can connect to one instance; create client VMs in the same zone as the instance.

## Signature / Usage

### Create a VM

Supported images: Rocky Linux 8 (HPC), Rocky Linux 9, RHEL 9, Ubuntu 20.04 LTS (v20250213 or later; end of support, not selectable in the console), Ubuntu 22.04 LTS (v20250128 or later), Ubuntu 24.04 LTS (Arm VMs only). Rocky Linux 9 example:

```bash
gcloud compute instances create VM_NAME \
  --project=PROJECT_ID \
  --zone=LOCATION \
  --machine-type=c2d-standard-112 \
  --scopes="https://www.googleapis.com/auth/cloud-platform" \
  --network-interface=stack-type=IPV4_ONLY,subnet=SUBNET_NAME,nic-type=GVNIC \
  --network-performance-configs=total-egress-bandwidth-tier=TIER_1 \
  --create-disk=auto-delete=yes,boot=yes,device-name=VM_NAME,\
image-project=rocky-linux-cloud,image-family=rocky-linux-9,\
mode=rw,size=100,type=pd-balanced
```

Ubuntu 22.04 LTS (startup script keeps client modules in sync after kernel updates):

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

For multiple NICs, add another `--network-interface=subnet=SUBNET_NAME_2,no-address,nic-type=GVNIC` flag per NIC.

### SSH through IAP

```bash
gcloud compute firewall-rules create FIREWALL_RULE_NAME \
  --allow=tcp:22 \
  --network=NETWORK_NAME \
  --source-ranges=35.235.240.0/20 \
  --project=PROJECT_ID
```

```bash
gcloud compute ssh VM_NAME \
  --zone=LOCATION \
  --project=PROJECT_ID \
  --tunnel-through-iap
```

### Install the client packages (Ubuntu 22.04 LTS)

The Rocky Linux 8 / Rocky Linux 9 / RHEL 9 package installation is not reproduced on this page (see Notes); follow the official page for those images.

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

Ubuntu 20.04 uses `lustre-client-ubuntu-focal` and 24.04 uses `lustre-client-ubuntu-noble` in the same commands.

### Load the module and mount

```bash
sudo modprobe lustre
```

Multi-NIC (`/etc/modprobe.d/lustre.conf`, then `sudo modprobe lustre`, verify with `sudo lctl list_nids`):

```text
options lnet networks="tcp0(eth0, eth1)"
```

```bash
gcloud lustre instances describe INSTANCE_NAME \
  --location=ZONE
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

## Options / Props

| Item | Detail |
|------|--------|
| Required roles | Compute Instance Admin (v1) `roles/compute.instanceAdmin.v1` (create VM); Compute Admin `roles/compute.admin` or Compute Security Admin `roles/compute.securityAdmin` (firewall rule); IAP-Secured Tunnel User `roles/iap.tunnelResourceAccessor` (SSH via IAP) |
| Recommended machine type | At least `c2-standard-4`; per-VM egress is generally 2 Gbps per vCPU up to the machine maximum; C2 with Tier_1 up to 100 Gbps, C3 up to 200 Gbps |
| Disk type | `hyperdisk-balanced` for 4th-gen families (`c4`, `c4a`, `n4`); `pd-balanced` for `c2d`, `c2`, `n2` |
| IAP source range | `35.235.240.0/20` |
| `/etc/fstab` options | `lustre` type, `defaults`, `_netdev` (wait for network), `0 0` |

## Notes

- Limitation: Managed Lustre cannot be mounted on Shielded VMs.
- Console SSH to a VM with a public IP may bypass IAP and need a broader source range such as `0.0.0.0/0`; the source recommends allowing only the IAP range and using `gcloud compute ssh --tunnel-through-iap`.
- Lustre client packages are kernel-version specific; re-run the install commands after an automatic Ubuntu kernel update (or use the startup script). DKMS support for custom kernels: https://docs.cloud.google.com/managed-lustre/docs/dkms.
- Secondary NIC and multi-NIC routing need manual `ip route` / `ip rule` configuration that does not persist across reboots. Source inconsistency: the secondary-NIC text says to convert the mount IP to a /23 CIDR block but the example uses `172.16.0.0/24`.
- For instances created with the deprecated `--gke-support-enabled` flag, Compute Engine clients must set `options lnet accept_port=6988` in `/etc/modprobe.d/lnet.conf` and reboot.
- `apt` commands in the source omit `-y`; the VM startup script uses `-y`.
- The source also shows Console steps, Ubuntu 20.04/24.04 and Rocky 8 VM commands, and the POSIX exceptions page (https://docs.cloud.google.com/managed-lustre/docs/posix-compliance).
- File storage, not object storage; unrelated to Cloud Storage buckets.
- Omitted: the source's HPC Rocky Linux 8 / Rocky Linux 9 / RHEL 9 steps pipe `gcloud beta artifacts print-settings yum` (repository `lustre-client-rocky-8` or `lustre-client-rocky-9`) into `sudo bash` and then `yum install` the `kmod-lustre-client` / `lustre-client` kernel-module packages; the yum repository definition that command generates sets `repo_gpgcheck=0` and `gpgcheck=0` (gcloud 593.0.0 template), so packages and metadata are not signature-checked, and those blocks are not reproduced. Use the official page https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine for those images and install only on trusted networks. The Ubuntu apt path above verifies packages through the `signed-by` keyrings.
- The VM examples use the default Compute Engine service account with the `cloud-platform` scope; in production attach a dedicated service account (`--service-account=SA_EMAIL`) with only the roles the client needs (Artifact Registry read access for the package repositories).
- Corrected from the official docs: the `/etc/fstab` line `IP_ADDRESS@tcp:/FILESYSTEM_NAME ~/MOUNT_DIR lustre defaults,_netdev 0 0` used `~/MOUNT_DIR`, which fstab does not expand (fstab mount points must be absolute); it and the `mkdir` / `mount` / `lfs df` / `umount` commands (`~/MOUNT_DIR`) now use `/mnt/MOUNT_DIR`.
- Adapted from the official docs: the apt source `deb [signed-by=/usr/share/keyrings/google-cloud.gpg] http://packages.cloud.google.com/apt apt-transport-artifact-registry-stable main` was changed to `https://`.
- Source: https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-lustre-create-instance.md](./managed-lustre-create-instance.md)
- [managed-lustre-quotas.md](./managed-lustre-quotas.md)
