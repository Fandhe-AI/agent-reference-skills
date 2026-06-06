# SDK

| Name | Description | Path |
|------|-------------|------|
| Inngest Client | `new Inngest()` constructor — core client for creating functions and sending events | [inngest-client.md](./inngest-client.md) |
| createFunction() | Define a background function with event/cron triggers and execution configuration | [create-function.md](./create-function.md) |
| inngest.send() | Send one or more events to Inngest to trigger registered functions | [send-event.md](./send-event.md) |
| serve() | HTTP handler that exposes functions to the Inngest platform; supports 25+ frameworks | [serve.md](./serve.md) |
| connect() | Persistent WebSocket worker connection; alternative to serve() for container runtimes | [connect.md](./connect.md) |
| Next.js Integration | serve() setup for App Router and Pages Router | [framework-nextjs.md](./framework-nextjs.md) |
| Express Integration | serve() setup for Express (and NestJS) | [framework-express.md](./framework-express.md) |
| Hono Integration | serve() setup for Hono (Cloudflare Workers, Bun, Node.js) | [framework-hono.md](./framework-hono.md) |
| Other Framework Integrations | Remix, SvelteKit, Nuxt, Fastify, Lambda, and more | [framework-other.md](./framework-other.md) |
| eventType() | Define typed events; replaces EventSchemas (removed in v4) | [event-type.md](./event-type.md) |
| TypeScript Type Helpers | GetEvents, GetFunctionInput, GetStepTools, InngestFunction.Any | [typescript-types.md](./typescript-types.md) |
| Environment Variables | All env vars recognized by the SDK and their behavior | [environment-variables.md](./environment-variables.md) |
| Middleware | Lifecycle hooks for logging, dependency injection, observability, and serialization | [middleware.md](./middleware.md) |
