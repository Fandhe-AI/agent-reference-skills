# unstable_getRSCStream

Gets the prerendered RSC stream for hydration. Usually passed directly to your `react-server-dom-xyz/client`'s `createFromReadableStream`.

## Signature / Usage

```tsx
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  unstable_getRSCStream as getRSCStream,
  unstable_RSCHydratedRouter as RSCHydratedRouter,
} from "react-router";
import type { unstable_RSCPayload as RSCPayload } from "react-router";

createFromReadableStream(getRSCStream()).then(
  (payload: RSCServerPayload) => {
    startTransition(async () => {
      hydrateRoot(
        document,
        <StrictMode>
          <RSCHydratedRouter {...props} />
        </StrictMode>,
        {
          // Options
        }
      );
    });
  }
);
```

```tsx
function getRSCStream(): ReadableStream
```

Returns a `ReadableStream` that contains the RSC data for hydration.

## Notes

- Data Mode only. Experimental (`unstable_`): subject to breaking changes in minor/patch releases.
- Source: https://reactrouter.com/api/rsc/getRSCStream (docs/api/rsc/getRSCStream.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/rsc/getRSCStream.md)

## Related

- [unstable_RSCHydratedRouter](./RSCHydratedRouter.md)
- [unstable_routeRSCServerRequest](./routeRSCServerRequest.md)
