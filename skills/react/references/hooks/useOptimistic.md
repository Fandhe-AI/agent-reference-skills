---
source: https://react.dev/reference/react/useOptimistic
---

# useOptimistic

`useOptimistic` is a React Hook that lets you optimistically update the UI.

## Signature / Usage

```js
import { useOptimistic } from 'react';

function MyComponent({name, todos}) {
  const [optimisticAge, setOptimisticAge] = useOptimistic(28);
  const [optimisticName, setOptimisticName] = useOptimistic(name);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, todoReducer);
  // ...
}
```

`const [optimisticState, setOptimistic] = useOptimistic(value, reducer?)` returns an array with exactly two values: `optimisticState` (equal to `value` unless an Action is pending, in which case it equals the state returned by `reducer`, or the value passed to the set function if no `reducer` was provided) and the `set` function.

The `set` function updates the state for the duration of an Action:

```js
const [optimisticLike, setOptimisticLike] = useOptimistic(false);
const [optimisticSubs, setOptimisticSubs] = useOptimistic(subs);

function handleClick() {
  startTransition(async () => {
    setOptimisticLike(true);
    setOptimisticSubs(a => a + 1);
    await saveChanges();
  });
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| value | any | The value returned when there are no pending Actions. |
| reducer(currentState, action) (optional) | function | The reducer function that specifies how the optimistic state gets updated. It must be pure, take the current state and reducer action arguments, and return the next optimistic state. |

`setOptimistic(optimisticState)`:

| Name | Type | Description |
|------|------|-------------|
| optimisticState | any or function | The value you want the optimistic state to be during an Action. If a `reducer` was provided, this value is passed as the second argument to the reducer. If no reducer was provided and you pass a function, it is treated as a pure updater function that takes the pending state and returns the next optimistic state. With a reducer, the function itself is passed to the reducer as its second argument. |

## Notes

- Clarified from the source: the updater-function behavior applies only when no reducer is provided.
- Call it only at the top level of your component or your own Hooks.
- The `set` function must be called inside an Action. If you call the setter outside an Action, React will show a warning and the optimistic state will briefly render.
- `set` functions do not have a return value.
- Optimistic state only renders while an Action is in progress, otherwise `value` is rendered. useOptimistic does not adopt the Action's return value: in the official example the Action calls `setValue(newValue)` with the result of `saveChanges('b')`, so if it returned `'c'`, both `value` and `optimistic` will be `'c'`, not `'b'`. Update the base state yourself.
- There's no extra render to "clear" the optimistic state. The optimistic and real state converge in the same render when the Transition completes.
- Distinct from tanstack-query: its optimistic updates (`useMutation`) are a separate mechanism from this React built-in Hook.

## Related

- [useActionState](./useActionState.md)
- [useTransition](./useTransition.md)
- [useState](./useState.md)
