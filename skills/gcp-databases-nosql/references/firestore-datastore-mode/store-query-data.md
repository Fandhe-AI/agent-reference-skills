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

- Datastore mode requires an active App Engine application.
- Native Mode and Datastore mode cannot both be used in the same project. Native Mode is recommended for mobile and web apps; Datastore mode for app architectures with backend servers.
- Datastore mode supports multi-region and regional locations. A multi-region location maximizes availability and durability; regional locations offer lower write latency. The location applies to both Datastore mode databases and App Engine apps in the project.
- Warning from the source: once you create your database, you cannot change the location.
- The GQL editor autocompletes kinds with Ctrl+Space (up to 300 alphabetically sorted kinds).
- Deleting an entity is permanent. Try deletes on a disposable resource first.
- The source shows Console steps only; no gcloud or client-library code.
- Source: https://docs.cloud.google.com/datastore/docs/store-query-data (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [indexes.md](./indexes.md)
- [multitenancy.md](./multitenancy.md)
