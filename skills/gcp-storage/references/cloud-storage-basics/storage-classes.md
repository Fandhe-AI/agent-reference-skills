---
source: https://docs.cloud.google.com/storage/docs/storage-classes
---

# Storage classes

A storage class is object metadata that affects availability and the pricing model. Cloud Storage offers Rapid, Standard, Nearline, Coldline and Archive; a bucket has a default storage class that new objects inherit unless set otherwise.

## Signature / Usage

Bucket creation command. As shown it sets no default storage class, so the bucket's default storage class is Standard storage ("If you don't specify a default storage class when you create a bucket, that bucket's default storage class is set to Standard storage"). To choose another class, `gcloud storage buckets create` also takes `--default-storage-class` with an API / CLI name from the first table below:

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

## Options / Props

### API / CLI names, minimum storage duration, retrieval fees, typical monthly availability

| Storage Class | Name for APIs and CLIs | Minimum storage duration | Retrieval fees | Typical monthly availability |
|---|---|---|---|---|
| Rapid storage^2 | `RAPID` | None | None | >99.95% in zones |
| Standard storage | `STANDARD` | None | None | >99.99% in multi-regions and dual-regions; 99.99% in regions |
| Nearline storage | `NEARLINE` | 30 days | Yes | 99.95% in multi-regions and dual-regions; 99.9% in regions |
| Coldline storage | `COLDLINE` | 90 days | Yes | 99.95% in multi-regions and dual-regions; 99.9% in regions |
| Archive storage | `ARCHIVE` | 365 days | Yes | 99.95% in multi-regions and dual-regions; 99.9% in regions |

^2 The Rapid storage class is only available with Rapid Bucket (zonal buckets).

### Availability SLA per class and location type

The SLA is the monthly uptime percentage backed by the Cloud Storage SLA (https://docs.cloud.google.com/storage/sla); If Google fails to meet that uptime, customers are eligible for a credit.

| Class | Location type | Availability SLA | Typical monthly availability |
|---|---|---|---|
| Rapid | zone | 99.9% | >99.95% |
| Standard | multi-region | 99.95% | >99.99% |
| Standard | dual-region | 99.95% | >99.99% |
| Standard | region | 99.9% | 99.99% |
| Nearline | multi-region | 99.9% | 99.95% |
| Nearline | dual-region | 99.9% | 99.95% |
| Nearline | region | 99.0% | 99.9% |
| Coldline | multi-region | 99.9% | 99.95% |
| Coldline | dual-region | 99.9% | 99.95% |
| Coldline | region | 99.0% | 99.9% |
| Archive | multi-region | 99.9% | 99.95% |
| Archive | dual-region | 99.9% | 99.95% |
| Archive | region | 99.0% | 99.9% |

### Intended use per class

| Class | Intended use |
|---|---|
| Rapid | I/O-intensive workloads (AI, ML, analytics); zonal locations only, through Rapid Bucket; storage size limit for zonal buckets is in the bucket quotas |
| Standard | Frequently accessed ("hot") data and data stored only briefly; region (co-locate with GKE / Compute Engine), dual-region, multi-region (content serving worldwide) |
| Nearline | Data read or modified on average once per month or less; 30-day minimum storage duration, data access costs |
| Coldline | Data read or modified at most once a quarter; 90-day minimum storage duration, higher access costs |
| Archive | Data accessed less than once a year (legal/regulatory archives, disaster recovery); 365-day minimum storage duration, higher costs for data access and operations; data available within milliseconds |

### Features common to all classes

- Unlimited storage with unlimited access (Rapid storage is an exception).
- No minimum object size.
- Worldwide accessibility and worldwide storage locations.
- Low latency with no offline data retrieval.
- 99.999999999% annual durability.
- Redundancy across regions when stored in a multi-region or dual-region.
- Uniform experience with Cloud Storage features, security, tools and APIs.

### Legacy classes

Cannot be set in the Google Cloud console; use Standard unless already in use.

| Class | Description |
|---|---|
| Multi-Regional storage | Equivalent to Standard, but only for objects in multi-regions or dual-regions |
| Regional storage | Equivalent to Standard, but only for objects in regions |
| Durable Reduced Availability (DRA) | Similar to Standard, but higher pricing for operations and lower performance (99% availability SLA); move data out via a storage transfer |

## Notes

- If no default storage class is given at bucket creation, the default is Standard.
- Changing a bucket's default storage class does not affect existing objects. Change an existing object's class by rewriting the object or with Object Lifecycle Management; Autoclass can manage transitions automatically.
- When Autoclass is enabled on a bucket, legacy classes are considered different from Standard: objects other than soft-deleted objects transition to Standard, including objects in legacy classes.
- Early deletion: deleting data stored as Nearline, Coldline or Archive before its minimum storage duration (30, 90 and 365 days) might incur early deletion charges (stated on the delete-objects page).
- The Cloud Storage introduction (https://docs.cloud.google.com/storage/docs/introduction, see `introduction.md`) says dual-regions and multi-regions replicate data "for 99.99% availability" without separating SLA from typical availability; per the table above, the multi-region and dual-region availability SLA is 99.95% for Standard and 99.9% for Nearline, Coldline and Archive, and typical monthly availability is >99.99% for Standard and 99.95% for the others.
- Snippet taken from https://docs.cloud.google.com/storage/docs/creating-buckets (the storage classes page itself has no code).
- Minimum storage durations and retrieval fees are priced per https://docs.cloud.google.com/storage/pricing (early-delete and retrieval-pricing sections); this page only lists the duration and whether retrieval fees apply.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/storage-classes (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/deleting-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/introduction (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [locations.md](./locations.md)
- [buckets.md](./buckets.md)
- [objects.md](./objects.md)
- [quotas.md](./quotas.md)
