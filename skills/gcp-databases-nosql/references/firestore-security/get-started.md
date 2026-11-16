---
source: https://docs.cloud.google.com/firestore/native/docs/security/get-started
---

# Getting started with security rules

Firestore Security Rules provide access control and data validation for requests from Firestore mobile/web client libraries, without server-side authorization code. Rules are made of `match` statements (identify documents) and `allow` expressions (control access). User-based and role-based access needs Firebase Authentication together with the rules.

## Signature / Usage

### Rules version 2

Version 2 changes recursive wildcard `{name=**}` behavior and is required for collection group queries. Opt in with `rules_version = '2';` as the first line:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
```

### Writing rules

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /<some_path>/ {
      allow read, write: if <some_condition>;
    }
  }
}
```

Every request from a mobile/web client library is evaluated against the rules before any data is read or written. If the rules deny any of the specified document paths, the entire request fails.

The following basic rule sets are valid but not recommended for production.

Auth required:

```text
// Allow read/write access on all documents to any user signed in to the application
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Deny all:

```text
// Deny read/write access to all users under any conditions
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Allow all (source warning: "**NEVER** use this rule set in production; it allows anyone to overwrite your entire database."):

```text
// Allow read/write access to all users under any conditions
// Warning: **NEVER** use this rule set in production; it allows
// anyone to overwrite your entire database.
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Deploying rules with the Firebase CLI

```text
// Set up Firestore in your project directory, creates a .rules file
firebase init firestore

// Edit the generated .rules file to your desired security rules
// ...

// Deploy rules for all configured databases
firebase deploy --only firestore
```

## Options / Props

| Item | Detail |
|------|--------|
| Deploy targets | Firebase console (Rules tab, Publish), Google Cloud console (Firestore Rules tab, Publish), Firebase CLI, Firestore management REST API |
| Propagation | Up to 1 minute for new queries and listeners; up to 10 minutes to fully propagate to active listeners |
| Google Cloud console deploy | Native mode, Standard and Enterprise editions; does not support deploying to the `(default)` database (use Firebase console or Firebase CLI) |
| Simulator | Google Cloud console (Databases > database ID > Security > Simulator; operation types get / create / update / delete) and Firebase console (Rules Playground); simulates against the ruleset in the editor, not the deployed ruleset |
| Permission to test rules in console | `firebaserules.rulesets.test` |
| Permissions to manage/deploy rules in Google Cloud console | `firebaserules.releases.create`, `firebaserules.releases.delete`, `firebaserules.releases.update`, `firebaserules.rulesets.create`, `firebaserules.rulesets.delete`, `firebaserules.rulesets.list`, `firebaserules.rulesets.test` (required for the simulator) |

## Notes

- The server client libraries bypass all Firestore Security Rules and authenticate through Application Default Credentials; for server client libraries, and for REST or RPC requests authorized with a Google Identity OAuth 2.0 token, set up IAM for Firestore (see [iam.md](./iam.md)). REST requests with a Firebase Authentication ID token, or unauthenticated requests, are evaluated by Security Rules (see `firestore-databases-data/use-rest-api.md`).
- Deploying with the Firebase CLI overwrites any existing rules in the Firebase console with the rules defined in your project directory. Try a rules deployment on a disposable project or database first.
- Rules are applied separately for each database; multiple databases need rules deployed for each.
- The "Allow authenticated users" rule set (`allow read, write: if request.auth != null;` on `{document=**}`) lets any signed-in user read, modify and delete every document; add ownership or role checks before using it with real data.
- The "Allow all" rule set allows anyone to read and write the whole database; do not deploy it to a database that holds real data.
- For full validation, the source recommends the Local Emulator Suite for automated unit tests (emulators: see `gcp-client-libraries`).
- Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`); Firebase client-side setup is out of scope of this skill.
- The source also shows Console click-paths for the simulator and deployment, omitted here.
- Source: https://docs.cloud.google.com/firestore/native/docs/security/get-started (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [rules-structure.md](./rules-structure.md)
- [rules-conditions.md](./rules-conditions.md)
- [iam.md](./iam.md)
