---
source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/nodejs
---

# Instrument a Node.js app with OpenTelemetry (traces, metrics, structured logs)

Instrument a Node.js JavaScript application with the OpenTelemetry SDK and an OpenTelemetry collector to collect traces and metrics, and write correlated structured JSON logs to standard output. The sample is a Fastify app (Pino logger) that exports log, metric and trace data to your Google Cloud project through the Telemetry API (OTLP). Using a collector is the recommended approach when the environment supports one; some environments must use an in-process exporter that sends data directly (see the migrate-to-OTLP-endpoints page).

## Signature / Usage

### Configure OpenTelemetry

The default Node.js SDK configuration exports with OTLP and propagates context with W3C Trace Context, so spans get the correct parent-child relationship. The module below sets up the SDK (the twin shows only selected portions; imports are not shown).

```typescript

diag.setLogger(
  new DiagConsoleLogger(),
  opentelemetry.core.diagLogLevelFromString(
    opentelemetry.core.getStringFromEnv('OTEL_LOG_LEVEL'),
  ),
);

const sdk = new opentelemetry.NodeSDK({
  instrumentations: getNodeAutoInstrumentations({
    // Disable noisy instrumentations
    '@opentelemetry/instrumentation-fs': {enabled: false},
  }),
  resourceDetectors: getResourceDetectorsFromEnv(),
  metricReader: getMetricReader(),
});

try {
  sdk.start();
  diag.info('OpenTelemetry automatic instrumentation started successfully');
} catch (error) {
  diag.error(
    'Error initializing OpenTelemetry SDK. Your application is not instrumented and will not produce telemetry',
    error,
  );
}

// Gracefully shut down the SDK to flush telemetry when the program exits
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => diag.debug('OpenTelemetry SDK terminated'))
    .catch(error => diag.error('Error terminating OpenTelemetry SDK', error));
});
```

The sample exports metrics with OTLP and uses the `@opentelemetry/auto-instrumentations-node` package to configure all available Node.js instrumentations. The `SIGTERM` handler calls `shutdown` so pending telemetry is flushed and connections close gracefully.

### Preload the OpenTelemetry configuration

Preload the instrumentation module with the Node.js `--require` flag so OpenTelemetry initializes before the app starts. Dockerfile from the source:

```dockerfile
CMD node --require ./build/src/instrumentation.js build/src/index.js 2>&1 | tee /var/log/app.log
```

### Configure structured logging

Pino `LoggerOptions` that writes JSON logs with trace fields. The `timestamp` function emits the key `"timestamp"`; if log data does not appear as expected, try the key `"time"` instead.

Adapted (not in the official docs): the fence is tagged `typescript` instead of `javascript`, because the block uses TypeScript syntax (`interface`, type annotations, `satisfies`).

```typescript

// Expected attributes that OpenTelemetry adds to correlate logs with spans
interface LogRecord {
  trace_id?: string;
  span_id?: string;
  trace_flags?: string;
  [key: string]: unknown;
}

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const PinoLevelToSeverityLookup: Record<string, string | undefined> = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

export const loggerConfig = {
  messageKey: 'message',
  // Same as pino.stdTimeFunctions.isoTime but uses "timestamp" key instead of "time"
  timestamp(): string {
    return `,"timestamp":"${new Date(Date.now()).toISOString()}"`;
  },
  formatters: {
    log(object: LogRecord): Record<string, unknown> {
      // Add trace context attributes following Cloud Logging structured log format described
      // in https://cloud.google.com/logging/docs/structured-logging#special-payload-fields
      const {trace_id, span_id, trace_flags, ...rest} = object;

      return {
        'logging.googleapis.com/trace': trace_id,
        'logging.googleapis.com/spanId': span_id,
        'logging.googleapis.com/trace_sampled': trace_flags
          ? trace_flags === '01'
          : undefined,
        ...rest,
      };
    },
    // See
    // https://getpino.io/#/docs/help?id=mapping-pino-log-levels-to-google-cloud-logging-stackdriver-severity-levels
    level(label: string) {
      return {
        severity:
          PinoLevelToSeverityLookup[label] ?? PinoLevelToSeverityLookup['info'],
      };
    },
  },
} satisfies LoggerOptions;
```

Pass the config when creating the Fastify app:

```javascript
// Create the Fastify app providing the Pino logger config
const fastify = Fastify({
  logger: loggerConfig,
});
```

### Write structured logs

Use the Fastify-provided Pino logger; OpenTelemetry fills the span context of the active span into the Pino log entries.

```typescript
request.log.info({subRequests}, 'handle /multi request');
```

### Sample app endpoints

`/multi` sends 3 to 7 requests to `/single`; `/single` sleeps 100-200 ms and responds with a string.

```javascript
/**
 * handleMulti handles an http request by making 3-7 http requests to the /single endpoint.
 *
 * OpenTelemetry instrumentation requires no changes here. It will automatically generate a
 * span for the handler body.
 */
fastify.get('/multi', async request => {
  const subRequests = randInt(3, 8);
  request.log.info({subRequests}, 'handle /multi request');

  for (let i = 0; i < subRequests; i++) {
    await axios.get(`http://localhost:${port}/single`);
  }
  return 'ok';
});
```

### Run the sample

```bash
git clone https://github.com/GoogleCloudPlatform/opentelemetry-samples
```

```bash
cd opentelemetry-samples/javascript/instrumentation-quickstart
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

### IAM roles to write telemetry (project; quota project for Service Usage Consumer)

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
- The source does not describe zero-code instrumentation (see the OpenTelemetry JavaScript zero-code docs); it also shows Console steps for Metrics Explorer, Trace explorer and Logs Explorer, which are omitted, and the `handleSingle` handler.
- Metric charts: cumulative metrics are normalized to a rate; to see the `/multi` and `/single` routes separately, set the first Aggregation menu to **None**.
- Trace data can take several minutes to become available while the trace store is created; log data may appear before trace data, so retry after a minute or two.
- `GOOGLE_APPLICATION_CREDENTIALS` points to a credentials file: keep its file permissions restricted and do not commit it. Do not log credentials, tokens or request headers in structured logs.
- Pino is the logger used by Fastify here; the `pino` skill covers the logger itself and the `fastify` skill covers Fastify. Cloud Logging reads the JSON from stdout only when the fields match the special payload fields above.
- This is OpenTelemetry tracing in Google Cloud, not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/nodejs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source describes `logging.googleapis.com/trace` as "Resource name of the trace associated with the log entry"; the Logging API v2 Discovery document (`LogEntry.trace`) says the field takes the trace ID (for example `12345`) and that the REST resource name (`projects/my-trace-project/traces/12345`) "is also supported, but using this format is not recommended". The sample writes the bare trace ID (`trace_id`).
- Corrected from the official docs: the source tags the Pino `loggerConfig` block as `javascript`, but it contains TypeScript-only syntax (`interface LogRecord`, `Record<string, string | undefined>`, `satisfies LoggerOptions`); the fence is tagged `typescript`.

## Related

- [sample-overview.md](./sample-overview.md)
- [instrument-python.md](./instrument-python.md)
- [choose-approach.md](./choose-approach.md)
- [google-built-otel.md](./google-built-otel.md)
- [otlp-overview.md](./otlp-overview.md)
