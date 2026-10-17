---
source: https://react.dev/reference/react-dom/server/resume
---

# resume

`resume` streams a pre-rendered React tree to a Readable Web Stream. It depends on Web Streams; for Node.js, use `resumeToPipeableStream` instead.

## Signature / Usage

```js
import { resume } from 'react-dom/server';
import {getPostponedState} from './storage';

async function handler(request, writable) {
  const postponed = await getPostponedState(request);
  const resumeStream = await resume(<App />, postponed);
  return resumeStream.pipeTo(writable)
}
```

Signature: `const stream = await resume(reactNode, postponedState, options?)`.

Returns a Promise:

- If `resume` successfully produced a shell, the Promise resolves to a Readable Web Stream that can be piped to a Writable Web Stream.
- If an error happens in the shell, the Promise rejects with that error.

The returned stream has an additional property `allReady`: a Promise that resolves when all rendering is complete. You can `await stream.allReady` before returning a response for crawlers and static generation. If you do that, you won't get any progressive loading. The stream will contain the final HTML.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| reactNode | React node | The React node you called `prerender` with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag. |
| postponedState | object | The opaque `postpone` object returned from a prerender API, loaded from wherever you stored it (e.g. redis, a file, or S3). |
| options.nonce | string | (optional) A `nonce` string to allow scripts for `script-src` Content-Security-Policy. |
| options.signal | AbortSignal | (optional) An abort signal that lets you abort server rendering and render the rest on the client. |
| options.onBrowserBailout | function | (optional) Called when React recovers from `browser()` by leaving a Suspense fallback for the browser to replace. Receives an `Error` describing the browser-only render and an `errorInfo` object containing the `componentStack`. If a reason was passed to `browser`, it is available as `error.cause`. By default, React does nothing. |
| options.onError | function | (optional) Fires whenever there is a server error, whether recoverable or not. By default, this only calls `console.error`. If you override it to log crash reports, make sure that you still call `console.error`. |

## Notes

- `resume` does not accept options for `bootstrapScripts`, `bootstrapScriptContent`, or `bootstrapModules`. Instead, you need to pass these options to the `prerender` call that generates the `postponedState`. You can also inject bootstrap content into the writable stream manually.
- `resume` does not accept `identifierPrefix` since the prefix needs to be the same in both `prerender` and `resume`.
- Since `nonce` cannot be provided to prerender, you should only provide `nonce` to `resume` if you're not providing scripts to prerender.
- `resume` re-renders from the root until it finds a component that was not fully pre-rendered. Only fully prerendered Components (the Component and its children finished prerendering) are skipped entirely.
- Resuming behaves like `renderToReadableStream`; see its Usage section for more examples. The Usage section of `prerender` shows how to use `prerender` specifically.
- The `onBrowserBailout` option relates to the `browser()` API; see its page for how to report browser-only rendering.

## Related

- [prerender](./prerender.md)
- [renderToReadableStream](./renderToReadableStream.md)
- [resumeToPipeableStream](./resumeToPipeableStream.md)
- [resumeAndPrerender](./resumeAndPrerender.md)
- [browser](../dom-apis/browser.md)
