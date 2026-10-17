---
source: https://react.dev/reference/react/isValidElement
---

# isValidElement

`isValidElement` checks whether a value is a React element.

## Signature / Usage

```js
import { isValidElement, createElement } from 'react';

// ✅ React elements
console.log(isValidElement(<p />)); // true
console.log(isValidElement(createElement('p'))); // true

// ❌ Not React elements
console.log(isValidElement(25)); // false
console.log(isValidElement('Hello')); // false
console.log(isValidElement({ age: 42 })); // false
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `value` | any | The value you want to check. |

Returns `true` if the `value` is a React element; otherwise `false`.

## Notes

- Only JSX tags and objects returned by `createElement` are considered React elements. A number like `42` is a valid React node but not a React element. Arrays and portals created with `createPortal` are also not React elements.
- `isValidElement` checks for a React element, not a React node, so don't use it to check whether something can be rendered.
- It is very uncommon to need `isValidElement`; it's mostly useful if you call another API that only accepts elements (like `cloneElement`) and want to avoid an error.

## Related

- [cloneElement](./cloneElement.md)
- [createElement](./createElement.md)
