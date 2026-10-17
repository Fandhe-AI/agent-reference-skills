---
source: https://react.dev/reference/react/useSyncExternalStore
---

# useSyncExternalStore

`useSyncExternalStore` is a React Hook that lets you subscribe to an external store.

## Signature / Usage

```js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // ...
}
```

`const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` returns the current snapshot of the store which you can use in your rendering logic.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| subscribe | function | Takes a single `callback` argument and subscribes it to the store. When the store changes, it should invoke the provided `callback`. It should return a function that cleans up the subscription. |
| getSnapshot | function | Returns a snapshot of the data in the store that's needed by the component. While the store has not changed, repeated calls must return the same value. If the returned value is different (`Object.is`), React re-renders the component. |
| getServerSnapshot (optional) | function | Returns the initial snapshot of the data in the store. Used only during server rendering and during hydration of server-rendered content on the client. It must be the same between the client and the server. If omitted, rendering the component on the server will throw an error. |

## Notes

- The store snapshot returned by `getSnapshot` must be immutable. If the underlying store has mutable data, return a new immutable snapshot if the data has changed. Otherwise, return a cached last snapshot.
- If a different `subscribe` function is passed during a re-render, React will re-subscribe to the store using the newly passed `subscribe` function. You can prevent this by declaring `subscribe` outside the component.
- If the store is mutated during a non-blocking Transition update, React will fall back to performing that update as blocking.
- It's not recommended to suspend a render based on a store value returned by `useSyncExternalStore`, because mutations to the external store cannot be marked as non-blocking Transition updates and will trigger the nearest `Suspense` fallback.
- Typical uses: third-party state management libraries that hold state outside of React, and browser APIs that expose a mutable value and events to subscribe to its changes.

## Related

- [useTransition](./useTransition.md)
- [useDebugValue](./useDebugValue.md)
- [Suspense](../components/Suspense.md)
