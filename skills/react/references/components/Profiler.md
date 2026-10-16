---
source: https://react.dev/reference/react/Profiler
---

# `<Profiler>`

`<Profiler>` lets you measure rendering performance of a React tree programmatically.

## Signature / Usage

```js
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

```js
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| id | string | A string identifying the part of the UI you are measuring. |
| onRender | function | An `onRender` callback that React calls every time components within the profiled tree update. It receives information about what was rendered and how much time it took. |

### onRender parameters

| Name | Description |
| --- | --- |
| id | The string `id` prop of the `<Profiler>` tree that has just committed. |
| phase | `"mount"`, `"update"` or `"nested-update"`. Whether the tree has just been mounted for the first time or re-rendered due to a change in props, state, or Hooks. |
| actualDuration | Milliseconds spent rendering the `<Profiler>` and its descendants for the current update. Indicates how well the subtree makes use of memoization (e.g. `memo` and `useMemo`). |
| baseDuration | Milliseconds estimating how much time it would take to re-render the entire `<Profiler>` subtree without any optimizations (sum of the most recent render durations of each component). Estimates a worst-case cost of rendering. |
| startTime | A numeric timestamp for when React began rendering the current update. |
| commitTime | A numeric timestamp for when React committed the current update. Shared between all profilers in a commit. |

## Notes

- Profiling adds some additional overhead, so it is disabled in the production build by default. To opt into production profiling, you need to enable a special production build with profiling enabled.
- `<Profiler>` lets you gather measurements programmatically. For an interactive profiler, use the Profiler tab in React Developer Tools.
- Components wrapped in `<Profiler>` are also marked in the Component tracks of React Performance tracks even in profiling builds. In development builds, all components are marked in the Components track regardless.
- You can use multiple `<Profiler>` components and nest them. Although lightweight, use it only when necessary; each use adds some CPU and memory overhead.

## Related

- [StrictMode](./StrictMode.md)
- [overview](./overview.md)
