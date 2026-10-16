---
source: https://react.dev/reference/react/StrictMode
---

# `<StrictMode>`

`<StrictMode>` lets you find common bugs in your components early during development.

## Signature / Usage

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Options / Props

`StrictMode` accepts no props.

## Notes

Development-only behaviors:

| Check | What it finds |
| --- | --- |
| Extra re-render | Bugs caused by impure rendering (component bodies, functions passed to `useState` / `set` functions / `useMemo` / `useReducer`, some class component methods are called twice). |
| Extra Effect setup+cleanup | Bugs caused by missing Effect cleanup. |
| Extra ref callback setup+cleanup | Bugs caused by missing ref cleanup. |
| Deprecated API check | Warns when a component inside the tree uses `UNSAFE_` class lifecycle methods like `UNSAFE_componentWillMount`. |

```js
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

General behavior:

- All checks are development-only and do not impact the production build.
- There is no way to opt out of Strict Mode inside a tree wrapped in `<StrictMode>`.
- Strict Mode can be enabled for a part of the app only. In that case React only enables behaviors that are possible in production; e.g. if `<StrictMode>` is not at the root, it will not re-run Effects an extra time on initial mount.
- If you use a framework that calls `createRoot` for you, check its documentation for how to enable Strict Mode.
- With React DevTools installed, `console.log` calls during the second render appear slightly dimmed; DevTools has a setting (off by default) to suppress them.
- Hidden `<Activity>` trees: StrictMode eagerly performs Activity unmounts and mounts to catch unexpected side effects.

## Related

- [Activity](./Activity.md)
- [Profiler](./Profiler.md)
- [overview](./overview.md)
