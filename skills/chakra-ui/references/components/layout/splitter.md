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

### ResizeTrigger

| Prop | Type | Description |
|------|------|-------------|
| `id` | `"panelA:panelB"` | **required** IDs of the two adjacent panels |
| `disabled` | `boolean` | Disables resizing |

## Notes

- `ResizeTrigger` `id` must follow the pattern `"panelA:panelB"` — adjacent panel IDs joined with `:`
- Use `useSplitter()` hook with `RootProvider` for programmatic control
- Supports nested splitters for complex layouts
- Keyboard accessible: focus the resize trigger and use arrow keys

## Related

- [ScrollArea](./scroll-area.md)
- [Grid](./grid.md)
