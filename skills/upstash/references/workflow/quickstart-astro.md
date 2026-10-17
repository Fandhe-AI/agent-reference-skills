# Quickstart: Astro

Use and deploy Upstash Workflow with Astro. Example source: `examples/astro` in `upstash/workflow-js`.

## Signature / Usage

```bash
npm install @upstash/workflow
```

`src/pages/api/workflow.ts`:

```typescript
import { serve } from "@upstash/workflow/astro";

export const { POST } = serve<string>(async (context) => {
  const result1 = await context.run("initial-step", () => {
    console.log("initial step ran")
    return "hello world!"
  })

  await context.run("second-step", () => {
    console.log(`second step ran with value ${result1}`)
  })
}, {
  // env must be passed in astro.
  // for local dev, we need import.meta.env.
  // For deployment, we need process.env:
  env: {
    ...process.env,
    ...import.meta.env
  }
})
```

```bash
curl -X POST http://localhost:3000/api/workflow \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello from the workflow!"}'

# result: {"workflowRunId":"wfr_xxxxxx"}
```

### Environment Variables

Create a `.env` file in the project root. Two options for local development:

| Option | `.env` |
|--------|--------|
| Development server (no tokens or signing keys needed; the SDK downloads and connects to the local QStash dev server, including signature verification) | `QSTASH_DEV=true` |
| Local tunnel (connects to production QStash; logs visible in the Upstash Console) | `QSTASH_TOKEN="***"` and `UPSTASH_WORKFLOW_URL="<UPSTASH_WORKFLOW_URL>"` (public tunnel URL) |

## Notes

- Astro requires passing `env` to `serve`: `import.meta.env` for local dev and `process.env` for deployment
- Production: set all environment variables (e.g. `QSTASH_TOKEN`) in the hosting platform (e.g. Vercel), remove local-tunnel settings, deploy normally, verify with a POST to `<DEPLOYMENT_URL>/api/workflow`, and monitor runs in the QStash dashboard
- Prerequisites: an Upstash QStash API key, and Node.js with npm (or another package manager)
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/quickstarts/astro

## Related

- [serve](./serve.md)
- [local-development](./local-development.md)
- [security](./security.md)
- [quickstart-nextjs](./quickstart-nextjs.md)
