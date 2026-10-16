---
source: https://react.dev/reference/react/apis
---

# Built-in React APIs

In addition to Hooks and Components, the `react` package exports a few other APIs that are useful for defining components. This page lists all the remaining modern React APIs.

## Signature / Usage

```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  use(browser());
  // ...
}
```

## Notes

APIs:

| API | Description |
| --- | --- |
| `createContext` | Lets you define and provide context to the child components. Used with `useContext`. |
| `lazy` | Lets you defer loading a component's code until it's rendered for the first time. |
| `memo` | Lets your component skip re-renders with same props. Used with `useMemo` and `useCallback`. |
| `startTransition` | Lets you mark a state update as non-urgent. Similar to `useTransition`. |
| `addTransitionType` | Lets you specify the cause of a Transition. Used with `startTransition` and `<ViewTransition>`. |
| `act` | Lets you wrap renders and interactions in tests to ensure updates have processed before making assertions. |
| `cache` | Lets you cache the result of a data fetch or computation. |
| `cacheSignal` | Lets you know when the `cache()` lifetime is over. |
| `captureOwnerStack` | Reads the current Owner Stack in development and returns it as a string if available. |

Resource APIs:

Resources can be accessed by a component without having them as part of their state. For example, a component can read a message from a Promise or read styling information from a context.

You can pass these types of resources to `use`:

- A Promise to read its resolved value.
- A context to read its value.
- The value returned by `browser` (from `react-dom`) to mark a component as browser-only during server rendering.

## Related

- [createContext](./createContext.md)
- [lazy](./lazy.md)
- [memo](./memo.md)
- [startTransition](./startTransition.md)
- [addTransitionType](./addTransitionType.md)
- [act](./act.md)
- [cache](./cache.md)
- [cacheSignal](./cacheSignal.md)
- [captureOwnerStack](./captureOwnerStack.md)
- [use](./use.md)
