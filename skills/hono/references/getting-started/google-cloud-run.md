# Google Cloud Run

Deploy a Hono app as a containerized service on Google Cloud Run. Any runtime (Node.js, Bun, Deno) is supported via Dockerfile.

## Signature / Usage

```ts
// src/index.ts — Node.js adapter, port must be 8080
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello!'))

serve({
  fetch: app.fetch,
  port: 8080,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
```

## Notes

- Port **must** be `8080` (Cloud Run requirement)
- Default runtime is Node.js if no Dockerfile is provided; provide a Dockerfile for Bun or Deno
- Deploy command: `gcloud run deploy my-app --source . --allow-unauthenticated`
- Initial deployment may take ~30 seconds before returning a response
- Required APIs: `run.googleapis.com`, `cloudbuild.googleapis.com`

## Related

- [Basic](./basic.md)
- [Node.js](./nodejs.md)
