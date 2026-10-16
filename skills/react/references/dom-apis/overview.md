---
source: https://react.dev/reference/react-dom
---

# React DOM APIs

The `react-dom` package contains methods that are only supported for the web applications (which run in the browser DOM environment). They are not supported for React Native.

## Signature / Usage

```js
import { createPortal, flushSync } from 'react-dom';
import { preload } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { renderToPipeableStream } from 'react-dom/server';
```

APIs (rarely used):

- `createPortal` lets you render child components in a different part of the DOM tree.
- `flushSync` lets you force React to flush a state update and update the DOM synchronously.

Resource Preloading APIs (React-based frameworks frequently handle resource loading for you; consult your framework's documentation):

- `prefetchDNS` prefetches the IP address of a DNS domain name that you expect to connect to.
- `preconnect` connects to a server you expect to request resources from, even if you don't know what resources you'll need yet.
- `preload` fetches a stylesheet, font, image, or external script that you expect to use.
- `preloadModule` fetches an ESM module that you expect to use.
- `preinit` fetches and evaluates an external script or fetches and inserts a stylesheet.
- `preinitModule` fetches and evaluates an ESM module.

Server Rendering API:

- `browser` lets you mark a component as browser-only during server rendering.

Entry points:

- `react-dom/client` contains APIs to render React components on the client (in the browser).
- `react-dom/server` contains APIs to render React components on the server.

## Notes

- Removed in React 19: `findDOMNode`, `hydrate` (use `hydrateRoot`), `render` (use `createRoot`), `unmountComponentAtNode` (use `root.unmount()`), `renderToNodeStream` and `renderToStaticNodeStream` (use `react-dom/server` APIs instead).
- Migration (18 -> 19): `ReactDOM.render` -> `createRoot(...).render`, `ReactDOM.hydrate` -> `hydrateRoot`, `unmountComponentAtNode` -> `root.unmount()`. See the createRoot and hydrateRoot pages.

## Related

- [createPortal](./createPortal.md)
- [flushSync](./flushSync.md)
- [browser](./browser.md)
- [preload](./preload.md)
- [Client React DOM APIs](./client-overview.md)
- [Built-in React DOM Hooks](./hooks-overview.md)
