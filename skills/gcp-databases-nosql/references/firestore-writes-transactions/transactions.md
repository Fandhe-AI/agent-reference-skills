---
source: https://docs.cloud.google.com/firestore/native/docs/manage-data/transactions
---

# Transactions and batched writes

Firestore supports atomic operations for reading and writing data: either all operations succeed or none are applied. There are two kinds: transactions (reads and writes on one or more documents) and batched writes (writes only).

## Signature / Usage

### Transaction (Python)

```python
transaction = db.transaction()
city_ref = db.collection("cities").document("SF")

@firestore.transactional
def update_in_transaction(transaction, city_ref):
    snapshot = city_ref.get(transaction=transaction)
    transaction.update(city_ref, {"population": snapshot.get("population") + 1})

update_in_transaction(transaction, city_ref)
```

### Passing information out of a transaction (Python)

Do not modify application state inside a transaction function; it can run multiple times. Return what you need instead.

```python
transaction = db.transaction()
city_ref = db.collection("cities").document("SF")

@firestore.transactional
def update_in_transaction(transaction, city_ref):
    snapshot = city_ref.get(transaction=transaction)
    new_population = snapshot.get("population") + 1

    if new_population < 1000000:
        transaction.update(city_ref, {"population": new_population})
        return True
    else:
        return False

result = update_in_transaction(transaction, city_ref)
if result:
    print("Population updated")
else:
    print("Sorry! Population is too big.")
```

### Batched writes (Node.js)

```javascript
// Get a new write batch
const batch = db.batch();

// Set the value of 'NYC'
const nycRef = db.collection('cities').doc('NYC');
batch.set(nycRef, {name: 'New York City'});

// Update the population of 'SF'
const sfRef = db.collection('cities').doc('SF');
batch.update(sfRef, {population: 1000000});

// Delete the city 'LA'
const laRef = db.collection('cities').doc('LA');
batch.delete(laRef);

// Commit the batch
await batch.commit();
```

### Validating atomic updates with Security Rules

For mobile/web client libraries, `getAfter()` reads a document's state after the operations complete but before Firestore commits them. These rules require that updating a `city` also atomically updates the related country's `last_updated`:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // If you update a city doc, you must also
    // update the related country's last_updated field.
    match /cities/{city} {
      allow write: if request.auth != null &&
        getAfter(
          /databases/$(database)/documents/countries/$(request.resource.data.country)
        ).data.last_updated == request.time;
    }

    match /countries/{country} {
      allow write: if request.auth != null;
    }
  }
}
```

## Options / Props

### Transaction rules and failure causes

| Item | Statement in the source |
| --- | --- |
| Operation order | Read operations must be executed before write operations. |
| Structure | Any number of `get()` operations followed by any number of `set()`, `update()`, `delete()`. |
| Retries | The transaction function may run more than once if a concurrent edit affects a document it reads; retried a finite number of times. |
| Atomicity | Transactions never partially apply writes; all writes execute at the end of a successful transaction. |
| Offline | Transactions fail when the client is offline. Batched writes execute even when offline. |
| Max request size | 10 MiB. Depends on sizes of modified documents and index entries (for deletes: target document and deleted index entries). |
| Lock deadline | 20 seconds; locks are released automatically if a transaction cannot complete in time. |
| Time limits | 270-second transaction limit or 60-second idle expiration (no reads or writes within the transaction). |
| Rollback | A failed transaction writes nothing; no manual rollback needed. |

### Batched writes

| Item | Statement in the source |
| --- | --- |
| Operations | Any combination of `set()`, `update()`, `delete()`; no reads. |
| Billing | Each operation in the batch counts separately towards usage. |
| Retries | Not subject to retries or failures from too many retries. |
| Size | A batch with hundreds of documents may exceed the transaction size limit; reduce documents per batch. |

### Security rules limits for atomic operations

| Limit | Value |
| --- | --- |
| Document access calls for the entire transaction / batch | 20 (in addition to the normal 10 per single-document operation) |

## Notes

- Source: https://docs.cloud.google.com/firestore/native/docs/manage-data/transactions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The batched-write sample deletes the `cities/LA` document; run it against a disposable database or the emulator first.
- Keep side effects out of transaction functions: they can run multiple times and are not guaranteed to run on the UI thread.
- For bulk data entry use a server client library with parallelized individual writes (or a bulk writer); batched writes outperform serialized writes but not parallel writes. Do not use a mobile/web SDK for bulk operations.
- The source's Node.js transaction samples are omitted: they catch the transaction error, only log `Transaction failure:` and continue, so a failed transaction would go unnoticed. Its Python batched-write sample is omitted as a duplicate of the Node.js one.
- Google Cloud's managed document database (Native mode): distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Client-side Firebase setup is out of scope; Security Rules samples are kept as the source shows them; the `getAfter()` sample shows the cross-document check only and lets any signed-in user write `countries` documents, so add ownership or role checks in real rules.
- The source also shows Web (v8/v9), Swift, Objective-C, Kotlin, Java, Dart, C++, Go, PHP, Unity, C# and Ruby samples, and async Python variants; they are omitted here.
- Troubleshooting for large writes and contention: https://cloud.google.com/firestore/docs/troubleshooting

## Related

- [transaction-data-contention.md](./transaction-data-contention.md)
- [delete-data.md](./delete-data.md)
