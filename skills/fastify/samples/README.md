# samples

対象 Fastify v5.12.1

| Name | Description | Path |
| --- | --- | --- |
| Basic Server | Create and start a minimal Fastify server with a single route (ESM and CJS variants) | [basic-server.md](./basic-server.md) |
| Plugin Encapsulation | Show how decorators registered inside a nested `register()` call stay scoped unless wrapped with `fastify-plugin` | [plugin-encapsulation.md](./plugin-encapsulation.md) |
| Decorators | Extend the server, request, and reply instances with custom properties/methods | [decorators.md](./decorators.md) |
| Hooks Authentication | Use the `preHandler` hook to run authentication logic before the route handler executes | [hooks-auth.md](./hooks-auth.md) |
| Validation JSON Schema | Validate request body and querystring against JSON Schema definitions on a route's `schema` option | [validation-json-schema.md](./validation-json-schema.md) |
| Type Provider TypeBox | Derive TypeScript types for route querystring/body/reply from a JSON Schema definition via TypeBox | [type-provider-typebox.md](./type-provider-typebox.md) |
| TypeScript Server | Create a Fastify server in TypeScript with a route typed via generic `RouteGenericInterface` shape | [typescript-server.md](./typescript-server.md) |
| Error Handling | Register a custom global error handler with `setErrorHandler` to pass through client errors and mask server errors | [error-handling.md](./error-handling.md) |
| Logging Pino | Enable the built-in Pino-based logger and use the per-request child logger inside a route handler | [logging-pino.md](./logging-pino.md) |
| Testing Inject | Test a Fastify route without binding to a real port using `fastify.inject()` and Node's test runner | [testing-inject.md](./testing-inject.md) |
| Serverless Lambda | Wrap a Fastify app factory with `@fastify/aws-lambda` so it runs locally and as an AWS Lambda handler | [serverless-lambda.md](./serverless-lambda.md) |
| Graceful Shutdown | Delay accepting requests until async setup completes, and detect client aborts on long-running requests | [graceful-shutdown.md](./graceful-shutdown.md) |
| Database Integration | Encapsulate a database client as a `fastify-plugin`, closing the connection via the `onClose` hook | [database-integration.md](./database-integration.md) |
