---
source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-storage-pool
---

# Quickstart: Create a storage pool

Console quickstart for creating a NetApp Volumes storage pool for NFS volumes: choose location, service level, capacity (and throughput/IOPS for Flex), connect a VPC through private services access, and use Google-owned encryption.

## Signature / Usage

The console flow depends on private services access being set up. The CLI form of that setup:

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

Snippet taken from https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/networking (the quickstart twin has no code).

## Options / Props

| Console field | Detail |
|---|---|
| Name | Unique per project; optional description |
| Location | All volumes in the pool live here |
| Service level | Flex Unified (Default-mode or ONTAP-mode), Flex File, Standard, Premium, Extreme |
| Availability | Flex Unified and Flex File: zonal (specify zone) or regional (primary zone and replica zone) |
| Performance | Optional Throughput and IOPS for Flex Unified pools and regions with Flex zonal custom performance |
| Capacity | Pool capacity |
| Set up connections | Select VPC; if not peered, enable the Service networking API and choose an automatic or manual IP range (cannot be changed once volumes use it) |
| Active Directory policy | Quickstart disables it (NFS); SMB requires an Active Directory policy first |
| Encryption | Default Google-owned and Google-managed key |

## Notes

- Before you begin: set up the project, configure networking, and grant NetApp Volumes IAM permissions.
- Flex File: effective September 15, 2026 you cannot create new Flex File storage pools (existing pools remain supported).
- Clean up deletes the pool and its contents (Console: Storage pools, Delete, type the pool name to confirm). Destructive: try it on a disposable pool first.
- The source shows Console steps only; no gcloud pool-creation command is given.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-storage-pool (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/networking (borrowed snippet)

## Related

- [storage-pools-overview.md](./storage-pools-overview.md)
- [create-volume.md](./create-volume.md)
- [networking.md](./networking.md)
