---
source: https://docs.cloud.google.com/netapp/volumes/docs/quotas
---

# NetApp Volumes quotas and limits

Default quotas (adjustable, mostly via the console) and fixed system limits for NetApp Volumes. View current API quotas at https://console.cloud.google.com/apis/api/netapp.googleapis.com/quotas.

## Signature / Usage

Inode allocation rule (literal values from the source):

```text
1 inode per 32 KB of volume capacity
Standard/Premium/Extreme: minimum 21.2 million inodes per volume; linear growth beyond 683 GiB
Flex: about 31,000 inodes for a 1 GiB volume, linear at 1 inode per 32 KB
Hard limit: 2,040 million inodes per volume (per constituent for large capacity volumes)
```

Snippet: literal values from this page (the twin has no code).

## Options / Props

### Default quotas

| Resource | Default quota |
|---|---|
| Flex File and Flex Unified pool capacity per region | 25 TiB |
| Flex File and Flex Unified cross region replicated volumes per region | 5 |
| Flex File and Flex Unified volumes per region | 100 |
| Flex File and Flex Unified volumes with backup configuration per region | 10 |
| Flex File and Flex Unified pool throughput per region | 5120 MiBps |
| Flex File and Flex Unified pool IOPS per region | 160,000 |
| Standard pool capacity per region | 25 TiB |
| Standard cross region replicated volumes / hybrid replicated volumes per region | 5 / 1 |
| Standard volumes per region / with backup configuration | 100 / 10 |
| Premium and Extreme pool capacity per region | 25 TiB |
| Premium and Extreme cross region / hybrid replicated volumes per region | 5 / 1 |
| Premium and Extreme volumes per region / with backup configuration | 100 / 10 |
| Backup vaults per region (all service levels) | 10 |

### System limits

| Resource | Limit |
|---|---|
| Backups per volume; total scheduled backups; concurrent backups per Flex pool | 1,000; 1,000; 10 |
| Minimum pool capacity | Flex Unified and Flex File 1 TiB; Flex Unified large capacity 6 TiB; Standard/Premium/Extreme 2 TiB |
| Maximum pool capacity | Flex Unified regular 425 TiB; large capacity 2.48 PiB (20 PiB with auto-tiering); Standard 200 TiB; Premium/Extreme 10 PiB; Flex File 200 TiB (300 TiB custom performance) |
| Volumes per storage pool | Flex File 50; Flex Unified 1000 |
| Storage pools | Flex: 100 zonal pools per zone and 100 regional pools |
| Replications per pool | Flex Unified 100; Flex File 10 |
| VPC networks per project | 5 |
| Volumes per region | Flex Unified and Flex File 5,000 zonal per zone and 5,000 regional |
| Single volume capacity | Min: Flex 1 GiB, others 100 GiB. Max: Flex File 100 TiB (300 TiB custom); Flex Unified 300 TiB NFS/SMB, 128 TiB iSCSI; others 100 TiB |
| Large capacity volume | Flex Unified 4.8 TiB (2,400 GiB with custom member count) to 2.48 PiB / 20 PiB; Premium/Extreme 15 TiB to 3 PiB |
| Snapshots per volume | 255 |
| LUN / file size | 128 TiB LUN; file 128 TiB (16 TiB Flex File) |
| Directory size / filename | About 4 million files; 255 characters |
| NFS export rules per volume / rule length | 20 / 4,096 characters |
| User and group quota rules | 100 |
| UNIX groups for LDAP-enabled volumes | 1,024 |
| Active Directory policies per region | 5 |

## Notes

- If a project has no NetApp Volumes resources, create a storage pool or volume of the minimum capacity before requesting a quota increase so Google has the account information.
- When the inode limit is reached you cannot create files or directories even with free space; delete files or increase capacity. Auto-tiering does not reduce used inodes. Large capacity volumes count each constituent (24 for Premium/Extreme, 48 for Flex Unified Default-mode) separately.
- Example inode limits: 100 GiB gives 21.2 million (Standard/Premium/Extreme) and 3.1 million (Flex); 1024 GiB gives 31.8 million for both.
- Directory limit varies lower with long names or low-performance Flex pools.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-levels.md](./service-levels.md)
- [storage-pools-overview.md](./storage-pools-overview.md)
- [about-backups.md](./about-backups.md)
