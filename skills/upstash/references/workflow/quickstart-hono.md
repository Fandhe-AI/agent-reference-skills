# Quickstart: Hono

Integrate Upstash Workflow with Hono (e.g., on Cloudflare Workers).

## Signature / Usage

```bash
npm install @upstash/workflow
```

```typescript
import { Hono } from "hono"
import { serve } from "@upstash/workflow/hono"

const app = new Hono()

app.post(
  "/workflow",
  serve<{ message: string }>(async (context) => {
    const result = await context.run("initial-step", () => {
      return context.requestPayload.message
    })

    await context.run("second-step", () => {
      console.log("Result:", result)
    })
  })
)

export default app
```

```bash
# Trigger
curl -X POST http://localhost:8787/workflow \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
# Returns: {"workflowRunId":"wfr_xxxxxx"}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `QSTASH_URL` | QStash endpoint (local dev: `http://127.0.0.1:8080`) |
| `QSTASH_TOKEN` | QStash API token |
| `UPSTASH_WORKFLOW_URL` | Public workflow URL (required for local tunnel mode) |

## Notes

- To access Hono's native context or Cloudflare bindings, use the `WorkflowBindings` interface and the `env()` helper provided by the SDK
- For local development: use `.dev.vars` file for environment variables with `wrangler dev`
- Deploy to Cloudflare Workers with `wrangler deploy`

## Related

- [serve](./serve.md)
- [quickstart-cloudflare](./quickstart-cloudflare.md)
- [local-development](./local-development.md)
