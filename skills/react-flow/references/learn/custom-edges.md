# Custom Edges

Custom edges in React Flow are React components that render customized visual connections between nodes. Edge paths are always SVG-based, but any React component can be rendered along an edge path as a label.

## 詳細説明

Custom edges receive props such as `id`, `sourceX`, `sourceY`, `targetX`, `targetY`, and others automatically from React Flow. The edge path itself is an SVG path string, typically generated using one of React Flow's path utility functions.

### Path Utility Functions

| Function | Description |
|----------|-------------|
| `getBezierPath` | Curved path using bezier curves |
| `getSimpleBezierPath` | Simplified bezier curve variant |
| `getSmoothStepPath` | Step-based smooth transitions |
| `getStraightPath` | Direct linear connection |

All path functions return `[path, labelX, labelY, offsetX, offsetY]` — the SVG path string plus midpoint coordinates useful for label positioning.

### SVG Path Commands (for manual paths)

| Command | Description |
|---------|-------------|
| `M x y` | Move cursor to coordinates |
| `L x y` | Draw straight line to coordinates |
| `Q x1 y1 x2 y2` | Quadratic bezier with control point |

The `<BaseEdge />` component is the recommended way to render the edge path — it handles interactivity (hover, selection) automatically.

### edgeTypes

Like `nodeTypes`, the `edgeTypes` object must be defined **outside the component** (or memoized) to avoid re-renders.

## コード例

```tsx
import { BaseEdge, getStraightPath } from '@xyflow/react';

// 1. Define the custom edge component
export function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}

// 2. Define edgeTypes outside the component
const edgeTypes = {
  'custom-edge': CustomEdge,
};

// 3. Pass to ReactFlow
export function Flow() {
  return <ReactFlow edgeTypes={edgeTypes} nodes={nodes} edges={edges} />;
}

// 4. Use in edge configuration
const initialEdges = [
  {
    id: 'e1',
    source: 'n1',
    target: 'n2',
    type: 'custom-edge',
  },
];
```

## 注意点

- `edgeTypes` オブジェクトはコンポーネントの外側で定義するか `useMemo` でメモ化すること
- エッジパスは常に SVG ベースである。HTML 要素はエッジラベルとして `<EdgeLabelRenderer />` 経由でのみ配置できる
- `<BaseEdge />` を使うことでホバーや選択などのインタラクションが自動的に処理される
- 非標準の形状（波線など）が必要な場合は SVG パスコマンドで手動作成できる
- TypeScript での型設定については公式の TypeScript ガイドを参照

## 関連

- [edge-labels.md](./edge-labels.md)
- [custom-nodes.md](./custom-nodes.md)
- [handles.md](./handles.md)
