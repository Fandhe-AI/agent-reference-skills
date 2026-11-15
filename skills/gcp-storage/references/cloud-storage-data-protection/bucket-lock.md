---
source: https://docs.cloud.google.com/storage/docs/bucket-lock
---

# Bucket Lock (retention policies)

Bucket Lock lets you set a retention policy on a bucket (how long objects must be kept) and optionally lock the policy so it can never be reduced or removed. It can provide immutable storage and, with Detailed audit logging mode, help with regulatory requirements such as FINRA, SEC, CFTC and certain health care retention rules.

## Signature / Usage

gcloud retention period format (verbatim from the source):

```text
P#Y#M#W#DT#H#M#S
```

Each `#` is an integer followed by a unit: `Y`, `W`, `D`, `H`, `S` mean years, weeks, days, hours, seconds. `M` means months after `P` and minutes after `T`. Include at least one integer-unit pair and omit the ones you do not need. Example: `P1DT720M` is 1 day and 720 minutes (one and a half days).

### Behavior

- Objects can be deleted or replaced only once their age exceeds the retention period. The policy applies retroactively to existing objects and to new objects.
- Attempts to delete or replace objects younger than the retention period fail with `403 - retentionPolicyNotMet`.
- Example: with a 1-year period, an object added a month ago cannot be deleted or replaced for another 11 months, while a 2-year-old object can be deleted or replaced immediately; a replacement starts at age 0.
- Objects in a bucket with a retention policy carry retention expiration time metadata; the policy has an effective time after which all objects are guaranteed compliant.

## Options / Props

| Item | Value |
|---|---|
| Retention period unit | seconds |
| Day | 86,400 seconds |
| Week | 7 days = 604,800 seconds |
| Month | 31 days = 2,678,400 seconds |
| Year | 365.25 days = 31,557,600 seconds |
| Maximum retention period | 3,155,760,000 seconds (100 years) |
| Unlocked policy | Can be increased, decreased, or removed |
| Locked policy | Cannot be removed or reduced (error `400 BadRequestException`); can be increased |

### Interactions with other features

- Object Versioning: a live version with a future retention expiration can still become noncurrent; versions existing when the policy is applied are protected.
- Event-based holds block deletion; when removed the object's retention period is reset.
- An object can also have its own retention configuration (Object Retention Lock); it is kept until both are satisfied.
- You cannot destroy Cloud KMS key versions that encrypt objects in locked buckets while objects have not met their retention expiration times.
- Object Lifecycle Management deletes only after the retention policy is fulfilled, including for locked buckets.
- Do not use parallel composite uploads in a bucket with a retention policy (components cannot be deleted until each meets the minimum retention).
- Completing an XML API multipart upload fails if it would overwrite an object that has not met its retention period.
- The retention policy organization constraint can require specific retention periods.
- Editable object metadata is not subject to the retention policy.

## Notes

- Warning: locking a bucket's retention policy is irreversible. After locking you cannot delete the bucket until every object has met the retention period; to effectively remove a locked policy you must wait until every object has fulfilled its retention period and then delete the bucket. Try this only on a disposable bucket first.
- Locking applies a lien on the project containing the bucket, blocking `resourcemanager.projects.delete` until the project owner or organization administrator removes the lien.
- To maintain retention policies and object holds you must keep your Google Cloud account active and in good standing; before discontinuing your account transfer data to another compliant service. The person removing a project lien for a locked bucket should have legal or compliance accountability and be outside your IT department's accountability chain (see the Service Specific Terms).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/bucket-lock (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [object-lock.md](./object-lock.md)
- [object-holds.md](./object-holds.md)
- [lifecycle.md](./lifecycle.md)
- [protection-backup-recovery-overview.md](./protection-backup-recovery-overview.md)
