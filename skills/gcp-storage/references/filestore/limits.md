---
source: https://docs.cloud.google.com/filestore/docs/limits
---

# Filestore quotas and limits

Quotas and limits for instances, snapshots, clients, VPC networks, capacity, file size, file count, file locks, backup rates and agent volumes.

## Signature / Usage

Check file-count usage on a mounted share (`IUsed` is the current number of files, `IFree` the number you can still add):

```bash
df -i
```

## Options / Props

Number of instances: limited only by project/region Filestore quota and minimum share capacity (32 TiB of quota allows 32 instances of 1 TiB). Maximum recommended snapshots per instance: Zonal, Regional, Enterprise 240; Basic not supported.

Client connections:

| Service tier | Custom performance off | Custom performance on |
|---|---|---|
| Basic HDD / Basic SSD | 500 connections per instance | Not supported |
| Zonal (1 to 9.75 TiB) | 2,000 per 1 TiB, increments of 500, up to 19,500 | 100 per 1,000 purchased IOPS |
| Zonal (10 to 100 TiB) | 8,000 per 10 TiB, increments of 2,000, up to 80,000 | 100 per 1,000 purchased IOPS |
| Regional (100 GiB to 10,239 GiB) | 2,000 per 1 TiB, increments of 500, up to 19,500 | 100 per 1,000 purchased IOPS |
| Regional (10 to 100 TiB) | 8,000 per 10 TiB, increments of 2,000, up to 80,000 | 100 per 1,000 purchased IOPS |
| Enterprise | 2,000 per 1 TiB, increments of 500, up to 20,000 | Not supported |

| Service tier | Capacity | Max file size | Max files |
|---|---|---|---|
| Basic HDD | 1 TiB to 63.9 TiB | 16 TiB | 67,108,864 per 1 TiB |
| Basic SSD | 2.5 TiB to 63.9 TiB | 16 TiB | 67,108,864 per 1 TiB |
| Zonal (lower) | 1 TiB to 9.75 TiB | up to instance capacity | about 89,000,000 per 1 TiB |
| Zonal (higher) | 10 TiB to 100 TiB | up to instance capacity | about 89,000,000 per 1 TiB |
| Regional (lower) | 100 GiB to 10,239 GiB | up to instance capacity | about 89,000,000 per 1 TiB |
| Regional (higher) | 10 TiB to 100 TiB | up to instance capacity | about 89,000,000 per 1 TiB |
| Enterprise | 1 TiB to 10 TiB | up to instance capacity | about 89,000,000 per 1 TiB |

| Other limit | Value |
|---|---|
| Unique VPC networks used with Filestore | 49, even if previously used networks are deleted (see troubleshooting error code 13) |
| Recommended file-locking clients per instance | Basic 128; Zonal, Regional, Enterprise 250 |
| Backup operations (create, in-place restore, create instance from backup) | once per 10 minutes steady state; burst at most 6 requests in 60 minutes |
| Enterprise multishares minimum share capacity | 10 GiB |

Filestore agent volumes (elastic NFS backed by regional volume pools):

| Resource or operation | Limit |
|---|---|
| Maximum volume pool capacity | 400 TiB of `HOT` by default (up to 5 PB including `COLD`) |
| Maximum volumes per pool | 20,000,000 |
| Maximum concurrently active volumes | 50,000 |
| Volume capacity range | 100 MiB to 100 GiB |
| Throughput / IOPS per volume | up to 400 MB/s / 10,000 IOPS |
| VPC client IPs per pool | 2,000 |
| Mount (resume) / unmount (pause) latency | under 100 ms |
| Volume creation and deletion latency | under 2 seconds |
| Tiering to Cold / to Hot | 3 s/GB or 1.5 s/10,000 files / 1.5 s/GB or 1.5 s/10,000 files |
| Workspace cloning (from snapshot) | 3 s/GB or 1.5 s/10,000 files |
| Mount protocol / access modes | NFSv3 / ReadWriteMany (RWX), ReadOnlyMany (ROX) |

## Notes

- File counts indicate the maximum for small or empty files; supported counts fall as file size grows. A very large number of files can delay performance.
- Exceeding the recommended file-locking clients introduces inconsistent locking that may cause outages during maintenance.
- Source: https://docs.cloud.google.com/filestore/docs/limits (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-tiers.md](./service-tiers.md)
- [snapshots.md](./snapshots.md)
- [backups.md](./backups.md)
