---
source: https://react.dev/reference/react/useReducer
---

# useReducer

`useReducer` is a React Hook that lets you add a reducer to your component.

## Signature / Usage

```js
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

`const [state, dispatch] = useReducer(reducer, initialArg, init?)` returns an array with exactly two values: the current state (during the first render, `init(initialArg)` or `initialArg`) and the `dispatch` function.

```js
function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| reducer | function | Specifies how the state gets updated. Must be pure, takes the state and action as arguments, and returns the next state. |
| initialArg | any | The value from which the initial state is calculated. |
| init (optional) | function | The initializer function that should return the initial state. If not specified, the initial state is `initialArg`; otherwise it is `init(initialArg)`. |

`dispatch(action)`: `action` can be a value of any type; by convention, an action is usually an object with a `type` property identifying it. `dispatch` has no return value.

## Notes

- Call it only at the top level of your component or your own Hooks.
- The `dispatch` function has a stable identity, so you will often see it omitted from Effect dependencies, but including it will not cause the Effect to fire.
- In Strict Mode, React will call your reducer and initializer twice in order to help you find accidental impurities. This is development-only behavior.
- The `dispatch` function only updates the state variable for the next render. If you read the state variable after calling `dispatch`, you will still get the old value.
- If the new value is identical to the current `state` (`Object.is`), React will skip re-rendering the component and its children.
- React batches state updates. It updates the screen after all the event handlers have run. To force an earlier update (for example to access the DOM), use `flushSync`.
- Migration (18 → 19, TypeScript types): `useReducer` no longer accepts the full reducer type as a type parameter. The new best practice is not to pass type arguments: `useReducer(reducer)` instead of `useReducer<React.Reducer<State, Action>>(reducer)`; if you define the reducer inline, annotate the function parameters: `useReducer((state: State, action: Action) => state)`.

## Related

- [useState](./useState.md)
- [useActionState](./useActionState.md)
- [flushSync](../dom-apis/flushSync.md)
