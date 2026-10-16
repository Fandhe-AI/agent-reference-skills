# unstable_createCallServer

Creates a React `callServer` implementation for React Router.

## Signature / Usage

```tsx
import {
  createFromReadableStream,
  createTemporaryReferenceSet,
  encodeReply,
  setServerCallback,
} from "@vitejs/plugin-rsc/browser";
import { unstable_createCallServer as createCallServer } from "react-router";

setServerCallback(
  createCallServer({
    createFromReadableStream,
    createTemporaryReferenceSet,
    encodeReply,
  })
);
```

```tsx
function createCallServer({
  createFromReadableStream,
  createTemporaryReferenceSet,
  encodeReply,
  fetch: fetchImplementation = fetch,
}: {
  createFromReadableStream: BrowserCreateFromReadableStreamFunction;
  createTemporaryReferenceSet: () => unknown;
  encodeReply: EncodeReplyFunction;
  fetch?: (request: Request) => Promise<Response>;
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| opts.createFromReadableStream | `BrowserCreateFromReadableStreamFunction` | Your `react-server-dom-xyz/client` `createFromReadableStream`. Used to decode payloads from the server. |
| opts.createTemporaryReferenceSet | `() => unknown` | Creates a temporary reference set for the RSC payload. |
| opts.encodeReply | `EncodeReplyFunction` | Your `react-server-dom-xyz/client` `encodeReply`. Used when sending payloads to the server. |
| opts.fetch | `(request: Request) => Promise<Response>` | Optional Fetch API implementation. Defaults to global `fetch`. |

Returns a function that can be used to call server actions.

## Notes

- Data Mode only. Experimental (`unstable_`): subject to breaking changes in minor/patch releases.

## Related

- [unstable_RSCHydratedRouter](./RSCHydratedRouter.md)
- [unstable_matchRSCServerRequest](./matchRSCServerRequest.md)
