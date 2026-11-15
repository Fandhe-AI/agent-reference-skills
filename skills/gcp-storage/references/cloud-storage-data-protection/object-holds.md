---
source: https://docs.cloud.google.com/storage/docs/object-holds
---

# Object holds

Object holds are metadata flags on individual objects; while a hold is on an object it cannot be deleted or replaced, though its editable metadata can still be changed. Bulk placement or removal is available through storage batch operations.

## Signature / Usage

Hold types (verbatim names from the source):

```text
Event-based hold
Temporary hold
```

An object can have one type of hold, both, or neither. With no retention configuration and no bucket retention policy the two behave exactly the same.

### Default event-based hold

Enable the default event-based hold property on a bucket and each new object automatically gets an event-based hold. With a suitable retention policy, release the hold when the event occurs (for example a loan is paid off) and the retention policy keeps the object unchangeable until the retention period is fulfilled.

## Options / Props

| | Object has an event-based hold | Object has a temporary hold |
|---|---|---|
| Object has a retention configuration | Not applicable: cannot simultaneously have an event-based hold and a retention configuration | Releasing a temporary hold does not affect the object's retain-until time |
| Object is in a bucket with a retention policy | Releasing an event-based hold resets the object's time in the bucket for the retention period | Releasing a temporary hold does not affect the object's time in the bucket for the retention period |

Example: a bucket has a 1-year retention policy; Object A has an event-based hold, Object B a temporary hold. After a year neither can be deleted. On releasing both, Object A must stay another year; Object B can be deleted or replaced immediately.

### Restrictions

- Placing an event-based hold on an object with a retention configuration fails, as does a request that simultaneously places the hold and sets retention.
- Holds cannot be managed with the XML API and the hold status is not included in XML API object metadata. Deleting or replacing a held object with the XML API still fails. For XML API multipart uploads, completing the upload fails if it would overwrite a held object.
- Object holds are not supported for buckets that use hierarchical namespace.

## Notes

- Event-based holds suit retention driven by an event; temporary holds suit regulatory or legal purposes such as holding trading documents for investigation.
- Lifecycle configurations can automatically delete objects after their holds are removed.
- To maintain retention policies and object holds you must keep your Google Cloud account active and in good standing (see the Bucket Lock page).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/object-holds (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [bucket-lock.md](./bucket-lock.md)
- [object-lock.md](./object-lock.md)
- [lifecycle.md](./lifecycle.md)
