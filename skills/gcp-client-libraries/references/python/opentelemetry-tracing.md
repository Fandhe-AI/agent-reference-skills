---
source: https://docs.cloud.google.com/python/docs/observability
---

# OpenTelemetry tracing in Python client libraries

Google Cloud Python client libraries provide built-in, opt-in OpenTelemetry distributed tracing. Spans are standard OpenTelemetry spans and can be exported to Cloud Trace, an OpenTelemetry Collector or third-party backends.

## Signature / Usage

### Install packages

```bash
pip install google-cloud-secret-manager "google-api-core[tracing]"
```

`opentelemetry-api` is installed automatically with `google-api-core` (logical method spans and REST transport spans). `google-api-core[tracing]` additionally installs `opentelemetry-instrumentation-grpc` for low-level gRPC transport spans. To configure a `TracerProvider` and export spans in your own code, also install the SDK:

```bash
pip install opentelemetry-sdk
```

### Enable globally with an environment variable

```bash
export GOOGLE_SDK_PYTHON_TRACING_ENABLED=true
```

### Enable per client with `ClientOptions`

```python
from google.api_core.client_options import ClientOptions
from google.cloud import secretmanager

options = ClientOptions(tracer_provider=my_tracer_provider)
client = secretmanager.SecretManagerServiceClient(client_options=options)
```

### Quickstart (console exporter)

```python
import os

from google.cloud import secretmanager
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor


def get_secret_version_with_tracing(
    project_id: str,
    secret_id: str,
    version_id: str = "latest",
) -> secretmanager.SecretVersion:
    """Get a secret version in Secret Manager with OpenTelemetry tracing enabled.

    Args:
        project_id: Google Cloud project ID.
        secret_id: ID of the secret.
        version_id: ID of the secret version (defaults to "latest").

    Returns:
        The SecretVersion metadata object.
    """
    # NOTE: In standalone scripts or CLI tools, initialize and shut down the
    # TracerProvider within the script workflow. In long-running production
    # applications (e.g., web servers), configure the TracerProvider once at
    # application startup.
    #
    # Initialize the OpenTelemetry TracerProvider with a Console exporter
    provider = TracerProvider()
    provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
    trace.set_tracer_provider(provider)

    # Enable Google Cloud client library tracing
    os.environ["GOOGLE_SDK_PYTHON_TRACING_ENABLED"] = "true"

    # Instantiate the client (automatically discovers the active TracerProvider)
    client = secretmanager.SecretManagerServiceClient()

    # Construct the resource name and invoke the RPC
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    try:
        print("--- OpenTelemetry Trace Spans (JSON) ---")
        response = client.get_secret_version(request={"name": name})
        state_name = response.state.name
        print(
            f"\nAPI Result: Retrieved secret version {response.name} (state: {state_name})"
        )
        return response
    finally:
        # Flush buffered spans before program completion
        provider.shutdown()
```

## Options / Props

| Name | Where | Description |
| --- | --- | --- |
| `GOOGLE_SDK_PYTHON_TRACING_ENABLED` | env var | `true` enables tracing for all supported libraries using the globally registered `TracerProvider`. Off by default |
| `ClientOptions(tracer_provider=...)` | per client | Enables tracing for that client even without the env var; takes precedence over the env var |

## Notes

- Span hierarchy: a logical client method span (parent, named after the fully-qualified RPC method, e.g. `google.cloud.secretmanager.v1.SecretManagerService/GetSecretVersion`; covers all retries, backoff and timeouts) with one child network attempt span per HTTP/REST or gRPC attempt.
- Context propagates through Python `contextvars`, including across `await` points. The page also shows an async example with `SecretManagerServiceAsyncClient`; it is omitted here (same shape, `await client.get_secret_version(...)`).
- Security: client libraries never record request or response payloads on spans. Resource names (project IDs, secret names) appear in method parameters and URL attributes; check your trace storage compliance. Review exporter attribute filtering for third-party backends.
- Attributes follow the OpenTelemetry semantic conventions for RPC spans (https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/).
- Fragment: `my_tracer_provider` is a placeholder for an existing `TracerProvider` (as in the source).
- `ClientOptions.tracer_provider` is documented in `client-options.md`. The sample prints only the secret version resource name and state.
- Exporter setup for Cloud Trace is on other docs pages (Set up Python with OpenTelemetry); not covered here.
- Applies to `google-api-core` 2.44.0 and `google-cloud-secret-manager` 2.32.0.
- Source: https://docs.cloud.google.com/python/docs/observability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [client-options.md](./client-options.md)
- [logging.md](./logging.md)
