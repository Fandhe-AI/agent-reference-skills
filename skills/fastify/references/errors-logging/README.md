# errors-logging

対象 Fastify v5.12.1。

Fastify のロガーは Pino そのもの。`logger` / `loggerInstance` / `setChildLoggerFactory` 等の Fastify 側接続 API をここで扱い、Pino 本体の API（transport / serializers / redaction 等）は `pino` スキルを参照。

| Name | Description | Path |
| --- | --- | --- |
| Error Handling | Uncaught error catching, default error handler payload, `setErrorHandler` encapsulation | [error-handling.md](./error-handling.md) |
| Fastify Error Codes | Full `FST_ERR_*` code table (code / description / how to solve / discussion) | [fastify-error-codes.md](./fastify-error-codes.md) |
| Logging | `logger` / `loggerInstance` options, `request.log`, serializers, request ID tracking, redaction | [logging.md](./logging.md) |
