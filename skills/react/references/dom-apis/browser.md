---
source: https://react.dev/reference/react-dom/browser
---

# browser

`browser` lets you mark a component as browser-only during server rendering.

## Signature / Usage

```js
import { use } from 'react';
import { browser } from 'react-dom';

function BrowserOnly() {
  use(browser('This component requires browser APIs.'));
  return <BrowserContent />;
}
```

`use(browser(reason?))`. During server rendering, `use(browser())` stops rendering the component and leaves the closest `<Suspense>` boundary's fallback in its place. In the browser, `use(browser())` returns `undefined`, so the component renders normally.

Returns: an opaque value that you can pass to `use` in a component or use as the reason when aborting a server render. In the browser, passing this value to `use` returns `undefined`.

Reporting browser-only rendering with `onBrowserBailout`:

```js
import { Suspense, use, useState } from 'react';
import { browser } from 'react-dom';
import { renderToPipeableStream } from 'react-dom/server';

function SavedDraft() {
  use(browser(() => new Error('The saved draft is stored in localStorage.')));
  const [draft] = useState(() => localStorage.getItem('draft') ?? '');
  return <DraftEditor initialDraft={draft} />;
}

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    pipe(response);
  },
  onBrowserBailout(error, errorInfo) {
    logBrowserBailout(error, errorInfo);
  }
});
```

Aborting pending server rendering for the browser:

```js
import { browser } from 'react-dom';
import { renderToPipeableStream } from 'react-dom/server';

const { pipe, abort } = renderToPipeableStream(<App />, {
  onShellReady() {
    pipe(response);
    setTimeout(() => {
      abort(browser('The server render timed out.'));
    }, 10000);
  }
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `reason` (optional) | string or function | Explains why the content needs to render in the browser. The string or the function's return value becomes the `cause` of the `Error` passed to `onBrowserBailout`. React calls a reason function each time a server renderer encounters the value returned by `browser`, but does not call it in the browser. If creating the reason is expensive, pass a function such as `() => new Error(...)`. |

`onBrowserBailout(error, errorInfo)` arguments: an `Error` describing the browser-only render (a passed reason is available as `error.cause`), and an `errorInfo` object with a `componentStack` showing where browser-only rendering occurred.

## Notes

- Introduced in the React 19.3 release post ("React 19.3 adds new features like View Transitions, Fragment Refs, browser(), Trusted Types"). The source docs sandbox pins `19.3.0-canary-f1f7ed2a-20260904`, and `hydrateRoot` source contains the comment "Remove this subsection when browser is available in Stable"; whether it is in the stable `latest` build is not confirmed by the source.
- `use(browser())` must be inside a `<Suspense>` boundary during server rendering. Without one, the server render fails; React reports the failure through the renderer's usual error callbacks instead of `onBrowserBailout`.
- `use(browser())` must be called from a Client Component, not a Server Component. If your framework uses Server Components by default, add the `'use client'` directive to that file or move the call to a child Client Component.
- Calling `browser()` by itself has no effect. Pass the returned value to `use`. Do not throw it.
- You can use this instead of checking `typeof window`, waiting for an Effect to set mounted state, or using a framework option to disable server rendering.
- Like other calls to `use`, `use(browser())` can be called inside a conditional statement or after an early return.
- When React leaves a Suspense fallback for the browser, it does not call the server renderer's `onError` callback or `hydrateRoot`'s `onRecoverableError`. A `browser` abort reason likewise does not trigger `onError`; the server renderer reports each recovered Suspense boundary to `onBrowserBailout`.
- React does not serialize the reason into the HTML.
- For server rendering APIs that accept an `AbortSignal`, pass `browser()` as the reason to `AbortController.abort`.

## Related

- [use](../apis/use.md)
- [Suspense](../components/Suspense.md)
- [hydrateRoot](./hydrateRoot.md)
- [React DOM APIs](./overview.md)
