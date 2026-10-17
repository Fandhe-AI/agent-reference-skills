---
source: https://react.dev/reference/react-dom/components/common
---

# Common components (e.g. `<div>`)

All built-in browser components, such as `<div>`, support some common props and events.

## Signature / Usage

```js
<div className="wrapper">Some content</div>
```

`ref` callback function (React 19 supports a cleanup function):

```js
<div ref={(node) => {
  console.log('Attached', node);

  return () => {
    console.log('Clean up', node)
  }
}}>
```

## Options / Props

Special React props supported for all built-in components:

| Name | Type | Description |
| --- | --- | --- |
| children | React node | An element, a string, a number, a portal, an empty node like `null`, `undefined` and booleans, or an array of other React nodes. Specifies the content inside the component. |
| dangerouslySetInnerHTML | `{ __html: string }` | An object with a raw HTML string or `TrustedHTML` value inside. Overrides the `innerHTML` property of the DOM node. Use with extreme caution: untrusted HTML introduces an XSS vulnerability. |
| ref | ref object or callback | A ref object from `useRef` or `createRef`, or a `ref` callback function. Filled with the DOM element for this node. |
| suppressContentEditableWarning | boolean | If `true`, suppresses the warning for elements that have both `children` and `contentEditable={true}`. |
| suppressHydrationWarning | boolean | If `true`, React will not warn about mismatches in the attributes and the content of that element when server and client render different content. Works one level deep; an escape hatch. |
| style | object | CSS styles, e.g. `{ fontWeight: 'bold', margin: 20 }`. Property names are `camelCase`. A number value like `width: 100` gets `px` appended unless it is a unitless property. Use only for dynamic styles; otherwise prefer `className`. |

Standard DOM props supported for all built-in components:

| Name | Type | Description |
| --- | --- | --- |
| accessKey | string | Specifies a keyboard shortcut for the element. Not generally recommended. |
| aria-* | — | ARIA attributes. In React, all ARIA attribute names are exactly the same as in HTML. |
| autoCapitalize | string | Specifies whether and how the user input should be capitalized. |
| className | string | Specifies the element's CSS class name. |
| contentEditable | boolean | If `true`, the browser lets the user edit the rendered element directly. React warns if you pass React children to an element with `contentEditable={true}`. |
| data-* | string | Data attributes. Not commonly used in React. |
| dir | `'ltr'` or `'rtl'` | Specifies the text direction of the element. |
| draggable | boolean | Specifies whether the element is draggable. |
| enterKeyHint | string | Specifies which action to present for the enter key on virtual keyboards. |
| htmlFor | string | For `<label>` and `<output>`, associates the label with some control. Same as the `for` HTML attribute. |
| hidden | boolean or string | Specifies whether the element should be hidden. |
| id | string | Specifies a unique identifier for this element. Generate it with `useId` to avoid clashes. |
| is | string | If specified, the component will behave like a custom element. |
| inputMode | string | Specifies what kind of keyboard to display (for example, text, number or telephone). |
| itemProp | string | Specifies which property the element represents for structured data crawlers. |
| lang | string | Specifies the language of the element. |
| role | string | Specifies the element role explicitly for assistive technologies. |
| slot | string | Specifies the slot name when using shadow DOM. In React, an equivalent pattern is typically achieved by passing JSX as props, e.g. `<Layout left={<Sidebar />} right={<Content />} />`. |
| spellCheck | boolean or null | If explicitly set to `true` or `false`, enables or disables spellchecking. |
| tabIndex | number | Overrides the default Tab button behavior. Avoid using values other than `-1` and `0`. |
| title | string | Specifies the tooltip text for the element. |
| translate | `'yes'` or `'no'` | Passing `'no'` excludes the element content from being translated. |

Custom attributes can be passed as props, for example `mycustomprop="someValue"`. The attribute name must be lowercase and must not start with `on`. The value is converted to a string. If you pass `null` or `undefined`, the custom attribute is removed.

### Event handler props

