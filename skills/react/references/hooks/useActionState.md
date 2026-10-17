---
source: https://react.dev/reference/react/useActionState
---

# useActionState

`useActionState` is a React Hook that lets you update state with side effects using Actions.

## Signature / Usage

```js
import { useActionState } from 'react';

function reducerAction(previousState, actionPayload) {
  // ...
}

function MyCart({initialState}) {
  const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState);
  // ...
}
```

Returns an array with exactly three values: the current state (initially `initialState`, then the value returned by `reducerAction`), a `dispatchAction` function that you call inside Actions, and the `isPending` flag that tells you if any dispatched Actions for this Hook are pending.

## Options / Props

`useActionState(reducerAction, initialState, permalink?)`

| Name | Type | Description |
|------|------|-------------|
| reducerAction | function | The function to be called when the Action is triggered. It receives the previous state as its first argument, followed by the `actionPayload` passed to `dispatchAction`. |
| initialState | any | The value you want the state to be initially. React ignores this argument after `dispatchAction` is invoked for the first time. |
| permalink (optional) | string | A string containing the unique page URL that this form modifies. For use on pages with React Server Components with progressive enhancement. |

`reducerAction(previousState, actionPayload?)`: unlike reducers in `useReducer`, the `reducerAction` can be async and perform side effects. It returns the new state, and triggers a Transition to re-render with that state.

```js
async function reducerAction(previousState, actionPayload) {
  const newState = await post(actionPayload);
  return newState;
}
```

## Notes

- Call it only at the top level of your component or your own Hooks. You can't call it inside loops or conditions.
- React queues and executes multiple calls to `dispatchAction` sequentially. Each call to `reducerAction` receives the result of the previous call.
- The `dispatchAction` function has a stable identity, so you will often see it omitted from Effect dependencies, but including it will not cause the Effect to fire.
- `dispatchAction` must be called from an Action. You can wrap it in `startTransition`, or pass it to an Action prop. Calls outside that scope won't be treated as part of the Transition and log an error on development mode.
- If `permalink` is used and `reducerAction` is a Server Function, and the form is submitted before the JavaScript bundle loads, the browser will navigate to the specified permalink URL rather than the current page's URL. Ensure the same form component is rendered on the destination page (including the same `reducerAction` and `permalink`). Once the page becomes interactive, this parameter has no effect.
- When using Server Functions, `initialState` and `actionPayload` need to be serializable (values like plain objects, arrays, strings, and numbers).
- If `dispatchAction` throws an error, React cancels all queued actions and shows the nearest Error Boundary. When a `reducerAction` throws, React skips all subsequently queued `dispatchAction` calls; catch errors within your `reducerAction` and return an error state instead of throwing.
- If there are multiple ongoing Actions, React batches them together. This is a limitation that may be removed in a future release.
- `reducerAction` is not invoked twice in `<StrictMode>` since `reducerAction` is designed to allow side effects.
- The return type of `reducerAction` must match the type of `initialState`.
- If you set state after `await` in the `reducerAction` you currently need to wrap the state update in an additional `startTransition`.
- `useActionState` doesn't provide a built-in reset function. Design your `reducerAction` to handle a reset signal, add a `key` prop to remount, or use a `<form>` `action` prop, which resets automatically after submission.
- When `dispatchAction` is passed as the `action` prop of a `<form>`, React automatically wraps the submission in a Transition and the `reducerAction` receives the previous state and the submitted `FormData` as its second argument.
- `useActionState` is for managing state of your Actions (the reducer can perform side effects); use `useReducer` to manage state of your UI (the reducer must be pure). It can be combined with `useOptimistic` for immediate feedback.
- Distinct from react-hook-form, react-router and nextjs-app: this is the React built-in Hook behind `<form action>`, not their `<Form>` components or `useForm`.

## Related

- [useOptimistic](./useOptimistic.md)
- [useTransition](./useTransition.md)
- [useReducer](./useReducer.md)
- [startTransition](../apis/startTransition.md)
- [form](../dom-components/form.md)
