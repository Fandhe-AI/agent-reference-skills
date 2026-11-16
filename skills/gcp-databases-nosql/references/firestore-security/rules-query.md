---
source: https://docs.cloud.google.com/firestore/native/docs/security/rules-query
---

# Securely querying data

How Firestore Security Rules interact with queries: rules are not filters, so a query must carry the same constraints as the rules. Also covers `OR` queries, `request.query` limits and collection group queries.

## Signature / Usage

### Rules are not filters

Firestore evaluates a query against its potential result set, not the actual field values. If a query could return a document the client cannot read, the whole request fails. This does not apply to single-document retrievals by ID. The same rules apply to aggregation queries.

Rule restricting `stories` to their author:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /stories/{storyid} {
      // Only the authenticated user who authored the document can read or write
      allow read, write: if request.auth != null && request.auth.uid == resource.data.author;
    }
  }
}
```

Invalid (query constraints do not match the rule; fails even if the user authored every story):

```js
// This query will fail
db.collection("stories").get()
```

Valid:

```js
var user = firebase.auth().currentUser;

db.collection("stories").where("author", "==", user.uid).get()
```

### Query on a field

If the rule allows anyone to read a story where `resource.data.published == true` (and authors to read their own), a query must constrain on that field, for example `db.collection("stories").where("published", "==", true).get()`.

### `OR` queries

Each comparison value of `or`, `in` or `array-contains-any` is evaluated separately against the rule:

```text
match /mydocuments/{doc} {
  allow read: if resource.data.x > 5;
}
```

Adapted (not in the official docs): the modular `query()` / `or()` / `where()` functions take a modular `CollectionReference`, so `db.collection("mydocuments")` (namespaced API) is replaced with `collection(db, "mydocuments")` (assumes `db` from `getFirestore()`).

```js
// These queries will fail
query(collection(db, "mydocuments"),
      or(where("x", "==", 1),
         where("x", "==", 6)
      )
    )

query(collection(db, "mydocuments"),
      where("x", "in", [1, 3, 6, 42, 99])
    )
```

The same queries with values that all satisfy the rule (for example `or(where("x", "==", 6), where("x", "==", 42))` or `where("x", "in", [6, 42, 99, 105, 200])`) succeed.

### Constraints on queries (`request.query`)

`request.query` contains the `limit`, `offset` and `orderBy` properties of a query; for example `allow list: if request.query.limit <= 10;`. A full rule set:

```text
service cloud.firestore {

  match /databases/{database}/documents {

    match /stories/{storyid} {

      // Returns `true` if the requested story is 'published'
      // or the user authored the story
      function authorOrPublished() {
        return resource.data.published == true || request.auth.uid == resource.data.author;
      }

      // Deny any query not limited to 10 or fewer documents
      // Anyone can query published stories
      // Authors can query their unpublished stories
      allow list: if request.query.limit <= 10 &&
                     authorOrPublished();

      // Anyone can retrieve a published story
      // Only a story's author can retrieve an unpublished story
      allow get: if authorOrPublished();

      // Only a story's author can write to a story
      allow write: if request.auth.uid == resource.data.author;
    }

  }
}
```

### Collection group queries

Collection group queries need `rules_version = '2';` as the first line and a rule written with `match /{path=**}/[COLLECTION_ID]/{doc}`:

```text
rules_version = '2';
service cloud.firestore {

  match /databases/{database}/documents {
    // Authenticated users can query the posts collection group
    // Applies to collection queries, collection group queries, and
    // single document retrievals
    match /{path=**}/posts/{post} {
      allow read: if request.auth != null;
    }
    match /forums/{forumid}/posts/{postid} {
      // Only a post's author can write to a post
      allow write: if request.auth != null && request.auth.uid == resource.data.author;

    }
  }
}
```

A matching query: `db.collectionGroup("posts").where("author", "==", user.uid).get()`.

## Options / Props

| Item | Detail |
|------|--------|
| `request.query.limit`, `.offset`, `.orderBy` | Query properties available in rules |
| `get` vs `list` | `get` applies to single-document requests; `list` applies to queries and collection requests |
| Collection group index | A collection group query on `author` needs an index on `posts` with collection group scope; without it the query returns an error link to create it |

## Notes

- The source also shows a rule set that restricts a `transactions` collection group by a `user` field duplicated from the path; it is omitted here because its write rule reads `request.data.user` (not a rules variable; the incoming document is `request.resource.data`), and its example query `where("user", "==", user)` passes the user object rather than `user.uid`.
- A collection group rule applies to every collection with that ID regardless of hierarchy (e.g. `/posts/{postid}`, `/forums/{forumid}/posts/{postid}`, `/forums/{forumid}/subforum/{subforumid}/posts/{postid}`). The source also shows the `/stories` and `/forums/{forumid}/posts` published/author collection group rule set and the Web queries against it; omitted for size.
- Corrected from the official docs: the `or` / `in` query samples pass `db.collection("mydocuments")` (namespaced API) to the modular `query()`, which expects `collection(db, "mydocuments")`; the passing variants described in prose need the same change.
- Source: https://docs.cloud.google.com/firestore/native/docs/security/rules-query (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [rules-structure.md](./rules-structure.md)
- [rules-conditions.md](./rules-conditions.md)
