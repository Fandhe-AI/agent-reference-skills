---
source: https://react.dev/reference/react/useImperativeHandle
---

# useImperativeHandle

`useImperativeHandle` is a React Hook that lets you customize the handle exposed as a ref.

## Signature / Usage

```js
import { useImperativeHandle } from 'react';

function MyInput({ ref }) {
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
    };
  }, []);
  // ...
```

`useImperativeHandle(ref, createHandle, dependencies?)` returns `undefined`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ref | ref | The `ref` you received as a prop to the component. |
| createHandle | function | A function that takes no arguments and returns the ref handle you want to expose. Usually an object with the methods you want to expose. |
| dependencies (optional) | array | The list of all reactive values referenced inside of the `createHandle` code, compared with `Object.is`. If a re-render resulted in a change to some dependency, or if you omitted this argument, `createHandle` re-executes and the newly created handle is assigned to the ref. |

## Notes

- Starting with React 19, `ref` is available as a prop. In React 18 and earlier, it was necessary to get the `ref` from `forwardRef`.
- When you call `useImperativeHandle` with a `ref`, the `ref` is no longer passed to the underlying `<input>`; keep the real browser DOM in a separate ref and expose only the methods you want (e.g. `focus`, `scrollIntoView`).

## Related

- [useRef](./useRef.md)
- [forwardRef](../legacy/forwardRef.md)
