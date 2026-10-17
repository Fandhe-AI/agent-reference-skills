---
source: https://docs.expo.dev/versions/v58.0.0/sdk/server/
---

# Server (expo-server)

`expo-server` is the server-side API and runtime library for Expo Router. It provides helpers for API routes and other server code, and adapters that run Expo Router server exports.

## Signature / Usage

```sh
npx expo install expo-server
```

```ts
import { origin, environment, runTask, deferTask } from 'expo-server';

export async function GET() {
  runTask(async () => {
    console.log('will run immediately.');
  });

  deferTask(async () => {
    console.log('will run after the response resolved.');
  });

  return Response.json({
    isProduction: environment() == null,
    isStaging: environment() === 'staging',
    origin: origin(),
  });
}
```

Adapter entry:

```ts
import path from 'node:path';
import { createRequestHandler } from 'expo-server/adapter/http';

const onRequest = createRequestHandler({
  build: path.join(process.cwd(), 'dist/server'),
  environment: process.env.NODE_ENV,
});
```

## Options / Props

Adapters (all export `createRequestHandler`; `build` is the path to the `dist/server` output of `npx expo export`):

| Adapter | Provider |
| --- | --- |
| `expo-server/adapter/bun` | Bun |
| `expo-server/adapter/express` | Express |
| `expo-server/adapter/http` | Node.js |
| `expo-server/adapter/netlify` | Netlify Functions |
| `expo-server/adapter/vercel` | Vercel Functions |
| `expo-server/adapter/workerd` | Cloudflare Workers |

Methods (platform: Server):

| Name | Signature | Description |
| --- | --- | --- |
| `createServerLoader(fn)` | `fn: (request: ImmutableRequest, params: Record<string, string \| string[]>) => T \| Promise<T>`; returns `LoaderFunction<T>` | Loader needing the request. Throws if called during SSG. |
| `createStaticLoader(fn)` | `fn: (params) => T \| Promise<T>`; returns `LoaderFunction<T>` | Loader needing only route params; safe for SSG and SSR. |
| `deferTask(fn)` | `fn: () => void \| Promise<unknown>`; returns `void` | Run after the response is sent; not run if the handler rejects. |
| `environment()` | returns `string \| null` | Request environment name; `null` for production. On EAS Hosting it is the alias or deployment identifier. |
| `origin()` | returns `string \| null` | Current request URL / origin. Does not use the `Origin` header in development (untrusted). |
| `requestHeaders()` | returns `ImmutableHeaders` | Immutable copy of the current request's headers. |
| `runTask(fn)` | `fn: () => Promise<unknown>`; returns `void` | Run immediately and keep the handler alive until it finishes. |
| `setResponseHeaders(updateHeaders)` | `Headers \| Record<string, string \| string[]> \| (headers: Headers) => void \| Headers` | Merge headers into the response the handler returns. |

Classes, interfaces and types:

| Name | Description |
| --- | --- |
| `StatusError` (extends `Error`) | Thrown anywhere in server code; replaced by a `Response` with its `status` (number) and `body` (string). `new StatusError(400, 'postId parameter is required')`. |
| `ImmutableHeaders` | Immutable version of Fetch `Headers`. |
| `ImmutableRequest` | Immutable Fetch `Request` (no body access, immutable headers); exposes `method` and `url`. |
| `MiddlewareMatcher` | `{ methods?: string[]; patterns?: (string \| RegExp)[] }`. |
| `MiddlewareSettings` | `{ matcher?: MiddlewareMatcher }`, exported as `unstable_settings` from `+middleware.ts`. |
| `GenerateMetadataFunction(request, params)` | `request: ImmutableRequest \| undefined`; returns `Metadata \| null \| undefined` (or a Promise of it). |
| `LoaderFunction(request, params)` | `request: ImmutableRequest \| undefined` (undefined in SSG); returns `T \| Promise<T>`. |
| `MiddlewareFunction(request)` | `request: ImmutableRequest`; returns `Response \| void` (or a Promise). |
| `Metadata` | Optional fields: `alternates`, `appleWebApp`, `applicationName`, `appLinks`, `archives`, `assets`, `authors`, `bookmarks`, `category`, `creator`, `description`, `facebook`, `formatDetection`, `generator`, `icons`, `itunes`, `keywords`, `manifest`, `openGraph`, `other`, `pinterest`, `publisher`, `referrer`, `robots`, `title`, `twitter`, `verification`. |
| `MetadataIconDescriptor` | `string` or `{ media?, rel?, sizes?, type?, url }`. |
| `MetadataImage` | `string` or `{ alt?, height?, secureUrl?, type?, url, width? }`. |
| `MetadataValue` | `string \| number \| boolean`. |
| `MetadataValueArray` | `MetadataValue[]`. |

## Notes

- Runtime APIs can only be called in server-side code, inside the async context of a request handler. A distinct package from the web frameworks fastify / hono / nextjs-app; the runtime is Expo-specific.
- Needs a server export: `web.output: "server"`, or in SDK 58 and later `web.output: "static"` with `apiRoutes: true` in the `expo-router` config plugin (both produce `dist/server`; see API Routes). The SDK 58 reference page itself only mentions `server` mode. Available since SDK 54; older SDKs use `@expo/server`.
- This reference imports typed helpers and types from `expo-server`, while the Data loaders / Middleware / Server rendering guides import them from `expo-router/server`.
- Pinned: Expo SDK 58 (`/versions/v58.0.0/`, source `sdk-58` packages/expo-server), documentation fetched 2026-10-17 (page modificationDate September 17, 2026).

## Related

- [API Routes](./api-routes.md)
- [Data loaders](./data-loaders.md)
- [Server middleware](./middleware.md)
- [Server rendering](./server-rendering.md)
