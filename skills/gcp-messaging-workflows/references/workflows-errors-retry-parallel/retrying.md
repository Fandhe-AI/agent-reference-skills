---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/retrying
---

# Retry steps in Workflows

A retry policy in a `try/retry` structure defines which error codes are retried, the maximum number of retries and a backoff model. There are default policies for idempotent and non-idempotent steps, default predicates with custom configuration values, and custom predicates written as subworkflows.

## Signature / Usage

### Default retry policy

```text
- step_name:
    try:
        steps:
            STEPS_BLOCK
    retry: RETRY_POLICY
```

Idempotent step:

```yaml
- idempotent_step:
    try:
        call: http.get
        args:
            url: https://example.com/api
    retry: ${http.default_retry}
```

Non-idempotent step:

```yaml
- non_idempotent_step:
    try:
        call: http.get
        args:
            url: https://example.com/api
    retry: ${http.default_retry_non_idempotent}
```

### Default predicate with custom configuration values

```text
- step_name:
    try:
        steps:
            STEPS_BLOCK
    retry:
        predicate: RETRY_PREDICATE
        max_retries: NUMBER_OF_RETRIES
        backoff:
            initial_delay: DELAY_SECONDS
            max_delay: MAX_DELAY_SECONDS
            multiplier: DELAY_MULTIPLIER
```

```yaml
- read_item:
    try:
      call: http.get
      args:
        url: https://example.com/someapi
      result: api_response
    retry:
      predicate: ${http.default_retry_predicate}
      max_retries: 5
      backoff:
        initial_delay: 2
        max_delay: 60
        multiplier: 2
```

### Custom retry policy (predicate subworkflow)

The predicate is a subworkflow that takes the error map as its single argument and returns `true` to retry, otherwise `false`.

Adapted (not in the official docs): `steps:` is added under `main`, because a definition that also declares the `retry_predicate` subworkflow needs `main.steps`.

```text
  main:
      steps:
          - step_name:
              try:
                  steps:
                      ...
              retry:
                  predicate: ${retry_predicate}
                  max_retries: number_of_retries
                  backoff:
                      initial_delay: delay_seconds
                      max_delay: max_delay_seconds
                      multiplier: delay_multiplier

  retry_predicate:
      params: [e]
      steps:
          ...
```

Retry HTTP status code `500`:

Adapted (not in the official docs): the predicate reads the status with `map.get(e, "code")` instead of `e.code`, so an error without a `code` key (for example `ConnectionError` or `TimeoutError` from `http.get`) returns `false` instead of failing in the predicate.

```yaml
main:
  steps:
    - read_item:
        try:
          call: http.get
          args:
            url: https://host.com/api
          result: api_response
        retry:
          predicate: ${custom_predicate}
          max_retries: 5
          backoff:
            initial_delay: 2
            max_delay: 60
            multiplier: 2
    - last_step:
        return: "OK"

custom_predicate:
  params: [e]
  steps:
    - what_to_repeat:
        switch:
          - condition: ${map.get(e, "code") == 500}
            return: true
    - otherwise:
        return: false
```

### Retry other HTTP status codes (raise explicitly)

Status codes outside `400`-`599` do not raise an error, so raise one before the predicate runs. This sample retries status code `202`.

Adapted (not in the official docs): the predicate reads the status with `map.get(e, "code")` instead of `e.code`, so an error without a `code` key (for example `ConnectionError` or `TimeoutError` from `http.get`) returns `false` instead of failing in the predicate.

```yaml
main:
  steps:
    - read_item:
        try:
          steps:
            - callStep:
                call: http.get
                args:
                  url: https://host.com/api
                result: api_response
            - checkNotOK:
                switch:
                  - condition: ${api_response.code == 202}
                    raise: ${api_response}
        retry:
          predicate: ${custom_predicate}
          max_retries: 5
          backoff:
            initial_delay: 2
            max_delay: 60
            multiplier: 2

custom_predicate:
  params: [e]
  steps:
    - what_to_repeat:
        switch:
          - condition: ${map.get(e, "code") == 202}
            return: true
    - otherwise:
        return: false
```

