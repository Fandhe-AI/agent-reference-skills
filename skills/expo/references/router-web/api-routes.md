---
source: https://docs.expo.dev/router/web/api-routes/
---

# API Routes

Create server endpoints with Expo Router by adding `+api.ts` files to the **app** directory. Handlers run on a server (WinterCG-compliant environment) and use the standard `Request` / `Response` objects.

## Signature / Usage

```ts
// src/app/hello+api.ts
export function GET(request: Request) {
  return Response.json({ hello: 'world' });
}
```

Dynamic segment with route params as the second argument:

```ts
// src/app/blog/[post]+api.ts
export async function GET(request: Request, { post }: Record<string, string>) {
  return Response.json({ ... });
}
```

Enable server output in app config (SDK 58 and later: API routes are enabled by default with `web.output: "server"`):

```json
{
  "web": {
    "output": "server"
  }
}
```

Combine API routes with prerendered HTML (SDK 58 and later):

```json
{
  "expo": {
    "web": { "output": "static" },
    "plugins": [["expo-router", { "apiRoutes": true }]]
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS` | exported functions | Executed when the matching HTTP method is received. Unsupported methods return `405: Method not allowed`. |
| `apiRoutes` (`expo-router` plugin) | boolean | `true` enables API routes with `static` output. `false` disables them while keeping the rendering mode. Enabling requires `static` or `server` output; an explicit `false` is accepted in any output mode. |
| `origin` (`expo-router` plugin) | string | Base URL that relative `fetch('/path')` requests resolve to in production. In development, relative fetches target the dev server origin. |

### Runtime API (`expo-server`, SDK 54 and later)

| Function | Description |
| --- | --- |
| `StatusError(status, message)` | Throw to abort and return an error `Response` with a JSON body `{ error }`. |
| `origin()` | Origin URL of the current request. |
| `environment()` | Environment name (`null` for production). |
| `runTask(fn)` | Run an async task concurrently without delaying the response; the runtime keeps the request alive (like `waitUntil()`). |
| `deferTask(fn)` | Run a task after the response has resolved. |
| `setResponseHeaders(...)` | Set headers on the future `Response`, for example from middleware. |

```ts
import { StatusError } from 'expo-server';

export async function GET(request: Request, { post }: Record<string, string>) {
  if (!post) {
    throw new StatusError(404, 'No post found');
  }
  // ...
}
```

Throwing a `Response` (for example `throw Response.redirect('https://expo.dev', 302)`) replaces the resolved response directly.

## Notes

- Distinct from other frameworks: this is not the Next.js App Router route handler API nor the hono / fastify server APIs. `+api.ts` files and `expo-server` are Expo Router specific. See the nextjs-app, hono and fastify skills for those frameworks.
- API route filenames cannot have platform-specific extensions (**hello+api.web.ts** does not work).
- Errors thrown during a request return `500: Internal server error`.
- Bundled with Expo CLI and Metro; server routes can read all environment variables (not only `EXPO_PUBLIC_`). Secret stripping from the client bundle requires `expo/metro-config` in **metro.config.js**. Client code importing a secret includes it in the client bundle for all files in **src/app** other than `+api.ts` files.
- Production requires a deployed server. Export with `npx expo export --platform web` (add `--no-ssg` to export only server code); test locally with `npx expo serve`.
- Native deployment is alpha. Set `origin` in the `expo-router` plugin, or use `EXPO_UNSTABLE_DEPLOY_SERVER=1` for automatic versioned deployment during EAS Build (not supported with **app.config.js** / **app.config.ts**; skip with `EXPO_NO_DEPLOY=1`; logs in `.expo/logs/deploy.log`; does not run in `EXPO_OFFLINE` mode).
- Third-party hosting adapters (`expo-server/adapter/bun`, `express`, `netlify`, `vercel`, ...) export `createRequestHandler({ build })`. Third-party adapters are subject to breaking changes with no continuous tests. `expo-server` does not inflate **.env** files. Older SDKs use `@expo/server`.
- Known limitations: no dynamic imports (everything but Node.js built-ins is bundled into one file, so libraries with multiple platform binaries such as `sharp` cannot be used); ESM is not supported at runtime (code is transpiled to CommonJS).
- Pinned: documentation fetched 2026-10-17 (page modificationDate September 16, 2026), Expo SDK 58.

Express adapter example:

```ts
const { createRequestHandler } = require('expo-server/adapter/express');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(process.cwd(), 'dist/client'), { maxAge: '1h', extensions: ['html'] }));
app.all('/{*all}', createRequestHandler({ build: path.join(process.cwd(), 'dist/server') }));
app.listen(process.env.PORT || 3000);
```

## Related

- [Server (expo-server)](./server.md)
- [Server middleware](./middleware.md)
- [Data loaders](./data-loaders.md)
- [Server rendering](./server-rendering.md)
