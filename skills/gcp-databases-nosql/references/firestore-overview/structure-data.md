---
source: https://docs.cloud.google.com/firestore/native/docs/concepts/structure-data
---

# Structure data

Firestore lets you structure hierarchical data with documents (nested data), subcollections within documents, or root-level collections. Choose by the advantages and limitations of each for your use case.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/firestore/native/docs/data-model (the structure page itself has no code). Reference to a document in a subcollection:

```javascript
const messageRef = db.collection('rooms').doc('roomA')
  .collection('messages').doc('message1');
```

## Options / Props

| Option | Advantages | Limitations | Example use case (chat app) |
|---|---|---|---|
| Nested data in documents (arrays or maps) | Easy to set up for simple, fixed lists; streamlines the data structure. | Not as scalable, especially if data grows; larger lists make the document grow, which can slow retrieval. | Store a user's 3 most recently visited chat rooms as a nested list in the profile. |
| Subcollections | Parent document size does not change as lists grow; full query capabilities on subcollections; collection group queries across subcollections. | You can't easily delete subcollections. | Collections of users or messages within chat room documents. |
| Root-level collections | Good for many-to-many relationships; powerful querying within each collection. | Naturally hierarchical data can become increasingly complex to fetch as the database grows. | One collection for users and another for rooms and messages. |

## Notes

- Source: https://docs.cloud.google.com/firestore/native/docs/concepts/structure-data (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/firestore/native/docs/data-model (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-model.md](./data-model.md)
- [best-practices.md](./best-practices.md)
