# Widget API Overview

The Figma Widget API is a component-based system for creating interactive custom objects in design files and FigJam boards. It mirrors React's component architecture and consists of three main building blocks: **components**, **functions**, and **hooks**.

## Signature / Usage

```tsx
const { widget } = figma
const { AutoLayout, Text, useSyncedState, register } = widget

function Counter() {
  const [count, setCount] = useSyncedState("count", 0)
  return (
    <AutoLayout onClick={() => setCount(count + 1)}>
      <Text>{count}</Text>
    </AutoLayout>
  )
}

widget.register(Counter)
```

## Options / Props

| Building Block | Members | Description |
|----------------|---------|-------------|
| Components (layer) | `AutoLayout`, `Frame`, `Text`, `Rectangle`, `Image`, `Ellipse`, `SVG`, `Line` | Rendered canvas layers |
| Components (non-layer) | `Input`, `Fragment`, `Span` | Utility/inline elements |
| Functions | `register`, `waitForTask`, `colorMapToOptions` | Core entry points and helpers |
| Hooks | `useSyncedState`, `useSyncedMap`, `useEffect`, `usePropertyMenu`, `useWidgetId`, `useStickable`, `useStickableHost` | State and lifecycle management |

## Notes

- Destructure from `figma.widget` at the top of the file to avoid verbose qualified names like `figma.widget.AutoLayout`.
- Widgets run in response to user interaction only, on the client that initiated it.
- Rendering code must be **synchronous** and depend only on widget state — it cannot read external data or other canvas nodes.
- State-updating code (event handlers, `useEffect`) can be async and may access the Plugin API.

## Related

- [register](./register.md)
- [useSyncedState](./useSyncedState.md)
- [useSyncedMap](./useSyncedMap.md)
- [useEffect](./useEffect.md)
- [usePropertyMenu](./usePropertyMenu.md)
- [AutoLayout](./AutoLayout.md)
