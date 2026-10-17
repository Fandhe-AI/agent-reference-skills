---
source: https://react.dev/reference/react/use
---

# use

`use` is a React API that lets you read a resource during rendering, such as a Promise or context.

## Signature / Usage

```js
const value = use(resource);
```

```js
import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
```

Three forms:

- `use(context)`: reads the context value for the closest provider above. If there is no provider, returns the `defaultValue` passed to `createContext`.
- `use(promise)`: reads the resolved value; the component suspends while the Promise is pending. Rejected Promises propagate to the nearest Error Boundary.
- `use(browser())`: in a component that should only render in the browser; returns `undefined` in the browser.

```js
import { use } from 'react';
import { browser } from 'react-dom';

function BrowserOnly() {
  use(browser('This component requires browser APIs.'));
  return <BrowserContent />;
}
```

## Options / Props

| Form | Parameter | Description |
| --- | --- | --- |
| `use(context)` | `context` | A context created with `createContext`. |
| `use(promise)` | `promise` | A Promise whose resolved value you want to read. It must be cached so the same instance is reused across re-renders. |
| `use(browser())` | `browserValue` | The value returned by `browser` (from `react-dom`). |

## Notes

- Despite its name, `use` is not a Hook: unlike Hooks, it can be called inside loops and conditional statements like `if`. It must be called inside a Component or a Hook.
- `use(context)` always looks for the closest provider above the calling component; it does not consider providers in the component calling it. Reading context with `use` is not supported in Server Components.
- `use` cannot be called inside a try-catch block ("Suspense Exception: This is not a real error!"); wrap the component in an Error Boundary instead.
- Promises passed to `use` must be cached so the same instance is reused across re-renders; Promises created during render (e.g. `use(fetch('/albums'))`) cause "A component was suspended by an uncached promise" and repeated Suspense fallbacks. Ideally Promises are created before rendering, such as in an event handler, a route loader, or a Server Component.
- To avoid unnecessary fallbacks, a cache can set `status` / `value` / `reason` fields on the Promise (`'fulfilled'` reads `value` synchronously, `'rejected'` throws `reason`, missing or `'pending'` suspends). Never read `promise.status` yourself to bypass `use`.
- To re-fetch in Client Components, invalidate the cache entry and store the new Promise in state inside `startTransition`.
- When passing a Promise from a Server Component to a Client Component, its resolved value must be serializable. Unwrap a Promise with `await` in a Server Component and with `use` in a Client Component.
- `use(browser())`: during server rendering the component suspends and React includes the closest `<Suspense>` boundary's fallback in the HTML (it must be inside a `<Suspense>` boundary or server rendering fails). In a Server Components app it must be called from a Client Component. `browser` was announced in the React 19.3 release post, but the reference docs still mark it as not yet in Stable (canary-pinned sandboxes); see browser.md before relying on it.
- This is React's built-in `use`. Data fetching via `useSuspenseQuery` (tanstack-query) or loaders (tanstack-router / react-router) is covered by those skills.

```js
function Albums({ albumsPromise }) {
  const albums = use(albumsPromise);
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

## Related

- [createContext](./createContext.md)
- [Suspense](../components/Suspense.md)
- [startTransition](./startTransition.md)
- [browser](../dom-apis/browser.md)
- use client
