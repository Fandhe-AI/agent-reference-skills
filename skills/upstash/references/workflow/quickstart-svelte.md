# Quickstart: SvelteKit

Use and deploy Upstash Workflow with SvelteKit. Example source: `examples/sveltekit` in `upstash/workflow-js`.

## Signature / Usage

```bash
npm install @upstash/workflow
```

`routes/api/workflow/+server.ts`:

```typescript
import { serve } from "@upstash/workflow/svelte"
import { env } from "$env/dynamic/private"

export const { POST } = serve(
  async (context) => {
    await context.run("initial-step", () => {
      console.log("initial step ran")
    })

    await context.run("second-step", () => {
      console.log("second step ran")
    })
  },
  { env }
)
```

```bash
curl -X POST https://localhost:5000/api/workflow \
     -H "content-type: application/json"

# result: {"workflowRunId":"wfr_xxxxxx"}
```

## Environment Variables

Create a `.env.local` file in the project root. Two options for local development:

| Option | `.env.local` |
|--------|--------------|
| Development server (SDK downloads and connects to the local QStash dev server automatically, including signature verification) | `QSTASH_DEV=true` |
| Local tunnel (connects to production QStash; logs visible in the Upstash Console) | `QSTASH_TOKEN="***"` and `UPSTASH_WORKFLOW_URL="<UPSTASH_WORKFLOW_URL>"` (public tunnel URL) |

## Notes

- SvelteKit passes `env` from `$env/dynamic/private` as the second argument to `serve`
- Production: set environment variables (e.g. `QSTASH_TOKEN`) in the platform project settings, remove local-tunnel settings, deploy to Vercel, Netlify, or similar, verify with a POST to `https://<YOUR-PRODUCTION-URL>/api/workflow`, and monitor in the QStash dashboard
- Prerequisites: an Upstash QStash API key, and Node.js with npm (or another package manager)

## Related

- [serve](./serve.md)
- [local-development](./local-development.md)
- [security](./security.md)
- [quickstart-nextjs](./quickstart-nextjs.md)
