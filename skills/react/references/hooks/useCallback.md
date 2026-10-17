---
source: https://react.dev/reference/react/useCallback
---

# useCallback

`useCallback` is a React Hook that lets you cache a function definition between re-renders.

## Signature / Usage

```js
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```

`const cachedFn = useCallback(fn, dependencies)`. On the initial render it returns the `fn` function you have passed. During subsequent renders, it will either return an already stored `fn` function from the last render (if the dependencies haven't changed), or return the `fn` function you have passed during this render.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| fn | function | The function value that you want to cache. React will return (not call!) your function back to you; it will not call it. |
| dependencies | array | The list of all reactive values referenced inside of the `fn` code. Compared with `Object.is`. Must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. |

## Notes

- React Compiler automatically memoizes values and functions, reducing the need for manual `useCallback` calls.
- Call it only at the top level of your component or your own Hooks. You can't call it inside loops or conditions.
- React will not throw away the cached function unless there is a specific reason to do that. For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. If you rely on `useCallback` for more than a performance optimization, a state variable or a ref may be more appropriate.
- Caching a function is useful when passing it to a child wrapped in `memo`: a `function () {}` or `() => {}` always creates a different function, so the `memo` optimization won't work without `useCallback`.

## Related

- [useMemo](./useMemo.md)
- [memo](../apis/memo.md)
