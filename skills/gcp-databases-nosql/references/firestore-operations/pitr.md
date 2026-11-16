---
source: https://docs.cloud.google.com/firestore/native/docs/pitr
---

# Point-in-time recovery (PITR) overview

PITR protects against accidental deletes or writes by retaining document versions for up to 7 days. For a live database following best practices, PITR does not affect read or write performance. PITR is disabled by default.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/firestore/native/docs/use-pitr — the database description shows `earliestVersionTime`, the earliest permissible read time:

```bash
gcloud firestore databases describe --database=DATABASE_ID
```

## Options / Props

### Earliest PITR data available

| PITR enablement status | Earliest PITR data available |
|---|---|
| Disabled | 1 hour before the time of read request |
| enabled within 7 days | 1 hour before PITR was enabled |
| enabled more than 7 days ago | 7 days before the time of read request |

### Ways to recover data

| Scope | Method |
|---|---|
| Portion of the database | Stale read (query condition or direct key lookup with a past timestamp), then write results back into the live database |
| Entire database | Clone the database at a timestamp, or export with a past timestamp and import into a new database |

### Pricing

| Item | Behavior |
|---|---|
| Storage | Database size measured daily, averaged over a month, multiplied by the PITR unit price (GB-month). No free tier; billing must be enabled |
| Compute | Queries during the 7-day window (stale reads or exports) incur read operation costs per document read |
| Minimum billing | Up to 1 day of PITR storage cost even if disabled within a day |

## Notes

- Retention is 7 days after enabling; you can't read 7 days back immediately after enabling.
- One version per minute is retained; with multiple writes in a minute only the last version is kept. Reads must use a whole-minute timestamp; non-minute timestamps such as `2023-05-30 09:00:00.1234AM` return an error that `read_time` is too old.
- Regardless of PITR, you can read (but not export) at any microsecond timestamp within the past hour, but not before `earliestVersionTime`.
- Clone or export PITR data with a whole-minute timestamp within the past seven days, not earlier than `earliestVersionTime`.
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/pitr (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/native/docs/use-pitr (snippet; retrieved 2026-11-16)

## Related

- [use-pitr.md](./use-pitr.md)
- [backups.md](./backups.md)
- [disaster-recovery.md](./disaster-recovery.md)
