# Upstash Workflow Overview

Durable serverless function orchestration built on QStash. Splits multi-step backend processes into individually managed, automatically retried steps that survive timeouts and outages.

## Signature / Usage

```bash
npm install @upstash/workflow
```

```typescript
import { serve } from "@upstash/workflow/nextjs"

export const { POST } = serve(async (context) => {
  const result = await context.run("step-1", async () => {
    return fetchData()
  })

  await context.run("step-2", async () => {
    process(result)
  })
})
```

## How It Works

1. Each step executes via its own HTTP request
2. Step results are persisted in durable state
3. On resumption, completed steps are skipped and prior results are restored
4. Failed steps are automatically retried with exponential backoff

## Key Concepts

| Concept | Description |
|---------|-------------|
| Step | A discrete unit of work defined by `context.run()` |
| Durable execution | State survives crashes; steps are never re-executed after success |
| QStash-backed | Orchestration engine powered by Upstash QStash |
| No resource waste | Sleeping or waiting workflows consume zero compute |

## Notes

- Solves timeout limits (10–60 s) common in serverless platforms by splitting logic into steps
- Each step runs as a separate HTTP call; QStash manages scheduling and retries
- Returned values from steps must be JSON-serializable

## Related

- [serve()](./serve.md)
- [context](./context.md)
- [client](./client.md)
- [local-development](./local-development.md)
