---
source: https://docs.cloud.google.com/storage/docs/protection-backup-recovery-overview
---

# Data protection, backup, and recovery overview

Summary of Cloud Storage options to protect data from accidental or malicious deletion and recover from disasters, useful for legal or regulatory compliance and business-critical data.

## Signature / Usage

Retention period format accepted by the gcloud CLI for bucket retention policies (from Bucket Lock). Snippet taken from https://docs.cloud.google.com/storage/docs/bucket-lock:

```text
P#Y#M#W#DT#H#M#S
```

## Options / Props

| Feature | Summary | Use case |
|---|---|---|
| Object holds | Prevent individual objects from being deleted or overwritten with metadata flags | Data protection |
| Soft delete | Recovers deleted objects and retains them for a specified period before permanent deletion | Data protection |
| Object Versioning | Preserves deleted objects as noncurrent versions that remain accessible until explicitly removed | Data protection |
| Bucket lock | Retains all objects in a bucket for a minimum duration (per-bucket); locking the retention policy prevents it from being reduced or removed | Data protection |
| Object Retention Lock | Retains objects for a minimum duration per object; locking prevents the policy from being reduced or removed | Data protection |
| Dual-regions | Store data simultaneously in two geographically separate regions | Data redundancy |
| Turbo replication | Replicates data to both regions in a dual-region with an RPO of 15 minutes | Data redundancy |
| Cross-bucket replication | Asynchronously replicates data from a source bucket to a destination bucket in a different location | Data redundancy |
| Backup and DR Service | Managed backup and disaster recovery for VMs and other workloads: back up Persistent Disk snapshots of Compute Engine VMs to Cloud Storage buckets, monitoring/auditing/reporting for compliance, ransomware insights | Data backup, disaster recovery |
| Storage Transfer Service | Migrates or replicates data to, from, or between object and file storage systems (Cloud Storage, Amazon S3, on-premises) | Data backup, data migration |
| Transfer Appliance | Transfers large amounts of data from on-premises to Cloud Storage using a physical appliance | Data backup, data migration |

## Notes

- Official pages for dual-regions, turbo replication, cross-bucket replication, Backup and DR Service, Storage Transfer Service and Transfer Appliance are outside this category; see https://docs.cloud.google.com/storage/docs/locations, https://docs.cloud.google.com/storage/docs/availability-durability#turbo-replication, https://docs.cloud.google.com/storage/docs/using-cross-bucket-replication, https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr, https://docs.cloud.google.com/storage-transfer/docs/overview and https://docs.cloud.google.com/transfer-appliance/docs/4.0/overview.
- Source inconsistency: this page says Backup and DR Service lets you "Back up Persistent Disk snapshots of your Compute Engine VMs to Cloud Storage buckets"; the Backup and DR overview (https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr) lists two storage targets, Google-managed backup vault storage (recommended; isolated, immutable and indelible) and self-managed storage (Persistent Disk snapshots and Cloud Storage buckets in your projects, used through the appliance management console). Backups land in your own Cloud Storage buckets only in the self-managed case.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/protection-backup-recovery-overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/bucket-lock

## Related

- [object-versioning.md](./object-versioning.md)
- [soft-delete.md](./soft-delete.md)
- [bucket-lock.md](./bucket-lock.md)
- [object-lock.md](./object-lock.md)
- [object-holds.md](./object-holds.md)
- [lifecycle.md](./lifecycle.md)
