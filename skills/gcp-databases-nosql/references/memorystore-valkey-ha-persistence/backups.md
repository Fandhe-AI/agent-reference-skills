---
source: https://docs.cloud.google.com/memorystore/docs/valkey/backups
---

# Backups

Backups are point-in-time snapshots of a Memorystore for Valkey instance, used to restore data to a point in time and to export and analyze it. Backups are grouped into a backup collection per instance and can be automated (recommended) or on-demand.

## Signature / Usage

Create an on-demand backup (full details in [manage-backups.md](./manage-backups.md)).

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-backups.

```bash
gcloud memorystore instances backup INSTANCE_ID \
--backup-id=BACKUP_ID \
--ttl=TTL_PERIOD \
--project=PROJECT_ID \
--location=REGION_ID
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Backup | Point-in-time snapshot of data. |
| Backup collection | All backups for one instance. Not deleted automatically when the instance is deleted. |
| Retention (TTL) | After the backup exceeds its TTL it is deleted automatically. |
| Automated backups | Recommended; a backup schedule makes Memorystore take periodic backups. |
| On-demand backups | A backup operation that begins immediately. |
| Billing | Storage cost by backup size and region; minimum 24-hour charge per backup. |

## Notes

- Use cases: disaster recovery, data migration (consolidate or move regions), data sharing and offline analytics, compliance.
- To recover, create a new instance seeded from the backup; you cannot import data into an existing instance.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/backups (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).

## Related

- [manage-backups.md](./manage-backups.md)
- [persistence-overview.md](./persistence-overview.md)