Every handler below also has a `...Capture` variant that fires in the capture phase (e.g. `onClickCapture`), except `onMouseEnter`, `onMouseLeave`, `onPointerEnter`, `onPointerLeave` (no capture phase).

| Handler type | Props |
| --- | --- |
| `AnimationEvent` | `onAnimationEnd`, `onAnimationIteration`, `onAnimationStart` |
| `MouseEvent` | `onAuxClick`, `onClick`, `onContextMenu`, `onDoubleClick`, `onMouseDown`, `onMouseEnter`, `onMouseLeave`, `onMouseMove`, `onMouseOut`, `onMouseOver`, `onMouseUp` |
| `InputEvent` | `onBeforeInput` (React does not yet use the native `beforeinput` event and polyfills it) |
| `FocusEvent` | `onFocus`, `onBlur` (both bubble in React) |
| `CompositionEvent` | `onCompositionStart`, `onCompositionUpdate`, `onCompositionEnd` |
| `ClipboardEvent` | `onCopy`, `onCut`, `onPaste` |
| `DragEvent` | `onDrag`, `onDragEnd`, `onDragEnter`, `onDragLeave`, `onDragOver` (call `e.preventDefault()` to allow dropping), `onDragStart`, `onDrop` |
| `PointerEvent` | `onGotPointerCapture`, `onLostPointerCapture`, `onPointerCancel`, `onPointerDown`, `onPointerEnter`, `onPointerLeave`, `onPointerMove`, `onPointerOut`, `onPointerUp` |
| `KeyboardEvent` | `onKeyDown`, `onKeyUp`, `onKeyPress` (deprecated; use `onKeyDown` or `onBeforeInput`) |
| `Event` / `UIEvent` | `onScroll` (does not bubble), `onSelect` (extended to work for `contentEditable`, empty selection, and edits) |
| `TouchEvent` | `onTouchCancel`, `onTouchEnd`, `onTouchMove`, `onTouchStart` |
| `TransitionEvent` | `onTransitionEnd` |
| `WheelEvent` | `onWheel` |

Element-specific events:

| Elements | Props | Notes |
| --- | --- | --- |
| `<form>` | `onReset`, `onSubmit` | Fire only for `<form>`. |
| `<dialog>` | `onCancel`, `onClose` | Unlike browser events, they bubble in React. |
| `<details>` | `onToggle` | Unlike browser events, they bubble in React. |
| `<img>`, `<iframe>`, `<object>`, `<embed>`, `<link>`, SVG `<image>` | `onLoad`, `onError` | Unlike browser events, they bubble in React. |
| `<audio>`, `<video>` | `onAbort`, `onCanPlay`, `onCanPlayThrough`, `onDurationChange`, `onEmptied`, `onEncrypted`, `onEnded`, `onError`, `onLoadedData`, `onLoadedMetadata`, `onLoadStart`, `onPause`, `onPlay`, `onPlaying`, `onProgress`, `onRateChange`, `onResize`, `onSeeked`, `onSeeking`, `onStalled`, `onSuspend`, `onTimeUpdate`, `onVolumeChange`, `onWaiting` | Unlike browser events, they bubble in React. |

### React event object

Event handlers receive a React event object (sometimes known as a "synthetic event"). It conforms to the same standard as the underlying DOM events, but fixes some browser inconsistencies.

| Member | Description |
| --- | --- |
| `bubbles`, `cancelable`, `currentTarget`, `defaultPrevented`, `eventPhase`, `isTrusted`, `target`, `timeStamp` | Standard `Event` properties. |
| `nativeEvent` | A DOM `Event`. The original browser event object. |
| `preventDefault()`, `stopPropagation()` | Standard `Event` methods (`stopPropagation` stops propagation through the React tree). |
| `isDefaultPrevented()`, `isPropagationStopped()` | Return a boolean indicating whether `preventDefault` / `stopPropagation` was called. |
| `persist()`, `isPersistent()` | Not used with React DOM. With React Native, call `persist()` to read the event's properties after the event. |

Extra properties by handler type (each also includes the inherited properties of its parent type):

