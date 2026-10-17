# Middlewares

Middlewares intercept workflow lifecycle events and debug messages, for logging, monitoring, error tracking, and custom integrations. Pass them via the `middlewares` option of `serve`.

## Signature / Usage

```typescript
import { serve } from "@upstash/workflow/nextjs";
import { loggingMiddleware } from "@upstash/workflow";

export const { POST } = serve(
  async (context) => {
    await context.run("step-1", () => {
      return "Hello World";
    });
  },
  {
    middlewares: [loggingMiddleware]
  }
);
```

Custom middleware with direct callbacks:

```typescript
import { WorkflowMiddleware } from "@upstash/workflow";

const customMiddleware = new WorkflowMiddleware({
  name: "custom-logger",
  callbacks: {
    // Lifecycle events
    runStarted: async ({ context }) => {
      console.log(`Workflow ${context.workflowRunId} started`);
    },
    beforeExecution: async ({ context, stepName }) => {
      console.log(`Executing step: ${stepName}`);
    },
    afterExecution: async ({ context, stepName, result }) => {
      console.log(`Step ${stepName} completed with result:`, result);
    },
    runCompleted: async ({ context, result }) => {
      console.log(`Workflow ${context.workflowRunId} completed:`, result);
    },

    // Debug events
    onError: async ({ workflowRunId, error }) => {
      console.error(`Error in ${workflowRunId}:`, error);
    },
    onWarning: async ({ workflowRunId, warning }) => {
      console.warn(`Warning in ${workflowRunId}:`, warning);
    },
    onInfo: async ({ workflowRunId, info }) => {
      console.info(`Info from ${workflowRunId}:`, info);
    }
  }
});
```

Middleware that initializes resources with `init` (returns the callbacks):

```typescript
const databaseMiddleware = new WorkflowMiddleware({
  name: "database-logger",
  init: async () => {
    const db = await connectToDatabase();
    return {
      runStarted: async ({ context }) => {
        await db.insert({ workflowRunId: context.workflowRunId, status: 'started' });
      },
      runCompleted: async ({ context, result }) => {
        await db.update({ workflowRunId: context.workflowRunId, status: 'completed', result });
      },
      onError: async ({ workflowRunId, error }) => {
        await db.insert({ workflowRunId, level: 'error', message: error.message });
      }
    };
  }
});
```

## Options / Props

### Lifecycle events

| Callback | Parameters | Description |
|----------|------------|-------------|
| `runStarted` | `{ context }` | Called when a workflow run begins |
| `beforeExecution` | `{ context, stepName }` | Called before each step executes |
| `afterExecution` | `{ context, stepName, result }` | Called after each step completes |
| `runCompleted` | `{ context, result }` | Called when the entire run finishes; `result` is the final result |

### Debug events

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onError` | `{ workflowRunId?, error }` | Called when an error occurs |
| `onWarning` | `{ workflowRunId?, warning }` | Called when a warning is logged |
| `onInfo` | `{ workflowRunId?, info }` | Called when an info message is logged |

## Notes

- Built-in `loggingMiddleware` (from `@upstash/workflow`) logs run start/complete, before/after each step, and error/warning/info messages to the console
- Multiple middlewares can be combined (`middlewares: [loggingMiddleware, errorTrackingMiddleware, ...]`); they execute in the order provided
- `WorkflowMiddleware` takes `name` plus either `callbacks` or `init`
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/howto/middlewares

## Related

- [serve](./serve.md)
- [realtime](./realtime.md)
- [failure-callback](./failure-callback.md)
