---
source: https://react.dev/reference/react-dom/server/resumeToPipeableStream
---

# resumeToPipeableStream

`resumeToPipeableStream` streams a pre-rendered React tree to a pipeable Node.js Stream. This API is specific to Node.js; environments with Web Streams, like Deno and modern edge runtimes, should use `resume` instead.

## Signature / Usage

```js
import { resumeToPipeableStream } from 'react-dom/server';
import {getPostponedState} from './storage';

async function handler(request, response) {
  const postponed = await getPostponedState(request);
  const {pipe} = resumeToPipeableStream(<App />, postponed, {
    onShellReady: () => {
      pipe(response);
    }
  });
}
```

Signature: `const {pipe, abort} = await resumeToPipeableStream(reactNode, postponedState, options?)`.

Returns an object with two methods:

- `pipe` outputs the HTML into the provided Writable Node.js Stream. Call `pipe` in `onShellReady` if you want to enable streaming, or in `onAllReady` for crawlers and static generation.
- `abort` lets you abort server rendering and render the rest on the client.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| reactNode | React node | The React node you called `prerender` with. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag. |
| postponedState | object | The opaque `postpone` object returned from a prerender API, loaded from wherever you stored it (e.g. redis, a file, or S3). |
| options.nonce | string | (optional) A `nonce` string to allow scripts for `script-src` Content-Security-Policy. |
| options.onAllReady | function | (optional) Fires when all rendering is complete, including both the shell and all additional content. You can call `pipe` here instead of in `onShellReady` for crawlers and static generation. The stream will contain the final HTML. |
| options.onBrowserBailout | function | (optional) Called when React recovers from `browser()` by leaving a Suspense fallback for the browser to replace. Receives an `Error` describing the browser-only render and an `errorInfo` object containing the `componentStack`. If a reason was passed to `browser`, it is available as `error.cause`. By default, React does nothing. |
| options.onError | function | (optional) Fires whenever there is a server error, whether recoverable or not. By default, this only calls `console.error`. If you override it to log crash reports, make sure that you still call `console.error`. |
| options.onShellReady | function | (optional) Fires right after the shell has finished. You can call `pipe` here to start streaming. React will stream the additional content after the shell along with the inline `<script>` tags that replace the HTML loading fallbacks with the content. |
| options.onShellError | function | (optional) Fires if there was an error rendering the shell. It receives the error as an argument. No bytes were emitted from the stream yet, and neither `onShellReady` nor `onAllReady` will get called, so you can output a fallback HTML shell or use the prelude. |

## Notes

- `resumeToPipeableStream` does not accept options for `bootstrapScripts`, `bootstrapScriptContent`, or `bootstrapModules`. Instead, you need to pass these options to the `prerender` call that generates the `postponedState`. You can also inject bootstrap content into the writable stream manually.
- `resumeToPipeableStream` does not accept `identifierPrefix` since the prefix needs to be the same in both `prerender` and `resumeToPipeableStream`.
- Since `nonce` cannot be provided to prerender, you should only provide `nonce` to `resumeToPipeableStream` if you're not providing scripts to prerender.
- `resumeToPipeableStream` re-renders from the root until it finds a component that was not fully pre-rendered. Only fully prerendered Components (the Component and its children finished prerendering) are skipped entirely.
- Resuming behaves like `renderToReadableStream`; see its Usage section for more examples. The Usage section of `prerender` includes examples of how to use `prerenderToNodeStream` specifically.

## Related

- [prerenderToNodeStream](./prerenderToNodeStream.md)
- [renderToPipeableStream](./renderToPipeableStream.md)
- [resume](./resume.md)
- [resumeAndPrerenderToNodeStream](./resumeAndPrerenderToNodeStream.md)
