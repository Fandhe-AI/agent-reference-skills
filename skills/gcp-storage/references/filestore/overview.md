---
source: https://docs.cloud.google.com/filestore/docs/overview
---

# Filestore overview

Filestore instances are fully managed file servers on Google Cloud (NFS) that connect to Compute Engine VMs, GKE clusters, Google Cloud VMware Engine datastores, on-premises machines, Cloud Run services, and AI agent fleets and sandboxes. Capacity scales without downtime.

## Signature / Usage

Mount a Filestore share on a Linux client (full procedure in [mounting-fileshares.md](./mounting-fileshares.md)):

```bash
sudo mount 10.0.1.2:/share1 /mnt/render
```

## Options / Props

| Protocol | Supported tiers | Highlights |
|---|---|---|
| NFSv3 | All service tiers | Bidirectional client/server communication; VPC Network Peering, private services access, Private Service Connect |
| NFSv4.1 | Zonal, regional, enterprise | Client/server authentication, message integrity checks, in-transit encryption (Kerberos `krb5p`); same connectivity options |

| Topic | Detail |
|---|---|
| Connectivity | Clients on the same VPC (including Shared VPC); remote networks via Cloud VPN or Cloud Interconnect |
| Custom performance | Set IOPS independent of capacity; regional and zonal tiers; GKE can adjust without downtime |
| Encryption at rest | Default Google-managed keys; optional CMEK; deleting an instance discards the encryption info |
| Encryption in transit | NFSv3 not encrypted; NFSv4.1 supports Kerberos `krb5p`; traffic to and within Google Cloud is encrypted |
| Access control | IP-based rules per instance; IAM roles for Filestore resources |
| Backups | Point-in-time copies of an instance (any region), restorable in any region |
| Snapshots | In-instance point-in-time state; restore files/directories or revert the instance |
| Zonal/Basic reliability | Zonal resources; unavailable during a zone outage |
| Regional/Enterprise reliability | Transparent failover during zone failures; strict consistency (writes acknowledged after persisted); console/API operations may be unavailable for hours; cannot create new regional/enterprise instances during a zone failure |
| Instance replication | Async replication to a standby instance in another region (zonal, regional, enterprise); promote on regional outage |

## Notes

- Compared with Cloud Storage FUSE, Filestore offers POSIX compliance, hard links and file locking, and concurrency control for multiple writers. Compared with Persistent Disk, it provides multiple-reader multiple-writer access (for example GKE PersistentVolumes mounted read-write by many nodes).
- Filestore (like NetApp Volumes) is file storage; distinct from Cloud Storage object APIs, Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Networking requirements: https://docs.cloud.google.com/filestore/docs/network-ip-requirements; NFS ports and firewall: https://docs.cloud.google.com/filestore/docs/configuring-firewall
- Snippet taken from https://docs.cloud.google.com/filestore/docs/mounting-fileshares.
- Source: https://docs.cloud.google.com/filestore/docs/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-tiers.md](./service-tiers.md)
- [creating-instances.md](./creating-instances.md)
- [mounting-fileshares.md](./mounting-fileshares.md)
- [backups.md](./backups.md)
- [snapshots.md](./snapshots.md)
- [regions.md](./regions.md)
