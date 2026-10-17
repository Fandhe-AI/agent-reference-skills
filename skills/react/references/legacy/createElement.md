---
source: https://react.dev/reference/react/createElement
---

# createElement

`createElement` lets you create a React element. It serves as an alternative to writing JSX.

## Signature / Usage

```js
import { createElement } from 'react';

function Greeting({ name }) {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello ',
    createElement('i', null, name),
    '. Welcome!'
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `type` | string or component | A valid React component type: a tag name string (such as `'div'` or `'span'`), or a React component (function, class, or special component like `Fragment`). |
| `props` | object or `null` | `null` is treated the same as an empty object. `key` is special: it is not available as `element.props.key` but as `element.key`. In React 19, `ref` is a regular prop and is available as `element.props.ref`. |
| `...children` (optional) | React nodes | Zero or more child nodes (elements, strings, numbers, portals, empty nodes, arrays). |

Returns a React element object with: `type` (the type passed), `props` (the props passed except `key`), `key` (the key passed, coerced to a string, or `null`). `element.ref` is deprecated in React 19 (accessing it warns); use `element.props.ref`.

## Notes

- Typically you'll use JSX instead.
- React 19: ref is a regular prop; element.ref is deprecated in favor of element.props.ref (React 19 Upgrade Guide). The createElement reference page still describes the pre-19 behavior.
- Treat React elements and their props as immutable. In development, React freezes the returned element and its `props` property shallowly.
- With JSX, a tag must start with a capital letter to render your own component: `<Something />` is equivalent to `createElement(Something)`, but `<something />` is equivalent to `createElement('something')` (a string, treated as a built-in HTML tag).
- Only pass children as multiple arguments if they are all statically known, like `createElement('h1', {}, child1, child2, child3)`. For dynamic children, pass the entire array as the third argument: `createElement('ul', {}, listItems)`.
- An element is a lightweight description of a piece of the UI; creating it does not render the component or create DOM elements. Creating elements is extremely cheap.
- Migration (18 → 19): `React.createFactory` was removed in React 19; replace it with JSX (e.g. `const button = <button />;` instead of `createFactory('button')`).

## Related

- [cloneElement](./cloneElement.md)
- [isValidElement](./isValidElement.md)
- [Legacy React APIs](./overview.md)
