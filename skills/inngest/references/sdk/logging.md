# Logging

The SDK uses Pino-style object-first logging (structured data before the message). A `logger` is available on the function context as `ctx.logger` with `.info()`, `.warn()`, `.error()` and `.debug()`.

## Signature / Usage

```ts
export default inngest.createFunction(
  {
    id: "process-upload",
    triggers: { event: "app/file.uploaded" },
  },
  async ({ event, step, logger }) => {
    logger.info({ fileId: event.data.fileId }, "Starting upload processing");

    const result = await step.run("process", () => {
      logger.debug({ fileId: event.data.fileId }, "Processing file");
      return processFile(event.data.fileId);
    });

    logger.info({ fileId: event.data.fileId, result }, "Upload processed");
    return result;
  }
);
```

## Options / Props

| Name (client option) | Type | Description |
|------|------|-------------|
| logger | Logger | Logger exposed as `ctx.logger` in all functions. Defaults to built-in `ConsoleLogger` at `"info"` level. |
| internalLogger | Logger | Receives SDK internal logs (registration, request handling, middleware errors). Falls back to `logger` if unset. |

Logger interface (any object implementing these four methods):

```ts
interface Logger {
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  debug(...args: any[]): void;
}
```

Setting loggers:

```ts
import pino from "pino";
import winston from "winston";
import { Inngest, ConsoleLogger, wrapStringFirstLogger } from "inngest";

// Pino (object-first): works as is
new Inngest({ id: "my-app", logger: pino({ level: "debug" }) });

// Winston (string-first): wrap it
new Inngest({ id: "my-app", logger: wrapStringFirstLogger(winston.createLogger({ level: "info" })) });

// Built-in console logger, custom level; silence SDK internals
new Inngest({
  id: "my-app",
  logger: new ConsoleLogger({ level: "debug" }),
  internalLogger: new ConsoleLogger({ level: "silent" }),
});
```

## Notes

- The function handler can execute again as a run resumes, so a plain log outside a step can appear more than once. Put logs for a specific side effect inside the step that performs the work.
- In serverless environments, process shutdown can prevent an ordinary logger from flushing.
- `ConsoleLogger` is intended for local development; use a structured logger such as Pino in production.
- Include business identifiers (order / customer / request ID) in structured fields; do not log secrets or full sensitive payloads.
- Use middleware for shared logging behavior across functions.
- Source: https://www.inngest.com/docs-markdown/reference/typescript/v4/logging (fetched 2026-10).

## Related

- [Inngest Client](./inngest-client.md)
- [Middleware](./middleware.md)
