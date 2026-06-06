# Quickstart: Nuxt (H3)

Integrate Upstash Workflow with Nuxt.js using the H3 server adapter.

## Signature / Usage

```bash
npm install @upstash/workflow
```

```typescript
// server/api/workflow.ts
import { serve } from "@upstash/workflow/h3"

const { handler } = serve<{ message: string }>(
  async (context) => {
    await context.run("initial-step", () => {
      console.log("initial step ran")
    })

    await context.run("second-step", () => {
      console.log("second step ran")
    })
  }
)

export default handler
```

```bash
# Start dev server
npm run dev

# Trigger
curl -X POST https://localhost:3000/api/workflow
# Returns: {"workflowRunId":"wfr_xxxxxx"}
```

## Environment Variables (`.env.local`)

| Variable | Description |
|----------|-------------|
| `QSTASH_URL` | QStash endpoint (local dev: `http://127.0.0.1:8080`) |
| `QSTASH_TOKEN` | QStash API token |
| `UPSTASH_WORKFLOW_URL` | Public workflow URL (required for tunnel mode) |

## Notes

- The `h3` adapter works with any H3-based framework (Nuxt, Nitro)
- For production deployment on Vercel or Cloudflare Pages: configure env vars in the platform settings and remove local development overrides

## Related

- [serve](./serve.md)
- [local-development](./local-development.md)
