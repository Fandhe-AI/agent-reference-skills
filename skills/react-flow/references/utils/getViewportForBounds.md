# getViewportForBounds

Calculates a viewport transform that fits a given bounding box within specified dimensions.

## Signature

```typescript
getViewportForBounds(
  bounds: Rect,
  width: number,
  height: number,
  minZoom: number,
  maxZoom: number,
  padding?: Padding
): Viewport
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `bounds` | `Rect` | Bounding box to fit inside the viewport |
| `width` | `number` | Width of the viewport |
| `height` | `number` | Height of the viewport |
| `minZoom` | `number` | Minimum zoom level of the resulting viewport |
| `maxZoom` | `number` | Maximum zoom level of the resulting viewport |
| `padding` | `Padding` | Optional padding around the bounds |

## Returns

`Viewport` — An object `{ x: number, y: number, zoom: number }` that encloses the given bounds, suitable for passing to `setViewport`.

## 使用例

```tsx
import { getNodesBounds, getViewportForBounds, useReactFlow } from '@xyflow/react';

function FitToNodesButton({ nodes }) {
  const { setViewport } = useReactFlow();

  const handleFit = () => {
    const bounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(
      bounds,
      1200, // viewport width
      800,  // viewport height
      0.5,  // minZoom
      2,    // maxZoom
      0.1,  // padding
    );
    setViewport(viewport);
  };

  return <button onClick={handleFit}>Fit to Nodes</button>;
}
```

## 注意点

- 旧バージョンでは `getTransformForBounds` という名称だった（リネームされた）
- 低レベルなユーティリティ。多くのユースケースでは `fitView()` または `fitBounds()` メソッドの使用を推奨
- `getNodesBounds` と組み合わせてノード群のバウンディングボックスから計算することが多い

## 関連

- [getNodesBounds.md](./getNodesBounds.md)
