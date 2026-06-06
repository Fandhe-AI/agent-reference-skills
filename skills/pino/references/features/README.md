# Features

| Name | Description | Path |
|------|-------------|------|
| Asynchronous Logging | Asynchronous logging enables the minimum overhead of Pino by buffering log messages and writing them in larger chunks… | [./asynchronous.md](./asynchronous.md) |
| Browser API | Pino is compatible with browserify for browser-side usage, making it useful for isomorphic/universal JavaScript… | [./browser.md](./browser.md) |
| Child Loggers | Child loggers allow adding persistent bindings to every log line produced within a particular context, such as a… | [./child-loggers.md](./child-loggers.md) |
| Diagnostics | Pino provides Node.js tracing channel events that allow insight into the internal workings of the library during… | [./diagnostics.md](./diagnostics.md) |
| Pretty Printing | By default, Pino log lines are newline-delimited JSON (NDJSON), which is ideal for production usage and long-term… | [./pretty-printing.md](./pretty-printing.md) |
| Redaction | Pino supports redacting sensitive information from log output using the redact option. Paths to keys containing… | [./redaction.md](./redaction.md) |
| Transports | Pino transports are used for both transmitting and transforming log output. Pino's log generation approach reduces… | [./transports.md](./transports.md) |
