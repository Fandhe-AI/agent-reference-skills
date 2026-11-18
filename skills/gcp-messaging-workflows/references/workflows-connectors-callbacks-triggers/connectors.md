---
source: https://docs.cloud.google.com/workflows/docs/connectors
---

# Workflows connectors

Workflows connectors are built-in steps that call other Google Cloud APIs from a workflow. They format requests for you, provide methods and arguments, and have built-in behavior for retries and long-running operations (LRO). The full list is in the Connectors reference: https://docs.cloud.google.com/workflows/docs/reference/googleapis.

## Signature / Usage

A failed LRO connector call throws an exception with these attributes: `message` (human-readable error message), `tags` (a list of tags; for an LRO connector call it includes `OperationError`) and `operation` (the failed long-running operation object).

Adapted (not in the official docs): the `connection_problem`, `url_not_found` and `auth_problem` steps `raise` their message instead of `return`ing it, so a handled failure ends the execution as failed rather than as a successful execution whose result is an error string.

```yaml
- read_item:
    try:
      call: http.get
      args:
        url: https://example.com/someapi
        auth:
          type: OIDC
      result: API_response
    except:
      as: e
      steps:
        - known_errors:
            switch:
              - condition: ${not("HttpError" in e.tags)}
                next: connection_problem
              - condition: ${e.code == 404}
                next: url_not_found
              - condition: ${e.code == 403}
                next: auth_problem
        - unhandled_exception:
            raise: ${e}
- url_found:
    return: ${API_response.body}
- connection_problem:
    raise: "Connection problem; check URL"
- url_not_found:
    raise: "Sorry, URL wasn't found"
- auth_problem:
    raise: "Authentication error"
```

## Options / Props

### Retry and timeout defaults

| Behavior | Default | How to change |
|----------|---------|---------------|
| Retry policy for GET requests | Idempotent retry policy | not stated |
| Retry policy for all other HTTP methods | Non-idempotent retry policy | not stated |
| Request timeout | 30 minutes (for LROs this applies to individual requests such as starting the operation or checking its status) | `connector_params` field (see Connectors reference) |
| LRO call timeout | 30 minutes | `connector_params` field, to a maximum of one year |
| LRO polling | Exponential backoff of 1.25, starting at 1 second and slowing to 60 seconds between polls; each polling attempt counts as a billable step | `connector_params` field |

### Errors

| Error | When |
|-------|------|
| `ResponseTypeError` | A poll response payload is invalid. |
| `OperationError` | An error occurs during a long-running operation; has an additional `error` attribute with operation-specific details. |

## Notes

- Authentication: connectors use built-in IAM authentication, but the workflow's service account still needs permissions. Example: to publish to Pub/Sub, the service account needs `roles/pubsub.publisher`. See https://docs.cloud.google.com/workflows/docs/authentication.
- Workflows blocks the execution until an LRO completes successfully or fails. The retry mechanism applies to a failed polling attempt. A failed LRO throws an exception, so catch it with `try` / `except` rather than treating the call as successful.
- Connector API operations are not the same as invoking a service such as Cloud Run functions or Cloud Run, which is done with an HTTP request.
- "Connectors" here are Workflows connectors (built-in steps that call Google Cloud APIs) - not Integration Connectors of Application Integration (`gcp-integration`) and not Kafka Connect connectors (source and sink plugins on a Connect cluster).
- Snippet taken from https://docs.cloud.google.com/workflows/docs/http-requests (catching errors by `e.tags` and `e.code`). The connectors page has no code block of its own; the snippet's `http.get` step is an HTTP request, not a connector call.
- Corrected from the official docs: the custom exception handler ended with `return: "Connection problem; check URL"`, `return: "Sorry, URL wasn't found"` and `return: "Authentication error"`, which complete the execution successfully with an error message as its result; they now use `raise`.
- Source: https://docs.cloud.google.com/workflows/docs/connectors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [http-requests.md](./http-requests.md)
- [authenticate-from-workflow.md](./authenticate-from-workflow.md)
- [stdlib-overview.md](./stdlib-overview.md)
