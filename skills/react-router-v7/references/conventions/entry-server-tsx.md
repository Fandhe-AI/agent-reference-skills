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
| `handleDataRequest` | `(response, args) => Response` | Modify responses for data-only requests (post-hydration loader/action calls) |
| `handleError` | `(error, args) => void` | Custom server error logging. Suppresses built-in console logging when provided |

## Notes

- This file is **optional on Node** — React Router provides a default Node implementation.
- For non-Node runtimes (Cloudflare Workers, Deno Deploy) this file is **required**.
- Set `streamTimeout` to control when React aborts deferred promises. The `setTimeout(abort, streamTimeout + 1000)` pattern gives rejected boundaries time to flush before the stream closes.
- `handleError` is NOT called for intentional `throw new Response(...)` from loaders/actions — only for unexpected errors.
- Avoid logging aborted requests in `handleError`; check `request.signal.aborted` first.
- Use `npx react-router reveal` to scaffold the default implementation.

## Related

- [entry.client.tsx](./entry-client-tsx.md)
- [root.tsx](./root-tsx.md)
- [react-router.config.ts](./react-router-config-ts.md)
