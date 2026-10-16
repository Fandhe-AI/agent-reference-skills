---
source: https://react.dev/reference/react/Suspense
---

# `<Suspense>`

`<Suspense>` lets you display a fallback until its children have finished loading.

## Signature / Usage

```js
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

```js
import {use} from 'react';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| children | ReactNode | The actual UI you intend to render. If `children` suspends while rendering, the Suspense boundary switches to rendering `fallback`. |
| fallback | ReactNode | An alternate UI to render in place of the actual UI if it has not finished loading. In practice, a lightweight placeholder such as a spinner or skeleton. If `fallback` suspends while rendering, it activates the closest parent Suspense boundary. |
| defer | boolean (optional, default `false`) | Experimental only. When `true`, React may show the `fallback` first and render or stream `children` later, even when nothing in them suspends. Use it for content that is expensive to render. |

## Notes

What activates a Suspense boundary:

- Lazy-loading component code with `lazy`.
- Reading a Promise with `use`, including data streamed from Server Components or loaded through a Suspense-enabled framework.
- Loading a stylesheet rendered with `<link rel="stylesheet">` and a `precedence` prop (React blocks the boundary until the stylesheet loads, up to a timeout).
- Waiting for a large boundary's HTML to arrive during streaming server rendering.
- Loading fonts, only when a `<ViewTransition>` animates a boundary's reveal (React waits up to 500 ms for new fonts).
- Loading images, only when a `<ViewTransition>` animates a boundary's reveal (React waits up to 500 ms for visible images; `loading="lazy"` or an `onLoad` handler opts a specific image out).
- Experimental only: performing CPU-bound render work inside a `<Suspense defer>` boundary.

General behavior:

- Suspense does not detect when data is fetched inside an Effect or event handler.
- React does not preserve any state for renders that got suspended before they were able to mount for the first time; React retries rendering the suspended tree from scratch.
- If Suspense was displaying content but then suspended again, the `fallback` is shown again unless the update was caused by `startTransition` or `useDeferredValue`.
- React reveals suspended content at most once every 300ms, measured from the last reveal. Boundaries that become ready within that window are revealed together.
- If React needs to hide already visible content because it suspended again, it cleans up layout Effects in the content tree and fires them again when the content is shown again.
- Resetting on navigation: during a Transition React avoids hiding already revealed content; give the boundary (or a component above it) a different `key` to treat it as different content and show the fallback, e.g. `<ProfilePage key={queryParams.id} />`.
- Preventing unwanted fallbacks: mark the update non-urgent with `startTransition` or `useDeferredValue`. React will only prevent unwanted fallbacks during non-urgent updates; newly rendered Suspense boundaries still display fallbacks immediately.
- Without a framework, you can read a Promise with `use` directly as long as the Promise is cached so the same instance is reused across renders.
- Suspense integrates with Streaming Server Rendering and Selective Hydration.
- Distinct from data-fetching libraries and router loaders: `useSuspenseQuery` and loaders live in the tanstack-query / tanstack-router / react-router skills; this page covers only the React `<Suspense>` component.

## Related

- [Activity](./Activity.md)
- [ViewTransition](./ViewTransition.md)
- [StrictMode](./StrictMode.md)
- [overview](./overview.md)
