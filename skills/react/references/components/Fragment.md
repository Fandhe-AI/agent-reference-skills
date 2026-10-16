---
source: https://react.dev/reference/react/Fragment
---

# `<Fragment>` (`<>...</>`)

`<Fragment>`, often used via `<>...</>` syntax, lets you group elements without a wrapper node. Fragments can also accept refs, which enable interacting with underlying DOM nodes without adding wrapper elements.

## Signature / Usage

```js
<>
  <OneChild />
  <AnotherChild />
</>
```

```js
import { Fragment } from 'react';

function Post() {
  return (
    <Fragment>
      <PostTitle />
      <PostBody />
    </Fragment>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| key | optional | Fragments declared with the explicit `<Fragment>` syntax may have keys. |
| ref | optional | A ref object (e.g. from `useRef`) or callback function. React provides a `FragmentInstance` as the ref value that implements methods for interacting with the DOM nodes wrapped by the Fragment. |

## Notes

FragmentInstance:

When you pass a `ref` to a Fragment, React provides a `FragmentInstance` object. It implements methods for interacting with the first-level DOM children wrapped by the Fragment.

| Method | Description |
| --- | --- |
| `addEventListener(type, listener, options?)` | Adds an event listener to all first-level DOM children. Returns `undefined`. |
| `removeEventListener(type, listener, options?)` | Removes an event listener from all first-level DOM children. Returns `undefined`. |
| `dispatchEvent(event)` | Dispatches an event on the Fragment; listeners are called and the event can bubble to the Fragment's DOM parent. Returns `true` if not cancelled, `false` if `preventDefault()` was called. |
| `focus(options?)` | Focuses the first focusable DOM node, searching all nested children depth-first. |
| `focusLast(options?)` | Focuses the last focusable DOM node. Searches nested children depth-first, then iterates in reverse. |
| `blur()` | Removes focus from the active element if it is within the Fragment; otherwise does nothing. |
| `observeUsing(observer)` | Starts observing all first-level DOM children with an `IntersectionObserver` or `ResizeObserver`. |
| `unobserveUsing(observer)` | Stops observing the Fragment's DOM children with the given observer. |
| `getClientRects()` | Returns a flat `Array<DOMRect>` of the bounding rectangles of all first-level DOM children. |
| `getRootNode(options?)` | Returns a `Document`, `ShadowRoot`, or the `FragmentInstance` itself if there is no parent DOM node. |
| `compareDocumentPosition(otherNode)` | Returns a bitmask of position flags, matching `Node.compareDocumentPosition()`. |
| `scrollIntoView(alignToTop?)` | Scrolls the children into view. `true` (default) aligns the first child to the top; `false` aligns the last child to the bottom. |

```js
const observer = new IntersectionObserver(callback, options);
fragmentRef.current.observeUsing(observer);
```

General behavior:

- If you want to pass `key` to a Fragment, you can't use the `<>...</>` syntax. You have to explicitly import `Fragment` from `'react'` and render `<Fragment key={yourKey}>...</Fragment>`.
- If you want to pass `ref` to a Fragment, you can't use the `<>...</>` syntax. You have to explicitly import `Fragment` from `'react'` and render `<Fragment ref={yourRef}>...</Fragment>`.
- React does not reset state when you go from rendering `<><Child /></>` to `[<Child />]` or back, or when you go from rendering `<><Child /></>` to `<Child />` and back. This only works a single level deep: for example, going from `<><><Child /></></>` to `<Child />` resets the state.
- Methods that target children (such as `addEventListener`, `observeUsing`, and `getClientRects`) operate on first-level host (DOM) children of the Fragment. They do not directly target children nested inside another DOM element.
- `focus` and `focusLast` search nested children depth-first for focusable elements, unlike event and observer methods which only target first-level host children.
- `observeUsing` does not work on text nodes. React logs a warning in development if the Fragment contains only text children.
- React does not apply event listeners added via `addEventListener` to hidden `<Activity>` trees. When an `Activity` boundary switches from hidden to visible, listeners are applied automatically.
- Each first-level DOM child of a Fragment with a `ref` gets a `reactFragments` property: a `Set<FragmentInstance>` containing all Fragment instances that own the element.
- `scrollIntoView` does not accept an options object; passing one throws an error. When the Fragment has no children, it scrolls the nearest sibling or parent into view as a fallback.
- Empty Fragments and Fragments with children rendered through a portal include `Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC` in the `compareDocumentPosition` result.
- Fragment `ref` / `FragmentInstance` is listed in the React 19.3 release blog as "Fragment Refs".
- Distinct from Android `androidx.fragment` (see the android-* skills); this is the React JSX grouping component.

## Related

- [Activity](./Activity.md)
- [overview](./overview.md)
