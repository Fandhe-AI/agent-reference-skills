---
source: https://react.dev/reference/react/cacheSignal
---

# cacheSignal

`cacheSignal` allows you to know when the `cache()` lifetime is over.

## Signature / Usage

```js
const signal = cacheSignal();
```

```js
import {cache, cacheSignal} from 'react';
const dedupedFetch = cache(fetch);
async function Component() {
  await dedupedFetch(url, { signal: cacheSignal() });
}
```

Call `cacheSignal` to get an `AbortSignal`. When React has finished rendering, the `AbortSignal` will be aborted, so you can cancel any in-flight work that is no longer needed. Rendering is considered finished when:

- React has successfully completed rendering
- the render was aborted
- the render has failed

Parameters: this function does not accept any parameters.

Returns: an `AbortSignal` if called during rendering. Otherwise `cacheSignal()` returns `null`.

## Notes

- Server Components only: `cacheSignal` is currently only used with React Server Components. In Client Components, it will always return `null`. In the future it will also be used for Client Components when a client cache refreshes or invalidates; you should not assume it'll always be null on the client.
- If called outside of rendering, `cacheSignal` returns `null` to make it clear that the current scope isn't cached forever.
- You can't use `cacheSignal` to abort async work that was started outside of rendering (e.g. a module-level `fetch(url, { signal: cacheSignal() })` will not actually be aborted).
- Use the `aborted` property to check if a thrown error was due to cancellation, and ignore those errors:

```js
async function getData(id) {
  try {
    return await queryDatabase(id);
  } catch (x) {
    if (!cacheSignal()?.aborted) {
      // only log if it's a real error and not due to cancellation
      logError(x);
    }
    return null;
  }
}
```

## Related

- [cache](./cache.md)
