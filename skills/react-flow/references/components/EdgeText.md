# EdgeText

An SVG helper component for rendering text labels inside custom edges. Handles background rendering and padding automatically.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `number` | — | X position where the label should be rendered |
| `y` | `number` | — | Y position where the label should be rendered |
| `label` | `ReactNode` | — | Label content; typically a string but can be any React node |
| `labelStyle` | `CSSProperties` | — | Inline styles applied to the label text |
| `labelShowBg` | `boolean` | — | Whether to display a background rectangle behind the label |
| `labelBgStyle` | `CSSProperties` | — | Inline styles for the label background rectangle |
| `labelBgPadding` | `[number, number]` | — | Padding around the label background as `[horizontal, vertical]` |
| `labelBgBorderRadius` | `number` | — | Border radius for the label background rectangle |
| `...props` | `Omit<SVGAttributes<SVGElement>, 'x' \| 'y'>` | — | Additional SVG element attributes (e.g. `onClick`, `className`) |

## 使用例

```tsx
import { EdgeText, type EdgeProps } from '@xyflow/react';

export function CustomEdgeLabel({ label }: Pick<EdgeProps, 'label'>) {
  return (
    <EdgeText
      x={100}
      y={100}
      label={label}
      labelStyle={{ fill: 'white' }}
      labelShowBg
      labelBgStyle={{ fill: 'red' }}
      labelBgPadding={[2, 4]}
      labelBgBorderRadius={2}
    />
  );
}
```

## 注意点

- Rendered inside SVG; cannot contain arbitrary HTML. Use `<EdgeLabelRenderer />` for HTML-based labels.
- `x` and `y` are reserved for positioning and cannot be passed via the spread `...props`.
- The TypeScript type is exported as `EdgeTextProps`.

## 関連

- [./BaseEdge.md](./BaseEdge.md)
- [./EdgeLabelRenderer.md](./EdgeLabelRenderer.md)
