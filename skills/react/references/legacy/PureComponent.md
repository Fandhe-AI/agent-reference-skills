---
source: https://react.dev/reference/react/PureComponent
---

# PureComponent

`PureComponent` is similar to `Component` but it skips re-renders for same props and state.

## Signature / Usage

```js
import { PureComponent } from 'react';

class Greeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

## Notes

- Legacy: class components are still supported by React, but are not recommended in new code. Define components as functions instead.
- `PureComponent` is a subclass of `Component` and supports all the `Component` APIs. Extending it is equivalent to defining a custom `shouldComponentUpdate` that shallowly compares props and state.
- Your component will still re-render if a context that it's using changes.
- A component should have pure rendering logic: it must return the same output if its props, state, and context haven't changed.
- Migrating to a function: wrap the function component in `memo`, e.g. `const Greeting = memo(function Greeting({ name }) { ... })`.
- Unlike `PureComponent`, `memo` does not compare the new and the old state. In function components, calling the `set` function with the same state already prevents re-renders by default, even without `memo`.

## Related

- [Component](./Component.md)
