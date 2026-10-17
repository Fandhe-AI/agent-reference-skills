---
source: https://react.dev/reference/react/useMemo
---

# useMemo

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.

## Signature / Usage

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```

`const cachedValue = useMemo(calculateValue, dependencies)`. On the initial render it returns the result of calling `calculateValue` with no arguments. During next renders, it returns the stored value if the dependencies haven't changed, or calls `calculateValue` again.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| calculateValue | function | The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. |
| dependencies | array | The list of all reactive values referenced inside of the `calculateValue` code, compared with `Object.is`. Must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. |

## Notes

- React Compiler automatically memoizes values and functions, reducing the need for manual `useMemo` calls.
- Call it only at the top level of your component or your own Hooks.
- In Strict Mode, React will call your calculation function twice in order to help you find accidental impurities. This is development-only behavior; the result from one of the calls will be ignored.
- React will not throw away the cached value unless there is a specific reason to do that. For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. If you rely on `useMemo` for more than a performance optimization, a state variable or a ref may be more appropriate.
- Caching return values like this is also known as memoization, which is why this Hook is called `useMemo`.

## Related

- [useCallback](./useCallback.md)
- [memo](../apis/memo.md)
