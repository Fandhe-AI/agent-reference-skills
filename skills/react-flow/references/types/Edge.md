# Edge

Represents a connection (edge) between two nodes in a React Flow graph.

## 型定義

```typescript
type Edge<
  EdgeData extends Record<string, unknown> = Record<string, unknown>,
  EdgeType extends string = string,
> = DefaultEdge<EdgeData, EdgeType> | SmoothStepEdge<EdgeData> | BezierEdge<EdgeData>;

type DefaultEdge<EdgeData, EdgeType> = {
  id: string;
  source: string;
  target: string;
  type?: EdgeType;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  animated?: boolean;
  hidden?: boolean;
  selected?: boolean;
  deletable?: boolean;
  selectable?: boolean;
  reconnectable?: boolean | HandleType;
  focusable?: boolean;
  data?: EdgeData;
  label?: ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  className?: string;
  markerStart?: EdgeMarkerType;
  markerEnd?: EdgeMarkerType;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the edge |
| `source` | `string` | ID of the source node |
| `target` | `string` | ID of the target node |
| `type` | `string` | Edge type key (must match a key in `edgeTypes`). Defaults to `"default"` (bezier) |
| `sourceHandle` | `string \| null` | ID of the specific handle on the source node |
| `targetHandle` | `string \| null` | ID of the specific handle on the target node |
| `animated` | `boolean` | When `true`, renders an animated dashed line |
| `hidden` | `boolean` | When `true`, the edge is not rendered |
| `selected` | `boolean` | Whether the edge is currently selected |
| `deletable` | `boolean` | Whether the edge can be deleted |
| `selectable` | `boolean` | Whether the edge can be selected |
| `reconnectable` | `boolean \| HandleType` | Whether the edge can be reconnected to different nodes/handles |
| `focusable` | `boolean` | Whether the edge can receive keyboard focus |
| `data` | `EdgeData` | Custom data associated with the edge |
| `label` | `ReactNode` | Text or component displayed along the edge |
| `labelStyle` | `CSSProperties` | Styles for the edge label |
| `labelShowBg` | `boolean` | Whether to show a background behind the label |
| `labelBgStyle` | `CSSProperties` | Styles for the label background |
| `labelBgPadding` | `[number, number]` | Padding `[x, y]` around the label background |
| `labelBgBorderRadius` | `number` | Border radius of the label background |
| `style` | `CSSProperties` | Inline styles for the edge path |
| `className` | `string` | CSS class names for the edge |
| `markerStart` | `EdgeMarkerType` | Marker (arrow) at the beginning of the edge |
| `markerEnd` | `EdgeMarkerType` | Marker (arrow) at the end of the edge |
| `zIndex` | `number` | Stacking order |
| `ariaLabel` | `string` | Accessible label for screen readers |
| `interactionWidth` | `number` | Width of the invisible hit area for clicking/tapping the edge |

## 使用例

```tsx
import { ReactFlow, type Edge } from '@xyflow/react';

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    label: 'connects to',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];
```

## 注意点

- 組み込みのエッジタイプ: `"default"` (bezier), `"straight"`, `"step"`, `"smoothstep"`, `"simplebezier"`
- `type` を省略した場合は `"default"` (bezier) が使用される
- `SmoothStepEdge` には `pathOptions.offset` と `pathOptions.borderRadius` が追加される
- `BezierEdge` には `pathOptions.curvature` が追加される

## 関連

- [./EdgeProps.md](./EdgeProps.md)
- [./EdgeTypes.md](./EdgeTypes.md)
- [./EdgeChange.md](./EdgeChange.md)
- [./EdgeMarker.md](./EdgeMarker.md)
- [./DefaultEdgeOptions.md](./DefaultEdgeOptions.md)
