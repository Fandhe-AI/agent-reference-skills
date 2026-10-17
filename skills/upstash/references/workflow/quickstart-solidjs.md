# Quickstart: Solid.js

Use and deploy Upstash Workflow with SolidJS. Example source: `examples/solidjs` in `upstash/workflow-js`.

## Signature / Usage

```bash
npm install @upstash/workflow
```

`routes/api/workflow.ts`:

```typescript
import { serve } from "@upstash/workflow/solidjs"

export const { POST } = serve(async (context) => {
  await context.run("initial-step", () => {
    console.log("initial step ran")
  })

  await context.run("second-step", () => {
    console.log("second step ran")
  })
})
```

```bash
curl -X POST http://localhost:3000/api/workflow

# result: {"workflowRunId":"wfr_xxxxxx"}
```

## Environment Variables

Create a `.env` file in the project root. Two options for local development:

| Option | `.env` |
|--------|--------|
| Development server (SDK downloads and connects to the local QStash dev server automatically, including signature verification) | `QSTASH_DEV=true` |
| Local tunnel (connects to production QStash; logs visible in the Upstash Console) | `QSTASH_TOKEN="***"` and `UPSTASH_WORKFLOW_URL="<UPSTASH_WORKFLOW_URL>"` (public tunnel URL) |

## Notes

- Import `serve` from `@upstash/workflow/solidjs`; the endpoint file lives in the SolidJS `routes/api` directory
- Production: set environment variables (e.g. `QSTASH_TOKEN`) in the platform project settings, remove local-tunnel settings, deploy to Netlify, Vercel, or similar, verify with a POST to `https://<YOUR-PRODUCTION-URL>/api/workflow`, and monitor in the QStash dashboard
- Prerequisites: an Upstash QStash API key, and Node.js with npm (or another package manager)
- The original curl uses `https://localhost:3000`; corrected to `http://localhost:3000` because the local dev server does not use TLS
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/quickstarts/solidjs

## Related

- [serve](./serve.md)
- [local-development](./local-development.md)
- [security](./security.md)
- [quickstart-nextjs](./quickstart-nextjs.md)
