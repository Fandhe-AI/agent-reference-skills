---
source: https://docs.cloud.google.com/workflows/docs/creating-callback-endpoints
---

# Wait for callbacks in a workflow

Callbacks let a workflow execution wait, without polling, for another service to send a request to a callback endpoint; that request resumes the execution. Two standard library functions are used: `events.create_callback_endpoint` (creates an endpoint expecting the specified HTTP method) and `events.await_callback` (waits for a callback at the endpoint).

## Signature / Usage

### Create the endpoint and wait

Adapted (not in the official docs): the log and return steps drop `headers` from `callback_request.http_request` with `map.delete`, because `headers` holds the callback request's headers, callers must authenticate with an `Authorization: Bearer` access token, and the source does not say that header is removed; without this, the headers are written to Cloud Logging and the execution result.

```yaml
    - create_callback:
        call: events.create_callback_endpoint
        args:
            http_callback_method: "GET"
        result: callback_details
    - print_callback_details:
        call: sys.log
        args:
            severity: "INFO"
            text: ${"Listening for callbacks on " + callback_details.url}
    - await_callback:
        call: events.await_callback
        args:
            callback: ${callback_details}
            timeout: 3600
        result: callback_request
    - print_callback_request:
        call: sys.log
        args:
            severity: "INFO"
            text: ${"Received " + json.encode_to_string(map.delete(callback_request.http_request, "headers"))}
    - return_callback_result:
        return: ${map.delete(callback_request.http_request, "headers")}
```

`callback_details.url` is the endpoint URL. `callback_request` holds the whole HTTP request (header, body, a `query` map), so the steps log and return it without `headers`. A text or JSON body is decoded; otherwise raw bytes are returned.

### Call the endpoint (access token required)

The caller needs `workflows.callbacks.send` and must send an access token.

```bash
curl -X GET -H "Authorization: Bearer $(gcloud auth print-access-token)" CALLBACK_URL
```

For a `POST` endpoint a `Content-Type` header is required:

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $(gcloud auth print-access-token)" -d '{"foo" : "bar"}' CALLBACK_URL
```

With a service-account token from `generateAccessToken`:

```bash
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN_STRING" -d '{"foo" : "bar"}' CALLBACK_URL
```

### Find the URL and execution

```bash
gcloud logging read "Listening for callbacks" --freshness=DURATION
```

```bash
gcloud workflows executions describe WORKFLOW_EXECUTION_ID --workflow=WORKFLOW_NAME
```

### Retry the wait

Adapted (not in the official docs): the `print_callback_result` step drops `headers` from `callback_request.http_request` with `map.delete` before logging, for the same reason.

```yaml
    main:
      steps:
        - create_callback:
            call: events.create_callback_endpoint
            args:
                http_callback_method: "GET"
            result: callback_details
        - print_callback_details:
            call: sys.log
            args:
                severity: "INFO"
                text: ${"Listening for callbacks on " + callback_details.url}
        - await_callback:
            try:
                call: events.await_callback
                args:
                    callback: ${callback_details}
                    timeout: 60.0
                result: callback_request
            retry:
                predicate: ${log_timeout}
                max_retries: 5
                backoff:
                    initial_delay: 1
                    max_delay: 10
                    multiplier: 2
        - print_callback_result:
            call: sys.log
            args:
                severity: "INFO"
                text: ${"Received " + json.encode_to_string(map.delete(callback_request.http_request, "headers"))}
    log_timeout:
        params: [e]
        steps:
          - when_to_repeat:
              switch:
                - condition: ${"TimeoutError" in e.tags}
                  steps:
                      - log_error_and_retry:
                          call: sys.log
                          args:
                              severity: "WARNING"
                              text: "Timed out waiting for callback, retrying"
                      - exit_predicate:
                          return: true
          - otherwise:
              return: false
