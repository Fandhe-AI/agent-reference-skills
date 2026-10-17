---
source: https://react.dev/reference/react/useState
---

# useState

`useState` is a React Hook that lets you add a state variable to your component.

## Signature / Usage

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

`const [state, setState] = useState(initialState)` returns an array with exactly two values: the current state (during the first render, `initialState`) and the `set` function. The convention is to name state variables like `[something, setSomething]`.

```js
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| initialState | any or function | The value you want the state to be initially. Ignored after the initial render. If you pass a function, it is treated as an initializer function: pure, takes no arguments, and returns a value of any type. |

`set(nextState)`:

| Name | Type | Description |
|------|------|-------------|
| nextState | any or function | The value that you want the state to be. If you pass a function, it is treated as an updater function: it must be pure, takes the pending state as its only argument, and returns the next state. `set` functions do not have a return value. |

## Notes

- Call it only at the top level of your component or your own Hooks.
- In Strict Mode, React will call your initializer function twice (and updater functions twice) to help you find accidental impurities. This is development-only behavior.
- The `set` function only updates the state variable for the next render. If you read the state variable after calling `set`, you will still get the old value.
- If the new value is identical to the current `state` (`Object.is`), React will skip re-rendering the component and its children.
- React batches state updates. It updates the screen after all the event handlers have run and have called their `set` functions. To force an earlier update, use `flushSync`.
- The `set` function has a stable identity, so you will often see it omitted from Effect dependencies, but including it will not cause the Effect to fire.
- Calling the `set` function during rendering is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state.

## Related

- [useReducer](./useReducer.md)
- [useRef](./useRef.md)
- [flushSync](../dom-apis/flushSync.md)
