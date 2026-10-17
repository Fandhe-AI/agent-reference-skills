---
source: https://react.dev/reference/react/startTransition
---

# startTransition

`startTransition` lets you render a part of the UI in the background.

## Signature / Usage

```js
startTransition(action)
```

```js
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

Returns: `startTransition` does not return anything.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `action` | function | Updates some state by calling one or more `set` functions. React calls `action` immediately with no parameters and marks all state updates scheduled synchronously during the call as Transitions. Any async calls awaited in the `action` will be included in the transition, but currently require wrapping any `set` functions after the `await` in an additional `startTransition`. |

## Notes

- `startTransition` does not provide a way to track whether a Transition is pending; use `useTransition` for that.
- You can wrap an update into a Transition only if you have access to the `set` function of that state. For a prop or custom Hook return value, try `useDeferredValue`.
- The function is called immediately; state updates in e.g. a `setTimeout` won't be marked as Transitions.
- You must wrap any state updates after any async requests in another `startTransition`. This is a known limitation that will be fixed in the future.
- A Transition update will be interrupted by other state updates. Transition updates can't be used to control text inputs.
- If there are multiple ongoing Transitions, React currently batches them together. This is a limitation that may be removed in a future release.
- Unlike `useTransition`, the standalone function is not associated with a component: if the function passed throws or returns a rejected Promise, React reports the error with `reportError`. It works outside components, such as from a data library.

## Related

- useTransition
- [addTransitionType](./addTransitionType.md)
- useDeferredValue
