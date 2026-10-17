---
source: https://react.dev/learn/manipulating-the-dom-with-refs#example-focusing-a-text-input
---

# Refs and the DOM

Get a DOM node with `useRef` and call a browser API on it from an event handler.

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

## Notes

- `useRef` returns an object with a single `current` property; it is `null` until React creates the DOM node and puts it there.
- Access `ref.current` from event handlers (and Effects), then use any browser API defined on the element, for example `myRef.current.scrollIntoView()`.
