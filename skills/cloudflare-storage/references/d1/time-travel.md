---
source: https://developers.cloudflare.com/d1/reference/time-travel/
---

# Time Travel and backups

Time Travel is D1's always-on point-in-time recovery: restore a database to any minute within the last 30 days using bookmarks, at no extra cost.

## Signature / Usage

```sh
wrangler d1 time-travel info YOUR_DATABASE
wrangler d1 time-travel info YOUR_DATABASE --timestamp="2023-07-09T17:31:11+00:00"
wrangler d1 time-travel restore YOUR_DATABASE --timestamp=UNIX_TIMESTAMP
wrangler d1 time-travel restore YOUR_DATABASE --bookmark=00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683
```

Output of `info`:

```sh
🚧 Time Traveling...
⚠️ The current bookmark is '00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683'
⚡️ To restore to this specific bookmark, run:
 `wrangler d1 time-travel restore YOUR_DATABASE --bookmark=00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683`
```

## Notes

- Always on; history and restores incur no additional cost. Bookmarks are created automatically.
- Requirements: Wrangler `v3.4.0`+, database on the production backend (`wrangler d1 info DB_NAME` shows `version: production`; `version: alpha` supports only legacy snapshot backups).
- Bookmarks: older than 30 days are invalid; restoring does not delete older bookmarks; lexicographically sortable (oldest to newest); derived deterministically from a Unix timestamp; also used by the Sessions API for sequential consistency.
- Timestamps: Unix seconds (UTC) or JavaScript date-time string / RFC3339 (e.g. `2023-07-27T11:18:53.000-04:00`).
- Restore is destructive and overwrites the database in place; in-flight queries and transactions are cancelled with an error. The restore returns the previous bookmark so you can undo by restoring to it (or any earlier bookmark from `time-travel info`).
- Window: 30 days (Workers Paid) / 7 days (Free); max 10 restores per 10 minutes per database (see Limits).
- Cloning / forking an existing database is not yet supported.
- Retain state longer than 30 days by exporting D1 to R2 with Workflows (Export and save D1 database example). Cloudflare Workflows is covered by the cloudflare-stateful skill (https://developers.cloudflare.com/workflows/examples/backup-d1/).
- `date +%s` gives a Unix timestamp on macOS and Windows per the source.
- Restores are recorded in audit logs as `TimeTravel`.
- Bookmarks can advance due to Cloudflare internal maintenance events, such as instance restarts or storage checkpointing, without any SQL writes from your application. A newer current bookmark does not mean your data changed. To verify data state, compare row counts or use `wrangler d1 time-travel info` with a specific past timestamp.
- Source: https://developers.cloudflare.com/d1/reference/time-travel/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Backups (Legacy)](./backups-legacy.md)
- [Global read replication](./read-replication.md)
- [Limits](./limits.md)
- [Audit Logs](./audit-logs.md)
- [Wrangler commands](./wrangler-commands.md)
