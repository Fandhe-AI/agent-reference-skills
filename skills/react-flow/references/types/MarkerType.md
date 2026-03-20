# MarkerType

An enum that defines the available marker (arrow) styles for the start and end of edges.

## 型定義

```typescript
enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}
```

## 値

| Value | String | Description |
|-------|--------|-------------|
| `MarkerType.Arrow` | `'arrow'` | An open (unfilled) arrow marker |
| `MarkerType.ArrowClosed` | `'arrowclosed'` | A closed (filled) arrow marker |

## 使用例

```tsx
import { ReactFlow, MarkerType, type Edge } from '@xyflow/react';

const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerStart: {
      type: MarkerType.Arrow,
      color: '#b1b1b7',
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#b1b1b7',
    },
  },
];
```

## 注意点

- `Edge.markerStart` / `Edge.markerEnd` に `MarkerType` 値を直接指定するショートハンドと、`EdgeMarker` オブジェクトで色やサイズをカスタマイズする方法の両方が使える
- マーカーは SVG `<marker>` 要素として実装されている

## 関連

- [./EdgeMarker.md](./EdgeMarker.md)
- [./Edge.md](./Edge.md)
- [./DefaultEdgeOptions.md](./DefaultEdgeOptions.md)
