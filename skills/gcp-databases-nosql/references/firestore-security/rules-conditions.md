---
source: https://docs.cloud.google.com/firestore/native/docs/security/rules-conditions
---

# Write conditions for security rules

A condition is a boolean expression that allows or denies an operation. Conditions can check authentication, validate incoming data, or read other documents.

## Signature / Usage

### Authentication

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow the user to access documents in the "cities" collection
    // only if they are authenticated.
    match /cities/{city} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Users can only read and write their own data:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // Make sure the uid of the requesting user matches name of the user
    // document. The wildcard expression {userId} makes the userId variable
    // available in rules.
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
  }
}
```

### Data validation

`resource.data` is the stored document; `request.resource.data` is the pending state after a write:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow the user to read data if the document has the 'visibility'
    // field set to 'public'
    match /cities/{city} {
      allow read: if resource.data.visibility == 'public';
    }
  }
}
```

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // Make sure all cities have a positive population and
    // the name is not changed
    match /cities/{city} {
      allow update: if request.resource.data.population > 0
                    && request.resource.data.name == resource.data.name;
    }
  }
}
```

### Access other documents

`get()` and `exists()` need fully specified paths; escape variables with `$(variable)`:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      // Make sure a 'users' document exists for the requesting user before
      // allowing any writes to the 'cities' collection
      allow create: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid));

      // Allow the user to delete cities if their user document has the
      // 'admin' field set to 'true'
      allow delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
  }
}
```

`getAfter()` reads a document's state after a transaction or batch of writes completes but before it commits; use it to require sets of writes that must happen together.

### Custom functions

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // True if the user is signed in or the requested data is 'public'
    function signedInOrPublic() {
      return request.auth.uid != null || resource.data.visibility == 'public';
    }

    match /cities/{city} {
      allow read, write: if signedInOrPublic();
    }

    match /users/{user} {
      allow read, write: if signedInOrPublic();
    }
  }
}
```

### Rules are not filters

With `allow read: if resource.data.visibility == 'public';` this query is denied (result set could include non-public documents):

```js
db.collection("cities").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
    });
});
```

The same query with `.where("visibility", "==", "public")` before `.get()` is allowed, because the `where` clause guarantees the result satisfies the rule.

## Options / Props

| Item | Limit / behavior |
|------|------------------|
| Document access calls per rule set evaluation | 10 for single-document requests and query requests; 20 for multi-document reads, transactions and batched writes (10 also applies to each operation). Exceeding either limit gives permission denied; cached calls do not count |
| Example | A batched write of 3 writes, each using 2 access calls: each write uses 2 of its 10 calls, the batch uses 6 of its 20 |
| Function body | A single `return` statement only; no loops or external calls |
| Function recursion | Not allowed; total call stack depth limited to 10 |
| `let` bindings | Rules version `v2` only; up to 10 per function; function must end with a return statement |

## Notes

- `get()`, `exists()` and `getAfter()` execute reads in your database; you are billed for them even if the rules reject the request.
- `request.auth` carries authentication information when the app uses Firebase Authentication or Google Cloud Identity Platform.
- The source also shows a Web-only query sample (other platform tabs are not present in the twin).
- Source: https://docs.cloud.google.com/firestore/native/docs/security/rules-conditions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [rules-structure.md](./rules-structure.md)
- [rules-query.md](./rules-query.md)
- [rules-fields.md](./rules-fields.md)
