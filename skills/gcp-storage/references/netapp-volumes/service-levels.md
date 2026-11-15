---
source: https://docs.cloud.google.com/netapp/volumes/docs/discover/service-levels
---

# NetApp Volumes service levels

Feature and limit comparison across the Flex Unified, Flex File, and Standard / Premium / Extreme service levels. Flex Unified has Default-mode and ONTAP-mode, each as regular or large capacity pools.

## Signature / Usage

Per-GiB throughput formulas given by the source (literal values):

```text
Standard: up to 16 KiBps per GiB of provisioned volume capacity
Premium:  up to 64 KiBps per GiB of provisioned volume capacity
Extreme:  up to 128 KiBps per GiB of provisioned volume capacity
Up to a maximum of 5 GiBps for regular volumes and 30 GiBps for large capacity volumes
```

Snippet: literal values from this page (the twin has no code).

## Options / Props

| Feature | Flex Unified | Flex File | Standard / Premium / Extreme |
|---|---|---|---|
| Pool capacity | 1 to 425 TiB | 1 to 200 TiB (regular), 1 to 300 TiB (custom performance) | Standard 2 to 200 TiB; Premium/Extreme 2 TiB to 10 PiB |
| Large capacity pools | Zonal only, no iSCSI: 6 TiB to 2.48 PiB (no auto-tiering), 6 TiB to 20 PiB (auto-tiering) | No | Premium/Extreme 2 TiB to 10 PiB |
| Pool performance | Up to 5 GiBps and 160,000 IOPS; limited regions 1.6 GiBps and 90,000 IOPS; large volumes up to 22 GiBps and 750,000 IOPS | Default: 16 KiBps per GiB of pool; custom: up to 5 GiBps per zonal pool | See formulas above |
| Manual QoS | Yes | No | Yes |
| High availability | Zonal and regional (zonal for large capacity pools) | Zonal or regional, optional volume replication | Zonal, optional volume replication |
| Volume capacity | 1 GiB to 300 TiB; 1 GiB to 128 TiB (iSCSI, NVMe/TCP); 20 MiB to 300 TiB (ONTAP-mode) | 1 GiB to 100 TiB (regular), 300 TiB (custom performance) | 100 GiB to 100 TiB |
| Large capacity volumes (NFS/SMB) | Default 48 member volumes: 4.8 TiB to 2.48 PiB (20 PiB with auto-tiering); custom member count (min 2): 2,400 GiB and up; ONTAP-mode min 100 GiB | No | Standard no; Premium/Extreme 15 TiB to 3 PiB (allow-listed GA) |
| Auto-tiering | Yes, hot-tier autogrow | Custom-performance zonal pools in selected regions | Standard no; Premium/Extreme yes |
| Snapshots per volume | 255 (1,023 ONTAP-mode) | 255 | 255 |
| Clones | Thin and thick | Thick | Thick |
| Service level change | Change provisioned throughput/IOPS | No | Premium and Extreme interchangeable |
| NFS versions | NFSv3, NFSv4.1, NFSv4.2 | NFSv3, NFSv4.1 | NFSv3, NFSv4.1, NFSv4.2 |
| SMB | 2.1, 3.0, 3.1.1; workgroup mode in ONTAP-mode only | 2.1, 3.0, 3.1.1; domain mode only | 2.1, 3.0, 3.1.1; domain mode only |
| SMB and NFS on the same volume | Yes | No | Yes |
| iSCSI / NVMe/TCP / S3 multiprotocol | iSCSI on non-large pools; NVMe/TCP and S3 ONTAP-mode only | No | No |
| Customer-managed keys | Yes | Yes | Yes |
| Volume replication | Between regular Flex Unified pools, other zone or region | To Flex pools, other region | Standard to Standard; Premium/Extreme between each other, other region |
| Replication schedules | 10 minute, 1 hour, daily (custom in ONTAP-mode) | 10 minute, 1 hour, daily | 10 minute, 1 hour, daily |
| Backups | Manual and daily/weekly/monthly schedules; cross-region vaults; selective file restore | In-region only; no selective file restore, no CMEK backup | Same as Flex Unified |
| Immutable backups | Yes (allow-listed GA) | Yes (allow-listed GA) | Yes (allow-listed GA) |

## Notes

- Flex File: effective September 15, 2026 you cannot create new Flex File storage pools; existing pools remain supported.
- Source inconsistency: the overview page states Premium and Extreme volumes max 4.5 GiBps, while this page states up to 5 GiBps for regular volumes.
- Not reproduced: the full SMB / NFS / LDAP / Active Directory feature rows and the per-region support tables (Flex Unified, Flex File, Standard/Premium/Extreme availability per region; custom performance and limited-performance zone tables). Use the source URL for the region lists. Limited-performance regions for Flex Unified: `asia-northeast1`, `europe-west2`, `europe-west9`, `us-east5`, `us-west3`, `us-west2`.
- Distinct from Cloud Storage object classes (`gcp-storage` Cloud Storage pages): these are file-storage tiers.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/discover/service-levels (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [storage-pools-overview.md](./storage-pools-overview.md)
- [quotas.md](./quotas.md)
