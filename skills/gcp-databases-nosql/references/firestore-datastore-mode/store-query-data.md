---
source: https://docs.cloud.google.com/datastore/docs/store-query-data
---

# Store and query data in Firestore in Datastore mode

Quickstart for creating a Datastore mode database, storing a `Task` entity, and querying it by kind or by Google Query Language (GQL) in the Google Cloud console.

## Signature / Usage

### GQL queries from the quickstart

The queries below are the ones quoted in the source text (entered in the console's **Query by GQL** editor). Kind and property names are case sensitive.

```sql
SELECT * FROM Task
SELECT * FROM Task WHERE done=false
SELECT * FROM Task WHERE done=true
```

### Console steps (summary)

1. Open the Datastore page, select a database mode and a location, then click **Create database**.
2. On the Entities page click **Create entity**, use `[default]` for **Namespace**, kind `Task`, key identifier `Numeric ID (auto-generated)`.
3. Query by kind (add a `WHERE done == false` clause) or by GQL.
4. Clean up by deleting the `Task` entity.

## Options / Props

### Required permissions (non-owners)

| Requirement | Detail |
|---|---|
| Datastore Owner role | Contains `datastore.databases.create`, needed to create a Datastore mode instance |
| `appengine.applications.create` | Needed if the project has no App Engine application; the quickstart creates one. Assign via an IAM custom role |

### Properties of the sample entity

| Name | Type | Value | Indexed |
|---|---|---|---|
| description | String | Learn about Datastore. | no |
| created | Date and time | (today's date) | yes |
| done | Boolean | False | yes |

## Notes

- This quickstart states: "Datastore mode requires an active App Engine application" (it creates one, which needs `appengine.applications.create`, if the project has none). This is a precondition of the console quickstart; the manage-databases page creates Datastore mode databases with `gcloud firestore databases create --type=datastore-mode` and lists `roles/datastore.owner` as the required role, with no App Engine requirement.
- This quickstart states: "You can't use both modes in the same project." Source inconsistency: the current [manage-databases](https://docs.cloud.google.com/firestore/native/docs/manage-databases) page says "You can create multiple Firestore databases per project" and creates each one with `--type=firestore-native` or `--type=datastore-mode`, so the Native / Datastore mode choice is per database, not per project. Native Mode is recommended for mobile and web apps; Datastore mode for app architectures with backend servers.
- Datastore mode supports multi-region and regional locations. A multi-region location maximizes availability and durability; regional locations offer lower write latency. In this quickstart, the location applies to both the Datastore mode database and the App Engine app in the project.
- Warning from the source: once you create your database, you cannot change the location.
- The GQL editor autocompletes kinds with Ctrl+Space (up to 300 alphabetically sorted kinds).
- Deleting an entity is permanent. Try deletes on a disposable resource first.
- The source shows Console steps only; no gcloud or client-library code.
- Source: https://docs.cloud.google.com/datastore/docs/store-query-data (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [indexes.md](./indexes.md)
- [multitenancy.md](./multitenancy.md)
