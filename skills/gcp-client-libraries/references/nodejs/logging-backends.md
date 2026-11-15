---
source: https://github.com/googleapis/google-cloud-node/blob/google-logging-utils-v2.2.0/core/packages/logging-utils/README.md
---

# Logging backends and severity filtering

`setBackend()` chooses where `google-logging-utils` logs go and how they are processed. Built-in backends write human-readable lines or structured JSON; a custom backend can drop entries by severity or forward to Pino, Winston or Bunyan.

## Signature / Usage

### Structured JSON for Cloud Logging

On Cloud Run, GKE or Compute Engine with the Ops Agent, `getStructuredBackend()` writes single-line JSON objects to `stdout`:

```js
const logging = require('google-logging-utils');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// 1. Enable logging for the target client library via environment variable.
process.env.GOOGLE_SDK_NODE_LOGGING = 'secretmanager';

// 2. Configure the structured JSON backend before making client calls.
logging.setBackend(logging.getStructuredBackend());

async function main() {
  const client = new SecretManagerServiceClient();
  await client.listSecrets({parent: 'projects/my-project'});
}

main().catch(console.error);
```

### Drop DEBUG payloads in process

```js
const logging = require('google-logging-utils');

// Run with GOOGLE_SDK_NODE_LOGGING set as usual.
const nodeBackend = logging.getNodeBackend();
logging.setBackend({
  log(namespace, fields, ...args) {
    // Request/response payloads are logged at DEBUG.
    if (fields.severity !== 'DEBUG') {
      nodeBackend.log(namespace, fields, ...args);
    }
  },
  setFilters(filters) {
    nodeBackend.setFilters(filters);
  },
});
```

### Forward to a custom logger

When tracing is also enabled (`GOOGLE_SDK_NODE_ENABLE_TRACING=true`), failed RPC logs include `fields.telemetryTraceId` and `fields.telemetrySpanId`:

```js
const util = require('util');
const logging = require('google-logging-utils');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// 1. Enable logging for the target client library via environment variable.
process.env.GOOGLE_SDK_NODE_LOGGING = 'secretmanager';

// 2. Register a custom backend to format and export log entries.
logging.setBackend({
  setFilters() {
    // Receives filters parsed from `GOOGLE_SDK_NODE_LOGGING`, if needed.
  },
  log(namespace, fields, ...args) {
    // Optionally skip `auth` debug logs if `*` was enabled.
    if (namespace === 'auth') {
      return;
    }
    const entry = {
      namespace,
      severity: fields.severity,
      message: util.format(...args),
      ...(fields.telemetryTraceId
        ? {telemetryTraceId: fields.telemetryTraceId}
        : {}),
      ...(fields.telemetrySpanId
        ? {telemetrySpanId: fields.telemetrySpanId}
        : {}),
      ...(fields.other || {}),
    };
    // Export `entry` to your preferred logger (e.g. pinoLogger.info(entry), winstonLogger.log(entry)):
    console.log(JSON.stringify(entry));
  },
});

async function main() {
  const client = new SecretManagerServiceClient();
  await client.listSecrets({parent: 'projects/my-project'});
}

main().catch(console.error);
```

### Hook logs

```ts
loggingFunc.on('log', (fields: LogFields, args: unknown[]) => {
  // Process logs as you like.
});
```

## Options / Props

| Backend | Description |
|---------|-------------|
| `getNodeBackend()` | Default when the env var is set. Detects terminal coloration and formats with `util.format()`; writes to stderr. |
| `getDebugBackend(debugpkg)` | Interfaces with the `debug` npm package: `setBackend(getDebugBackend(require('debug')))`. |
| `getStructuredBackend(upstream?)` | Structured log JSON for Cloud Logging; optional `upstream` funnels output through another backend instead of `console.log`. |
| `setBackend(undefined)` / `setBackend(null)` | `undefined` resets to defaults; `null` disables logging. |

## Notes

- Payloads logged at `DEBUG` can contain sensitive data. The custom-logger example above forwards every entry except `auth`; drop or redact sensitive entries in the process before they are written (for example with the severity check in the second example). A Cloud Logging Log Router sink filter only controls which entries that sink routes after ingestion; it does not stop the output to stdout/stderr or storage by other sinks such as `_Default`. Per-attempt errors are also `DEBUG`; keep those that carry an `error.type` or `gcp.errors.domain` attribute if you need them.
- `Hook logs` does not prevent normal output; identifiers are cached so logs of the same name reach the same handlers. The block is a fragment (`loggingFunc` and `LogFields` are not imported).
- The "Drop DEBUG payloads" block is a fragment (it only installs a backend).
- Applies to `google-logging-utils` 2.2.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-logging-utils-v2.2.0/core/packages/logging-utils/README.md (retrieved 2026-11-16; pinned at tag google-logging-utils-v2.2.0, Apache 2.0)

## Related

- [logging.md](./logging.md)
- [nodejs-observability.md](./nodejs-observability.md)
