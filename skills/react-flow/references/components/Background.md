# Background

Renders a decorative background pattern (dots, lines, or cross grid) behind the flow canvas. Must be rendered as a child of `<ReactFlow />`.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique identifier; required when multiple `<Background />` components are used on the same page |
| `variant` | `BackgroundVariant` | `BackgroundVariant.Dots` | Pattern style: `Dots`, `Lines`, or `Cross` |
| `gap` | `number \| [number, number]` | `20` | Spacing between pattern elements; accepts a tuple `[x, y]` for independent axis control |
| `size` | `number` | `1` (Dots/Cross), ignored (Lines) | Radius of each dot or size of each rectangle |
| `offset` | `number \| [number, number]` | `0` | Offset of the pattern |
| `lineWidth` | `number` | `1` | Stroke thickness used when drawing the pattern |
| `color` | `string` | — | Color of the pattern elements |
| `bgColor` | `string` | — | Background fill color |
| `className` | `string` | — | CSS class applied to the container |
| `patternClassName` | `string` | — | CSS class applied to the SVG pattern element |
| `style` | `CSSProperties` | — | Inline styles applied to the container |

## 使用例

```tsx
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow defaultNodes={[]} defaultEdges={[]}>
      <Background color="#ccc" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
}
```

### 複数のバックグラウンドを重ねる例

```tsx
<ReactFlow defaultNodes={[]} defaultEdges={[]}>
  <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
  <Background id="2" gap={100} color="#ccc" variant={BackgroundVariant.Lines} />
</ReactFlow>
```

## 注意点

- When using multiple `<Background />` components, each **must** have a unique `id` prop.
- `BackgroundVariant` enum values: `BackgroundVariant.Dots`, `BackgroundVariant.Lines`, `BackgroundVariant.Cross`.

## 関連

- [./ReactFlow.md](./ReactFlow.md)
- [./Panel.md](./Panel.md)
