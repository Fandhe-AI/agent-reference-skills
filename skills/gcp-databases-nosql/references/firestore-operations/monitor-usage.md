---
source: https://docs.cloud.google.com/firestore/native/docs/monitor-usage
---

# Monitor usage

Monitor Firestore usage with the console usage dashboards, Firebase Security Rules usage dashboards, and Cloud Monitoring metrics.

## Signature / Usage

The source has no code. Snippet taken from https://docs.cloud.google.com/firestore/native/docs/ttl — list long-running operations, which show TTL progress:

```bash
gcloud firestore operations list
```

## Options / Props

### Cloud Monitoring metrics

| Metric Name | Description |
|---|---|
| Document Reads | Successful document reads, by type LOOKUP or QUERY. Excludes reads from managed export or bulk delete |
| Document Writes | Successful document writes, by type CREATE or UPDATE. Excludes writes from managed import |
| Document Deletes | Successful document deletes |
| Active Connections | Active connections. Each mobile/web SDK keeps one connection shared across snapshot listeners; server client libraries create one connection per snapshot listener |
| Snapshot Listeners | Snapshot listeners across all active connections |
| Time-to-live deletion count | Documents deleted by TTL policies |
| Time-to-live expiration to deletion delays | Time between TTL expiry and actual deletion |

### Usage dashboard vs billing

Billing takes precedence over the dashboard. Not shown or differing in the dashboard:

| Operation | Behavior |
|---|---|
| Import and export | Reads and writes not shown |
| No-op verify-only writes | Billed as reads; shown as `UPDATE_NOOP` / `DELETE_NOOP` |
| No-op writes | May show as `UPDATE_NOOP` / `DELETE_NOOP` but are still billed |
| Collapsed writes | Rapid writes to one document, and field transforms (server timestamps, increments, array union), may be counted as one; billing counts each |
| Queries with zero results | Cost one read; billed, not shown |
| Index entries read | Billed, not shown (e.g. aggregation queries) |
| List collection IDs | Dashboard counts one read per collection ID, differing from billing |
| TTL deletes | Not captured; use the TTL metrics |

## Notes

- Dashboards need the `monitoring.timeSeries.list` IAM permission (granted by Project Owner, Editor, Viewer, a Cloud Monitoring role, or a custom role).
- Metrics are sampled every minute and may take up to 4 minutes to appear. Example: a user opening an app that subscribes to 10 queries adds 1 active connection and 10 snapshot listeners.
- The list covers commonly used metrics; latency, index entry reads and system metrics are in the full Cloud Monitoring reference. Rules evaluation metrics are also available in Cloud Monitoring.
- The source also shows Console and Firebase console dashboard steps and a metrics explorer link (omitted).
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Firebase console usage is outside this skill.
- Source: https://docs.cloud.google.com/firestore/native/docs/monitor-usage (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/native/docs/ttl (snippet; retrieved 2026-11-16)

## Related

- [ttl.md](./ttl.md)
- [export-import.md](./export-import.md)
