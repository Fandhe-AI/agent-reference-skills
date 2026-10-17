---
source: https://react.dev/reference/react/memo
---

# memo

`memo` lets you skip re-rendering a component when its props are unchanged.

## Signature / Usage

```js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

```js
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

Returns: a new React component. It behaves the same as the component provided to `memo` except that React will not always re-render it when its parent is being re-rendered unless its props have changed.

Custom comparison function:

```js
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Component` | component | The component that you want to memoize. `memo` does not modify this component, but returns a new, memoized component. Any valid React component, including functions and `forwardRef` components, is accepted. |
| `arePropsEqual` (optional) | `(prevProps, nextProps) => boolean` | Returns `true` if the old and new props are equal (same output and behavior), otherwise `false`. Usually not specified; by default React compares each prop with `Object.is`. |

## Notes

- React Compiler automatically applies the equivalent of `memo` to all components, reducing the need for manual memoization. When you enable React Compiler, you typically don't need `React.memo` anymore; the compiler's optimization also memoizes intermediate values and expensive computations within your components.
- Memoization is a performance optimization, not a guarantee: React may still re-render it. You should only rely on `memo` as a performance optimization.
- Even when a component is memoized, it still re-renders when its own state changes or when a context that it's using changes. Memoization only has to do with props passed from its parent. To re-render only when a part of some context changes, split your component in two and pass the needed value to a memoized child as a prop.
- Props are compared by shallow equality (`Object.is`). `memo` is useless if the props are always different, such as an object or a plain function defined during rendering; use `useMemo` and `useCallback` in the parent, or pass minimal primitive props.
- If you provide a custom `arePropsEqual`, you must compare every prop, including functions. Avoid deep equality checks unless you are 100% sure of the data structure's limited depth.
- Measure with the Performance panel in your browser developer tools, with React running in production mode.

## Related

- [cache](./cache.md)
- useMemo
- useCallback
- forwardRef
