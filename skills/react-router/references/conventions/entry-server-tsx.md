# entry.server.tsx

Optional server entry point in Framework Mode. Controls how the application generates HTTP responses on the server including streaming SSR. Required for non-Node runtimes (Cloudflare, Deno, etc.).

## Signature / Usage

```tsx
import { PassThrough } from "node:stream";
import type { EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";

export const streamTimeout = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough();
          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
          pipe(body);
        },
        onShellError(error) { reject(error); },
      },
    );
    setTimeout(abort, streamTimeout + 1000);
  });
}
```

## Exports

### Default export: `handleRequest`

| Parameter | Type | Description |
|-----------|------|-------------|
| `request` | `Request` | Incoming HTTP request |
| `responseStatusCode` | `number` | HTTP status code determined by React Router |
| `responseHeaders` | `Headers` | Response headers to modify before sending |
| `routerContext` | `EntryContext` | Router state, matched routes, and loader data |

### Optional named exports

| Export | Signature | Description |
|--------|-----------|-------------|
| `streamTimeout` | `number` | Ms to wait for streamed promises before aborting. Default: React Router internal default |
| `handleDataRequest` | `(response: Response, { request, params, context }: LoaderFunctionArgs \| ActionFunctionArgs) => Response` | Modify responses for data-only requests (non-HTML loader/action responses returned after client hydration) |
| `handleError` | `(error: unknown, { request, params, context }: LoaderFunctionArgs \| ActionFunctionArgs) => void` | Custom server error logging. Suppresses built-in console logging when provided |

## Notes

- v8: content confirmed current against `reactrouter.com/api/framework-conventions/entry.server.tsx` (v8.3.0+). No renames/removals.
- This file is **optional on Node** — React Router provides a default Node implementation.
- For non-Node runtimes (Cloudflare Workers, Deno Deploy) this file is **required**.
- Set `streamTimeout` to control when React aborts deferred promises; set the React renderer's own abort timeout higher than `streamTimeout` so rejected boundaries have time to flush before the stream closes (see the `setTimeout(abort, streamTimeout + 1000)` pattern in the example).
- `handleError` only catches errors from the initial shell render. For errors surfaced later during streaming with `renderToPipeableStream`, use that API's own `onError` callback instead.
- `handleError` is NOT called for intentional `throw new Response(...)` (e.g. 401/404) from loaders/actions — log those at the point of throwing instead.
- Avoid logging aborted requests in `handleError`; check `request.signal.aborted` first (React Router's cancellation/race-condition handling intentionally aborts many requests).
- Use `npx react-router reveal` to scaffold the default implementation.

## Related

- [entry.client.tsx](./entry-client-tsx.md)
- [root.tsx](./root-tsx.md)
- [react-router.config.ts](./react-router-config-ts.md)
