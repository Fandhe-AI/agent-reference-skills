# Edge Labels

Edge labels allow rendering custom React components along edge paths. Unlike the edge path itself (which is SVG-based), edge labels can be any React component — making them ideal for buttons, controls, or informational displays on edges.

## 詳細説明

To render HTML content on an edge, use the `<EdgeLabelRenderer />` component. It acts as a portal that renders all edge labels into a single shared HTML container outside the SVG layer, enabling full React component capabilities including event handlers and interactive elements.

Path utility functions return midpoint coordinates (`labelX`, `labelY`) that can be used with CSS `transform` to position the label at the center of the edge.

### Positioning

Labels must be positioned manually using:
```css
position: absolute;
transform: translate(-50%, -50%) translate(${labelX}px, ${labelY}px);
```

The `translate(-50%, -50%)` centers the element on the midpoint coordinate.

### Required CSS Classes

- `nodrag` — prevents node drag from triggering when interacting with the label
- `nopan` — prevents viewport panning when clicking/dragging within the label

Both classes **must** be applied to interactive label elements.

## コード例

```tsx
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { deleteElements } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => deleteElements({ edges: [{ id }] })}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
```

## 注意点

- `<EdgeLabelRenderer />` はすべてのエッジラベルで共有される単一ポータルコンテナである
- インタラクティブな要素には `pointer-events: all` を必ず設定すること（デフォルトでは無効化されている）
- インタラクティブな要素には `nodrag` と `nopan` の両クラスを付与すること
- ラベルの位置はパスユーティリティ関数が返す `labelX`、`labelY` を使って手動で計算する必要がある
- `getBezierPath`、`getSmoothStepPath` なども同様に `[path, labelX, labelY]` を返す

## 関連

- [custom-edges.md](./custom-edges.md)
- [custom-nodes.md](./custom-nodes.md)
- [utility-classes.md](./utility-classes.md)
