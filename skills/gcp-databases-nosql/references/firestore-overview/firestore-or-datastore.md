---
source: https://docs.cloud.google.com/datastore/docs/firestore-or-datastore
---

# Firestore or Datastore

When creating a Firestore database you can make it compatible with Datastore APIs (Firestore in Datastore mode). This database-level setting is for backwards compatibility and disables access to new Firestore capabilities. The source twin has no H1; the title follows the URL.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create (the page itself has no code). Create a Datastore Mode database in `us-east1`:

```bash
gcloud firestore databases create --location=us-east1 \
  --type=datastore-mode
```

## Options / Props

| Topic | Firestore (Native) | Datastore compatibility |
|---|---|---|
| Storage layer | Strongly consistent | Same availability, performance, consistency and scalability (API layer on Firestore) |
| Data model | Collection and document data model | Datastore data model |
| Query capabilities | Rich queries | Accepts Datastore API requests and denies Firestore API requests |
| Indexes | Firestore indexes (wider variety, more configurable) | Datastore indexes |
| Real-time updates | Available | Not available |
| Client libraries | Mobile and web client libraries | Datastore client libraries |

## Notes

- Datastore compatibility is a database-level setting; you don't have to enable it for all databases in a project.
- Use it only for applications that depend on the Datastore APIs, such as legacy App Engine apps. Beyond better App Engine integration, it offers no benefit over using Firestore directly.
- Firestore is the successor to Datastore and is backward compatible with Datastore, but the new data model, real-time updates and mobile/web client libraries are not available through Datastore compatibility.
- Get started: Firestore client libraries https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library; Datastore client libraries https://docs.cloud.google.com/datastore/docs/reference/libraries.
- Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility) is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/datastore/docs/firestore-or-datastore (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create (gcloud 593.0.0 help text, EXAMPLES section)

## Related

- [overview.md](./overview.md)
- [editions-overview.md](./editions-overview.md)
