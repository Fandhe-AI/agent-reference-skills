# EdgeMarker

Configures a visual marker (arrow or other decoration) at the start or end of an edge.

## 型定義

```typescript
type EdgeMarker = {
  type: MarkerType;
  color?: string | null;
  width?: number;
  height?: number;
  markerUnits?: string;
  orient?: string;
  strokeWidth?: number;
};

type EdgeMarkerType = MarkerType | EdgeMarker;
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `type` | `MarkerType` | The marker style to use (see `MarkerType`) |
| `color` | `string \| null` | Fill color of the marker |
| `width` | `number` | Width of the marker |
| `height` | `number` | Height of the marker |
| `markerUnits` | `string` | SVG `markerUnits` attribute (e.g., `"strokeWidth"`, `"userSpaceOnUse"`) |
| `orient` | `string` | SVG `orient` attribute. `"auto"` rotates the marker to follow the edge direction |
| `strokeWidth` | `number` | Stroke width of the marker shape |

## 使用例

```tsx
import { ReactFlow, MarkerType, type Edge } from '@xyflow/react';

const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    // Shorthand using MarkerType enum
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    // Full EdgeMarker object for customization
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#ff0000',
      width: 20,
      height: 20,
      strokeWidth: 2,
    },
  },
];
```

## 注意点

- `Edge.markerStart` / `Edge.markerEnd` は `EdgeMarkerType` 型を受け取る。`MarkerType` 列挙値（文字列ショートハンド）か、`EdgeMarker` オブジェクト（詳細設定）のどちらかを指定できる
- マーカーは SVG `<marker>` 要素として実装されている

## 関連

- [./MarkerType.md](./MarkerType.md)
- [./Edge.md](./Edge.md)
- [./DefaultEdgeOptions.md](./DefaultEdgeOptions.md)
