# unstable_matchRSCServerRequest

Matches the given routes to a `Request` and returns an RSC `Response` encoding an `unstable_RSCPayload` for consumption by an RSC-enabled client router.

## Signature / Usage

```tsx
import {
  createTemporaryReferenceSet,
  decodeAction,
  decodeReply,
  loadServerAction,
  renderToReadableStream,
} from "@vitejs/plugin-rsc/rsc";
import { unstable_matchRSCServerRequest as matchRSCServerRequest } from "react-router";

matchRSCServerRequest({
  createTemporaryReferenceSet,
  decodeAction,
  decodeFormState,
  decodeReply,
  loadServerAction,
  request,
  routes: routes(),
  generateResponse(match) {
    return new Response(
      renderToReadableStream(match.payload),
      {
        status: match.statusCode,
        headers: match.headers,
      }
    );
  },
});
```

```tsx
async function matchRSCServerRequest({
  allowedActionOrigins,
  createTemporaryReferenceSet,
  basename,
  decodeReply,
  requestContext,
  routeDiscovery,
  loadServerAction,
  decodeAction,
  decodeFormState,
  clientVersion,
  onError,
  request,
  routes,
  generateResponse,
}: {
  allowedActionOrigins?: string[];
  createTemporaryReferenceSet: () => unknown;
  basename?: string;
  decodeReply?: DecodeReplyFunction;
  decodeAction?: DecodeActionFunction;
  decodeFormState?: DecodeFormStateFunction;
  requestContext?: RouterContextProvider;
  loadServerAction?: LoadServerActionFunction;
  clientVersion?: string;
  onError?: (error: unknown) => void;
  request: Request;
  routes: RSCRouteConfigEntry[];
  routeDiscovery?: RouteDiscovery;
  generateResponse: (
    match: RSCMatch,
    {
      onError,
      temporaryReferences,
    }: {
      onError(error: unknown): string | undefined;
      temporaryReferences: unknown;
    },
  ) => Response;
}): Promise<Response>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| opts.allowedActionOrigins | `string[]` | Origin patterns that are allowed to execute actions. |
| opts.basename | `string` | The basename to use when matching the request. |
| opts.createTemporaryReferenceSet | `() => unknown` | Returns a temporary reference set for the request, used to track temporary references in the RSC stream. |
| opts.decodeAction | `DecodeActionFunction` | Your `react-server-dom-xyz/server` `decodeAction`, responsible for loading a server action. |
| opts.decodeFormState | `DecodeFormStateFunction` | Decodes form state for progressively enhanceable forms with React's `useActionState`, using your `react-server-dom-xyz/server` `decodeFormState`. |
| opts.decodeReply | `DecodeReplyFunction` | Your `react-server-dom-xyz/server` `decodeReply`, used to decode the server function's arguments and bind them to the implementation for invocation by the router. |
| opts.generateResponse | `(match, { onError, temporaryReferences }) => Response` | Uses your `renderToReadableStream` to generate a `Response` encoding the `unstable_RSCPayload`. |
| opts.loadServerAction | `LoadServerActionFunction` | Your `react-server-dom-xyz/server` `loadServerAction`, used to load a server action by ID. |
| opts.clientVersion | `string` | A version derived from the client build output, used to detect stale clients during lazy route discovery. |
| opts.onError | `(error: unknown) => void` | Called with any errors that occur during request processing. |
| opts.request | `Request` | The request to match against. |
| opts.requestContext | `RouterContextProvider` | Instance created per request, passed to actions, loaders and middleware. |
| opts.routeDiscovery | `RouteDiscovery` | Route discovery configuration, determining how the router discovers new routes during navigations. |
| opts.routes | `RSCRouteConfigEntry[]` | Your route definitions. |

Returns a `Response` that contains the RSC data for hydration.

## Notes

- Data Mode only. Experimental (`unstable_`): subject to breaking changes in minor/patch releases; watch release notes closely.
- Treat every React Server Function as a public endpoint. Server Functions are not inherently associated with a route. Any route middleware that runs is selected from the URL used to call a Server Function, but the client controls both the Server Function identifier and the URL. Perform all access control checks within each Server Function, or use a route action for middleware-driven access control.
- Docs example for `decodeFormState` omits its import; it comes from your `react-server-dom-xyz/server`.
- Source: https://reactrouter.com/api/rsc/matchRSCServerRequest (docs/api/rsc/matchRSCServerRequest.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/rsc/matchRSCServerRequest.md)

## Related

- [unstable_routeRSCServerRequest](./routeRSCServerRequest.md)
- [unstable_RSCStaticRouter](./RSCStaticRouter.md)
