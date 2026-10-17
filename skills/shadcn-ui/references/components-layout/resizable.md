---
source: https://ui.shadcn.com/docs/components/base/resizable
---

# Resizable

Accessible resizable panel groups and layouts with keyboard support.

## Signature / Usage

```bash
npx shadcn@latest add resizable
# manual: npm install react-resizable-panels
```

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `orientation` (on `ResizablePanelGroup`) | `"horizontal"` / `"vertical"` | Resize direction |
| `defaultSize` (on `ResizablePanel`) | string, e.g. `"50%"` | Initial panel size |
| `withHandle` (on `ResizableHandle`) | `boolean` | Show a visible handle |

The docs' API Reference defers to react-resizable-panels: https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Built on `react-resizable-panels` by bvaughn, not on Base UI; the Radix and React Aria variants also install `react-resizable-panels`.
- Changelog (2025-02-02, `react-resizable-panels` v4). Direct-primitive renames v3 to v4: `PanelGroup` to `Group`, `PanelResizeHandle` to `Separator`, `direction` prop to `orientation`, `defaultSize={50}` to `defaultSize="50%"`, `onLayout` to `onLayoutChange`, `ImperativePanelHandle` to `PanelImperativeHandle`, `ref` on Panel to `panelRef`, `data-panel-group-direction` to `aria-orientation`. The shadcn/ui wrappers (`ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`) remain unchanged.
- Variants: https://ui.shadcn.com/docs/components/radix/resizable, https://ui.shadcn.com/docs/components/aria/resizable
- RTL example passes `dir` to `ResizablePanelGroup`.

## Related

- [Sidebar](./sidebar.md)
