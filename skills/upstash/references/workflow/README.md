# Workflow

| Name | Description | Path |
|------|-------------|------|
| Overview | How Upstash Workflow works; durable execution model, installation | [overview.md](./overview.md) |
| serve() | Expose a workflow as an HTTP endpoint with failure handling options | [serve.md](./serve.md) |
| serveMany() / createWorkflow() | Serve multiple workflows on a single route; enables type-safe context.invoke() | [serve-many.md](./serve-many.md) |
| Workflow Context | Context object properties and all available step methods | [context.md](./context.md) |
| context.run() | Execute business logic as a named, durable step | [context-run.md](./context-run.md) |
| context.sleep() / sleepUntil() | Pause workflow without consuming compute resources | [context-sleep.md](./context-sleep.md) |
| context.call() | Make HTTP requests as a workflow step (up to 12-hour responses) | [context-call.md](./context-call.md) |
| context.invoke() | Invoke another workflow and await its completion | [context-invoke.md](./context-invoke.md) |
| context.waitForEvent() | Pause until an external event is received | [context-wait-for-event.md](./context-wait-for-event.md) |
| context.notify() | Notify a waiting workflow with event data (from within a workflow) | [context-notify.md](./context-notify.md) |
| Parallel Steps | Run multiple steps concurrently with Promise.all() | [parallel-steps.md](./parallel-steps.md) |
| Wait for Event | Feature overview: pause/resume pattern, race condition mitigations | [wait-for-event.md](./wait-for-event.md) |
| Flow Control | Rate limiting and concurrency control for workflow steps | [flow-control.md](./flow-control.md) |
| Retries | Automatic retry configuration, backoff, WorkflowNonRetryableError | [retries.md](./retries.md) |
| Failures & Error Handling | failureFunction, failureUrl, DLQ recovery | [failures.md](./failures.md) |
| Security | Signature verification and custom authorization | [security.md](./security.md) |
| Client | Workflow management client: trigger, cancel, notify, logs | [client.md](./client.md) |
| client.trigger() | Start one or more workflow runs | [client-trigger.md](./client-trigger.md) |
| client.cancel() | Terminate workflow runs by ID, filter, or bulk | [client-cancel.md](./client-cancel.md) |
| client.notify() | Send events to workflows paused at waitForEvent (from outside) | [client-notify.md](./client-notify.md) |
| client.logs() | Retrieve paginated workflow execution history | [client-logs.md](./client-logs.md) |
| Scheduled Workflows | Trigger workflows on a cron schedule via QStash Schedules | [schedule.md](./schedule.md) |
| Local Development | Local QStash dev server and tunnel setup | [local-development.md](./local-development.md) |
| Agents | Durable AI agent pipelines with prompt chaining, parallelization | [agents.md](./agents.md) |
| Quickstart: Next.js | App Router and Pages Router integration | [quickstart-nextjs.md](./quickstart-nextjs.md) |
| Quickstart: Hono | Hono integration for Cloudflare Workers | [quickstart-hono.md](./quickstart-hono.md) |
| Quickstart: Express.js | Express.js server integration | [quickstart-express.md](./quickstart-express.md) |
| Quickstart: Cloudflare Workers | Cloudflare Workers deployment with Wrangler | [quickstart-cloudflare.md](./quickstart-cloudflare.md) |
| Quickstart: Nuxt (H3) | Nuxt.js integration using the H3 adapter | [quickstart-nuxt.md](./quickstart-nuxt.md) |
