---
source: https://react.dev/reference/react/Component
---

# Component

`Component` is the base class for the React components defined as JavaScript classes. Class components are still supported by React, but we don't recommend using them in new code.

## Signature / Usage

```js
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

Only the `render` method is required, other methods are optional.

## Options / Props

Instance fields and static members:

| Name | Description |
| --- | --- |
| `context` | `this.context`. Only available if you specify which context via `static contextType`. A class component can only read one context at a time. |
| `props` | The props passed to the component, as `this.props`. |
| `state` | `this.state`; must be an object. Do not mutate directly; call `setState`. |
| `static contextType` | A value previously created by `createContext`. |
| `static defaultProps` | Default props for the class; used for `undefined` and missing props, but not for `null`. |
| `static getDerivedStateFromError(error)` | Called when a child throws during rendering; should be pure and return the state telling the component to display the error message. |
| `static getDerivedStateFromProps(props, state)` | Called right before `render`, on initial mount and every update; returns an object to update state, or `null`. Fired on every render regardless of cause; has no access to the component instance. |

Instance methods:

| Name | Description |
| --- | --- |
| `constructor(props)` | Runs before mounting. Declares state and binds methods; call `super(props)` first. No side effects or subscriptions. Only place to assign `this.state` directly. |
| `render()` | Only required method. Returns any valid React node. Must be a pure function of props, state, and context. |
| `componentDidMount()` | Called when added (mounted) to the screen: start data fetching, subscriptions, DOM manipulation. |
| `componentDidUpdate(prevProps, prevState, snapshot?)` | Called right after re-render with updated props or state; not for the initial render. `snapshot` is the value from `getSnapshotBeforeUpdate`. |
| `componentWillUnmount()` | Called before unmount; cancel fetching, remove subscriptions. Should mirror `componentDidMount`. |
| `componentDidCatch(error, info)` | Called when a descendant throws during rendering; `info.componentStack` holds the component stack. Use for error reporting. |
| `getSnapshotBeforeUpdate(prevProps, prevState)` | Called immediately before React updates the DOM; the returned value (any type, or `null`) is passed to `componentDidUpdate`. |
| `setState(nextState, callback?)` | `nextState` is an object (shallowly merged) or an updater function `(prevState, props) => partialState`. Optional `callback` runs after the update is committed. |
| `forceUpdate(callback?)` | Forces a re-render without calling `shouldComponentUpdate`. Try to avoid. |
| `shouldComponentUpdate(nextProps, nextState, nextContext)` | Return `false` to skip a re-render; default `true`. Not called on initial render or with `forceUpdate`. |
| `UNSAFE_componentWillMount()` | Called right after the constructor. Historical; use `state` field/constructor or `componentDidMount` instead. |
| `UNSAFE_componentWillReceiveProps(nextProps, nextContext)` | Called when receiving new props. Historical; use `componentDidUpdate`, memoization, a `key`, or `getDerivedStateFromProps` instead. |
| `UNSAFE_componentWillUpdate(nextProps, nextState)` | Called before rendering with new props or state. Historical; use `componentDidUpdate` or `getSnapshotBeforeUpdate`. |

Error Boundary example:

```js
import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToMyService(
      error,
      info.componentStack,
      // Warning: `captureOwnerStack` is not available in production.
      process.env.NODE_ENV !== 'production'
        ? React.captureOwnerStack()
        : undefined,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

## Notes

- The Error Boundary example is adapted from the official one to guard `captureOwnerStack`, which is only exported in development builds (undefined in production).
- Legacy: define components as functions instead of classes. Hooks (functions starting with `use`) are not supported inside class components.
- `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate` are deprecated names, renamed to the `UNSAFE_` variants; "In a future major version of React, only the new name will work." Codemod: `rename-unsafe-lifecycles` (reactjs/react-codemod).
- `UNSAFE_*` methods are not called if the component implements `static getDerivedStateFromProps` or `getSnapshotBeforeUpdate`. They are "unsafe" because with Suspense a render attempt can be thrown away and restarted.
- `UNSAFE_componentWillMount` is the only lifecycle method that runs during server rendering.
- With Strict Mode in development, React calls `constructor` twice (one instance discarded), `render` twice (one result discarded), and runs `componentDidMount` -> `componentWillUnmount` -> `componentDidMount`.
- `setState` does not change `this.state` in the already executing code; it only affects the next render. Updates are batched; `flushSync` can force synchronous application at a performance cost.
- `shouldComponentUpdate` exists only as a performance optimization; prefer `PureComponent`. Returning `false` does not prevent child re-renders from their own state and is only a hint.
- `componentDidCatch`: calling `setState` inside it to show a fallback is deprecated in favor of `static getDerivedStateFromError`. In development, caught errors bubble up to `window`; in production they do not.
- Error boundaries do not catch errors in event handlers, server-side rendering, errors thrown in the boundary itself, or asynchronous code (exception: errors thrown inside a `startTransition` function from `useTransition`). There is currently no way to write an Error Boundary as a function component; the docs point to the `react-error-boundary` package.
- No function-component equivalent yet: `getSnapshotBeforeUpdate`, `componentDidCatch`, `static getDerivedStateFromError`. Equivalents otherwise: `state` -> `useState`; `context` -> `useContext`; `componentDidMount/Update/WillUnmount` -> `useEffect` (`useLayoutEffect` if before paint); `forceUpdate` with external data -> `useSyncExternalStore`; `shouldComponentUpdate` -> `memo` / `useMemo`.
- Migration (18 → 19): removed in React 19 — `static contextTypes`, `static childContextTypes`, `static getChildContext` (Legacy Context; use `static contextType` with `createContext`), `static propTypes` (silently ignored; use TypeScript or another type checker), string refs / `this.refs` (use ref callbacks or `createRef`). Class components continue to support `defaultProps`, since there is no ES6 alternative (it was removed only from function components).

## Related

- [PureComponent](./PureComponent.md)
- [createRef](./createRef.md)
- [Legacy React APIs](./overview.md)
