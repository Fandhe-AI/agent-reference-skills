# Node.js Runtime

Runs Node.js HTTP servers or individual functions written in JavaScript or TypeScript. Provides full Node.js API access, high RAM/CPU, and bundles up to 250 MB.

## Signature / Usage

```ts
// api/hello.ts — fetch Web Standard (recommended)
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'World';
    return Response.json({ message: `Hello ${name}!` });
  },
};

// server.ts — Node.js HTTP server (detected from project root or src/)
import { createServer } from 'node:http';
const server = createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from Node.js on Vercel');
});
server.listen(Number(process.env.PORT ?? 3000));
```

## Node.js Helper Methods

Available on `request` and `response` objects for `/api` handlers:

| Method | Object | Description |
|--------|--------|-------------|
| `request.query` | Request | Parsed query string object, or `{}` |
| `request.cookies` | Request | Parsed cookies object, or `{}` |
| `request.body` | Request | Parsed body based on `Content-Type`, or `undefined` if the request has no `Content-Type` header or an unsupported one |
| `response.status(code)` | Response | Set HTTP status code; returns `response` for chaining |
| `response.send(body)` | Response | Send `string`, `object`, or `Buffer` as response body |
| `response.json(obj)` | Response | Send JSON response |
| `response.redirect(url)` | Response | Redirect with 307 Temporary Redirect |
| `response.redirect(code, url)` | Response | Redirect with specified status code |

## Request Body Parsing by Content-Type

| `Content-Type` | `request.body` value |
|---------------|---------------------|
| (none) | `undefined` |
| `application/json` | Parsed JSON object |
| `application/x-www-form-urlencoded` | Parsed form data object |
| `text/plain` | String |
| `application/octet-stream` | `Buffer` |

## Package Manager Detection

Checked in this order; the first match is used:

| Lock file | Package manager used |
|-----------|---------------------|
| `yarn.lock` and (`bun.lock` or `bun.lockb`) | `bun install` |
| `yarn.lock` | `yarn install` |
| `pnpm-lock.yaml` | `pnpm install` |
| `package-lock.json` | `npm install` |
| `bun.lock` / `bun.lockb` | `bun install` |
| `vlt-lock.json` | `vlt install` |
| (none) | `npm install` |

## Node.js Server Entrypoint Detection

Vercel looks for these files in project root or `src/`:
- `server.{js,cjs,mjs,ts,cts,mts}`
- `src/server.{js,cjs,mjs,ts,cts,mts}`

## Notes

- Vercel creates a separate function for each supported source file in the root `api/` directory. Avoid one function per endpoint: keep related routes in a shared function (Next.js Route Handlers, Hono, or a single `fetch` handler routing by pathname, with rewrites) so fluid compute can reuse instances and fewer functions are built; keep shared utilities and route modules outside `api/`
- To use native ES modules in JavaScript handlers, use `.mjs` or set `"type": "module"` in the nearest `package.json`; otherwise Vercel compiles ES module syntax in `.js` files to CommonJS
- The `request.query` / `cookies` / `body` and `response` helpers can be opted out of via advanced Node.js configuration
- To pin a package manager version, see corepack in the build configuration docs
- Source: https://vercel.com/docs/functions/runtimes/node-js (fetched 2026-11-14)
- Node.js versions (docs "Supported Node.js versions"): `24.x` (default; a new project uses the latest LTS) and `22.x`; only major versions are selectable and Vercel rolls out minor and patch updates. Select the version in Project Settings > Build and Deployment > Node.js Version
- Deprecated Node.js versions: team owners and members can upgrade all projects on Node.js 20 or earlier to Node.js 24 with one click in the dashboard (changelog 2026-08-13). This updates the project-settings version only; a version defined in `package.json` must be updated manually, and existing deployments are not affected. The changelog "Node.js 20 is being deprecated on October 1, 2026" is linked from the versions page
- All Node.js APIs are supported, including file system, crypto, streams
- `request.body` uses a JavaScript getter and is only computed on access
- Malformed JSON in `request.body` throws an error — wrap with `try...catch`
- Node.js middleware (experimental): set `experimental.nodeMiddleware: true` in `next.config.ts` and `runtime: 'nodejs'` in `middleware.ts`
- Running middleware on Node.js runtime incurs Vercel Functions pricing (fluid compute only)
- TypeScript is supported; most `tsconfig.json` options work (except Path Mappings and Project References)
- Captured Node.js servers receive standard `IncomingMessage` / `ServerResponse` — no `request.query`, `request.cookies`, or `request.body` helpers

### Cancelled Requests

Request cancellation must be enabled on a per-route basis (see functions-api-reference.md). Listen for the `error` event on the request object:

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
  let cancelled = false;
  request.on('error', (error) => {
    if (error.message === 'aborted') {
      console.log('request aborted');
    }
    cancelled = true;
  });

  response.writeHead(200);

  for (let i = 1; i < 5; i++) {
    if (cancelled) {
      // the response must be explicitly ended
      response.end();
      return;
    }

    response.write(`Count: ${i}\n`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  response.end('All done!');
};
```

## Related

- [edge-runtime.md](./edge-runtime.md)
- [runtimes.md](./runtimes.md)
- [configuring-functions.md](./configuring-functions.md)
- [limitations.md](./limitations.md)
