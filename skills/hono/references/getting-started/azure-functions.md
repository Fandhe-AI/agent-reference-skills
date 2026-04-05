# Azure Functions

Deploy Hono to Azure Functions V4 (Node.js 18+) via the `@marplex/hono-azurefunc-adapter` third-party adapter.

## Signature / Usage

```ts
// src/app.ts
import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello Azure Functions!'))
export default app
```

```ts
// src/functions/httpTrigger.ts
import { app } from '@azure/functions'
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter'
import honoApp from '../app'

app.http('httpTrigger', {
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  authLevel: 'anonymous',
  route: '{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
})
```

## Notes

- Hono is not officially designed for Azure Functions; integration requires the third-party `@marplex/hono-azurefunc-adapter`
- The default Azure Functions route prefix is `/api`; remove it by setting `"routePrefix": ""` in `host.json` under `extensions.http`
- Initialize with `func init --typescript` (Azure Functions Core Tools required)
- Dev server: `http://localhost:7071`

## Related

- [Basic](./basic.md)
- [Node.js](./nodejs.md)
