---
source: https://docs.cloud.google.com/netapp/volumes/docs/configure-and-use/storage-pools/overview
---

# About storage pools

A storage pool is the container for volumes. All volumes in a pool share location, service level, VPC network, Active Directory policy, LDAP settings and CMEK policy. Billing is based on location, service level and pool capacity, independent of volume consumption.

## Signature / Usage

Pool lifecycle states (literal values from the source):

```text
CREATING -> READY
READY -> UPDATING -> READY
Flex Unified: DEGRADED (planned maintenance, internal updates, infrastructure failures)
```

Snippet: literal state names from this page (the twin has no code).

## Options / Props

| Service level | Throughput | Workload types |
|---|---|---|
| Flex Unified | Independent scaling of capacity and performance up to 5 GiBps | General purpose, databases and applications, high-performance applications |
| Flex File | Default 16 KiBps per GiB of pool; custom: independent scaling up to 5 GiBps | General purpose |
| Standard | 16 KiBps per GiB of volume capacity | General purpose |
| Premium | 64 KiBps per GiB of volume capacity | Databases and applications |
| Extreme | 128 KiBps per GiB of volume capacity | High-performance applications |

| Pool creation time | Duration |
|---|---|
| Standard, Premium, Extreme | A few seconds |
| Flex File | 15 to 20 minutes |
| Flex Unified regular | About 20 minutes |
| Large capacity pools | About 45 minutes |

## Notes

- Flex File: effective September 15, 2026 you cannot create new Flex File storage pools (existing pools remain supported).
- Flex Unified ONTAP-mode pools configure Active Directory and LDAP in ONTAP, not through Google APIs or console.
- Regional pools keep two synchronous replicas in two zones (active and replica zone); a zone switch can pause file service. Zonal vs regional choice is available for Flex Unified and Flex File non-custom performance.
- A pool can have one Active Directory policy (several per region). Auto-tiering must be enabled on the pool first and the choice is permanent; for Flex custom performance enable it at creation. Large capacity vs regular Flex Unified pool type cannot be switched.
- Premium and Extreme volumes can move between pools without data copy when location, network, AD, LDAP and CMEK settings match; other moves copy data and assign new access paths.
- DEGRADED pools: no pool updates, cross-region replication, CMEK-backed volume creation, CMEK migration or CMEK pool creation; write latency rises and max write throughput drops up to 60%; recovery is automatic (minutes, rarely hours). Planned maintenance and internal updates are not subject to the SLA. Pool updates take seconds (Standard/Premium/Extreme) or minutes (Flex).
- Source: https://docs.cloud.google.com/netapp/volumes/docs/configure-and-use/storage-pools/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-levels.md](./service-levels.md)
- [create-storage-pool.md](./create-storage-pool.md)
- [quotas.md](./quotas.md)
