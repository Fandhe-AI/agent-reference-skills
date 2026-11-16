---
source: https://docs.cloud.google.com/firestore/native/docs/security/rules-structure
---

# Structure security rules

Syntax and structure of Firestore Security Rules: service and database declaration, basic and granular rules, hierarchical data, recursive wildcards (rules version 1 vs 2), overlapping matches and limits.

## Signature / Usage

### Service and database declaration

Every ruleset wraps its rules in `service cloud.firestore` and `match /databases/{database}/documents` (shown in the next block). The `{database}` wildcard lets the rules reference any database, but the rules are only active on databases where they are explicitly deployed.

### Basic read/write rules

```text
service cloud.firestore {
  match /databases/{database}/documents {

    // Match any document in the 'cities' collection
    match /cities/{city} {
      allow read: if <condition>;
      allow write: if <condition>;
    }
  }
}
```

### Granular operations

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // A read rule can be divided into get and list rules

    match /cities/{city} {
      // Applies to single document read requests
      allow get: if <condition>;

      // Applies to queries and collection read requests
      allow list: if <condition>;
    }
    // A write rule can be divided into create, update, and delete rules
    match /cities/{city} {
      // Applies to writes to nonexistent documents
      allow create: if <condition>;

      // Applies to writes to existing documents
      allow update: if <condition>;

      // Applies to delete operations
      allow delete: if <condition>;
    }
  }
}
```

### Hierarchical data

Rules apply only at the matched path; subcollections need explicit rules. Nested `match` paths are relative to the outer match:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow read, write: if <condition>;

        // Explicitly define rules for the 'landmarks' subcollection
        match /landmarks/{landmark} {
          allow read, write: if <condition>;
        }
    }
  }
}
```

### Recursive wildcards (version 2)

```text
rules_version = '2';
service cloud.firestore {
 match /databases/{database}/documents {
   // Matches any document in the cities collection as well as any document
   // in a subcollection.
   match /cities/{city}/{document=**} {
     allow read, write: if <condition>;
   }
 }
}
```

A wildcard can be placed anywhere in the match in version 2, for example `match /{path=**}/songs/{song}` matches any document in the `songs` collection group.

### Overlapping match statements

If multiple `allow` expressions match a request, access is allowed if **any** condition is `true`. In the following ruleset all reads and writes to `cities` are allowed because the second rule is always `true`:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // Matches any document in the 'cities' collection.
    match /cities/{city} {
      allow read, write: if false;
    }

    // Matches any document in the 'cities' collection or subcollections.
    match /cities/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Options / Props

| Limit | Details |
|---|---|
| Maximum `exists()`, `get()`, `getAfter()` calls per request | 10 for single-document requests and query requests; 20 for multi-document reads, transactions, and batched writes (the limit of 10 also applies to each operation; cached calls do not count). Exceeding either limit results in a permission denied error |
| Maximum nested `match` statement depth | 10 |
| Maximum path length, in path segments, within nested `match` statements | 100 |
| Maximum path capture variables within nested `match` statements | 20 |
| Maximum function call depth | 20 (the rules-conditions page says 10; see Notes) |
| Maximum number of function arguments | 7 |
| Maximum `let` variable bindings per function | 10 |
| Maximum recursive or cyclical function calls | 0 (not permitted) |
| Maximum expressions evaluated per request | 1,000 |
| Maximum size of a ruleset | 256 KB for the published ruleset text source (Firebase console or `firebase deploy`); 250 KB for the compiled ruleset |

| Rules version | Recursive wildcard `{name=**}` |
|---|---|
| 1 (default) | Matches one or more path items, not an empty path; must come at the end of a match statement |
| 2 (`rules_version = '2';`) | Matches zero or more path items; at most one per match statement, anywhere in it; required for collection group queries |

## Notes

- All `match` statements should point to documents, not collections. You can only access documents your rules specifically allow.
- The source says "While a project can contain up to 100 databases, only the first database created is designated as the default." Source inconsistency: the manage-databases page defines the default database by ID — creating a database without an ID gives "a database named `(default)`", "A named database includes any database not named `(default)`", and the Firebase SDKs and Google API Client Libraries connect to `(default)` by default. Treat the default database as the one with ID `(default)`, not the first one created. Rules are applied and deployed per database.
- The `{document=**}` variable holds the entire matching path segment (e.g. `SF/landmarks/coit_tower`).
- The overlapping-match example contains `allow read, write: if true;`, which lets anyone read and write the matched documents; it illustrates the pitfall and must not be deployed as is.
- The server client libraries bypass Firestore Security Rules (see [iam.md](./iam.md)).
- Firestore is Google Cloud's managed document database; Firebase client-side setup is out of scope of this skill.
- The source's service-declaration-only block and the `songs` collection group block are summarized in prose.
- Source inconsistency: this table lists "Maximum function call depth" as 20, while the rules-conditions page says "The total call stack depth is limited to 10" (see `rules-conditions.md`); design for 10 to stay within both.
- Source: https://docs.cloud.google.com/firestore/native/docs/security/rules-structure (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-started.md](./get-started.md)
- [rules-conditions.md](./rules-conditions.md)
- [rules-query.md](./rules-query.md)
