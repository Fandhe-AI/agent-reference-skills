# Samples

| Name | Description | Path |
|------|-------------|------|
| Async Logging | Buffer log messages and write in large chunks for minimum I/O overhead. | [async-logging.md](./async-logging.md) |
| Basic Logging | Create a logger and emit structured JSON log messages at various levels. | [basic-logging.md](./basic-logging.md) |
| Child Loggers | Add persistent key-value bindings to every log line within a specific module or request scope. | [child-loggers.md](./child-loggers.md) |
| Log Levels | Configure the minimum log level at creation time and change it dynamically at runtime. | [log-levels.md](./log-levels.md) |
| Redaction | Mask or remove sensitive fields such as passwords and tokens before they are written to log output. | [redaction.md](./redaction.md) |
| Testing | Capture and assert on pino log output in test suites using pino-test. | [testing.md](./testing.md) |
| Transports | Route log output to different destinations using pino.transport() — runs in a separate Worker Thread. | [transports.md](./transports.md) |
| Web Frameworks | Integrate pino with Fastify and Express for per-request structured HTTP logging. | [web-frameworks.md](./web-frameworks.md) |
