---
source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/python
---

# Instrument a Python app with OpenTelemetry (traces, metrics, logs)

Instrument a Python application with the OpenTelemetry SDK and an OpenTelemetry collector to export logs, metrics and traces with OTLP, and write correlated structured JSON logs to standard output. The sample is a Flask app served by Gunicorn that exports to your Google Cloud project through the Telemetry API (OTLP). Using a collector is the recommended approach when the environment supports one; some environments must use an in-process exporter that sends data directly (see the migrate-to-OTLP-endpoints page).

## Signature / Usage

### Configure OpenTelemetry

The Python SDK uses W3C Trace Context by default, so spans get the correct parent-child relationship. The module below sets up tracing, logging and metrics (imports are not shown in the twin).

```python
def setup_opentelemetry() -> None:
    resource = Resource.create(
        attributes={
            # Use the PID as the service.instance.id to avoid duplicate timeseries
            # from different Gunicorn worker processes.
            SERVICE_INSTANCE_ID: f"worker-{os.getpid()}",
        }
    )
    # Set up OpenTelemetry Python SDK
    tracer_provider = TracerProvider(resource=resource)
    tracer_provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
    trace.set_tracer_provider(tracer_provider)

    logger_provider = LoggerProvider(resource=resource)
    logger_provider.add_log_record_processor(BatchLogRecordProcessor(OTLPLogExporter()))
    logs.set_logger_provider(logger_provider)

    reader = PeriodicExportingMetricReader(OTLPMetricExporter())
    meter_provider = MeterProvider(metric_readers=[reader], resource=resource)
    metrics.set_meter_provider(meter_provider)

```

Gunicorn starts several independent worker processes; give each a unique `service.instance.id` resource attribute (for example including the process ID) so metrics from workers do not collide (see "Time-series collisions" in the Managed Service for Prometheus troubleshooting page).

### Configure structured logging

Configure the standard `logging` library to write JSON with `python-json-logger`, and use the `opentelemetry-instrumentation-logging` package to add trace information.

Adapted (not in the official docs): the timestamp is converted to UTC with `timezone.utc` (import it with `from datetime import datetime, timezone`) before the `Z` suffix is added.

```python
class JsonFormatter(jsonlogger.JsonFormatter):
    def formatTime(self, record: logging.LogRecord, datefmt: Optional[str] = None):
        # Format the timestamp as RFC 3339 with microsecond precision
        isoformat = datetime.fromtimestamp(record.created, timezone.utc).replace(tzinfo=None).isoformat()
        return f"{isoformat}Z"


def setup_structured_logging() -> None:
    LoggingInstrumentor().instrument()

    log_handler = logging.StreamHandler()
    formatter = JsonFormatter(
        "%(asctime)s %(levelname)s %(message)s %(otelTraceID)s %(otelSpanID)s %(otelTraceSampled)s",
        rename_fields={
            "levelname": "severity",
            "asctime": "timestamp",
            "otelTraceID": "logging.googleapis.com/trace",
            "otelSpanID": "logging.googleapis.com/spanId",
            "otelTraceSampled": "logging.googleapis.com/trace_sampled",
        },
    )
    log_handler.setFormatter(formatter)
    logging.basicConfig(
        level=logging.INFO,
        handlers=[log_handler],
    )

```

### Instrument Flask and requests

The sample installs the `opentelemetry-instrumentation-flask` and `opentelemetry-instrumentation-requests` libraries to generate HTTP server and client metrics and traces.

```python
logger = logging.getLogger(__name__)

# Initialize OpenTelemetry Python SDK and structured logging
setup_opentelemetry()
setup_structured_logging()

app = Flask(__name__)

# Add instrumentation
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()
```

### Sample app endpoints

`/multi` sends 3 to 7 requests to `/single`; `/single` sleeps 100-200 ms and responds with a string.

```python
@app.route("/multi")
def multi():
    """Handle an http request by making 3-7 http requests to the /single endpoint."""
    sub_requests = randint(3, 7)
    logger.info("handle /multi request", extra={"subRequests": sub_requests})
    for _ in range(sub_requests):
        requests.get(url_for("single", _external=True))
    return "ok"

```

