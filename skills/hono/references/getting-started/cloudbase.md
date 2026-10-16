# Tencent CloudBase

Deploy Hono to Tencent CloudBase HTTP Cloud Functions, which run a plain Node.js process listening on port `9000` and started through `scf_bootstrap`. `@hono/node-server` works as-is; no extra Hono adapter is required.

## Signature / Usage

```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello CloudBase!'))

serve({
  fetch: app.fetch,
  port: 9000,
})
```

Setup (select `nodejs` in the prompt):

```sh
npm create hono@latest my-app
cd my-app
npm i
```

Bootstrap file `scf_bootstrap` in the project root (no file extension), made executable with `chmod +x scf_bootstrap`:

```sh
#!/bin/bash
/var/lang/node20/bin/node dist/index.js
```

Deploy with the CloudBase CLI:

```sh
npm run build
tcb fn deploy <function-name> --httpFn
```

## Notes

- CloudBase HTTP Cloud Functions require port `9000`
- `scf_bootstrap` must use LF line endings; the Node path must match the function runtime (`/var/lang/node20/bin/node` is for Node.js 20.19)
- Deploy as an HTTP function (Node.js 20.19); console zip upload is described in the CloudBase Node.js HTTP function quick start
- Run locally with `npm run dev` and access `http://localhost:9000`
- Source: https://hono.dev/docs/getting-started/cloudbase (honojs/website@7838d779)

## Related

- [Node.js](./nodejs.md)
