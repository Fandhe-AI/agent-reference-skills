# ServerRouter

Framework Mode server-side router used to generate the initial HTML response. Used in `entry.server.tsx` to render the app on the server.

## Signature / Usage

```tsx
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request, responseStatusCode, responseHeaders, entryContext
) {
  const { pipe } = renderToPipeableStream(
    <ServerRouter context={entryContext} url={request.url} />,
    { onShellReady() { pipe(body); } }
  );
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `context` | `EntryContext` | Yes | Entry context containing the manifest, route modules, and data needed for SSR. |
| `url` | `string` | Yes | The URL of the request being handled. |
| `nonce` | `string` | No | CSP nonce applied to inline scripts rendered by React Router; used as the default `nonce` for `<Links>`, `<Scripts>`, and `<ScrollRestoration>` when they don't provide their own. |

## Notes

- Available in Framework Mode only (not Data Mode, not Declarative Mode). Confirmed current as of v8.3.0 — no API changes from v7.
- Server-only: renders exclusively on the server to produce the initial HTML.
- The `context` prop is provided by the framework runtime; do not construct it manually.
- Use the `nonce` prop when your app sets `Content-Security-Policy: script-src 'nonce-...'` headers.
- The client-side counterpart is `HydratedRouter`, which hydrates the HTML this component produces.

## Related

- [HydratedRouter](./HydratedRouter.md)
- [entry.server.tsx](../conventions/entry-server-tsx.md)