## Options / Props

### Retry configuration

| Field | Description |
|-------|-------------|
| `predicate` | Which errors are retried: `${http.default_retry_predicate}`, `${http.default_retry_predicate_non_idempotent}` or a custom subworkflow expression such as `${my_own_predicate}` |
| `max_retries` | Maximum number of retries, not counting the initial execution attempt |
| `backoff.initial_delay` | Delay in seconds between the initial failure and the first retry |
| `backoff.max_delay` | Maximum delay in seconds between retries |
| `backoff.multiplier` | Multiplier applied to the previous delay to calculate the next delay |

### Default policies

| Policy | Predicate | `max_retries` | `initial_delay` | `max_delay` | `multiplier` | Retries |
|--------|-----------|---------------|-----------------|-------------|--------------|---------|
| `${http.default_retry}` | `${http.default_retry_predicate}` | 5 | 1 | 60 | 1.25 | HTTP status codes `429`, `502`, `503`, `504`, connection errors, connection failures, or timeout errors |
| `${http.default_retry_non_idempotent}` | `${http.default_retry_predicate_non_idempotent}` | 5 | 1 | 60 | 1.25 | HTTP status codes `429`, `503` or connection failures |

## Notes

- Corrected from the official docs: the custom retry policy template put `- step_name:` directly under `main:`. When a definition has subworkflows, each one (including `main`) holds its steps in a `steps` block, as the concrete samples on this page do, so the template adds `steps:` under `main`.
- Use the idempotent retry policy only for idempotent steps (steps that can be safely repeated). Use the non-idempotent retry policy only for non-idempotent steps (steps that can't be safely repeated).
- Retrying a step counts as an additional step execution for pricing purposes (https://cloud.google.com/workflows/pricing).
- Example with `max_retries: 8`, `initial_delay: 1`, `max_delay: 60`, `multiplier: 2`: the delays are 1, 2, 4, 8, 16, 32, 60 and 60 seconds; after eight retries the step is considered failed and an exception is raised. Counting the initial execution, the step runs nine times.
- If an error is not retried or retries are exhausted, the error propagates and can fail the execution; handle it with an `except` block.
- With a custom predicate, errors are raised only for HTTP status codes `400`-`499` and `500`-`599`. For other codes, explicitly raise an exception (see the `202` sample).
- Known issue: placing `for` directly after `try` causes an error. See https://docs.cloud.google.com/workflows/docs/issues
- The `STEPS_BLOCK` can contain `assign`, `call`, `for`, `parallel`, `raise`, `return`, `steps`, `switch` and `try`.
- The source also shows the JSON form of every example and a sample whose predicate logs `e.tags`, `e.message` and `e.code` with `sys.log`; both are omitted here.
- Adapted from the official docs: the custom predicates (and the `try` / `retry` / `except` handler in the catching-errors page) read `e.code` directly. Only the `HttpError` error map documents a `code` attribute (https://docs.cloud.google.com/workflows/docs/reference/syntax/catching-errors); `http.get` can also raise `ConnectionError`, `ConnectionFailedError` and `TimeoutError` (https://docs.cloud.google.com/workflows/docs/reference/stdlib/http/get). The examples use `map.get(e, "code")`, which returns `null` when the key is not found (https://docs.cloud.google.com/workflows/docs/reference/stdlib/map/get), so other errors are not retried and are re-raised unchanged.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/retrying (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [catching-errors.md](./catching-errors.md)
- [raising-errors.md](./raising-errors.md)
- [parallel-steps.md](./parallel-steps.md)
- Subworkflows: https://docs.cloud.google.com/workflows/docs/reference/syntax/subworkflows
