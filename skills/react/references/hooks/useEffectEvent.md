---
source: https://react.dev/reference/react/useEffectEvent
---

# useEffectEvent

`useEffectEvent` is a React Hook that lets you separate events from Effects.

## Signature / Usage

```js
import { useEffectEvent, useEffect } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
}
```

`const onEvent = useEffectEvent(callback)` returns an Effect Event function with the same type signature as your `callback`. You can call it inside `useEffect`, `useLayoutEffect`, `useInsertionEffect`, or from within other Effect Events in the same component.

```js
useEffect(() => {
  const connection = createConnection(roomId);
  connection.on('connected', onConnected);
  connection.connect();
  return () => {
    connection.disconnect();
  }
}, [roomId]);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| callback | function | A function containing the logic for your Effect Event. It can accept any number of arguments and return any value. When you call the returned Effect Event function, the `callback` always accesses the latest committed values from render at the time of the call. |

## Notes

- Call it only at the top level of your component or your own Hooks.
- Effect Events always "see" the latest values from render (like props and state) without re-synchronizing your Effect, so they're excluded from Effect dependencies.
- Effect Events can only be called from inside Effects or other Effect Events. Do not call them during rendering or pass them to other components or Hooks. The `eslint-plugin-react-hooks` linter enforces this restriction.
- Do not use `useEffectEvent` to avoid specifying dependencies in your Effect's dependency array. This hides bugs. If a value should cause your Effect to re-run, keep it as a dependency.
- Effect Event functions do not have a stable identity. Their identity intentionally changes on every render; including one in a dependency array is wrong (ESLint will warn about this).

## Related

- [useEffect](./useEffect.md)
- [useLayoutEffect](./useLayoutEffect.md)
- [useInsertionEffect](./useInsertionEffect.md)
