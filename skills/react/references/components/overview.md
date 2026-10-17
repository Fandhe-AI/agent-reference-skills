---
source: https://react.dev/reference/react/components
---

# Built-in React Components

React exposes a few built-in components that you can use in your JSX.

## Signature / Usage

```js
import { Fragment, Profiler, Suspense, StrictMode, Activity, ViewTransition } from 'react';
```

| Component | Description |
| --- | --- |
| [`<Fragment>`](./Fragment.md) | Alternatively written as `<>...</>`, lets you group multiple JSX nodes together. |
| [`<Profiler>`](./Profiler.md) | Lets you measure rendering performance of a React tree programmatically. |
| [`<Suspense>`](./Suspense.md) | Lets you display a fallback while the child components are loading. |
| [`<StrictMode>`](./StrictMode.md) | Enables extra development-only checks that help you find bugs early. |
| [`<Activity>`](./Activity.md) | Lets you hide and restore the UI and internal state of its children. |
| [`<ViewTransition>`](./ViewTransition.md) | Lets you animate a component tree with Transitions and Suspense. |

## Notes

- You can also define your own components as JavaScript functions.

## Related

- [Fragment](./Fragment.md)
- [Profiler](./Profiler.md)
- [Suspense](./Suspense.md)
- [StrictMode](./StrictMode.md)
- [Activity](./Activity.md)
- [ViewTransition](./ViewTransition.md)
