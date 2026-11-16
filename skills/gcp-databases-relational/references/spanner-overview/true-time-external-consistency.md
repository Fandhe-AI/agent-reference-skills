---
source: https://docs.cloud.google.com/spanner/docs/true-time-external-consistency
---

# TrueTime and external consistency

TrueTime is a highly available, distributed clock available to applications on all Google servers. Spanner uses it to assign monotonically increasing commit timestamps, which gives transactions external consistency.

## Signature / Usage

The default mode for reads in Spanner is strong. A plain query like this one (borrowed from the gcloud tutorial) is an example of a read:

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

Set the default instance first (the command below names no instance):

```bash
gcloud config set spanner/instance test-instance
```

```bash
gcloud spanner databases execute-sql example-db \
    --sql='SELECT SingerId, AlbumId, AlbumTitle FROM Albums'
```

## Options / Props

| Property | Meaning |
|----------|---------|
| External consistency | Transactions behave as if run serially, and the serial order matches the order clients observe commits. If T2 starts to commit after T1 finishes, T2's timestamp is higher than T1's |
| Serializability | Weaker than external consistency: allows reordering |
| Linearizability | Single-object property; external consistency is stronger (linearizability is the special case of single-operation transactions) |
| Strong consistency | Linearizable replicated objects; weaker than external consistency |
| Strong read (default) | Observes all transactions committed before the operation started, on any replica |
| Stale read | Reads data at an earlier timestamp; similar performance benefit to eventual consistency with much stronger guarantees; cannot block writes because old versions are immutable |

## Notes

- `gcloud spanner databases execute-sql` reads with a strong bound by default (`--strong`; `gcloud spanner databases execute-sql --help`: "Read-only query timestamp bound. The default is --strong"), so the borrowed query is a strong read.
- The borrowed command assumes the default instance was set with `gcloud config set spanner/instance test-instance` (see gcloud.md); otherwise pass `--instance=INSTANCE`.
- External consistency applies when the isolation level is unspecified or set to serializable. Repeatable read isolation instead gives each transaction a consistent snapshot as of its start; it fits high read-write concurrency.
- By default writes are not blocked by read-only transactions and the repeatable-read anomalies do not occur.
- MVCC: each write creates a new immutable version at the transaction's timestamp; a snapshot read returns the latest version before its timestamp without blocking writes. "Proper timestamping" (timestamps consistent with observed commit order) is equivalent to external consistency.
- Spanner uses TrueTime timestamps as proper timestamps for write transactions without global communication, and as strong-read timestamps so strong reads need one round of communication, even across servers.
- Spanner is not eventually consistent: eventual consistency lets readers see states that never existed.
- Source: https://docs.cloud.google.com/spanner/docs/true-time-external-consistency (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed command)

## Related

- [replication.md](./replication.md)
- [instance-configurations.md](./instance-configurations.md)
