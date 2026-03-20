# MiniMapNodeProps

Props for custom node components rendered inside the `MiniMap` component.

## 型定義

```typescript
type MiniMapNodeProps = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  className: string;
  color?: string;
  shapeRendering: string;
  strokeColor?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  selected: boolean;
  onClick?: (event: MouseEvent<Element>, id: string) => void;
};
```

## プロパティ

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier of the node |
| `x` | `number` | Yes | X position of the node in the minimap |
| `y` | `number` | Yes | Y position of the node in the minimap |
| `width` | `number` | Yes | Width of the node representation in the minimap |
| `height` | `number` | Yes | Height of the node representation in the minimap |
| `borderRadius` | `number` | Yes | Border radius of the node shape |
| `className` | `string` | Yes | CSS class names |
| `color` | `string` | No | Fill color of the node in the minimap |
| `shapeRendering` | `string` | Yes | SVG shape rendering hint |
| `strokeColor` | `string` | No | Stroke (border) color |
| `strokeWidth` | `number` | No | Stroke (border) width |
| `style` | `CSSProperties` | No | Inline styles |
| `selected` | `boolean` | Yes | Whether the node is currently selected |
| `onClick` | `(event: MouseEvent, id: string) => void` | No | Click handler for the node in the minimap |

## 使用例

```tsx
import { MiniMap, type MiniMapNodeProps } from '@xyflow/react';

function CustomMiniMapNode({ x, y, width, height, color, selected }: MiniMapNodeProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color ?? '#eee'}
      stroke={selected ? 'blue' : 'transparent'}
      strokeWidth={2}
      rx={4}
    />
  );
}

export default function Flow() {
  return (
    <ReactFlow nodes={nodes} edges={edges}>
      <MiniMap nodeComponent={CustomMiniMapNode} />
    </ReactFlow>
  );
}
```

## 注意点

- この型は `MiniMap` コンポーネントの `nodeComponent` プロパティにカスタムコンポーネントを渡す場合にのみ使用する
- カスタムコンポーネントは SVG 要素を返す必要がある（MiniMap は SVG コンテキスト内でレンダリングされる）

## 関連

- [./NodeProps.md](./NodeProps.md)
- [./Node.md](./Node.md)
