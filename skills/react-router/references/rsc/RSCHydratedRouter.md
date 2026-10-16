# unstable_RSCHydratedRouter

Hydrates a server rendered `unstable_RSCPayload` in the browser.

## Signature / Usage

```tsx
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  unstable_getRSCStream as getRSCStream,
  unstable_RSCHydratedRouter as RSCHydratedRouter,
} from "react-router";
import type { unstable_RSCPayload as RSCPayload } from "react-router";

createFromReadableStream(getRSCStream()).then((payload) =>
  startTransition(async () => {
    hydrateRoot(
      document,
      <StrictMode>
        <RSCHydratedRouter
          createFromReadableStream={createFromReadableStream}
          payload={payload}
        />
      </StrictMode>,
      { formState: await getFormState(payload) },
    );
  }),
);
```

```tsx
function RSCHydratedRouter({
  createFromReadableStream,
  fetch: fetchImplementation = fetch,
  payload,
  getContext,
}: RSCHydratedRouterProps)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| createFromReadableStream | function | Your `react-server-dom-xyz/client` `createFromReadableStream`, used to decode payloads from the server. |
| fetch | `typeof fetch` | Optional fetch implementation. Defaults to global `fetch`. |
| getContext | `() => RouterContextProvider` | Returns a `RouterContextProvider` instance provided as the `context` argument to client actions, loaders and middleware. Called to generate a fresh `context` on each navigation or fetcher call. |
| payload | `unstable_RSCPayload` | The decoded `unstable_RSCPayload` to hydrate. |

## Notes

- Data Mode only (RSC Data Mode). Experimental (`unstable_`): subject to breaking changes in minor/patch releases.
- Distinct from Framework Mode's `HydratedRouter` (imported from `react-router/dom`).
- `getFormState` in the docs example is user-defined, not a React Router export.

## Related

- [unstable_getRSCStream](./getRSCStream.md)
- [unstable_createCallServer](./createCallServer.md)
- [unstable_RSCStaticRouter](./RSCStaticRouter.md)
- [HydratedRouter](../routers/HydratedRouter.md)