| Handler type | Extra properties |
| --- | --- |
| `AnimationEvent` | `animationName`, `elapsedTime`, `pseudoElement` |
| `ClipboardEvent` | `clipboardData` |
| `CompositionEvent` | `data` |
| `DragEvent` | `dataTransfer` (+ `MouseEvent` and `UIEvent` properties) |
| `FocusEvent` | `relatedTarget` (+ `UIEvent` properties) |
| `InputEvent` | `data` |
| `KeyboardEvent` | `altKey`, `charCode`, `code`, `ctrlKey`, `getModifierState(key)`, `key`, `keyCode`, `locale`, `metaKey`, `location`, `repeat`, `shiftKey`, `which` (+ `UIEvent` properties) |
| `MouseEvent` | `altKey`, `button`, `buttons`, `ctrlKey`, `clientX`, `clientY`, `getModifierState(key)`, `metaKey`, `movementX`, `movementY`, `pageX`, `pageY`, `relatedTarget`, `screenX`, `screenY`, `shiftKey` (+ `UIEvent` properties) |
| `PointerEvent` | `height`, `isPrimary`, `pointerId`, `pointerType`, `pressure`, `tangentialPressure`, `tiltX`, `tiltY`, `twist`, `width` (+ `MouseEvent` and `UIEvent` properties) |
| `TouchEvent` | `altKey`, `ctrlKey`, `changedTouches`, `getModifierState(key)`, `metaKey`, `shiftKey`, `touches`, `targetTouches` (+ `UIEvent` properties) |
| `TransitionEvent` | `elapsedTime`, `propertyName`, `pseudoElement` |
| `UIEvent` | `detail`, `view` |
| `WheelEvent` | `deltaMode`, `deltaX`, `deltaY`, `deltaZ` (+ `MouseEvent` and `UIEvent` properties) |

Generic `Event` handlers receive a React event object with no additional properties.

## Notes

- You cannot pass both `children` and `dangerouslySetInnerHTML` at the same time.
- Some events (like `onAbort` and `onLoad`) don't bubble in the browser, but bubble in React. `onBlur` and `onFocus` also bubble in React.
- `ref` callback: when the DOM node is added, React calls the callback with the node; when removed, React calls the cleanup function returned from the callback. React also calls the callback whenever you pass a different `ref` callback: the previous function's cleanup runs (or the previous function is called with `null` if no cleanup was returned), then the next function is called with the DOM node.
- React 19 added cleanup functions for `ref` callbacks. For backwards compatibility, if no cleanup function is returned, the callback is called with `null` when the ref is detached. This behavior will be removed in a future version.
- When Strict Mode is on, React runs one extra development-only setup+cleanup cycle before the first real setup for `ref` callbacks.
- Some React events do not map directly to the browser's native events (e.g. for `onMouseLeave`, `e.nativeEvent` points to a `mouseout` event). The mapping is not part of the public API and may change. Under the hood React attaches event handlers at the root, so `e.currentTarget` may not be the same as `e.nativeEvent.currentTarget`; for polyfilled events `e.type` may differ from `e.nativeEvent.type`.
- Applying CSS: use `className`, define rules in a separate CSS file; React does not prescribe how you add CSS files. Use `style` only for dynamic styles that depend on JavaScript variables. Produce conditional class strings yourself, e.g. with a helper like `classnames`.
- `dangerouslySetInnerHTML`: create the `{__html}` object as close to where the HTML is generated as possible; creating it inline is not recommended. If your site enforces Trusted Types, pass a `TrustedHTML` value created by your security policy as `__html`; React passes it to the browser without converting it to a string. Only use with trusted and sanitized data.
- `Migration (18 → 19)`: `ref` callbacks may return a cleanup function (see above).
- Migration (18 -> 19): string refs were removed in React 19; migrate to ref callbacks or `useRef`/`createRef`. The official common props page still mentions string legacy refs. Source: https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-string-refs

## Related

- [Overview](./overview.md)
- [form](./form.md)
- [input](./input.md)
