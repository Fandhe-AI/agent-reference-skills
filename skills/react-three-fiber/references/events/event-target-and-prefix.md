---
source: https://r3f.docs.pmnd.rs/api/events#using-a-different-target-element
---

# Using a different target element / prefix

There are cases in which you may want to connect the event handlers to another DOM element instead of the canvas. This is usually done to have events on a shared parent, which allows both the canvas, and dom overlays to receive events.

## Signature / Usage

Using the event manager:

```jsx
const events => useThree(state => state.events)
useEffect(() => {
  state.events.connect(domNode)
```

Or the `eventSource` shortcut on the canvas (DOM only), which accepts dom-nodes and React.RefObjects to dom-nodes:

```jsx
function App() {
  const target = useRef()
  return (
    <div ref={target}>
      <Canvas eventSource={target.current}>
```

### Using a different prefix (DOM only)

By default Fiber will use offsetX/offsetY to set up the raycaster. You can change this with the `eventPrefix` shortcut.

```jsx
function App() {
  return (
    <Canvas eventPrefix="client">
```

## Notes

- Snippets are verbatim from the docs and are partial (unclosed in the original).
- `eventSource` and `eventPrefix` are DOM only.

## Related

- [Customizing the event settings](./customizing-events.md)
