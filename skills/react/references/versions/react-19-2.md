---
source: https://react.dev/blog/2025/10/01/react-19-2
---

# React 19.2

React 19.2 (October 1, 2025) is the third release in a year after React 19 (December) and React 19.1 (June). It adds Activity, `useEffectEvent`, `cacheSignal`, Performance Tracks, Partial Pre-rendering, and more.

## Signature / Usage

```js
<Activity mode={isVisible ? 'visible' : 'hidden'}>
  <Page />
</Activity>
```

## Options / Props

### New React features

| Feature | Summary |
| --- | --- |
| `<Activity>` | Alternative to conditional rendering. Modes: `hidden` (hides children, unmounts effects, defers all updates until React has nothing left to work on) and `visible` (shows children, mounts effects, processes updates normally). More modes planned |
| `useEffectEvent` | Splits "event" logic out of an Effect so changes to values used in it (e.g. `theme`) do not re-run the Effect. Effect Events always see the latest props and state |
| `cacheSignal` | Server Components only. Tells when the `cache()` lifetime is over (render completed, aborted or failed) |
| Performance Tracks | Custom tracks in Chrome DevTools performance profiles: Scheduler and Components |

### New React DOM features

| Feature | Summary |
| --- | --- |
| Partial Pre-rendering | `prerender` returns `{prelude, postponed}`; later `resume` (Web Streams SSR), `resumeToPipeableStream` (Node Streams), `resumeAndPrerender` / `resumeAndPrerenderToNodeStream` (static HTML for SSG) continue rendering. Prerender APIs now return a `postpone` state |

### Notable changes

| Change | Summary |
| --- | --- |
| Batching Suspense boundaries for SSR | Reveals of server-rendered Suspense boundaries are batched for a short time to align with client-rendered behavior; prepares for `<ViewTransition>` with Suspense during SSR |
| Web Streams support for Node | `renderToReadableStream`, `prerender`, `resume`, `resumeAndPrerender` now available for Node.js |
| `eslint-plugin-react-hooks` v6 | Flat config by default in `recommended` preset; opt-in for React Compiler powered rules; use `recommended-legacy` for legacy config |
| Default `useId` prefix | Changed from `:r:` (19.0.0) or `«r»` (19.1.0) to `_r_` so IDs are valid for `view-transition-name` and XML 1.0 names |

## Notes

- `useEffectEvent`: Effect Events should not be declared in the dependency array; upgrade to `eslint-plugin-react-hooks@latest` so the linter does not insert them as dependencies. They can only be declared in the same component or Hook as their Effect. Do not wrap everything in `useEffectEvent` or use it just to silence the lint error.
- Prefer Node Streams in Node.js: `renderToPipeableStream`, `resumeToPipeableStream`, `prerenderToNodeStream`, `resumeAndPrerenderToNodeStream`. Node Streams are much faster than Web Streams in Node, and Web Streams do not support compression by default.
- Suspense batching: React uses heuristics so throttling does not impact core web vitals; if total page load time approaches 2.5s (LCP "good"), React stops batching and reveals content immediately.
- Legacy ESLint config change: `extends: ['plugin:react-hooks/recommended']` becomes `extends: ['plugin:react-hooks/recommended-legacy']`.
- Other notable changes: nonce allowed on hoistable styles (#32461); warn for a React owned node used as a Container if it also has text content (#32774). Bug fixes include an initial value passed to `useDeferredValue` (#34376) and a crash when submitting forms with Client Actions (#33055).
- For SSR APIs this is the React-level behavior; framework SSR is covered by nextjs-app, tanstack-start and react-router.

## Related

- [React v19](./react-19.md)
- [React 19.3](./react-19-3.md)
- [Activity](../components/Activity.md)
- [useEffectEvent](../hooks/useEffectEvent.md)
- [cacheSignal](../apis/cacheSignal.md)
- [resume](../dom-server/resume.md)
