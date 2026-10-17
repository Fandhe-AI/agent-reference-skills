---
source: https://react.dev/reference/react/useRef
---

# useRef

`useRef` is a React Hook that lets you reference a value that's not needed for rendering.

## Signature / Usage

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
```

`const ref = useRef(initialValue)` returns an object with a single property `current`, initially set to the `initialValue`. On the next renders, `useRef` returns the same object.

```js
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| initialValue | any | The value you want the ref object's `current` property to be initially. This argument is ignored after the initial render. |

## Notes

- You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn't mutate that object.
- When you change the `ref.current` property, React does not re-render your component.
- Do not write or read `ref.current` during rendering, except for initialization. This makes your component's behavior unpredictable.
- In Strict Mode, React will call your component function twice. Each ref object will be created twice, but one of the versions will be discarded.
- By default, your own components don't expose refs to the DOM nodes inside them. In React 19, `ref` is available as a prop.
- Migration (18 → 19): string refs are removed. "In React 19, we're removing string refs to make React simpler and easier to understand." If you're still using string refs in class components, migrate to ref callbacks.
- Migration (18 → 19, TypeScript types): `useRef` now requires an argument (`useRef()` is a type error; `useRef(undefined)` passes). All refs are now mutable, `MutableRef` is deprecated in favor of a single `RefObject` type, and `useRef<T>(null)` still has a convenience overload that returns `RefObject<T | null>`.

## Related

- [useImperativeHandle](./useImperativeHandle.md)
- [createRef](../legacy/createRef.md)
- [useState](./useState.md)
