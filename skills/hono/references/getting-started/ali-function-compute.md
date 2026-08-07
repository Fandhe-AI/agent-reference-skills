# Alibaba Cloud Function Compute

Deploy Hono to Alibaba Cloud Function Compute using the `hono-alibaba-cloud-fc3-adapter` third-party adapter.

## Signature / Usage

```ts
import { Hono } from 'hono'
import { handle } from 'hono-alibaba-cloud-fc3-adapter'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

export const handler = handle(app)
```

## Notes

- Requires Node.js 20 runtime; configure via `s.yaml` (region, runtime, memory, timeout)
- Deploy with serverless-devs (`npx s config add` then `npm run deploy`); build step uses esbuild to bundle TypeScript
- Default memory 1024 MB and timeout 300 seconds are configurable in `s.yaml`
- `hono-alibaba-cloud-fc3-adapter` and `@serverless-devs/s` are third-party/community tools, not maintained by the Hono core team

## Related

- [Basic](./basic.md)
