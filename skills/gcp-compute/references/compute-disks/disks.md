---
source: https://docs.cloud.google.com/compute/docs/disks
---

# Choose a disk type

Compute Engine offers block storage (also called disks or volumes) for boot and data volumes of VMs, containers and bare metal instances. Temporary storage is Local SSD (including Titanium SSD); durable storage is Hyperdisk or Persistent Disk. The terms disk, volume and block storage volume are synonymous across the docs, console, gcloud CLI and REST API.

## Signature / Usage

### Decision steps

The source contains no commands for this page. After choosing a type, create the disk (the type is selected with the `--type` flag described in the type-specific pages):

```bash
gcloud compute disks create my-disk-1 my-disk-2 --zone=us-east1-a
```

1. Decide whether you need durable or temporary storage. A boot volume must be durable.
2. For temporary storage, use Local SSD if it is available for your machine series.
3. For durable storage, use Hyperdisk if it is available for your machine series; otherwise use Persistent Disk.
4. Pick the Hyperdisk type or Persistent Disk type that fits the workload.

## Options / Props

| Storage | Durable | Boot volume | Notes |
|---------|---------|-------------|-------|
| Local SSD / Titanium SSD | No (data lost if the VM stops for any reason) | No | Fastest; scratch data, caches (for example `tempdb` for SQL Server), flash-optimized databases |
| Hyperdisk | Yes | Yes (type dependent) | Recommended; performance configurable independently of size; higher IOPS and throughput limits than Persistent Disk |
| Persistent Disk | Yes | Yes | Not available with the latest machine series; performance depends on provisioned capacity |

Hyperdisk and Persistent Disk characteristics: function as physical disks (network-attached), portable (attach to a running instance without downtime; detach to keep data after instance deletion), encrypted at rest and in transit by default (own keys optional), optional replication across two zones.

### Billing

- Billed for provisioned capacity from creation until deletion (Local SSD, Persistent Disk, Hyperdisk).
- Charges continue for automatically created boot volumes, durable volumes attached to a stopped or suspended instance, and unattached durable volumes.
- Hyperdisk and Extreme Persistent Disk are also billed for provisioned performance. Hyperdisk ML bills provisioned throughput only; Hyperdisk Balanced bills provisioned IOPS and throughput.
- Pricing: https://cloud.google.com/compute/disks-image-pricing (prices are not copied here).

## Notes

- Alternatives to block storage named in the source: a file server or distributed file system on Compute Engine (NFSv3 / SMB3), and a RAM disk mounted within VM memory. Compare other Google Cloud storage options in the Architecture Center storage advisor (https://docs.cloud.google.com/architecture/storage-advisor#review_the_storage_options).
- Filestore, Cloud Storage and other storage products are in `gcp-storage`; Compute Engine disks are covered in this skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/create (gcloud 593.0.0 help).
- Source inconsistency: this page says "the stored data is lost if the VM stops for any reason. Data is lost if you stop, suspend, or restart the VM, or if the VM crashes or fails.", while local-ssd.md (compute-disks) says "Compute Engine preserves the data on Local SSD disks only in certain scenarios", including "You reboot the guest operating system (OS).", live migration during host maintenance, and "You opt to preserve the Local SSD data when you stop or suspend the instance (Preview)." The loss on stop or suspend is the default; the preserve option is Preview.
- Source (Local SSD data persistence): https://docs.cloud.google.com/compute/docs/disks/local-ssd (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/disks (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [persistent-disks.md](./persistent-disks.md)
- [hyperdisks.md](./hyperdisks.md)
- [local-ssd.md](./local-ssd.md)
- [disk-encryption.md](./disk-encryption.md)
