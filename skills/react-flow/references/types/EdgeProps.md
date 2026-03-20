# EdgeProps

The props type for custom edge components. Use this type when implementing custom edges.

## 型定義

```typescript
type EdgeProps<EdgeType extends Edge = Edge> = {
  id: EdgeType['id'];
  type: EdgeType['type'];
  animated: EdgeType['animated'];
  data: EdgeType['data'];
  style: EdgeType['style'];
  selected: EdgeType['selected'];
  source: EdgeType['source'];
  target: EdgeType['target'];
  selectable: EdgeType['selectable'];
  deletable: EdgeType['deletable'];
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  label?: ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  sourceHandleId: string | null;
  targetHandleId: string | null;
  markerStart: string;
  markerEnd: string;
  pathOptions?: any;
  interactionWidth?: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the edge |
| `type` | `string` | Edge type as defined in `edgeTypes` |
| `animated` | `boolean` | Whether the edge is animated |
| `data` | `EdgeData` | Custom data associated with the edge |
| `style` | `CSSProperties` | Inline styles |
| `selected` | `boolean` | Whether the edge is selected |
| `source` | `string` | Source node ID |
| `target` | `string` | Target node ID |
| `selectable` | `boolean` | Whether the edge can be selected |
| `deletable` | `boolean` | Whether the edge can be deleted |
| `sourceX` | `number` | X coordinate of the source handle |
| `sourceY` | `number` | Y coordinate of the source handle |
| `targetX` | `number` | X coordinate of the target handle |
| `targetY` | `number` | Y coordinate of the target handle |
| `sourcePosition` | `Position` | Which side of the source node the handle is on |
| `targetPosition` | `Position` | Which side of the target node the handle is on |
| `label` | `ReactNode` | Text or component displayed along the edge |
| `labelStyle` | `CSSProperties` | Styles for the edge label |
| `labelShowBg` | `boolean` | Whether to show a background behind the label |
| `labelBgStyle` | `CSSProperties` | Styles for the label background |
| `labelBgPadding` | `[number, number]` | Padding around the label background |
| `labelBgBorderRadius` | `number` | Border radius of the label background |
| `sourceHandleId` | `string \| null` | ID of the source handle |
| `targetHandleId` | `string \| null` | ID of the target handle |
| `markerStart` | `string` | SVG marker ID for the edge start |
| `markerEnd` | `string` | SVG marker ID for the edge end |
| `pathOptions` | `any` | Options for path calculation (varies by edge type) |
| `interactionWidth` | `number` | Width of the invisible hit area |

## 使用例

```tsx
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

type MyEdgeData = { label: string };
type MyEdge = Edge<MyEdgeData, 'myEdge'>;

function MyCustomEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  data, markerEnd, style,
}: EdgeProps<MyEdge>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>
          {data?.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const edgeTypes = { myEdge: MyCustomEdge };
```

## 注意点

- カスタムエッジは `edgeTypes` オブジェクトに登録し、`ReactFlow` の `edgeTypes` プロパティに渡す
- `sourceX`, `sourceY`, `targetX`, `targetY` は既にキャンバス座標に変換済みの値
- パスの計算には `getBezierPath`, `getStraightPath`, `getSmoothStepPath` などのユーティリティを使用できる

## 関連

- [./Edge.md](./Edge.md)
- [./EdgeTypes.md](./EdgeTypes.md)
