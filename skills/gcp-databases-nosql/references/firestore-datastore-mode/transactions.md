---
source: https://docs.cloud.google.com/datastore/docs/concepts/transactions
---

# Transactions

A transaction is a set of operations on one or more entities, guaranteed to be atomic: either all operations are applied or none. Datastore mode enforces serializable isolation and supports three database-level concurrency modes.

## Signature / Usage

### Transfer between two entities (Node.js)

```js
async function transferFunds(fromKey, toKey, amount) {
  const transaction = datastore.transaction();
  await transaction.run();
  const results = await Promise.all([
    transaction.get(fromKey),
    transaction.get(toKey),
  ]);
  const accounts = results.map(result => result[0]);

  accounts[0].balance -= amount;
  accounts[1].balance += amount;

  transaction.save([
    {
      key: fromKey,
      data: accounts[0],
    },
    {
      key: toKey,
      data: accounts[1],
    },
  ]);

  return await transaction.commit();
}
```

### View the concurrency mode

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

Replace `CONCURRENCY_MODE` with `PESSIMISTIC`, `OPTIMISTIC`, or `OPTIMISTIC_WITH_ENTITY_GROUPS`; `PROJECT_ID` with the Google Cloud project ID; `DATABASE_ID` with the ID of your Datastore mode database.

## Options / Props

### Concurrency modes

| Mode | Behavior |
|---|---|
| `PESSIMISTIC` (default) | Read-write transactions use reader/writer locks; concurrent transactions on the same data can be delayed. Read-only transactions need no locks |
| `OPTIMISTIC` | When concurrent read-write transactions touch the same data, only the first to commit succeeds; others that write fail on commit. Most upgraded legacy databases were initially configured this way |
| `OPTIMISTIC_WITH_ENTITY_GROUPS` | Only for apps depending on legacy entity group semantics. Transactions limited to 25 entity groups; writes to an entity group limited to 1 per second; queries in transactions must be ancestor queries |

### Transaction rules and limits

| Item | Value |
|---|---|
| Expiry | 270 seconds, or 60 seconds if idle |
| Maximum transaction size | 10 MiB |
| Isolation | Serializable; queries and lookups see a consistent snapshot as of transaction start |

## Notes

- A transaction can fail on too many concurrent modifications of the same entity, on a resource limit, or on an internal error; the API returns an error.
- An exception on commit does not always mean the transaction failed. Make transactions idempotent so a repeat gives the same end result.
- Datastore does not automatically retry transactions; add your own retry logic (for example for conflicts). You do not need a retry loop around every transaction; you can propagate the error to the UI instead.
- Reads inside a transaction do not see earlier writes in the same transaction: a modified or deleted entity is returned as of the start of the transaction (or nothing if it did not exist then).
- Keep transactions as short as possible; prepare data and keys outside the transaction and fetch entities inside it. Keep side effects out of the transaction function because it may be retried.
- Read-only transactions cannot modify entities, do not contend with other transactions and need no retry. Use them for consistent multi-read snapshots (for example `datastore.transaction({readOnly: true})` in Node.js).
- The source's samples omit `rollback` on failure for brevity; in production code every transaction must be explicitly committed or rolled back.
- The Remote API library requires Entity Groups and does not work in `OPTIMISTIC` mode.
- To move from `OPTIMISTIC_WITH_ENTITY_GROUPS` to `OPTIMISTIC`, the source recommends: create a test project in Datastore mode, set its concurrency mode to `OPTIMISTIC` (HTTP PATCH on `projects.databases`), test the workload, then change the main project. Changing the concurrency mode affects live behavior; try it on a disposable test project first.
- The source also shows C#, Go, Java, PHP, Python and Ruby samples, retry loops and get-or-create examples; they are omitted here (the Python source text is mangled with embedded links, and the Node.js get-or-create and read-only samples swallow errors in their `catch`).
- Source: https://docs.cloud.google.com/datastore/docs/concepts/transactions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [errors.md](./errors.md)
- [limits.md](./limits.md)
- [indexes.md](./indexes.md)
