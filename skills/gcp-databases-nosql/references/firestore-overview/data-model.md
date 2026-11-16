---
source: https://docs.cloud.google.com/firestore/native/docs/data-model
---

# Data model

Firestore is a NoSQL, document-oriented database. There are no tables or rows: data is stored in documents (key-value pairs) organized into collections. It is optimized for large collections of small documents. Collections and documents are created implicitly by assigning data to a document.

## Signature / Usage

### Document and collection references

```javascript
const alovelaceDocumentRef = db.collection('users').doc('alovelace');
```

```javascript
const usersCollectionRef = db.collection('users');
```

```javascript
const alovelaceDocumentRef = db.doc('users/alovelace');
```

```python
a_lovelace_ref = db.collection("users").document("alovelace")
```

### Subcollection reference

```javascript
const messageRef = db.collection('rooms').doc('roomA')
  .collection('messages').doc('message1');
```

```python
room_a_ref = db.collection("rooms").document("roomA")
message_ref = room_a_ref.collection("messages").document("message1")
```

## Options / Props

| Concept | Description |
|---|---|
| Document | Unit of storage; a lightweight record of fields mapped to values, identified by a name. Looks like JSON but supports extra data types and is limited by the document size limit. |
| Map | Complex nested object inside a document. |
| Collection | Container for documents. Contains documents and nothing else: no raw fields, no other collections. Schemaless, but using the same fields and types across documents makes querying easier. |
| Document names | Unique within a collection. Provide your own keys (such as user IDs) or let Firestore generate random IDs. |
| Reference | Lightweight object pointing to a location; can be created whether or not data exists, performs no network operation. Collection and document references are distinct types. |
| Subcollection | Collection associated with a specific document. Collections and documents must alternate in a path; you cannot reference a collection in a collection or a document in a document. |
| Collection group | All collections in a database sharing the same collection ID, at any depth (for example `messages`, `rooms/roomA/messages`, `rooms/roomB/messages`). Queried with collection group queries. |

Supported value types: boolean, number, string, geo point, binary blob, timestamp, arrays and maps. Nesting depth: up to 100 levels of subcollections.

## Notes

- You do not need to "create" or "delete" collections: a collection exists after its first document is created and no longer exists when all its documents are deleted.
- Deleting a document does not delete its subcollections. A document at `coll/doc/subcoll/subdoc` can exist even though `coll/doc` no longer exists. To delete subcollection documents with a parent, you must do so manually (see https://docs.cloud.google.com/firestore/native/docs/manage-data/delete-data#collections). Deletion is destructive; try it on a disposable database first.
- References can be built from a slash-separated path string such as `users/alovelace`.
- The source also shows Web v9 / v8, Swift, Objective-C, Kotlin, Java, Dart, C++, Go, PHP, Unity, C# and Ruby samples, which are omitted here.
- Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility) is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Firebase SDK initialization (the `db` object) is out of scope of this skill; see `gcp-client-libraries` for server client library setup.
- Source: https://docs.cloud.google.com/firestore/native/docs/data-model (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-types.md](./data-types.md)
- [structure-data.md](./structure-data.md)
- [quotas.md](./quotas.md)
