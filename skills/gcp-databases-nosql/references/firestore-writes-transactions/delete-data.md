---
source: https://docs.cloud.google.com/firestore/native/docs/manage-data/delete-data
---

# Delete documents and fields

How to delete documents, fields and whole collections, plus TTL policies and bulk deletion tools. Deletes are destructive; try them on a disposable database first.

## Signature / Usage

### Delete a document

```javascript
const res = await db.collection('cities').doc('DC').delete();
```

```python
db.collection("cities").document("DC").delete()
```

### Delete a field

```javascript
// Create a document reference
const cityRef = db.collection('cities').doc('BJ');

// Remove the 'capital' field from the document
const res = await cityRef.update({
  capital: FieldValue.delete()
});
```

```python
city_ref = db.collection("cities").document("BJ")
city_ref.update({"capital": firestore.DELETE_FIELD})
```

### Delete a collection (server environment only)

These samples call `recursiveDelete` (Node.js) / `recursive_delete` (Python), which delete the collection's documents **and all of their subcollections** (every descendant document). Unlike deleting a single document, nothing under the collection is kept.

```javascript
async function deleteCollection(db, collectionPath) {
  const collectionRef = db.collection(collectionPath);
  return await db.recursiveDelete(collectionRef);
}
```

```python
def delete_collection(coll_ref):

    print(f"Recursively deleting collection: {coll_ref}")
    db.recursive_delete(coll_ref)
```

### Bulk deletion with the Firebase CLI

Replace DATABASE_ID with your database ID and PATH with a path to a document or collection.

```bash
firebase firestore:delete  --database=DATABASE_ID PATH
```

## Options / Props

| Tool | When to use |
| --- | --- |
| Console | Smaller jobs (thousands of documents). Deleting a document deletes all nested data, including subcollections. |
| Firebase CLI | Smaller jobs; incurs read and delete costs. |
| Managed bulk delete | Millions of documents; deletes one or more collection groups. |
| Dataflow connector | Millions of documents; most configurable, more setup. |
| TTL policy | Designates a field as the expiration time for documents in a collection group; TTL deletes count towards delete costs. |

## Notes

- Source: https://docs.cloud.google.com/firestore/native/docs/manage-data/delete-data (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Warning from the source: deleting a document does not delete its subcollections. Subcollection documents stay accessible by reference (for example `/mycoll/mydoc/mysubcoll/mysubdoc` after deleting `/mycoll/mydoc`). Non-existent parent documents appear in the console but not in query results and snapshots.
- Deleting a collection means reading all its documents and deleting them (read and delete costs); delete in smaller batches to avoid out-of-memory errors. Do it only from a trusted server environment; deleting from a mobile/web client has negative security and performance implications.
- The source states its collection-delete snippets "are simplified for clarity and don't include error handling, security, deleting subcollections, or performance optimizations". Source inconsistency: the Node.js and Python snippets kept here use `recursiveDelete` / `recursive_delete`, which do delete subcollections (the source's Java snippet is commented "Delete a collection and all its subcollections"); the "deleting subcollections" caveat applies to the source's other, non-recursive snippets. Production approach: https://docs.cloud.google.com/firestore/native/docs/solutions/delete-collections
- C++ and Unity do not support collection deletion; delete data using the CLI.
- Large numbers of deletes can impact latency; this usually resolves on its own, otherwise contact support.
- All of these operations are destructive; try them on a disposable database or collection first. Bulk delete: https://docs.cloud.google.com/firestore/native/docs/manage-data/bulk-delete. TTL: https://docs.cloud.google.com/firestore/native/docs/ttl
- Google Cloud's managed document database (Native mode): distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- The source also shows Web, Swift, Objective-C, Kotlin, Java, Dart, C++, Go, PHP, Unity, C# and Ruby samples; they are omitted here.

## Related

- [transactions.md](./transactions.md)
- [transaction-data-contention.md](./transaction-data-contention.md)
