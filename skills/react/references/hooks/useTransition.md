---
source: https://react.dev/reference/react/useTransition
---

# useTransition

`useTransition` is a React Hook that lets you render a part of the UI in the background.

## Signature / Usage

```js
import { useState, useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

`const [isPending, startTransition] = useTransition()` takes no parameters and returns an array with exactly two items: the `isPending` flag that tells you whether there is a pending Transition, and the `startTransition` function that lets you mark updates as a Transition. `startTransition` does not return anything.

The function passed to `startTransition` is called an "Action". By convention, any callback called inside `startTransition` (such as a callback prop) should be named `action` or include the "Action" suffix:

```js
function SubmitButton({ submitAction }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await submitAction();
        });
      }}
    >
      Submit
    </button>
  );
}
```

## Options / Props

`startTransition(action)`

| Name | Type | Description |
|------|------|-------------|
| action | function | A function that updates some state by calling one or more `set` functions. React calls `action` immediately with no parameters and marks all state updates scheduled synchronously during the call as Transitions. Awaited async calls are included, but currently require wrapping any `set` functions after the `await` in an additional `startTransition`. |

## Notes

- `useTransition` can only be called inside components or custom Hooks. To start a Transition somewhere else (for example, from a data library), call the standalone `startTransition` instead.
- You can wrap an update into a Transition only if you have access to the `set` function of that state. To start a Transition in response to some prop or a custom Hook value, try `useDeferredValue` instead.
- The function you pass to `startTransition` is called immediately; state updates in a `setTimeout` won't be marked as Transitions.
- You must wrap any state updates after any async requests in another `startTransition` to mark them as Transitions. This is a known limitation that will be fixed in the future.
- The `startTransition` function has a stable identity, so including it in Effect dependencies will not cause the Effect to fire.
- A state update marked as a Transition will be interrupted by other state updates.
- Transition updates can't be used to control text inputs.
- If there are multiple ongoing Transitions, React currently batches them together. This is a limitation that may be removed in a future release.

## Related

- [startTransition](../apis/startTransition.md)
- [useDeferredValue](./useDeferredValue.md)
- [useActionState](./useActionState.md)
- [useOptimistic](./useOptimistic.md)
