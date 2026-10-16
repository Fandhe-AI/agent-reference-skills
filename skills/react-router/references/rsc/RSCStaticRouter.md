# unstable_RSCStaticRouter

Pre-renders an `unstable_RSCPayload` to HTML. Usually used in `unstable_routeRSCServerRequest`'s `renderHTML` callback.

## Signature / Usage

```tsx
import { createFromReadableStream } from "@vitejs/plugin-rsc/ssr";
import * as ReactDomServer from "react-dom/server.edge";
import {
  unstable_RSCStaticRouter as RSCStaticRouter,
  unstable_routeRSCServerRequest as routeRSCServerRequest,
} from "react-router";

routeRSCServerRequest({
  request,
  serverResponse,
  createFromReadableStream,
  nonce,
  async renderHTML(getPayload, options) {
    const payload = getPayload();

    return await renderHTMLToReadableStream(
      <RSCStaticRouter
        getPayload={getPayload}
        nonce={options.nonce}
      />,
      {
        ...options,
        bootstrapScriptContent,
        formState: await payload.formState,
      }
    );
  },
});
```

```tsx
function RSCStaticRouter({ getPayload, nonce }: RSCStaticRouterProps)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| getPayload | function | Starts decoding of the `unstable_RSCPayload`. Usually passed through from `unstable_routeRSCServerRequest`'s `renderHTML`. |
| nonce | `string` | Optional `nonce` used as the default for nonce-aware components such as `<Links>` and `<ScrollRestoration>`. |

## Notes

- Data Mode only. Experimental (`unstable_`): subject to breaking changes in minor/patch releases.
- `renderHTMLToReadableStream` is not defined in the official snippet; the official RSC how-to guide imports it as `import { renderToReadableStream as renderHTMLToReadableStream } from "react-dom/server.edge";` (the `ReactDomServer` namespace import above is otherwise unused). See https://reactrouter.com/how-to/react-server-components (tag react-router@8.4.0).
- Source: https://reactrouter.com/api/rsc/RSCStaticRouter (docs/api/rsc/RSCStaticRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/rsc/RSCStaticRouter.md)

## Related

- [unstable_routeRSCServerRequest](./routeRSCServerRequest.md)
- [unstable_RSCHydratedRouter](./RSCHydratedRouter.md)
