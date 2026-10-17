---
source: https://react.dev/reference/react-dom/flushSync
---

# flushSync

`flushSync` lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

## Signature / Usage

```js
import { flushSync } from 'react-dom';

flushSync(() => {
  setSomething(123);
});
// By this line, the DOM is updated.
```

`flushSync(callback)`. Returns `undefined`.

Integrating with the browser `beforeprint` event:

```js
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

export default function PrintApp() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    function handleBeforePrint() {
      flushSync(() => {
        setIsPrinting(true);
      })
    }

    function handleAfterPrint() {
      setIsPrinting(false);
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    }
  }, []);

  return (
    <>
      <h1>isPrinting: {isPrinting ? 'yes' : 'no'}</h1>
      <button onClick={() => window.print()}>
        Print
      </button>
    </>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `callback` | function | React will immediately call this callback and flush any updates it contains synchronously. It may also flush any pending updates, or Effects, or updates inside of Effects. If an update suspends as a result of this `flushSync` call, the fallbacks may be re-shown. |

## Notes

- Using `flushSync` is uncommon and can hurt the performance of your app. Most of the time, `flushSync` can be avoided. Use `flushSync` as last resort.
- `flushSync` may force pending Suspense boundaries to show their `fallback` state.
- `flushSync` may run pending Effects and synchronously apply any updates they contain before returning.
- `flushSync` may flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.
- React cannot `flushSync` in the middle of a render. It will noop and warn "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task." This includes rendering a component, `useLayoutEffect` or `useEffect` hooks, and class component lifecycle methods. Move the call to an event handler, or defer it in a microtask with `queueMicrotask(() => { flushSync(...) })` (even worse for performance; exhaust other options first).
- `root.render(...)` is not synchronous; in rare cases where effect timing matters you can wrap `root.render(...)` in `flushSync` to ensure the initial render runs fully synchronously (see createRoot).

## Related

- [createRoot](./createRoot.md)
- [React DOM APIs](./overview.md)
