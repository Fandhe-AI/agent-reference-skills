---
source: https://docs.cloud.google.com/firestore/native/docs/understand-reads-writes-scale
---

# Understand reads and writes at scale

Explains the Firestore backend (request path, key ranges and splits, synchronous replication, data layout) and the life of a write and a read, so you can design for performance, avoid hotspots and understand consistency.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/firestore/native/docs/data-model (the scale page itself has no code). The collection hierarchy and document ID translate to a single key per document; this is the path of one document in a subcollection:

```javascript
const messageRef = db.collection('rooms').doc('roomA')
  .collection('messages').doc('message1');
```

## Options / Props

| Component | Role |
|---|---|
| Firestore SDK / client libraries | Abstraction over HTTP/RPC calls; implement best practices; may add offline access and caches. |
| Google Front End (GFE) | Common Google Cloud front end; forwards requests to the Firestore service; DoS protection. |
| Firestore service | Authentication, authorization, quota checks, security rules, transaction management; includes a storage client. |
| Storage layer | Stores data and metadata. Documents are ordered lexicographically by a single key; data is partitioned into splits (key ranges) served by multiple storage servers. Splits are replicated synchronously across zones using Paxos with an elected leader per split that handles writes. |

| Table | Contents |
|---|---|
| Documents table | The documents. |
| Indexes table | Index entries enabling efficient, sorted results. |

| Read type | Behavior |
|---|---|
| Strong read (default) | Returns the latest version reflecting all writes committed before the read started; may need leader communication. |
| Stale read | Use the `read_time` read option; the closest replica likely serves it. 15 seconds is a reasonable staleness value; rows are still consistent with each other. |

## Notes

- Region vs multi-region: a region replicates splits across zones; a multi-region location has two regions with full replicas and a third with a witness replica. Multi-region latency baselines are slightly higher; leadership for splits stays in the primary region (where traffic arrives).
- Life of a write: a write is always a read-write transaction that reads the document and indexing configuration, computes mutations to the Documents and Indexes tables (inserts for added fields, deletes for removed, delete plus insert for modified values), and commits. If multiple splits are involved, a two-phase commit with a coordinator and participants runs, each using Paxos. Firestore provides ACID properties and serializability.
- Writes take shared locks for reads and exclusive locks for writes; avoid large reads inside a transaction. Write latency grows with the number of splits/participants: reduce index fanout (stop indexing fields not used for queries) and keep the number of documents updated per transaction low.
- Life of a read: most reads are a range scan over the Indexes table followed by point lookups in the Documents table. Reads use a timestamp and take no locks, so they do not block read-write transactions. Latency grows with the number of splits read; keep result sets small.
- Hotspots: splits created for traffic are retained about 24 hours. Follow the 500/50/5 rule (start at 500 operations per second on a collection, increase up to 50% every five minutes). A single document is the smallest split, so sustained high rates on one document hotspot; consider splitting or replicating data across documents. Sequential document IDs or sequentially indexed field values (timestamps) create moving hotspots; use automatic IDs (scatter algorithm) or exempt the field from indexing.
- Troubleshooting: Key Visualizer (https://cloud.google.com/firestore/docs/key-visualizer).
- Source: https://docs.cloud.google.com/firestore/native/docs/understand-reads-writes-scale (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/firestore/native/docs/data-model (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [best-practices.md](./best-practices.md)
- [locations.md](./locations.md)
- [data-model.md](./data-model.md)
