---
source: https://react.dev/blog/2026/09/09/react-19-3
---

# React 19.3

React 19.3 (September 9, 2026) makes View Transitions and Fragment Refs stable, and adds `browser()`, Trusted Types support, and direct `<Context>` rendering in Server Components.

## Signature / Usage

```js
import { ViewTransition } from 'react';

{isShowing && (
  <ViewTransition>
    <Component />
  </ViewTransition>
)}
```

## Options / Props

| Feature | Summary |
| --- | --- |
| `<ViewTransition>` | Animates elements as they enter, exit, move or resize using the browser View Transition API. Stable in 19.3 (experimental before). Triggers: **enter** (added), **exit** (removed), **update** (children change style or content), **share** (a named `<ViewTransition>` removed in one place and added in another). Customize with a View Transition Class in CSS or event props `onEnter`, `onExit`, `onShare`, `onUpdate` |
| `addTransitionType` | Called inside `startTransition` alongside the state update to record the cause of a transition (e.g. `'next'`, `'previous'`); `<ViewTransition enter={{next: 'from-right', previous: 'from-left'}} exit={{...}}>` picks animations by type. React also adds every Transition Type as a browser view transition type, scoped in CSS with `:active-view-transition-type(...)` |
| ViewTransition with Suspense | `<ViewTransition><Suspense fallback={<Loading />}>...</Suspense></ViewTransition>` runs an update animation from fallback to content. Wrapping images or fonts in `<ViewTransition>` makes them trigger Suspense while they load |
| Fragment Refs | `<Fragment ref={fragmentRef}>` gives a `FragmentInstance` operating on the DOM children as a group |
| `browser` (`react-dom`) | `use(browser())` opts a component out of server-side rendering |
| Trusted Types support | React passes `TrustedHTML` / `TrustedScript` / `TrustedScriptURL` values through without string coercion |
| `<Context>` in Server Components | Server Components can import and render a Context from a `'use client'` module directly |

`FragmentInstance` methods:

- `addEventListener`, `removeEventListener`, `dispatchEvent` manage events for first-level children.
- `focus`, `focusLast`, `blur` move focus across nested children, depth-first.
- `observeUsing`, `unobserveUsing` connect an `IntersectionObserver` or `ResizeObserver`.
- `getClientRects`, `getRootNode`, `compareDocumentPosition`, `scrollIntoView` measure and scroll to the fragment's first-level children.

Animation transition types and Suspense example from the post:

```js
function nextSlide() {
  startTransition(() => {
    addTransitionType('next');
    setCurrentSlide(c => c + 1);
  });
}
```

```js
<ViewTransition update="auto" default="none">
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
</ViewTransition>
```

`browser()` usage:

```js
import { use } from 'react';
import { browser } from 'react-dom';

function Component() {
  use(browser());

  // ...
}
```

Server Components rendering Context directly:

```js
// user-context.js
'use client';
import { createContext } from 'react';

export const UserContext = createContext(null);
```

```js
// server-component.js
import { UserContext } from './user-context';

export async function Layout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <UserContext value={currentUser}>
      {children}
    </UserContext>
  )
}
```

## Notes

- Updates not marked as Transitions do not trigger View Transition animations. State updates inside `startTransition`, a `<Suspense>` reveal, or an update from `useDeferredValue` all cause a View Transition to animate.
- `<ViewTransition>` only works in the DOM currently; React Native and other platforms are being worked on.
- Principles for animating with Suspense: fallbacks should appear immediately without animation; a fallback should update to its final content with animation; children that do not suspend should appear immediately without animation. Animations with Suspense work best used sparingly.
- `use(browser())` triggers Suspense on the server but not in the client: during SSR the nearest Suspense boundary's fallback shows in the HTML; once hydrated on the client it does not suspend. Like other calls to `use`, it can be called conditionally or after an early return.
- Fragment Refs target components that render a group of siblings with no single parent, or that do not pass along their `ref` prop. `FragmentInstance` operates on children's DOM as a group without changing its structure.
- Trusted Types: applies when a site enforces `Content-Security-Policy: require-trusted-types-for 'script'`; previously React always coerced values to strings (`'' + value`).
- Server Components cannot create Context, but can render Context imported from a `'use client'` module, removing the need for a wrapper Provider component.
- Changelog highlights: Transitions are rendered independently instead of entangled into a single render (#37290); Strict Mode double-invokes Effects during hydration (#35961); warning when `use` is used incorrectly in a conditional (#37104); "form state" renamed to "action state" in `useActionState` error messages (#35790); `onFullscreenChange` / `onFullscreenError` events (#34621); `maskType` SVG property (#35921); `fetchPriority` for module resources (#36835); `onReset` fired after automatic form reset following a Server Action (#35176); `submitter` included in `submit` events (#35590); `credentialless` boolean attribute on iframes (#36148); `resize` updates batched until the next frame (#35117); `Error.cause` and `AggregateError.errors` transported to the client (#35810, #36156); `<Activity>` supported in Flight (#34697).
- Notable bug fixes include: `useDeferredValue` stuck on an old value (#36134), `useSyncExternalStore` missing mutations while an `<Activity>` tree was hidden (#36947), `useEffectEvent` reading latest values in `forwardRef` and `memo` components (#34831), hidden `<Activity>` error and portal handling (#35074, #35091), `<ViewTransition>` crashes in Mobile Safari (#35337) and with `SuspenseList` (#35520).
- The post's sandbox examples pinned `19.3.0-canary-f1f7ed2a-20260904`; the stable release is 19.3.0.
- ViewTransition animates via the browser View Transition API; this is distinct from the motion skill's layout animations. Server Components / Context behavior here is React-level; for framework use see nextjs-app, tanstack-start and react-router.

## Related

- [React 19.2](./react-19-2.md)
- [ViewTransition](../components/ViewTransition.md)
- [addTransitionType](../apis/addTransitionType.md)
- [Fragment](../components/Fragment.md)
- [browser](../dom-apis/browser.md)
- [Server Components](../server-components/server-components.md)
