# RSC

| Name | Description | Path |
| --- | --- | --- |
| unstable_RSCHydratedRouter | Hydrates a server rendered `unstable_RSCPayload` in the browser. | [RSCHydratedRouter.md](./RSCHydratedRouter.md) |
| unstable_RSCStaticRouter | Pre-renders an `unstable_RSCPayload` to HTML. Usually used in `unstable_routeRSCServerRequest`'s `renderHTML` callback. | [RSCStaticRouter.md](./RSCStaticRouter.md) |
| unstable_createCallServer | Creates a React `callServer` implementation for React Router. | [createCallServer.md](./createCallServer.md) |
| unstable_getRSCStream | Gets the prerendered RSC stream for hydration. Usually passed directly to your `react-server-dom-xyz/client`'s `createFromReadableStream`. | [getRSCStream.md](./getRSCStream.md) |
| unstable_matchRSCServerRequest | Matches the given routes to a `Request` and returns an RSC `Response` encoding an `unstable_RSCPayload` for consumption by an RSC-enabled client router. | [matchRSCServerRequest.md](./matchRSCServerRequest.md) |
| unstable_routeRSCServerRequest | Routes the incoming `Request` to the RSC server and proxies the server response for data / resource requests, or renders to HTML for a document request. | [routeRSCServerRequest.md](./routeRSCServerRequest.md) |
