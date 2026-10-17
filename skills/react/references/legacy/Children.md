---
source: https://react.dev/reference/react/Children
---

# Children

`Children` lets you manipulate and transform the JSX you received as the `children` prop.

## Signature / Usage

```js
import { Children } from 'react';

function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
```

## Options / Props

| Method | Parameters | Returns |
| --- | --- | --- |
| `Children.count(children)` | `children`: the value of the `children` prop | The number of nodes inside these `children`. |
| `Children.forEach(children, fn, thisArg?)` | `fn(child, index)` run for each child (index starts at `0`); optional `thisArg` (default `undefined`) | `undefined` |
| `Children.map(children, fn, thisArg?)` | `fn(child, index)` must return a React node (empty node, string, number, element, or array of nodes); optional `thisArg` | `null` / `undefined` if `children` is that; otherwise a flat array of the nodes returned from `fn` except `null` and `undefined` |
| `Children.only(children)` | `children` | The element if `children` is a valid element; otherwise throws an error |
| `Children.toArray(children)` | `children` | A flat array of elements in `children` |

## Notes

- Legacy: using `Children` is uncommon and can lead to fragile code. Alternatives: export multiple components (e.g. `Row`) instead of wrapping children automatically, accept an array of objects as a prop, or call a render prop.
- Do not confuse the `Children` API (capital `C`) with using the `children` prop (lowercase `c`), which is good and encouraged.
- Empty nodes (`null`, `undefined`, and Booleans), strings, numbers, and React elements count as individual nodes. Arrays don't count as individual nodes, but their children do. The traversal does not go deeper than React elements: they don't get rendered, and their children aren't traversed. Fragments don't get traversed. (Applies to `count`, `forEach`, `map`.)
- `Children.map`: if you return an element or an array of elements with keys from `fn`, the returned elements' keys will be automatically combined with the key of the corresponding original item from `children`.
- `Children.only` always throws if you pass an array (such as the return value of `Children.map`) as `children`.
- `Children.toArray`: empty nodes are omitted in the returned array. The returned elements' keys are calculated from the original elements' keys and their level of nesting and position.
- The `children` data structure does not include rendered output of the components you pass as JSX. `Children.count(children)` for `<RowList><p>First item</p><MoreRows /></RowList>` is `2` even if `MoreRows` renders 10 items or returns `null`. There is no way to get the rendered output of an inner component.
- The `children` prop is an opaque data structure: if there is only a single child, React won't create an extra array. Use the `Children` methods instead of introspecting it directly.

## Related

- [cloneElement](./cloneElement.md)
- [isValidElement](./isValidElement.md)
- [Legacy React APIs](./overview.md)
