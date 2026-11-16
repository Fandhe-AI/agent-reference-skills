---
source: https://docs.cloud.google.com/compute/docs/machine-images
---

# About machine images

A machine image is a Compute Engine resource that stores the configuration, metadata, permissions and data from multiple disks of an instance, for maintenance, backup and recovery, and instance cloning.

## Signature / Usage

### Find the storage size (for pricing)

```
gcloud compute machine-images describe MACHINE_IMAGE_NAME
```

Replace `MACHINE_IMAGE_NAME` with the machine image name. Then read `totalStorageBytes` at the end of the output:

```
.......
storageLocations:
- us
totalStorageBytes: '58688064'
```

Convert bytes to GB or GiB (1 GiB = 2^30 bytes) and use the disk pricing table (https://docs.cloud.google.com/compute/disks-image-pricing) or the Pricing Calculator.

## Options / Props

### Machine image vs other resources

| Scenario | Machine image | Standard disk snapshot | Custom image | Instance template |
|---|---|---|---|---|
| Single disk backup | Yes | Yes | Yes | No |
| Multiple disk backup | Yes | No | No | No |
| Differential backup | Yes | Yes | No | No |
| Instance cloning | Yes | No | Yes | Yes |
| Base image for replication | No | No | Yes | No |

### Collected and not collected

| Collected | Not collected |
|---|---|
| Description, machine type, instance metadata, labels, network tags, maintenance policy, UEFI variables (if applicable) | Data in memory |
| Volume mapping used to create the source instance's disks | Data on attached Local SSD disks (the device mapping is captured) |
| Disk data at consistent points in time across disks | Source-specific attributes such as name or IP address |

## Notes

- Disks are backed up as differential snapshots: the first machine image has a full copy, later ones are differential.
- Consistency across disks is crash-consistent at the I/O level using globally consistent timestamps; it is not application-level consistency.
- Storage location: set `storageLocation` at creation, a Cloud Storage multi-region (for example `asia`) or region (for example `asia-south1`). Default is the multi-region bucket containing the source instance or the closest one (for example `us-central1` stores in `us`; `australia-southeast1` maps to `asia`). Machine images stay globally accessible with proper permissions.
- Cost depends on size (blocks written on source disks) and storage location.
- Instance templates (planned for another category of this skill) are covered at https://docs.cloud.google.com/compute/docs/instance-templates.
- The source also shows no create/restore procedures; see https://docs.cloud.google.com/compute/docs/machine-images/create-machine-images.
- Source: https://docs.cloud.google.com/compute/docs/machine-images (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [snapshots.md](./snapshots.md)
- [images.md](./images.md)
- [data-protection.md](./data-protection.md)
