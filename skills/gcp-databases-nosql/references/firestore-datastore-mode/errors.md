---
source: https://docs.cloud.google.com/datastore/docs/concepts/errors
---

# Error codes (Datastore API)

A successful request returns HTTP `200 OK`. A failed request returns an HTTP `4xx` or `5xx` status code plus a response describing the error. Classify errors by the canonical error code (`google.rpc.Code`).

## Signature / Usage

### Error response structure (JSON)

```json
{
  "error": {
    "code": "integer",
    "message": "string",
    "status": "string"
  }
}
```

### Example error response

```json
{
  "error": {
    "code": 400,
    "message": "Key path is incomplete: [Person: null]",
    "status": "INVALID_ARGUMENT"
  }
}
```

## Options / Props

### Error response fields

| Element | Description |
|---|---|
| `code` | An HTTP status code that generically identifies the request failure |
| `message` | Specific information about the request failure |
| `status` | The canonical error code (`google.rpc.Code`) |

### Canonical error codes

| Canonical Error Code | Description | Recommended Action |
|---|---|---|
| `ABORTED` | The request conflicted with another request. | Non-transactional commit: retry the request or structure entities to reduce contention. Part of a transactional commit: retry the entire transaction or structure entities to reduce contention. |
| `ALREADY_EXISTS` | The request attempted to insert an entity that already exists. | Do not retry without fixing the problem. |
| `DEADLINE_EXCEEDED` | A deadline was exceeded on the server. | Retry using exponential backoff. |
| `FAILED_PRECONDITION` | A precondition was not met; the message gives details. One possible cause is running a query that requires an index not yet defined. | Do not retry without fixing the problem. |
| `INTERNAL` | Server returned an error. | Do not retry this request more than once. |
| `INVALID_ARGUMENT` | A request parameter has an invalid value; the message says which. | Do not retry without fixing the problem. |
| `NOT_FOUND` | The request attempted to update an entity that does not exist. | Do not retry without fixing the problem. |
| `PERMISSION_DENIED` | The user was not authorized to make the request. | Do not retry without fixing the problem. |
| `RESOURCE_EXHAUSTED` | The project exceeded its quota or the region/multi-region capacity. | Verify the project quota was not exceeded. If it was, do not retry without fixing the problem; otherwise retry with exponential backoff. |
| `UNAUTHENTICATED` | The request did not have valid authentication credentials. | Do not retry without fixing the problem. |
| `UNAVAILABLE` | Server returned an error. | Retry using exponential backoff. |

## Notes

- A request with content type `application/x-protobuf` that fails returns a serialized `google.rpc.Status` message as the payload; in those errors the canonical code is in the `code` field.
- The message text can change at any time; do not depend on it.
- These are errors of the low-level Datastore API; client libraries may or may not return the same values.
- Source: https://docs.cloud.google.com/datastore/docs/concepts/errors (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [transactions.md](./transactions.md)
- [indexes.md](./indexes.md)
- [limits.md](./limits.md)
