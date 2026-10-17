---
source: https://react.dev/reference/react/createRef
---

# createRef

`createRef` creates a ref object which can contain arbitrary value.

## Signature / Usage

```js
import { Component, createRef } from 'react';

export default class Form extends Component {
  inputRef = createRef();

  handleClick = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <button onClick={this.handleClick}>
          Focus the input
        </button>
      </>
    );
  }
}
```

`createRef` takes no parameters. It returns an object with a single property `current`: initially `null`; you can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React sets its `current` property.

## Notes

- Legacy: `createRef` is mostly used for class components. Function components typically rely on `useRef` instead.
- `createRef` always returns a different object. It's equivalent to writing `{ current: null }` yourself.
- In a function component, you probably want `useRef`, which always returns the same object. `const ref = useRef(null)` is equivalent to `const [ref, _] = useState(() => createRef())`. (The official page writes `useRef()` / `createRef(null)`; adjusted because `createRef` takes no arguments and React 19 types require an argument for `useRef`.)
- Migrating from a class with `createRef` to a function with `useRef`: replace calls to `createRef` with `useRef(null)`, and read `inputRef.current` directly.
- Migration (18 → 19): string refs (`ref='input'` / `this.refs.input`) were removed in React 19; migrate to ref callbacks (`ref={input => this.input = input}`), or use `createRef`. Codemod: `npx codemod@latest react/19/replace-string-ref`.

## Related

- [Component](./Component.md)
- [forwardRef](./forwardRef.md)
- [useRef](../hooks/useRef.md)
