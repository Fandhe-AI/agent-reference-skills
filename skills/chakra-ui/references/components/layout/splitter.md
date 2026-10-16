# Splitter

A resizable panel layout component. Composed of `Splitter.Root`, `Splitter.Panel`, `Splitter.ResizeTrigger`, and `Splitter.ResizeTriggerSeparator`.

## Import

```tsx
import { Splitter } from "@chakra-ui/react"
```

## Usage

```tsx
<Splitter.Root
  panels={[{ id: "a" }, { id: "b" }]}
  borderWidth="1px"
  minH="60"
>
  <Splitter.Panel id="a">
    <Center boxSize="full">A</Center>
  </Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b" />
  <Splitter.Panel id="b">
    <Center boxSize="full">B</Center>
  </Splitter.Panel>
</Splitter.Root>
```

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `panels` | `PanelData[]` | **required** | Size constraints for each panel |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Split direction |
| `defaultSize` | `number[]` | — | Initial panel sizes (percentages) |
| `size` | `number[]` | — | Controlled panel sizes |
| `keyboardResizeBy` | `number` | — | Pixels to resize by with keyboard |
| `onResize` | `(details: ResizeDetails) => void` | — | Called on resize |
| `onResizeEnd` | `(details: ResizeEndDetails) => void` | — | Called when resize ends |
| `onResizeStart` | `() => void` | — | Called when resize starts |
| `onCollapse` | `(details: ExpandCollapseDetails) => void` | — | Called when panel collapses |
| `onExpand` | `(details: ExpandCollapseDetails) => void` | — | Called when panel expands |

### PanelData

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | **required** Panel identifier |
| `minSize` | `number` | Minimum size (percentage) |
| `maxSize` | `number` | Maximum size (percentage) |
| `collapsible` | `boolean` | Whether the panel can be collapsed |
| `collapsedSize` | `number` | Size when collapsed |
| `resizeBehavior` | `"preserve-pixel-size"` | Keep the panel's pixel size constant when the parent group resizes (see Resize Behavior). Not listed in the Splitter prop types at 3.37.0 |

### ResizeTrigger

| Prop | Type | Description |
|------|------|-------------|
| `id` | `"panelA:panelB"` | **required** IDs of the two adjacent panels |
| `disabled` | `boolean` | Disables resizing |

## CSS Unit Sizes

In addition to percentages, `defaultSize`, `minSize`, and `maxSize` accept CSS units like `px`, `em`, `rem`, `vh`, and `vw`. This is useful for panels that should keep a fixed width, such as a navigation sidebar.

> CSS-unit sizes are measured on the client, so panels using them can shift after hydration. Use percentage sizes for a stable server-rendered layout.

```tsx
<Splitter.Root
  panels={[
    { id: "nav", minSize: "240px", maxSize: "480px" },
    { id: "main", minSize: 30 },
  ]}
  defaultSize={["240px", "60vw"]}
/>
```

## Resize Behavior

Set `resizeBehavior` on a panel to control how it reacts when the parent group resizes. Use `"preserve-pixel-size"` to keep a panel's pixel size constant (so the other panels absorb the change) instead of scaling proportionally.

```tsx
<Splitter.Root
  panels={[
    { id: "sidebar", minSize: 15, resizeBehavior: "preserve-pixel-size" },
    { id: "main" },
  ]}
  defaultSize={[25, 75]}
/>
```

## Notes

- CSS units and `resizeBehavior` came with Ark UI 5.37.2 (Chakra UI 3.36.0)
- `ResizeTrigger` `id` must follow the pattern `"panelA:panelB"` — adjacent panel IDs joined with `:`
- Use `useSplitter()` hook with `RootProvider` for programmatic control
- Supports nested splitters for complex layouts
- Keyboard accessible: focus the resize trigger and use arrow keys

## Related

- [ScrollArea](./scroll-area.md)
- [Grid](./grid.md)
