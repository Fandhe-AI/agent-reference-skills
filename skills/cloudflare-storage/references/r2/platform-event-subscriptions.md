---
source: https://developers.cloudflare.com/r2/platform/event-subscriptions/
---

# Event subscriptions

Event subscriptions publish structured events from Cloudflare products to a queue, consumed by Workers or HTTP pull consumers. R2 publishes bucket events and Super Slurper job events.

## Signature / Usage

```json
{
  "type": "cf.r2.bucket.created",
  "source": {
    "type": "r2"
  },
  "payload": {
    "name": "my-bucket",
    "jurisdiction": "default",
    "location": "WNAM",
    "storageClass": "Standard"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

Super Slurper completion event payload:

```json
{
  "type": "cf.superSlurper.job.completed",
  "source": {
    "type": "superSlurper"
  },
  "payload": {
    "id": "job-12345678-90ab-cdef-1234-567890abcdef",
    "totalObjectsCount": 1000,
    "skippedObjectsCount": 10,
    "migratedObjectsCount": 980,
    "failedObjectsCount": 10
  }
}
```

## Options / Props

| Event | `type` | Triggered when |
| --- | --- | --- |
| `bucket.created` | `cf.r2.bucket.created` | A bucket is created. Payload: `name`, `jurisdiction`, `location`, `storageClass`. |
| `bucket.deleted` | `cf.r2.bucket.deleted` | A bucket is deleted. Payload: `name`, `jurisdiction`. |
| `job.started` | `cf.superSlurper.job.started` | A migration job starts. Payload: `id`, `createdAt`, `overwrite`, `pathPrefix`, `source` (`provider`, `bucket`, `region`, `endpoint`), `destination` (`provider`, `bucket`, `jurisdiction`). |
| `job.paused` | `cf.superSlurper.job.paused` | A migration job pauses. Payload: `id`. |
| `job.resumed` | `cf.superSlurper.job.resumed` | A migration job resumes. Payload: `id`. |
| `job.completed` | `cf.superSlurper.job.completed` | A migration job finishes. Payload: `id`, `totalObjectsCount`, `skippedObjectsCount`, `migratedObjectsCount`, `failedObjectsCount`. |
| `job.aborted` | `cf.superSlurper.job.aborted` | A migration job is manually aborted. Same counts payload as completed. |
| `job.object.migrated` | `cf.superSlurper.job.object.migrated` | An object is migrated. `source.type` is `superSlurper.job` with `jobId`; payload: `key`. |

## Notes

- Every event includes `metadata`: `accountId`, `eventSubscriptionId`, `eventSchemaVersion`, `eventTimestamp`.
- Differs from bucket event notifications, which fire on object changes (`object-create` / `object-delete`).

## Related

- [Event notifications](./buckets-event-notifications.md)
- [Super Slurper](./data-migration-super-slurper.md)
