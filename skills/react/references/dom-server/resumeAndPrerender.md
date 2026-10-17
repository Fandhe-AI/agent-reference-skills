---
source: https://react.dev/reference/react-dom/static/resumeAndPrerender
---

# resumeAndPrerender

`resumeAndPrerender` continues a prerendered React tree to a static HTML string using a Web Stream. It depends on Web Streams; for Node.js, use `resumeAndPrerenderToNodeStream` instead.

## Signature / Usage

```js
import { resumeAndPrerender } from 'react-dom/static';
import { getPostponedState } from 'storage';

async function handler(request, response) {
  const postponedState = getPostponedState(request);
  const { prelude } = await resumeAndPrerender(<App />, postponedState);
  return new Response(prelude, {
    headers: { 'content-type': 'text/html' },
  });
}
```

Signature: `const {prelude, postponed} = await resumeAndPrerender(reactNode, postponedState, options?)`.

Returns a Promise:

- If rendering is successful, the Promise resolves to an object containing:
  - `prelude`: a Web Stream of HTML. You can use this stream to send a response in chunks, or you can read the entire stream into a string.
  - `postponed`: a JSON-serializeable, opaque object that can be passed to `resume` or `resumeAndPrerender` if `prerender` is aborted.
- If rendering fails, the Promise is rejected.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| reactNode | React node | The React node you called `prerender` (or a previous `resumeAndPrerender`) with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag. |
| postponedState | object | The opaque `postpone` object returned from a prerender API, loaded from wherever you stored it (e.g. redis, a file, or S3). |
| options.signal | AbortSignal | (optional) An abort signal that lets you abort server rendering and render the rest on the client. |
| options.onBrowserBailout | function | (optional) Called when React recovers from `browser()` by leaving a Suspense fallback for the browser to replace. Receives an `Error` describing the browser-only render and an `errorInfo` object containing the `componentStack`. If a reason was passed to `browser`, it is available as `error.cause`. By default, React does nothing. |
| options.onError | function | (optional) Fires whenever there is a server error, whether recoverable or not. By default, this only calls `console.error`. If you override it to log crash reports, make sure that you still call `console.error`. |

## Notes

- Snippet corrected from the original: the original example passes `bootstrapScripts`, which is not a `resumeAndPrerender` option; pass bootstrap options to the `prerender` call that produced `postponedState` (as stated on the `resume` page).
- `nonce` is not an available option when prerendering. Nonces must be unique per request and if you use nonces to secure your application with CSP it would be inappropriate and insecure to include the nonce value in the prerender itself.
- The static `resumeAndPrerender` API is used for static server-side generation (SSG). Unlike `renderToString`, it waits for all data to load before resolving. To stream content as it loads, use a streaming SSR API like `renderToReadableStream`.
- `resumeAndPrerender` can be aborted and later either continued with another `resumeAndPrerender` or resumed with `resume` to support partial pre-rendering.
- `resumeAndPrerender` behaves similarly to `prerender` but can be used to continue a previously started prerendering process that was aborted. See the `resume` page for resuming a prerendered tree.

## Related

- [prerender](./prerender.md)
- [resume](./resume.md)
- [resumeAndPrerenderToNodeStream](./resumeAndPrerenderToNodeStream.md)
- [renderToReadableStream](./renderToReadableStream.md)
- [hydrateRoot](../dom-apis/hydrateRoot.md)
