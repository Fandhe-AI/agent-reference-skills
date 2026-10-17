---
source: https://react.dev/reference/react/cloneElement
---

# cloneElement

`cloneElement` lets you create a new React element using another element as a starting point.

## Signature / Usage

```js
import { cloneElement } from 'react';

// ...
const clonedElement = cloneElement(
  <Row title="Cabbage">
    Hello
  </Row>,
  { isHighlighted: true },
  'Goodbye'
);

console.log(clonedElement); // <Row title="Cabbage" isHighlighted={true}>Goodbye</Row>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `element` | React element | Must be a valid React element: a JSX node, the result of `createElement`, or the result of another `cloneElement` call. |
| `props` | object or `null` | `null` keeps all original `element.props`. Otherwise each prop in `props` is preferred over `element.props`; the rest are filled from the original. `props.key` or `props.ref` replace the original ones. |
| `...children` (optional) | React nodes | Zero or more child nodes (elements, strings, numbers, portals, empty nodes, arrays). If omitted, the original `element.props.children` is preserved. |

Returns a React element object with: `type` (same as `element.type`), `props` (shallow merge of `element.props` with the overriding `props`; `ref` is part of props, as `element.props.ref`, unless overridden by `props.ref`), `key` (original `element.key` unless overridden by `props.key`).

## Notes

- React 19: `ref` is a regular prop; `element.ref` is deprecated (accessing it warns) in favor of `element.props.ref` (React 19 Upgrade Guide). The cloneElement reference page still describes the pre-19 behavior.
- Legacy: using `cloneElement` is uncommon and can lead to fragile code; it makes data flow harder to trace. Alternatives in the docs: pass data with a render prop, pass data through context, or extract logic into a custom Hook.
- Cloning an element does not modify the original element.
- Only pass children as multiple arguments if they are all statically known, like `cloneElement(element, null, child1, child2, child3)`. If your children are dynamic, pass the entire array as the third argument: `cloneElement(element, null, listItems)`, so React warns about missing `key`s.
- Although you may read the element's properties, it's best to treat every element as opaque after it's created, and only render it.

## Related

- [Children](./Children.md)
- [createElement](./createElement.md)
- [isValidElement](./isValidElement.md)
