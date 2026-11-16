---
source: https://docs.cloud.google.com/spanner/docs/error-codes
---

# Error codes

Spanner uses the canonical error codes of `google.rpc.Code`. Classify errors by that code (the `status` field in JSON errors, the `code` field in `application/x-protobuf` errors), not by message text, which might change at any time. A successful request returns HTTP `200 OK`; a failure returns a `4xx` or `5xx` status plus an `error` object.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/spanner/docs/transactions: an excerpt of the Python read-write transaction sample (contiguous lines, original indentation; see transactions.md for the full sample). The client library reruns the whole function when the transaction is `ABORTED`, which is the recommended handling for transactional commits:

```python
    def update_albums(transaction):
        # Read the second album budget.
        second_album_keyset = spanner.KeySet(keys=[(2, 2)])
        second_album_result = transaction.read(
            table="Albums",
            columns=("MarketingBudget",),
            keyset=second_album_keyset,
            limit=1,
        )
        second_album_row = list(second_album_result)[0]
        second_album_budget = second_album_row[0]

        transfer_amount = 200000

        if second_album_budget < transfer_amount:
            # Raising an exception will automatically roll back the
            # transaction.
            raise ValueError("The second album doesn't have enough funds to transfer")

        # Read the first album's budget.
        first_album_keyset = spanner.KeySet(keys=[(1, 1)])
        first_album_result = transaction.read(
            table="Albums",
            columns=("MarketingBudget",),
            keyset=first_album_keyset,
            limit=1,
        )
        first_album_row = list(first_album_result)[0]
        first_album_budget = first_album_row[0]

        # Update the budgets.
        second_album_budget -= transfer_amount
        first_album_budget += transfer_amount
        print(
            "Setting first album's budget to {} and the second album's "
            "budget to {}.".format(first_album_budget, second_album_budget)
        )

        # Update the rows.
        transaction.update(
            table="Albums",
            columns=("SingerId", "AlbumId", "MarketingBudget"),
            values=[(1, 1, first_album_budget), (2, 2, second_album_budget)],
        )

    database.run_in_transaction(update_albums)
```

## Options / Props

### Error response elements

| Element | Description |
|---------|-------------|
| `code` | An HTTP status code that generically identifies the request failure. |
| `message` | Specific information about the request failure. |
| `status` | The canonical error code (`google.rpc.Code`). |

A request with content type `application/x-protobuf` that fails returns a serialized `google.rpc.Status` message.

### Error codes and recommended actions

| Error code | Description | Recommended action |
|------------|-------------|--------------------|
| `ABORTED` | Aborted, typically due to a concurrency issue such as a sequencer check failure or transaction abort; the request conflicted with another. | Non-transactional commit: retry the request or restructure entities to reduce contention. Transactional commit: retry the entire transaction or reduce contention. |
| `ALREADY_EXISTS` | The entity already exists (for example inserting a row with an existing primary key). | Don't retry without fixing the problem. |
| `CANCELLED` | Cancelled, typically by the caller. | Retry the operation. |
| `DEADLINE_EXCEEDED` | Deadline expired before completion. | Check the deadline is sufficient; use one matching when a response is useful. For state-changing operations an error might be returned even though the operation completed successfully. |
| `FAILED_PRECONDITION` | Precondition not met, for example reading or querying at a timestamp beyond the maximum timestamp staleness. | Don't retry without fixing the problem. |
| `INTERNAL` | Server error; invariants expected by the system were broken. | Don't retry unless you understand the circumstance and cause. |
| `INVALID_ARGUMENT` | Invalid value; the message says which. | Don't retry without fixing the problem. |
| `NOT_FOUND` | A requested entity (row to update, table, column) doesn't exist. | Don't retry without fixing the problem. |
| `OUT_OF_RANGE` | Operation attempted past the valid range. | Don't retry without fixing the problem. |
| `PERMISSION_DENIED` | Not authorized. | Don't retry without fixing the problem. |
| `RESOURCE_EXHAUSTED` | Admin plane: project quota exceeded or file system out of space. Data plane: Spanner nodes overloaded. | Admin plane: check quotas, request an increase or wait for reset, use exponential backoff. Data plane: check node capacity; client libraries retry these errors. In general treat like `UNAVAILABLE` and retry with exponential backoff. |
| `UNAUTHENTICATED` | No valid authentication credentials. | Don't retry without fixing the problem. |
| `UNAVAILABLE` | Server unavailable. | Retry with exponential backoff. It is not always safe to retry non-idempotent operations. |
| `UNIMPLEMENTED` | Not implemented, or not supported or enabled in this service. | Don't retry without fixing the problem. |
| `UNKNOWN` | Unknown server error. | Check that your request is safe, then retry with exponential backoff. |

### Resource exhausted: no session available

Messages: `RESOURCE_EXHAUSTED: No session available in the pool` or `RESOURCE_EXHAUSTED: Timed out after waiting X ms for acquiring session`.

| Reason | Recommended action |
|--------|--------------------|
| All sessions in the pool are in use | Enable multiplexed sessions; or increase `maxSession` / `minSession` in the session pool settings. |
| Requests take a long time | Optimize queries or application logic; increase the session acquire timeout; enable multiplexed sessions in eligible client libraries. |
| Session leaks (iterators or result sets not closed) | Fix the leaks and close all iterators and result sets; use the automatic clean up of session leaks feature. |
| Session creation is slow (`BatchCreateSessions` for `minSession`, `CreateSessions` up to `maxSession`) | Check latency of those API calls. |

### Session not found

| Cause | Action |
|-------|--------|
| Client deleted the session (closing the database client, `deleteSessions`) | Without a client library, create a new session, add it to the pool and remove the deleted one. With a library, make sure code does not close the client or delete sessions. |
| Idle for more than one hour | In Dataflow, add a `Reshuffle` transform after the Spanner read. |
| Session older than 28 days | Client libraries handle this automatically. |

## Notes

- `Database schema has changed` and `Transaction aborted. Database schema probably changed during transaction, retry may succeed.` are `ABORTED` errors, usually from a schema update but also possible from a temporary internal state such as a stale client schema at commit. Handle them by retrying the entire transaction.
- Flow control: on high node CPU or hotspots Spanner can push requests back to the client to retry; if retries consume the whole deadline the client gets `RESOURCE_EXHAUSTED`. Supported by Go client v1.65 or later and Java client v6.72 or later. Overall request time does not increase because of it.
- Because a transaction can be retried, keep side effects (external systems) out of the transaction function.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`. Retry and LRO patterns in client libraries: `gcp-client-libraries`.
- The twin has no error-handling code of its own; the Python block is a contiguous excerpt borrowed from the transactions page (the enclosing `read_write_transaction` function that creates `database` is omitted).
- The sample's `print` inside `update_albums` is log-only and repeats on each retry; put real side effects (external calls, messages) after `run_in_transaction` returns.
- Source: https://docs.cloud.google.com/spanner/docs/error-codes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/transactions (snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [transactions.md](./transactions.md)
- [timestamp-bounds.md](./timestamp-bounds.md)
- [dml-versus-mutations.md](./dml-versus-mutations.md)
- Troubleshoot deadline exceeded errors: https://docs.cloud.google.com/spanner/docs/deadline-exceeded
- Sessions: https://docs.cloud.google.com/spanner/docs/sessions
