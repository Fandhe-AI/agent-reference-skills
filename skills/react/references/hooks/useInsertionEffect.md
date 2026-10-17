---
source: https://react.dev/reference/react/useInsertionEffect
---

# useInsertionEffect

`useInsertionEffect` allows inserting elements into the DOM before any layout Effects fire. It is for CSS-in-JS library authors.

## Signature / Usage

```js
import { useInsertionEffect } from 'react';

// Inside your CSS-in-JS library
function useCSS(rule) {
  useInsertionEffect(() => {
    // ... inject <style> tags here ...
  });
  return rule;
}
```

`useInsertionEffect(setup, dependencies?)` returns `undefined`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| setup | function | The function with your Effect's logic, optionally returning a cleanup function. React runs it when your component is added to the DOM, before any layout Effects fire. After re-renders with changed dependencies, cleanup runs with old values, then setup with new values. |
| dependencies (optional) | array | The list of all reactive values referenced inside of the `setup` code, compared with `Object.is`. If omitted, the Effect re-runs after every re-render. |

## Notes

- Unless you are working on a CSS-in-JS library and need a place to inject the styles, you probably want `useEffect` or `useLayoutEffect` instead.
- Effects only run on the client. They don't run during server rendering.
- You can't update state from inside `useInsertionEffect`.
- By the time `useInsertionEffect` runs, refs are not attached yet.
- It may run either before or after the DOM has been updated. You shouldn't rely on the DOM being updated at any particular time.
- Unlike other types of Effects, which fire cleanup for every Effect and then setup for every Effect, `useInsertionEffect` fires both cleanup and setup one component at a time, resulting in an "interleaving" of cleanup and setup functions.

## Related

- [useEffect](./useEffect.md)
- [useLayoutEffect](./useLayoutEffect.md)
