---
source: https://react.dev/reference/react/hooks
---

# Built-in React Hooks

*Hooks* let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. This page lists all built-in Hooks in React.

## Signature / Usage

```js
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
```

## Notes

Hook groups:

| Group | Hooks | Purpose |
|-------|-------|---------|
| State Hooks | `useState`, `useReducer` | *State* lets a component "remember" information like user input. |
| Context Hooks | `useContext` | *Context* lets a component receive information from distant parents without passing it as props. |
| Ref Hooks | `useRef`, `useImperativeHandle` | *Refs* let a component hold some information that isn't used for rendering, like a DOM node or a timeout ID. |
| Effect Hooks | `useEffect`, `useLayoutEffect`, `useInsertionEffect`, `useEffectEvent` | *Effects* let a component connect to and synchronize with external systems. |
| Performance Hooks | `useMemo`, `useCallback`, `useTransition`, `useDeferredValue` | Skip unnecessary work, or prioritize rendering. |
| Other Hooks | `useDebugValue`, `useId`, `useSyncExternalStore`, `useActionState` | Mostly useful to library authors and not commonly used in application code. |

- [`useState`](./useState.md) declares a state variable that you can update directly.
- [`useReducer`](./useReducer.md) declares a state variable with the update logic inside a reducer function.
- [`useContext`](./useContext.md) reads and subscribes to a context.
- [`useRef`](./useRef.md) declares a ref. You can hold any value in it, but most often it's used to hold a DOM node.
- [`useImperativeHandle`](./useImperativeHandle.md) lets you customize the ref exposed by your component. This is rarely used.
- [`useEffect`](./useEffect.md) connects a component to an external system.
- [`useLayoutEffect`](./useLayoutEffect.md) fires before the browser repaints the screen. You can measure layout here.
- [`useInsertionEffect`](./useInsertionEffect.md) fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.
- [`useEffectEvent`](./useEffectEvent.md) creates a non-reactive event to fire from any Effect hook.
- [`useMemo`](./useMemo.md) lets you cache the result of an expensive calculation.
- [`useCallback`](./useCallback.md) lets you cache a function definition before passing it down to an optimized component.
- [`useTransition`](./useTransition.md) lets you mark a state transition as non-blocking and allow other updates to interrupt it.
- [`useDeferredValue`](./useDeferredValue.md) lets you defer updating a non-critical part of the UI and let other parts update first.
- [`useDebugValue`](./useDebugValue.md) lets you customize the label React DevTools displays for your custom Hook.
- [`useId`](./useId.md) lets a component associate a unique ID with itself. Typically used with accessibility APIs.
- [`useSyncExternalStore`](./useSyncExternalStore.md) lets a component subscribe to an external store.
- [`useActionState`](./useActionState.md) allows you to manage state of actions.

General behavior:

- Effects are an "escape hatch" from the React paradigm. Don't use Effects to orchestrate the data flow of your application. If you're not interacting with an external system, you might not need an Effect.
- You can also define your own custom Hooks as JavaScript functions.
- `useOptimistic` ([useOptimistic.md](./useOptimistic.md)) is not listed on the official hooks overview page but has its own reference page in `reference/react`.

## Related

- [useOptimistic](./useOptimistic.md)
