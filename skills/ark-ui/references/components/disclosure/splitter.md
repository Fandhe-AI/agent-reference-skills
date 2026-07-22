# Splitter

Divides interfaces into resizable sections, enabling flexible layout management across horizontal and vertical orientations.

## Signature / Usage

```tsx
import { Splitter } from '@ark-ui/react/splitter'

<Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]}>
  <Splitter.Panel id="a">Panel A</Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b">
    <Splitter.ResizeTriggerIndicator />
  </Splitter.ResizeTrigger>
  <Splitter.Panel id="b">Panel B</Splitter.Panel>
</Splitter.Root>
```

## Anatomy

- `Splitter.Root` — container element
- `Splitter.Panel` — individual resizable section
- `Splitter.ResizeTrigger` — interactive handle for resizing
- `Splitter.ResizeTriggerIndicator` — visual indicator on the resize handle

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | Sets layout direction (default: `'horizontal'`) |
| `panels` | `PanelData[]` | Defines size constraints for panels |
| `defaultSize` | `number[]` | Initial panel sizes on render |
| `size` | `number[]` | Controlled panel sizes |
| `onResize` | `(details: ResizeDetails) => void` | Callback during resize operations |
| `onCollapse` | `(details: ExpandCollapseDetails) => void` | Triggered when a panel collapses |
| `onExpand` | `(details: ExpandCollapseDetails) => void` | Triggered when a panel expands |
| `keyboardResizeBy` | `number` | Pixels to resize via keyboard |

## Notes

- `useSplitterContext` (via `RootProvider` + `useSplitter`) exposes: `getSizes()`, `setSizes()`, `collapsePanel()` / `expandPanel()`, `resizePanel()`, `isPanelCollapsed()`.
- Supports nested grid-like structures via `createRegistry()`.
- Common use cases: sidebar layouts with collapsible panels, multi-pane editors/dashboards, responsive designs with dynamic collapse.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Scroll Area](./scroll-area.md)
