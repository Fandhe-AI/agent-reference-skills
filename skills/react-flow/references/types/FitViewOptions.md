# FitViewOptions

Options for customizing the behavior of the `fitView` method, including animation, zoom constraints, and target nodes.

## 型定義

```typescript
type FitViewOptions = {
  padding?: number;
  includeHiddenNodes?: boolean;
  minZoom?: number;
  maxZoom?: number;
  duration?: number;
  ease?: (t: number) => number;
  interpolate?: 'smooth' | 'linear';
  nodes?: (NodeType | { id: string })[];
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `padding` | `number` | Spacing around nodes when fitting view |
| `includeHiddenNodes` | `boolean` | Whether to include hidden nodes in the calculation |
| `minZoom` | `number` | Minimum zoom level constraint |
| `maxZoom` | `number` | Maximum zoom level constraint |
| `duration` | `number` | Animation duration in milliseconds |
| `ease` | `(t: number) => number` | Easing function for the viewport animation |
| `interpolate` | `'smooth' \| 'linear'` | Interpolation method for viewport transition |
| `nodes` | `(NodeType \| { id: string })[]` | Specific nodes to fit the view around |

## 使用例

```tsx
import { useReactFlow } from '@xyflow/react';

function FitButton() {
  const { fitView } = useReactFlow();

  const handleFit = () => {
    fitView({
      padding: 0.2,
      duration: 800,
      maxZoom: 1,
    });
  };

  return <button onClick={handleFit}>Fit View</button>;
}
```

## 注意点

- `duration` を指定するとビューポートがスムーズにアニメーションする
- `nodes` を指定すると特定ノードのみにフィットする（全ノードではなく）
- `ease` 関数は `t` が 0〜1 の範囲で呼ばれ、0〜1 の値を返す必要がある

## 関連

- [Viewport](./Viewport.md)
- [ReactFlowInstance](./ReactFlowInstance.md)
