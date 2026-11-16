---
source: https://docs.cloud.google.com/firestore/native/docs/best-practices
---

# Best practices

Quick reference for building applications on Firestore: location, document IDs, field names, indexes, reads and writes, designing for scale (contention, hotspots, ramp-up) and privacy.

## Signature / Usage

### Avoid skipping over deleted data

Anti-pattern: each run scans index entries of recently deleted documents.

```python
docs = db.collection('WorkItems').order_by('created').limit(100)
delete_batch = db.batch()
for doc in docs.stream():
  finish_work(doc)
  delete_batch.delete(doc.reference)
delete_batch.commit()
```

Better: use `start_at` to find the best place to start.

```python
completed_items = db.collection('CompletionStats').document('all stats').get()
docs = db.collection('WorkItems').start_at(
    {'created': completed_items.get('last_completed')}).order_by(
        'created').limit(100)
delete_batch = db.batch()
last_completed = None
for doc in docs.stream():
  finish_work(doc)
  delete_batch.delete(doc.reference)
  last_completed = doc.get('created')

if last_completed:
  delete_batch.update(completed_items.reference,
                      {'last_completed': last_completed})
  delete_batch.commit()
```

## Options / Props

| Area | Guidance |
|---|---|
| Location | Pick the location closest to users and compute. For availability and durability use multi-region and place critical compute in at least two regions; for lower cost, lower write latency or co-location use regional. |
| Document IDs | Avoid `.` and `..`; avoid `/`; do not use monotonically increasing IDs (`Customer1`, `Customer2`, ...) because they cause hotspots. |
| Field names | Avoid `.`, `[`, `]`, `*`, and backtick (they need extra escaping). |
| Index fanout | Main contributor to write latency. Set collection-level index exemptions (an easy default is to disable Descending \& Array indexing); reduce documents per transaction; use a bulk writer instead of the atomic batch writer for many documents. |
| Reads/writes | Use asynchronous calls where available. Do not use offsets (skipped documents are still read internally and billed); use cursors. |
| Transactions | SDKs and client libraries automatically retry failed transactions. With direct REST or RPC calls, implement transaction retries yourself. |
| Privacy | Avoid sensitive information in a Cloud Project ID (may outlive the project) and in document names and field names. |

### When to add single-field index exemptions

| Case | Description |
|---|---|
| Large string fields | Long strings not used for queries: exempt to cut storage costs. |
| High write rates with sequential values | An indexed field that increases or decreases sequentially (like a timestamp) caps writes to the collection at 500 writes per second. If you don't query it, exempt it (for example, high-rate IoT timestamps). |
| TTL fields | The TTL field must be a timestamp. Indexing on TTL fields is on by default and can hurt performance at higher traffic; add automatic indexing exemptions. |
| Large array or map fields | Can approach the 40,000 index entries per document limit; exempt if not queried. |

### Hotspots and ramp-up

Avoid high read, write and delete rates to lexicographically close documents. Hotspotting happens if the app: creates documents at a very high rate with its own monotonically increasing IDs (automatic document IDs use a scatter algorithm and should not hotspot on writes); creates documents at a high rate in a collection with few documents; creates documents with a monotonically increasing field such as a timestamp at a very high rate; deletes documents at a high rate; or writes at a very high rate without gradually increasing traffic.

"500/50/5" rule: start with a maximum of 500 operations per second to a new collection, then increase traffic by 50% every 5 minutes, keeping operations evenly distributed across the key range.

## Notes

- The exact maximum update rate for a single document depends on write rate, contention among requests and the number of affected indexes; load test. A write updates the document and its indexes and is applied synchronously across a quorum of replicas.
- Migrating traffic to a new collection (or changing many document IDs) needs gradual ramp-up. The source describes "parallel reads": read the old collection first and fall back to the new one; a high rate of reads of non-existent documents can hotspot, so copy the old document to the new collection and delete the old one, and ramp up gradually (for example selecting users by a deterministic, unskewed hash of the user ID, or migrating small batches tracked by a status field). A batch job should avoid writes to sequential document IDs. Rollback is hard unless you dual-write, which increases cost.
- The `WorkItems` examples delete documents; try them on a disposable collection first. The source notes that the second example uses a monotonically increasing field, which is an anti-pattern for high write rates. `finish_work` is not defined in the source.
- Google Cloud's managed document database is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [understand-reads-writes-scale.md](./understand-reads-writes-scale.md)
- [quotas.md](./quotas.md)
- [locations.md](./locations.md)
- [structure-data.md](./structure-data.md)
