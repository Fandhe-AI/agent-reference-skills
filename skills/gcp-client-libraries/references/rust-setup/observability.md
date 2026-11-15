---
source: https://docs.cloud.google.com/rust/docs/observability
---

# Observability (tracing, metrics, logs, OpenTelemetry)

The Rust client libraries emit traces, metrics and logs, but the instrumentation is opt-in. Enable it on the client, then configure subscribers and exporters in your application to send the signals to an external service.

## Signature / Usage

### Enable telemetry

Signals are disabled by default to protect sensitive data. Set the environment variable:

```bash
export GOOGLE_CLOUD_RUST_LOGGING=true
```

Or enable tracing when building the client:

```rust
use google_cloud_secretmanager_v1::client::SecretManagerService;

let client = SecretManagerService::builder()
    .with_tracing()
    .build()
    .await?;
```

### Export traces to OpenTelemetry (OTLP)

Configure a `Subscriber` that pipes `tracing` spans to an OpenTelemetry exporter, using the `tracing-opentelemetry` and `opentelemetry-otlp` crates.

```rust
use google_cloud_secretmanager_v1::client::SecretManagerService;
use opentelemetry::trace::TracerProvider as _;
use tracing_subscriber::Registry;
use tracing_subscriber::layer::SubscriberExt;

pub async fn sample() -> anyhow::Result<()> {
    let exporter = opentelemetry_otlp::SpanExporter::builder()
        .with_tonic()
        .build()?;
    let provider = opentelemetry_sdk::trace::SdkTracerProvider::builder()
        .with_batch_exporter(exporter)
        .build();
    let tracer = provider.tracer("example");

    // Create a tracing layer that sends data to an OpenTelemetry Collector running on localhost.
    let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);

    // Register the subscriber globally
    let subscriber = Registry::default().with(telemetry);
    tracing::subscriber::set_global_default(subscriber)?;

    let _client = SecretManagerService::builder()
        .with_tracing()
        .build()
        .await?;

    Ok(())
}
```

### Metrics

Install a global OpenTelemetry `MeterProvider` before initializing the client; the libraries use it automatically.

### Logs to Cloud Logging

Emit structured JSON to stdout; GKE and Cloud Run agents scrape it. This subscriber captures only `WARN` logs.

```rust
use google_cloud_secretmanager_v1::client::SecretManagerService;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

pub async fn sample() -> anyhow::Result<()> {
    // Enable all `WARN` logs to include failed client requests in all client libraries.
    let filter = tracing_subscriber::EnvFilter::new("warn");

    tracing_subscriber::registry()
        .with(filter)
        .with(tracing_subscriber::fmt::layer().json())
        .init();

    let _client = SecretManagerService::builder()
        .with_tracing()
        .build()
        .await?;

    Ok(())
}
```

## Notes

- Signals: `INFO` spans per logical client request; histogram metric `gcp.client.request.duration`; `WARN` logs per failed logical request; `INFO` spans per low-level RPC attempt (more than one if retried); `DEBUG` logs per failed attempt.
- Attributes follow OpenTelemetry semantic conventions (for example `http.response.status_code`, `rpc.system.name`) plus `gcp.client.service`, `gcp.client.repo`, `gcp.client.version`, `gcp.client.artifact`, `gcp.resource.destination.id`, `gcp.errors.domain` and `gcp.errors.metadata.<key>`.
- `DEBUG` spans carry the full request body, full successful response body and full error details. Their target is the crate name followed by `::tracing` (for example `google_cloud_secretmanager_v1::tracing`) and the span name is the method name (for example `access_secret_version`); filter on either.
- Warning from the source: signals at any level may contain sensitive data (resource names, full URLs, error messages). Review span contents and set up filters and formatters before configuring exporters.
- Trace context propagation: active trace contexts are propagated to Google Cloud services automatically, even without `.with_tracing()`. Use `tracing-opentelemetry` or `opentelemetry` to supply the context.
- From the function body of `tracing_enabled` in `src/options.rs` of google-cloud-gax-internal 0.7.22 (a code comment, not a doc comment): `GOOGLE_CLOUD_RUST_LOGGING` is read as `LOGGING_VAR` ("Returns true if the environment or client configuration enables tracing"), and only the exact value `true` enables tracing.
- Not stated on the source page: `tracing_subscriber::EnvFilter` needs the `env-filter` feature and `.json()` needs the `json` feature of `tracing-subscriber`; neither is in its default features. The OTLP example also uses the `opentelemetry`, `opentelemetry_sdk`, `opentelemetry-otlp` and `tracing-opentelemetry` crates. The source page gives no dependency lines for either example.
- Trace correlation fields (`logging.googleapis.com/trace`) in the JSON formatter: see the "Overview of collector-based instrumentation samples" page under Cloud Observability instrumentation.
- Applies to google-cloud-gax 1.15.0 (`with_tracing`).
- Source: https://docs.cloud.google.com/rust/docs/observability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax-internal/0.7.22/source/src/options.rs (retrieved 2026-11-16; google-cloud-gax-internal 0.7.22)

## Related

- [enable-logging.md](./enable-logging.md)
- [configure-client.md](./configure-client.md)
- [troubleshooting.md](./troubleshooting.md)