```

### Parallel callbacks

```json
  [
    {
      "createCallbackInParent": {
        "call": "events.create_callback_endpoint",
        "args": {
          "http_callback_method": "POST"
        },
        "result": "callback_details"
      }
    },
    {
      "parallelStep": {
        "parallel": {
          "for": {
            "range": [
              1,
              10
            ],
            "value": "loopValue",
            "steps": [
              {
                "waitForCallbackInChild": {
                  "call": "events.await_callback",
                  "args": {
                    "callback": "${callback_details}"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
```

## Options / Props

### Function arguments

| Argument | Function | Default / values |
|----------|----------|------------------|
| `http_callback_method` | `events.create_callback_endpoint` | One of `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH`. Default `POST`. |
| `callback` | `events.await_callback` | The `callback_details` map from `create_callback_endpoint`. |
| `timeout` | `events.await_callback` | Maximum seconds to wait; default 43200 (12 hours). On expiry a `TimeoutError` is raised. |

### Responses when a second request arrives and `await_callback` ran once

| HTTP status | Meaning |
|-------------|---------|
| `429` Too Many Requests | First callback received but not yet processed; the second is rejected. |
| `200` Success | First callback received and answered; the second is stored and may never be processed (discarded if the workflow ends). |
| `404` Page Not Found | Workflow no longer running (completed or failed); query the execution state. |

## Notes

- Callback endpoints can only be waited on in the execution that created them. Several callbacks may exist in one workflow.
- Authorization: callers (Cloud Run, Cloud Run functions, third-party services) need the IAM permission `workflows.callbacks.send`, included in the Workflows Invoker role. A caller must send an OAuth 2.0 access token (valid for a maximum of 1 hour by default). Generating a token yourself needs Workflows Editor or Workflows Admin plus Service Account Token Creator.
- If several requests reach an endpoint before `await_callback` runs, only the first is accepted; later ones are rejected with `RESOURCE_EXHAUSTED`.
- Callbacks are idempotent. One slot is filled when a request arrives and emptied when `await_callback` processes it; the endpoint can then be reused. In the parallel example one slot is created at `create_callback_endpoint` and each `await_callback` opens a new slot, so ten callbacks can be made concurrently; extra ones are stored and never processed. Callbacks are processed in the order of `await_callback` calls, but branch execution order is non-deterministic.
- A literal `ACCESS_TOKEN_STRING` on the command line lands in shell history; the `$(gcloud auth print-access-token)` form keeps it out of history, but either way the token is in curl's arguments and visible in the process list while curl runs. Never log or print the token.
- There is a maximum execution duration (resource limits in https://docs.cloud.google.com/workflows/quotas#resource_limits).
- Source warning: a workflow that uses callbacks and was last deployed on or before January 11, 2022 had to be redeployed by July 4, 2022.
- `DURATION` in `--freshness` limits the returned log entries (the gcloud `logging read` help gives `default="1d"`). `gcloud workflows executions describe` also takes `--location` (the 593.0.0 help lists other ways to set it).
- Omitted: the "catch timeout errors" sample (wraps `await_callback` in `try` / `except` and logs `e.message`), Console steps, the YAML form of the parallel sample (its indentation in the source puts `call` and `parallel` beside the step name, not under it, so the JSON form is kept), the JSON forms of other samples (the source's `print_callback_request` JSON escapes quotes as `\\"`), the Node.js snippet that fetches a token with `google-auth-library` and the "request offline access" section.
- Google Cloud Workflows - not Cloudflare Workflows (`cloudflare-stateful`) or Inngest functions (`inngest`).
- Adapted from the official docs: the source logged `${"Received " + json.encode_to_string(callback_request.http_request)}` and returned `${callback_request.http_request}`, including the request `headers`; `map.delete` (https://docs.cloud.google.com/workflows/docs/reference/stdlib/map/delete) returns a copy of the map without the given key.
- Source: https://docs.cloud.google.com/workflows/docs/creating-callback-endpoints (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [stdlib-overview.md](./stdlib-overview.md)
- [authenticate-from-workflow.md](./authenticate-from-workflow.md)
- [trigger-workflow-eventarc.md](./trigger-workflow-eventarc.md)
