# ResizeParams

Type representing the positional and dimensional parameters emitted during node resize events from the `<NodeResizer />` component.

## 型定義

```typescript
type ResizeParams = {
  x: number;
  y: number;
  width: number;
  height: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `x` | `number` | Horizontal position of the node after resize |
| `y` | `number` | Vertical position of the node after resize |
| `width` | `number` | Width of the node after resize |
| `height` | `number` | Height of the node after resize |

## 使用例

```tsx
import { NodeResizer, ResizeParams } from '@xyflow/react';

function ResizableNode({ data }: { data: { label: string } }) {
  const handleResize = (event: React.SyntheticEvent, params: ResizeParams) => {
    console.log('New size:', params.width, params.height);
    console.log('New position:', params.x, params.y);
  };

  return (
    <>
      <NodeResizer onResize={handleResize} minWidth={100} minHeight={50} />
      <div>{data.label}</div>
    </>
  );
}
```

## 注意点

- `<NodeResizer />` コンポーネントの `onResize`、`onResizeStart`、`onResizeEnd` コールバックで使用される
- コンテキストによっては `direction` フィールドが追加された拡張型が使われる場合がある
- `@xyflow/react` の `node-resizer` パッケージで定義されている
