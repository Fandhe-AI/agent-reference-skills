---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/creating-a-waiter
---

# Creating a Waiter

A Waiter resource waits for a Cardinality success or failure condition (a number of variables under a path prefix) and then returns. Create it with Deployment Manager (`runtimeconfig.v1beta1.waiter`), `gcloud beta runtime-config configs waiters create`, or the REST API, then poll the returned operation.

## Signature / Usage

The waiter ignores variable values; it only counts variables under the prefix, recursively. If the current state already matches an end condition, it returns immediately.

### Define the conditions

Success: three paths under `/status/success`; failure: two under `/status/failure`.

Adapted (not in the official docs): single quotes were replaced with double quotes to make valid JSON.

```json
{
    "name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]",
    "timeout": "360s",
    "success": {
       "cardinality": {
          "path": "/status/success",
          "number": 3
       }
    },
    "failure": {
       "cardinality": {
          "path": "/status/failure",
          "number": 2
       }
     }
}
```

### Deployment Manager

```text
- name: [NAME]
  type: runtimeconfig.v1beta1.waiter
  properties:
    parent: $(ref.[CONFIG_NAME].name)
    waiter: [WAITER_NAME]
    timeout: [TIMEOUT_SECS]
    success:
      cardinality:
        path: [SUCCESS_PATH_PREFIX]
        number: [SUCCESS_NUMBER]
```

### gcloud

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
gcloud beta runtime-config configs waiters create WAITER_NAME \
    --config-name CONFIG_NAME \
    --success-cardinality-path SUCCESS_PATH_PREFIX \
    --success-cardinality-number SUCCESS_NUMBER --timeout TIMEOUT_SECS
```

The tool polls until the waiter returns and prints `Waiting for waiter [WAITER_NAME] to finish...`. Add `--async` to skip polling.

### API

`POST`:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters
```

Adapted (not in the official docs): single quotes were replaced with double quotes to make valid JSON.

```json
{
 "name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]",
 "timeout": "[TIMEOUT_SEC]",
 "success": {
    "cardinality": {
       "path": "[SUCCESS_PATH_PREFIX]",
       "number": "[SUCCESS_NUMBER]"
    }
  }
}
```

Returned operation to poll:

```text
{
    "name": "projects/[PROJECT_ID]/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]"
}
```

### Poll the waiter

`GET`:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]
```

Still running (no status):

```text
{
  "name": "projects/[PROJECT_NAME]/configs/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]"
}
```

### Waiter responses

Success (as written in the source, with placeholders):

```text
{
  "name": "projects/[PROJECT_NAME]/configs/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.runtimeconfig.v1beta1.Waiter",
    "name": "projects/[PROJECT_NAME]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]",
    "timeout": "360.000s",
    "failure": {
      "cardinality": {
        "path": "[SUCCESS_PATH_PREFIX]",
        "number": "[SUCCESS_NUMBER]"
      }
    },
    "success": {
      "cardinality": {
        "path": "[FAILURE_PATH_PREFIX]",
        "number": [FAILURE_NUMBER]
      }
    },
    "createTime": "2016-04-12T18:02:13.316695490Z",
    "done": true
  }
}
```

Failure condition met:

```json
{
  "name": "projects/[PROJECT_NAME]/configs/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]",
  "done": true,
  "error": {
    "code": 9,
    "message": "Failure condition satisfied."
  }
}
```

Timed out:

```json
{
  "name": "projects/[PROJECT_NAME]/configs/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]",
  "done": true,
  "error": {
    "code": 4,
    "message": "Timeout expired."
  }
}
```

## Options / Props

| Item | Description |
|------|-------------|
| `--config-name` | RuntimeConfig resource (required) |
| `--success-cardinality-path` | Path prefix for the success condition (required); `--success-cardinality-number` minimum count, default 1 |
| `--failure-cardinality-path` / `--failure-cardinality-number` | Optional failure condition (number default 1); in gcloud 593.0.0 help, not shown in the source |
| `--timeout` | Time before failing with DEADLINE_EXCEEDED (required), for example `300s`; `--async` returns immediately |
| `timeout` (DM) | Seconds before the waiter times out, for example `300s` |
| Waiter rules | One success and one failure condition per waiter; keep one waiter per path; failure is evaluated before success; do not overlap path prefixes between conditions |
| Error `code` 9 | Failure condition satisfied |
| Error `code` 4 | Timeout expired |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms"; gcloud commands are under `gcloud beta runtime-config` only (gcloud 593.0.0).
- The Deployment Manager method on this page relies on a discontinued service: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down." (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19; see [deprecations.md](./deprecations.md)).
- Corrected from the official docs: the source JSON payloads use single quotes (`'name': ...`), which is not valid JSON; the gcloud example writes bracketed placeholders (`[WAITER_NAME]`), which zsh treats as glob patterns, so the bash fence uses the bare words. The source's success example response swaps the success and failure placeholder names (`failure` shows `[SUCCESS_PATH_PREFIX]`, `success` shows `[FAILURE_PATH_PREFIX]`) and leaves `[FAILURE_NUMBER]` unquoted; it is kept as written in a `text` fence.
- Source inconsistency: the returned operation name is `projects/[PROJECT_ID]/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]` (no `configs/` segment), while the polling URL and the responses use `.../configs/[CONFIG_NAME]/operations/waiters/[WAITER_NAME]`; the responses also write `[PROJECT_NAME]` where the requests use `[PROJECT_ID]`. Both are copied as written; REST paths take the project ID.
- In the Discovery document (`runtimeconfig.v1beta1`), `Cardinality.number` is an `int32` (default 1) and `Waiter.timeout` a `google-duration` string such as `"360s"`.
- A failed operation is a returned `error` (codes 9 or 4 above); check `error` before treating the waiter as successful.
- Quotas: https://cloud.google.com/deployment-manager/pricing-and-quotas#runtime_configurator
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/creating-a-waiter (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-configurator.md](./runtime-configurator.md)
- [set-and-get-variables.md](./set-and-get-variables.md)
- [watching-a-variable.md](./watching-a-variable.md)
