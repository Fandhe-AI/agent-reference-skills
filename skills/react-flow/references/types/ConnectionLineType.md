# ConnectionLineType

An enum defining the visual style of the connection line rendered while creating new edges.

## 型定義

```typescript
enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
  SimpleBezier = 'simplebezier',
}
```

## 値

| Value | String | Description |
|-------|--------|-------------|
| `ConnectionLineType.Bezier` | `'default'` | Curved bezier path (default) |
| `ConnectionLineType.Straight` | `'straight'` | Direct straight line |
| `ConnectionLineType.Step` | `'step'` | Step path with right angles |
| `ConnectionLineType.SmoothStep` | `'smoothstep'` | Smoothed step path with rounded corners |
| `ConnectionLineType.SimpleBezier` | `'simplebezier'` | Simplified bezier curve |

## 使用例

```tsx
import { ReactFlow, ConnectionLineType } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionLineType={ConnectionLineType.SmoothStep}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `connectionLineType` プロパティで設定する
- カスタム `connectionLineComponent` を使用する場合、この値は `ConnectionLineComponentProps.connectionLineType` として渡される

## 関連

- [./ConnectionLineComponent.md](./ConnectionLineComponent.md)
- [./ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md)
