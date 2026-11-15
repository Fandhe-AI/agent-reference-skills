---
source: https://docs.cloud.google.com/storage/docs/autoclass
---

# Autoclass

Autoclass automatically transitions objects in a bucket between storage classes based on each object's access pattern: unaccessed data moves to colder classes, accessed data moves back to Standard.

## Signature / Usage

### Monitoring transitions

Cloud Monitoring storage metrics for Autoclass (both can be grouped by source or destination storage class):

```text
autoclass/transition_operation_count
autoclass/transitioned_bytes_count
```

- `transition_operation_count`: number of storage class transitions initiated by Autoclass, excluding transitions that occurred as part of enabling Autoclass.
- `transitioned_bytes_count`: total bytes transitioned by Autoclass, excluding bytes transitioned as part of enabling Autoclass.
- Objects in Standard storage are reported as `REGIONAL` if stored in a region and as `MULTI-REGIONAL` otherwise.
- You can also see bytes stored per class over time in the bucket's **Configuration** tab in the console (**See Performance**).

### Transition behavior (objects at least 128 KiB)

1. If an object's data is accessed, it transitions to Standard storage.
2. Any object not accessed for 30 days transitions to Nearline storage (the default terminal class).
3. With Archive as terminal storage class: not accessed for 90 days transitions to Coldline (at least 30 days in Standard and 60 in Nearline); not accessed for 365 days transitions to Archive (at least 30 days Standard, 60 Nearline, 275 Coldline).

## Options / Props

| Item | Rule |
|---|---|
| New objects | Always start in Standard storage, even if another class is specified in the request |
| Bucket default storage class | Always Standard; requests to change it to another class fail |
| Manual class change in rewrite/copy | Operation succeeds but the change is ignored; object is Standard |
| Terminal storage class | Nearline by default; optionally Archive |
| Minimum size | Objects smaller than 128 KiB stay in Standard permanently (object data only, not metadata, counts) |
| Soft-deleted objects | Keep their existing storage class until the end of their retention duration; a restored soft-deleted object begins in Standard |
| Reads | Reading object data moves a non-Standard object to Standard; reading or editing metadata does not |
| Config change latency | Up to one day to take effect |
| Disable then re-enable | Cannot re-enable until one day has elapsed; attempts fail |
| Last access timestamp | Updated only by the `get` object method; `copy` and `rewrite` do not update it |

### Pricing exceptions

- Storage and operation charges for Autoclass-managed objects use Autoclass-specific SKUs.
- A management fee and a one-time enablement charge apply.
- Retrieval fees and early deletion fees are not charged (except as part of enablement charges).
- All operations are charged at the Standard storage rate.
- No operation charge when Autoclass transitions an object to a colder class; no Class A charge for Nearline to Standard; Coldline or Archive to Standard or Nearline transitions each incur a Class A charge.
- During the lag between eligibility and transition, the object is billed in its pre-transition class (except transitions to Standard caused by enabling Autoclass).

### Existing buckets

- Enabling: all objects except soft-deleted objects transition to Standard (the reported class may lag, with no effect on pricing or the 30-day period). Objects already in Standard need another 30 days without access before moving to Nearline.
- Disabling: each object stays in its current class; Autoclass pricing stops; you can then change classes as in non-Autoclass buckets.
- Changing terminal class from Archive to Nearline: objects in Archive and Coldline transition to Nearline. From Nearline to Archive: Nearline objects are treated as just transitioned and need another 60 days without access before moving to Coldline.

### Restrictions

- A bucket cannot have Autoclass enabled together with an Object Lifecycle Management rule that uses the `SetStorageClass` action or the `matchesStorageClass` condition; requests that would create that combination fail.
- Object composition needs the source objects and the composed object in the same class, so composing in an Autoclass bucket fails unless all sources are Standard at request time.

## Notes

- Transitions are performed asynchronously, so there can be a lag after an object becomes eligible.
- Bucket relocation: Autoclass is paused during final synchronization. Relocated Standard objects are treated as accessed (their 30-day no-access period restarts); relocating objects in Nearline, Coldline or Archive does not count as access, and objects there do not move to warmer classes automatically during relocation. Already-scheduled colder transitions proceed after relocation.
- Not recommended when most data fits specific storage class use cases or when other Google Cloud services regularly read the bucket (for example Sensitive Data Protection scans). Recommended for varied or unpredictable access patterns.
- Snippet-free page: the metric names above are verbatim from the source.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/autoclass (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [metadata.md](./metadata.md)
