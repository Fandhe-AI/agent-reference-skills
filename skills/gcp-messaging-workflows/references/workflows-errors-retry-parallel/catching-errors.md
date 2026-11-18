---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/catching-errors
---

# Catch and handle errors in Workflows (try / except)

A Workflows step that throws an error during execution can be caught and handled with a `try/except` structure, optionally combined with `retry` (`try/retry/except`). The caught error is bound to a map variable named by `as`. An HTTP request that returns status code `400` or greater counts as failed and fails the execution unless the workflow catches the error.

## Signature / Usage

### try / except structure

```text
  - STEP_NAME:
     try:
         call: http.get
         ...
     except:
         as: ERROR_MAP
         steps:
             ...
```

### Handle HTTP status codes, re-raise unknown errors

Adapted (not in the official docs): the known-error conditions `raise` their message instead of `return`ing it, so a handled failure ends the execution as failed rather than as a successful execution whose result is an error string.

```yaml
  - read_item:
      try:
          call: http.get
          args:
              url: https://host.com/api
          result: api_response
      except:
          as: e
          steps:
              - known_errors:
                  switch:
                  - condition: ${not("HttpError" in e.tags)}
                    raise: "Connection problem."
                  - condition: ${e.code == 404}
                    raise: "Sorry, URL wasn't found."
                  - condition: ${e.code == 403}
                    raise: "Authentication error."
              - unhandled_exception:
                  raise: ${e}
  - url_found:
      return: ${api_response.body}
```

### Several steps sharing one except block

```text
  - read_item:
      try:
          steps:
              - step_a:
                  call: http.get
                  args:
                      url: https://host.com/api
                  result: api_response1
              - step_b:
                  call: http.get
                  args:
                      url: https://host.com/api2
                  result: api_response2
                  ...
      except:
          as: e
          steps:
              - KnownErrors:
              ...
```

### try / retry / except

Adapted (not in the official docs): the `404` and `408` conditions `raise` `"notfound_404"` / `"timeout_408"` instead of `return`ing them, so the execution does not end as successful after the retries fail, and they read the status with `map.get(e, "code")` so an error without a `code` key is re-raised by `raiseError` instead of failing in the condition.

```yaml
  - step_name:
      try:
          steps:
              - step_a:
                  call: http.get
                  args:
                      url: https://httpstat.us/404
      retry: ${http.default_retry_non_idempotent}
      except:
          as: e
          steps:
              - checkForTimeout:
                  switch:
                  - condition: ${map.get(e, "code") == 404}
                    raise: "notfound_404"
                  - condition: ${map.get(e, "code") == 408}
                    raise: "timeout_408"
              - raiseError:
                  raise: ${e}
  - returnSuccess:
      return: "Success"
```

### Custom exception handler with OIDC-authenticated call

If the exception is not recognized, the execution fails and throws the exception returned by the GET request. The same pattern can catch exceptions raised by Cloud Run or Cloud Run functions workloads.

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

### Error map for an `HttpError` (HTTP status code >= `400`)

| Attribute | Description |
|-----------|-------------|
| `tags` | `HttpError` string |
| `message` | human-readable error message |
| `code` | HTTP status code |
| `headers` | response headers |
| `body` | response body |

### Steps allowed in an `except` `steps` block (the block is optional)

| Step | Documentation |
|------|---------------|
| `assign` | https://docs.cloud.google.com/workflows/docs/reference/syntax/variables#assign-step |
| `call` | https://docs.cloud.google.com/workflows/docs/reference/syntax/calls |
| `for` | https://docs.cloud.google.com/workflows/docs/reference/syntax/iteration#for-in |
| `parallel` | https://docs.cloud.google.com/workflows/docs/reference/syntax/parallel-steps |
| `raise` | https://docs.cloud.google.com/workflows/docs/reference/syntax/raising-errors |
| `return` | https://docs.cloud.google.com/workflows/docs/reference/syntax/completing#using-return |
| `steps` | https://docs.cloud.google.com/workflows/docs/reference/syntax/steps |
| `switch` | https://docs.cloud.google.com/workflows/docs/reference/syntax/conditions |
| `try` | https://docs.cloud.google.com/workflows/docs/reference/syntax/catching-errors |

## Notes

- Adapted from the official docs: in the `try` / `retry` / `except` sample the conditions read `e.code` directly, but only the `HttpError` error map documents `code`; the example uses `map.get(e, "code")` (returns `null` for a missing key, https://docs.cloud.google.com/workflows/docs/reference/stdlib/map/get) so that a `ConnectionError` or `TimeoutError` reaches `raiseError: raise: ${e}`. The other samples check `not("HttpError" in e.tags)` first, so they read `e.code` only for HTTP errors.
- Replace `ERROR_MAP` with the name of a map variable that contains the error. For other error tags see Workflow errors: https://docs.cloud.google.com/workflows/docs/reference/syntax/error-types
- Known issue: placing `for` directly after `try` causes an error. See https://docs.cloud.google.com/workflows/docs/issues
- Variable scope: a variable created inside an `except` block is local to that block. To use it outside the block, assign it before the block so it lives in the surrounding scope (https://docs.cloud.google.com/workflows/docs/reference/syntax/variables#assign-outer-scope).
- The `try` block can contain multiple steps that share the same `except` block.
- The `http.default_retry_non_idempotent` policy in the try/retry/except sample is meant for steps that cannot be safely repeated; see the retry page for the policies.
- Google Cloud Workflows, not Cloudflare Workflows (`cloudflare-stateful`) or Inngest functions (`inngest`).
- The source also shows the JSON form of every example; it is omitted here.
- Corrected from the official docs: the status-code sample returned `"Connection problem."`, `"Sorry, URL wasn't found."` and `"Authentication error."`, and the try / retry / except sample returned `"notfound_404"` and `"timeout_408"`, from the `except` block (`return:`), which completes the execution successfully; they now use `raise`.
- Corrected from the official docs: the custom exception handler ended with `return: "Connection problem; check URL"`, `return: "Sorry, URL wasn't found"` and `return: "Authentication error"`, which complete the execution successfully with an error message as its result; they now use `raise`.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/catching-errors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [raising-errors.md](./raising-errors.md)
- [retrying.md](./retrying.md)
- [parallel-steps.md](./parallel-steps.md)
- Workflow errors: https://docs.cloud.google.com/workflows/docs/reference/syntax/error-types
