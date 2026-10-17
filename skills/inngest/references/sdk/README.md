# SDK

| Name | Description | Path |
|------|-------------|------|
| connect() | Establishes a persistent outbound WebSocket connection from your workers to Inngest. An alternative to `serve()` for long-running server environments. | [connect.md](./connect.md) |
| inngest.createFunction() | Defines a background function that is triggered by events or a cron schedule. | [create-function.md](./create-function.md) |
| Environment Variables | Environment variables recognized by the Inngest TypeScript SDK. Most can also be configured programmatically on the Inngest client. | [environment-variables.md](./environment-variables.md) |
| ESLint Plugin | `@inngest/eslint-plugin` provides rules to enforce best practices when writing Inngest functions. | [eslint-plugin.md](./eslint-plugin.md) |
| eventType() | Defines a typed event for use with `inngest.send()`, `waitForEvent()`, and function triggers. Replaces the `EventSchemas` class removed in SDK v4. | [event-type.md](./event-type.md) |
| Extended Traces | `extendedTracesMiddleware` exports OpenTelemetry spans from your functions to Inngest Traces, giving insight into function execution, step timing and performance. | [extended-traces.md](./extended-traces.md) |
| Express Integration | Integrate Inngest into an Express application using the `inngest/express` serve handler. | [framework-express.md](./framework-express.md) |
| Hono Integration | Integrate Inngest into a Hono application using the `inngest/hono` serve handler. Works with Cloudflare Workers, Bun, Node.js, and other Hono-compatible runtimes. | [framework-hono.md](./framework-hono.md) |
| Next.js Integration | Integrate Inngest into a Next.js project using the `inngest/next` serve handler. Supports both App Router and Pages Router. | [framework-nextjs.md](./framework-nextjs.md) |
| Other Framework Integrations | Inngest provides first-class `serve()` adapters for 25+ frameworks. Below are examples for common frameworks beyond Next.js, Express, and Hono. | [framework-other.md](./framework-other.md) |
| Inngest Client | Core configuration object for an Inngest application. Used to create functions and send events. | [inngest-client.md](./inngest-client.md) |
| Logging | The SDK uses Pino-style object-first logging (structured data before the message). A `logger` is available on the function context as `ctx.logger` with `.info()`, `.warn()`, `.error()` and `.debug()`. | [logging.md](./logging.md) |
| Dependency Injection Middleware | Shares common client instances (e.g. an OpenAI client, a database client) across all Inngest functions via middleware, so functions receive them as part of their execution context instead of re-instantiating per run. | [middleware-dependency-injection.md](./middleware-dependency-injection.md) |
| Encryption Middleware | End-to-end encryption for event data and function/step output. All encryption and decryption happens inside your own infrastructure — only encrypted data is sent to Inngest servers. | [middleware-encryption.md](./middleware-encryption.md) |
| Sentry Middleware | Captures exceptions, adds distributed tracing, and enriches error data with contextual information (function ID, event names) for each function run. | [middleware-sentry.md](./middleware-sentry.md) |
| Custom Serialization Middleware | Preserves non-JSON types (`Date`, `Map`, `Set`, custom classes) across step output, function output and event data by converting them to a JSON-safe format on the way out and restoring them on the way in. | [middleware-serialization.md](./middleware-serialization.md) |
| Middleware | Hooks into Inngest function execution at defined lifecycle points for cross-cutting concerns such as logging, dependency injection, observability, and serialization. | [middleware.md](./middleware.md) |
| Referencing Functions | `referenceFunction` creates a reference to an Inngest function for use with `step.invoke()`, to call functions in other apps or to avoid importing a function's dependencies within the same app. | [referencing-functions.md](./referencing-functions.md) |
| inngest.send() | Sends one or more events to Inngest to trigger registered functions. | [send-event.md](./send-event.md) |
| serve() | Creates an HTTP endpoint that exposes Inngest functions to the Inngest platform for remote invocation and configuration reading. | [serve.md](./serve.md) |
| Testing (@inngest/test) | `@inngest/test` lets you test Inngest functions programmatically by mocking function state, step tooling and inputs, with a Jest-compatible API. | [testing.md](./testing.md) |
| Trigger Helpers (eventType / cron / invoke / staticSchema) | Type-safe helpers for defining triggers and schemas of Inngest functions. They replace raw string-based triggers with typed, validated alternatives. | [trigger-helpers.md](./trigger-helpers.md) |
| TypeScript Type Helpers | Utility types exported by the Inngest SDK for building abstractions and accessing internal types without duplication. | [typescript-types.md](./typescript-types.md) |
| TypeScript SDK: v3 vs v4 | The Inngest TypeScript SDK reference is split into `reference/typescript/v3/**` and `reference/typescript/v4/**`. v4 is the current major version; v3 docs remain available for existing projects. Some APIs referenced elsewhere in this category (`fetch`, `group.experiment()`, `scoring`, deferred functions) are **v4-only**. | [v3-v4-differences.md](./v3-v4-differences.md) |
