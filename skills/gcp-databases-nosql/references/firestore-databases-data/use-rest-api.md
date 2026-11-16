---
source: https://docs.cloud.google.com/firestore/native/docs/use-rest-api
---

# Using the Firestore REST API

Call the Firestore REST API directly for resource-constrained environments (such as IoT devices) or to automate database administration and retrieve detailed metadata. For gRPC-supported languages consider the RPC API instead.

## Signature / Usage

Base URL: `https://firestore.googleapis.com/v1/`. Document path for document `LA` in collection `cities`:

```text
/projects/YOUR_PROJECT_ID/databases/(default)/documents/cities/LA
```

Full URL:

```text
https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/cities/LA
```

Obtain an OAuth 2.0 access token with gcloud (scope `https://www.googleapis.com/auth/datastore`):

```bash
gcloud auth application-default print-access-token
```

Pass the token as `Authorization: Bearer {YOUR_TOKEN}`.

## Options / Props

### Authentication

| Token | Authorization |
|-------|---------------|
| Firebase Authentication ID token (or unauthenticated) | Firestore Security Rules |
| Google Identity OAuth 2.0 token via service account | IAM; requests ignore security rules |

### Method groups

| Method group | Purpose |
|--------------|---------|
| `v1.projects.databases.documents` | CRUD on documents |
| `v1.projects.databases.collectionGroups.indexes` | Index actions (the source: "creating new indexes, disabling an existing index, or listing all current indexes") |

### Error codes (REST and RPC)

| Canonical Error Code | Description | Recommended Action |
|---|---|---|
| `ABORTED` | The request conflicted with another request. | Non-transactional commit: retry or restructure data model to reduce contention. In a transaction: retry the entire transaction or restructure. |
| `ALREADY_EXISTS` | Tried to create a document that already exists. | Do not retry without fixing the problem. |
| `DEADLINE_EXCEEDED` | The server exceeded a deadline. | Retry using exponential backoff. |
| `FAILED_PRECONDITION` | A precondition failed, e.g. a query requires an undefined index. See the `message` field. | Do not retry without fixing the problem. |
| `INTERNAL` | The Firestore server returned an error. | Do not retry this request more than once. |
| `INVALID_ARGUMENT` | A request parameter has an invalid value. | Do not retry without fixing the problem. |
| `NOT_FOUND` | Tried to update a document that does not exist. | Do not retry without fixing the problem. |
| `PERMISSION_DENIED` | The user is not authorized. | Do not retry without fixing the problem. |
| `RESOURCE_EXHAUSTED` | Exceeded quota or region/multi-region capacity. | Verify project quota; if exceeded, do not retry without fixing; otherwise retry with exponential backoff. |
| `UNAUTHENTICATED` | No valid authentication credentials. | Do not retry without fixing the problem. |
| `UNAVAILABLE` | The Firestore server returned an error. | Retry using exponential backoff. |

## Notes

- Success returns HTTP `200 OK`; failures return `4xx` / `5xx` with error information. SDKs and client libraries may not return these same codes.
- Bearer tokens are sensitive: never log or print them, and send them only to `https://` endpoints.
- A service-account OAuth token bypasses Firestore Security Rules; control access with Firestore IAM roles.
- Obtain a Firebase ID token via the Firebase Authentication REST API or from a Firebase Authentication SDK on the client.
- The API Explorer generates OAuth tokens for experimenting: https://developers.google.com/apis-explorer/#search/firestore/firestore/v1/ . Full reference: https://docs.cloud.google.com/firestore/native/docs/reference/rest/
- The `gcloud auth application-default print-access-token` block is the command named inline in this page's prose (the source has no fenced block for it).
- Firestore pages: Google Cloud's managed document database, distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source inconsistency: the source adds that `collectionGroups.indexes` "Also enables retrieval of document metadata, such as the list of all fields and subcollections for a given document." In the Firestore v1 Discovery document, `collectionGroups.indexes` has only `create`, `delete`, `get` and `list`; subcollection IDs come from `projects.databases.documents.listCollectionIds` and per-field index settings from `projects.databases.collectionGroups.fields` (`get`, `list`, `patch`). See `references/rest/firestore/`.
- Source: https://docs.cloud.google.com/firestore/native/docs/use-rest-api (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [manage-databases.md](./manage-databases.md)
