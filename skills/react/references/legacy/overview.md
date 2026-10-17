---
source: https://react.dev/reference/react/legacy
---

# Legacy React APIs

These APIs are exported from the `react` package, but they are not recommended for use in newly written code. See the linked individual API pages for the suggested alternatives.

## Signature / Usage

```js
import { Children, cloneElement, Component, createElement, createRef, forwardRef, isValidElement, PureComponent } from 'react';
```

## Notes

Legacy APIs:

- [`Children`](./Children.md) lets you manipulate and transform the JSX received as the `children` prop.
- [`cloneElement`](./cloneElement.md) lets you create a React element using another element as a starting point.
- [`Component`](./Component.md) lets you define a React component as a JavaScript class.
- [`createElement`](./createElement.md) lets you create a React element. Typically, you'll use JSX instead.
- [`createRef`](./createRef.md) creates a ref object which can contain arbitrary value.
- [`forwardRef`](./forwardRef.md) lets your component expose a DOM node to parent component with a ref.
- [`isValidElement`](./isValidElement.md) checks whether a value is a React element. Typically used with `cloneElement`.
- [`PureComponent`](./PureComponent.md) is similar to `Component`, but it skip re-renders with same props.

Removed APIs:

These APIs were removed in React 19:

- `createFactory` (https://18.react.dev/reference/react/createFactory): use JSX instead.
- Class Components: `static contextTypes` (https://18.react.dev//reference/react/Component#static-contexttypes): use `static contextType` instead.
- Class Components: `static childContextTypes` (https://18.react.dev//reference/react/Component#static-childcontexttypes): use `static contextType` instead.
- Class Components: `static getChildContext` (https://18.react.dev//reference/react/Component#getchildcontext): use `Context` instead (see `createContext#provider`).
- Class Components: `static propTypes` (https://18.react.dev//reference/react/Component#static-proptypes): use a type system like TypeScript instead.
- Class Components: `this.refs` (https://18.react.dev//reference/react/Component#refs): use `createRef` instead.

General behavior:

- Each page above links to its "alternatives" in the original docs; see the individual pages for migration examples.

## Related

- [Component](./Component.md)
- [createRef](./createRef.md)
- [createElement](./createElement.md)
