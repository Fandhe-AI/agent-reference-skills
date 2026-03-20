# Controls

Renders a control panel with zoom in/out, fit-view, and viewport lock buttons. Must be rendered as a child of `<ReactFlow />`.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `showZoom` | `boolean` | `true` | Show zoom in/out buttons |
| `showFitView` | `boolean` | `true` | Show fit-view button |
| `showInteractive` | `boolean` | `true` | Show viewport lock/unlock toggle button |
| `fitViewOptions` | `FitViewOptionsBase<NodeType>` | — | Options passed to the fit-view function |
| `onZoomIn` | `() => void` | — | Callback invoked alongside the default zoom-in behaviour |
| `onZoomOut` | `() => void` | — | Callback invoked alongside the default zoom-out behaviour |
| `onFitView` | `() => void` | — | Callback when fit-view button is clicked; when omitted the viewport auto-adjusts to show all nodes |
| `onInteractiveChange` | `(interactiveStatus: boolean) => void` | — | Callback triggered when the lock/interactive toggle is clicked |
| `position` | `PanelPosition` | `'bottom-left'` | Panel placement on the canvas |
| `orientation` | `"horizontal" \| "vertical"` | `'vertical'` | Button layout direction |
| `children` | `ReactNode` | — | Additional `<ControlButton />` elements |
| `style` | `CSSProperties` | — | Inline styles for the container |
| `className` | `string` | — | CSS class for the container |
| `aria-label` | `string` | `'React Flow controls'` | Accessibility label for the controls panel |

## 使用例

```tsx
import { ReactFlow, Controls, ControlButton } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow nodes={[]} edges={[]}>
      <Controls
        showInteractive={false}
        onFitView={() => console.log('fit view clicked')}
      >
        <ControlButton onClick={() => console.log('custom action')}>
          +
        </ControlButton>
      </Controls>
    </ReactFlow>
  );
}
```

## 注意点

- Extend the panel with custom buttons by passing `<ControlButton />` as children.
- TypeScript users can import the `ControlProps` type.
- `PanelPosition` values: `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'`.

## 関連

- [./ControlButton.md](./ControlButton.md)
- [./Panel.md](./Panel.md)
- [./ReactFlow.md](./ReactFlow.md)
