---
source: https://react.dev/reference/react/forwardRef
---

# forwardRef

`forwardRef` lets your component expose a DOM node to the parent component with a ref.

## Signature / Usage

```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `render` | function `(props, ref) => JSX` | The render function for your component. React calls it with the props and `ref` the component received from its parent. The returned JSX is the output of your component. |
| `props` (render arg) | object | The props passed by the parent component. |
| `ref` (render arg) | object or function | The `ref` attribute passed by the parent. `null` if the parent has not passed a ref. Pass it to another component, or to `useImperativeHandle`. |

Returns a React component that you can render in JSX. React passes the `ref` it receives to your render function as the second argument. (Before React 19, plain function components could not receive a `ref` prop; in React 19 `ref` is a regular prop for function components too.)

## Notes

- Deprecated: "In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead." `forwardRef` will be deprecated in a future release.
- In Strict Mode, React calls your render function twice in development to help find accidental impurities; the result from one call is ignored.
- Exposing a ref to the DOM node inside your component makes it harder to change its internals later. Typically expose DOM nodes from reusable low-level components like buttons or text inputs, not application-level components like an avatar or comment.
- To expose a constrained set of methods instead of a DOM node, pass the received `ref` to `useImperativeHandle`.
- If the ref to a `forwardRef` component is always `null`, you usually forgot to use the received `ref` (or it is passed only inside a conditional branch).
- Do not overuse refs: use them only for imperative behaviors you can't express as props (scrolling, focusing, triggering an animation, selecting text).

## Related

- [createRef](./createRef.md)
- [useImperativeHandle](../hooks/useImperativeHandle.md)
- [useRef](../hooks/useRef.md)
