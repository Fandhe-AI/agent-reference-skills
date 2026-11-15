---
source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-secret-manager-v2.32.0/packages/google-cloud-secret-manager/README.rst
---

# Logging (GOOGLE_SDK_PYTHON_LOGGING_SCOPE)

Python client libraries log some RPC events with the standard `logging` module. Events are not handled by default: enable them with the `GOOGLE_SDK_PYTHON_LOGGING_SCOPE` environment variable or with ordinary `logging` configuration.

## Signature / Usage

### Environment-based: all Google loggers

```bash
export GOOGLE_SDK_PYTHON_LOGGING_SCOPE=google
```

### Environment-based: one module (for a client library called `library_v1`)

```bash
export GOOGLE_SDK_PYTHON_LOGGING_SCOPE=google.cloud.library_v1
```

### Code-based: all Google loggers

```python
import logging

from google.cloud import library_v1

base_logger = logging.getLogger("google")
base_logger.addHandler(logging.StreamHandler())
base_logger.setLevel(logging.DEBUG)
```

### Code-based: one module

```python
import logging

from google.cloud import library_v1

base_logger = logging.getLogger("google.cloud.library_v1")
base_logger.addHandler(logging.StreamHandler())
base_logger.setLevel(logging.DEBUG)
```

## Options / Props

| Name | Description |
| --- | --- |
| `GOOGLE_SDK_PYTHON_LOGGING_SCOPE` | A period-separated logger namespace beginning with `google`. Valid: `google`, `google.cloud.asset.v1`, `google.api`, `google.auth`. Invalid: `foo`, `123`. Handles events at `logging.DEBUG` or higher in a default, structured format; levels, handlers and formatters cannot be customized this way |

## Notes

- Logs may contain sensitive information; restrict access to saved logs (local storage or Google Cloud Logging). Log occurrence, level and content may change without being flagged as breaking; do not depend on their immutability.
- Logging details from the README: (1) by default events are not propagated from the `google` logger to the root logger; set `logging.getLogger("google").propagate = True` if you need that; (2) configurations can be mixed per module; if both code-based and environment-based config apply to the same module, the environment-based one is ineffectual when the code-based one is applied first; (3) the Google-specific defaults run the first time any client library is instantiated, and only if the affected loggers have not been configured before.
- `google/api_core/client_logging.py` (google-api-core 2.44.0) docstrings and code: `initialize_logging()` runs once and reads the variable only the first time; `parse_logging_scopes` / `setup_logging` accept "the name of a single logger (in the future, a comma-separated list)"; unconfigured loggers get a `StreamHandler`, level `DEBUG` and `propagate = False`, emitting structured JSON (from the function bodies of `configure_defaults` and `StructuredLogFormatter.format`, not the docstrings). The `StructuredLogFormatter` output keys are `timestamp`, `severity`, `name`, `message`, plus recognized extra fields such as `httpRequest`, `rpcName`, `serviceName`, `request`, `response`, `metadata`, `retryAttempt`, `httpResponse`, `trace_id`, `span_id` and `json_fields` entries (from the function body of `StructuredLogFormatter.format` and the `_recognized_logging_fields` module constant, not the docstrings).
- Source inconsistency: the README says an invalid scope sets up no handlers; `client_logging.py` carries TODO comments that validation of the namespace is not yet implemented and that multiple scopes are not yet supported. Use a single valid `google...` scope.
- Fragments: `library_v1` is a placeholder library name; imports are unused in the code-based examples (as in the source).
- Applies to google-cloud-secret-manager 2.32.0 and google-api-core 2.44.0.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-cloud-secret-manager-v2.32.0/packages/google-cloud-secret-manager/README.rst (retrieved 2026-11-16; pinned at tag google-cloud-secret-manager-v2.32.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/client_logging.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0, Apache 2.0)

## Related

- [secret-manager-readme.md](./secret-manager-readme.md)
- [opentelemetry-tracing.md](./opentelemetry-tracing.md)
