# ConnectionLineComponent

A React component type for rendering a custom connection line during edge creation (while the user is dragging from a handle).

## 型定義

```typescript
type ConnectionLineComponent = React.ComponentType<ConnectionLineComponentProps>;
```

## 使用例

```tsx
import { ReactFlow, type ConnectionLineComponent, type ConnectionLineComponentProps } from '@xyflow/react';
import { getStraightPath } from '@xyflow/react';

const CustomConnectionLine: ConnectionLineComponent = ({
  fromX,
  fromY,
  toX,
  toY,
  connectionStatus,
}: ConnectionLineComponentProps) => {
  const [edgePath] = getStraightPath({ sourceX: fromX, sourceY: fromY, targetX: toX, targetY: toY });

  return (
    <g>
      <path
        fill="none"
        stroke={connectionStatus === 'valid' ? 'green' : 'red'}
        strokeWidth={2}
        d={edgePath}
      />
      <circle cx={toX} cy={toY} r={4} fill={connectionStatus === 'valid' ? 'green' : 'red'} />
    </g>
  );
};

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionLineComponent={CustomConnectionLine}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `connectionLineComponent` プロパティに渡す
- コンポーネントは SVG 要素を返す必要がある（接続ラインは SVG コンテキスト内でレンダリングされる）
- `connectionStatus` プロパティを使用して接続の有効/無効に応じたビジュアルフィードバックを実装できる

## 関連

- [./ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md)
- [./ConnectionLineType.md](./ConnectionLineType.md)
