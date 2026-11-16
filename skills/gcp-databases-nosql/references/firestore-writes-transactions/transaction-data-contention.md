---
source: https://docs.cloud.google.com/firestore/native/docs/transaction-data-contention
---

# Data contention in transactions

Describes transactional data contention, concurrency controls (`PESSIMISTIC` / `OPTIMISTIC`) and serializable isolation in Firestore. For code samples see the transactions page.

## Signature / Usage

### View the server-side concurrency mode

```bash
gcloud firestore databases describe \
  --project=PROJECT_ID \
  --database=DATABASE_ID
```

### Change the concurrency mode

```bash
gcloud firestore databases update \
  --project=PROJECT_ID \
  --database=DATABASE_ID \
  --concurrency-mode=CONCURRENCY_MODE
```

Where CONCURRENCY_MODE is `PESSIMISTIC` or `OPTIMISTIC`, PROJECT_ID is the ID of your Google Cloud project, and DATABASE_ID is the ID of your Firestore database.

## Options / Props

| Concurrency mode | Behavior |
| --- | --- |
| `PESSIMISTIC` | Assumes contention is likely. Transactions lock the documents they read; the lock blocks other transactions, batched writes and non-transactional writes. Locks are released at commit, timeout or failure. Other writes wait; locks are acquired in chronological order. |
| `OPTIMISTIC` | No database locks. Tracks documents read; writes complete only if none changed during execution, otherwise the transaction is retried and eventually fails with a contention error. |

| Defaults | Value |
| --- | --- |
| Standard edition | `PESSIMISTIC` |
| Enterprise edition | `OPTIMISTIC` (supports operations that scan whole collections without locking many documents) |
| Mobile / web SDKs | Always optimistic (emulated with write preconditions on document versions), independent of the database setting |
| Server client libraries (C#, Go, Java, Node.js, PHP, Python, Ruby) | Use the database concurrency mode setting (built-in transactions) |

## Notes

- Source: https://docs.cloud.google.com/firestore/native/docs/transaction-data-contention (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client libraries automatically retry transactions that fail due to contention. After a finite number of retries the operation fails with: `ABORTED: Too much contention on these documents. Please try again.`
- Firestore guarantees serializable isolation; transactions are serialized and isolated by commit time. It commits transactions in order by commit time and isolates them from concurrent operations with a later commit time.
- Isolation within a transaction: reads and queries do not see earlier writes in the same transaction; they return the document version at commit time (nothing if it did not exist then). Document reads must come before document writes.
- Mobile/web SDKs stay optimistic to cope with high latency and unreliable networks. For server client libraries, use a Google Cloud compute product close to the database to keep latency low; high latency causes locking and contention problems.
- Changing the concurrency mode alters locking behavior for server transactions; test on a non-production database first.
- Troubleshooting: https://cloud.google.com/firestore/docs/troubleshooting
- Google Cloud's managed document database (Native mode): distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).

## Related

- [transactions.md](./transactions.md)
- [delete-data.md](./delete-data.md)