### Run the sample

```bash
git clone https://github.com/GoogleCloudPlatform/opentelemetry-samples
```

```bash
cd opentelemetry-samples/python/instrumentation-quickstart
```

```bash
docker compose up --abort-on-container-exit
```

Outside Cloud Shell, point `GOOGLE_APPLICATION_CREDENTIALS` at a credentials file (Application Default Credentials provides `$HOME/.config/gcloud/application_default_credentials.json`):

```bash
# Set environment variables
export GOOGLE_CLOUD_PROJECT="PROJECT_ID"
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
export USERID="$(id -u)"

# Run
docker compose -f docker-compose.yaml -f docker-compose.creds.yaml up --abort-on-container-exit
```

## Options / Props

### Log fields that correlate a log with a trace

| Field | Meaning |
|---|---|
| `logging.googleapis.com/trace` | Trace ID associated with the log entry (the REST resource name, for example `projects/my-trace-project/traces/12345`, is also supported but not recommended). |
| `logging.googleapis.com/spanId` | The span ID within the trace that is associated with the log entry. |
| `logging.googleapis.com/trace_sampled` | Must be `true` or `false`. |

### IAM roles to write telemetry

| Role | Scope |
|---|---|
| `roles/logging.logWriter` (Logs Writer) | project |
| `roles/monitoring.metricWriter` (Monitoring Metric Writer) | project |
| `roles/telemetry.tracesWriter` (Cloud Telemetry Traces Writer) | project |
| `roles/serviceusage.serviceUsageConsumer` (Service Usage Consumer) | quota project |

### IAM roles to view telemetry (on the project)

| Role |
|---|
| `roles/logging.viewer` (Logs Viewer) |
| `roles/monitoring.viewer` (Monitoring Viewer) |
| `roles/cloudtrace.user` (Cloud Trace User) |

### Sample metrics (Metrics Explorer, resource type Prometheus Target, category Http)

| Metric | Records |
|---|---|
| `Prometheus/http_server_duration_milliseconds/histogram` | Duration of server requests (histogram). |
| `Prometheus/http_client_duration_milliseconds/histogram` | Duration of client requests (histogram). |

## Notes

- The roles above are sufficient in Cloud Shell, on Google Cloud resources or locally. Production applications typically use a service account; grant the writer roles to it.
- The source does not describe zero-code instrumentation (see the OpenTelemetry Python zero-code docs). It also shows Console steps for Metrics Explorer, Trace explorer and Logs Explorer, and the `/single` handler; these are omitted.
- Metric charts: cumulative metrics are normalized to a rate; to see the `/multi` and `/single` routes separately, set the first Aggregation menu to **None**.
- Trace data can take several minutes to become available while the trace store is created; log data may appear before trace data, so retry after a minute or two.
- `GOOGLE_APPLICATION_CREDENTIALS` points to a credentials file: keep its file permissions restricted and do not commit it. Do not log credentials, tokens or request headers in structured logs.
- This is OpenTelemetry tracing in Google Cloud, not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/python (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source describes `logging.googleapis.com/trace` as "Resource name of the trace associated with the log entry"; the Logging API v2 Discovery document (`LogEntry.trace`) says the field takes the trace ID (for example `12345`) and that the REST resource name (`projects/my-trace-project/traces/12345`) "is also supported, but using this format is not recommended". The sample writes the bare trace ID (`otelTraceID`).
- Corrected from the official docs: the source formats `datetime.fromtimestamp(record.created).isoformat()`, which is local time, and appends `Z` (UTC). On a host whose time zone is not UTC the log timestamps would be off by the UTC offset; the example converts to UTC first.

## Related

- [sample-overview.md](./sample-overview.md)
- [instrument-nodejs.md](./instrument-nodejs.md)
- [choose-approach.md](./choose-approach.md)
- [google-built-otel.md](./google-built-otel.md)
- [otlp-overview.md](./otlp-overview.md)
