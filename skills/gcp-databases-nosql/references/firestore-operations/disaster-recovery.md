---
source: https://docs.cloud.google.com/firestore/native/docs/disaster-recovery
---

# Plan disaster recovery

Firestore features for disaster recovery planning: built-in replication for infrastructure outages, and scheduled backups, PITR, exports and clones for data disasters.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/firestore/native/docs/use-pitr — start a database clone from a past point in time:

```bash
gcloud firestore databases clone \
--source-database='SOURCE_DATABASE' \
--snapshot-time='PITR_TIMESTAMP' \
--destination-database='DESTINATION_DATABASE_ID'
```

## Options / Props

| Topic | Facts |
|---|---|
| Regional databases | Synchronous replication across at least three zones; 99.99% availability |
| Multi-region databases | Synchronous replication across five zones in three regions (two serving, one witness); 99.999% availability |
| Replication config | Automatic; no additional configuration or provisioning |
| Scheduled backups | Daily or weekly; max retention 14 weeks; restore to a new database in the same project; higher retention and cheaper restore than PITR |
| PITR | Read up to 7 days back at 1-minute granularity; RTO 0, RPO 1 minute; lower RTO/RPO than backups |
| PITR export | Archive beyond 14 weeks in Cloud Storage; timestamp up to 7 days in the past; recovery generally costs more than from a backup |
| Clone | With PITR up to 7 days back; without PITR up to 1 hour back |

## Notes

- Use backups and PITR together depending on requirements; PITR reads recover only the needed data.
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/disaster-recovery (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/native/docs/use-pitr (snippet; retrieved 2026-11-16)

## Related

- [backups.md](./backups.md)
- [pitr.md](./pitr.md)
- [use-pitr.md](./use-pitr.md)
- [export-import.md](./export-import.md)
