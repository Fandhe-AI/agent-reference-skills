---
source: https://react.dev/reference/react/useDeferredValue
---

# useDeferredValue

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI.

## Signature / Usage

```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

`useDeferredValue(value, initialValue?)`. During the initial render, the returned deferred value will be the `initialValue`, or the same as the value you provided. During updates, React will first attempt a re-render with the old value, and then try another re-render in the background with the new value.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| value | any | The value you want to defer. |
| initialValue (optional) | any | A value to use during the initial render of a component. If omitted, `useDeferredValue` will not defer during the initial render, because there's no previous version of `value` that it can render instead. |

## Notes

- Call it only at the top level of your component or your own Hooks.
- When an update is inside a Transition, `useDeferredValue` always returns the new `value` and does not spawn a deferred render.
- Values should either be primitive values or objects created outside of rendering. A new object created during rendering will be different on every render, causing unnecessary background re-renders.
- When it receives a different value (compared with `Object.is`), it schedules an interruptible re-render in the background; if there's another update to the `value`, React restarts the background re-render from scratch.
- It is integrated with `<Suspense>`: if the background update suspends the UI, the user will see the old deferred value until the data loads rather than the fallback.
- It does not by itself prevent extra network requests.
- There is no fixed delay caused by `useDeferredValue` itself. Updates caused by events (like typing) interrupt the background re-render and get prioritized.
- The background re-render does not fire Effects until it's committed to the screen.

## Related

- [useTransition](./useTransition.md)
- [Suspense](../components/Suspense.md)
- [use](../apis/use.md)
