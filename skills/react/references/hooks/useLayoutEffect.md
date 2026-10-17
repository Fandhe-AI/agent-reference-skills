---
source: https://react.dev/reference/react/useLayoutEffect
---

# useLayoutEffect

`useLayoutEffect` is a version of `useEffect` that fires before the browser repaints the screen.

## Signature / Usage

```js
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  // ...
```

`useLayoutEffect(setup, dependencies?)` returns `undefined`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| setup | function | The function with your Effect's logic, optionally returning a cleanup function. After the component commits to the DOM and before the browser repaints the screen, React runs setup. After every commit with changed dependencies, cleanup runs with old values, then setup with new values. Before the component is removed from the DOM, React runs cleanup. |
| dependencies (optional) | array | The list of all reactive values referenced inside of the `setup` code, compared with `Object.is`. If omitted, the Effect re-runs after every commit. |

## Notes

- `useLayoutEffect` can hurt performance. Prefer `useEffect` when possible.
- Call it only at the top level of your component or your own Hooks.
- When Strict Mode is on, React will run one extra development-only setup+cleanup cycle before the first real setup.
- Effects only run on the client. They don't run during server rendering.
- The code inside `useLayoutEffect` and all state updates scheduled from it block the browser from repainting the screen. When used excessively, this makes your app slow.
- If you trigger a state update inside `useLayoutEffect`, React will execute all remaining Effects immediately including `useEffect`.

## Related

- [useEffect](./useEffect.md)
- [useInsertionEffect](./useInsertionEffect.md)
