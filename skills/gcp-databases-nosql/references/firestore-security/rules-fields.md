---
source: https://docs.cloud.google.com/firestore/native/docs/security/rules-fields
---

# Control access to specific fields

Use Firestore Security Rules to control changes at field level: require, forbid or allowlist fields on create, restrict changed fields on update, and enforce field types.

## Signature / Usage

### Read access for specific fields

Reads are document-level; security rules alone cannot hide fields inside a document. Put private fields in a separate document (e.g. `/employees/{emp_id}/private/finances`) and give it stricter rules.

Adapted (not in the official docs): the source used `request.resource.auth` (a read has no `request.resource`; the auth variable is `request.auth`), and statements lacked semicolons; the second rule gets an explicit `!= null` so it evaluates to a boolean.

```text
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow any logged in user to view the public employee data
    match /employees/{emp_id} {
      allow read: if request.auth != null;
      // Allow only users with the custom auth claim of "Finance" to view
      // the employee's financial data
      match /private/finances {
        allow read: if request.auth != null &&
          request.auth.token.role == 'Finance';
      }
    }
  }
}
```

### Required and forbidden fields on create

These conditions only validate fields; combine them with authentication and ownership or role checks, because a parent `match` condition does not apply to nested `allow` statements. To require fields, the source's rule is `allow create: if request.resource.data.keys().hasAll(['name', 'location', 'city']);`. To forbid fields, it uses `allow create: if (!request.resource.data.keys().hasAny(['average_score', 'rating_count']));` (both on `match /restaurant/{restId}`). The allowlist below combines required and optional fields.

### Allowlist, with required and optional fields

Adapted (not in the official docs): `rules_version = '2';` is added because the rule set uses `let`, which is available only in rules version 2 (rules default to version 1); and because field validation alone is not authorization, the rule also requires a signed-in user with the `Editor` custom claim (`request.auth.token.role`, the same custom-claim pattern as the `Finance` example above).

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function verifyFields(required, optional) {
      let allAllowedFields = required.concat(optional);
      return request.resource.data.keys().hasAll(required) &&
        request.resource.data.keys().hasOnly(allAllowedFields);
    }
    match /restaurant/{restId} {
      allow create: if request.auth != null &&
        request.auth.token.role == 'Editor' &&
        verifyFields(['name', 'location', 'city'],
          ['address', 'hours', 'cuisine']);
    }
  }
}
```

### Restrict fields on update

`request.resource.data.keys()` is the whole post-update document, so use `diff()` against `resource.data` and `affectedKeys()`:

Adapted (not in the official docs): field validation alone is not authorization, so the rule also requires a signed-in user with the `Editor` custom claim (`request.auth.token.role`, the same custom-claim pattern as the `Finance` example above).

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /restaurant/{restId} {
      // Allow the client to update a document only if that document doesn't
      // change the average_score or rating_count fields
      allow update: if request.auth != null &&
        request.auth.token.role == 'Editor' &&
        (!request.resource.data.diff(resource.data).affectedKeys()
          .hasAny(['average_score', 'rating_count']));
    }
  }
}
```

The allowlist form is generally considered more secure because writes to new fields are disallowed until explicitly allowed:

Adapted (not in the official docs): field validation alone is not authorization, so the rule also requires a signed-in user with the `Editor` custom claim (`request.auth.token.role`, the same custom-claim pattern as the `Finance` example above).

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /restaurant/{restId} {
    // Allow a client to update only these 6 fields in a document
      allow update: if request.auth != null &&
        request.auth.token.role == 'Editor' &&
        (request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['name', 'location', 'city', 'address', 'hours', 'cuisine']));
    }
  }
}
```

### Enforce field types

Adapted (not in the official docs): field validation alone is not authorization, so the rule also requires a signed-in user (`request.auth != null`).

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /restaurant/{restId} {
      // Restaurant rules go here...
      match /review/{reviewId} {
        allow create: if request.auth != null &&
          (request.resource.data.score is int &&
          request.resource.data.headline is string &&
          request.resource.data.content is string &&
          request.resource.data.author_name is string &&
          request.resource.data.review_date is timestamp
        );
      }
    }
  }
}
```

Optional fields: `get` on a map supplies a default so a missing field does not cause an error (which denies the request):

```text
function reviewFieldsAreValidTypes(docData) {
   return docData.score is int &&
        docData.headline is string &&
        docData.content is string &&
        docData.author_name is string &&
        docData.review_date is timestamp &&
        docData.get('photo_url', '') is string &&
        docData.get('tags', []) is list;
}
```

## Options / Props

| Item | Detail |
|------|--------|
| Valid `is` types | `bool`, `bytes`, `float`, `int`, `list`, `latlng`, `number`, `path`, `map`, `string`, `timestamp` |
| Rules-generated `is` types | `constraint`, `duration`, `set`, `map_diff` (rarely used for client data) |
| Generics | `list` and `map` have no type arguments; check entries individually by index or key |

## Notes

- Corrected from the official docs: the private-finances example used `request.resource.auth != null` / `request.resource.auth && request.resource.auth.token.role == 'Finance'` and had no semicolons; changed to `request.auth` checks with semicolons.
- Rules either allow the whole write or reject it; partial writes are never allowed.
- Firestore is schemaless, so field presence and types are enforced only through rules.
- Field types must be enforced on both create and update; share a helper function between the two.
- The source's `orders` (list / map type) example and the create + update helper example are omitted: their brace nesting and trailing `&&` are malformed in the source.
- The source's separate required-fields and forbidden-fields rule sets are summarized in prose; the conditions are quoted from them.
- Corrected from the official docs: the restaurant `create` / `update` samples and the review `create` sample check only fields and types, so anyone (including unauthenticated users) could create or overwrite documents that pass validation. The restaurant rules now also require `request.auth.token.role == 'Editor'` (an example custom claim; use your app's own ownership or role check) and the review rule requires a signed-in user. Field validation is not authorization.
- Corrected from the official docs: the `verifyFields` helper sample uses `let` without a `rules_version = '2';` declaration; rules use version 1 by default and `let` requires version 2.
- Source: https://docs.cloud.google.com/firestore/native/docs/security/rules-fields (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [rules-conditions.md](./rules-conditions.md)
- [rules-structure.md](./rules-structure.md)
