---
source: https://react.dev/reference/react/cache
---

# cache

`cache` lets you cache the result of a data fetch or computation.

## Signature / Usage

```js
const cachedFn = cache(fn);
```

```js
import {cache} from 'react';
import calculateMetrics from 'lib/metrics';

const getMetrics = cache(calculateMetrics);

function Chart({data}) {
  const report = getMetrics(data);
  // ...
}
```

Call `cache` outside of any components to create a version of the function with caching. When `getMetrics` is first called with `data`, it calls `calculateMetrics(data)` and stores the result in cache. If called again with the same `data`, it returns the cached result.

Returns: `cache` returns a cached version of `fn` with the same type signature. It does not call `fn` in the process. The only time `fn` is called is when there is a cache miss.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `fn` | function | The function you want to cache results for. `fn` can take any arguments and return any value. |

## Notes

- Server Components only: `cache` is only for use with React Server Components.
- React will invalidate the cache for all memoized functions for each server request.
- Each call to `cache` creates a new function. Calling `cache` with the same function multiple times returns different memoized functions that do not share the same cache. To share a cache, define the memoized function in a dedicated module and import it across components.
- `cachedFn` will also cache errors. If `fn` throws an error for certain arguments, the same error is re-thrown when `cachedFn` is called with those same arguments.
- Calling a memoized function outside of a component will not use the cache (it still evaluates the function but does not read or update the cache), because cache access is provided through a context only accessible from a component.
- React uses shallow equality (`Object.is`) of the arguments to determine a cache hit. If arguments are objects, functions, or arrays, pass the same object reference, or pass primitives.
- Asynchronous rendering is only supported for Server Components. To render components that use asynchronous data in Client Components, see `use`.
- If `fn` can be aborted with an `AbortSignal`, use `cacheSignal()` to cancel the expensive computation when React has finished rendering.
- `useMemo` caches an expensive computation in a Client Component across renders (cache local to the component, last computation only). `cache` memoizes work shared across Server Components. `memo` prevents a component re-rendering if its props are unchanged.
- This page is React's built-in `cache`, distinct from framework caching (e.g. Next.js `use cache`, nextjs-app skill) and from TanStack Query's cache (tanstack-query skill).

```js
import {cache} from 'react';

const getUser = cache(async (id) => {
  return await db.user.query(id);
});

function Page({id}) {
  // Good: start fetching the user data (preload)
  getUser(id);
  // ...
}
```

## Related

- [cacheSignal](./cacheSignal.md)
- [memo](./memo.md)
- [use](./use.md)
- useMemo
