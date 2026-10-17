---
source: https://react.dev/reference/dev-tools/react-performance-tracks
---

# React Performance tracks

React Performance tracks are specialized custom entries that appear on the Performance panel's timeline in your browser developer tools.

## Signature / Usage

Profiling builds use `react-dom/profiling` instead of `react-dom/client`. Alias `react-dom/client` to `react-dom/profiling` at build time via bundler aliases instead of manually updating each import. Your framework might have built-in support for enabling React's profiling build.

```text
react-dom/profiling   (use instead of react-dom/client)
```

If enabled, tracks should appear automatically in the traces you record with the Performance panel of browsers that provide extensibility APIs.

## Options / Props

Availability by build:

| Build | Behavior |
| --- | --- |
| Development | Enabled by default. |
| Profiling | Only Scheduler tracks are enabled by default. The Components track only lists Components that are in subtrees wrapped with `<Profiler>`. If you have the React Developer Tools extension enabled, all Components are included in the Components track even if they're not wrapped in `<Profiler>`. Server tracks are not available in profiling builds. |
| Production | Disabled by default (the profiling instrumentation adds some additional overhead). |

Tracks:

| Track | Description |
| --- | --- |
| Scheduler | Manages tasks with different priorities, with 4 subtracks: Blocking (synchronous updates, which could've been initiated by user interactions), Transition (non-blocking background work, usually initiated via `startTransition`), Suspense (work related to Suspense boundaries, such as displaying fallbacks or revealing content), Idle (lowest priority work done when there are no other higher-priority tasks). |
| Components | Flamegraph of the durations of React component renders (each entry covers the component render and all its descendant children components) and of effects. |
| Server Requests | Visualizes all Promises that eventually end up in a React Server Component, including `async` operations like calling `fetch` or async Node.js file operations. |
| Server Components | Visualizes the durations of React Server Components Promises they awaited, as a flamegraph. |

## Notes

- Server Components and Server Requests tracks are only available in development builds.
- Renders: every render pass consists of phases. Update (what caused a new render pass); Render (React renders the updated subtree by calling render functions of components); Commit (React submits the changes to the DOM and runs layout effects, like `useLayoutEffect`); Remaining Effects (React runs passive effects of a rendered subtree, like `useEffect`; usually after the paint, with a known exception for user interactions like clicks or other discrete events, where this phase could run before the paint).
- Cascading updates: if an update was scheduled during a render pass, React could discard completed work and start a new pass. In development builds, clicking the "Cascading update" entry shows an enhanced stack trace including the name of the method that scheduled an update.
- Components track: not all effects are shown by default. To maintain performance and prevent UI clutter, React only displays effects which had a duration of 0.05ms or longer, or triggered an update.
- Additional events during render and effects phases: Mount, Unmount, Reconnect (similar to Mount, but limited to cases when `<Activity>` is used), Disconnect (similar to Unmount, but limited to `<Activity>`).
- Changed props: in development builds, clicking a component render entry lets you inspect potential changes in props, to identify unnecessary renders.
- Server Requests: React tries to combine Promises started from inside third-party code into a single span representing the duration of the entire operation blocking 1st party code (e.g. a third party `getUser` calling `fetch` multiple times is a single `getUser` span). Clicking on spans shows a stack trace of where the Promise was created and the resolved value, if available. Rejected Promises are displayed as red with their rejected value.
- Server Components: if you await a Promise, React displays the duration of that Promise; use the Server Requests track to see all I/O operations. Darker color means longer render duration. The track group always contains a "Primary" track; if React can render Server Components concurrently it displays additional "Parallel" tracks. If more than 8 Server Components are rendered concurrently, React associates them with the last "Parallel" track instead of adding more tracks.

## Related

- [Profiler](../components/Profiler.md)
- [React Developer Tools](./react-developer-tools.md)
- [startTransition](../apis/startTransition.md)
- [Activity](../components/Activity.md)
