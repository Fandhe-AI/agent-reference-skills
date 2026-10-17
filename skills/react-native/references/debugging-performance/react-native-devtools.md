---
source: https://reactnative.dev/docs/0.87/react-native-devtools
---

# React Native DevTools

The built-in debugger for React Native, based on the Chrome DevTools frontend, with Console, Sources, Network, Performance, Memory, React Components and React Profiler panels.

## Signature / Usage

```text
Open: Dev Menu > "Open DevTools", or press j from the CLI.
Quick breakpoint from the editor: a `debugger;` statement (reaches the device via Fast Refresh).
Console: Ctrl + L clears the console view.
Sources: Cmd + P / Ctrl + P navigates to a source file.
```

## Notes

- Designed for debugging React app concerns, not to replace native tools. To inspect underlying platform layers (e.g. while developing a Native Module), use Android Studio and Xcode.
- Console: view and filter messages, evaluate JavaScript, inspect object properties. Tips: filter box / log levels, Live Expressions, Preserve Logs.
- Sources and breakpoints: click the line-number column to add a breakpoint; step through code with the controls at the top right. A "Paused in Debugger" overlay appears on the device; tap it to resume. Conditional Breakpoints and Logpoints are supported.
- Network panel (since 0.83): requests are recorded automatically when DevTools is open. Captured today: `fetch()`, `XMLHttpRequest`, and `<Image>`. Not yet supported at launch: WebSocket events, network response mocking, simulated network throttling. Apps using Expo continue to see the separate "Expo Network" panel (Expo-specific events; no request initiator support; no Performance panel integration). Response previews are cached in an on-device buffer of at most 100MB; oldest previews are evicted first (metadata is kept). The Initiator tab shows the call stack of a request, and network events also appear in the Network track of the Performance panel.
- Performance panel (since 0.83): records JavaScript execution, React Performance tracks, Network events and custom User Timings in one timeline. Annotations (shift-drag) label a trace; use the `PerformanceObserver` API in your app to observe performance events at runtime.
- Memory panel: take heap snapshots and view JavaScript memory usage over time; an allocation timeline report helps identify leaks.
- React Components panel: inspect and update the rendered component tree; props and state can be modified at runtime. Components optimized with React Compiler are annotated with a "Memo ✨" badge. "Highlight updates when components render" (View Settings) shows re-renders.
- React Profiler panel: record performance profiles of component renders and React commits.
- Reconnecting: DevTools can disconnect when the app is closed, rebuilt, crashes natively, Metro is quit, or a physical device is disconnected. A "Debugging connection was closed" dialog offers Dismiss or "Reconnect DevTools".
- Distinct from the browser Chrome DevTools used for web apps and from React DevTools browser extension; the React panels here are integrated (react).

## Related

- [Debugging Basics](./debugging.md)
- [Debugging Native Code](./debugging-native-code.md)
- [Profiling](./profiling.md)
- [Other Debugging Methods](./other-debugging-methods.md)
