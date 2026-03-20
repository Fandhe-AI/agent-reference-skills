# EdgeTypes

A registry that maps edge type identifier strings to their corresponding React components.

## 型定義

```typescript
type EdgeTypes = {
  [key: string]: React.ComponentType<EdgeProps>;
};
```

## 使用例

```tsx
import { ReactFlow, type EdgeProps, type EdgeTypes } from '@xyflow/react';

function AnimatedEdge({ sourceX, sourceY, targetX, targetY, ...props }: EdgeProps) {
  // Custom edge rendering logic
  return <BaseEdge path={/* ... */} />;
}

function LabeledEdge({ data, ...props }: EdgeProps) {
  return (
    <>
      <BaseEdge path={/* ... */} />
      <EdgeLabelRenderer>
        <div>{data?.label}</div>
      </EdgeLabelRenderer>
    </>
  );
}

// Define outside the component or memoize
const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
  labeled: LabeledEdge,
};

export default function Flow() {
  const edges = [
    { id: 'e1', source: '1', target: '2', type: 'animated' },
    { id: 'e2', source: '2', target: '3', type: 'labeled', data: { label: 'info' } },
  ];

  return <ReactFlow edges={edges} edgeTypes={edgeTypes} />;
}
```

## 注意点

- キーはエッジの `type` プロパティに対応する文字列
- 値は `EdgeProps` を受け取る React コンポーネント
- `edgeTypes` オブジェクトはコンポーネントの外で定義するか `useMemo` でメモ化すること
- 組み込みタイプ (`"default"`, `"straight"`, `"step"`, `"smoothstep"`, `"simplebezier"`) は引き続き利用可能（同名で上書き可能）

## 関連

- [./EdgeProps.md](./EdgeProps.md)
- [./Edge.md](./Edge.md)
