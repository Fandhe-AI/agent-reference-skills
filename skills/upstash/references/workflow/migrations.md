# Migration Guide (1.0.0 / from @upstash/qstash)

Breaking changes between versions of the Upstash Workflow TypeScript SDK: the January 2026 1.0.0 major release, and the October 2024 move from `@upstash/qstash` to `@upstash/workflow`.

## Signature / Usage

```typescript
// 1.0.0: options moved from serve() to client.trigger()
await client.trigger({
  url: "...",
  retries: 3,
  retryDelay: "1000 * (1 + retried)",
  flowControl: { key: "my-key", rate: 10 }
});
```

## January 2026 - Major Release 1.0.0

| Change | Migration |
|--------|-----------|
| Agents API moved to a separate package | `npm install @upstash/workflow-agents`; use `const agents = agentWorkflow(context)` then `agents.openai(...)`, `agents.agent({...})`, `agents.task({...})` instead of `context.agents.*` |
| `keepTriggerConfig` and `useFailureFunction` removed from `client.trigger()` | Remove the parameters; both are now `true` by default. Configuration passed to `trigger()` applies to the entire workflow |
| `retries`, `flowControl`, `retryDelay`, `failureUrl` removed from `serve()` | Pass them to `client.trigger()` instead (easier to configure different behavior per run of the same endpoint) |
| `stringifyBody` removed from `context.call` and `context.invoke` | `body` now expects a string; use `body: JSON.stringify({ key: "value" })` |
| Logger replaced by middleware system | Replace `verbose: true` with `middlewares: [loggingMiddleware]` (import from `@upstash/workflow`) |
| `onStepFinish` removed | Use a `WorkflowMiddleware` with an `afterExecution` callback |

```typescript
// Agents (new)
import { serve } from "@upstash/workflow/nextjs";
import { agentWorkflow } from "@upstash/workflow-agents";

export const { POST } = serve(async (context) => {
  const agents = agentWorkflow(context)

  const model = agents.openai('gpt-3.5-turbo');
  const agent = agents.agent({ ... });
  const task = agents.task({ ... });
});
```

```typescript
// onStepFinish replacement (new)
import { WorkflowMiddleware } from "@upstash/workflow";

const stepFinishMiddleware = new WorkflowMiddleware({
  name: "step-finish",
  callbacks: {
    afterExecution: async ({ stepName, result }) => {
      console.log(`Step ${stepName} finished with:`, result);
    }
  }
});
```

## October 2024 - Migrate from @upstash/qstash

Workflow moved to the dedicated `@upstash/workflow` SDK; Workflow-related imports will be removed from `@upstash/qstash` in future releases.

- Install `@upstash/workflow` (if `@upstash/qstash` was used only for workflow, uninstall it)
- Change imports: `import { serve } from "@upstash/workflow/nextjs"` (was `@upstash/qstash/nextjs`)
- `serve` now returns an object: `export const { POST } = serve(...)` (was `export const POST = serve(...)`). The Hono `serve` is unchanged; others are updated similarly
- `@upstash/workflow/nuxt` was removed; use `@upstash/workflow/h3`
- `context.call` signature changed and now returns `{ status, headers, body }`:

```javascript
// old
const result = await context.call("call step", "<call-url>", "POST", ...)

// new
const {
  status,  // response status
  headers, // response headers
  body     // response body
} = await context.call("call step", {
  url: "<call-url>",
  method: "POST",
  ...
})
```

- Errors renamed: `QStashWorkflowError` to `WorkflowError`, `QStashWorkflowAbort` to `WorkflowAbort`

## Notes

- Python SDK: the options moved in 1.0.0 (`retries`, `flowControl`, `retryDelay`, `failureUrl`) remain in the `serve` decorator as before
- Old behavior of `context.call`: a failed request failed the workflow run. New behavior: a failed request does not fail the workflow; status and body are returned and the run continues. For in-flight runs during the transition, `status` and `headers` may be unavailable in old runs
- Migration (v0 to v1) affects `failure-callback`, `context-call`, `context-invoke`, `serve`, `client-trigger`, `middlewares`, `agents` pages in this reference; existing pages may still document pre-1.0.0 options

## Related

- [middlewares](./middlewares.md)
- [client-trigger](./client-trigger.md)
- [context-call](./context-call.md)
- [serve](./serve.md)
- [agents](./agents.md)
