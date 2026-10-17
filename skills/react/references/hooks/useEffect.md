---
source: https://react.dev/reference/react/useEffect
---

# useEffect

`useEffect` is a React Hook that lets you synchronize a component with an external system.

## Signature / Usage

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  // ...
}
```

`useEffect(setup, dependencies?)` returns `undefined`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| setup | function | The function with your Effect's logic. It may optionally return a cleanup function. After the component commits, React runs setup; after every commit with changed dependencies, React first runs cleanup with the old values, then setup with the new values; after the component is removed from the DOM, React runs cleanup. |
| dependencies (optional) | array | The list of all reactive values referenced inside of the `setup` code (props, state, and all variables and functions declared directly inside the component body). Must have a constant number of items, written inline like `[dep1, dep2, dep3]`, compared with `Object.is`. If omitted, the Effect re-runs after every commit of the component. |

## Notes

- Call it only at the top level of your component or your own Hooks.
- If you're not trying to synchronize with some external system, you probably don't need an Effect.
- When Strict Mode is on, React will run one extra development-only setup+cleanup cycle before the first real setup. This is a stress-test that ensures that your cleanup logic "mirrors" your setup logic.
- If some of your dependencies are objects or functions defined inside the component, there is a risk that they will cause the Effect to re-run more often than needed. Remove unnecessary object and function dependencies, and extract state updates and non-reactive logic (see `useEffectEvent`) outside of your Effect.
- If your Effect wasn't caused by an interaction (like a click), React will generally let the browser paint the updated screen first before running your Effect. If the delay is noticeable (for example, it flickers), replace `useEffect` with `useLayoutEffect`.
- If your Effect is caused by an interaction (like a click), React may run your Effect before the browser paints the updated screen. If you must defer the work until after paint, such as an `alert()`, you can use `setTimeout`.
- Even if your Effect was caused by an interaction, React may allow the browser to repaint the screen before processing the state updates inside your Effect. If you must block the browser from repainting, use `useLayoutEffect`.
- Effects only run on the client. They don't run during server rendering.
- Effects are an escape hatch; "external system" means any piece of code that's not controlled by React (timers via `setInterval()` / `clearInterval()`, event subscriptions via `window.addEventListener()` / `window.removeEventListener()`, third-party animation libraries).

## Related

- [useLayoutEffect](./useLayoutEffect.md)
- [useInsertionEffect](./useInsertionEffect.md)
- [useEffectEvent](./useEffectEvent.md)
- [StrictMode](../components/StrictMode.md)
