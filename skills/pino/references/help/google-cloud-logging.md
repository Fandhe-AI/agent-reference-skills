# Mapping Pino Log Levels to Google Cloud Logging

Google Cloud Logging (formerly Stackdriver) uses `severity` levels instead of numeric log levels. Without configuration, all Pino logs may appear as INFO level in Google Cloud Logging. Google Cloud Logging also prefers log data in a `message` key instead of Pino's default `msg` key.

## Manual Configuration

Use the `formatters` and `messageKey` options to map Pino levels to Google Cloud Logging severity levels:

```js
const pino = require('pino')

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const PinoLevelToSeverityLookup = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

const defaultPinoConf = {
  messageKey: 'message',
  formatters: {
    level(label, number) {
      return {
        severity: PinoLevelToSeverityLookup[label] || PinoLevelToSeverityLookup['info'],
        level: number,
      }
    }
  },
}

module.exports = function createLogger(options) {
  return pino(Object.assign({}, options, defaultPinoConf))
}
```

## Using @google-cloud/pino-logging-gcp-config

A dedicated library is available for configuring Pino for Google Cloud Structured Logging: [`@google-cloud/pino-logging-gcp-config`](https://www.npmjs.com/package/@google-cloud/pino-logging-gcp-config).

This library provides:

- Converts Pino log levels to Google Cloud Logging severity levels
- Uses `message` instead of `msg` for the message key
- Adds a millisecond-granularity timestamp in the structure recognized by Google Cloud Logging (e.g., `"timestamp":{"seconds":1445470140,"nanos":123000000}`)
- Adds a sequential `insertId` to ensure log messages with identical timestamps are ordered correctly
- Logs including an `Error` object have the `stack_trace` property set so that the error is forwarded to Google Cloud Error Reporting
- Includes a `ServiceContext` object in the logs for Google Cloud Error Reporting, auto-detected from the environment if not specified
- Maps the OpenTelemetry properties `span_id`, `trace_id`, and `trace_flags` to the equivalent Google Cloud Logging fields

## Notes

- Without configuration, Google Cloud Logging treats all Pino logs as INFO
- The `messageKey` must be set to `message` for Google Cloud Logging compatibility
- The `@google-cloud/pino-logging-gcp-config` library handles all mapping automatically and is the recommended approach
- Both `trace` and `debug` Pino levels map to Google Cloud's `DEBUG` severity

## Related

- [log-levels-as-labels](./log-levels-as-labels.md)
- [ecosystem](../integrations/ecosystem.md)
- [options](../api/options.md)
