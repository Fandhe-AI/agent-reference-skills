# Quickstart: Next.js

Integrate Upstash Workflow with Next.js App Router or Pages Router.

## Signature / Usage

```bash
npm install @upstash/workflow
```

```typescript
// app/api/workflow/route.ts (App Router)
import { serve } from "@upstash/workflow/nextjs"

export const { POST } = serve<{ message: string }>(async (context) => {
  const result = await context.run("initial-step", () => {
    return "hello"
  })

  await context.run("second-step", () => {
    console.log(result)
  })
})
```

```typescript
// Trigger from a Server Action or API route
import { Client } from "@upstash/workflow"

const client = new Client({ token: process.env.QSTASH_TOKEN! })
const { workflowRunId } = await client.trigger({
  url: `${process.env.NEXT_PUBLIC_APP_URL}/api/workflow`,
  body: { message: "Hello" },
  retries: 3,
})
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `QSTASH_URL` | QStash endpoint (local dev: `http://127.0.0.1:8080`) |
| `QSTASH_TOKEN` | QStash API token |
| `QSTASH_CURRENT_SIGNING_KEY` | For request signature verification |
| `QSTASH_NEXT_SIGNING_KEY` | For key rotation |

## Notes

- For **Pages Router**, use `servePagesRouter()` from `@upstash/workflow/nextjs`
- For local development, run `npx @upstash/qstash-cli dev` or set `QSTASH_DEV=true`
- Trigger workflows from server-side code only; never expose `QSTASH_TOKEN` to the client
- One-click Vercel deployment template available in the Upstash documentation

## Related

- [serve](./serve.md)
- [client.trigger](./client-trigger.md)
- [local-development](./local-development.md)
- [security](./security.md)
