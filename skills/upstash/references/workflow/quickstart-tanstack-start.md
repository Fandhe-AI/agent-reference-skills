# Quickstart: TanStack Start

Use Upstash Workflow with TanStack Start, exposing workflow endpoints as API routes. Example source: `examples/tanstack-start` in `upstash/workflow-js`.

## Signature / Usage

```bash
pnpm create @tanstack/start@latest
pnpm install @upstash/workflow
```

`src/routes/api/workflow.ts`:

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { serve } from '@upstash/workflow/tanstack'

const someWork = (input: string) => {
  return `processed '${JSON.stringify(input)}'`
}

export const Route = createFileRoute('/api/workflow')({
  server: {
    handlers: serve<string>(async (context) => {
      const input = context.requestPayload

      const result1 = await context.run('step1', () => {
        const output = someWork(input)
        console.log('step 1 input', input, 'output', output)
        return output
      })

      await context.run('step2', () => {
        const output = someWork(result1)
        console.log('step 2 input', result1, 'output', output)
      })
    }),
  },
})
```

Trigger a run:

```javascript
import { Client } from "@upstash/workflow";

const client = new Client({ token: process.env.QSTASH_TOKEN! })

const { workflowRunId } = await client.trigger({
  url: `http://localhost:3000/api/workflow`,
  body: "Hello World!",
  retries: 3
});
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `QSTASH_DEV=true` | Local development: the SDK downloads, starts, and connects to a local QStash development server automatically (workflow client and `serve()` both pick it up, including signature verification) |

For production, set your actual credentials from the Upstash Workflow dashboard instead of `QSTASH_DEV`.

## Notes

- Prerequisites: Node.js and pnpm. Works in an existing TanStack Start app or a new project
- `serve` is imported from `@upstash/workflow/tanstack` and passed to the route's `server.handlers`
- Call `trigger()` from a server-side action, not client-side code, to keep credentials secure
- Use the app URL for the `url` option: `http://localhost:3000/api/workflow` locally, your deployed URL in production (e.g. a `BASE_URL` constant switched on `process.env.NODE_ENV`)
- Local mode can be enabled in the Upstash Workflow dashboard to use the UI during local development
- Manual QStash CLI setup, custom ports, and the `registerQStashDev()` helper for edge routes are covered in the Development Server guide
- The original page writes `const client = Client()` (without `new` and without a token); corrected here to match the `new Client({ token })` form used on the other pages
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/quickstarts/tanstack-start

## Related

- [serve](./serve.md)
- [client-trigger](./client-trigger.md)
- [local-development](./local-development.md)
- [failures](./failures.md)
