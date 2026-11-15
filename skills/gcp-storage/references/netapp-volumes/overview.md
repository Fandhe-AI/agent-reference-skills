---
source: https://docs.cloud.google.com/netapp/volumes/docs/discover/overview
---

# About Google Cloud NetApp Volumes

NetApp Volumes is a fully managed file and block storage service with NFSv3, NFSv4.1, NFSv4.2, SMB, iSCSI and NVMe/TCP support, offered in several service levels that differ in price, performance, features and capabilities.

## Signature / Usage

Look up the mount instructions of a volume:

```bash
gcloud netapp volumes describe VOLUME_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --format="value(mountOptions.instructions)"
```

Snippet taken from https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (the overview twin has no code).

## Options / Props

| Service level | Positioning | Performance |
|---|---|---|
| Flex Unified | General purpose, advanced data management; Default-mode (fully managed) or ONTAP-mode | Throughput 64 MiBps to 5 GiBps in 1 MiBps steps, 16 IOPS included per MiBps, extra IOPS up to 160,000; large capacity pools up to 22 GiBps and 750,000 IOPS. Limited-performance regions: up to 1.6 GiBps and 90,000 IOPS, no large capacity pools |
| Standard | General purpose (NFS/SMB shares, SAP shared files, VMware Engine) | Up to 16 KiBps per GiB of volume capacity; max 1.6 GiBps per volume |
| Premium | Low-latency, performance-critical (Windows and enterprise NFS, databases, VDI, VMware Engine) | Up to 64 KiBps per GiB; max 4.5 GiBps per volume; 30 GiBps with large capacity volumes |
| Extreme | High throughput and low latency | Up to 128 KiBps per GiB; max 4.5 GiBps per volume; 30 GiBps with large capacity volumes |
| Flex File | General purpose NFS/SMB shares | Regular pools: up to 16 KiBps per GiB of pool capacity, max 1.6 GiBps per pool. Custom performance zonal pools: 64 MiBps to 5 GiBps, up to 160,000 IOPS |

## Notes

- Flex File: effective September 15, 2026 you cannot create new Flex File storage pools; existing pools remain supported (migration: https://docs.cloud.google.com/netapp/volumes/docs/get-started/migration-to-flex-unified).
- Key features: volume provisioning from 1 GiB to 3 PiB; protocols NFSv3, NFSv4.1, NFSv4.2, SMB 2.1 / 3.0 / 3.1.1, iSCSI, NVMe/TCP, S3 multiprotocol (ONTAP-mode only); automated snapshots, auto-tiering, backups, asynchronous volume replication, FlexCache, rapid cloning, high availability with SLA.
- Source inconsistency: this page gives Premium and Extreme as max 4.5 GiBps per volume; the service-levels page gives up to a maximum of 5 GiBps for regular volumes.
- Architecture: uses private services access (VPC peering) to connect your VPC to the NetApp Volumes VPC; a volume or pool cannot attach to multiple VPCs. Resources belong to the project where they are created; IAM protects management access only.
- Tools: gcloud CLI, Google Cloud console, Terraform provider. Regions: https://docs.cloud.google.com/netapp/volumes/docs/locations.
- NetApp Volumes is file/block storage, not an object API; distinct from Cloud Storage, Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/netapp/volumes/docs/discover/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (borrowed snippet)

## Related

- [service-levels.md](./service-levels.md)
- [storage-pools-overview.md](./storage-pools-overview.md)
- [networking.md](./networking.md)
