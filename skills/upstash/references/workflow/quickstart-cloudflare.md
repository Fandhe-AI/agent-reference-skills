# Quickstart: Cloudflare Workers

Deploy Upstash Workflow on Cloudflare Workers with Wrangler.

## Signature / Usage

```bash
npm install @upstash/workflow
```

```typescript
// src/index.ts
import { serve } from "@upstash/workflow/cloudflare"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { handler } = serve<{ message: string }>(
      async (context) => {
        const result = await context.run("step-1", () => {
          return context.requestPayload.message
        })

        await context.run("step-2", () => {
          console.log("Result:", result)
        })
      },
      { env }
    )

    return handler(request)
  },
}
```

```bash
# Local development
npm run wrangler dev

# Trigger
curl -X POST http://localhost:8787/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Deploy
wrangler deploy
```

## Environment Variables (`.dev.vars`)

| Variable | Description |
|----------|-------------|
| `QSTASH_URL` | QStash endpoint (local dev: `http://127.0.0.1:8080`) |
| `QSTASH_TOKEN` | QStash API token |
| `UPSTASH_WORKFLOW_URL` | Public workflow URL (required for tunnel mode) |

## Notes

- In production, configure environment variables in Cloudflare Worker settings (not `.dev.vars`)
- For local development without production billing: run `npx @upstash/qstash-cli dev`
- For dashboard-visible local runs: use a tunnel and connect to production QStash

## Related

- [serve](./serve.md)
- [quickstart-hono](./quickstart-hono.md)
- [local-development](./local-development.md)
