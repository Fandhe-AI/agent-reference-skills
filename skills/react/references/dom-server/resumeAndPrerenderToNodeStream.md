---
source: https://react.dev/reference/react-dom/static/resumeAndPrerenderToNodeStream
---

# resumeAndPrerenderToNodeStream

`resumeAndPrerenderToNodeStream` continues a prerendered React tree to a static HTML string using a Node.js Stream. This API is specific to Node.js; environments with Web Streams, like Deno and modern edge runtimes, should use `prerender` instead.

## Signature / Usage

```js
import { resumeAndPrerenderToNodeStream } from 'react-dom/static';
import { getPostponedState } from 'storage';

async function handler(request, writable) {
  const postponedState = getPostponedState(request);
  const { prelude } = await resumeAndPrerenderToNodeStream(<App />, JSON.parse(postponedState));
  prelude.pipe(writable);
}
```

Signature: `const {prelude, postponed} = await resumeAndPrerenderToNodeStream(reactNode, postponedState, options?)`.

Returns a Promise:

- If rendering is successful, the Promise resolves to an object containing:
  - `prelude`: a stream of HTML. You can use this stream to send a response in chunks, or you can read the entire stream into a string. (The source page describes it as a Web Stream, although this is the Node.js variant.)
  - `postponed`: a JSON-serializeable, opaque object that can be passed to `resumeToNodeStream` or `resumeAndPrerenderToNodeStream` if `resumeAndPrerenderToNodeStream` is aborted.
- If rendering fails, the Promise is rejected.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| reactNode | React node | The React node you called `prerender` (or a previous `resumeAndPrerenderToNodeStream`) with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag. |
| postponedState | object | The opaque `postpone` object returned from a prerender API, loaded from wherever you stored it (e.g. redis, a file, or S3). |
| options.signal | AbortSignal | (optional) An abort signal that lets you abort server rendering and render the rest on the client. |
| options.onBrowserBailout | function | (optional) Called when React recovers from `browser()` by leaving a Suspense fallback for the browser to replace. Receives an `Error` describing the browser-only render and an `errorInfo` object containing the `componentStack`. If a reason was passed to `browser`, it is available as `error.cause`. By default, React does nothing. |
| options.onError | function | (optional) Fires whenever there is a server error, whether recoverable or not. By default, this only calls `console.error`. If you override it to log crash reports, make sure that you still call `console.error`. |

## Notes

- `nonce` is not an available option when prerendering. Nonces must be unique per request and if you use nonces to secure your application with CSP it would be inappropriate and insecure to include the nonce value in the prerender itself.
- The static `resumeAndPrerenderToNodeStream` API is used for static server-side generation (SSG). Unlike `renderToString`, it waits for all data to load before resolving. To stream content as it loads, use a streaming SSR API like `renderToReadableStream`.
- It can be aborted and later either continued with another `resumeAndPrerenderToNodeStream` or resumed with `resume` to support partial pre-rendering.
- The source page refers to `resumeToNodeStream`; the Node.js resume API documented in this skill is `resumeToPipeableStream`.
- It behaves similarly to `prerender` but can be used to continue a previously started prerendering process that was aborted. See the `resume` page for resuming a prerendered tree.

## Related

- [prerenderToNodeStream](./prerenderToNodeStream.md)
- [resumeToPipeableStream](./resumeToPipeableStream.md)
- [resumeAndPrerender](./resumeAndPrerender.md)
- [hydrateRoot](../dom-apis/hydrateRoot.md)
